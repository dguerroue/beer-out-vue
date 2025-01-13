import { BeerType } from "./BeerType";

export class Recipe {
  constructor(
    public id: string | undefined,
    public name: string,
    public imageUrl: string | undefined,
    public notes: string,
    public type: BeerType[]
  ) { }

  static fromJsonToRecipe(json: Record<string, any>): Recipe {
    return new Recipe(
      json.id,
      json.name,
      json.image ? `${json.collectionId}/${json.id}/${json.image}` : "",
      json.notes,
      json.expand?.type ? json.expand.type.map((type: Record<string, any>) => BeerType.fromJsonToBeerType(type)) : []
    );
  }
}

// export class RecipeFactory {

//   static buildImageUrl(json: Record<string, any>): string {
//     const imageBaseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

//     return imageBaseUrl + `${json.collectionId}/${json.id}/${json.image}`;
//   }

//   static createRecipe(json: Record<string, any>): Recipe {
//     return new Recipe(
//       json.id,
//       json.name,
//       json.image ? RecipeFactory.buildImageUrl(json) : "",
//       json.notes,
//       json.type
//     );
//   }

//   static createRecipes(jsonArray: Record<string, any>[]): Recipe[] {
//     return jsonArray.map(json => RecipeFactory.createRecipe(json));
//   }

//   static createBeerTypes(jsonArray: Record<string, any>[]): BeerType[] {
//     return jsonArray.map(json => ({
//       id: json.id,
//       name: json.name
//     }));
//   }
// }