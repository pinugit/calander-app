export function getDaysInAMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

//this function will create an array of length 42 so to make the process of displaying the months easier
export function getMonthArray(year: number, month: number) {
  const monthArrayWithDays = [];
  const daysInMonth = getDaysInAMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  let newFirstDayOfMonth = firstDayOfMonth;

  //here i check if the first day of the month is sunday or not and depending on that the number of previous month's date to include
  if (firstDayOfMonth === 0) {
    newFirstDayOfMonth += 6;
  } else {
    newFirstDayOfMonth -= 1;
  }

  //this loop will populate the array with all the dates before the 1st of each month
  for (let j = newFirstDayOfMonth; j >= 0; j--) {
    const dateTemp = new Date(year, month, -j);

    monthArrayWithDays.push({
      date: dateTemp.getDate(),
      day: dateTemp.getDay(),
      color: "light",
    });
  }

  //this loop will populate the array with all the dates in the month itself
  for (let i = 1; i <= daysInMonth; i++) {
    const dateTemp = new Date(year, month, i);

    monthArrayWithDays.push({
      date: dateTemp.getDate(),
      day: dateTemp.getDay(),
      color: "dark",
    });
  }

  const remainingDaysForTheMonth = 42 - monthArrayWithDays.length;

  //this loop will populate the array with next month
  for (let n = 1; n <= remainingDaysForTheMonth; n++) {
    const dateTemp = new Date(year, month + 1, n);
    monthArrayWithDays.push({
      date: dateTemp.getDate(),
      day: dateTemp.getDay(),
      color: "light",
    });
  }

  return monthArrayWithDays;
}
