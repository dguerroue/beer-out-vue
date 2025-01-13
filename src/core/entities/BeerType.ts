export class BeerType {
  constructor(
    public id: string,
    public name: string
  ) { }

  static fromJsonToBeerType(json: Record<string, any>): BeerType {
    return new BeerType(
      json.id,
      json.name
    );
  }
}