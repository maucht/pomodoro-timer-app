import React from 'react'
import ReactDOM from 'react-dom/client';
import {Routes, Route} from "react-router-dom";
import {Link} from 'react-router-dom';
import './ComponentStyles/navbar.css';

const NavBar = (props) => { // Creates top navigation bar
  return (
    <>
        <img id="navBarLogo" src="dorotimeLogo.png"/>

        <nav id="navBar">
            <ul id="">
                <li> <Link to="/dashboard" className="navBarLinks" id={props.selected=="dash" ? "linkSelected" : "ignore"}>Dash</Link> </li>
                <li> <Link to="/timer" className="navBarLinks" id={props.selected=="timer" ? "linkSelected" : "ignore"}>Timer</Link> </li>
                <li> <Link to="/" className="navBarLinks" id={props.selected=="about" ? "linkSelected" : "ignore"}>About</Link> </li>
                
            </ul>
            <hr id="navBarBreak"/>
        </nav>
        
    </>
  )
}
export default NavBar
