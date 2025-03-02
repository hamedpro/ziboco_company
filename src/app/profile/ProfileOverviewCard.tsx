import React from "react";
import { Calendar1, Hash, Phone, User } from "lucide-react";
import { localColors } from "./variables";
import { serverProfileData } from "./page";
import { getPersianValue } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const ProfileOverviewCard = ({
	profileData,
}: {
	profileData: serverProfileData;
}) => {
	return (
		<Card className="w-full" style={{ backgroundColor: localColors[0] }}>
			<CardHeader className="flex justify-center items-center pb-0">
				<Avatar className="h-20 w-20 bg-primary/10 text-primary">
					<AvatarFallback className="text-neutral-300">
						<User size={32} />
					</AvatarFallback>
				</Avatar>
				<Badge variant="outline" className="mt-2 text-neutral-300 font-medium py-1 px-3">
					کاربر سطح دو
				</Badge>
			</CardHeader>
			
			<CardContent className="mt-6">
				<Separator className="mb-6 bg-neutral-700" />
				
				<div className="grid grid-cols-3 gap-4">
					{[
						{
							title: "تاریخ تولد",
							value: profileData.birthDate || "----",
							icon: <Calendar1 size={18} />,
						},
						{
							title: "کد ملی",
							value: profileData.natinalCode || "----",
							icon: <Hash size={18} />,
						},
						{
							title: "شماره همراه",
							value: getPersianValue(profileData.cellNumber),
							icon: <Phone size={18} />,
						},
					].map((item) => (
						<div
							className="flex flex-col items-center gap-y-2"
							key={item.title}
						>
							<div className="h-10 w-10 bg-neutral-300/10 flex justify-center items-center rounded-full">
								<span className="text-neutral-300">{item.icon}</span>
							</div>
							<p className="text-neutral-300 text-xs font-medium">{item.title}</p>
							<p className="text-neutral-300 text-sm">{item.value}</p>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
