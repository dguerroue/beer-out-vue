import { ApiService } from "./services/api";
import AuthUsescases from "./usecases/authUC";
import BeerTypesUsecases from "./usecases/beerTypesUC";
import BrassinsUsecases from "./usecases/brassinsUC";
import RecipesUsecases from "./usecases/recipesUC";
// import UsersUsecases from "./usecases/usersUC";

export type CoreEnv = {
  baseUrl: string
}

export class Core {
  #env: CoreEnv;
  api: ApiService;

  authUC: AuthUsescases;
  // usersUC: UsersUsecases;
  beerTypesUC: BeerTypesUsecases;
  brassinUC: BrassinsUsecases;
  recipesUC: RecipesUsecases;

  constructor(env: CoreEnv) {
    console.warn("Core initializing...");
    this.#env = env;

    if (this.#env.baseUrl === undefined) {
      throw new Error("baseUrl is required");
    }

    this.api = new ApiService(this.#env.baseUrl);

    this.authUC = new AuthUsescases(this.api);
    // this.usersUC = new UsersUsecases(this.#api);
    this.beerTypesUC = new BeerTypesUsecases(this.api);
    this.brassinUC = new BrassinsUsecases(this.api);
    this.recipesUC = new RecipesUsecases(this.api);

    console.warn("Core is ready !");
  }
}