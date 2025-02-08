"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../../configs";
import { Loader } from "@/components/Loader";
import { IconInfoOctagon } from "@tabler/icons-react";
import SessionExpiredPopup from "@/components/SessionExpiredPopup";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";

// Define type for each message object
type Message = {
	id: string;
	message: string;
	date: string | null;
};

// Define the type for the API response
type ApiResponse = {
	data: Message[];
	errorCode: number;
	errorMessage: string | null;
	errorDetail: string | null;
};

const page = () => {
	const [messages, setMessages] = useState<Message[] | undefined>(undefined);
	const [error, setError] = useState<string | null>(null);
	const [showSessionExpired, setShowSessionExpired] = useState(false);

	useEffect(() => {
		async function fetchMessages() {
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
					setError(
						response.data.errorMessage || "Unknown error occurred"
					);
					return;
				}
				setMessages(response.data.data);
			} catch (error) {
				if (
					error instanceof AxiosError &&
					error.response?.status === 401
				) {
					setShowSessionExpired(true);
				} else {
					setError("An error occurred while fetching messages");
				}
			}
		}
		fetchMessages();
	}, []);

	if (messages === undefined && !error) {
		return (
			<Loader
				isFullScreen
				className="text-white"
			/>
		);
	}

	if (error && !showSessionExpired) {
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

	return (
		<>
			<div
				className="flex flex-col w-full p-6"
				dir="rtl"
			>
				<div className="flex items-center gap-2 mb-6">
					<Bell className="h-5 w-5 text-neutral-100" />
					<h2 className="text-lg font-medium text-neutral-100">
						اعلان‌های خوانده نشده
					</h2>
				</div>

				<div className="space-y-4">
					{messages?.map((msg) => (
						<Card key={msg.id}>
							<CardContent className="pt-6">
								<div className="flex flex-col gap-2">
									<p className="text-lg">{msg.message}</p>
									<p className="text-sm text-muted-foreground">
										{msg.date
											? new Date(
													msg.date
											  ).toLocaleDateString("fa-IR", {
													year: "numeric",
													month: "long",
													day: "numeric",
													hour: "2-digit",
													minute: "2-digit",
											  })
											: "تاریخ ثبت نشده"}
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{messages?.length === 0 && (
					<Card>
						<CardContent className="pt-6">
							<p className="text-center text-muted-foreground">
								در حال حاضر اعلانی وجود ندارد
							</p>
						</CardContent>
					</Card>
				)}
			</div>
			<SessionExpiredPopup isOpen={showSessionExpired} />
		</>
	);
};

export default page;
