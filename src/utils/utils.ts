/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 * @return array
 */
export function getFlatMenus(menuList: Menu.MenuOptions[]) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre: Menu.MenuOptions[], cur: Menu.MenuOptions) => {
    let flatArr = [...pre, cur];
    if (cur.children) flatArr = [...flatArr, ...getFlatMenus(cur.children)];
    return flatArr;
  }, []);
}

/**
 * @description 面包屑导航关系映射
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 最终形成的面包屑导航
 * @param {Menu.MenuOptions} parent 父级菜单
 * @return result
 */
export function getAllBreadcrumbList(
  menuList: Menu.MenuOptions[],
  result: { [key: string]: Menu.BreadCrumOptions[] } = {},
  parent: Menu.BreadCrumOptions[] = []
) {
  const newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
  newMenuList.forEach((item) => {
    result[item.path] = [...parent, { ...item.meta, to: item.path }];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  });
  return result;
}

/**
 * @description 获取assets目录下文件的地址
 * @param {String} fileUrl 文件目录
 * @returns {String} 返回实际的路径地址
 */
export function getAssetsFile(fileUrl: string): string {
  return new URL(`../assets/images/${fileUrl}`, import.meta.url).href;
}

/**
 * @description 获取当前时间对应的提示语
 * @return string
 */
export function getTimeState() {
  // 获取当前时间
  const timeNow = new Date();
  // 获取当前小时
  const hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 10) return `早上好 ⛅`;
  if (hours >= 10 && hours <= 14) return `中午好 🌞`;
  if (hours >= 14 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}
