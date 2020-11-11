import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators';
import { UserApi } from '@/api/UserApi';
import { AuthenticateResponse } from '@/models/User/AuthenticationResponse';
import router from '@/router';
import store from './index';
import { RegistrationRequest } from '@/models/User/RegistrationRequest';
import { displayAxiosError } from '@/utils/ErrorMethods';
import { FacebookAuthRequest } from '@/models/User/FacebookAuthRequest';

export interface IUserState {
  token: string;
  email: string;
}

@Module({ dynamic: true, store, name: 'userModule' })
class UserModule extends VuexModule {
  public token: string = localStorage.getItem('token') || '';
  public email: string = localStorage.getItem('email') || '';
  public username: string = localStorage.getItem('username') || '';
  public registerError = '';
  public loginError = '';
  public accountNotActivated = false;
  public registerSuccess = false;

  get isAuthenticate(): boolean {
    return !!this.token && !!this.email;
  }

  @Action
  public async login(userInfo: { email: string; password: string }) {
    try {
      const response = await UserApi.login(userInfo);
      this.loginSuccess(response);
      router.push('/');
    } catch (err) {
      console.log(err.response);
      if (err.response?.status == 412) {
        this.accountActivationError(true);
      }
      this.loginReset();
      this.loginFailed(displayAxiosError(err));
    }
  }

  @Action
  public async facebookLogin(facebookToken: FacebookAuthRequest) {
    try {
      const response = await UserApi.facebookLogin(facebookToken);
      this.loginSuccess(response);
      router.push('/');
    } catch (err) {
      this.loginReset();
    }
  }

  @Action
  public async register(userInfo: RegistrationRequest) {
    try {
      await UserApi.register(userInfo);
      this.setRegisterSuccess();
    } catch (err) {
      this.registerFailed(displayAxiosError(err));
    }
  }

  @Action
  public async changeUsername(username: string) {
    const newUsername = await UserApi.changeUsername(username);
    this.setUsername(newUsername);
  }

  @Action
  public async logout() {
    this.loginReset();
    router.push('/authentication');
  }

  @Action
  public async reset() {
    this.loginReset();
  }

  @Mutation
  private setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }

  @Mutation
  private loginSuccess(response: AuthenticateResponse) {
    this.token = response.token;
    this.email = response.email;
    this.username = response.username;
    this.registerError = '';
    this.loginError = '';

    localStorage.setItem('token', response.token);
    localStorage.setItem('username', response.username);
    localStorage.setItem('email', response.email);
  }

  @Mutation
  private accountActivationError(value: boolean) {
    this.accountNotActivated = value;
  }

  @Mutation
  private loginReset() {
    this.registerError = '';
    this.loginError = '';
    this.token = '';
    this.email = '';
    this.username = '';
    this.registerSuccess = false;

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  }

  @Mutation
  private loginFailed(err: string) {
    this.loginError = err;
    this.registerError = '';
  }

  @Mutation
  private registerFailed(err: string) {
    this.registerError = err;
    this.loginError = '';
    this.registerSuccess = false;
  }

  @Mutation
  private setRegisterSuccess() {
    this.registerError = '';
    this.loginError = '';
    this.registerSuccess = true;
  }
}

export const userModule = getModule(UserModule);
