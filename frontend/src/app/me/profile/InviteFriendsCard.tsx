import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { waitForSeconds } from "@/lib/utils";
import { ClipboardCheck, Loader, AlertCircle } from "lucide-react";
import { localColors } from "./variables";
import axios from "axios";
import { API_BASE_URL } from "../../../../configs";

export const InviteFriendsCard = () => {
	let [copyingState, setCopyingState] = useState<
		"ready" | "success" | "loading" | "error"
	>("ready");
	return (
		<div
			style={{ backgroundColor: localColors[3] }}
			className="rounded-xl w-full p-4 flex gap-x-4 text-neutral-300"
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
					variant={
						copyingState === "error" ? "destructive" : "default"
					}
					disabled={copyingState === "loading"}
					onClick={async () => {
						setCopyingState("loading");
						try {
							let response = await axios({
								baseURL: API_BASE_URL,
								url: "/api/profile",
							});
							if (!navigator.clipboard) {
								throw new Error("Clipboard is not supported");
							}
							await navigator.clipboard.writeText(
								response.data.referralCode
							);

							// await waitForSeconds(1.5);
							setCopyingState("success");
						} catch (error) {
							setCopyingState("error");
							await waitForSeconds(3);
						} finally {
							await waitForSeconds(3);
							setCopyingState("ready");
						}
					}}
				>
					{copyingState === "ready" && <span>ارسال لینک دعوت</span>}
					{copyingState === "loading" && (
						<>
							<Loader className="animate-spin ml-2" />
							<span>در حال کپی کردن</span>
						</>
					)}
					{copyingState === "success" && (
						<>
							<ClipboardCheck className="ml-2" />
							<span>رونوشت انجام شد</span>
						</>
					)}
					{copyingState === "error" && (
						<>
							<AlertCircle className="ml-2" />
							<span>خطا در کپی کردن</span>
						</>
					)}
				</Button>
			</div>
		</div>
	);
};
