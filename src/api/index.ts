import axios from '../plugins/axios'
export default {
    /*****************用户*******************************/
    user_login(params: { username: string, password: string }) {
        //登录
        return axios.post('/user/login', params);
    },
    user_logout() {
        //退出登录
        return axios.get('/user/logout');
    },
    user_info() {
        //信息
        return axios.get('/user/currentUser')
    },
    user_list(params: { username?: string, pageNum?: number, pageSize?: number }) {
        //列表
        return axios.post('/user/list', params);
    },
    user_register(params: { username: string, password: string }) {
        //注册
        return axios.post('/user/register', params);
    },
    user_resetPwd(params: { userId?: string, account?: string, verify_one: string, verify_two: string, verify_three: string }) {
        //重置密码
        return axios.post('/user/resetpwd', params);
    },
    /*****************商户*******************************/
    merchant_list(params: { name?: string, contact?: string, pageNum?: string, pageSize?: string }) {
        //列表
        return axios.post('/merchant/list', params)
    },
    merchant_create(params: {
        name?: string,
        concact?: string,
        phone?: string,
        area?: string,
        adress?: string,
        note?: string,
        iconurl?: string,
    }) {
        //新增
        return axios.post('/merchant/add', params)
    },
    merchant_update(params: {
        id: string,
        name?: string,
        concact?: string,
        phone?: string,
        area?: string,
        adress?: string,
        note?: string,
        iconurl?: string,
    }) {
        //更新
        return axios.post('/merchant/update', params)
    },
    merchant_del(params: { id: string }) {
        //删除
        return axios.post('/merchant/del', params)
    },
}