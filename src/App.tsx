import './App.css'
import { CalenderView } from './components/CalenderView'
import { ModeToggle } from './components/mode-toggle'
import { ThemeProvider } from './components/theme-provider'
import { Button } from './components/ui/button'

function App() {

  return (
    <ThemeProvider> 
    <div className='h-screen w-screen flex justify-center items-center bg-zinc-900'>
    <ModeToggle/> 
      <CalenderView/></div>
    </ThemeProvider>
  )
}

export default App
