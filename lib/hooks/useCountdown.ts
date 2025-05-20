// hooks/useCountdown.ts
import { useEffect, useState } from 'react';

export function useCountdown(targetDate: Date | null) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate));

  function getTimeRemaining(endTime: Date | null) {
    if (!endTime) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    const total = endTime.getTime() - Date.now();
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    return { total, days, hours, minutes, seconds };
  }

  useEffect(() => {
    if (!targetDate) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeRemaining(targetDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}
