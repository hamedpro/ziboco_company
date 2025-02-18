"use client";

import { useParams } from "next/navigation";
import { AnnouncementMetadataProvider } from "@/components/announcement/announcement-metadata-provider";
import { RelatedAnnouncementsProvider } from "@/components/announcement/related-announcements-provider";
import { ErrorDisplayComponent } from "@/components/error-display";

export default function AnnouncementDetailPage() {
	const { id } = useParams();

	if (!id || Array.isArray(id)) {
		return (
			<div className="max-w-4xl mx-auto p-16 flex flex-col items-center justify-center">
				<ErrorDisplayComponent
					title="شناسه اطلاعیه نامعتبر است"
					description="لطفا از طریق لیست اطلاعیه‌ها وارد صفحه اطلاعیه شوید"
					variant="generic"
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-4" dir="rtl">
			<AnnouncementMetadataProvider announcementId={id} />
			<RelatedAnnouncementsProvider currentAnnouncementId={id} />
		</div>
	);
}
