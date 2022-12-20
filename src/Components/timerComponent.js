import React, {useState} from 'react'
import BlueButton from './blueButton';
import './ComponentStyles/timerComponent.css'
const TimerComponent = (props) => { //FIXME (or not): Minutes displayed jumps when seconds reaches 0
    const DistractCookieGetter = ()=>{ // timer.js will handle total distractions after this is complete
        if(document.cookie.indexOf("session_distraction_count=")===-1){
            return -1
        }
        /* const decodeCookie = decodeURIComponent(document.cookie)
        const cookieArray = decodeCookie.split(';')
        const cookieArrayIndexed=cookieArray[document.cookie.indexOf("session_distraction_count")]
        console.log(document.cookie.indexOf("session_distraction_count"))
        console.log(cookieArray[1].split('=')[1])
        const sesDistractCountValue=cookieArrayIndexed.split('=')[1] */
        

        const cookieFull = document.cookie.substring(document.cookie.indexOf("session_distraction_count=",";"))
        const cookieValue = cookieFull.substring(cookieFull.indexOf("=")+1)
        console.log(cookieValue)

        return cookieValue
    }
    const DistractCookieSetter = () => {
        if(DistractCookieGetter()===-1){
            console.log("Cookie does not exist, creating cookie")
            document.cookie="session_distraction_count=1";
        }
        else{
            const sesDistractCountValue=DistractCookieGetter()
            console.log("Cookie already exists, altering")
            console.log(sesDistractCountValue)
            document.cookie=("session_distraction_count="+(parseInt(sesDistractCountValue)+1).toString());
            
        }
    }
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
                <div id="distractionCounter">Distractions: {(DistractCookieGetter())===-1 ? "0" : (DistractCookieGetter())}</div>
                <div onClick={()=>DistractCookieSetter()}><BlueButton purpose="generic" idKey="timerDistraction" content="Distracted"/></div>
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
