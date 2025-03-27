"use client";

import { useEffect, useState } from "react";
import { IdentityVerificationCard } from "./IdentityVerificationCard";
import { InviteFriendsCard } from "./InviteFriendsCard";
import { ProfileOverviewCard } from "./ProfileOverviewCard";
import { AddressCard } from "./AddressCard";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../configs";
import { Loader } from "@/components/Loader";
import { IconInfoOctagon } from "@tabler/icons-react";
import SessionExpiredPopup from "@/components/SessionExpiredPopup";
import { LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export type serverProfileData = {
	name: string | null;
	family: string | null;
	birthDate: string | null;
	natinalCode: string | null;
	cellNumber: string;
	referralCode: string;
};

function LogoutCard() {
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		
		// Simulate a delay for the animation
		await new Promise(resolve => setTimeout(resolve, 1500));
		
		localStorage.removeItem("accessToken");
		window.location.assign("/auth/entry");
	};

	return (
		<Card className="w-full shadow-md border-blue-200 hover:shadow-lg transition-all duration-300">
			<CardHeader className="pb-2">
				<CardTitle className="text-lg font-bold text-primary text-right">خروج از حساب کاربری</CardTitle>
				<CardDescription className="text-sm text-right">
					برای خروج از حساب کاربری خود، دکمه زیر را انتخاب کنید
				</CardDescription>
			</CardHeader>
			<CardFooter className="pt-4" dir="rtl">
				<Button 
					variant="destructive" 
					className="w-full flex items-center justify-center gap-2 flex-row-reverse h-11"
					onClick={handleLogout}
					disabled={isLoggingOut}
				>
					{isLoggingOut ? (
						<>
							<Loader2 className="w-5 h-5 animate-spin" />
							<span>در حال خروج...</span>
						</>
					) : (
						<>
							<LogOut className="w-5 h-5" />
							<span>خروج از حساب</span>
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
}

export default function Profile() {
	let [profileData, setProfileData] = useState<
		"error" | serverProfileData | undefined
	>();
	const [showSessionExpired, setShowSessionExpired] = useState(false);

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
				if (
					error instanceof AxiosError &&
					error.response?.status === 401
				) {
					setShowSessionExpired(true);
				}
				setProfileData("error");
			}
		}
		fetchData();
	}, []);

	if (profileData === "error" && !showSessionExpired) {
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
			<div className="flex flex-col gap-y-4 p-8">
				<ProfileOverviewCard
					{...{ profileData: profileData as serverProfileData }}
				/>
				<IdentityVerificationCard
					{...{ profileData: profileData as serverProfileData }}
				/>
				<AddressCard 
					{...{ profileData: profileData as serverProfileData }}
				/>
				<InviteFriendsCard
					{...{ profileData: profileData as serverProfileData }}
				/>
				<LogoutCard />
			</div>
			{/* <ProfileAccordions /> */}
			<SessionExpiredPopup isOpen={showSessionExpired} />
		</>
	);
}
