import type { RecordAuthResponse, RecordModel } from "pocketbase";
import type { AuthService } from "../services/auth";
import type { Ref } from "vue";

export default class AuthUsescases {
  constructor(private authService: AuthService) {}

  authWithEmailAndPassword(email: string, password: string): Promise<RecordAuthResponse<RecordModel>> {
    return this.authService.authWithEmailAndPassword(email, password);
  }

  isAuth(): boolean {
    return this.authService.isAuth();
  }
}