import React, { Component } from 'react';

class SpotifyAuth extends Component {
  authenticate = () => {
    const { wrapper, onAuthenticated } = this.props;

    wrapper.authorize()
      .then(onAuthenticated)
      .catch((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="spotify-auth">
        <button
          type="button"
          className="spotify-auth__button"
          tabIndex="0"
          onClick={this.authenticate}>
          Login Spotify
        </button>
      </div>
    );
  }
}

export default SpotifyAuth;