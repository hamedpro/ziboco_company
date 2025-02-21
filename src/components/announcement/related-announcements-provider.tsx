"use client";

import { useState, useEffect } from "react";
import { AnnouncementResponse, fetchAnnouncements } from "@/API";
import { RelatedAnnouncements } from "./related-announcements";
import { ErrorDisplayComponent } from "../error-display";
import { RefreshCcw } from "lucide-react";
interface RelatedAnnouncementsProviderProps {
  currentAnnouncementId: string;
}

export function RelatedAnnouncementsProvider({ currentAnnouncementId }: RelatedAnnouncementsProviderProps) {
  const [announcements, setAnnouncements] = useState<AnnouncementResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAnnouncements();
      // Filter out current announcement and limit to 4 items
      setAnnouncements(data.filter(a => a.id !== currentAnnouncementId).slice(0, 4));
    } catch (err) {
      setError("خطا در دریافت اطلاعیه‌های مرتبط");
      console.error("Related announcements load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, [currentAnnouncementId]);

  if (error) {
    return (
      <ErrorDisplayComponent
        title="خطا در دریافت اطلاعیه‌های مرتبط"
        description="در دریافت لیست اطلاعیه‌های مرتبط مشکلی پیش آمده است"
        button={{
          text: "تلاش مجدد",
          icon: RefreshCcw,
          onClick: loadAnnouncements
        }}
      />
    );
  }

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">اطلاعیه‌های مرتبط</h2>
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

  if (!announcements.length) return null;

  return <RelatedAnnouncements announcements={announcements} />;
} 