import React, { useState, useEffect, Fragment } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);
  const handleChange = event => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };
  return prices.map((p, i) => (
    <div className="ml-5" key={i}>
      <input
        type="radio"
        onChange={handleChange}
        value={`${p._id}`}
        name={p}
        className="form-check-input"
      />
      <label className="form-check-label"> {p.name} </label>
    </div>
  ));
};
export default RadioBox;
