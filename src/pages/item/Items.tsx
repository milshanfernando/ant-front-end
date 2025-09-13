import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseItems from "../../hooks/useItems";

const Items = () => {
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const { data, error, isLoading } = UseItems({ page, pageSize });
  const navigate = useNavigate();

  const statusColors: { [key: string]: string } = {
    "in-stock": "bg-green-200 text-green-800",
    "out-of-stock": "bg-red-200 text-red-800",
    "low-stock": "bg-yellow-200 text-yellow-800",
  };

  const navigateFnc = (id: string) => {
    navigate(`/items/${id}`);
  };

  if (error) return <div>Error loading items</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-items-center">
        {data?.map(({ _id, name, image, status, quantity }) => (
          <div
            className="border border-gray-600 dark:border-gray-400 rounded-md p-5 flex flex-col gap-3 w-full max-w-xs cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 transition-all duration-150 ease-in-out"
            key={_id}
            onClick={() => {
              if (_id) {
                navigateFnc(_id);
              }
            }} // 👈 navigate on click
          >
            <h2 className="text-sm sm:text-base font-semibold first-letter:uppercase truncate max-w-[20ch]">
              {name.toLowerCase()}
            </h2>
            <img
              className="h-40 w-full object-cover rounded"
              src={typeof image === "string" ? image : undefined}
              alt={name}
            />
            <div className="flex justify-between items-center">
              <p
                className={`${statusColors[status]} px-2 rounded-full text-xs sm:text-sm font-semibold text-center py-1`}
              >
                {status.toUpperCase()}
              </p>
              <p className="font-medium">{quantity}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="p-5 flex justify-center gap-3">
        <button
          className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-300 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Prev
        </button>
        <button
          className="bg-blue-200 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-300"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Items;
