"use client";

import { useState, useEffect } from "react";
import { BlogPostResponse, fetchBlogPosts } from "@/API";
import { RelatedBlogs } from "./related-blogs";
import { ErrorDisplayComponent } from "../error-display";
import { RefreshCcw } from "lucide-react";  

interface RelatedBlogsProviderProps {
  currentBlogId: string;
}

export function RelatedBlogsProvider({ currentBlogId }: RelatedBlogsProviderProps) {
  const [blogs, setBlogs] = useState<BlogPostResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBlogPosts();
      
      // Make sure we have an array
      if (!Array.isArray(data)) {
        throw new Error("Invalid data format");
      }
      
      // Filter out current blog and limit to 4 items
      setBlogs(data.filter(b => b.id !== currentBlogId).slice(0, 4));
    } catch (err) {
      setError("خطا در دریافت مقالات مرتبط");
      console.error("Related blogs load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, [currentBlogId]);

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت مقالات مرتبط"
        description="در دریافت لیست مقالات مرتبط مشکلی پیش آمده است"
        button={{
          text: "تلاش مجدد",
          icon: RefreshCcw,
          onClick: loadBlogs
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1,2,3,4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/2] bg-gray-200 rounded-lg" />
              <div className="mt-2 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!blogs.length) return null;

  return <RelatedBlogs blogs={blogs} />;
} 