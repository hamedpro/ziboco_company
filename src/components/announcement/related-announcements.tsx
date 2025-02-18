"use client";

import Image from "next/image";
import { AnnouncementResponse } from "@/API";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

interface RelatedAnnouncementsProps {
  announcements: AnnouncementResponse[];
}

export function RelatedAnnouncements({ announcements }: RelatedAnnouncementsProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">اطلاعیه‌های مرتبط</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {announcements.map((announcement) => (
          <Link
            key={announcement.id}
            href={`/announcements/${announcement.id}`}
            className="group"
          >
            <div className="aspect-[3/2] bg-gray-50 rounded-lg overflow-hidden">
              <Image
                src={announcement.image || "/placeholder-announcement.jpg"}
                alt={announcement.title}
                width={300}
                height={200}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-2">
              <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                {announcement.title}
              </h3>
              <div className="flex items-center gap-2 text-gray-500 mt-1 text-sm">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={announcement.date.toString()}>
                  {new Date(announcement.date).toLocaleDateString("fa-IR")}
                </time>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 