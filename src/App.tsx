import "./App.css";
import { CalenderView } from "./components/CalenderView";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";

function App() {
	return (
		<ThemeProvider>
			<div className="h-screen w-screen flex justify-center items-center bg-zinc-900">
				<div className="absolute top-3 right-3">
					<ModeToggle />
				</div>
				<CalenderView />
			</div>
		</ThemeProvider>
	);
}

export default App;
