"use client";

import dynamic from "next/dynamic";

const MyComponent = dynamic(
	() => import("../../../components/TradeDashboard"),
	{
		ssr: false, // This disables server-side rendering for this component
	}
);
export default function Events() {
	return <MyComponent />;
}
