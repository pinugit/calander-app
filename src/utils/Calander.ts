export function getDaysInAMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number) {
  const date = new Date(year, month, 1); // First day of the given month
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
}
//this function will create an array of length 42 so to make the process of displaying the months easier
export function getMonthArray(year: number, month: number) {
  const monthArrayWithDays = [];

  const firstDayOfMonth = new Date(year, month, 1).getDay();

  console.log("hello", firstDayOfMonth);

  //this loop will populate the array with all the dates before the 1st of each month
  //here i sub 1 to firstDayOfMonth because the no of dates i want before the 1 for the month is more then needed
  for (let j = firstDayOfMonth - 1; j >= 0; j--) {
    const dateTemp = new Date(year, month, -j);

    monthArrayWithDays.push({
      date: dateTemp.getDate(),
      day: dateTemp.getDay(),
    });
  }

  return monthArrayWithDays;
  // for (let i = 0; i <= getDaysInAMonth(year, month); i++) {}
}
