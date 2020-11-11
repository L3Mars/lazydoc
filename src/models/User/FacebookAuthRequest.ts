export class FacebookAuthRequestDTO {
  accessToken = '';
}

export class FacebookAuthRequest extends FacebookAuthRequestDTO {
  constructor(data?: FacebookAuthRequestDTO) {
    super();
    Object.assign(this, data || new FacebookAuthRequestDTO());
  }
}
