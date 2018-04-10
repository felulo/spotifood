import React from 'react';
import Playlist from '../Playlist';

const ListPlaylist = ({ items }) => (
  <div>
    <ul>
      { items.map((item, index) => <Playlist key={index} {...item} />) }
    </ul>
  </div>
);

export default ListPlaylist;