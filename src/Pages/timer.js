import React, { Component } from 'react'
import NavBar from '../Components/navbar';

export default class timer extends Component {
    constructor(props){
        super(props);
        this.state={
            time:1000
        }
    }
    navbar(){
        return(
        <NavBar selected="timer"/>
        )

    }
    render() {
        return (
        <>
        <>{this.navbar()}</>
        </>
    )
    }
}
