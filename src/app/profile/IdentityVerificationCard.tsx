import React from "react";
import { MoveLeft, ShieldAlert } from "lucide-react";
import { localColors } from "./variables";
import { serverProfileData } from "./page";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const IdentityVerificationCard = ({
	profileData,
}: {
	profileData: serverProfileData;
}) => {
	return (
		<Card 
			style={{ backgroundColor: localColors[1] }} 
			className="w-full overflow-hidden"
			dir="rtl"
		>
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<div className="bg-amber-500/20 p-3 rounded-full text-amber-500">
						<ShieldAlert size={24} />
					</div>
					
					<div className="flex-1 space-y-4">
						<p className="text-neutral-300">
							برای دسترسی به خدمات توکنیکو احراز هویت خود را تکمیل نمایید.
						</p>
						
						<Button 
							variant="ghost" 
							className={cn(
								"pr-0 hover:bg-transparent flex items-center gap-2 font-medium",
								"hover:text-neutral-100 transition-colors"
							)}
							style={{ color: localColors[2] }}
						>
							تکمیل فرآیند احراز هویت 
							<MoveLeft size={18} />
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
