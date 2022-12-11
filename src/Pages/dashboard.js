import React, { Component } from 'react'
import { Navigate, unstable_HistoryRouter } from 'react-router-dom';
import NavBar from '../Components/navbar';
import './PageStyles/dashboard.css';

export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={

        }
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
        return (
            <>
            <>{this.dataWindow()}</>
            <>{this.navbar()}</>
            </>
        )
    }
    }
