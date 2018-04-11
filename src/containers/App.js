import React, { Component } from 'react';
import _ from 'lodash';

import SpotifyService from '../services/spotify.service';

import getFilterService from '../services/filter.service';

import SpotifyAuth from '../components/SpotifyAuth';
import ListPlaylist from '../components/ListPlaylist';
import Filter from '../components/Filter';

const DEBOUNCE_TIME = 500;

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAuthorized: false,
      filters: [],
      filtersValues: {},
      playlists: []
    }

    this.spotify = new SpotifyService();
  }

  componentDidMount() {
    getFilterService()
      .then(({ filters }) => this.setState({ filters }));
  }

  handleAuthenticated = _.debounce(() => {
    this.setState({
      isAuthorized: true
    })

    this.getFeaturedPlaylists();
  }, DEBOUNCE_TIME)

  handleChangedFilter = ({ target }) => {
    const id = target.id;
    const value = target.value;

    let filtersValues = Object.assign({}, this.state.filtersValues);
    filtersValues[id] = value;

    this.setState({ filtersValues });
    this.getFeaturedPlaylists();
  }

  getFeaturedPlaylists = () => {
    this.spotify
      .getListFeaturedPlaylist(this.state.filtersValues)
      .then(({ playlists }) => playlists.items)
      .then(playlists => this.setState({ playlists }));
  }

  render() {
    let elements;

    if (this.state.isAuthorized) {
      elements = (
        <div>
          <form className="form-filter">
            { 
              this.state.filters.map((item, index) => 
                <Filter key={index}
                  value={this.state[item.id]}
                  onChanged={this.handleChangedFilter}
                  {...item}/>
              )
            }
          </form>
          
          <ListPlaylist items={this.state.playlists}/>
        </div>
      );
    } else {
      elements = (
        <SpotifyAuth
          wrapper={this.spotify}
          onAuthenticated={this.handleAuthenticated}/>
      );
    }

    return (
      <div className="app">
        <h1 className="title-app">Spotifood</h1>
        {elements}
      </div>
    );
  }
}

export default App;