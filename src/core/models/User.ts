import type { GetBaseParams } from "./Api";

export type GetUsersParams = GetBaseParams & {};

export type UsersResp = {
  users: Record<string, any>[],
  total: number,
  skip: number,
  limit: number
}

export type UserResp = Record<string, any>;

export class User {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public email: string,
    public image: string,
  ) {}

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}

export class UserFactory {
  
  static createUser(json: Record<string, any>): User {
    return new User(
      json.id,
      json.firstName,
      json.lastName,
      json.email,
      json.image,
    );
  }

  static createUsers(jsonArray: Record<string, any>[]): User[] {
    return jsonArray.map(json => UserFactory.createUser(json));
  }
}