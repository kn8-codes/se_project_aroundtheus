export default class Api {
    constructor(options) {
        this._url = options.url;
        this._headers = options.headers;
    }
    _getResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      }

    getUserInfo() {
        return fetch(this._url + "/users/me", {
          headers: this._headers,
        }).then(this._getResponse);
      }

    getInitialCards() {
        return fetch( this._url + "cards", {
          headers: {
            authorization: "0d8f734d-caf1-45e3-b9d3-764b4099955a"
          }
        })
          .then(res => {
            if (res.ok) {  
              return res.json();
            }
            // if the server returns an error, reject the promise
            return Promise.reject(`Error: ${res.status}`);
          });
      }
      updateProfile(data) {
        return fetch(this._url + "/users/me", {
          method: "PATCH",
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            profession: data.profession,
          }),
        }).then(this._getResponse);
      }

      uploadCard({ name, link }) {
        return fetch(this._url + "/cards", {
          method: "POST",
          headers: this._headers,
          body: JSON.stringify({
            name,
            link,
          }),
        }).then(this._getResponse);
      }
    // other methods for working with the API
  };
  
  