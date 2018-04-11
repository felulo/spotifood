import React, { Component } from 'react';

class SpotifyAuth extends Component {
  authenticate = () => {
    const { wrapper, onAuthenticated } = this.props;

    wrapper.authorize()
      .then(onAuthenticated)
      .catch(() => {
        console.log('erro');
      });
  }

  render() {
    return (
      <div className="spotifyAuth">
        <button onClick={this.authenticate}>
          Login
        </button>
      </div>
    );
  }
}

export default SpotifyAuth;