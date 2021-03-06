import React from "react";
import "components/DayListItem.scss";
const classNames = require("classnames");

// DISPLAY SINGLE DAY SLOT WHILE Unselected, Selected, Full, Clickable
export default function DayListItem({ name, spots, selected, setDay }) {
  const formatSpots = () => {
    if (spots === 0) {
      return <h3>no spots remaining</h3>;
    }
    if (spots === 1) {
      return <h3>{spots} spot remaining</h3>;
    }
    if (spots > 1) {
      return <h3>{spots} spots remaining</h3>;
    }
  };

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0,
  });

  return (
    <>
      <li className={dayClass} data-testid="day" onClick={() => setDay(name)}>
        <h2>{name}</h2>
        {formatSpots()}
      </li>
    </>
  );
}
