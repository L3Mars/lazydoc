import Vue from 'vue';
import Vuex from 'vuex';
import { IAppState } from '@/store/AppModule';
import { IUserState } from '@/store/UserModule';

Vue.use(Vuex);

export interface IRootState {
  app: IAppState;
  user: IUserState;
}

export default new Vuex.Store<IRootState>({});
