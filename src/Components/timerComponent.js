import React from 'react'

export const timerComponent = (props) => {
    console.log("e")
  return (
    <div>{props.workTime}+{props.breakTime}+{props.repTime}</div>
  )
}
