import React from "react";
import { Calendar1, Hash, Phone, User } from "lucide-react";
import { localColors } from "./variables";
import { serverProfileData } from "./page";
import { Progress } from "@/components/ui/progress";
import { getPersianValue } from "@/lib/utils";

export const ProfileOverviewCard = ({
	profileData,
}: {
	profileData: serverProfileData;
}) => {
	return (
		<div
			style={{ backgroundColor: localColors[0] }}
			className="rounded-xl w-full p-4 flex flex-col gap-y-6"
		>
			<div className="flex justify-center flex-col items-center text-neutral-300 gap-y-2">
				<User size={45} />
				<p>کاربر سطح دو</p>
			</div>
			<div className="flex">
				{[
					{
						title: "تاریخ تولد",
						value: profileData.birthDate || "----",
						icon: <Calendar1 />,
					},
					{
						title: "کد ملی",
						value: profileData.natinalCode || "----",
						icon: <Hash />,
					},
					{
						title: "شماره همراه",
						value: getPersianValue(profileData.cellNumber),
						icon: <Phone />,
					},
				].map((item) => (
					<div
						className="flex flex-col items-center gap-y-2 w-1/3"
						key={item.title}
					>
						<div className="h-9 w-12 bg-neutral-300 flex justify-center items-center rounded">
							{item.icon}
						</div>
						<p className="text-neutral-300 text-sm">{item.title}</p>
						<p className="text-neutral-300 text-sm">{item.value}</p>
					</div>
				))}
			</div>
		</div>
	);
};
