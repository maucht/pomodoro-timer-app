import React, {useState} from 'react'
import './ComponentStyles/timerComponent.css'
const TimerComponent = (props) => {
    
    if(props.secondsLeft.toString().length>2||props.minutesLeft.toString().length>2){
        return(
            <div id="timerDisplay">Loading...</div>
        )
    }
    else{
    return (
        <div id="timerDisplay">{props.minutesLeft}:{props.secondsLeft}</div>
      )
    }

}
export default TimerComponent;
