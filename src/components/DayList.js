import React from "react";
import DayListItem from "./DayListItem";

//  SIDE BAR TO DISPLAY NAME OF DAY AND SPOTS REMAINING
const DayList = (props) => {
  const days = props.days.map((day) => {
    return (
      <ul key={day.id}>
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === props.day}
          setDay={props.setDay}
        />
      </ul>
    );
  });
  return days;
};

export default DayList;
