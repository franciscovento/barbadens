import axios from 'axios';

const bsaleApi = axios.create({
  baseURL: process.env.BSALE_API_URL,

  headers: {
    access_token: process.env.BSALE_TOKEN,
  },
});

export default bsaleApi;
