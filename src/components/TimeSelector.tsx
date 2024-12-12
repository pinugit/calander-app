import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "./ui/scroll-area";

const frameworks = [
	{ value: "0", label: "0:00" },
	{ value: "0.5", label: "0:30" },
	{ value: "1", label: "1:00" },
	{ value: "1.5", label: "1:30" },
	{ value: "2", label: "2:00" },
	{ value: "2.5", label: "2:30" },
	{ value: "3", label: "3:00" },
	{ value: "3.5", label: "3:30" },
	{ value: "4", label: "4:00" },
	{ value: "4.5", label: "4:30" },
	{ value: "5", label: "5:00" },
	{ value: "5.5", label: "5:30" },
	{ value: "6", label: "6:00" },
	{ value: "6.5", label: "6:30" },
	{ value: "7", label: "7:00" },
	{ value: "7.5", label: "7:30" },
	{ value: "8", label: "8:00" },
	{ value: "8.5", label: "8:30" },
	{ value: "9", label: "9:00" },
	{ value: "9.5", label: "9:30" },
	{ value: "10", label: "10:00" },
	{ value: "10.5", label: "10:30" },
	{ value: "11", label: "11:00" },
	{ value: "11.5", label: "11:30" },
	{ value: "12", label: "12:00" },
	{ value: "12.5", label: "12:30" },
	{ value: "13", label: "13:00" },
	{ value: "13.5", label: "13:30" },
	{ value: "14", label: "14:00" },
	{ value: "14.5", label: "14:30" },
	{ value: "15", label: "15:00" },
	{ value: "15.5", label: "15:30" },
	{ value: "16", label: "16:00" },
	{ value: "16.5", label: "16:30" },
	{ value: "17", label: "17:00" },
	{ value: "17.5", label: "17:30" },
	{ value: "18", label: "18:00" },
	{ value: "18.5", label: "18:30" },
	{ value: "19", label: "19:00" },
	{ value: "19.5", label: "19:30" },
	{ value: "20", label: "20:00" },
	{ value: "20.5", label: "20:30" },
	{ value: "21", label: "21:00" },
	{ value: "21.5", label: "21:30" },
	{ value: "22", label: "22:00" },
	{ value: "22.5", label: "22:30" },
	{ value: "23", label: "23:00" },
	{ value: "23.5", label: "23:30" },
	{ value: "24", label: "24:00" },
	{ value: "24.5", label: "24:30" },
];

interface props {
	onSetTime: (time: string) => void;
}

export function TimeSelector({ onSetTime }: props) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					{value
						? frameworks.find((framework) => framework.value === value)?.label
						: "Select time..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search time..." className="h-9" />
					<ScrollArea>
						<CommandList>
							<CommandEmpty>Time not found.</CommandEmpty>
							<CommandGroup>
								{frameworks.map((framework) => (
									<CommandItem
										key={framework.value}
										value={framework.value}
										onSelect={(currentValue: React.SetStateAction<string>) => {
											setValue(currentValue === value ? "" : currentValue);
											setOpen(false);
											onSetTime(framework.value);
										}}
									>
										{framework.label}
										<Check
											className={cn(
												"ml-auto",
												value === framework.value ? "opacity-100" : "opacity-0",
											)}
										/>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</ScrollArea>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
