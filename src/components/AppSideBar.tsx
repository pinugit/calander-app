import {
	Sidebar,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { eventContext } from "@/context/eventContext";
import { useContext } from "react";

export function AppSidebar() {
	const context = useContext(eventContext);
	const selectedDate = context?.selectedDate;
	return (
		<Sidebar variant="floating" side="right">
			<SidebarHeader>
				<SidebarTrigger />
				{selectedDate && (
					<div>
						{selectedDate.date} {selectedDate.month} {selectedDate.year}
					</div>
				)}
				hello
			</SidebarHeader>
		</Sidebar>
	);
}
