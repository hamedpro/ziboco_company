"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPostResponse, fetchBlogPosts } from "@/API";
import { BlogMetadata } from "./blog-metadata";
import { ErrorDisplayComponent } from "../error-display";

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

      const blogs = await fetchBlogPosts();
      const foundBlog = blogs.find(b => b.id === blogId);

      if (!foundBlog) {
        setNotFound(true);
        return;
      }

      setBlog(foundBlog);
    } catch (err) {
      setError("خطا در دریافت اطلاعات مقاله");
      console.error("Blog load error:", err);
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
        variant="generic"
        onRetry={() => router.push("/blogs")}
      />
    );
  }

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت اطلاعات"
        description="در دریافت اطلاعات مقاله مشکلی پیش آمده است"
        onRetry={loadBlog}
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