import { BeerType } from "./BeerType";

export class Brassin {
  constructor(
    public id: string,
    public name: string,
    public imageUrl: string,
    public notes: string,
    public type: BeerType[]
  ) { }
}