import React from "react";
import "./index.scss";
import CountUp from "react-countup";
const Card = ({ color, title, info, value, lastupdate }) => {
  return (
    <div className="card" style={{ borderBottom: `10px solid ${color}` }}>
      <span>{title}</span>
      <h3>
        <CountUp end={value} duration={2.75} separator="," />
      </h3>
      <span>{lastupdate}</span>
      <p>{info}</p>
    </div>
  );
};

export default Card;
