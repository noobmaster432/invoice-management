require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");

const app = express();
const port = 5000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const fileManager = new GoogleAIFileManager(process.env.API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const mimeType = file.mimetype;
    const displayName = file.originalname;

    const uploadResponse = await fileManager.uploadFile(file.path, {
      mimeType,
      displayName,
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      { text: " You are a specialist in comprehending receipts and documents. You will receive input files in the form of images, PDFs, or Excel files. Your task is to accurately extract and organize details related to invoices, products, and customers from these files in a structured format, such as JSON, with appropriate tags for each data field." },
    ]);

    console.log("Gemini API Response:", result.response.text());
    
    const extractedData = parseGeminiResponse(result.response.text());
    res.json({
      status: "success",
      invoices: extractedData.invoices,
      products: extractedData.products,
      customers: extractedData.customers,
    });

    require("fs").unlinkSync(file.path);
  } catch (error) {
    console.error("Error processing file:", error.message);
    res.status(500).json({ error: "Failed to process file." });
  }
});

function cleanResponse(response) {
  const jsonStartIndex = response.indexOf('{');
  const jsonEndIndex = response.lastIndexOf('}');

  if (jsonStartIndex !== -1 && jsonEndIndex !== -1) {
    let cleanedResponse = response.substring(jsonStartIndex, jsonEndIndex + 1);

    cleanedResponse = cleanedResponse.replace(/'([^']+)'(?=:)/g, '"$1"');
    cleanedResponse = cleanedResponse.replace(/'([^']+)'/g, '"$1"');

    cleanedResponse = cleanedResponse.replace(/,\s*}/g, '}');
    cleanedResponse = cleanedResponse.replace(/,\s*]/g, ']');

    cleanedResponse = cleanedResponse.replace(/(\r\n|\n|\r)/gm, '');
    cleanedResponse = cleanedResponse.trim();

    return cleanedResponse;
  }

  return "{}";
}

function parseGeminiResponse(text) {
  try {
    const cleanedResponse = cleanResponse(text);
    const data = JSON.parse(cleanedResponse);

    const invoices = [];
    const products = [];
    const customers = [];

    if (data.invoice_number && data.items) {
      const invoice = {
        serial: data.invoice_number || "N/A",
        customer: data.customer?.name || "Unknown",
        product: "",
        qty: 0,
        tax: 0,
        total: data.total?.amount || 0,
        date: data.invoice_date || "N/A",
      };

      data.items.forEach(item => {
        invoice.product = item.description || "N/A";
        invoice.qty = item.quantity || 0;
        invoice.tax = item.gst || 0;
        invoices.push({ ...invoice });
      });
    }

    if (data.items) {
      data.items.forEach(item => {
        const product = {
          name: item.description || "N/A",
          qty: item.quantity || 0,
          unitPrice: item.rate || 0,
          tax: item.gst || 0,
          priceWithTax: item.amount || 0,
        };
        products.push(product);
      });
    }

    if (data.customer) {
      const customer = {
        name: data.customer.name || "Unknown",
        qty: 0,
        unitPrice: 0,
        tax: 0,
        priceWithTax: 0,
      };

      if (data.items) {
        data.items.forEach(item => {
          customer.qty += item.quantity || 0;
          customer.unitPrice = item.rate || 0;
          customer.tax += item.gst || 0;
          customer.priceWithTax += item.amount || 0;
        });
      }
      customers.push(customer);
    }
    return { invoices, products, customers };

  } catch (error) {
    console.error("Error parsing response:", error.message);
    return { invoices: [], products: [], customers: [] };
  }
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});