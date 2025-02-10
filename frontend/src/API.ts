import axios from "axios";
import { API_BASE_URL } from "../configs";

export interface MetalPriceResponse {
  id: string;
  name: string;
  title: string;
  price: number;
  change: number;
  // Add other fields if needed
}

export const fetchMetalPrices = async (): Promise<MetalPriceResponse[]> => {
  const response = await axios.get<{ data: MetalPriceResponse[] }>(
    `${API_BASE_URL}/api/price`
  );
  return response.data.data;
};
