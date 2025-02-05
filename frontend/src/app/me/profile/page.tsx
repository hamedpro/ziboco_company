"use client";

import { useEffect, useState } from "react";
import { ProfileAccordions } from "../transactions/ProfileAccordions";
import { IdentityVerificationCard } from "./IdentityVerificationCard";
import { InviteFriendsCard } from "./InviteFriendsCard";
import { ProfileOverviewCard } from "./ProfileOverviewCard";
import axios from "axios";
import { API_BASE_URL } from "../../../../configs";
import { Loader } from "@/components/Loader";
import { IconInfoOctagon } from "@tabler/icons-react";
export type serverProfileData = {
	name: string | null;
	family: string | null;
	birthDate: string | null;
	natinalCode: string | null;
	cellNumber: string;
	referralCode: string;
};
export default function Profile() {
	let [profileData, setProfileData] = useState<
		"error" | serverProfileData | undefined
	>();
	useEffect(() => {
		async function fetchData() {
			try {
				let data = (
					await axios({
						url: "/api/profile",
						headers: {
							Authorization: `Bearer ${localStorage.getItem(
								"accessToken"
							)}`,
						},
						baseURL: API_BASE_URL,
						withCredentials: true,
					})
				).data;
				setProfileData(data);
			} catch (error) {
				setProfileData("error");
			}
		}
		fetchData();
	}, []);
	if (profileData === "error") {
		return (
			<div
				className="flex items-center text-white flex-col"
				style={{ paddingTop: "200px" }}
				dir="rtl"
			>
				<div className="flex items-center gap-x-2">
					<IconInfoOctagon /> <span>خطایی رخ داده است</span>
				</div>
				<div>برای اطلاعات بیشتر با پشتیبانی در تماس باشید</div>
			</div>
		);
	}
	if (profileData === undefined) {
		return (
			<Loader
				isFullScreen
				className="text-white"
			/>
		);
	}
	return (
		<>
			<div className="flex flex-col px-6 gap-y-4">
				<ProfileOverviewCard {...{ profileData }} />
				<IdentityVerificationCard {...{ profileData }} />
				<InviteFriendsCard {...{ profileData }} />
			</div>
			<ProfileAccordions />
		</>
	);
}
