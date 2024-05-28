import axios from 'axios';
import getConfig from 'next/config';

const BASEURL = getConfig().publicRuntimeConfig.API_URL;

const bsaleApi = axios.create({
  baseURL: BASEURL,
  headers: {
    access_token: process.env.BSALE_TOKEN,
  },
});

export default bsaleApi;
