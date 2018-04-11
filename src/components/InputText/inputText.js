import React from 'react';

const InputText = ({ name, id, pattern, value, onChanged }) => (
  <div className="input-container">
    <label
      htmlFor={id}
      className="input-container__label">
      {name}
    </label>
    <input
      id={id}
      className="input-container__input"
      type="text"
      tabIndex="0"
      pattern={pattern}
      value={value}
      onChange={onChanged}/>
  </div>
);

export default InputText;