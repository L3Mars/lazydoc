export class DocumentEnteteDTO {
  documentId = '';
  tags: string[] = [];
  createDate: Date | string = '';
  filesTypes: string[] = [];
  filesCount = 0;
}

export class DocumentEntete extends DocumentEnteteDTO {
  mainType = '';
  displayActionButton = false;

  constructor(data?: DocumentEnteteDTO) {
    super();
    Object.assign(this, data || new DocumentEnteteDTO());
    this.mainType = this.getMainType();
  }

  private getMainType(): string {
    const count = this.filesTypes.filter((t) => t != this.filesTypes[0]).length;
    console.log(count);
    if (count > 0) {
      return 'multiple';
    } else {
      const type = this.filesTypes[0]?.toLocaleLowerCase();
      switch (type) {
        case '.pdf':
          return 'pdf';
        case '.png':
        case '.jpg':
        case '.bnp':
        case '.jpeg':
          return 'img';
        case '.doc':
        case '.docx':
          return 'word';
        case '.xls':
        case '.xlsx':
        case '.csv':
          return 'excel';
        case '.txt':
          return 'txt';
        default:
          return '';
      }
    }
  }
}
