import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventContext } from "@/context/eventContext";
import { type SetStateAction, useContext, useEffect, useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
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

interface event {
	startingTime: number;
	endingTime: number;
	title: string;
	description: string;
}

export function AppSidebar() {
	const context = useContext(eventContext);
	const selectedDate = context?.selectedDate;
	const calenderEvents = context?.calenderEvents;
	const [startingTime, setStartingTime] = useState<number>(0);
	const [endingTime, setEndingTime] = useState(0);
	const [eventTitle, setEventTitle] = useState("");
	const [eventDescription, setEventDescription] = useState("");
	const [eventForSelectedDay, setEventForSelectedDay] = useState<event[]>(
		() => {
			const todayEvents = calenderEvents?.find(
				(newEvent) => newEvent.date === selectedDate,
			);
			console.log(todayEvents?.events);

			return todayEvents ? todayEvents.events : [];
		},
	);

	const onSetStartingTime = (time: string) => {
		setStartingTime(Number(time));
		console.log(time);
	};

	const onSetEndingTime = (time: string) => {
		setEndingTime(Number(time));
	};

	const handleTitleChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setEventTitle(event.target.value);
	};

	const handleDescriptionChange = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setEventDescription(event.target.value);
	};

	const handleEventCreation = () => {
		console.log(startingTime, endingTime, eventTitle, eventDescription);
		if (selectedDate) {
			context?.addEvents(selectedDate, {
				title: eventTitle,
				description: eventDescription,
				startingTime: startingTime,
				endingTime: endingTime,
			});
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const todayEvents = calenderEvents?.find(
			(newEvent) =>
				newEvent.date.date === selectedDate?.date &&
				newEvent.date.month === selectedDate.month &&
				newEvent.date.year === selectedDate.year,
		);

		if (todayEvents?.events) {
			setEventForSelectedDay(todayEvents?.events);
		} else {
			setEventForSelectedDay([]);
		}
	}, [selectedDate]);

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
					{eventForSelectedDay?.map((anEvent, index) => (
						<Card
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							key={index}
							className="absolute top-[1208px] h-[240px] w-[400px] mx-9 box-border "
						>
							<CardHeader>
								<CardTitle>{anEvent.title}</CardTitle>
							</CardHeader>
						</Card>
					))}
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
								onChange={handleTitleChange}
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
								onChange={handleDescriptionChange}
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
							<Button onClick={handleEventCreation}>Create</Button>
						)}
					</DialogContent>
				</Dialog>
			</SidebarFooter>
		</Sidebar>
	);
}
