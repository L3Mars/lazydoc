import api from '@/api/BaseApi';
import { FichierEntete, FichierEnteteDTO } from '@/models/FichierEntete';

export default abstract class FichierApi {
  static async get(fichierId: number): Promise<Blob> {
    const response = await api.LazyDocApi.get(`Fichier/${fichierId}`);
    return new Blob([response.data], { type: `application/${response.headers['content-type']}` });
  }

  static async delete(fichierId: string): Promise<boolean> {
    await api.LazyDocApi.delete(`Fichier/${fichierId}`);
    return true;
  }

  static async add(file: FormData, documentId: string): Promise<FichierEntete> {
    const response = await api.LazyDocApi.post<FichierEnteteDTO>(`Fichier/${documentId}`, file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return new FichierEntete(response.data);
  }
}
