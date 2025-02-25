import PocketBase from 'pocketbase';
import { ErrorWrapper } from './errors';

// const pb = new PocketBase('http://127.0.0.1:8090');

export class ApiService {
  private baseUrl: string;
  private defaultHeaders: Record<string, string>;
  private pb: PocketBase;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl + 'api/';
    this.defaultHeaders = {
      "Content-Type": "application/json",
    };
    this.pb = new PocketBase(baseUrl);
  }

  get pbInstance() {
    return this.pb;
  }

  // Méthode pour mettre à jour ou ajouter des headers dynamiques (e.g., Authorization, lang...)
  setHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  removeHeader(key: string): void {
    delete this.defaultHeaders[key];
  }

  // Méthode principale pour gérer les requêtes
  private async request<T>(url: string, options: Record<string, any>): Promise<T> {
    // If is auth, add token
    if (this.pb.authStore.isValid) {
      this.setHeader('Authorization', this.pb.authStore.token);
    }

    const config = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const responseJson = await response.json();

        throw new ErrorWrapper(
          response,
          response.status,
          response.statusText,
          responseJson
        );
      }

      if (response.status === 204) {
        return {} as T;
      }

      return (await response.json()) as T;
    } catch (error: any) {
      throw error;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = new URL(this.baseUrl + endpoint);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    return this.request<T>(url.toString(), {
      method: "GET"
    });

    // return await this.pb.collection(endpoint).getList(params?.page, params?.perPage, params?.options) as T;
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    // check if body is FormData
    if (body instanceof FormData) {
      console.warn('FormData detected');
      this.removeHeader('Content-Type');

      return this.request<T>(this.baseUrl + endpoint, {
        method: "POST",
        body: body,
      });
    } else {
      this.setHeader('Content-Type', 'application/json');

      return this.request<T>(this.baseUrl + endpoint, {
        method: "POST",
        body: JSON.stringify(body),
      });
    }
  }

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(this.baseUrl + endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: unknown): Promise<T> {
    return this.request<T>(this.baseUrl + endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(this.baseUrl + endpoint, { method: "DELETE" });
  }
}