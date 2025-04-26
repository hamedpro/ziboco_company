"use client";

import {
	convertToEnglish,
	convertToPersian,
	getEnglishValue,
	getPersianValue,
	validatePhoneNumber,
	waitForSeconds,
} from "@/lib/utils";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../../../configs";
import { Input } from "@/components/ui/input";
import { Loader2, Phone, UserSearch, CreditCard } from "lucide-react";
import AuthToggle from "@/components/AuthToggle";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

function Entry() {
	const searchParams = useSearchParams();
	const modeParam = searchParams?.get("mode");
	const referralCodeParam = searchParams?.get("referralCode");

	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [referralCode, setReferralCode] = useState<string>(
		referralCodeParam || ""
	);
	const [creditCode, setCreditCode] = useState<string>("");
	const [enteryMode, setEntryMode] = useState<"register" | "login">(
		referralCodeParam
			? "register"
			: modeParam === "login" || modeParam === "register"
			? modeParam
			: "register"
	);

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
					referralCode: referralCode || null,
					creditCode: creditCode || null,
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

			const referralQueryParam =
				enteryMode === "register" && referralCode
					? `&referralCode=${referralCode}`
					: "";
			const creditCodeQueryParam =
				enteryMode === "register" && creditCode
					? `&creditCode=${creditCode}`
					: "";
			router.push(
				`/auth/verify-otp?phoneNumber=${phoneNumber}&userId=${userId}${referralQueryParam}${creditCodeQueryParam}`
			);
		} catch (error) {
			toast.error("خطای ناشناخته", {
				description:
					"پس از چند دقیقه دوباره امتحان کنید یا با پشتیبانی در تماس باشید.",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="container mx-auto my-12 px-4 md:my-20">
			<div className="flex justify-center">
				<Card className="w-full max-w-md shadow-lg border-blue-200">
					<CardHeader className="space-y-1 text-center pb-2">
						<CardTitle className="text-xl md:text-2xl font-bold text-primary">
							{enteryMode === "login" ? "ورود به حساب" : "ثبت نام در زیبوکو"}
						</CardTitle>
						<CardDescription className="text-sm md:text-base">
							{enteryMode === "login" 
								? "برای ورود به حساب خود، شماره موبایل خود را وارد کنید" 
								: "برای عضویت در زیبوکو، شماره موبایل خود را وارد کنید"}
						</CardDescription>
					</CardHeader>
					
					<CardContent className="space-y-4 pt-4" dir="rtl">
						<AuthToggle
							className="text-primary mb-4"
							options={[
								{ label: "ورود", value: "login" },
								{ label: "ثبت نام", value: "register" },
							]}
							value={enteryMode}
							onChange={(newValue) =>
								setEntryMode(newValue as "register" | "login")
							}
							style={{ height: "50px" }}
						/>
						
						<div className="relative">
							<Input
								className="bg-neutral-50 h-12 pl-10 pr-12 text-base md:text-lg"
								placeholder="شماره همراه خود را وارد کنید"
								value={getPersianValue(phoneNumber)}
								onChange={(e) =>
									setPhoneNumber(getEnglishValue(e.target.value))
								}
							/>
							<Phone
								className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
								size={20}
							/>
						</div>
						
						{enteryMode === "register" && (
							<>
								<div className="relative">
									<Input
										className="bg-neutral-50 h-12 pl-10 pr-12 text-base md:text-lg"
										placeholder="کد معرف (اختیاری)"
										value={referralCode
											.split("")
											.map((char) =>
												/[a-zA-Z]/.test(char)
													? char
													: convertToPersian(char)
											)
											.join("")}
										onChange={(e) => {
											const rawValue = e.target.value;
											const converted = rawValue
												.split("")
												.map((char) =>
													/[a-zA-Z]/.test(char)
														? char
														: convertToEnglish(char)
												)
												.join("");
											setReferralCode(converted);
										}}
										disabled={
											!!referralCodeParam &&
											referralCode === referralCodeParam
										}
									/>
									<UserSearch
										className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
										size={20}
									/>
									{!!referralCodeParam &&
										referralCode === referralCodeParam && (
											<button
												className="absolute left-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 text-sm font-medium transition-colors"
												onClick={() => setReferralCode("")}
											>
												ویرایش
											</button>
										)}
								</div>
								
								<div className="relative">
									<Input
										className="bg-neutral-50 h-12 pl-10 pr-12 text-base md:text-lg"
										placeholder="کد اعتباری (اختیاری)"
										value={creditCode
											.split("")
											.map((char) =>
												/[a-zA-Z]/.test(char)
													? char
													: convertToPersian(char)
											)
											.join("")}
										onChange={(e) => {
											const rawValue = e.target.value;
											const converted = rawValue
												.split("")
												.map((char) =>
													/[a-zA-Z]/.test(char)
														? char
														: convertToEnglish(char)
												)
												.join("");
											setCreditCode(converted);
										}}
									/>
									<CreditCard
										className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
										size={20}
									/>
								</div>
							</>
						)}
					</CardContent>
					
					<CardFooter dir="rtl">
						<Button
							variant="default"
							className="w-full h-12 text-base font-medium"
							size="lg"
							disabled={loading || validatePhoneNumber(phoneNumber) === false}
							onClick={handleSubmit}
						>
							{loading ? (
								<>
									<span>در حال پردازش</span>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								</>
							) : (
								<>{enteryMode === "login" ? "ورود" : "ثبت نام"}</>
							)}
						</Button>
					</CardFooter>
				</Card>
			</div>
		</main>
	);
}

export default function Wrapper() {
	return (
		<Suspense fallback={<Loader isFullScreen />}>
			<Entry />
		</Suspense>
	);
}