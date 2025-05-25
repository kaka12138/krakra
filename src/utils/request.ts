import axios, { type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'vue-sonner'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 使用配置的基础URL
  withCredentials: true,
  timeout: import.meta.env.VITE_API_TIMEOUT, // 使用配置的超时时间
});

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if(config.url.includes('/storage/file')) {
      config.baseURL = import.meta.env.VITE_API_UPLOAD_BASE_URL
    } else if(config.url.startsWith('/user') || config.url.startsWith('/auth')) {
      config.baseURL = import.meta.env.VITE_API_USER_BASE_URL
    }

    // 在请求发送前可以进行一些处理，比如添加token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    console.error('请求错误: ', error);
    return Promise.reject(error);
  },
);

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log('response', response)
    const { data, config } = response;

    // 处理文件
    if(config.url.includes('/storage/file')) {
      return data
    }

    // 根据实际接口返回结构调整
    // 假设接口返回的数据结构为 { code: number, data: any, message: string }
    if (data.code === 200 || data.code === 0) {
      return data.data;
    } else {
      // 处理业务错误
      // console.error('业务错误:', data.message);
      toast.error(data.message)
      return Promise.reject(new Error(data.message || '未知错误'));
    }
  },
  (error) => {
    // HTTP错误处理
    let message = '网络错误';
    if (error.response) {
      // 服务器响应了，但状态码不是2xx
      const status = error.response.status;
      switch (status) {
      case 401:
        message = '未授权，请登录';
        // 可以在这里做登出、跳转到登录页等操作
        break;
      case 403:
        message = '拒绝访问';
        break;
      case 404:
        message = '请求的资源不存在';
        break;
      case 500:
        message = '服务器内部错误';
        break;
      default:
        message = `请求错误: ${status}`;
      }
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      message = '服务器无响应';
    }
    console.error(message, error);
    toast.error(message)
    return Promise.reject(error);
  },
);

// 封装GET请求
export function get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<T> {
  return service.get(url, { params, ...config });
}

// 封装POST请求
export function post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
  return service.post(url, data, config);
}

// 封装PUT请求
export function put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
  return service.put(url, data, config);
}

// 封装DELETE请求
export function del<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return service.delete(url, config);
}

// 导出axios实例
export default service;
