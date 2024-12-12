import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventContext } from "@/context/eventContext";
import { useContext, useState } from "react";
import { CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Textarea } from "./ui/textarea";
import { TimeSelector } from "./TimeSelector";

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
	const [startingTime, setStartingTime] = useState<number>(0);
	const [endingTime, setEndingTime] = useState(0);

	const onSetStartingTime = (time: string) => {
		setStartingTime(Number(time));
		console.log(time);
	};
	const onSetEndingTime = (time: string) => {
		setEndingTime(Number(time));
	};

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
			<SidebarContent className="flex flex-col mx-5 mb-2 h-auto border-2 rounded-lg">
				<SidebarGroup className="relative">
					{hours.map((hour) => (
						<div className="border-b-2 box-border h-[120px] text-xl" key={hour}>
							<p>{hour}</p>
						</div>
					))}
					{/* <Card className="absolute top-[1208px] h-[240px] w-[400px] mx-9 box-border "></Card> */}
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<Dialog>
					<DialogTrigger className="w-full px-3">
						<Button className="w-full">Add Event</Button>
					</DialogTrigger>
					<DialogContent className="w-[600px] ">
						<DialogHeader>
							<DialogTitle>Enter the event details</DialogTitle>
						</DialogHeader>
						<div className="grid w-full  items-center gap-1.5">
							<Label>Event Title</Label>
							<Input
								type="title"
								id="title"
								placeholder="Event Title"
								className="w-full"
							/>
						</div>
						<div className="flex w-full grid-cols-2 justify-between items-center gap-1.5">
							<div>
								<Label>Starting Time</Label>
								<TimeSelector onSetTime={onSetStartingTime} />
							</div>
							<div>
								<Label>Ending Time</Label>
								<TimeSelector onSetTime={onSetEndingTime} />
							</div>
						</div>

						<div className="grid w-full gap-1.5">
							<Label>Description</Label>
							<Textarea
								placeholder="Type your Description here."
								id="description"
								className="h-[150px]"
							/>
						</div>
						{startingTime >= endingTime ? (
							<>
								<CardDescription>
									starting time cannot be ahead of ending time
								</CardDescription>
								<Button disabled>Create</Button>
							</>
						) : (
							<Button>Create</Button>
						)}
					</DialogContent>
				</Dialog>
			</SidebarFooter>
		</Sidebar>
	);
}
