"use client";

import { getPersianValue } from "@/lib/utils";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

type Transaction = {
  id: string;
  transactionType: string;
  walletType: string;
  description: string;
  date: string;
  val: number;
};

interface TransactionItemProps {
  trans: Transaction;
}

export function TransactionItem({ trans }: TransactionItemProps) {
  // Convert date string like "1403/11/20" to Persian format
  const getPersianDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split("/");
    const months = {
      "01": "فروردین",
      "02": "اردیبهشت",
      "03": "خرداد",
      "04": "تیر",
      "05": "مرداد",
      "06": "شهریور",
      "07": "مهر",
      "08": "آبان",
      "09": "آذر",
      "10": "دی",
      "11": "بهمن",
      "12": "اسفند",
    };
    return `${getPersianValue(day)} ${months[month as keyof typeof months]} ${getPersianValue(year)}`;
  };

  const isDeposit = trans.transactionType.includes("خرید") || trans.transactionType.includes("واریز");

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${isDeposit ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isDeposit ? <ArrowUpCircle className="h-5 w-5" /> : <ArrowDownCircle className="h-5 w-5" />}
        </div>
        <div className="text-end">
          <p className="text-sm font-medium">{trans.transactionType}</p>
          <p className="text-xs text-muted-foreground">{getPersianDate(trans.date)}</p>
        </div>
      </div>
      <div className="text-end">
        <p className="text-sm font-medium">
          {getPersianValue(trans.val.toString())}{" "}
          {trans.walletType === "Gold" ? "گرم" : "ریال"}
        </p>
        <p className="text-xs text-muted-foreground">{trans.description}</p>
      </div>
    </div>
  );
} 