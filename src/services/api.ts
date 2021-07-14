import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dlp-usuarios-api.herokuapp.com',
});
