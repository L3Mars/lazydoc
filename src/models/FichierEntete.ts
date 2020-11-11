export class FichierEnteteDTO {
  id = '';
  name = '';
  type = '';
  createDate: Date | string = '';
}

export class FichierEntete extends FichierEnteteDTO {
  constructor(data?: FichierEnteteDTO) {
    super();
    Object.assign(this, data || new FichierEnteteDTO());
  }

  public loading = false;
}
