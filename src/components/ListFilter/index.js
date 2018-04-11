import React from 'react';
import Filter from '../Filter';

const ListFilter = ({ items }) => (
  <div>
    <ul>
      { items.map((item, index) => <li key={index}><Filter {...item} /></li>) }
    </ul>
  </div>
);

export default ListFilter;