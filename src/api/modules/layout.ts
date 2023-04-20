import service, { lappService } from '../index';
import type { Login } from '../interface/index';

/**
 * @description 登录接口
 * @param data 用户名密码
 * @returns 返回登录结果
 */
export function loginApi(data: Login.ReqLoginForm) {
  return service.post<Login.ResLogin>('geeker/login', {
    username: data.username,
    password: 'e10adc3949ba59abbe56e057f20f883e'
  });
}

/**
 * @description 获取菜单
 * @returns 返回用户所拥有的所有菜单权限
 */
export function getMenuApi() {
  return service.get<Menu.MenuOptions[]>('menu/list');
}

export function getLappApi() {
  const formData = new FormData();
  formData.set('appKey', 'c78388859b2c40a1a87ba2ed7e916138');
  formData.set('appSecret', '1e41dc76e2adffab1d9e3ea56f11ad97');
  return lappService.post('/token/get', formData);
}
