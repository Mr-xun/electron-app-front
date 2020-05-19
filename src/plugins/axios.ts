import axios from 'axios';
import { AxiosResponse, AxiosRequestConfig } from 'axios';
import router from '../router'
import { Message } from 'element-ui';
import { UserModule } from './../store/modules/user';
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
instance.interceptors.request.use((config: AxiosRequestConfig) => {
    let token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`;
    return config
}, (error: any) => {
    return Promise.reject(error)
})
instance.interceptors.response.use((response: AxiosResponse) => {
    const res = response.data;
    console.log(res, '')
    if (res.code != 0) {
        Message({
            message: res.msg || "Error",
            type: "error",
            duration: 2 * 1000
        });
        return Promise.reject(new Error(res.msg || "Error"));
    } else {
        return response
    }
}, (error: { response: { status: any; data: any; }; }) => {
    console.log(error)
    if (error.response) {
        switch (error.response.status) {
            case 401:
                UserModule.resetToken()
                router.replace({
                    path: '/login'
                })
        }
    }
    return Promise.reject(error.response && error.response.data)
})
export default instance