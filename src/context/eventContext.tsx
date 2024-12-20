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
	calenderEvents: calenderEvent[];
	removeEvents: (date: selectedDate, events: event) => void;
}

interface event {
	startingTime: number;
	endingTime: number;
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
		const getCalenderEvents = localStorage.getItem("event");
		return getCalenderEvents ? JSON.parse(getCalenderEvents) : [];
	});

	const addEvents = (newDate: selectedDate, newEvent: event) => {
		setCalenderEvents((prevCalenderEvents) => {
			const existingEvent = prevCalenderEvents.find(
				(event) =>
					event.date.date === newDate.date &&
					event.date.month === newDate.month &&
					event.date.year === newDate.year,
			);
			if (existingEvent) {
				return prevCalenderEvents.map((event) =>
					event.date.date === newDate.date &&
					event.date.month === newDate.month &&
					event.date.year === newDate.year
						? { ...event, events: [...event.events, newEvent] }
						: event,
				);
			}
			return [...prevCalenderEvents, { date: newDate, events: [newEvent] }];
		});
	};

	const removeEvents = (newDate: selectedDate, newEvent: event) => {
		setCalenderEvents((prevCalenderEvents) => {
			return prevCalenderEvents.map((event) =>
				event.date.date === newDate.date &&
				event.date.month === newDate.month &&
				event.date.year === newDate.year
					? {
							...event,
							events: event.events.filter(
								(anEvent) => anEvent.startingTime !== newEvent.startingTime,
							),
						}
					: event,
			);
		});
	};

	useEffect(() => {
		localStorage.setItem("event", JSON.stringify(calenderEvents));
		console.log(calenderEvents);
	}, [calenderEvents]);

	return (
		<eventContext.Provider
			value={{
				selectedDate,
				setSelectedDate,
				addEvents,
				calenderEvents,
				removeEvents,
			}}
		>
			{children}
		</eventContext.Provider>
	);
}
