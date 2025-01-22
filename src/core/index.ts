import type { IRecipesRepository } from "./repositories/IRecipesRepository";
import { ApiRecipesRepository } from "./repositories/RecipesRepository";
import { ApiService } from "./services/api";
import AuthUsescases from "./usecases/authUC";
import BeerTypesUsecases from "./usecases/beerTypesUC";
import BrassinsUsecases from "./usecases/brassinsUC";
import RecipesUsecases from "./usecases/recipesUC";
import { createRecipesStore } from "./stores/recipesStore";

export type CoreEnv = {
  baseUrl: string
}

export class Core {
  #env: CoreEnv;
  api: ApiService;

  authUC: AuthUsescases;
  beerTypesUC: BeerTypesUsecases;

  #recipesRepository: IRecipesRepository;
  #recipesUsecases: RecipesUsecases;
  recipesStore: ReturnType<typeof createRecipesStore>;
  
  brassinUC: BrassinsUsecases;


  constructor(env: CoreEnv) {
    console.warn("Core initializing...");
    this.#env = env;

    if (this.#env.baseUrl === undefined) {
      throw new Error("baseUrl is required");
    }

    this.api = new ApiService(this.#env.baseUrl);

    this.authUC = new AuthUsescases(this.api);
    this.beerTypesUC = new BeerTypesUsecases(this.api);
    
    this.#recipesRepository = new ApiRecipesRepository(this.api);
    this.#recipesUsecases = new RecipesUsecases(this.#recipesRepository);
    this.recipesStore = createRecipesStore(this.#recipesUsecases);
  
    this.brassinUC = new BrassinsUsecases(this.api);

    console.warn("Core is ready !");
  }
}