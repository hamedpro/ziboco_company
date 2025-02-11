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

export interface BlogPostResponse {
  id: string;
  title: string;
  image: string;
  date: number;
  content: string;
  createDate: string;
}

export const fetchBlogPosts = async (): Promise<BlogPostResponse[]> => {
  const response = await axios.get<BlogPostResponse[]>(
    `${API_BASE_URL}/api/blog`
  );
  return response.data;
};

export interface AnnouncementResponse {
  id: string | null;
  title: string;
  image: string;
  date: number;
  content: string;
}

export const fetchAnnouncements = async (): Promise<AnnouncementResponse[]> => {
  const response = await axios.get<AnnouncementResponse[]>(
    `${API_BASE_URL}/api/content/announcements`
  );
  return response.data;
};

export interface CartUpdateRequest {
  productId: string;
  quantity: number;
}

export const fetchUpdateBasket = async (data: CartUpdateRequest): Promise<void> => {
  await axios.post<void>(
    `${API_BASE_URL}/api/ShoppingCart`,
    data
  );
};

export interface CartItemResponse {
  productId: string;
  quantity: number;
}

export interface ShoppingCartResponse {
  data: CartItemResponse[];
  errorCode: number;
  errorMessage: string | null;
  errorDetail: string | null;
}

export const fetchBasket = async (): Promise<CartItemResponse[]> => {
  const response = await axios.get<ShoppingCartResponse>(
    `${API_BASE_URL}/api/ShoppingCart`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  
  if (response.data.errorCode !== 0) {
    throw new Error(response.data.errorMessage || "خطا در دریافت سبد خرید");
  }

  return response.data.data;
};

export const fetchDeleteCartItem = async (productId: string): Promise<void> => {
  await axios.delete<void>(
    `${API_BASE_URL}/api/ShoppingCart/${productId}`
  );
};
