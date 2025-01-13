import { cn } from "@/lib/utils";
import { IconLoader } from "@tabler/icons-react";

export function Loader({ isFullScreen = false, className = "" }) {
	return (
		<div
			className={cn(
				"w-full h-full flex justify-center items-center",
				isFullScreen && "w-screen h-screen fixed top-0 left-0", 
				className
			)}
		>
			<IconLoader
				className="animate-spin"
				size={32}
			/>
			<span className="sr-only">loading</span>
		</div>
	);
}
