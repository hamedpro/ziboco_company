"use client";

import { IdentityVerificationCard } from "./IdentityVerificationCard";
import { InviteFriendsCard } from "./InviteFriendsCard";
import { ProfileOverviewCard } from "./ProfileOverviewCard";

export let localColors = [
	"#2b313f",
	"#673729",
	"#c9736f",
	"#411457",
	"#FCECD2",
];
export default function Profile() {
	return (
		<div className="flex flex-col px-6 gap-y-4">
			<ProfileOverviewCard />
			<IdentityVerificationCard />
			<InviteFriendsCard />
		</div>
	);
}
