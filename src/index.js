import React from 'react';
import ReactDOM from 'react-dom/client';
import MainBanner from './Pages/mainBanner';
import Dashboard from "./Pages/dashboard";
import Timer from "./Pages/timer";
import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-dom";


// December 2022


// Struggles: onClick bluebutton not working well with class functions
// Timer states needing to be updated one after the other. Eventually i decided on setIntervals and loading text in its place
//   Constant 403s Forbidden with axios trying to post data to the backend. I eventually made the api paths csrf exempt, at cost of security

//What I would fix: double clicking on timer settings because of timer setState timing.
    // inconsistent transitions from work time to break time, likely due to lag

// Learning goals: Timers, real time updating, responsive design, cookies and backend development


if(document.cookie.indexOf("userId")===-1){
  let randomString = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  for ( let i = 0; i < 16; i++ ) {
    randomString += characters.charAt(Math.floor(Math.random()*characters.length));
    document.cookie=("userId="+randomString)
   }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="container">
        <Routes>
          <Route path="/" element={<MainBanner/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/timer" element={<Timer/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);