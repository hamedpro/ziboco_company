"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { Loader } from "@/components/Loader";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { waitForSeconds } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
	let [otps, setOtps] = useState<any>();
	useEffect(() => {
		async function fetchData() {
			await waitForSeconds(1.5);
			setOtps((await axios("http://localhost:8000/otps")).data);
		}
		fetchData();
	}, []);
	if (otps === undefined) return <Loader isFullScreen />;
	console.log(otps);
	return (
		<SidebarProvider
			style={
				{
					"--sidebar-width": "350px",
				} as React.CSSProperties
			}
		>
			<AppSidebar otps={otps} />
			<SidebarInset>
				<header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />
							<BreadcrumbItem>
								<BreadcrumbPage>Inbox</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</header>
				<div className="flex flex-1 flex-col gap-4 p-4">
					{Array.from({ length: 24 }).map((_, index) => (
						<div
							key={index}
							className="aspect-video h-12 w-full rounded-lg bg-muted/50"
						/>
					))}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
