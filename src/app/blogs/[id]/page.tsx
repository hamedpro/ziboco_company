"use client";

import { useParams } from "next/navigation";
import { BlogMetadataProvider } from "@/components/blog/blog-metadata-provider";
import { ErrorDisplayComponent } from "@/components/error-display";

export default function BlogDetailPage() {
	const { id } = useParams();

	if (!id || Array.isArray(id)) {
		return (
			<div className="max-w-4xl mx-auto p-16 flex flex-col items-center justify-center">
				<ErrorDisplayComponent
					title="شناسه مقاله نامعتبر است"
					description="لطفا از طریق لیست مقالات وارد صفحه مقاله شوید"
					variant="generic"
				/>
			</div>
		);
	}

	return (
		<div className="min-h-screen p-4" dir="rtl">
			<BlogMetadataProvider blogId={id} />
		</div>
	);
}
