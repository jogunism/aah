// http.ts
import axios from 'axios';

// Axios default settings
const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
  },
  withCredentials: true
});

export default http;

// AxiosResponse는 named export
export type { AxiosResponse } from 'axios';
