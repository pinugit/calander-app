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
import { toast } from "sonner";
import { Toaster } from "./ui/sonner";
import { Trash2 } from "lucide-react";

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

interface dateType {
	date: number;
	month: number;
	year: number;
	day: number;
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

		const hasOverlap = eventForSelectedDay.some(
			(anEvent) =>
				(anEvent.startingTime < startingTime &&
					anEvent.endingTime > startingTime) ||
				(anEvent.startingTime < endingTime &&
					anEvent.endingTime > endingTime) ||
				(anEvent.startingTime >= startingTime &&
					anEvent.endingTime <= endingTime), // Completely within
		);

		if (selectedDate && !hasOverlap) {
			context?.addEvents(selectedDate, {
				title: eventTitle,
				description: eventDescription,
				startingTime: startingTime,
				endingTime: endingTime,
			});
			console.log("created ");
		} else {
			toast("Event timings are overlapping", {
				description: "there are already events assigned to that time",
			});
			console.log("not created");
		}
		setStartingTime(0);
		setEndingTime(0);
		setEventTitle("");
		setEventDescription("");
	};

	const handleEventRemoval = (date: dateType, event: event) => {
		context?.removeEvents(date, event);
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
	}, [selectedDate, calenderEvents]);

	const hours = Array.from({ length: 25 }, (_, i) => i);
	return (
		<Sidebar variant="floating" side="right" className="">
			<Toaster />
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
			<SidebarContent className="relative flex flex-col mx-5 mb-2 h-auto border-2 rounded-lg">
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
							className="absolute  w-[400px] mx-9 box-border "
							style={{
								top: `${anEvent.startingTime * 120 + 7}px`,
								height: `${(anEvent.endingTime - anEvent.startingTime) * 120}px`,
							}}
						>
							<Button
								variant={"destructive"}
								className="absolute top-2 right-2"
								onClick={() =>
									selectedDate
										? handleEventRemoval(selectedDate, anEvent)
										: null
								}
							>
								<Trash2 />
							</Button>
							<CardHeader>
								<CardTitle className="text-xl">{anEvent.title}</CardTitle>
								<CardDescription>{anEvent.description}</CardDescription>
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
						{startingTime >= endingTime || eventTitle === "" ? (
							<>
								<CardDescription>
									check the title or starting time is greater then ending time
								</CardDescription>
								<Button disabled>Create</Button>
							</>
						) : (
							<DialogTrigger className="w-full">
								<Button className="w-full" onClick={handleEventCreation}>
									Create
								</Button>
							</DialogTrigger>
						)}
					</DialogContent>
				</Dialog>
			</SidebarFooter>
		</Sidebar>
	);
}
