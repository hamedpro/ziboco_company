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

export interface ProductResponse {
  id: string;
  title: string;
  description: string | null;
  price: number;
  tag: string;
  image: string;
  onSale: boolean;
  hot: boolean;
  categoryId: string;
}

export const fetchLatestProducts = async (): Promise<ProductResponse[]> => {
  const response = await axios.get<ProductResponse[] >(
    `${API_BASE_URL}/api/Product/GetLatestProductsAsunc`
  );
//   throw new Error("test");
  return response.data;
};

export const fetchBestSellingProducts = async (): Promise<ProductResponse[]> => {
  const response = await axios.get<ProductResponse[]>(
    `${API_BASE_URL}/api/Product/GetBestSellingProductsAsunc`
  );
  return response.data;
};

export interface CategoryResponse {
  id: string;
  name: string;
  image: string;
  displayOrder: number;
}

export const fetchCategories = async (): Promise<CategoryResponse[]> => {
  const response = await axios.get<CategoryResponse[]>(
    `${API_BASE_URL}/api/category`
  );
  return response.data;
};
