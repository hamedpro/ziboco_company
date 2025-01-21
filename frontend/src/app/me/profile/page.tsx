"use client";

import { ProfileAccordions } from "../transactions/ProfileAccordions";
import { IdentityVerificationCard } from "./IdentityVerificationCard";
import { InviteFriendsCard } from "./InviteFriendsCard";
import { ProfileOverviewCard } from "./ProfileOverviewCard";


export default function Profile() {
	return (
		<>
			<div className="flex flex-col px-6 gap-y-4">
				<ProfileOverviewCard />
				<IdentityVerificationCard />
				<InviteFriendsCard />
			</div>
			<ProfileAccordions />
		</>
	);
}
