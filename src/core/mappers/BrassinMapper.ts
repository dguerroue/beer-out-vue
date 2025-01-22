import { BeerType } from "../entities/BeerType";
import { Brassin } from "../entities/Brassin";

export class BrassinMapper {
  static fromJsonToBrassin(json: Record<string, any>): Brassin {
    return new Brassin(
      json.id,
      json.name,
      json.image ? `${json.collectionId}/${json.id}/${json.image}` : "",
      json.notes,
      json.type ? json.type.map((type: Record<string, any>) => BeerType.fromJsonToBeerType(type)) : []
    );
  }

  static fromJsonArrayToBrassins(items: Record<string, any>[]): Brassin[] {
    return items.map((item: Record<string, any>) => BrassinMapper.fromJsonToBrassin(item));
  }
}