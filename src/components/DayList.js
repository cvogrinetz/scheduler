import React from 'react';
// import reactDom from 'react-dom';
import DayListItem from './DayListItem';
// const classNames = require('classnames');


const DayList = (props) => {
  const days = props.days.map(day => {
    
    return (
      
      <ul key={day.id}>
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </ul>
    )
  })
  return days;
  
}

    

export default DayList
