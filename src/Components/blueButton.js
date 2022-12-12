import React from 'react';
import Timer from '../Pages/timer'
import './ComponentStyles/blueButton.css';
import {unstable_HistoryRouter,useNavigate} from 'react-router-dom';
import timer from '../Pages/timer';
const BlueButton = (props) => {
  var navigate=useNavigate()
  var buttonDict={ // Id dictionary
    banner:"bannerButton",
    timerSubmit:"timerSubmitButton",
  }
  switch(props.purpose){ // Purpose and function for button declared in props
    case("navigation"): // Navigate to another page
      return (
        <div className="blueButton" id={buttonDict[props.idKey]}onClick={()=>navigate(props.clickDirection)}>{props.content}</div>
      )
      break;
    case("generic"): // Self-determined usage
      return (
        <div className="blueButton" id={buttonDict[props.idKey]}>{props.content}</div> //FIXME: function runs constant
      )
  }

}
export default BlueButton;
