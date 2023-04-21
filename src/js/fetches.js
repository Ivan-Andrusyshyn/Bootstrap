import axios from 'axios';
export class NewApiService {
  #URL = 'https://pixabay.com/api/';
  #KEY = 'key=34935251-caa237a886f8fd2167ae0727c';
  page = 1;
  query = 'car';
  async makeFetch() {
    try {
      return await axios.get(`${this.#URL}?${this.#KEY}`, {
        params: {
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 30,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async makeImgFone() {
    try {
      return await axios.get(`${this.#URL}?${this.#KEY}`, {
        params: {
          q: this.query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: true,
          page: this.page,
          per_page: 30,
        },
      });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
export const api = new NewApiService();

// <===========================AXIOS=====================>
