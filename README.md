# 参考网站

https://demo.gin-vue-admin.com/#/layout/dashboard

https://admin.spicyboy.cn/#/proTable/useSelectFilter

# 项目目录

```
|—— public
|—— src
  |—— api     // 接口请求封装
    |—— interface // 接口请求相关类型定义
    |—— modules   // 实际接口请求路径
    |—— request   // axios封装
    |—— index     // 实际axios实例对象
  |—— assets      // 图片，icon等静态文件存放
    |—— css       // 全局css
    |—— image     // 全局图片
    |—— iconfont  // iconfont
  |—— components  // 全局组件封装
  |—— config      // 全局配置文件
  |—— directives  // 自定义指令
  |—— router      // 路由管理
    |—— permission   // 全局路由拦截
    |—— staticRouter // 静态路由配置
  |—— store       // 全局公共状态管理
    |—— interface  // store中的类型定义
    |—— modules    // 根据业务区分的模块
  |—— utils       // 全局方法封装
  |—— views       // 业务组件，项目页面
  |—— main.ts     // 项目主入口
|—— .editorconfig.org // 主要用于不同编辑器的设置统一
|—— .eslintrc.cjs     // 编辑代码时的错误提示
|—— .gitignore        // git忽略跟踪文件
|—— .prettierignore   // prettier忽略格式化文件
|—— .prettierrc.json  // prettier格式化配置
|—— .env.d.ts         // 全局ts类型声明
|—— tsconfig.json     // ts文件解析配置
|—— vite.config.ts    // vite打包配置
|——
```

# 代码规范

## eslint

在编辑代码时，将不符合规范的代码标记出来

1. 项目中安装 eslint
2. 安装 eslint 插件
3. 新建 eslintrc.cjs 文件，配置 eslint 检测风格
4. 新建.eslintignore 文件，设置需要 eslint 忽略的文件，那些文件就不会被 eslint 检测到

## prettier

在编辑完代码后，自动根据配置格式化代码风格

1. 在项目中安装 prettier （npm install prettier）
2. 新建 prettierrc.json，配置格式化风格
3. vscode 中下载 prittier 插件
4. 在 vscode 中设置默认保存格式化方式
   - settings => format on save => 勾选上
   - settings => editor default format => 选择 prettier - Code formmatter
5. 新建.prettierignore 文件，设置需要 prettier 忽略的文件，那些文件保存就不会被格式化

## husky

git Hook 工具，可以设置在 git 各个阶段

1. 初始化 husky 配置 `npx husky-init && npm install` 命令做了四件事情

- 安装 husky 到开发依赖
- 根目录下创建.husky 目录
- 在.husky 目录创建 pre-commit hook,并初始化 pre-commit 命令为 npm test
- 修改 package.json 中 scripts，田间 prepare 命令，执行 husky install

2. pre-commit 代表在执行 git commit 的时候执行的命令, 添加 eslint --fix 的校验

```git
eslint --fix ./src --ext .vue,.js,.ts
```

3. 但是存在一个场景，有时候只改动了一两个文件，但是 husky 会对所有的文件执行 eslint --fix，
   假如这是一个历史项目，我们在中途配置了 ESLint 规则，那么在提交代码时，也会对其他未修改的“历史”文件都进行检查，
   可能会造成大量文件出现 ESLint 错误，显然不是我们想要的结果，所以需要借助：lint-staged

## lint-staged

lint-staged 这个工具一般结合 husky 来使用，它可以让 husky 的 hook 触发的命令只作用于 git add 那些文件（即 git 暂存区的文件），
而不会影响到其他文件

1. 安装 lint-staged

```git
npm i lint-staged -D
```

2. 在 package.json 里增加 lint-staged 配置项

```json
{
  "lint-staged": {
    "*.{vue,js,ts}": "eslint --fix"
  }
}
```

这行命令表示：只对 git 暂存区的 .vue、.js、.ts 文件执行 eslint --fix

3. 修改 pre-commit hook 触发命令为 `npx lint-staged`

至此，husky 和 lint-staged 组合配置完成。
现在我们提交代码时就会变成这样：
假如我们修改了 scr 目录下的 test-1.js、test-2.ts 和 test-3.md 文件，然后 git add ./src/，最后 git commit -m "test..."，这时候就会只对 test-1.js、test-2.ts 这两个文件执行 eslint --fix。如果 ESLint 通过，成功提交，否则终止提交。从而保证了我们提交到 Git 仓库的代码都是规范的。

## 常见问题

### eslint 和 prettier 冲突

1. 安装第三方插件 eslint-plugin-prettier 和 eslint-config-prettier，用于 eslint 按照 prettier 的风格进行检测

```js
npm i eslint-plugin-prettier eslint-config-prettier -D
```

2. 配置 eslintrc.cjs，让 eslint 按照 prettier 的风格进行检测

```json
{
  "extends": ["plugin:prettier/recommended"]
}
```

### mac 和 window 切换，eslint 尾部报错

1. 因为 window 和 mac 的换行符不同，所以 git clone 项目时自动变为 CRLF,导致的报错，
   所以设置全局 git 不修改结尾就可以了

