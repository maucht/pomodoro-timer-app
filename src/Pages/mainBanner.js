import React from 'react';
import ReactDOM from 'react-dom/client';
import '../CSS/mainBanner.css';
import { NavLink } from 'react-router-dom';
import NavBar from '../Components/navbar';

export default class Main extends React.Component{
    constructor(props){
      super(props);
      this.state={
  
      }
    }
    demoButton(){
      return(
      <div id="demoButton">Go to Dash</div>
      )
  
    }
    topBanner(){
      return(
        <NavBar/>

      /*<div id="topBanner">
        <div id="topBannerNavBar">
          <ul id="topBannerNavBar">
            <li className="topBannerNavItem"><NavLink to="/">Home</NavLink></li>
            <li className="topBannerNavItem"><NavLink to="/">About</NavLink></li>
            <li className="topBannerNavItem"><NavLink to="/">Timer</NavLink></li>
          </ul>
        </div>
        <img id="topBannerLogo" src="dorotimeLogo.png"/>
        <hr id="topBannerBreak"/>
      </div>*/
      )
    }
    mainBanner(){
      return(
        <div id="mainBanner">
          <img src="lowPolyDoro.png" id="polyBanner"/>
          <div id="mainBannerHeader">Improve your Focus.</div>
          <div id="mainBannerParagraph">Stay on task longer, and tackle the toughest problems with Dorotime!</div>
        </div>
  
      )
  
    }
    render(){
      return(
        <>
          <>{this.topBanner()}</>
          <>{this.mainBanner()}</>
          <>{this.demoButton()}</>
        </>
      )
      }
  }