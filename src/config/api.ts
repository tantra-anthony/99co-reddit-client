import { AxiosRequestConfig } from 'axios';

const httpConfig: AxiosRequestConfig = {
  baseURL: 'https://your-backend-route.here/',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

export default httpConfig;
