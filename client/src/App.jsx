import { useState } from "react";
import FileUpload from "./components/FileUpload"; // Your file upload component
import Invoices from "./pages/Invoices"; // Component displaying invoices
import Products from "./pages/Products"; // Component displaying products
import Customers from "./pages/Customers"; // Component displaying customers
import './index.css';

const App = () => {
  // State for active tab (Invoices, Products, Customers)
  const [activeTab, setActiveTab] = useState("invoices");

  return (
    <div className="min-h-screen bg-white p-5 ">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-5 ">Automated Data Extraction and <br /> Invoice Management</h2>
      <br />
      {/* File upload component */}
      <FileUpload />
      <br />
      {/* Navigation Tabs */}
      <div className="tabs flex justify-center space-x-5 mt-5">
        {/* Button to switch to Invoices tab */}
        <button
          onClick={() => setActiveTab("invoices")}
          className={`py-2 px-4 rounded ${
            activeTab === "invoices" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Invoices
        </button>

        {/* Button to switch to Products tab */}
        <button
          onClick={() => setActiveTab("products")}
          className={`py-2 px-4 rounded ${
            activeTab === "products" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Products
        </button>

        {/* Button to switch to Customers tab */}
        <button
          onClick={() => setActiveTab("customers")}
          className={`py-2 px-4 rounded ${
            activeTab === "customers" ? "bg-blue-500 text-white" : "bg-gray-300"
          }`}
        >
          Customers
        </button>
      </div>

      {/* Content Display */}
      <div className="mt-5">
        {/* Display corresponding tab content based on activeTab */}
        {activeTab === "invoices" && <Invoices />}
        {activeTab === "products" && <Products />}
        {activeTab === "customers" && <Customers />}
      </div>
    </div>
  );
};

export default App;
