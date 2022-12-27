import axios from 'axios';
import React, { Component } from 'react'
import { Navigate, unstable_HistoryRouter } from 'react-router-dom';
import NavBar from '../Components/navbar';
import DataChart from '../Components/dataChart'
import './PageStyles/dashboard.css';


// use fetch to get from backend
// Let's display "This month's stats" and "All-time stats" separately, time windows managed by the backend.
export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            details:null,
            userDataIndex:null,
            userDataTable:null,
            userDataValid:false,
        }
    }
    componentDidMount(){
        if(this.state.userDataValid===false){
            this.runValidationChecker()
        }
    }
    runValidationChecker(){
        if(!this.state.userDataValid){
            var checkerInterval = setInterval(()=>{
                let data;
                axios.get("http://localhost:8000/api/stats")
                    .then(response => {
                        data = response.data.stats
                        this.setState({
                            details: data,
                            userDataIndex:null,
                        })
                        for(var object in this.state.details){
                            if(this.state.details[object].idKey===this.getUserIdCookie()){
                                console.log("Id match: ",this.state.details[object].idKey)
                                this.setUserDataIndex(object)
                                this.setUserDataTable()
                                if(this.state.userDataTable!=null){
                                    this.setState({
                                        userDataValid:true  
                                    })
                                    break
                                    
                                }
                                else{
                                    console.log("SETTING FALSE")
                                    this.setState({
                                        userDataValid:false
                                    })
                                }
                            }
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    })
                    if(this.state.userDataValid){
                        clearInterval(checkerInterval)
                    }
            },1000)
            
    }
    }
    getUserIdCookie(){
        var idCookieFull = document.cookie.substring(document.cookie.indexOf("userId=",";"))
        var idCookieValue = (idCookieFull.substring(idCookieFull.indexOf("=")+1)).split(";")[0]

        return idCookieValue
    }
    setUserDataIndex(index){
        this.setState({
            userDataIndex:index,
        })
    }
    setUserDataTable(){
        this.setState({
            userDataTable:this.state.details[this.state.userDataIndex]
        })
    }
    dataWindow(){

        switch(this.state.userDataValid){
            case(true):
                var userData = this.state.userDataTable
                var userTimeData = {}
                var reverseData = {}
                userTimeData[0]=userData.tenWorkTimeCount
                userTimeData[1] = userData.fifteenWorkTimeCount
                userTimeData[2] = userData.twentyWorkTimeCount
                userTimeData[3] = userData.twentyFiveWorkTimeCount
                userTimeData[4] = userData.thirtyWorkTimeCount
                for(var key in userTimeData){
                    reverseData[userTimeData[key]]=key
                }
                var favoriteWorkTimeIndex = Math.max(userTimeData[0],userTimeData[1],userTimeData[2],userTimeData[3],userTimeData[4])
                var favoriteWorkTime
                if(reverseData[favoriteWorkTimeIndex]==0){
                    favoriteWorkTime = "10 Minutes"
                }
                else if(reverseData[favoriteWorkTimeIndex]==1){
                    favoriteWorkTime = "15 Minutes"
                }
                else if(reverseData[favoriteWorkTimeIndex]==2){
                    favoriteWorkTime = "20 Minutes"
                }
                else if(reverseData[favoriteWorkTimeIndex]==3){
                    favoriteWorkTime = "25 Minutes"
                }
                else if(reverseData[favoriteWorkTimeIndex]==4){
                    favoriteWorkTime = "30 Minutes"
                }
                return(
                    <>
                    <div id="dataAnalyzerWindow">
                        <div id="dataAnalyzerWindowHeader">Your Overview</div>
                        <div id="dataListWindow">
                            <div id="dataTimersCompleted">Timers Completed: {this.state.userDataTable.completedTimers}</div>
                            <div id="dataTotalDistractions">Total Distractions: {this.state.userDataTable.totalDistractions}</div>
                            <div id="dataFavoriteWorkTime">Favorite Work Time: {favoriteWorkTime}</div>
                        </div>
                    </div>
                    <div id="timerPieChart">{this.pieChart()}</div>
                    </>

                )
                break
            case(false):
                return(
                    <div id="dataAnalyzerWindow">
                        <div id="dataAnalyzerWindowHeader">Your Overview</div>
                        <div id="dataTimersCompleted">Timers Completed: None</div>
                    </div>

                )
        }

    }
    pieChart(){
        var userDetails = this.state.userDataTable
        return(
            <DataChart 
            ten = {userDetails.tenWorkTimeCount} 
            fifteen = {userDetails.fifteenWorkTimeCount}
            twenty = {userDetails.twentyWorkTimeCount}
            twentyFive = {userDetails.twentyFiveWorkTimeCount}
            thirty = {userDetails.thirtyWorkTimeCount}
            />
        )
    }
    navbar(){
        return(
            <>
            <NavBar selected="dash"/>
            <div id="legendWindow">
                <div id="legendRow1">
                    <div id="legendBox1" className="legendBox"></div>
                    <div id="legendText1">10 Minutes</div>
                </div>
                <div id="legendRow2">
                    <div id="legendBox2" className="legendBox"></div>
                    <div id="legendText2">15 Minutes</div>
                </div>
                <div id="legendRow3">
                    <div id="legendBox3" className="legendBox"></div>
                    <div id="legendText3">20 Minutes</div>
                </div>
                <div id="legendRow4">
                    <div id="legendBox4" className="legendBox"></div>
                    <div id="legendText4">25 Minutes</div>
                </div>
                <div id="legendRow5">
                    <div id="legendBox5" className="legendBox"></div>
                    <div id="legendText5">30 Minutes</div>
                </div>
            </div>
            </>
        )

    }
    render() {
        document.cookie=("session_distraction_count=0; expires=Thu, 01 Jan 1970 00:00:00 UTC")
        return (
            <>
            <>{this.dataWindow()}</>
            <>{this.navbar()}</>
            </>
        )
    }
    }
