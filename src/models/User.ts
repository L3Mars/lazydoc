export class UserDTO {
  public string = '';
  public email = '';
}

export class User extends UserDTO {
  constructor(data?: UserDTO) {
    super();
    Object.assign(this, data || new UserDTO());
  }
}
