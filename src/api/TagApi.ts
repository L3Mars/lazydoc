import api from '@/api/BaseApi';
import { Tag } from '@/models/Tag';

export default abstract class TagApi {
  static async getTags(): Promise<string[]> {
    const resp = await api.LazyDocApi.get('Tag/GetTags');
    return resp.data;
  }

  static async delete(documentId: string, tagId: number): Promise<boolean> {
    await api.LazyDocApi.delete(`Tag/${documentId}/${tagId}`);
    return true;
  }

  static async add(documentId: string, tagLabel: string): Promise<Tag> {
    const response = await api.LazyDocApi.post(`Tag/${documentId}`, { tagLabel });
    return response.data;
  }
}
