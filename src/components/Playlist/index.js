import React from 'react';
import PropTypes from 'prop-types';

const Playlist = ({ name }) => (
  <li>{ name }</li>
);

const { string } = PropTypes;

Playlist.propTypes = {
  name: string.isRequired
};

export default Playlist;