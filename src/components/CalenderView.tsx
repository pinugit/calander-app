import { getMonthArray } from "@/utils/Calender";
import { useState } from "react";
import { Card, CardTitle } from "./ui/card";

export const CalenderView = () =>{
  const todayDate = new Date().toLocaleDateString().split(
  "/"
  );
  const [currentDate, setCurrentDate] = useState<{date:number,month:number,year:number}>({date:Number(todayDate[0]), month:Number(todayDate[1]), year:Number(todayDate[2])});

  const [currentMonthArray, setCurrentMonthArray] = useState(getMonthArray(currentDate.year, currentDate.month -1 ))
  console.log(currentMonthArray);
  
  return(
    <Card >
      <CardTitle>december</CardTitle>
    </Card>
  )
  
}