# 从零实现KOA2
Koa是一个新的 web 框架，与Express相比，它更小、更富有表现力、更健壮。通过利用 async 函数，Koa 帮你丢弃回调函数，并有力地增强错误处理。Koa并没有捆绑任何中间件，而是提供了一套优雅的方法，快速地编写服务端应用程序。

原生Koa除去其他依赖，核心文件非常小，直行`npm i koa`之后，从源文件包的lib文件夹下可以看到，只有4个文件，结构清晰，分别是：

![avatar](/learning/images/md-images/build-koa2/k0.png)![avatar](/learning/images/md-images/build-koa2/k1.png)

- application.js：应用入口
- context.js：上下文
- request.js：http请求封装
- response.js：http响应封装

Koa使用非常简单
```js
let Koa = require('koa');

let app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello leslie!';
});

app.listen(3000);
```
接下来，我们将逐步实现ues、listen、http请求等方法，以及ctx、next等的定义。

## 项目目录结构
```
├── apply
|   └── test.js
├── koa
|   ├── application.js
|   ├── context.js
|   ├── request.js
|   └── response.js
├── node_modules
├── package-lock.json
└── package.json
```

## 实现application.js
在apply文件夹下的test.js文件中，实现简单的koa调用：
```js
let Koa = require('../koa/application');
let app = new Koa();
app.use((req, res) => {
    res.end('hello leslie'); // req、res是原生的node调用
});
app.listen(3000);
```
application.js：
```js
let http = require('http');
// http.createServer(function (request, response){
//   response.writeHead(200, {'Content-Type': 'text/plain'});
//   response.write("Hello World");
//   response.end();
// }).listen(8080, '127.0.0.1');

// Koa是一个类
class Koa {
  constructor() {
    // 私有属性
    this.callbackFn;
  }
  use(cb) {
    this.callbackFn = cb; // 调用use方法的时候，将方法存到callbackFn中
  }
  handleRequest(req, res) {
    // req和res对应了node原生的http服务中的request和response
    this.callbackFn(req, res);
  }
  // 监听端口时，启动服务
  listen() {
    // 创建服务
    let server = http.createServer(this.handleRequest.bind(this)); // handleRequest绑定当前Koa作用域，handleRequest中的this就指向了Koa
    server.listen(...arguments);
  }
}

module.exports = Koa;
```
启动服务`node apply/test.js`：

![avatar](/learning/images/md-images/build-koa2/k2.png)

然后，我们再来看koa，并没有使用原生的req、res。
```js
app.use((ctx, next) => {
    ctx.body = 'hello leslie!';
});
```
所以接下来，我们将是ctx和next的定义与封装。

## 实现ctx
> ctx上挂载了原生的node方法和自己定义的方法 

在apply文件夹下的test2.js文件中，实现简单的koa调用：
```js
let Koa = require('../koa/application');
let app = new Koa();
app.use((ctx) => {
    console.log(ctx);
    ctx.body = 'hello leslie2';
});
app.listen(3000);
```

application.js文件做如下修改：
```js
let http = require('http');
let context = require('./context');
let request = require('./request');
let response = require('./response');
class Koa {
  constructor() {
    this.callbackFn;
    this.context = context;
    this.request = request;
    this.response = response;
  }
  use(cb) {
    this.callbackFn = cb; // 调用use方法的时候，将方法存到callbackFn中
  }
  // 创建上下文
  createContext(req, res) {
    let ctx = Object.create(this.context); // 希望ctx可以拿到context的属性，但是不修改context的属性
    ctx.request = Object.create(this.request);
    ctx.req = ctx.request.req = req; // 将原生的req也赋值到ctx上
    ctx.response = Object.create(this.response);
    ctx.res = ctx.response.res = res; // 将原生的res也赋值到ctx上
    return ctx;
  }
  // 处理请求
  handleRequest(req, res) {
    res.statusCode = 404; // 默认页面找不到
    let ctx = this.createContext(req, res);
    this.callbackFn(ctx); // 当回调函数执行后，ctx.body值就会发生变化
    let body = ctx.body;
    if (typeof body === 'undefined') {
      res.end('Not Found');
    } else if (typeof body === 'string') {
      res.end(body);
    }
  }
  // 监听端口时，启动服务
  listen() {
    // 创建服务
    let server = http.createServer(this.handleRequest.bind(this)); // handleRequest绑定当前Koa作用域，handleRequest中的this就指向了Koa
    server.listen(...arguments);
  }
}

module.exports = Koa;
```
context.js文件如下：
```js
let proto = {

};
// 当调用proto.url，返回request.url
function defineGetter(property, name) {
  // 自定义获取器（代理），给proto对象添加一个为name的属性
  proto.__defineGetter__(name, function() {
    return this[property][name];
  })
}
defineGetter('request', 'url'); // 将request的url属性代理给proto，相当于proto.url = proto.request.url;
defineGetter('request', 'path'); // 将request的path属性代理给proto
defineGetter('response', 'body'); // 将response的body属性代理给proto

function defineSetter(property, name) {
  // 自定义设置器
  proto.__defineSetter__(name, function(value) {
    this[property][name] = value;
  })
}
defineSetter('response', 'body'); // 将response的body属性代理给proto
module.exports = proto;
```

request.js文件如下：
```js
let url = require('url');
let request = {
  // 利用get定义，可方便拓展
  get url() {
    return this.req.url; // 经过创建上下文之后，this指向ctx.request，ctx也会代理ctx.request上的属性
  },
  get path() {
    return url.parse(this.req.url).pathname;
  }
};
module.exports = request;
```

response.js文件如下：
```js
let response = {
  set body(value) {
    this.res.statusCode = 200; // 只要调用了ctx.body = 'xxx'，就会成功;
    this._body = value;
  },
  get body() {
    return this._body;
  }
};
module.exports = response;
```

启动服务`node apply/test2.js`，ctx目前已实现：

![avatar](/learning/images/md-images/build-koa2/k3.png)