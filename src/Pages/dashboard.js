import axios from 'axios';
import React, { Component } from 'react'
import { Navigate, unstable_HistoryRouter } from 'react-router-dom';
import NavBar from '../Components/navbar';
import './PageStyles/dashboard.css';


// use fetch to get from backend
// Let's display "This month's stats" and "All-time stats" separately, time windows managed by the backend.
export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={
            details:null,
            dataTable:{},
        }
    }
    componentDidMount(){
        let data;
        axios.get("http://localhost:8000/api/data")
            .then(response => {
                data = response.data.datas
                this.setState({
                    details: data
                })
                console.log(this.state.details)
                //console.log(this.state.details[0].idKey) // Use hashmaps?
                for(var object in this.state.details){
                    console.log(this.state.details[object].idKey)
                    // if this.state.details[object].idKey equals userId cookie, then setState for user's data
                }
            })
            .catch(err => {
                console.log(err)
            })

    }
    dataWindow(){
        return(
            <div id="dataAnalyzerWindow">
                <div id="dataAnalyzerWindowHeader">Your Overview</div>
            </div>

        )

    }
    navbar(){
        return(
            <NavBar selected="dash"/>
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
