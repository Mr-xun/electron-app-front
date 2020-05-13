import axios from 'axios';
let devBaseUrl = 'http://192.168.13.241:8000'
let proBaseUrl = 'http://49.233.16.84:3001'

const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV == 'product' ? proBaseUrl : proBaseUrl,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
});
export default instance;
