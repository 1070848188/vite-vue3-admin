import axios from 'axios';
import { GlobalStore } from '@/store/index';
import type { ResultData } from './../interface/index';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { RequestConfig, interceptorsType } from './type';

class Request {
  instance: AxiosInstance;

  // crequest实例 =》 axios实例
  constructor(config: RequestConfig) {
    this.instance = axios.create(config);
    // 全局公共拦截器
    this.initCommonInterceptors();
    // 实例化axios单独需要的拦截器
    if (config.interceptors) {
      this.initMeInterceptors(config.interceptors);
    }
  }
  // 添加公共的拦截器
  initCommonInterceptors() {
    // 添加公共的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        const store = GlobalStore();
        const token = store.token;
        if (token) {
          config.headers['x-access-token'] = token;
        }
        return config;
      },
      (err) => {
        return err;
      }
    );

    // 添加公共的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }

  // 实例化单独的拦截器
  initMeInterceptors(interceptors: interceptorsType) {
    const { requestSuccessFn, requestErrorFn, resposeSuccessFn, resposeErrorsFn } = interceptors;
    this.instance.interceptors.request.use(requestSuccessFn, requestErrorFn);
    this.instance.interceptors.response.use(resposeSuccessFn, resposeErrorsFn);
  }

  // 请求方法封装
  get<T = any>(url: string, params?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.instance.get(url, { params, ...config });
  }

  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return this.instance.post(url, data, config);
  }
}

export default Request;
