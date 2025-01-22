import type { IRecipesRepository } from "./repositories/interfaces/IRecipesRepository";
import { ApiRecipesRepository } from "./repositories/RecipesRepository";
import { ApiService } from "./services/api";
import AuthUsescases from "./usecases/authUC";
import BeerTypesUsecases from "./usecases/beerTypesUC";
import BrassinsUsecases from "./usecases/brassinsUC";
import RecipesUsecases from "./usecases/recipesUC";
import { createRecipesStore } from "./stores/recipesStore";
import type { IBrassinsRepository } from "./repositories/interfaces/IBrassinsRepository ";
import { createBrassinsStore } from "./stores/brassinsStore";
import { ApiBrassinsRepository } from "./repositories/BrassinsRepository";

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
  
  #brassinsRepository: IBrassinsRepository;
  #brassinsUsecases: BrassinsUsecases;
  brassinStore: ReturnType<typeof createBrassinsStore>;


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
    
    this.#brassinsRepository = new ApiBrassinsRepository(this.api);
    this.#brassinsUsecases = new BrassinsUsecases(this.#brassinsRepository);
    this.brassinStore = createBrassinsStore(this.#brassinsUsecases);

    console.warn("Core is ready !");
  }
}