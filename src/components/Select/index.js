import React from 'react';

const Select = ({ name, id, values }) => (
  <div>
    <label>{name}</label>
    <select id={id}>
      { values.map((value, index) => <option key={index}>{value.name}</option>) }
    </select>
  </div>
);

export default Select;