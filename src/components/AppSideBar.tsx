import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export function AppSidebar() {
	return (
		<Sidebar variant="floating" side="right">
			<SidebarHeader>
				<SidebarTrigger />
			</SidebarHeader>
		</Sidebar>
	);
}
