import { FichierEntete } from './FichierEntete';
import { Tag } from './Tag';

export class DocumentGetDTO {
  id = '';
  userId = '';
  createDate: Date | string = '';
  files: FichierEntete[] = [];
  tags: Tag[] = [];
}

export class DocumentGet extends DocumentGetDTO {
  constructor(data?: DocumentGetDTO) {
    super();
    Object.assign(this, data || new DocumentGetDTO());
    if (data) {
      this.files = [];
      data.files.forEach((element) => {
        this.files.push(new FichierEntete(element));
      });
    }
  }
}
