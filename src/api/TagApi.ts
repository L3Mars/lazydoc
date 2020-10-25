import api from "@/api/BaseApi";

export default abstract class TagApi {
  static async getTags(): Promise<string[]> {
    const resp = await api.LazyDocApi.get("Tag/GetTags");
    return resp.data;
  }
}
