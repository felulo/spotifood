import React from 'react';
import Playlist from '../Playlist';

const ListPlaylist = ({ items }) => (
  <div className="list-container">
    <ul className="list-group">
      { items.map((item, index) => <Playlist key={index} {...item} />) }
    </ul>
  </div>
);

export default ListPlaylist;