import { Brassin } from "../entities/Brassin";
import { BrassinMapper } from "../mappers/BrassinMapper";
import type { BrassinsGetParams, BrassinsResp } from "../models/Brassin";
import type { ApiService } from "../services/api";
import type { IBrassinsRepository } from "./interfaces/IBrassinsRepository ";

export class ApiBrassinsRepository implements IBrassinsRepository {
  constructor(private api: ApiService) {}

  async getBrassins(params?: BrassinsGetParams): Promise<Brassin[]> {
      const defaultParams: BrassinsGetParams = {
        sort: "-created"
      }
  
      const resp = await this.api.get<BrassinsResp>("collections/brassins/records", {
        ...defaultParams,
        ...params
      });
  
      return BrassinMapper.fromJsonArrayToBrassins(resp.items);
    }
  
    async getBrassinById(id: string, params?: any): Promise<Brassin> {
      type BrassinResp = any; /// TODO: Define BrassinResp type
  
      const resp = await this.api.get<BrassinResp>(`collections/brassins/records/${id}`, {
        ...params
      });
  
      return BrassinMapper.fromJsonToBrassin(resp);
    }
}
