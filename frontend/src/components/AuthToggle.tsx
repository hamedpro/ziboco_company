import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface OptionType {
	label: string;
	value: string;
}

interface AuthToggleProps {
	options: OptionType[];
	value: string;
	onChange: (value: string) => void;
	className?: string;
	style?: React.CSSProperties;
}

export default function AuthToggle({
	options,
	value,
	onChange,
	className = "",
	style,
}: AuthToggleProps) {
	return (
		<div
			className={`w-full ${className}`}
			style={style}
		>
			<ToggleGroup
				type="single"
				value={value}
				onValueChange={(newValue) => newValue && onChange(newValue)}
				className="justify-center border rounded-lg p-1 w-full"
			>
				{options.map((option) => (
					<ToggleGroupItem
						key={option.value}
						value={option.value}
						className="flex-1 capitalize data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
					>
						{option.label}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
