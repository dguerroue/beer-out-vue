import type { RecordAuthResponse, RecordModel } from "pocketbase";
import type { ApiService } from "../services/api";

export default class AuthUsescases {
  constructor(private api: ApiService) {}

  authWithEmailAndPassword(email: string, password: string): Promise<RecordAuthResponse<RecordModel>> {
    return this.api.authWithEmailAndPassword(email, password);
  }
}