import React from "react";
import DayListItem from "./DayListItem";

//  SIDE BAR TO DISPLAY NAME OF DAY AND SPOTS REMAINING
const DayList = ({ days, setDay, dayName }) => {
  const newDaysList = days.map((day) => {
    return (
      <ul key={day.id}>
        <DayListItem
          name={day.name}
          spots={day.spots}
          selected={day.name === dayName}
          setDay={setDay}
        />
      </ul>
    );
  });
  return newDaysList;
};

export default DayList;
