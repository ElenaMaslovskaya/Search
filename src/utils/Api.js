class Api {
   constructor({baseUrl, apiKey}) {
      this._baseUrl = baseUrl;
      this._apiKey = apiKey;
   }

   search(searchQeury) {
      return fetch(`${this._baseUrl}/search/photos?query=${searchQeury}`, {
         headers: {
            Authorization: `Client-ID ${this._apiKey}`
         }
      }).then(responce => responce.ok ? responce.json() : Promise.reject(responce.status))
   }
}

const config = {
   baseUrl: 'https://api.unsplash.com',
   apiKey: 'hK5dCygVHnqbhO0WSLkC038HLQbWtARPbGn3YK_S0Cs'
}

const api = new Api(config);

export default api;