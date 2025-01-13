import PocketBase from 'pocketbase';
import type { ApiService } from "../services/api";

export default class AuthUsescases {
  private pb: PocketBase;

  constructor(private api: ApiService) {
    this.pb = this.api.pbInstance
  }

  async authWithEmailAndPassword(email: string, password: string) {
    return await this.pb.collection('users').authWithPassword(email, password);
  }

  isAuth() {
    return this.pb.authStore.isValid;
  }

  async logout() {
    return this.pb.authStore.clear();
  }
}