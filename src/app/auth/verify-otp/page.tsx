"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import {
	authLayoutColors,
	generateRange,
	getEnglishValue,
	getPersianValue,
	// setJwtCookie,
	waitForSeconds,
} from "@/lib/utils";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import axios from "axios";
import { Loader as LoaderComponent } from "@/components/Loader";
import { API_BASE_URL } from "../../../../configs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function VerifyOTP() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const phoneNumber = searchParams?.get("phoneNumber");
	const userId = searchParams?.get("userId");
	const referralCode = searchParams?.get("referralCode");
	const [otp, setOtp] = useState("");
	const [resendingSMS, setResendingSMS] = useState(false);

	const handleVerify = async (otp: string) => {
		if (!phoneNumber) return;

		try {
			const response = await axios({
				baseURL: API_BASE_URL,
				url: "/api/Account/Activate",
				method: "POST",
				data: { smsToken: otp, userId },
			});
			let {
				token,
				result: { status, message },
			} = response.data;
			if (status === 1) {
				toast.error("خطای ارسال پیامک", { description: message });
				return;
			}
			// setJwtCookie(token);
			localStorage.setItem("accessToken", token);
			router.push("/profile");
		} catch (error) {
			toast.error("خطای ناشناخته", {
				description:
					"پس از چند دقیقه دوباره امتحان کنید یا با پشتیبانی در تماس باشید.",
			});
		} finally {
			setOtp("");
		}
	};
	const updateSearchParam = (key: string, value: string) => {
		// Create a new URLSearchParams object from the existing ones
		const params = new URLSearchParams(
			searchParams?.toString() || undefined
		);

		// Update the specific key-value pair
		params.set(key, value);

		// Push the updated search parameters to the router
		router.push(`?${params.toString()}`);
	};
	async function resendSMS() {
		setOtp("");
		setResendingSMS(true);
		try {
			await waitForSeconds(0.5);
			let response = await axios({
				baseURL: API_BASE_URL,
				url: "/api/Account/SendSMS",
				method: "POST",
				data: {
					cellNumber: phoneNumber,
					referralCode: referralCode ? referralCode : null,
					device: {
						deviceId: "string",
						deviceModel: "string",
						deviceAPI: "string",
						osName: "string",
					},
				},
			});
			let {
				userId,
				result: { message, status },
			} = response.data;
			if (status === 1) {
				toast.error("خطای ارسال پیامک", { description: message });
				return;
			}
			updateSearchParam("userId", userId);
			toast.success("عملیات موفق", {
				description: "کد تایید جدید با موفقیت ارسال شد",
			});
		} catch (error) {
			toast.error("خطای ناشناخته", {
				description:
					"پس از چند دقیقه دوباره امتحان کنید یا با پشتیبانی در تماس باشید.",
			});
		} finally {
			setResendingSMS(false);
		}
	}

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<main className="container mx-auto my-12 px-4 md:my-20">
			<div className="flex justify-center">
				<Card className="w-full max-w-md shadow-lg border-blue-200">
					<CardHeader className="space-y-1 text-center pb-2">
						<CardTitle className="text-xl md:text-2xl font-bold text-primary">
							کد تایید را وارد کنید
						</CardTitle>
						<CardDescription className="text-sm md:text-base">
							کد تایید را به شماره {getPersianValue(phoneNumber || "")} فرستادیم
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6 pt-4" dir="rtl">
						<div dir="ltr" className="flex w-full justify-center my-4">
							<InputOTP
								maxLength={4}
								onChange={(newValue) => setOtp(getEnglishValue(newValue))}
								value={getPersianValue(otp)}
							>
								<InputOTPGroup>
									{generateRange(4).map((item) => (
										<InputOTPSlot
											className="w-14 h-14 text-lg font-medium focus:ring-2 focus:ring-primary focus:border-primary border-gray-300"
											index={item}
											key={item}
										></InputOTPSlot>
									))}
								</InputOTPGroup>
							</InputOTP>
						</div>
					</CardContent>

					<CardFooter dir="rtl" className="flex flex-col gap-4">
						<Button
							variant="default"
							className="w-full h-12 text-base font-medium"
							size="lg"
							disabled={otp.length !== 4}
							onClick={() => handleVerify(otp)}
						>
							ورود
						</Button>

						<div className="flex flex-col items-center gap-3 w-full text-center">
							<button
								className="text-primary hover:text-primary/80 text-sm font-medium transition-colors flex items-center gap-2"
								onClick={resendSMS}
								disabled={resendingSMS}
							>
								<span>ارسال دوباره کد با پیامک</span>
								{resendingSMS && (
									<Loader
										className="h-4 w-4 animate-spin"
									/>
								)}
							</button>

							<button 
								className="text-muted-foreground hover:text-primary text-sm transition-colors"
								onClick={() =>
									referralCode
										? router.push(`/auth/entry?referralCode=${referralCode}`)
										: router.push(`/auth/entry`)
								}
							>
								ویرایش شماره همراه
							</button>
						</div>
					</CardFooter>
				</Card>
			</div>
		</main>
	);
}

export default function VerifyOTPWrapper() {
	return (
		<Suspense fallback={<LoaderComponent isFullScreen />}>
			<VerifyOTP />
		</Suspense>
	);
}
