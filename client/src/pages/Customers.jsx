import { useSelector } from "react-redux";
import Table from "../components/Table";

const Customers = () => {
  const customers = useSelector((state) => state.customers);

  const columns = [
    { key: "name", header: "Customer Name" },
    { key: "phone", header: "Phone Number" },
    { key: "totalPurchase", header: "Total Purchase Amount" },
  ];

  if (!customers || customers.length === 0) {
    return (
      <div className="flex justify-center min-h-screen">
        <div className="text-center">
        <h2 className="text-xl font-semibold mb-3">Customers</h2>
        <p>No customers available.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Customers</h2>
      <Table data={customers} columns={columns} />
    </div>
  );
};

export default Customers;
