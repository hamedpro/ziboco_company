"use client";

import {
	ArrowLeftRight,
	Bell,
	CircleUser,
	MenuIcon,
	ReceiptText,
	Wallet,
	X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { authLayoutColors } from "@/lib/utils";
import PhoneWrapper from "@/components/layouts/PhoneWrapper";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../configs";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SessionExpiredPopup from "@/components/SessionExpiredPopup";

type Message = {
	id: string;
	message: string;
	date: string | null;
};

type ApiResponse = {
	data: Message[];
	errorCode: number;
	errorMessage: string | null;
	errorDetail: string | null;
};

const menuItems = [
	{ id: 1, icon: <Bell />, route: "/me/notifications" },
	{ id: 2, icon: <CircleUser />, route: "/me/profile" },
	{ id: 3, icon: <ReceiptText size={30} />, route: "/me/trade" },
	{ id: 4, icon: <ArrowLeftRight />, route: "/me/transactions" },
	{ id: 5, icon: <Wallet />, route: "/me/wallet" },
];

export default function MeLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const router = useRouter();
	const [showNotifications, setShowNotifications] = useState(true);
	const [unreadMessages, setUnreadMessages] = useState<Message[] | undefined>(
		undefined
	);
	const [notificationError, setNotificationError] = useState<string | null>(
		null
	);
	const [showSessionExpired, setShowSessionExpired] = useState(false);

	useEffect(() => {
		async function fetchUnreadMessages() {
			try {
				const response = await axios<ApiResponse>({
					url: "/api/message",
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"accessToken"
						)}`,
					},
					baseURL: API_BASE_URL,
					withCredentials: true,
				});

				if (response.data.errorCode !== 0) {
					setNotificationError(
						response.data.errorMessage || "خطا در دریافت پیام‌ها"
					);
					return;
				}
				setUnreadMessages(response.data.data);
			} catch (error) {
				if (
					error instanceof AxiosError &&
					error.response?.status === 401
				) {
					setShowSessionExpired(true);
				} else {
					setNotificationError("خطا در دریافت پیام‌ها");
				}
			}
		}

		fetchUnreadMessages();
	}, []);

	const handleDismiss = () => {
		setShowNotifications(false);
	};

	const handleViewAll = () => {
		setShowNotifications(false);
		router.push("/me/notifications");
	};

	let pageTitle: string;
	switch (pathname) {
		case "/me/profile":
			pageTitle = "پروفایل من";
			break;
		case "/me/transactions":
			pageTitle = "تاریخچه تراکنش ها";
			break;
		case "/me/wallet":
			pageTitle = "کیف پول من";
			break;
		case "/me/notifications":
			pageTitle = "اعلان های من";
			break;
		case "/me/trade":
			pageTitle = "معامله جدید";
			break;
		default:
			pageTitle = "مسیر بی نام";
			break;
	}

	const notificationDialog = (
		<Dialog
			open={
				showNotifications &&
				!showSessionExpired &&
				(unreadMessages?.length ?? 0) > 0
			}
			onOpenChange={setShowNotifications}
		>
			<DialogContent
				className="sm:max-w-md"
				dir="rtl"
			>
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 px-4">
						<Bell className="h-5 w-5" />
						<span>پیام‌های جدید</span>
					</DialogTitle>
					<DialogDescription>
						{notificationError ? (
							<span className="text-destructive">
								{notificationError}
							</span>
						) : (
							`شما ${
								unreadMessages?.length ?? 0
							} پیام خوانده نشده دارید`
						)}
					</DialogDescription>
				</DialogHeader>

				{!notificationError && (
					<div className="flex flex-col gap-2">
						{unreadMessages?.slice(0, 2).map((msg) => (
							<p
								key={msg.id}
								className="text-sm"
							>
								{msg.message}
							</p>
						))}
						{(unreadMessages?.length || 0) > 2 && (
							<p className="text-sm text-muted-foreground">
								و {(unreadMessages?.length || 0) - 2} پیام
								دیگر...
							</p>
						)}
					</div>
				)}

				<DialogFooter className="flex-row-reverse gap-2">
					<Button onClick={handleViewAll}>مشاهده همه</Button>
					<Button
						variant="outline"
						onClick={handleDismiss}
					>
						بستن
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);

	const innerLayout = (
		<>
			<div
				style={{
					height: "80dvh",
					width: "100%",
					position: "absolute",
					top: "10dvh",
					overflowY: "scroll",
					scrollbarWidth: "none",
				}}
			>
				{children}
			</div>
			<div
				style={{
					height: "10dvh",
					width: "100%",
					position: "absolute",
					top: "0dvh",
				}}
				className="flex justify-between items-center px-6 text-neutral-50"
			>
				<div></div>
				<h1>{pageTitle}</h1>
				<MenuIcon />
			</div>
			<div
				style={{
					height: "10dvh",
					width: "100%",
					position: "absolute",
					bottom: "0dvh",
				}}
				className="flex border-t-2 border-neutral-900"
			>
				{menuItems.map((item, index) => (
					<div
						key={item.id}
						className={`w-1/5 cursor-pointer relative h-full flex items-center justify-center border-neutral-900 
								   ${index !== menuItems.length - 1 ? "border-r-2" : ""} 
								   ${
										pathname === item.route
											? ""
											: "text-neutral-500 hover:text-neutral-400 transition-colors"
									}
								`}
						style={
							pathname === item.route
								? { color: authLayoutColors[1] }
								: {}
						}
						onClick={() => router.push(item.route)}
					>
						{index === 2 ? (
							<div className="absolute rounded-full top-0 w-full aspect-square -translate-y-1/3 bg-gradient-to-b from-[#B8860B] to-[#F0E68C] hover:from-[#A97A0A] hover:to-[#EEE8AA] flex items-center justify-center text-white">
								{item.icon}
							</div>
						) : (
							item.icon
						)}
					</div>
				))}
			</div>
			{notificationDialog}
			<SessionExpiredPopup isOpen={showSessionExpired} />
		</>
	);

	return <PhoneWrapper>{innerLayout}</PhoneWrapper>;
}
