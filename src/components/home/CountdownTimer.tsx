'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endTime: Date;
  onExpire?: () => void;
}

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(end: Date): TimeLeft {
  const diff = Math.max(0, end.getTime() - Date.now());
  return {
    hours:   Math.floor(diff / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  };
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function CountdownTimer({ endTime, onExpire }: CountdownTimerProps) {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft(endTime));
  const expired = time.hours === 0 && time.minutes === 0 && time.seconds === 0;

  useEffect(() => {
    if (expired) { onExpire?.(); return; }

    const id = setInterval(() => {
      const next = getTimeLeft(endTime);
      setTime(next);
      if (next.hours === 0 && next.minutes === 0 && next.seconds === 0) {
        clearInterval(id);
        onExpire?.();
      }
    }, 1000);

    return () => clearInterval(id);
  }, [endTime, expired, onExpire]);

  const Segment = ({ value }: { value: number }) => (
    <div
      className="min-w-[30px] h-8 flex items-center justify-center
                 bg-primary text-white text-sm font-mono font-medium rounded-lg"
    >
      {pad(value)}
    </div>
  );

  const Colon = () => (
    <span className="text-primary font-bold text-sm mx-0.5">:</span>
  );

  return (
    <div className="flex items-center gap-0.5">
      <Segment value={time.hours} />
      <Colon />
      <Segment value={time.minutes} />
      <Colon />
      <Segment value={time.seconds} />
    </div>
  );
}
