import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventContext } from "@/context/eventContext";
import { useContext } from "react";
import { Card, CardDescription } from "./ui/card";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
const days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

export function AppSidebar() {
	const context = useContext(eventContext);
	const selectedDate = context?.selectedDate;
	const hours = Array.from({ length: 25 }, (_, i) => i);
	return (
		<Sidebar variant="floating" side="right" className="">
			<SidebarHeader className="flex flex-row justify-between m-4 ">
				{selectedDate && (
					<div className=" flex flex-col ">
						<h1 className="text-4xl">
							{selectedDate.date} {months[selectedDate.month]}
						</h1>
						<CardDescription className="text-xl">
							{days[selectedDate.day]} {selectedDate.year}
						</CardDescription>
					</div>
				)}
				<SidebarTrigger />
			</SidebarHeader>
			<SidebarContent className="flex flex-col mx-5 mb-5 h-auto border-2 rounded-lg">
				<SidebarGroup className="relative">
					{hours.map((hour) => (
						<div className="border-b-2 box-border h-[120px] text-xl" key={hour}>
							<p>{hour}</p>
						</div>
					))}
					<Card className="absolute top-[1208px] h-[240px] w-[400px] mx-9 box-border">
						an event{" "}
					</Card>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
