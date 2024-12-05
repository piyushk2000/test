import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        Authorization: localStorage.getItem('authToken')
      },
      timeout: 5000,
    });
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.axiosInstance.delete<T>(url, config);
    return response.data;
  }

  public setHeader(header: string, value: string) {
    this.axiosInstance.defaults.headers.common[header] = value;
  }

  public removeHeader(header: string) {
    delete this.axiosInstance.defaults.headers.common[header];
  }
}

export default ApiService;



// const baseURL = 'https://api.example.com'; // Replace with your API base URL
// const api = new ApiService(baseURL);

// // Example GET request
// const response = await api.get<{ data: any }>('/endpoint');
// console.log(response.data);

// // Example POST request
// const data = { key: 'value' };
// const postResponse = await api.post<{ success: boolean }>('/post-endpoint', data);
// console.log(postResponse.data);