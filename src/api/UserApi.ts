import { RegistrationRequest } from '@/models/User/RegistrationRequest';
import { AuthenticateResponse } from '@/models/User/AuthenticationResponse';
import api from '@/api/BaseApi';
import { FacebookAuthRequest } from '@/models/User/FacebookAuthRequest';

export abstract class UserApi {
  static async login(userInfo: { email: string; password: string }): Promise<AuthenticateResponse> {
    const response = await api.LazyDocApi.post<AuthenticateResponse>(`/User/login`, userInfo);
    return response.data;
  }

  static async register(userInfo: RegistrationRequest): Promise<any> {
    const response = await api.LazyDocApi.post<AuthenticateResponse>(`/User/register`, userInfo);
    return response.data;
  }

  static async facebookLogin(facebookToken: FacebookAuthRequest): Promise<AuthenticateResponse> {
    const response = await api.LazyDocApi.post<AuthenticateResponse>(`/User/facebookLogin`, facebookToken);
    return response.data;
  }

  static async confirmAccount(accountID: string): Promise<AuthenticateResponse> {
    const response = await api.LazyDocApi.post<AuthenticateResponse>(`/User/ConfirmAccount/${accountID}`);
    return response.data;
  }

  static async requestValidation(email: string): Promise<boolean> {
    await api.LazyDocApi.post(`/User/RequestValidationMail/`, { email });
    return true;
  }

  static async changeUsername(username: string): Promise<string> {
    const response = await api.LazyDocApi.post(`/User/ChangeUsername`, { username });
    return response.data;
  }
}
