"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader, Loader2 } from "lucide-react";
import {
	createUrlFromOriginWithPort,
	generateRange,
	getEnglishValue,
	getPersianValue,
	waitForSeconds,
} from "@/lib/utils";
import Link from "next/link";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";
import axios, { Axios, AxiosError } from "axios";
import { Loader as LoaderComponent } from "@/components/Loader";

function VerifyOTP() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const phoneNumber = searchParams.get("phoneNumber");
	const [otp, setOtp] = useState("");
	const [resendingSMS, setResendingSMS] = useState(false);
	const [recalling, setRecalling] = useState(false);

	const handleVerify = async (otp: string) => {
		if (!phoneNumber) return;

		try {
			const { data } = await axios({
				baseURL: "http://localhost:8000",
				url: "/verify-otp",
				method: "POST",
				data: { phoneNumber, otp },
			});

			localStorage.setItem("token", data.JWT);
			router.push("/dashboard");
		} catch (error) {
			toast.error("خطایی رخ داد", {
				description:
					error instanceof AxiosError
						? error.response?.data.message
						: "خطای ناشناخته رخ داده است",
			});
		} finally {
			setOtp("");
		}
	};
	async function resendSMS() {
		setOtp("");
		setResendingSMS(true);
		try {
			await waitForSeconds(1.5);
			await axios({
				baseURL: createUrlFromOriginWithPort(8000),
				url: "/request-otp",
				method: "POST",
				data: { phoneNumber },
			});
			toast.success("عملیات موفق", { description: "کد تایید جدید با موفقیت ارسال شد" });
		} catch (error) {
			toast.error("خطا در ارتباط", {
				description:
					error instanceof AxiosError
						? error.response?.data.message
						: "خطای ناشناخته رخ داده است",
			});
		} finally {
			setResendingSMS(false);
		}
	}
	async function recall() {
		setOtp("");
		setRecalling(true);
		await waitForSeconds(1.5);
		toast.error("به زودی", { description: "این قابلیت به زودی در دسترس قرار خواهد گرفت" });
		setRecalling(false);
	}

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
	};

	return (
		<div
			className="min-h-screen"
			dir="rtl"
		>
			<div className="flex w-full p-6 justify-between">
				<ArrowRight /> <p className="text-blue-400 font-medium cursor-pointer">EN</p>
			</div>
			<div className="flex flex-col w-full gap-y-5 px-6">
				<h1 className="text-2xl">کد تایید را وارد کنید</h1>
				<p className="text-sm text-secondary-foreground">
					کد تایید را به شماره {getPersianValue(phoneNumber || "")} فرستادیم
				</p>
				<div className="flex items-center gap-x-2">
					<span>شماره موبایل اشتباه است؟</span>
					<Link
						href={"/entry"}
						className="text-blue-400"
					>
						ویرایش
					</Link>
				</div>
				<div
					dir="ltr"
					className="flex w-full justify-center my-8"
				>
					<InputOTP
						maxLength={6}
						onChange={(newValue) => setOtp(getEnglishValue(newValue))}
						value={getPersianValue(otp)}
						onComplete={(value) => {
							handleVerify(getEnglishValue(value));
						}}
					>
						<InputOTPGroup>
							{generateRange(6).map((item) => (
								<InputOTPSlot
									className="w-14 h-14"
									index={item}
									key={item}
								></InputOTPSlot>
							))}
						</InputOTPGroup>
					</InputOTP>
				</div>

				<Button
					className={`text-sm text-blue-400 hover:bg-blue-100 w-fit px-2`}
					variant={"ghost"}
					onClick={resendSMS}
				>
					<div className="flex items-center gap-x-2">
						<span>ارسال دوباره کد با پیامک</span>
						{resendingSMS && (
							<Loader
								style={{ height: "17px", width: "17px" }}
								className="animate-spin"
							/>
						)}
					</div>
				</Button>
				<Button
					className={`text-sm text-blue-400 hover:bg-blue-100 w-fit px-2`}
					variant={"ghost"}
					onClick={recall}
				>
					<div className="flex items-center gap-x-2">
						<span>ارسال دوباره کد با تماس تلفنی</span>
						{recalling && (
							<Loader
								style={{ height: "17px", width: "17px" }}
								className="animate-spin"
							/>
						)}
					</div>
				</Button>
			</div>
		</div>
	);
}
export default function VerifyOTPPAGE() {
	return (
		<Suspense fallback={<LoaderComponent isFullScreen/>}>
			<VerifyOTP />
		</Suspense>
	);
}
