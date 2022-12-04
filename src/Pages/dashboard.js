import React, { Component } from 'react'
import NavBar from '../Components/navbar';

export default class dashboard extends Component {
    constructor(props){
        super(props);
        this.state={


        }

    }
    navbar(){
        return(
            <NavBar/>
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
