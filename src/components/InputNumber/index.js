import React from 'react';

const InputNumber = ({ name, id, min, max }) => (
  <div>
    <label>{name}</label>
    <input id={id} type="number" min={min} max={max}/>
  </div>
);

export default InputNumber;