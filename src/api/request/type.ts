import type {
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';

// interceptors属性可选的函数类型
export type interceptorsType = Partial<{
  requestSuccessFn: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestErrorFn: (error: AxiosError) => AxiosError;
  resposeSuccessFn: (res: AxiosResponse) => AxiosResponse;
  resposeErrorsFn: (error: AxiosError) => AxiosError;
}>;

// 针对AxiosRequestConfig进行扩展,新增单独的拦截器设置
export interface RequestConfig extends AxiosRequestConfig {
  interceptors?: interceptorsType;
}
