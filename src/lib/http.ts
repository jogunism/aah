// http.ts
import axios from 'axios';

// Axios 기본 설정
axios.defaults.baseURL = 'http://localhost:8080';

export default axios;

// AxiosResponse는 named export
export type { AxiosResponse } from 'axios';
