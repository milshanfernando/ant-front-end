import { useMemo, useState, useCallback } from "react";
import UseSales from "../../hooks/useSales";

const Sales = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Paid" | "Unpaid" | "Pending"
  >("All");

  const { data = [], error, isLoading } = UseSales("2025-09-10");

  const filteredInvoices = useMemo(() => {
    return data.filter((inv) => {
      const matchesSearch =
        inv.invoiceId?.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer.name.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ? true : inv.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, statusFilter]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  if (error) return <div className="text-red-500">Error loading items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold">Sales Overview</h1>
        <input
          type="text"
          placeholder="Search by Invoice or Customer..."
          value={search}
          onChange={handleSearch}
          className="border rounded-lg px-4 py-2 w-full sm:w-72"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 sm:gap-4">
        {["All", "Paid", "Unpaid", "Pending"].map((status) => (
          <button
            key={status}
            onClick={() =>
              setStatusFilter(status as "All" | "Paid" | "Unpaid" | "Pending")
            }
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
              statusFilter === status
                ? "bg-blue-800 text-white"
                : "bg-gray-800 text-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard title="Total Sales" value={data.length} />
        <SummaryCard
          title="Revenue"
          value={`$${data.reduce((acc, inv) => acc + inv.totalAmount, 0)}`}
        />
        <SummaryCard
          title="Paid"
          value={data.filter((i) => i.status === "Paid").length}
        />
        <SummaryCard
          title="Unpaid"
          value={data.filter((i) => i.status === "Unpaid").length}
        />
      </div>

      {/* Table */}
      <div className=" max-w-svh">
        <table className="min-w-full border rounded-lg shadow text-sm sm:text-base">
          <thead className="bg-gray-900 text-left text-gray-200">
            <tr>
              <th className="p-2 sm:p-3">Invoice ID</th>
              <th className="p-2 sm:p-3">Customer</th>
              <th className="p-2 sm:p-3">Total</th>
              <th className="p-2 sm:p-3">Status</th>
              <th className="p-2 sm:p-3">Method</th>
              <th className="p-2 sm:p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 sm:p-6 text-gray-500"
                >
                  No invoices found
                </td>
              </tr>
            ) : (
              filteredInvoices.map((inv) => (
                <tr key={inv._id} className="border-t hover:bg-gray-950">
                  <td className="p-2 sm:p-3 font-medium">{inv.invoiceId}</td>
                  <td className="p-2 sm:p-3">{inv.customer.name}</td>
                  <td className="p-2 sm:p-3">${inv.totalAmount}</td>
                  <td className="p-2 sm:p-3">{inv.status}</td>
                  <td className="p-2 sm:p-3">{inv.paymentMethod}</td>
                  <td className="p-2 sm:p-3">
                    {inv.createdAt
                      ? new Date(inv.createdAt).toLocaleDateString()
                      : ""}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SummaryCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => (
  <div className="bg-blue-950 shadow rounded-lg p-4 flex flex-col sm:flex-col items-start sm:items-start">
    <p className="text-amber-400 text-sm sm:text-base">{title}</p>
    <p className="text-lg sm:text-xl font-bold">{value}</p>
  </div>
);

export default Sales;
