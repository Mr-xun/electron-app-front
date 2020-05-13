import axios from 'axios';
const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV == 'product' ? 'http://49.233.16.84:8000' : 'http://192.168.13.241:3001',
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
});
export default instance;
