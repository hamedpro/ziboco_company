"use client";

import { useRouter } from "next/navigation";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SessionExpiredPopupProps {
	isOpen: boolean;
}

export default function SessionExpiredPopup({
	isOpen,
}: SessionExpiredPopupProps) {
	const router = useRouter();

	const handleLogin = () => {
		router.push("/auth/entry");
	};

	// Dialog can't be closed by escape key or clicking outside
	return (
		<Dialog
			open={isOpen}
			onOpenChange={() => {}}
		>
			<DialogContent
				className="text-center sm:max-w-md"
				onPointerDownOutside={(e) => e.preventDefault()}
				onEscapeKeyDown={(e) => e.preventDefault()}
			>
				<DialogHeader>
					<DialogTitle
						className="text-right"
						dir="rtl"
					>
						نشست شما منقضی شده است
					</DialogTitle>
					<DialogDescription
						className="text-right"
						dir="rtl"
					>
						لطفاً مجدداً وارد شوید
					</DialogDescription>
				</DialogHeader>
				<div className="flex justify-center mt-4">
					<Button onClick={handleLogin}>ورود مجدد</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
