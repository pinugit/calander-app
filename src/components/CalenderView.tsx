import { getMonthArray } from "@/utils/Calender";
import { useContext, useEffect, useState } from "react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { eventContext } from "@/context/eventContext";

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

	const { setOpen } = useSidebar();

	const context = useContext(eventContext);
	const setSelectedDate = context?.setSelectedDate;
	const selectedDate = context?.selectedDate;

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
			<CardContent className="flex flex-col gap-6">
				<div className="grid grid-cols-7 gap-2 text-xl text-center pt-3 font-extrabold ">
					<div>Sun</div>
					<div>Mon</div>
					<div>Tue</div>
					<div>Wed</div>
					<div>Thu</div>
					<div>Fri</div>
					<div>Sat</div>
				</div>
				<div className="grid grid-cols-7 gap-2 border-t-2 pt-3">
					{currentMonthArray.map((day, index) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<div
							onClick={() => {
								if (setSelectedDate) {
									setSelectedDate({
										date: day.date,
										month: day.month,
										year: day.year,
										day: day.day,
									});
								}
								setOpen(true);
							}}
							className={`w-[70px] h-[70px] rounded-full flex justify-center items-center text-xl hover:bg-[--hover]  cursor-pointer 
								${day.color === "light" ? "text-zinc-500" : " "} 
								${day.date === currentDate.date ? "bg-zinc-200 text-zinc-950 " : ""} 
								${day.date === selectedDate?.date && day.month === selectedDate.month && day.year === selectedDate.year && day.day === selectedDate.day ? "bg-[--hover]" : ""}`}
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
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
