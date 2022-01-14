class Api {
   constructor({ baseUrl, apiKey }) {
      this._baseUrl = baseUrl;
      this._apiKey = apiKey;
   }

   static getResponse(res) {
      return res.status === 200
         ? res.json()
         : Promise.reject(`Ошибка: ${res.status}`);
   }

   static transformPhotoData(item) {
      return {
         id: item.id,
         src: item.urls.regular,
         alt: item.alt_description,
         title: item.user.name,
         subtitle: item.description
      };
   }

   search(searchQeury) {
      return fetch(`${this._baseUrl}/search/photos?query=${searchQeury}`, {
         headers: {
            Authorization: `Client-ID ${this._apiKey}`
         }
      })
         .then(Api.getResponse)
         .then((({results}) => results.map(Api.transformPhotoData)));
   }

   getPhotoById(id) {
      return fetch(`${this._baseUrl}/photos/${id}`, {
         headers: {
            Authorization: `Client-ID ${this._apiKey}`
         }
      })
         .then(Api.getResponse)
         .then(Api.transformPhotoData);
   }
}

const config = {
   baseUrl: 'https://api.unsplash.com',
   apiKey: 'hK5dCygVHnqbhO0WSLkC038HLQbWtARPbGn3YK_S0Cs'
}

const api = new Api(config);

export default api;