`git config --global core.autocrlf false`

2. editorconfig 文件，vscode 需要下载插件，自动保持不同编译器编码风格统一

# 提交规范

## commit message 格式规范

commit message 由 header,body,footer 组成

```html
<header>
  <body>
    <footer></footer>
  </body>
</header>
```

### Header

Header 部分包括三个字段 type(必须), scope(可选), subject(必须)

```git
<type>(<scope>): <subject>

# 例如： feat(dev-infra): add tset to expose bug
```

1. type: 用于说明 commit 的提交类型 (必须是以下几种之一)
   | 参数 | 描述 |
   | :---: | :---: |
   | feat | 新增功能 |
   | fix | 修复 bug |
   | docs | 文档变更 |
   | style | 样式变更(不影响功能，例如空格、分号等格式修正) |
   | refactor | 代码重构 |
   | perf | 改善性能 |
   | test | 测试 |
   | build |变更项目构建或外部依赖（例如 scopes: webpack、gulp、npm 等）|
   | ci | 更改持续集成软件的配置文件和 package.json 中的 scripts 命令，例如 scopes: Travis, Circle 等 |
   | chore | 变更构建流程或辅助工具 |
   | revert | 代码回退 |

2. scope 用于指定本次 commit 影响的范围

3. subject 是本次 commit 的简洁描述，长度约定在 50 个字符以内，通常遵循以下几个规范：

- 用动词开头，第一人称现在时表述，例如： change 代替 changed 或 changes
- 第一个字母小写
- 结尾不加句号

### Body

body 是对本次 commit 的详细描述，可以分成多行。（body 可省略）

跟 subject 类似，用动词开头，body 应该说明修改的原因和更改前后的行为对比。

### Footer

如果本次提交的代码是突破性的变更或关闭缺陷，则 Footer 必需，否则可以省略。

- 突破性的变更: 当前代码与上一个版本有突破性改变，则 Footer 以 BREAKING CHANGE 开头，后面是对变动的描述、以及变动的理由
- 关闭缺陷：如果当前提交是针对特定的 issue，那么可以在 Footer 部分填写需要关闭的单个 issue 或一系列 issues

### 参考例子

```git
feat(browser): onUrlChange event (popstate/hashchange/polling)

Added new event to browser:
- forward popstate event if available
- forward hashchange event if popstate not available
- do polling when neither popstate nor hashchange available

Breaks $browser.onHashChange, which was removed (use onUrlChange instead)
```

## Commitizen 规范提交

如果让大家在 git commit 的时候严格按照上面的格式来写，肯定是有压力的，首先得记住不同的类型到底是用来定义什么，subject 怎么写，
body 怎么写，footer 要不要写等等问题，懒才是程序员第一生产力，为此我们使用 Commitizen 工具来帮助我们自动生成 commit message 格式，
从而实现规范提交

1. 安装 commitizen

```node
npm install commitizen -D
```

2. 初始化项目

成功安装后，使用 cz-conventional-changelog 适配器来初始化项目

```node
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```

这行命令做了两件事

- 安装 cz-conventional-changelog 到开发依赖（devDependencies）
- 在 package.json 中增加了 config.commitizen

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

3. 使用 commitizen

以前我们提交代码都是 git commit -m "xxx"，现在改为 git cz，然后按照终端操作提示，逐步填入信息，
就能自动生成规范的 commit message

## cz-customizable 汉化

git cz 终端操作提示都是英文的，如果想改成中文的或者自定义这些配置选项，我们使用 cz-customizable 适配器

1. 安装 cz-customizable

```node
npx commitizen init cz-customizable --save-dev --save-exact --force
```

这行命令做了两个事情

- 安装 cz-customizable 到开发依赖（devDependencies）
- 修改 package.json 中的 config.commitizen 字段为：

```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    }
  }
}
```

2. 使用 cz-customizable

在项目根目录下创建 .cz-config.js 文件，然后按照官方提供的示例来配置，在本项目中我们修改成中文

# 版本迭代

1. 项目搭建

- vite 初始化项目
- 项目代码风格: eslint+prettier
- 项目目录划分
- 开发生产环境区分
- editorconfig 不同编译器风格同步

2. 第三方库

- vue-router@4
- pinia
- axios 封装
- element-plus
  - 按需引入
  - elMessage 等函数组件注册

3. 登录页面

- icons 全局注册
- 登录页面还原
- 用户名密码登录，手机登录组件划分
- 登录成功后保存 token
- postman 的使用
- localstorage 封装

# 开发问题总结

## keepalive 组件使用 include 不生效

1. 因为 keepAlive 组件需要根据组件的 name 进行匹配，所以组件就需要有 name 属性
2. vue3 使用 setup 会自动根据文件名设置，但不符合所有场景
3. 所以需要引入 vite 插件，将 name 属性放到 script 上 vite-plugin-vue-setup-extend-plus

```node
npm i vite-plugin-vue-setup-extend-plus
```

4. 在 vite 中注册插件
