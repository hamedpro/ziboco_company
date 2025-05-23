"use client";

import { useState, useEffect } from "react";
import { ErrorDisplayComponent } from "@/components/error-display";
import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../../../configs";
import { WalletWidget } from "./WalletWidget";
import type { WalletData } from "./WalletWidget";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpCircle, ArrowDownCircle, RefreshCcw, CheckCircle, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { getPersianValue } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { submitWalletChargeCode } from "@/API";

export type WalletItem = {
	id: string;
	categoryId: string;
	customerId: string;
	category: string;
	walletItemType: 0 | 1 | 2;
	rialBalance: number;
	balance: number;
};

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

export default function Wallet() {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [walletData, setWalletData] = useState<WalletData | null>(null);
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [chargeCode, setChargeCode] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [chargeResult, setChargeResult] = useState<{ success: boolean; message: string } | null>(null);

	// Safely format a date string that might be in DD/MM/YYYY format
	const safelyFormatDate = (dateString: string) => {
		if (!dateString) return 'تاریخ نامشخص';
		
		try {
			// Check if it's in DD/MM/YYYY format
			if (dateString.includes('/')) {
				const parts = dateString.split('/');
				// Only try to convert if we have 3 parts
				if (parts.length === 3) {
					// Try to create a date in YYYY-MM-DD format
					const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
					const date = new Date(formattedDate);
					
					// Check if the date is valid
					if (!isNaN(date.getTime())) {
						return new Intl.DateTimeFormat('fa-IR', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						}).format(date);
					}
				}
			}
			
			// If we can't parse it as DD/MM/YYYY, try direct conversion
			const date = new Date(dateString);
			if (!isNaN(date.getTime())) {
				return new Intl.DateTimeFormat('fa-IR', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}).format(date);
			}
			
			// If all else fails, return the original string
			return dateString;
		} catch (e) {
			console.error("Error formatting date:", e);
			return dateString;
		}
	};

	const loadData = async () => {
		try {
			setLoading(true);
			setError(null);

			// Fetch both wallet and transactions data in parallel
			const [walletResponse, transactionsResponse] = await Promise.all([
				axios({
					url: "/api/wallet",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
					baseURL: API_BASE_URL,
					withCredentials: true,
				}),
				axios<ApiResponse>({
					url: "/api/transaction",
					headers: {
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
					baseURL: API_BASE_URL,
					withCredentials: true,
				})
			]);

			// Transform wallet data
			const walletItems = walletResponse.data.data;
			const transformedData: WalletData = {
				rial: { balance: 0, unit: "ریال" },
				gold: { balance: 0, unit: "طلا" },
				silver: { balance: 0, unit: "نقره" },
			};

			walletItems.forEach((item: WalletItem) => {
				if (item.walletItemType === 0) {
					transformedData.rial = {
						balance: item.rialBalance,
						unit: "ریال",
					};
				} else if (item.walletItemType === 1) {
					transformedData.gold = {
						balance: item.balance,
						unit: "گرم",
					};
				} else if (item.walletItemType === 2) {
					transformedData.silver = {
						balance: item.balance,
						unit: "گرم",
					};
				}
			});

			setWalletData(transformedData);

			// Handle transactions
			if (transactionsResponse.data.errorCode === 0) {
				setTransactions(transactionsResponse.data.data);
			}

		} catch (error) {
			if (error instanceof AxiosError && error.response?.status === 401) {
				setError("unauthorized");
			} else {
				setError("خطا در دریافت اطلاعات کیف پول");
			}
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handleChargeSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!chargeCode.trim()) return;
		
		try {
			setSubmitting(true);
			setChargeResult(null);
			
			const response = await submitWalletChargeCode(chargeCode);
			
			if (response.errorCode === 0 && response.data) {
				setChargeResult({
					success: true,
					message: "کد شارژ با موفقیت اعمال شد."
				});
				setChargeCode("");
				
				// Reload wallet data
				loadData();
			} else {
				setChargeResult({
					success: false,
					message: response.errorMessage || "خطا در اعمال کد شارژ"
				});
			}
		} catch (error) {
			console.error("Error applying charge code:", error);
			setChargeResult({
				success: false,
				message: "خطا در ارتباط با سرور"
			});
		} finally {
			setSubmitting(false);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	if (loading) {
		return (
			<div className="container mx-auto p-6 max-w-5xl space-y-6">
				<div className="space-y-2">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-4 w-96" />
				</div>
				<div className="grid gap-6 md:grid-cols-2">
					<Skeleton className="h-[300px] rounded-xl" />
					<div className="space-y-6">
						<Skeleton className="h-[140px] rounded-xl" />
						<Skeleton className="h-[140px] rounded-xl" />
					</div>
				</div>
			</div>
		);
	}

	if (error) {
		if (error === "unauthorized") {
			return (
				<div className="container mx-auto p-6 max-w-5xl">
					<ErrorDisplayComponent
						title="نیاز به ورود به حساب کاربری"
						description="برای مشاهده کیف پول خود ابتدا وارد حساب کاربری خود شوید."
					/>
				</div>
			);
		}
		
		return (
			<div className="container mx-auto p-6 max-w-5xl">
				<ErrorDisplayComponent
					title="خطا در دریافت اطلاعات"
					description="متاسفانه در دریافت اطلاعات کیف پول خطایی رخ داده است."
					button={{
						text: "تلاش مجدد",
						icon: RefreshCcw,
						onClick: loadData
					}}
				/>
			</div>
		);
	}

	return (
		<div className="container mx-auto p-6 max-w-5xl space-y-6">
			{/* Header */}
			<div className="space-y-1" dir="rtl">
				<h1 className="text-3xl font-bold tracking-tight">کیف پول</h1>
				<p className="text-muted-foreground">
					مدیریت دارایی‌های خود را در یک نگاه انجام دهید
				</p>
			</div>

			{/* Main Content */}
			<div className="grid gap-6 md:grid-cols-2">
				{/* Left Column */}
				<div className="space-y-6">
					{/* Main Wallet Widget */}
					<WalletWidget data={walletData!} />
					
					{/* Charge Wallet Card */}
					<Card dir="rtl">
						<CardHeader>
							<CardTitle>افزایش موجودی کیف پول</CardTitle>
							<CardDescription>کد شارژ خود را وارد کنید</CardDescription>
						</CardHeader>
						<CardContent>
							<form onSubmit={handleChargeSubmit} className="space-y-4">
								<Input
									
									placeholder="کد شارژ را وارد کنید"
									value={chargeCode}
									onChange={(e) => setChargeCode(e.target.value)}
									disabled={submitting}
								/>
								
								{chargeResult && (
									<Alert variant={chargeResult.success ? "default" : "destructive"}>
										<div className="flex items-center gap-2">
											{chargeResult.success ? (
												<CheckCircle className="h-4 w-4" />
											) : (
												<AlertCircle className="h-4 w-4" />
											)}
											<AlertDescription>{chargeResult.message}</AlertDescription>
										</div>
									</Alert>
								)}
								
								<Button 
									type="submit" 
									className="w-full" 
									disabled={submitting || !chargeCode.trim()}
								>
									{submitting ? "در حال ثبت..." : "ثبت کد شارژ"}
								</Button>
							</form>
						</CardContent>
					</Card>
				</div>

				{/* Right Column */}
				<div className="space-y-6" dir="rtl">
					<Card>
						<CardHeader>
							<CardTitle>تراکنش‌های اخیر</CardTitle>
							<CardDescription>۵ تراکنش آخر شما</CardDescription>
						</CardHeader>
						<CardContent>
							{transactions.length > 0 ? (
								<ScrollArea className="h-[300px] pr-4 -mr-4">
									<div className="space-y-4">
										{transactions.slice(0, 5).map((transaction) => {
											const isDeposit = transaction.transactionType.includes("خرید") || 
															transaction.transactionType.includes("واریز");
											
											return (
												<div key={transaction.id} className="flex items-start justify-between">
													<div className="flex gap-3 items-center">
														<div 
															className={cn(
																"p-2 rounded-full",
																isDeposit ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
															)}
														>
															{isDeposit ? (
																<ArrowUpCircle className="h-4 w-4" />
															) : (
																<ArrowDownCircle className="h-4 w-4" />
															)}
														</div>
														<div>
															<p className="font-medium text-sm">
																{transaction.transactionType}
															</p>
															<p className="text-xs text-muted-foreground">
																{transaction.description}
															</p>
														</div>
													</div>
													<div className="text-end">
														<p className={cn(
															"text-sm font-medium",
															isDeposit ? "text-green-600" : "text-red-600"
														)}>
															{isDeposit ? "+" : "-"}
															{getPersianValue(transaction.val.toString())}{" "}
															{transaction.walletType === "Gold" ? "گرم" : "ریال"}
														</p>
														<p className="text-xs text-muted-foreground">
															{safelyFormatDate(transaction.date)}
														</p>
													</div>
												</div>
											);
										})}
									</div>
								</ScrollArea>
							) : (
								<p className="text-sm text-muted-foreground text-center py-8">
									تراکنشی برای نمایش وجود ندارد
								</p>
							)}
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>آمار کلی</CardTitle>
							<CardDescription>وضعیت کلی حساب شما</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="text-sm text-muted-foreground text-center py-8">
								در حال حاضر آماری برای نمایش وجود ندارد
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
