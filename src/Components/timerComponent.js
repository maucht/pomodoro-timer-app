import React, {useState} from 'react'
import './ComponentStyles/timerComponent.css'
const TimerComponent = (props) => {
    var displayMinutes=props.minutesLeft.toString()
    var displaySeconds=props.secondsLeft.toString()

    if(props.minutesLeft===null){
        displayMinutes="0"
    }
    if(props.secondsLeft===60){
        displaySeconds="0"
        displayMinutes=props.minutesLeft+1

    }
    if(displaySeconds.length===1){
        displaySeconds="0"+displaySeconds
    }
    if(displayMinutes.length>2||displaySeconds.length>2){ // Maybe add if seconds==60, seconds=0
        return(
            <div id="timerDisplay">Loading...</div>
        )
    }
    else{
    return (
        <div id="timerDisplay">{displayMinutes}:{displaySeconds}</div>
      )
    }

}
export default TimerComponent;
