import React from 'react'
import ReactDOM from 'react-dom/client';
import {Routes, Route} from "react-router-dom";
import {Link} from 'react-router-dom';
import './ComponentStyles/navbar.css';
const NavBar = () => {
  return (
    <>
        <img id="navBarLogo" src="dorotimeLogo.png"/>

        <nav id="navBar">
            <ul id="">
                <li> <Link to="/dashboard" className="navBarLinks">Home</Link> </li>
                <li> <Link to="/" className="navBarLinks">Timer</Link> </li>
                <li> <Link to="/" className="navBarLinks">About</Link> </li>
                
            </ul>
            <hr id="navBarBreak"/>
        </nav>
        
    </>
  )
}
export default NavBar
