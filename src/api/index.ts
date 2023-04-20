import { BASE_URL, TIME_OUT } from './config/index';
import Request from './request/index';

export const service = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn: (config) => {
      return config;
    },
    resposeSuccessFn: (res) => {
      return res;
    }
  }
});

// 示例： 请求的接口和代理都不一样，正常业务可能存在调用系统外平台的接口
export const lappService = new Request({
  baseURL: '/lapp',
  timeout: TIME_OUT
});

export default service;
