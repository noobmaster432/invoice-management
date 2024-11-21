import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux"; 
import { setInvoices } from '../redux/invoiceSlice';
import { setProducts } from '../redux/productSlice';
import { setCustomers } from '../redux/customersSlice';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://invoice-manage-api.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setLoading(false);
      setSuccess(true);
      console.log("Response data:", response.data); 
      const { invoices, products, customers } = response.data;
      dispatch(setInvoices(invoices));
      dispatch(setProducts(products));
      dispatch(setCustomers(customers));
    } catch (error) {
      setLoading(false);
      setError("Failed to upload and process the file. Please try again.");
      console.error("Error uploading file:", error.message); 
    }
  };

  return (
    <div className="flex items-center justify-center">
    <div className="file-upload text-center bg-white p-6 rounded-lg shadow-md">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload and Process"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">File processed successfully!</p>}
    </div>
    </div>
  );
};

export default FileUpload;