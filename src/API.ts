import axios from "axios";
import { API_BASE_URL } from "../configs";
import { fakeData } from "@/components/fakeData";

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
    data,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
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
    `${API_BASE_URL}/api/ShoppingCart/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
};

export interface ProductDetailResponse {
  id: string;
  categoryId: string;
  title: string;
  description: string | null;
  image: string;
  price: number;
  tag: string;
  onSale: boolean;
  hot: boolean;
  createdAt: number;
  updatedAt: number;
  content: string | null;
}

export const fetchAllProducts = async (): Promise<ProductDetailResponse[]> => {
  const response = await axios.get<ProductDetailResponse[]>(
    `${API_BASE_URL}/api/product`
  );
  return response.data;
};

export interface Banner {
  text: string;
  pathname: string;
}

export interface TopBannersResponse {
  topBanner1: Banner;
  topBanner2: Banner;
}

export const fetchTopBanners = async (): Promise<TopBannersResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Get data from fakeData for now
  return {
    topBanner1: {
      text: fakeData.theme.topHeaderBannerOne.text,
      pathname: fakeData.theme.topHeaderBannerOne.url
    },
    topBanner2: {
      text: fakeData.theme.topHeaderBannerTwo.text,
      pathname: fakeData.theme.topHeaderBannerTwo.url
    }
  };
};

export interface ProvinceResponse {
  id: number;
  name: string;
}

export const fetchProvinces = async (): Promise<ProvinceResponse[]> => {
  const response = await axios.get<ProvinceResponse[]>(
    `${API_BASE_URL}/api/Address/StateProvince`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return response.data;
};
