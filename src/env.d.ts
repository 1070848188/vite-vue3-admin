// ? vite/client中把ts中的各个类型进行了模块声明，所以可以直接在ts中引用.vue,.css等文件
/// <reference types="vite/client" />

// - 声明.vue导入的对象类型

declare module '*.vue' {
  import { defineComponent } from 'vue';
  const component: defineComponent;
  export default component;
}

type Menus = string;
