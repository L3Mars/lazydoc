import axios from 'axios';
import { userModule } from '@/store/UserModule';

export default class BaseApi {
  static get axiosBase() {
    if (userModule.isAuthenticate) {
      return axios.create({
        headers: { Authorization: `Bearer ${userModule.token}` }
      });
    } else {
      return axios.create();
    }
  }

  //private static _lazyDocApi: AxiosInstance | null;
  static get LazyDocApi() {
    //if (!this._lazyDocApi) {
    if (userModule.isAuthenticate) {
      return axios.create({
        baseURL: process.env.VUE_APP_API_URL,
        headers: { Authorization: `Bearer ${userModule.token}` }
      });
    } else {
      return axios.create({
        baseURL: process.env.VUE_APP_API_URL
      });
    }
    //}
    //return this._lazyDocApi;
  }
}
