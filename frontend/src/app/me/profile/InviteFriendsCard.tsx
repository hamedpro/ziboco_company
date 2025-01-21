import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { waitForSeconds } from "@/lib/utils";
import { ClipboardCheck, Loader } from "lucide-react";
import { localColors } from "./variables";

export const InviteFriendsCard = () => {
	let [copyingState, setCopyingState] = useState<
		"ready" | "success" | "loading"
	>("ready");
	return (
		<div
			style={{ backgroundColor: localColors[3] }}
			className="rounded-xl w-full p-4 flex gap-x-4 text-neutral-300 "
			dir="rtl"
		>
			<div className="flex flex-col gap-y-1 justify-center shrink-0">
				<img
					src="/gift.png"
					className="h-24"
				/>
			</div>
			<div className="flex flex-col gap-y-2">
				<h1
					style={{ color: localColors[4] }}
					className="text-lg"
				>
					دعوت از دوستان
				</h1>
				<p>با دعوت از دوستان خود ۵ سوت طلای ۱۸ عیار دریافت کنید</p>
				<Button
					onClick={async () => {
						setCopyingState("loading");
						await waitForSeconds(1.5);
						setCopyingState("success");
						setTimeout(() => {
							setCopyingState("ready");
						}, 3000);
					}}
				>
					{(copyingState === "ready" ||
						copyingState === "loading") && (
						<>
							{copyingState === "loading" && (
								<Loader className="animate-spin" />
							)}
							<span>ارسال لینک دعوت</span>
						</>
					)}
					{copyingState === "success" && (
						<>
							<ClipboardCheck />
							<span>رونوشت انجام شد</span>
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
