import React from 'react';
import ReactDOM from 'react-dom/client';
import './mainBanner.css';
import reportWebVitals from './reportWebVitals';



// Pomo-time? Pomo Clock? Pomo Track?
// Doro-time?
class Main extends React.Component{
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
    <div id="topBanner">
      <div id="topBannerNavBar">
        <ul id="topBannerNavBar">
          <li className="topBannerNavItem"><a href="#">Home</a></li>
          <li className="topBannerNavItem"><a href="#">About</a></li>
          <li className="topBannerNavItem"><a href="#">Timer</a></li>
        </ul>
      </div>
      <img id="topBannerLogo" src="dorotimeLogo.png"/>
      <hr id="topBannerBreak"/>
    </div>
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id="container">
    <Main/>
  </div>
);