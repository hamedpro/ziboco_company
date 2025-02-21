"use client";

import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../configs";
import { ErrorDisplayComponent } from "@/components/error-display";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bell, Loader2, CheckCircle2, RefreshCcw, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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

export default function NotificationsPage() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [messages, setMessages] = useState<Message[]>([]);
	const [processingIds, setProcessingIds] = useState<string[]>([]);
	const router = useRouter();

	const loadMessages = async () => {
		try {
			setLoading(true);
			setError(null);

			const response = await axios<ApiResponse>({
				url: "/api/message",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				baseURL: API_BASE_URL,
				withCredentials: true,
			});

			if (response.data.errorCode !== 0) {
				throw new Error(response.data.errorMessage || "خطای نامشخص");
			}

			setMessages(response.data.data);
		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				setError("unauthorized");
			} else {
				setError("خطا در دریافت اطلاعات");
			}
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleMarkAsSeen = async (id: string) => {
		setProcessingIds(prev => [...prev, id]);
		try {
			const response = await axios({
				method: "POST",
				url: "/api/message",
				headers: {
					Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
				},
				baseURL: API_BASE_URL,
				withCredentials: true,
				data: { id },
			});

			if (response.data.errorCode !== 0) {
				throw new Error(response.data.errorMessage || "خطای نامشخص");
			}

			await loadMessages();
		} catch (error) {
			console.error(error);
		} finally {
			setProcessingIds(prev => prev.filter(pid => pid !== id));
		}
	};

	useEffect(() => {
		loadMessages();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto p-6 max-w-3xl space-y-6">
				<div className="space-y-2">
					<div className="h-8 w-48 bg-muted rounded animate-pulse" />
					<div className="h-4 w-96 bg-muted rounded animate-pulse" />
				</div>
				<div className="space-y-4">
					{[1, 2, 3].map(i => (
						<Card key={i} className="animate-pulse">
							<CardContent className="p-6">
								<div className="space-y-3">
									<div className="h-4 bg-muted rounded w-3/4" />
									<div className="h-4 bg-muted rounded w-1/2" />
									<div className="h-8 bg-muted rounded w-32" />
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		if (error === "unauthorized") {
			return (
				<div className="container mx-auto p-6 max-w-3xl">
					<ErrorDisplayComponent
						title="نیاز به ورود به حساب کاربری"
						description="برای مشاهده اعلان‌های خود ابتدا وارد حساب کاربری خود شوید."
						button={{
						text: "ورود به حساب کاربری",
						icon: User,
						onClick: () => router.push("/auth/entry")
					}}
					/>
				</div>
			);
		}
		
		return (
			<div className="container mx-auto p-6 max-w-3xl">
				<ErrorDisplayComponent
					title="خطا در دریافت اطلاعات"
					description="متاسفانه در دریافت اعلان‌ها خطایی رخ داده است."
					button={{
						text: "تلاش مجدد",
						icon: RefreshCcw,
						onClick: loadMessages
					}}
				/>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 max-w-3xl space-y-6">
			{/* Header */}
			<div className="space-y-1" dir="rtl">
				<h1 className="text-3xl font-bold tracking-tight">اعلان‌ها</h1>
				<p className="text-muted-foreground">
					اعلان‌های خوانده نشده و اطلاعیه‌های مهم
				</p>
			</div>

			{/* Messages List */}
			<Card>
				<CardHeader>
					<CardTitle>اعلان‌های اخیر</CardTitle>
					<CardDescription>اعلان‌های خوانده نشده شما</CardDescription>
				</CardHeader>
				<CardContent>
					{messages.length > 0 ? (
						<ScrollArea className="h-[500px] pr-4 -mr-4">
							<div className="space-y-4">
								{messages.map((message) => (
									<div 
										key={message.id} 
										className="p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
									>
										<div className="flex flex-col gap-3">
											<p className="text-sm">{message.message}</p>
											<div className="flex items-center justify-between">
												<Button
													variant="outline"
													size="sm"
													onClick={() => handleMarkAsSeen(message.id)}
													disabled={processingIds.includes(message.id)}
													className="gap-2"
												>
													{processingIds.includes(message.id) ? (
														<Loader2 className="h-4 w-4 animate-spin" />
													) : (
														<CheckCircle2 className="h-4 w-4" />
													)}
													علامت‌گذاری به عنوان خوانده‌شده
												</Button>
												<p className="text-xs text-muted-foreground">
													{message.date ? new Date(message.date).toLocaleDateString("fa-IR", {
														year: "numeric",
														month: "long",
														day: "numeric",
													}) : "تاریخ ثبت نشده"}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
						</ScrollArea>
					) : (
						<div className="py-12 text-center">
							<Bell className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
							<p className="text-muted-foreground">
								در حال حاضر اعلان جدیدی ندارید
							</p>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
