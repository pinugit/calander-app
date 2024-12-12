import { createContext, useEffect, useState } from "react";

interface selectedDate {
	date: number;
	month: number;
	year: number;
	day: number;
}
interface eventContext {
	selectedDate: selectedDate | null;
	setSelectedDate: (date: selectedDate) => void;
	addEvents: (date: selectedDate, events: event) => void;
}

interface event {
	startingTime: string;
	endingTime: string;
	title: string;
	description: string;
}

interface calenderEvent {
	date: selectedDate;
	events: event[];
}

export const eventContext = createContext<eventContext | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
	const [selectedDate, setSelectedDate] = useState<selectedDate | null>(null);
	const [calenderEvents, setCalenderEvents] = useState<calenderEvent[]>(() => {
		const getCalenderEvents = localStorage.getItem("calenderEvents");
		return getCalenderEvents ? JSON.parse(getCalenderEvents) : [];
	});

	const addEvents = (newDate: selectedDate, newEvent: event) => {
		setCalenderEvents((prevCalenderEvents) => {
			const existingEvent = prevCalenderEvents.find(
				(event) => event.date === newDate,
			);
			if (existingEvent) {
				return prevCalenderEvents.map((event) =>
					event.date === newDate
						? { ...event, events: [...event.events, newEvent] }
						: event,
				);
			}
			return [...prevCalenderEvents, { date: newDate, events: [newEvent] }];
		});
	};

	useEffect(() => {
		localStorage.setItem("calendarEvents", JSON.stringify(calenderEvents));
		console.log(calenderEvents);
	}, [calenderEvents]);

	return (
		<eventContext.Provider value={{ selectedDate, setSelectedDate, addEvents }}>
			{children}
		</eventContext.Provider>
	);
}
