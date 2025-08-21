import { useEffect, useRef, useState } from "react"

function StopWatch(){

    const [isRunning,setisRunning]=useState(false)    //to check whether the stopwatch is running
    const [timePassed,settimePassed]=useState(0)      //to check how much time has passed
    const startTimeRef=useRef(0)                      //for the timer to start
    const intervalIdRef=useRef(0)        //contains the id of the interval

    useEffect(()=>{  //needed to run the stopwatch
        if (isRunning){
            intervalIdRef.current=setInterval(()=>{
                settimePassed(Date.now()-startTimeRef.current)
            },10)  //it will update 'settimePassed' every 10ms
        }

        return ()=>{    //clean up function:reset or stop won't work without the clean up function
            clearInterval(intervalIdRef.current)

        }

    },[isRunning]) //dependency array, the hook will only function if the dependency array is true



    function start(){  //staring function
        setisRunning(true)
        startTimeRef.current=Date.now()-timePassed
    }

    function stop(){ //stopping function
        setisRunning(false)
        
    }

    function reset(){ //reset function
        settimePassed(0)
        setisRunning(false)

    }

    function formatTime(){  //to show the time 
        let mins=Math.floor(timePassed/(1000*60)%60)
        let secs=Math.floor(timePassed/(1000)%60)
        let milisecs=Math.floor((timePassed%1000)/10)

        //padding a zero before the min,sec and milisec
        mins=String(mins).padStart(2,"0")  
        secs=String(secs).padStart(2,"0")
        milisecs=String(milisecs).padStart(2,"0")


        return `${mins}:${secs}:${milisecs}`;

    }



    return(
        <div className="stopwatch">
            
            <div className="timer">
                {formatTime()}
            </div>

            <div className="buttons">
                <button onClick={start}  id="start">Start</button>   
                <button  onClick={stop} id="stop">Stop</button>  
                <button  onClick={reset} id="reset">Reset</button>
            </div>

            

        </div>
    )
    
}
export default StopWatch


