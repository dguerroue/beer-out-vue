import { BeerType } from "./BeerType";

export class Brassin {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public notes: string,
    public type: BeerType[]
  ) { }

  static fromJsonToBrassin(json: Record<string, any>): Brassin {
    return new Brassin(
      json.id,
      json.name,
      json.image ? `${json.collectionId}/${json.id}/${json.image}` : "",
      json.notes,
      json.type ? json.type.map((type: Record<string, any>) => BeerType.fromJsonToBeerType(type)) : []
    );
  }
}