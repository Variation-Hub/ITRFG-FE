import { useEffect, useRef, useState } from "react";

import { getItem, setItem } from "@/lib/localStorage";

type Props = {
  startTime: number;
  sectionName: string;
  handleSubmit: () => void;
  stopTimer?: boolean;
};

export const secondsToHms = (d: number) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  return {
    hours: h,
    minutes: m,
    seconds: s,
  };
};

const Timer = ({ startTime, handleSubmit, sectionName, stopTimer }: Props) => {
  const { hours = 0, minutes = 0, seconds = 60 } = secondsToHms(startTime);

  const [[hrs, mins, secs], setTime] = useState([hours, minutes, seconds]);

  const timeRef = useRef<any>();

  const reset = () => {
    // alert('Times Up!..');
    clearInterval(timeRef.current);
    console.log("called from timer....");

    handleSubmit();
  };

  const tick = () => {
    if (stopTimer) {
      clearInterval(timeRef.current);
    } else if (hrs === 0 && mins === 0 && secs === 0) reset();
    else if (mins === 0 && secs === 0) {
      setTime([hrs - 1, mins, 59]);

      //Localstorage
      setItem(sectionName, JSON.stringify([hrs - 1, mins, 59]));
    } else if (secs === 0) {
      setTime([hrs, mins - 1, 59]);
      setItem(sectionName, JSON.stringify([hrs, mins - 1, 59]));
    } else {
      setTime([hrs, mins, secs - 1]);
      setItem(sectionName, JSON.stringify([hrs, mins, secs - 1]));
    }
  };

  useEffect(() => {
    if (typeof window !== undefined && getItem(sectionName)) {
      const prevTime = JSON.parse(getItem(sectionName) || "") as number[];

      if (Array.isArray(prevTime)) {
        setTime([prevTime[0], prevTime[1], prevTime[2]]);
      }
    }
  }, []);

  useEffect(() => {
    if (startTime) {
      timeRef.current = setInterval(() => tick(), 1000);
    }

    return () => clearInterval(timeRef.current);
  }, [hrs, mins, secs]);

  return (
    <span className="ml-1 text-xl font-semibold">
      {!!hrs && <>{hrs.toString().padStart(2, "0")}:</>}
      {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
    </span>
  );
};

export default Timer;
