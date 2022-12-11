import React, { Component } from 'react'
import BlueButton from '../Components/blueButton';
import NavBar from '../Components/navbar';
import './PageStyles/timer.css';

export default class timer extends Component {
    constructor(props){
        super(props);
        this.state={
            time:1000
        }
    }
    timerStartWindow(){ // Use text areas with modern, clean looking design
        return(
            <>
            <div id="timerStartWindow">
                <div id="timerStartWindowHeader">Timer Options</div>
                <div id="timerWorkTimePrompt">Work Time:
                    <div id="timerWorkTimeOptions">
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxOne"></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxTwo"></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxThree"></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxFour"></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxFive"></div>
                    </div>
                </div>
                <div id="timerBreakTimePrompt">Break Time:
                    <div id="timerBreakTimeOptions">
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxOne"></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxTwo"></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxThree"></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxFour"></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxFive"></div>
                    </div>
                </div>
            </div>
            <BlueButton id="submitButton" content="Start" clickDirection="" idKey="timerSubmit"/>
            </>
        )

    }
    audioSelectionPanel(){
        return(
            <div id="audioPanel">
                <div id="audioPanelHeader">Audio</div>

            </div>

        )

    }

    navbar(){
        return(
        <NavBar selected="timer"/>
        )

    }
    render() { // USE THE TIMER COMPONENT IN THE COMPONENT FOLDER
        return (
        <>
        <>{this.audioSelectionPanel()}</>
        <>{this.timerStartWindow()}</>
        <>{this.navbar()}</>
        </>
    )
    }
}
