"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPostResponse, fetchBlogPostById } from "@/API";
import { BlogMetadata } from "./blog-metadata";
import { ErrorDisplayComponent } from "../error-display";
import { RefreshCcw } from "lucide-react";
import axios from "axios";

interface BlogMetadataProviderProps {
  blogId: string;
}

export function BlogMetadataProvider({ blogId }: BlogMetadataProviderProps) {
  const router = useRouter();
  const [blog, setBlog] = useState<BlogPostResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const blogData = await fetchBlogPostById(blogId);
      
      // Check if response is an array and has at least one element
      if (!Array.isArray(blogData) || blogData.length === 0) {
        setNotFound(true);
        return;
      }
      
      // Use the first blog post from the array
      setBlog(blogData[0]);
    } catch (err) {
      console.error("Blog load error:", err);
      
      // Check if it's a 404 error
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        setNotFound(true);
      } else {
        setError("خطا در دریافت اطلاعات مقاله");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlog();
  }, [blogId]);

  if (notFound) {
    return (
      <ErrorDisplayComponent
        title="مقاله مورد نظر یافت نشد"
        description="مقاله‌ای که به دنبال آن هستید در سیستم موجود نیست"
        button={{
          text: "بازگشت به لیست مقالات",
          onClick: () => router.push("/blogs")
        }}
      />
    );
  }

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت اطلاعات"
        description="در دریافت اطلاعات مقاله مشکلی پیش آمده است"
        button={{
          text: "تلاش مجدد",
          icon: RefreshCcw,
          onClick: loadBlog
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-4 animate-pulse space-y-8">
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
        </div>
        <div className="aspect-[2/1] bg-gray-200 rounded-xl" />
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-4 bg-gray-200 rounded w-4/5" />
        </div>
      </div>
    );
  }

  if (!blog) return null;

  return <BlogMetadata blog={blog} />;
} 