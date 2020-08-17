import React from "react";
import "./index.scss";
const Filter = ({ data, handleCountryChange }) => {
  return (
    <div className="filter">
      <select onChange={handleCountryChange}>
        <option value="global">Global</option>
        {data.map((i, v) => {
          return (
            <option value={i} key={v}>
              {i}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Filter;
