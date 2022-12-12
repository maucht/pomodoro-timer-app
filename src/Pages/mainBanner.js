import React from 'react';
import ReactDOM from 'react-dom/client';
import './PageStyles/mainBanner.css';
import { NavLink } from 'react-router-dom';
import NavBar from '../Components/navbar';
import BlueButton from '../Components/blueButton';

export default class Main extends React.Component{
    constructor(props){
      super(props);
      this.state={
  
      }
    }

    demoButton(){
      return(
        <BlueButton content="Go to Dash" clickDirection="/dashboard" idKey="banner" purpose="navigation"/>
      )
    }
    topBanner(){
      return(
        <NavBar selected="about"/>
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