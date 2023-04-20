// 登录模块需要的类型
export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

export interface Result {
  code: number;
  msg: string;
}

export interface ResultData<T> extends Result {
  data: T;
}
