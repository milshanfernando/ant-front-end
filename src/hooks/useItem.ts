import { useQuery } from "@tanstack/react-query";
import type { Item } from "../types/item";
import ApiClient from "../services/apiClient";

const apiClient = new ApiClient<{ item: Item }>("/items");

const UseItem = (id: string) => {
  return useQuery<{ item: Item }, Error>({
    queryKey: ["item", id],
    queryFn: () => apiClient.getDataById(id),
    placeholderData: (prevData) => prevData,
  });
};

export default UseItem;
