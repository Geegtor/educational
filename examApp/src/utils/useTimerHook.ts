import { useEffect, useState } from "react";
import { additionalData } from "../assets/models/models";

export function useTimer(): [number, CallableFunction] {
    const [timer, setTimer] = useState<number>(
        localStorage.getItem('testTimer') ? 
          parseInt(localStorage.getItem('testTimer')!) :
          additionalData.timeForTest
      );additionalData

    useEffect(() => {
        localStorage.setItem('testTimer', timer.toString());
        const interval = setInterval(() => {
            if (timer > 0) {
            setTimer(prevTime => {
                return prevTime - 1
            });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [timer]);

    return [timer, setTimer]
}
