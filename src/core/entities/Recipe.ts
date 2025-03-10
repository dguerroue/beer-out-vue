import { BeerType } from "./BeerType";

export class Recipe {
  constructor(
    public id: string | undefined,
    public name: string,
    public imageUrl: string | undefined,
    public description: string,
    public type: BeerType[]
  ) {}
}