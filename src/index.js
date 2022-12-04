import React from 'react';
import ReactDOM from 'react-dom/client';
import MainBanner from './Pages/mainBanner';
import Dashboard from "./Pages/dashboard";
import Timer from "./Pages/timer";
import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-dom";


// December - Present
// Implement cookie based backend and use Python django/flask


// Learning goals: Timers, real time updating, responsive design, cookies and backend development
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