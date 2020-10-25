import api from '@/api/BaseApi';

export default abstract class FichierApi {
  static async get(fichierId: number): Promise<Blob> {
    const response = await api.LazyDocApi.get(`Fichier/${fichierId}`);
    return new Blob([response.data], { type: `application/${response.headers['content-type']}` });
  }
}
