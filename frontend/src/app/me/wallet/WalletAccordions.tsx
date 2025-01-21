import React from "react";
import { CustomAccordion } from "../../../components/CustomAccordion";
import PersianLuxuryCreditCard from "../profile/PersianCreditCard";

export const WalletAccordions = () => {
	return (
		<div className="flex flex-col my-4">
			<div
				className="flex p-6 text-neutral-50"
				dir="rtl"
			>
				<h1 className="text-xl">شمش های طلا و نقره من</h1>
			</div>
			<CustomAccordion
				title="شمش طلای ۱ گرمی"
				isTheFirst={true}
			>
				<div className="flex my-2">
					<p className="w-40">قیمت خریداری شده</p>
					<p>۴.۲۳۵.۸۵۰</p>
				</div>
				<div className="flex mb-2">
					<p className="w-40">قیمت جاری</p>
					<p>۴.۷۳۵.۲۵۱</p>
				</div>
			</CustomAccordion>
			<CustomAccordion
				title="شمش طلای ۲ گرمی"
				isTheFirst={false}
			>
				<div className="my-2">
					<PersianLuxuryCreditCard />
				</div>
			</CustomAccordion>
			<CustomAccordion
				title="شمش طلای ۴ گرمی"
				isTheFirst={false}
			>
				<div className="flex my-2">
					<p className="w-40">قیمت خریداری شده</p>
					<p>۴.۲۳۵.۸۵۰</p>
				</div>
				<div className="flex mb-2">
					<p className="w-40">قیمت جاری</p>
					<p>۴.۷۳۵.۲۵۱</p>
				</div>
			</CustomAccordion>
		</div>
	);
};
