import { authLayoutColors } from "@/lib/utils";

interface PhoneWrapperProps {
  children: React.ReactNode;
}

export default function PhoneWrapper({ children }: PhoneWrapperProps) {
  return (
		<div className="h-screen w-screen flex justify-center items-center bg-neutral-100 overflow-y-auto">
			<div
				className="w-full h-screen shadow-sm justify-around flex flex-col relative"
				style={{
					maxWidth: "520px",
					backgroundColor: authLayoutColors[0],
				}}
			>
				{children}
			</div>
		</div>
  );
} 