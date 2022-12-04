import React from 'react';
import ReactDOM from 'react-dom/client';
import MainBanner from './Pages/mainBanner';
import Dashboard from "./Pages/dashboard";
import { BrowserRouter } from "react-router-dom";
import {Routes, Route} from "react-router-dom";


// December - Present
// Implement cookie based backend and use Python django/flask

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div id="container">
        <Routes>
          <Route path="/" element={<MainBanner/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);