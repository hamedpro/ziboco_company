"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AnnouncementResponse } from "@/API";
import { useRouter } from "next/navigation";
import { CalendarDays } from "lucide-react";

interface AnnouncementMetadataProps {
  announcement: AnnouncementResponse;
}

export function AnnouncementMetadata({ announcement }: AnnouncementMetadataProps) {
  const router = useRouter();

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500">
        <Button 
          variant="link" 
          className="px-0 text-gray-500"
          onClick={() => router.push("/announcements")}
        >
          اطلاعیه‌ها
        </Button>
        <span className="mx-2">/</span>
        <span className="truncate">{announcement.title}</span>
      </div>

      {/* Announcement Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">
          {announcement.title}
        </h1>
        
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarDays className="w-5 h-5" />
          <time dateTime={announcement.date.toString()}>
            {new Date(announcement.date).toLocaleDateString("fa-IR")}
          </time>
        </div>
      </div>

      {/* Featured Image */}
      <div className="aspect-[2/1] relative rounded-xl overflow-hidden">
        <Image
          src={announcement.image || "/placeholder-announcement.jpg"}
          alt={announcement.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Announcement Content */}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: announcement.content }}
      />

      {/* Footer Actions */}
      <div className="flex justify-between items-center pt-8 border-t">
        <Button
          variant="ghost"
          className="text-gray-600"
          onClick={() => router.push("/announcements")}
        >
          ← بازگشت به اطلاعیه‌ها
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline">اشتراک‌گذاری</Button>
          <Button variant="outline">کپی لینک</Button>
        </div>
      </div>
    </article>
  );
} 