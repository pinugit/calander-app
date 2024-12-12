import { createContext, useState } from "react";

interface selectedDate {
	date: number;
	month: number;
	year: number;
	day: number;
}
type eventContext = {
	selectedDate: selectedDate | null;
	setSelectedDate: (date: selectedDate) => void;
};

export const eventContext = createContext<eventContext | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
	const [selectedDate, setSelectedDate] = useState<selectedDate | null>(null);
	return (
		<eventContext.Provider value={{ selectedDate, setSelectedDate }}>
			{children}
		</eventContext.Provider>
	);
}
