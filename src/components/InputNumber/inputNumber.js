import React from 'react';

const InputNumber = ({ name, id, min, max, value, onChanged }) => (
  <div className="input-container">
    <label
      className="input-container__label"
      htmlFor={id}>
      {name}
    </label>
    <input
      id={id}
      type="number"
      className="input-container__input"
      min={min}
      max={max}
      tabIndex="0"
      value={value}
      onChange={onChanged}/>
  </div>
);

export default InputNumber;