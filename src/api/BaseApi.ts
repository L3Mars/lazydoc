import axios, { AxiosInstance } from "axios";

export default class BaseApi {
  static get axiosBase() {
    return axios.create({
      //   headers: { Authorization: `Bearer ${UserModule.token}` },
    });
  }

  private static _lazyDocApi: AxiosInstance | null;
  static get LazyDocApi() {
    if (!this._lazyDocApi) {
      this._lazyDocApi = axios.create({
        baseURL: process.env.VUE_APP_API_URL
        // headers: { Authorization: `Bearer ${UserModule.token}` },
      });
    }
    return this._lazyDocApi;
  }
}
