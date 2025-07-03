// http.ts
import axios from 'axios';

// Axios 기본 설정
axios.defaults.baseURL = 'http://192.168.1.44:8080';

export default axios;

// AxiosResponse는 named export
export type { AxiosResponse } from 'axios';
