import axios from '../plugins/axios'
export default {
    test(params: any) {
        return axios.post('/users/user', params);
    },
}