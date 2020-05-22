import { VuexModule, Module, Mutation, Action, getModule } from 'vuex-module-decorators';
import api from '@/api'
import store from '@/store';
import { setCookie, getCookie } from "@/utils";

export interface IBaseDataState {
    brandTypes: Array<any>,
    merchantTypes: Array<any>,

}
@Module({ dynamic: true, store, name: 'baseData' })
class BaseData extends VuexModule implements IBaseDataState {
    public brandTypes = getCookie('brandType') ? JSON.parse(getCookie('brandType')) : []
    public merchantTypes = getCookie('merchantType') ? JSON.parse(getCookie('merchantType')) : []
    @Mutation
    private SET_BRAND(brandData: Array<any>) {
        this.brandTypes = brandData
    }
    @Mutation
    private SET_MERCHANT(merchantData: Array<any>) {
        this.merchantTypes = merchantData
    }
    @Action
    public async getBrandType() {
        try {
            const { data } = await api.base_brandTypeList()
            this.SET_BRAND(data.list)
            setCookie('brandType', JSON.stringify(data.list), 1000)
        } catch (error) {
            console.log(error)
        }
    }
    @Action
    public async getMerchantType() {
        try {
            const { data } = await api.base_merchantTypeList()
            setCookie('merchantType', JSON.stringify(data.list), 1000)
            this.SET_MERCHANT(data.list)
        } catch (error) {
            console.log(error)
        }
    }
}

export const BaseDataModule = getModule(BaseData)