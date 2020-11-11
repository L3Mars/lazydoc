export class AuthenticateRequestDTO {
  email = '';
  password = '';
}

export class AuthenticateRequest extends AuthenticateRequestDTO {
  constructor(data?: AuthenticateRequestDTO) {
    super();
    Object.assign(this, data || new AuthenticateRequestDTO());
  }
}
