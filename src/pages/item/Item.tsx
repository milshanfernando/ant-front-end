import { useParams } from "react-router-dom";
import UseItem from "../../hooks/useItem";
import type { Item } from "../../types/item";

const Item = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = UseItem(id || "");

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
          Loading...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 dark:text-red-400 text-lg">
          Error: {error.message}
        </p>
      </div>
    );

  return (
    <div className=" px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Image Section */}
        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow">
          <img
            src={
              typeof data?.item?.image === "string"
                ? data?.item.image
                : undefined
            }
            alt={data?.item?.name || "Item image"}
            className="w-full h-80 md:h-full object-cover"
          />
        </div>

        {/* Details Section */}
        <div className="flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {data?.item?.name}
            </h1>
            <span
              className={`mt-2 inline-block px-4 py-1.5 text-sm font-medium rounded-full ${
                data?.item?.status === "in-stock"
                  ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                  : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200"
              }`}
            >
              {data?.item?.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 dark:text-gray-300">
            <div>
              <p className="font-semibold">Price</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {typeof data?.item?.price === "number"
                  ? new Intl.NumberFormat("en-LK", {
                      style: "currency",
                      currency: "LKR",
                    }).format(data.item.price)
                  : "-"}
              </p>
            </div>
            <div>
              <p className="font-semibold">Quantity</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {data?.item?.quantity}
              </p>
            </div>
            <div>
              <p className="font-semibold">Category</p>
              <p>{data?.item?.category}</p>
            </div>
            <div>
              <p className="font-semibold">Supplier</p>
              <p>{data?.item?.supplier}</p>
            </div>
          </div>

          <div>
            <button className="px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow hover:opacity-90 transition w-full sm:w-auto">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
