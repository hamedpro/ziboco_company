"use client";

import { WalletAccordions } from "./WalletAccordions";
import { WalletWidget } from "./WalletWidget";

export default function Wallet() {
	return (
		<>
			<div className="p-6 mb-32">
				<WalletWidget />
			</div>
			<WalletAccordions />
		</>
	);
}
