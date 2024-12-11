import './App.css'
import { getDaysInAMonth,getFirstDayOfMonth , getMonthArray} from './utils/Calander'

function App() {

  // console.log(getDaysInAMonth(2024,11));
  // console.log(getFirstDayOfMonth(2024,11));
  
  console.log(getMonthArray(2024, 11));
  
  
  return (
    <h1>hello world </h1>
  )
}

export default App
