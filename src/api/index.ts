import axios from '../plugins/axios'
export default {
    test(params: any) {
        return axios.post('/user/login', params);
    },
    userLogin(params: any) {
        return axios.post('/user/login', params);
    },
    getUserList() {
        return axios.get('/user/list');
    }
}