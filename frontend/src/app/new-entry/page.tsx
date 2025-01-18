"use client";

import {
	getEnglishValue,
	getPersianValue,
	validatePhoneNumber,
	waitForSeconds,
} from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { API_BASE_URL } from "../../../configs";
import { Input } from "@/components/ui/input";
import { Loader2, Phone, UserSearch } from "lucide-react";
import LuxuryButton from "@/components/ui/components_LuxuryButton";
import AuthToggle from "@/components/AuthToggle";
import { AuthLayout } from "@/components/AuthLayout";

export default function NewEntry() {
	const [phoneNumber, setPhoneNumber] = useState<string>("");
	const [inviterPhoneNumber, setInviterPhoneNumber] = useState<string>("");
	const [enteryMode, setEntryMode] = useState<"register" | "login">(
		"register"
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
					inviterPhoneNumber: inviterPhoneNumber,
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
			router.push(
				`/new-verify-otp?phoneNumber=${phoneNumber}&userId=${userId}`
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
		<AuthLayout>
			<div
				className="flex flex-col gap-y-4 p-8"
				dir="rtl"
			>
				<AuthToggle
					className="text-primary"
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
				<div
					className="relative"
					style={{ height: "50px" }}
				>
					<Input
						className="bg-neutral-50 placeholder:text-base md:text-lg text-lg"
						placeholder="شماره همراه خود را وارد کنید"
						style={{
							paddingRight: "40px",
							height: "100%",
						}}
						value={getPersianValue(phoneNumber)}
						onChange={(e) =>
							setPhoneNumber(getEnglishValue(e.target.value))
						}
					/>
					<Phone
						className="absolute -translate-y-1/2 top-1/2"
						style={{ right: "10px" }}
					/>
				</div>
				{enteryMode === "register" && (
					<div
						className="relative"
						style={{ height: "50px" }}
					>
						<Input
							style={{
								paddingRight: "40px",
								height: "100%",
							}}
							className="bg-neutral-50 placeholder:text-base md:text-lg text-lg"
							placeholder="شماره تلفن معرف (اختیاری)"
							value={getPersianValue(inviterPhoneNumber)}
							onChange={(e) =>
								setInviterPhoneNumber(
									getEnglishValue(e.target.value)
								)
							}
						/>
						<UserSearch
							className="absolute -translate-y-1/2 top-1/2"
							style={{ right: "10px" }}
						/>
					</div>
				)}
				<LuxuryButton
					themeVariant="modern"
					style={{ width: "100%", height: "40px" }}
					className="flex items-center justify-center"
					disabled={
						loading ||
						validatePhoneNumber(phoneNumber) === false ||
						(enteryMode === "register" &&
							Boolean(inviterPhoneNumber) &&
							validatePhoneNumber(inviterPhoneNumber) === false)
					}
					onClick={handleSubmit}
				>
					<div className="flex items-center gap-2">
						{enteryMode === "login" ? "ورود" : "ثبت نام"}
						{loading === true && (
							<Loader2
								className="h-8 w-8 animate-spin text-white"
								style={{ flex: "auto 1 1", height: "18px" }}
							/>
						)}
					</div>
				</LuxuryButton>
			</div>
		</AuthLayout>
	);
}
