import { UserFactory, type GetUsersParams, type User, type UserResp, type UsersResp } from "../models/User";
import type { ApiService } from "../services/api";

export default class UsersUsecases {
  
  // Parameter Properties: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
  constructor(private api: ApiService) {}
  
  async getUsers(params?: GetUsersParams): Promise<User[]> {
    const usersResp = await this.api.get<UsersResp>("users", {
      ...params
    });

    return UserFactory.createUsers(usersResp.users);
  }

  async getUsersWithDelay(delay: number): Promise<User[]> {
    return this.getUsers({ delay });
  }

  async getUserById(id: number): Promise<User> {
    const userResp = await this.api.get<UserResp>(`users/${id}`);

    return UserFactory.createUser(userResp);
  }
}