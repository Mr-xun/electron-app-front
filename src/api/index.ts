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
    user_update(params: any) {
        //更新
        return axios.post('/user/update', params);
    },
    user_del(params: any) {
        //删除用户
        return axios.post('/user/del', params);
    },
    user_resetPwd(params: { userId?: string, account?: string, verify_one: string, verify_two: string, verify_three: string }) {
        //重置密码
        return axios.post('/user/resetpwd', params);
    },
    /*****************基础数据*******************************/
    base_brandTypeList() {
        //品牌基本类型
        return axios.get('/basedata/brand')
    },
    base_merchantTypeList() {
        //商户基本类型
        return axios.get('/basedata/merchant')
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
    /*****************商品*******************************/
    goods_list(params: { goods_name?: string, goods_brand?: string, goods_num?: string, goods_sign?: string, pageNum?: string, pageSize?: string }) {
        //列表
        return axios.post('/goods/list', params)
    },
    goods_create(params: any) {
        //新增
        return axios.post('/goods/add', params)
    },
    goods_update(params: any) {
        //更新
        return axios.post('/goods/update', params)
    },
    goods_del(params: any) {
        //删除
        return axios.post('/goods/del', params)
    },
    goods_detail(params: any) {
        //详情
        return axios.post('/goods/detail', params)
    },
    /*****************品牌*******************************/
    brand_list(params: { brand_name?: string, pageNum?: string, pageSize?: string }) {
        //列表
        return axios.post('/brand/list', params)
    },
    brand_create(params: any) {
        //新建
        return axios.post('/brand/add', params)
    }, brand_update(params: any) {
        //更新
        return axios.post('/brand/update', params)
    }, brand_del(params: any) {
        //删除
        return axios.post('/brand/del', params)
    },
    /*****************批发订单*******************************/
    wholesaleOrder_getNum() {
        //获取订单编号
        return axios.get('/wholesale/orderNum')
    },
    wholesaleOrder_createOrder(params: any) {
        //创建订单记录
        return axios.post('/wholesale/createOrder', params)
    },
    wholesaleOrder_getOrder(params: any) {
        //获取订单记录
        return axios.post('/wholesale/list', params)
    }
}