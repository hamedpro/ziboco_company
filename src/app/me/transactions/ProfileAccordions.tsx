import React from "react";
import { CustomAccordion } from "../../../components/CustomAccordion";
import PersianLuxuryCreditCard from "../profile/PersianCreditCard";

export const ProfileAccordions = () => {
	return (
		<div className="flex flex-col my-4">
			<CustomAccordion
				title="آدرس ها"
				isTheFirst={true}
			>
				<ul className="list-disc pr-6 space-y-2">
					<li>
						خیابان ولیعصر - خیابان منتظری - کوچه بهمن بیگی - واحد ۲۵
					</li>
					<li>
						خیابان انقلاب - خیابان آزادی - کوچه گلستان - واحد ۱۰
					</li>
					<li>خیابان شریعتی - خیابان سهروردی - کوچه نیکو - واحد ۵</li>
				</ul>
			</CustomAccordion>
			<CustomAccordion
				title="کارت بانکی"
				isTheFirst={false}
			>
				<div className="my-2">
					<PersianLuxuryCreditCard />
				</div>
			</CustomAccordion>
			<CustomAccordion
				title="دارایی های من"
				isTheFirst={false}
			></CustomAccordion>
		</div>
	);
};
