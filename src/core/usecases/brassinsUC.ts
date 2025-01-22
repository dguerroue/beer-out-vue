import { Brassin } from "../entities/Brassin";
import { type BrassinsResp, type BrassinsGetParams } from "../models/Brassin";
import type { IBrassinsRepository } from "../repositories/interfaces/IBrassinsRepository ";

export default class BrassinsUsecases {

  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private repo: IBrassinsRepository) { }

  async getBrassins(params?: BrassinsGetParams): Promise<Brassin[]> {
    return this.repo.getBrassins(params);
  }

  async getBrassinById(id: string, params?: any): Promise<Brassin> {
    return this.repo.getBrassinById(id, params);
  }
}