import { useState ,useEffect } from "react";
import { preload } from "react-dom";

export default function TimeInterval(){

  const [time ,setTime ] = useState(0);
  const [isRunning, setIsRunning ] = useState(false);
  const [laps,setLaps] = useState([]);

  useEffect(()=> {

  let interval ;
  if(isRunning){
    interval = setInterval(() => {

    setTime ((prev)=> prev + 10);
    
  }, 10);
}
  return () => clearInterval (interval);
},[isRunning]);

const handleLaps = () =>{
  setLaps((prev)=> [...prev,time]);
};

const handleReset = () => {
  setIsRunning(false);
  setTime(0);
  setLaps([]);
};



const formatTime = (time) => {
const minutes = Math.floor(time / 60000);
const seconds = Math.floor((time % 60000)/1000);
const milliSeconds = Math.floor (time % 1000)/10;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}:
          ${milliSeconds < 10 ? "0" : ""}${milliSeconds}`;
};

return (
  <div className="Stop-watch">
    <h1> Time : {formatTime(time)} </h1>

    <button onClick={()=> setIsRunning(true)}>Start</button>
    <button onClick={() => setIsRunning(false)}>Stop</button>
    <button onClick={handleLaps} disabled= {!isRunning}> Lap</button>
    <button onClick={handleReset}>Reset</button>

    <ul>
      {laps.map((lap,index) => (
        <li key={lap}>
          Lap {index+1} → {formatTime(lap)}
        </li>
      ))}
    </ul>
  </div>
);
}