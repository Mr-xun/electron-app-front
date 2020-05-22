import Vue from 'vue';
import Vuex from 'vuex';
import { IUserState } from './modules/user';
import { IBaseDataState } from './modules/base';

Vue.use(Vuex);
export interface IRootState {
    user: IUserState,
    baseData: IBaseDataState
}
export default new Vuex.Store<IRootState>({});
