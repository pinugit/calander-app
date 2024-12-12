import "./App.css";
import { AppSidebar } from "./components/AppSideBar";
import { CalenderView } from "./components/CalenderView";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "./components/ui/sidebar";
import { EventProvider } from "./context/eventContext";

function App() {
	return (
		<ThemeProvider>
			<EventProvider>
				<SidebarProvider>
					<div className="h-screen w-screen flex justify-center items-center bg-zinc-1000 relative">
						<div className="absolute top-3 right-3 flex gap-2 justify-center items-center">
							<ModeToggle />
						</div>
						<CalenderView />
					</div>
					<AppSidebar />
				</SidebarProvider>
			</EventProvider>
		</ThemeProvider>
	);
}

export default App;
