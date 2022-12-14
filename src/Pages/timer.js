import axios from 'axios';
import React, { Component } from 'react'
import BlueButton from '../Components/blueButton';
import NavBar from '../Components/navbar';
import TimerComponent from '../Components/timerComponent';
import AudioPlayer from '../Components/audioPlayer';
import tracks from '../audioTracks'
import './PageStyles/timer.css';


// REMEMBER TO FIX PLACEHOLDER TIMER BOXES

export default class timer extends Component { // FIXME: timer doesn't properly transition from break time to work time
    constructor(props){
        super(props);
        this.state={
            timerStarted:0,
            selectedWorkTime:-1,
            selectedBreakTime:-1,
            selectedRepTime:-1,
            workTime:-1,
            breakTime:-1,
            repTime:-1,
            minutesLeft:null,
            secondsLeft:null,
            startTime:0,
            targetTime:-1,
            isWorkTime:false,
            isBreakTime:false,

            selectedAudio:null,
        }
    }
    componentDidMount(){ // The transition from work time to break time works only sometimes, likely because of lag with setIntervals
        setInterval(()=>{
            if(this.state.minutesLeft>-1 && this.state.secondsLeft>0){ // This causes timer to start
                this.setState({timerStarted:1})
            }
            if(this.state.isWorkTime){
            this.setState({
                targetTime:this.state.startTime+this.state.workTime,
            })
            }
            else if(this.state.isBreakTime){
                this.setState({
                    targetTime:this.state.startTime+this.state.breakTime
                })
            }
        },10)
        setInterval(()=>{
            const d = new Date()
            if(this.state.repTime==0){
                this.setState({ // Reset
                    minutesLeft:null,
                    secondsLeft:null,
                    isWorkTime:false,
                    isBreakTime:false,
                    selectedWorkTime:-1,
                    selectedBreakTime:-1,
                    selectedRepTime:-1,
                    workTime:-1,
                    breakTime:-1,
                    timerStarted:0,
                    repTime:-1,
   
                })

            }
            else if(this.state.targetTime-d.getTime()>0){
                this.setState({
                minutesLeft:((Math.floor((this.state.targetTime-d.getTime())/60000))),
                secondsLeft:(Math.floor((this.state.targetTime-d.getTime()-this.state.minutesLeft*60000+1000)/1000))
                }
        )}
            else if(this.state.isWorkTime && !this.state.isBreakTime && this.state.repTime!=0){ // End of Work Time
                console.log("End of work time!") 
                this.handleWorkToBreakTime()

            }
            else if(!this.state.isWorkTime && this.state.isBreakTime){ // End of break time
                console.log("End of break time!")
                this.handleBreaktoWorkTime()

            }
            if(this.state.isBreakTime && this.state.repTime==0){ // End of repititions, back to timer option menu
                console.log("Completed!")
                this.handlePostData(this.state.workTime, this.state.breakTime)
                this.handleCookieDistribution()
                this.setState({
                    minutesLeft:null,
                    secondsLeft:null,
                    isWorkTime:false,
                    isBreakTime:false,
                    selectedWorkTime:-1,
                    selectedBreakTime:-1,
                    selectedRepTime:-1,
                    workTime:-1,
                    breakTime:-1,
                    timerStarted:0,
                    targetTime:d.getTime(),
                    repTime:-1,
                })}

                

            },1000)

    }
    handlePostData(workTime,breakTime){
        
        const url="http://localhost:8000/api/data"

        var totCookieFull="total_distractions=0"
        var totCookieValue=0


        if(document.cookie.indexOf("session_distraction_count")===-1){
            document.cookie="session_distraction_count=0"
        }

        const sesCookieFull = document.cookie.substring(document.cookie.indexOf("session_distraction_count=",";"))
        const sesCookieValue = (sesCookieFull.substring(sesCookieFull.indexOf("=")+1)).split(";")[0]

        if(document.cookie.indexOf("total_distractions=")===-1){
            document.cookie="total_distractions=0"
        }
        else{
            totCookieFull = document.cookie.substring(document.cookie.indexOf("total_distractions=",';'))
            totCookieValue = totCookieFull.substring(totCookieFull.indexOf("=")+1).split(";")[0]
        }

        var idCookieFull = document.cookie.substring(document.cookie.indexOf("userId=",";"))
        var idCookieValue = (idCookieFull.substring(idCookieFull.indexOf("=")+1)).split(";")[0]
        axios.post(url,
            {
                idKey:idCookieValue,
                workTime:workTime,
                breakTime:breakTime,
                sessionDistractions:sesCookieValue,
            }
            )
        .then(response =>{
                console.log("Posted data")
        })
        .catch(err => {
                console.log(err)
        });
        this.handleOverallStatsDistribution(workTime,sesCookieValue,totCookieValue)
    }
    handleOverallStatsDistribution(workTime,sesCookieValue,totCookieValue){
        var idCookieFull = document.cookie.substring(document.cookie.indexOf("userId=",";"))
        var idCookieValue = (idCookieFull.substring(idCookieFull.indexOf("=")+1)).split(";")[0]

        var tenWorkTimeCount=0
        var fifteenWorkTimeCount=0
        var twentyWorkTimeCount=0
        var twentyFiveWorkTimeCount=0
        var thirtyWorkTimeCount=0

        var patchable=false
        var patchableStatId=0
        var patchableTimerCount=0
        var data=null
        var statData=null
        axios.get('http://localhost:8000/api/data')
            .then(response =>{
                data = response.data.datas
                for(var object in data){
                    if(data[object].idKey===idCookieValue){
                        switch(data[object].workTime){
                            case(10000):
                                tenWorkTimeCount++
                                break;
                            case(900000):
                                fifteenWorkTimeCount++
                                break;
                            case(1200000):
                                twentyWorkTimeCount++
                                break;
                            case(1500000):
                                twentyFiveWorkTimeCount++
                                break;
                            case(1800000):
                                thirtyWorkTimeCount++
                                break;
                            default:
                                tenWorkTimeCount++
                                break;
                        }
                    }
                }
                axios.get('http://localhost:8000/api/stats')
                .then(response=>{
                    statData=response.data.stats
                    for(var object in statData){
                        console.log(statData[object].idKey)
                        if(statData[object].idKey===idCookieValue){
                            console.log(statData[object])
                            patchable=true
                            patchableStatId=statData[object].id
                            patchableTimerCount=statData[object].completedTimers
                            break
                        }
                    }

                    console.log(patchable)
                    if(patchable){
                        axios.patch('http://localhost:8000/api/stats/'+patchableStatId,{
                            completedTimers:parseInt(patchableTimerCount)+parseInt(1),
                            totalDistractions:parseInt(totCookieValue)+parseInt(sesCookieValue),
                            tenWorkTimeCount,
                            fifteenWorkTimeCount,
                            twentyWorkTimeCount,
                            twentyFiveWorkTimeCount,
                            thirtyWorkTimeCount
                        })
                        .then(response=>{
                            console.log(response)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                    else{
                        axios.post('http://localhost:8000/api/stats',{
                            idKey:idCookieValue,
                            completedTimers:1,
                            totalDistractions:sesCookieValue,
                            tenWorkTimeCount,
                            fifteenWorkTimeCount,
                            twentyWorkTimeCount,
                            twentyFiveWorkTimeCount,
                            thirtyWorkTimeCount
                        })
                        .then(response=>{
                            console.log(response)
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        console.log(tenWorkTimeCount)
        

    }
    handleCookieDistribution(){
        if(document.cookie.indexOf("session_distraction_count")===-1){
            document.cookie="session_distraction_count=0"
        }

        const sesCookieFull = document.cookie.substring(document.cookie.indexOf("session_distraction_count=",";"))
        const sesCookieValue = (sesCookieFull.substring(sesCookieFull.indexOf("=")+1)).split(";")[0]

        if(document.cookie.indexOf("total_distractions")===-1){
            console.log("Total Distraction cookie missing, creating cookie")
            document.cookie=("total_distractions="+sesCookieValue)
        }
        else{
            const totCookieFull = document.cookie.substring(document.cookie.indexOf("total_distractions=",';'))
            const totCookieValue = (totCookieFull.substring(totCookieFull.indexOf("=")+1)).split(";")[0]

            console.log("Adding ",totCookieValue, " and ", sesCookieValue)
            document.cookie = ("total_distractions="+((parseInt(sesCookieValue)+parseInt(totCookieValue))).toString())
        }
        document.cookie="session_distraction_count=0; expires=Thu, 18 Dec 2013 12:00:00 UTC"  

    }
    handleWorkToBreakTime(){
        const d = new Date()
        if(this.state.repTime!=0){
            this.setState({
                isWorkTime:false,
                isBreakTime:true,
                repTime:this.state.repTime-1,
                startTime:d.getTime()
                //timerStarted:0
            })
    }
    }
    handleBreaktoWorkTime(){
        const d = new Date()
        this.setState({
            isWorkTime:true,
            isBreakTime:false,
            startTime:d.getTime()
            //timerStarted:0
        })
    }
    handleWorkTimeSelect(boxSelected){
        var boxDict={
            1:"timerWorkTimeBoxOne",
            2:"timerWorkTimeBoxTwo",
            3:"timerWorkTimeBoxThree",
            4:"timerWorkTimeBoxFour",
            5:"timerWorkTimeBoxFive"
        }
        var valueDict={
            1:600000,// For testing purposes: replace with 10000
            2:900000,
            3:1200000,
            4:1500000,
            5:1800000
        }
        var selectedElement=document.getElementById(boxDict[boxSelected])
        selectedElement.style.backgroundColor="rgba("+67+","+131+","+250+","+0.85+")"
        selectedElement.style.color="white"

        for(let key in boxDict){ //Removes styling from un-selected choices
            if(key!=boxSelected){
                document.getElementById(boxDict[key]).style.backgroundColor=null
                document.getElementById(boxDict[key]).style.color=null
            }
        }
        this.setState({
            selectedWorkTime:valueDict[boxSelected]
        })
    }
    handleBreakTimeSelect(boxSelected){
        var boxDict={
            1:"timerBreakTimeBoxOne",
            2:"timerBreakTimeBoxTwo",
            3:"timerBreakTimeBoxThree",
            4:"timerBreakTimeBoxFour",
            5:"timerBreakTimeBoxFive"
        }
        var valueDict={
            1:120000, // For testing purposes: replace with 20000
            2:300000,
            3:600000,
            4:900000,
            5:1200000
        }
        var selectedElement=document.getElementById(boxDict[boxSelected])
        selectedElement.style.backgroundColor="rgba("+67+","+131+","+250+","+0.85+")"
        selectedElement.style.color="white"

        for(let key in boxDict){ //Removes styling from un-selected choices
            if(key!=boxSelected){
                document.getElementById(boxDict[key]).style.backgroundColor=null
                document.getElementById(boxDict[key]).style.color=null
            }
        }

        this.setState({
            selectedBreakTime:valueDict[boxSelected]
        })
    }
    handleRepTimeSelect(boxSelected){
        var boxDict={
            1:"timerRepTimeBoxOne",
            2:"timerRepTimeBoxTwo",
            3:"timerRepTimeBoxThree",
            4:"timerRepTimeBoxFour",
            5:"timerRepTimeBoxFive"
        }
        var valueDict={
            1:1,
            2:2,
            3:3,
            4:4,
            5:5
        }
        var selectedElement=document.getElementById(boxDict[boxSelected])
        selectedElement.style.backgroundColor="rgba("+67+","+131+","+250+","+0.85+")"
        selectedElement.style.color="white"

        for(let key in boxDict){ //Removes styling from un-selected choices
            if(key!=boxSelected){
                document.getElementById(boxDict[key]).style.backgroundColor=null
                document.getElementById(boxDict[key]).style.color=null
            }
        }

        this.setState({
            selectedRepTime:valueDict[boxSelected]
        })
    }
    handleAudioSelect(audioIndex){
        var idMap = {
            0 : "audio1",
            1 : "audio2",
            2 : "audio3",
            3 : "audio4",
            4 : "audio5"
        }
        this.setState({
            selectedAudio: tracks[audioIndex]
        })
        var selectedElement=document.getElementById(idMap[audioIndex])
        selectedElement.style.backgroundColor="rgba("+67+","+131+","+250+","+0.85+")"
        selectedElement.style.color="white"
        for(var id in tracks){
            if(id!=audioIndex){
                document.getElementById(idMap[id]).style.backgroundColor=null
                document.getElementById(idMap[id]).style.color=null
            }
        }
        
    }
    handleTimerSubmit(){
        const d = new Date()
        document.cookie=("session_distraction_count=0; expires=Thu, 01 Jan 1970 00:00:00 UTC")
        if(this.state.selectedWorkTime!=-1 && this.state.selectedBreakTime!=-1 && this.state.selectedRepTime!=-1){
            this.setState({
                workTime:this.state.selectedWorkTime,
                breakTime:this.state.selectedBreakTime,
                repTime:this.state.selectedRepTime,
                startTime:d.getTime(),
                isWorkTime:true,
                isBreakTime:false
            })
            this.setState({
                minutesLeft:((Math.floor((this.state.targetTime-d.getTime())/60000))),
                secondsLeft:(Math.floor((this.state.targetTime-d.getTime()-this.state.minutesLeft*60000+1000)/1000))
                }
        )
    }
    }
    timerStartWindow(){ // Use text areas with modern, clean looking design
        return(
            <>
            <div id="timerStartWindow">
                <div id="timerStartWindowHeader">Timer Options</div>
                <div id="timerWorkTimePrompt">Work Time:
                    <div id="timerWorkTimeOptions">
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxOne" onClick={(boxSelected)=>this.handleWorkTimeSelect(1)}></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxTwo" onClick={(boxSelected)=>this.handleWorkTimeSelect(2)}></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxThree" onClick={(boxSelected)=>this.handleWorkTimeSelect(3)}></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxFour" onClick={(boxSelected)=>this.handleWorkTimeSelect(4)}></div>
                        <div className="timerTimeOptionBox" id="timerWorkTimeBoxFive" onClick={(boxSelected)=>this.handleWorkTimeSelect(5)}></div>
                    </div>
                </div>
                <div id="timerBreakTimePrompt">Break Time:
                    <div id="timerBreakTimeOptions">
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxOne" onClick={(boxSelected)=>this.handleBreakTimeSelect(1)}></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxTwo" onClick={(boxSelected)=>this.handleBreakTimeSelect(2)}></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxThree" onClick={(boxSelected)=>this.handleBreakTimeSelect(3)}></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxFour" onClick={(boxSelected)=>this.handleBreakTimeSelect(4)}></div>
                        <div className="timerTimeOptionBox" id="timerBreakTimeBoxFive" onClick={(boxSelected)=>this.handleBreakTimeSelect(5)}></div>
                    </div>
                </div>
                <div id="timerRepTimePrompt">Repetitions:
                    <div id="timerRepTimeOptions">
                        <div className="timerTimeOptionBox" id="timerRepTimeBoxOne" onClick={(boxSelected)=>this.handleRepTimeSelect(1)}></div>
                        <div className="timerTimeOptionBox" id="timerRepTimeBoxTwo" onClick={(boxSelected)=>this.handleRepTimeSelect(2)}></div>
                        <div className="timerTimeOptionBox" id="timerRepTimeBoxThree" onClick={(boxSelected)=>this.handleRepTimeSelect(3)}></div>
                        <div className="timerTimeOptionBox" id="timerRepTimeBoxFour" onClick={(boxSelected)=>this.handleRepTimeSelect(4)}></div>
                        <div className="timerTimeOptionBox" id="timerRepTimeBoxFive" onClick={(boxSelected)=>this.handleRepTimeSelect(5)}></div>
                    </div>
                </div>
            </div>
            <div id="forClickEventIGNORE" onClick={()=>this.handleTimerSubmit()}>
                <BlueButton id="submitButton" content="Start" idKey="timerSubmit" purpose="generic"/>
            </div>
            </>
        )

    }
    audioSelectionPanel(){
        return(
            <div id="audioPanel">
                <div id="audioPanelHeader">Audio</div>
                <div id="audioTrackList">
                    <div id="audioTrack1" className="audioTracks">Rain and Thunder 
                        <div className="timerTimeOptionBox audio" id="audio1" onClick={()=>this.handleAudioSelect(0)}></div>
                    </div>
                    <div id="audioTrack2" className="audioTracks">City Noises 
                        <div className="timerTimeOptionBox audio" id="audio2" onClick={()=>this.handleAudioSelect(1)}></div>
                    </div>
                    <div id="audioTrack3" className="audioTracks">Cafe Ambience 
                        <div className="timerTimeOptionBox audio" id="audio3" onClick={()=>this.handleAudioSelect(2)}></div>
                    </div>
                    <div id="audioTrack4" className="audioTracks">Train Ride 
                        <div className="timerTimeOptionBox audio" id="audio4" onClick={()=>this.handleAudioSelect(3)}></div>
                    </div>
                    <div id="audioTrack5" className="audioTracks">Waterfall Effects 
                        <div className="timerTimeOptionBox audio" id="audio5" onClick={()=>this.handleAudioSelect(4)}></div>
                    </div>
                </div>
            </div>

        )

    }
    timerInterface(){ 
        if((this.state.minutesLeft!=null || this.state.secondsLeft!=null)){
            return(
                <>
                <TimerComponent 
                minutesLeft={this.state.minutesLeft} 
                secondsLeft={this.state.secondsLeft} 
                timerSection={this.state.isWorkTime ? "Work Time":"Break Time"}
                isWorkTime={this.state.isWorkTime}
                track = {this.state.selectedAudio}
                />
                </>
            )
        }
    }
    navbar(){ //FIXME: add sensitive page bool prop to navbar, set it to true when the timer starts
        return(
        <NavBar selected="timer"/>
        )
    }
    render() { // USE THE TIMER COMPONENT IN THE COMPONENT FOLDER
        switch(this.state.timerStarted){
            case(0):
                return (
                <>
                <>{this.audioSelectionPanel()}</>
                <>{this.timerStartWindow()}</>
                <>{this.navbar()}</>
                </>
            )
            case(1):
                return(
                    <>
                    <>{this.navbar()}</>
                    <>{this.timerInterface()}</>
                    </>
                )

        }
    }
}
