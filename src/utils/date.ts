const padNumber = (num: number) => {
  return num.toString().padStart(2, '0');
};

/* Returns time difference in Days, Hours:Mins:Seconds */
export const getTimeDifference = (stringDateArray: string[]) => {
  const firstDate = stringDateArray[0];
  const lastDate = stringDateArray[stringDateArray.length - 1];
  let seconds =
    Math.abs(new Date(firstDate).getTime() - new Date(lastDate).getTime()) /
    1000;
  const day = 86400;
  const hour = 3600;
  const minute = 60;
  const daysout = Math.floor(seconds / day);
  const hoursout = Math.floor((seconds - daysout * day) / hour);
  const minutesout = Math.floor(
    (seconds - daysout * day - hoursout * hour) / minute,
  );
  var secondsout =
    seconds - daysout * day - hoursout * hour - minutesout * minute;

  return `${daysout} Days, ${padNumber(hoursout)}:${padNumber(
    minutesout,
  )}:${padNumber(secondsout)}`;
};
