# Eslint

<center>

![avatar](./img/9.png)

</center>

## Eslint 是什么

Lint 是检验代码格式工具的一个统称，具体的工具有 Jslint 、 Eslint 等等。ESLint 是一个用来识别 ECMAScript 并且按照规则给出报告的代码检测工具，使用它可以避免低级错误和统一代码的风格。

## 为什么要使用 eslint

每个人都有自己的编码习惯，例如：

-   有些人喜欢每一行代码结尾添加`;`<br>
-   有些人在定义变量时，直接就赋值，`a = 10`<br>
-   有的人喜欢把所有逻辑都写在一行代码上<br>
-   ......

在工作中，如何每个小组成员都按自己的喜好来编写代码，那么这个项目随着功能的迭代，代码会越来越乱，十分不利于维护和理解。这个时候，就需要有一套规则来规范代码编写，统一代码风格。这时候就体现了 eslint 的好处：

-   提供编码规范<br>
-   避免错误定义<br>
-   提供自动检验代码的程序，并打印检验结果：告诉你哪一个文件哪一行代码不符合哪一条编码规范，方便你去修改代码<br>
-   ......

<center>

![avatar](./img/0.jpg)

</center>

## 如何在项目中使用 eslint

示例基于 vue-cli 提供的简单 webpack 模板，这样创建的工程默认没有添加 ESLint。

`vue init webpack-simple test-vscode`

### 安装

> ESLint 是基于 Node 的，所以在使用之前，请确保 Node 已经安装，本次示例以本地项目安装为例

-   本地项目安装
    `npm install eslint --save-dev`

-   全局安装
    `npm install -g eslint`

-   安装完 eslint 之后，仍需继续安装其他依赖包

```
// 安装eslint-loader 在webpack中解析
// 安装babel-eslint  对Babel解析器的包装与ESLint兼容
// 安装eslint-plugin-vue vue默认规则
// -D 安装在开发依赖环境 devDependencies 原--save-dev的简写
npm i eslint-loader babel-eslint eslint-plugin-vue -D
```

安装完成后，package.json 中如下：

<center>

![avatar](./img/2.jpg)

</center>

-   生成配置文件，初始化
    `eslint --init`

选择第二行检查语法并发现问题

<center>

![avatar](./img/3.jpg)

</center>

选择第一行

<center>

![avatar](./img/4.jpg)

</center>

选择 Vue.js

<center>

![avatar](./img/5.jpg)

</center>

选择 Browser

<center>

![avatar](./img/6.jpg)

</center>

选择 JavaScript

<center>

![avatar](./img/7.jpg)

</center>

选择 JavaScript

<center>

![avatar](./img/7.jpg)

</center>

运行 eslint –init 后，会在当前目录下生成一个.eslintrc 文件

<center>

![avatar](./img/8.jpg)

</center>

### 配置

-   配置.eslintrc.js 文件，[详细规则 rules](https://cn.eslint.org/docs/rules/)

```js
// .eslintrc.js
module.exports = {
    // 指定脚本的运行环境
    env: {
        browser: true,
        es6: true
    },
    // 继承已启用的基础规则
    extends: ["eslint:recommended", "plugin:vue/essential"],
    // 脚本在执行期间访问的额外的全局变量
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    // 指定解析器选项
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: "module"
    },
    plugins: ["vue"],
    // 启用的规则及其各自的错误级别
    rules: {}
};
```

-   配置.eslintignore 文件，在根目录新建.eslintignore 文件，来忽略不需要校验的文件

```
/build/
/config/
/dist/
/*.js
```

-   将配置好的规则添加到 webpack 中对 js 文件检查

```js
// webpack.config.js
module.exports = {
    entry: "",
    output: {},
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader", "eslint-loader"]
            }
        ]
    },
    plugins: [],
    devServer: {}
};
```

## 当前工作项目中的 eslint

了解完安装、引入和配置后，我们开始了解项目中具体的配置及使用。

-   安装 eslint`@fe-base/eslint-config`

## 如何处理 eslint 报错

## 如何自己配置 eslint
