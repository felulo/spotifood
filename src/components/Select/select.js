import React from 'react';

const Select = ({ name, id, values, value, onChanged }) => (
  <div className="input-container">
    <label
      className="input-container__label"
      htmlFor={id}>
      {name}
    </label>
    <select
      id={id}
      className="input-container__select"
      tabIndex="0"
      value={value}
      onChange={onChanged}>
      { values.map((item, index) => <option key={index} value={item.value}>{item.name}</option>) }
    </select>
  </div>
);

export default Select;