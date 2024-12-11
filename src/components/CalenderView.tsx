import { getMonthArray } from "@/utils/Calender";
import { useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
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
		month: Number(todayDate[1]) - 1,
		year: Number(todayDate[2]),
	});

	const [currentMonthArray, setCurrentMonthArray] = useState(
		getMonthArray(currentDate.year, currentDate.month),
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

	useEffect(() => {
		setCurrentMonthArray(getMonthArray(currentDate.year, currentDate.month));
	}, [currentDate]);
	return (
		<Card className=" w-[650px] p-4">
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
			<CardContent className="flex flex-col gap-4">
				<div className="grid grid-cols-7 gap-2 text-xl text-center ">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</div>
				<div className="grid grid-cols-7 gap-2 border-t-2">
					{currentMonthArray.map((day, index) => (
						<div
							className="w-[70px] h-[70px] rounded-full flex justify-center items-center text-xl hover:bg-zinc-900"
							key={index}
						>
							{day.date}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};
