export default class Api {
  constructor(options) {
    this._url = options.url;
    this._headers = options.headers;
  }
  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(this._url + "users/me", {
      headers: this._headers,
    }).then(this._getResponse);
  }

  getInitialCards() {
    return fetch(this._url + "cards", {
      headers: this._headers,
    })
      .then(this._getResponse);
  }
  updateProfile(name, profession) {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: profession,
      }),
    }).then(this._getResponse);
  }

  uploadCard({ name, link }) {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getResponse);
  }

  deleteCard(cardId) {
    return fetch(this._url + `cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getResponse);
  }

  updateAvatar(data) {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.link,
      }),
    }).then(this._getResponse);
  }

  // getLikes(cardId) {
  //   return fetch(`${this._url}cards/likes/${cardId}`, {
  //     headers: this._headers,
  //   }).then(this._getResponse);
  // }

  addLike(cardId) {
    return fetch(this._url + `cards/${cardId}/likes`, {
      headers: this._headers,
      method: "PUT",
    }).then(this._getResponse);
  }

  removeLike(cardId) {
    return fetch(this._url + `cards/${cardId}/likes`, {
      headers: this._headers,
      method: "DELETE",
    }).then(this._getResponse);
  }
  // other methods for working with the API
};

