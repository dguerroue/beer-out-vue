import { ApiService } from "./services/api";
import BrassinsUsecases from "./usecases/brassinsUC";
import UsersUsecases from "./usecases/usersUC";

export type CoreEnv = {
  baseUrl: string
}

export class Core {
  #env: CoreEnv;
  #api: ApiService;
  
  usersUC: UsersUsecases;
  brassinUC: BrassinsUsecases;

  constructor(env: CoreEnv) {
    console.warn("Core initializing...");
    this.#env = env;

    if(this.#env.baseUrl === undefined) {
      throw new Error("baseUrl is required");
    }

    this.#api = new ApiService(this.#env.baseUrl);

    this.usersUC = new UsersUsecases(this.#api);
    this.brassinUC = new BrassinsUsecases(this.#api);

    console.warn("Core is ready !");
  }
}