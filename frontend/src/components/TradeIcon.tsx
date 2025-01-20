import {
	Circle,
	Hexagon,
	Octagon,
	Pentagon,
	Triangle,
	DollarSign,
	Bitcoin,
	EclipseIcon as Ethereum,
} from "lucide-react";

interface TradeIconProps {
	name: string;
	className?: string;
}

export function TradeIcon({ name, className = "w-12 h-12" }: TradeIconProps) {
	switch (name.toLowerCase()) {
		case "طلا":
			return <Circle className={`${className} text-yellow-400`} />;
		case "نقره":
			return <Pentagon className={`${className} text-gray-300`} />;
		case "پلاتین":
			return <Hexagon className={`${className} text-blue-200`} />;
		case "پالادیوم":
			return <Octagon className={`${className} text-red-200`} />;
		case "رودیوم":
			return <Triangle className={`${className} text-green-200`} />;
		case "بیت‌کوین":
			return <Bitcoin className={`${className} text-orange-500`} />;
		case "اتریوم":
			return <Ethereum className={`${className} text-purple-400`} />;
		case "تتر":
			return <DollarSign className={`${className} text-green-500`} />;
		default:
			return <Circle className={`${className} text-gray-400`} />;
	}
}

