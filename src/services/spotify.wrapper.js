const SPOTIFY_BASE_URI_AUTHORIZE = 'https://accounts.spotify.com/authorize';
const SPOTIFY_BASE_URI_API = 'https://api.spotify.com/v1';
const SPOTIFY_CLIENT_ID = '35bc4bdcd8ad4e2ea82ee9846fccdc6f';
const SPOTIFY_RESPONSE_TYPE = 'token';
const SPOTIFY_REDIRECT_URI = 'http://localhost:3000/callback';

const WIDTH_POPUP = 700;
const HEIGHT_POPUP = 550;

const OAUTH_INTERVAL = 500;

class SpotifyWrapper {
  constructor() {
    this.isClientAuthorized = false;
    this.expireTime = 0;
  }

  getParamsAuth(url) {
    let params = url.split('&');

    if (params) {
      return params.reduce((prev, next) => {
        let newObj = {...prev};

        newObj[next.split('=')[0]] = next.split('=')[1];

        return newObj;
      }, {})
    }

    return;
  }

  authorize() {
    return new Promise((resolve, reject) => {
      let spotifyAuthorizeURI = `${SPOTIFY_BASE_URI_AUTHORIZE}?client_id=${SPOTIFY_CLIENT_ID}&response_type=${SPOTIFY_RESPONSE_TYPE}&redirect_uri=${SPOTIFY_REDIRECT_URI}`;
      let windowName = 'Spotify Authorize';
      let leftPopup = (window.screen.width / 2) - (WIDTH_POPUP / 2);
      let topPopup = (window.screen.height / 2) - (HEIGHT_POPUP / 2);

      let windowOptions = `
        toolbar=no,
        location=no,
        directories=no,
        status=no,
        menubar=no,
        scrollbars=no,
        resizable=no,
        copyhistory=no,
        width=${WIDTH_POPUP},
        height=${HEIGHT_POPUP},
        top=${topPopup},
        left=${leftPopup}
      `;

      if (!this.isAuthorized()) {
        this.oAuthPopup = window.open(spotifyAuthorizeURI, windowName, windowOptions);

        this.oAuthInterval = window.setInterval(() => {
          try {
            if (this.oAuthPopup.closed) {
              window.clearInterval(this.oAuthInterval);

              reject();
            }

            if (this.oAuthPopup.location.href.indexOf(SPOTIFY_REDIRECT_URI) > -1) {
              window.clearInterval(this.oAuthInterval);

              let result = this.getParamsAuth(this.oAuthPopup.location.hash.substr(1));
              
              this.oAuthPopup.close();

              if (result['access_token']) {
                this.oAuth = result;
                this.isClientAuthorized = true;

                resolve();
              } else {
                reject();
              }
            }
          } catch (exception) {}
        }, OAUTH_INTERVAL);
      } else {
        this.oAuth ? resolve() : reject();
      }
    });
  }

  isAuthorized() {
    return this.isClientAuthorized && (Date.now() < this.oauth.expires_in);
  }

  getListFeaturedPlaylist(filters) {
    let url = `${SPOTIFY_BASE_URI_API}/browse/featured-playlists`;

    return window.fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.oAuth.access_token}`
      }
    }).then((res) => {
      return res.json();
    });
  }
}

export default SpotifyWrapper;