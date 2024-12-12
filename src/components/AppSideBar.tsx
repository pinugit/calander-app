import {
	Sidebar,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventContext } from "@/context/eventContext";
import { useContext } from "react";
import { CardDescription } from "./ui/card";

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
	return (
		<Sidebar variant="floating" side="right" className="">
			<SidebarHeader className="flex flex-row justify-between p-5">
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
		</Sidebar>
	);
}
