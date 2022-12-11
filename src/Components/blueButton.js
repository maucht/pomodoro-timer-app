import React from 'react';
import './ComponentStyles/blueButton.css';
import {unstable_HistoryRouter,useNavigate} from 'react-router-dom';
const BlueButton = (props) => {
  var navigate=useNavigate()
  var buttonDict={
    banner:"bannerButton",
    timerSubmit:"timerSubmitButton",
  }
  return (
    <div className="blueButton" id={buttonDict[props.idKey]}onClick={()=>navigate(props.clickDirection)}>{props.content}</div>
  )
}
export default BlueButton;
