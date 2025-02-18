"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BlogPostResponse } from "@/API";
import { useRouter } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";

interface BlogMetadataProps {
  blog: BlogPostResponse;
}

export function BlogMetadata({ blog }: BlogMetadataProps) {
  const router = useRouter();

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <Button 
          variant="link" 
          className="px-0 text-gray-500"
          onClick={() => router.push("/blogs")}
        >
          وبلاگ
        </Button>
        <span className="mx-2">/</span>
        <span className="truncate">{blog.title}</span>
      </div>

      {/* Blog Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {blog.title}
        </h1>
        
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <time dateTime={blog.createDate}>
              {new Date(blog.createDate).toLocaleDateString("fa-IR")}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>زمان مطالعه: ۵ دقیقه</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-[2/1] relative rounded-xl overflow-hidden">
        <Image
          src={blog.image || "/placeholder-blog.jpg"}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Blog Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button
          variant="ghost"
          className="text-gray-600"
          onClick={() => router.push("/blogs")}
        >
          ← بازگشت به وبلاگ
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">اشتراک‌گذاری</Button>
          <Button variant="outline">کپی لینک</Button>
        </div>
      </div>
    </article>
  );
} 