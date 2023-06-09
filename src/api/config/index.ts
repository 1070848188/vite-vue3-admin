import type { BaseType } from './type';

export const TIME_OUT = 2000;

// 区分开发环境和生产环境
const baseUrlData: BaseType = {
  development: '/api',
  production: 'https://mock.mengxuegu.com/mock/629d727e6163854a32e8307e'
};

// 获取当前与运行环境
const mode: string = import.meta.env.MODE;

export const BASE_URL: string = baseUrlData[mode || 'development'];
