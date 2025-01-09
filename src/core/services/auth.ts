import PocketBase from 'pocketbase';
import type { ApiService } from './api';

// const pb = new PocketBase('http://127.0.0.1:8090');

export class AuthService {
  private baseUrl: string;
  private api: ApiService;
  private pb: PocketBase;

  constructor(baseUrl: string, api: ApiService) {
    this.baseUrl = baseUrl;
    this.api = api;
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