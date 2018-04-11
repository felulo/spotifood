import React from 'react';

const InputText = ({ name, id, pattern }) => (
  <div>
    <label>{name}</label>
    <input id={id} type="text" pattern={pattern} />
  </div>
);

export default InputText;