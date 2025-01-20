"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader } from "lucide-react";
import {
	authLayoutColors,
	generateRange,
	getEnglishValue,
	getPersianValue,
	setJwtCookie,
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
import LuxuryButton from "@/components/ui/components_LuxuryButton";

function VerifyOTP() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const phoneNumber = searchParams.get("phoneNumber");
	const userId = searchParams.get("userId");
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
				withCredentials: false,
			});
			let {
				token,
				result: { status, message },
			} = response.data;
			if (status === 1) {
				toast.error("خطای ارسال پیامک", { description: message });
				return;
			}
			setJwtCookie(token, "JWT", 2);
			router.push("/dashboard");
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
		const params = new URLSearchParams(searchParams.toString());

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
					device: {
						deviceId: "string",
						deviceModel: "string",
						deviceAPI: "string",
						osName: "string",
					},
				},
				withCredentials: false,
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
		<div
			className="flex flex-col gap-y-4 px-8 items-center"
			dir="rtl"
		>
			<h1
				className="text-2xl"
				style={{ color: authLayoutColors[1] }}
			>
				کد تایید را وارد کنید
			</h1>
			<p
				className=""
				style={{ color: authLayoutColors[2] }}
			>
				کد تایید را به شماره {getPersianValue(phoneNumber || "")}{" "}
				فرستادیم
			</p>

			<div
				dir="ltr"
				className="flex w-full justify-center my-4 text-primary"
			>
				<InputOTP
					maxLength={4}
					onChange={(newValue) => setOtp(getEnglishValue(newValue))}
					value={getPersianValue(otp)}
				>
					<InputOTPGroup>
						{generateRange(4).map((item) => (
							<InputOTPSlot
								className="w-14 h-14 ring-0"
								index={item}
								key={item}
							></InputOTPSlot>
						))}
					</InputOTPGroup>
				</InputOTP>
			</div>
			<LuxuryButton
				themeVariant="modern"
				onClick={() => handleVerify(otp)}
				disabled={otp.length !== 4}
				style={{ maxWidth: "350px" }}
			>
				ورود
			</LuxuryButton>

			<div
				className="flex items-center gap-x-2"
				style={{ color: authLayoutColors[2] }}
				onClick={resendSMS}
			>
				<span>ارسال دوباره کد با پیامک</span>
				{resendingSMS && (
					<Loader
						style={{ height: "17px", width: "17px" }}
						className="animate-spin"
					/>
				)}
			</div>
			<div
				className="flex items-center gap-x-2 cursor-pointer"
				style={{ color: authLayoutColors[2] }}
				onClick={() => router.push(`/auth/entry`)}
			>
				ویرایش شماره همراه
			</div>
		</div>
	);
}
export default function VerifyOTPWrapper() {
	return (
		<Suspense fallback={<LoaderComponent isFullScreen />}>
			<VerifyOTP />
		</Suspense>
	);
}
