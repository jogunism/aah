// http.ts
import axios from 'axios';

// Axios 기본 설정
axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;

// AxiosResponse는 named export
export type { AxiosResponse } from 'axios';
