import api from '@/api/BaseApi';
import { DocumentEntete } from '@/models/DocumentEntete';
import { DocumentGet } from '@/models/Document';

export default abstract class DocumentApi {
  static async createDocument(document: FormData): Promise<number> {
    const response = await api.LazyDocApi.post<number>('document', document, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data;
  }

  static async tagDocument(idDocument: number, tags: string[]): Promise<boolean> {
    await api.LazyDocApi.post('document/AddTags', {
      DocumentId: idDocument,
      Tags: tags
    });
    return true;
  }

  static async searchDocument(tags: string[]): Promise<DocumentEntete[]> {
    const response = await api.LazyDocApi.post<DocumentEntete[]>('document/GetDocumentsEntetes', tags);
    return response.data;
  }

  static async get(documentId: number): Promise<DocumentGet> {
    const response = await api.LazyDocApi.get<DocumentGet>(`document/${documentId}`);
    return response.data;
  }
}
