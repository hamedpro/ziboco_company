"use client";

import Image from "next/image";
import { BlogPostResponse } from "@/API";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

interface RelatedBlogsProps {
  blogs: BlogPostResponse[];
}

export function RelatedBlogs({ blogs }: RelatedBlogsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">مقالات مرتبط</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/${blog.id}`}
            className="group"
          >
            <div className="aspect-[3/2] bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={blog.image || "/placeholder-blog.jpg"}
                alt={blog.title || "تصویر مقاله مرتبط"}
                width={300}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={blog.createDate}>
                  {new Date(blog.createDate).toLocaleDateString("fa-IR")}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 