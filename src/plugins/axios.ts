import axios from 'axios';
import router from '../router'
let devBaseUrl = 'http://192.168.13.241:3001'
let proBaseUrl = 'http://49.233.16.84:3001'
let homeBaseUrl = 'http://192.168.0.127:3001'
const instance = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV == 'product' ? proBaseUrl : devBaseUrl,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    },
});
instance.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`;
    return config
}, (error) => {
    return Promise.reject(error)
})
instance.interceptors.response.use((data) => {
    return data
}, (error) => {
    console.log(error)
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.replace({
                    path: '/login'
                })
        }
    }
    return Promise.reject(error.response && error.response.data)
})
export default instance;
