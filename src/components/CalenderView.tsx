import { getMonthArray } from "@/utils/Calender";
import { useState } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export const CalenderView = () => {
	const todayDate = new Date().toLocaleDateString().split("/");
	const [currentDate, setCurrentDate] = useState<{
		date: number;
		month: number;
		year: number;
	}>({
		date: Number(todayDate[0]),
		month: Number(todayDate[1]),
		year: Number(todayDate[2]),
	});

	const [currentMonthArray, setCurrentMonthArray] = useState(
		getMonthArray(currentDate.year, currentDate.month - 1),
	);
	console.log(currentMonthArray);

	const nextMonth = () => {
		setCurrentDate((prevDate) => ({
			...prevDate,
			month: (prevDate.month + 1) % 12,
			year: prevDate.month === 11 ? prevDate.year + 1 : prevDate.year,
		}));
	};

	const prevMonth = () => {
		setCurrentDate((prevDate) => ({
			...prevDate,
			month: (prevDate.month - 1 + 12) % 12,
			year: prevDate.month === 0 ? prevDate.year - 1 : prevDate.year,
		}));
	};

	return (
		<Card className="h-[650px] w-[600px] p-4">
			<CardHeader className="flex flex-row justify-between">
				<div>
					<CardTitle className="text-3xl">
						{months[currentDate.month]}
					</CardTitle>
					<CardDescription className="text-2xl">
						{currentDate.year}
					</CardDescription>
				</div>
				<div className="flex gap-2 justify-center items-center">
					<Button onClick={prevMonth}>
						{" "}
						<ChevronLeft />
						Prev
					</Button>
					<Button onClick={nextMonth}>
						<ChevronRight />
						Next
					</Button>
				</div>
			</CardHeader>
		</Card>
	);
};
