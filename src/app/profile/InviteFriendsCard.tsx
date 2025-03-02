import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { waitForSeconds } from "@/lib/utils";
import { ClipboardCheck, Loader, AlertCircle, Gift } from "lucide-react";
import { localColors } from "./variables";
import { serverProfileData } from "./page";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const InviteFriendsCard = ({
	profileData,
}: {
	profileData: serverProfileData;
}) => {
	let [copyingState, setCopyingState] = useState<
		"ready" | "success" | "loading" | "error"
	>("ready");
	
	return (
		<Card
			style={{ backgroundColor: localColors[3] }}
			className="w-full overflow-hidden"
			dir="rtl"
		>
			<CardContent className="p-6">
				<div className="flex gap-6">
					<div className="flex items-center justify-center shrink-0">
						{/* Using a div with an icon as fallback in case the image isn't available */}
						<div className="relative w-24 h-24 flex items-center justify-center">
							<img
								src="/gift.png"
								className="h-24 object-contain"
								alt="Gift icon"
								onError={(e) => {
									// Fallback to Lucide icon if image fails to load
									e.currentTarget.style.display = 'none';
									e.currentTarget.nextElementSibling?.classList.remove('hidden');
								}}
							/>
							<div className="hidden absolute inset-0 flex items-center justify-center text-amber-200">
								<Gift size={40} />
							</div>
						</div>
					</div>
					
					<div className="flex flex-col gap-4 flex-1">
						<h3
							style={{ color: localColors[4] }}
							className="text-lg font-medium"
						>
							دعوت از دوستان
						</h3>
						<p className="text-neutral-300">
							با دعوت از دوستان خود ۵ سوت طلای ۱۸ عیار دریافت کنید
						</p>
						
						<div className="mt-2">
							<Button
								variant={copyingState === "error" ? "destructive" : "secondary"}
								disabled={copyingState === "loading"}
								size="sm"
								className={cn(
									"font-medium",
									copyingState === "success" && "bg-green-600 text-white hover:bg-green-700"
								)}
								onClick={async () => {
									setCopyingState("loading");
									try {
										if (!navigator.clipboard) {
											throw new Error("Clipboard is not supported");
										}
										await navigator.clipboard.writeText(
											`${window.location.origin}/auth/entry?referralCode=${profileData.referralCode}`
										);
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
										<Loader className="animate-spin ml-2" size={16} />
										<span>در حال کپی کردن</span>
									</>
								)}
								{copyingState === "success" && (
									<>
										<ClipboardCheck className="ml-2" size={16} />
										<span>رونوشت انجام شد</span>
									</>
								)}
								{copyingState === "error" && (
									<>
										<AlertCircle className="ml-2" size={16} />
										<span>خطا در کپی کردن</span>
									</>
								)}
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
