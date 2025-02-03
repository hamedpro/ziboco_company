"use client";

import { WalletAccordions } from "./WalletAccordions";
import { WalletWidget } from "./WalletWidget";

export default function Wallet() {
	let data = {
		silver: {
			balance: 30,
			unit: "گرم",
		},
		gold: {
			balance: 10,
			unit: "گرم",
		},
		rial: {
			balance: 30_000_000,
			unit: "ریال",
		},
	};
	return (
		<>
			<div className="p-6 mb-32">
				<WalletWidget data={data} />
			</div>
			<WalletAccordions />
		</>
	);
}
