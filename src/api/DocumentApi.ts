import api from '@/api/BaseApi';
import { DocumentEntete, DocumentEnteteDTO } from '@/models/DocumentEntete';
import { DocumentGet, DocumentGetDTO } from '@/models/Document';

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
    const response = await api.LazyDocApi.post<DocumentEnteteDTO[]>('document/GetDocumentsEntetes', tags);
    return response.data.map((d) => new DocumentEntete(d));
  }

  static async get(documentId: string): Promise<DocumentGet> {
    const response = await api.LazyDocApi.get<DocumentGetDTO>(`document/${documentId}`);
    return new DocumentGet(response.data);
  }

  static async delete(documentId: string): Promise<boolean> {
    await api.LazyDocApi.get(`document/Delete/${documentId}`);
    return true;
  }
}
