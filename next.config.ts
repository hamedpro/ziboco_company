import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// output: "export",
	images: { 
		unoptimized: true,
		domains: ['helphub.ir'] 
	},
	
	/* config options here */
};

export default nextConfig;
