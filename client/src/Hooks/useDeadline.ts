import { useEffect, useState } from "react";

export interface Deadline {
    days:string,
    hours:string,
    minutes:string,
    seconds:string
}

function getTimeRemaining(endtime: string):Deadline
{
    const total = Date.parse(endtime) - Date.now();
    var seconds = Math.floor( (total/1000) % 60 ).toString();
    var minutes = Math.floor( (total/1000/60) % 60 ).toString();
    var hours = Math.floor( (total/(1000*60*60)) % 24 ).toString();
    var days = Math.floor( total/(1000*60*60*24) ).toString();
  
    if(seconds.length === 1) seconds = "0" + seconds;
    if(minutes.length === 1) minutes = "0" + minutes;
    if(hours.length === 1) hours = "0" + hours;

    return {
        days,
        hours,
        minutes,
        seconds
    };
}

export const useDeadline = (deadline:string) => {
    const [time, setTime] = useState<Deadline>({
        days:"0",
        hours:"0",
        minutes:"0",
        seconds:"0"
    });

    useEffect(()=>{
        const counter = setInterval(()=>{
            setTime(getTimeRemaining(deadline));
        }, 1000);

        return () => clearInterval(counter);
    },[deadline]);
    
    return time;
}