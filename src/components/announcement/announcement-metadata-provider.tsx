"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnnouncementResponse, fetchAnnouncements } from "@/API";
import { AnnouncementMetadata } from "./announcement-metadata";
import { ErrorDisplayComponent } from "../error-display";

interface AnnouncementMetadataProviderProps {
  announcementId: string;
}

export function AnnouncementMetadataProvider({ announcementId }: AnnouncementMetadataProviderProps) {
  const router = useRouter();
  const [announcement, setAnnouncement] = useState<AnnouncementResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  const loadAnnouncement = async () => {
    try {
      setLoading(true);
      setError(null);
      setNotFound(false);

      const announcements = await fetchAnnouncements();
      const foundAnnouncement = announcements.find(a => a.id === announcementId);

      if (!foundAnnouncement) {
        setNotFound(true);
        return;
      }

      setAnnouncement(foundAnnouncement);
    } catch (err) {
      setError("خطا در دریافت اطلاعات اطلاعیه");
      console.error("Announcement load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncement();
  }, [announcementId]);

  if (notFound) {
    return (
      <ErrorDisplayComponent
        title="اطلاعیه مورد نظر یافت نشد"
        description="اطلاعیه‌ای که به دنبال آن هستید در سیستم موجود نیست"
        variant="generic"
        onRetry={() => router.push("/announcements")}
      />
    );
  }

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت اطلاعات"
        description="در دریافت اطلاعات اطلاعیه مشکلی پیش آمده است"
        onRetry={loadAnnouncement}
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

  if (!announcement) return null;

  return <AnnouncementMetadata announcement={announcement} />;
} 