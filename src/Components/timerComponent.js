import React, {useState} from 'react'
import BlueButton from './blueButton';
import './ComponentStyles/timerComponent.css'
const TimerComponent = (props) => { //FIXME: Minutes displayed jumps when seconds reaches 0
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
    if(displayMinutes.length>2||displaySeconds.length>2){ 
        return(
            <div id={props.timerSection=="Work Time" ? "timerDisplayWork":"timerDisplayBreak"}>Loading...</div>
        )
    }
    else{
        switch(props.isWorkTime){
            case(true):
            return (
                <>
                <div id="distractionCounter">Distractions: COOKIES</div>
                <BlueButton purpose="generic" idKey="timerDistraction" content="Distracted"/>
                <div id={props.timerSection=="Work Time" ? "timerDisplayHeaderWork":"timerDisplayHeaderBreak"}>{props.timerSection}</div>
                <div id={props.timerSection=="Work Time" ? "timerDisplayWork":"timerDisplayBreak"}>{displayMinutes}:{displaySeconds}</div>
                </>
            )
            break;
            case(false):
            return (
                <>
                <div id={props.timerSection=="Work Time" ? "timerDisplayHeaderWork":"timerDisplayHeaderBreak"}>{props.timerSection}</div>
                <div id={props.timerSection=="Work Time" ? "timerDisplayWork":"timerDisplayBreak"}>{displayMinutes}:{displaySeconds}</div>
                </>
            )
            break;
        }

    }

}
export default TimerComponent;
