import { type ListRespBase } from "../models/Api";
import { BeerType } from "../entities/BeerType";
import type { ApiService } from "../services/api";

export default class BeerTypesUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private api: ApiService) { }

  async getBeerTypes(): Promise<BeerType[]> {
    const resp = await this.api.get<ListRespBase>("collections/beertype/records");

    return resp.items.map(json => BeerType.fromJsonToBeerType(json));
  }

  async createBeerType(beerName: string): Promise<BeerType> {
    const resp = await this.api.post<BeerType>("collections/beertype/records", {
      name: beerName,
    });

    return BeerType.fromJsonToBeerType(resp);
  }
}