import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

// Extend the Axios request config to include metadata
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  metadata?: { startTime: number };
}

class OptimizedHttpClient {
  private static instance: AxiosInstance;

  static getInstance(): AxiosInstance {
    if (!OptimizedHttpClient.instance) {
      OptimizedHttpClient.instance = axios.create({
        timeout: 30000,
        maxRedirects: 3,
        // Keep-alive for connection reuse
        headers: {
          'Connection': 'keep-alive',
          'Keep-Alive': 'timeout=5, max=1000',
          'Accept-Encoding': 'gzip, deflate'
        },
        // Automatic compression
        decompress: true,
        // Response transformation for consistent JSON parsing
        transformResponse: [(data) => {
          if (typeof data === 'string') {
            try {
              return JSON.parse(data);
            } catch {
              return data;
            }
          }
          return data;
        }],
        // Validate status codes
        validateStatus: (status) => status >= 200 && status < 300,
        // Maximum content length for safety
        maxContentLength: 50 * 1024 * 1024, // 50MB
        maxBodyLength: 50 * 1024 * 1024, // 50MB
      });

      // Request interceptor for performance monitoring
      OptimizedHttpClient.instance.interceptors.request.use(
        (config: ExtendedAxiosRequestConfig) => {
          config.metadata = { startTime: Date.now() };
          return config;
        },
        error => {
          console.error('HTTP Request Error:', error);
          return Promise.reject(error);
        }
      );

      // Response interceptor for monitoring and error handling
      OptimizedHttpClient.instance.interceptors.response.use(
        response => {
          const config = response.config as ExtendedAxiosRequestConfig;
          const duration = Date.now() - (config.metadata?.startTime || Date.now());
          console.log(`HTTP ${config.method?.toUpperCase()} ${config.url} - ${response.status} - ${duration}ms`);
          return response;
        },
        error => {
          const config = error.config as ExtendedAxiosRequestConfig;
          const duration = Date.now() - (config?.metadata?.startTime || Date.now());
          console.error(`HTTP ${config?.method?.toUpperCase()} ${config?.url} - ${error.response?.status || 'ERROR'} - ${duration}ms`);
          return Promise.reject(error);
        }
      );
    }

    return OptimizedHttpClient.instance;
  }

  // Cleanup method for graceful shutdown
  static cleanup(): void {
    if (OptimizedHttpClient.instance) {
      // Cancel any pending requests
      OptimizedHttpClient.instance = null as any;
    }
  }
}

export const httpClient = OptimizedHttpClient.getInstance();
export default OptimizedHttpClient;