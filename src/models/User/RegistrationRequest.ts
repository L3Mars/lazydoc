export class RegistrationRequestDTO {
  username = '';
  email = '';
  password = '';
}

export class RegistrationRequest extends RegistrationRequestDTO {
  constructor(data?: RegistrationRequestDTO) {
    super();
    Object.assign(this, data || new RegistrationRequestDTO());
  }
}
