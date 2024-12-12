import { createContext, useState } from "react";

interface selectedDate {
	date: number;
	month: number;
	year: number;
}
type eventContext = {
	selectedDate: selectedDate | null;
	setSelectedDate: (date: selectedDate) => void;
};

export const eventContext = createContext<eventContext | null>(null);

export function EventProvider({ children }: { children: React.ReactNode }) {
	const [selectedDate, setSelectedDate] = useState<selectedDate | null>({
		date: 25,
		month: 4,
		year: 2023,
	});
	return (
		<eventContext.Provider value={{ selectedDate, setSelectedDate }}>
			{children}
		</eventContext.Provider>
	);
}
