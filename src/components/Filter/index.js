import React, { Component } from 'react';
import Select from '../Select';
import InputNumber from '../InputNumber';
import InputText from '../InputText';

class Filter extends Component {
  render() {
    const { values, validation, name, id } = this.props;
    let filter = <span></span>;

    if (values) {
      filter = <Select id={id} name={name} values={values} />
    } else if (validation && validation.primitiveType) {
      switch (validation.primitiveType) {
        case 'STRING':
          filter = <InputText id={id} name={name} pattern={validation.pattern}/>
        break;
        case 'INTEGER':
          filter = <InputNumber id={id} name={name} min={validation.min} max={validation.max}/>
        break;
      }
    }

    return filter;
  }
}

export default Filter;