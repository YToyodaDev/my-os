import { useState, useEffect, useCallback } from 'react';

export const useClock = () => {
  const [currentTime, setCurrentTime] = useState('');

  function checkTime(i: number): string {
    return i < 10 ? '0' + i : i.toString();
  }

  const getTime = useCallback(() => {
    const date = new Date();
    const d = date.getDay();
    const h = date.getHours();
    const m = date.getMinutes();

    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayAndTime = `${days[d].substr(0, 3)} ${h}:${checkTime(m)}`;
    setCurrentTime(currentDayAndTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      getTime();
    }, 1000);

    return () => clearInterval(interval);
  }, [getTime]);

  return currentTime;
};
