import { ApiService } from "./services/api";
import { AuthService } from "./services/auth";
import AuthUsescases from "./usecases/authUC";
import BrassinsUsecases from "./usecases/brassinsUC";
import RecipesUsecases from "./usecases/recipesUC";
// import UsersUsecases from "./usecases/usersUC";

export type CoreEnv = {
  baseUrl: string
}

export class Core {
  #env: CoreEnv;
  api: ApiService;
  #authService: AuthService;

  authUC: AuthUsescases;
  // usersUC: UsersUsecases;
  brassinUC: BrassinsUsecases;
  recipesUC: RecipesUsecases;

  constructor(env: CoreEnv) {
    console.warn("Core initializing...");
    this.#env = env;

    if (this.#env.baseUrl === undefined) {
      throw new Error("baseUrl is required");
    }

    this.api = new ApiService(this.#env.baseUrl);
    this.#authService = new AuthService(this.#env.baseUrl, this.api);

    this.authUC = new AuthUsescases(this.#authService);
    // this.usersUC = new UsersUsecases(this.#api);
    this.brassinUC = new BrassinsUsecases(this.api);
    this.recipesUC = new RecipesUsecases(this.api);

    console.warn("Core is ready !");
  }
}