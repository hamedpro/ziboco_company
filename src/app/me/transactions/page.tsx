"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../../configs";
import { Loader } from "@/components/Loader";
import { IconInfoOctagon } from "@tabler/icons-react";
import SessionExpiredPopup from "@/components/SessionExpiredPopup";
import TransactionItem from "./TransactionItem";
import { Receipt } from "lucide-react";

type Transaction = {
	id: string;
	transactionType: string;
	walletType: string;
	description: string;
	date: string;
	val: number;
};

type ApiResponse = {
	data: Transaction[];
	errorCode: number;
	errorMessage: string | null;
	errorDetail: string | null;
};

const page = () => {
	const [transactions, setTransactions] = useState<Transaction[] | undefined>(
		undefined
	);
	const [error, setError] = useState<string | null>(null);
	const [showSessionExpired, setShowSessionExpired] = useState(false);

	useEffect(() => {
		async function fetchTransactions() {
			try {
				const response = await axios<ApiResponse>({
					url: "/api/transaction",
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
				setTransactions(response.data.data);
			} catch (error) {
				if (
					error instanceof AxiosError &&
					error.response?.status === 401
				) {
					setShowSessionExpired(true);
				} else {
					setError("An error occurred while fetching transactions");
				}
			}
		}
		fetchTransactions();
	}, []);

	if (transactions === undefined && !error) {
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
				className="flex flex-col w-full"
				dir="rtl"
			>
				<div className="flex items-center gap-2 p-6">
					<Receipt className="h-5 w-5 text-neutral-100" />
					<h2 className="text-lg font-medium text-neutral-100">
						تراکنش‌های اخیر
					</h2>
				</div>

				<div className="flex flex-col">
					{transactions?.map((transaction) => (
						<TransactionItem
							key={transaction.id}
							trans={transaction}
						/>
					))}
				</div>

				{transactions?.length === 0 && (
					<div className="p-6 text-center text-neutral-100">
						تراکنشی برای نمایش وجود ندارد
					</div>
				)}
			</div>
			<SessionExpiredPopup isOpen={showSessionExpired} />
		</>
	);
};

export default page;
