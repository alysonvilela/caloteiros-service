import axios, { AxiosStatic } from "axios";
class HttpClient {
  public request: AxiosStatic = axios;
  private static instance: HttpClient;

  private constructor() {}
  static getInstance(): HttpClient {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient();
    }

    return HttpClient.instance;
  }
}

export const httpClient = HttpClient.getInstance()