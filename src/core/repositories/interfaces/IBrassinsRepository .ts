import type { Brassin } from "../../entities/Brassin";
import type { BrassinsGetParams } from "../../models/Brassin";

export interface IBrassinsRepository {
  getBrassins(params?: BrassinsGetParams): Promise<Brassin[]>;
  getBrassinById(id: string, params?: any): Promise<Brassin>;
  // deleteBrassin(id: string): Promise<void>;
}