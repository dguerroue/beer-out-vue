import { BrassinFactory, type Brassin, type BrassinsResp, type GetBrassinsParams } from "../models/Brassin";
import type { ApiService } from "../services/api";

export default class BrassinsUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private api: ApiService) { }

  async getBrassins(params?: GetBrassinsParams): Promise<Brassin[]> {
    const resp = await this.api.get<BrassinsResp>("collections/brassins/records", {
      ...params
    });

    return BrassinFactory.createBrassins(resp.items);
  }

  async getBrassin(id: string, params?: any): Promise<Brassin> {
    type BrassinResp = any; /// TODO: Define BrassinResp type

    const resp = await this.api.get<BrassinResp>(`collections/brassins/records/${id}`, {
      ...params
    });

    return BrassinFactory.createBrassin(resp);
  }
}