import React, { Component } from 'react';

import SpotifyService from '../services/spotify.service';

import getFilterService from '../services/filter.service';

import SpotifyAuth from '../components/SpotifyAuth';
import ListPlaylist from '../components/ListPlaylist';
import ListFilter from '../components/ListFilter';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      filters: [],
      playlists: []
    }

    this.spotify = new SpotifyService();
  }

  componentDidMount() {
    getFilterService()
      .then(({ filters }) => this.setState({ filters }));
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
        <ListFilter items={this.state.filters}/>
        <ListPlaylist items={this.state.playlists}/>
      </div>
    );
  }
}

export default App;