import type { GetBaseParams } from "./Api";

export type GetBrassinsParams = GetBaseParams & {};

export type BrassinsResp = {
  items: Record<string, any>[],
  page: number,
  perPage: number,
  totalItems: number,
  totalPages: number
}

export type BrassinResp = Record<string, any>;

export class Brassin {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public notes: string,
    public type: string
  ) { }
}

export class BrassinFactory {

  static buildImageUrl(json: Record<string, any>): string {
    const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

    return imageBaseUrl + `${json.collectionId}/${json.id}/${json.image}`;
  }

  static createBrassin(json: Record<string, any>): Brassin {
    return new Brassin(
      json.id,
      json.name,
      json.image ? BrassinFactory.buildImageUrl(json) : "",
      json.notes,
      json.type
    );
  }

  static createBrassins(jsonArray: Record<string, any>[]): Brassin[] {
    return jsonArray.map(json => BrassinFactory.createBrassin(json));
  }
}