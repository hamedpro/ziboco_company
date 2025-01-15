"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, X } from "lucide-react";
import {
	convertToEnglish,
	createUrlFromOriginWithPort,
	getEnglishValue,
	getPersianValue,
	validatePhoneNumber,
	waitForSeconds,
} from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { API_BASE_URL } from "../../../configs";

export default function LoginPage() {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async () => {
		setLoading(true);

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
			router.push(`/verify-otp?phoneNumber=${phoneNumber}&userId=${userId}`);
		} catch (error) {
			toast.error("خطای ناشناخته", {
				description: "پس از چند دقیقه دوباره امتحان کنید یا با پشتیبانی در تماس باشید.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div
			className="min-h-screen"
			dir="rtl"
		>
			<div className="flex w-full items-center justify-end p-6">
				<p className="text-blue-400 font-medium cursor-pointer">EN</p>
			</div>
			<div className="flex flex-col px-6 w-full">
				<h1 className="text-3xl font-bold mb-10">خوش آمدید!</h1>
			</div>
			<div className="flex flex-col gap-y-5 px-6 w-full">
				<p className="text-muted-foreground text-sm leading-6">
					لطفا شمارۀ موبایلتان را وارد کنید تا بتوانیم با شما در ارتباط باشیم
				</p>

				<label className="block text-sm text-muted-foreground mb-2">شمارۀ موبایل :</label>
				<div className="relative w-full">
					<Input
						type="tel"
						value={getPersianValue(phoneNumber)}
						onChange={(e) => setPhoneNumber(getEnglishValue(e.target.value))}
						className="w-full h-14 text-right border rounded-lg text-lg md:text-lg focus:border-muted focus:ring-0"
						required
						placeholder="مثلا ۰۹۱۲۳۴۵۶۷۸۹"
					/>
					{phoneNumber && (
						<button
							type="button"
							onClick={() => setPhoneNumber("")}
							className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary-foreground"
						>
							<X className="h-5 w-5" />
						</button>
					)}
				</div>

				<p className="text-sm text-primary-foreground">
					با ثبت نام در زیب و کو، {"  "}
					<a
						href="#"
						className="text-blue-500 hover:text-blue-600"
					>
						قوانین و شرایط
					</a>{" "}
					و{" "}
					<a
						href="#"
						className="text-blue-500 hover:text-blue-600"
					>
						بیانیه حریم خصوصی
					</a>{" "}
					را می‌پذیرم
				</p>
			</div>
			<div className="flex flex-row p-6 w-full justify-end">
				<Button
					size="icon"
					className="rounded-full w-10 h-10 bg-green-500 hover:bg-green-600 shadow-lg"
					disabled={loading || validatePhoneNumber(phoneNumber) === false}
					onClick={handleSubmit}
				>
					{loading ? (
						<Loader2
							className="h-8 w-8 animate-spin text-white"
							style={{ flex: "auto 1 1", height: "18px" }}
						/>
					) : (
						<ArrowLeft
							className="h-8 w-8 text-white"
							style={{ flex: "auto 1 1", height: "18px" }}
						/>
					)}
				</Button>
			</div>
		</div>
	);
}
