import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators';
import { getToken, setToken, removeToken } from '@/utils/index';
import api from '@/api'
import store from '@/store'
import { BaseDataModule } from './base';

export interface IUserState {
    token: string,
    userInfo: Record<string | number | symbol, any>
}
@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements IUserState {
    public token = getToken() || "";
    public userInfo = {};
    @Mutation
    private SET_TOKEN(token: string) {
        this.token = token
    }
    @Mutation
    private SET_USERINFO(userinfo: {}) {
        this.userInfo = userinfo
    }
    @Action
    public async Login(params: { username: string; password: string }) {
        try {
            const { data } = await api.user_login(params)
            setToken(data.token)
            this.SET_TOKEN(data.token)
            this.getUserInfo()
            return true
        } catch (error) {
            console.log(error)
        }
    }
    @Action
    public resetToken() {
        this.SET_TOKEN('')
        removeToken()
    }
    @Action
    public async getUserInfo() {
        if (this.token === '') {
            throw Error('getUserInfo:token is undefined')
        }
        try {
            const { data } = await api.user_info()
            this.SET_USERINFO(data.userInfo)
            BaseDataModule.getBrandType()
            BaseDataModule.getMerchantType()
            return true
        } catch (error) {
            console.log(error)
        }
    }
    @Action
    public async logOut() {
        if (this.token === '') {
            throw Error('logOut:token is undefined')
        }
        try {
            await api.user_logout()
            this.resetToken()
            return true
        } catch (error) {
            console.log(error)
        }
    }
}
export const UserModule = getModule(User)