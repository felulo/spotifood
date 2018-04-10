import React, { Component } from 'react';

import PlaylistsMock from '../services/playlists.mock';
import SpotifyWrapper from '../services/spotify.wrapper';

import ListPlaylist from '../components/ListPlaylist';
import SpotifyAuth from '../components/SpotifyAuth';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      playlists: []
    }

    this.spotify = new SpotifyWrapper();
  }

  handleAuthenticated = () => {
    this.spotify
      .getListFeaturedPlaylist()
      .then(({ playlists }) => playlists.items)
      .then(playlists => this.setState({ playlists }));
  }

  render() {
    return (
      <div className="app">
        <SpotifyAuth
          wrapper={this.spotify}
          onAuthenticated={this.handleAuthenticated}/>
        <ListPlaylist items={this.state.playlists}/>
      </div>
    );
  }
}

export default App;