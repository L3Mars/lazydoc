import { FichierEntete } from './FichierEntete';
import { Tag } from './Tag';

export interface DocumentGet {
  id: number;
  userId: string;
  createDate: Date | string;
  files: FichierEntete[];
  tags: Tag[];
}
