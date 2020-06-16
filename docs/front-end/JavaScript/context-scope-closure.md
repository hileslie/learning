# 上下文与作用域链与闭包



## 上下文

> JavaScript程序内部是如何执行的



### 什么是执行上下文

执行上下文就是当前 JavaScript 代码被解析和执行时所在环境的抽象概念， JavaScript 中运行任何的代码都是在执行上下文中运行。



### 执行上下文的类型

执行上下文总共有三种类型：

- 全局上下文：默认的、最基础的执行上下文。不在任何函数中的代码都位于全局执行上下文中。

  > 1、创建全局对象（浏览器中是window）
  >
  > 2、将this指针指向全局对象

- 函数执行的上下文：每次调用函数时，都会为该函数创建一个新的执行上下文。每个函数都拥有自己的执行上下文，但是只有在函数被调用的时候才会被创建。一个程序中可以存在任意数量的函数执行上下文。每当一个新的执行上下文被创建，它都会按照特定的顺序执行一系列步骤。

- Eval函数执行上下文：运行在 eval 函数中的代码也获得了自己的执行上下文。

```javascript
// 全局上下文 等同于window.say
var say = 'hi leslie';

// 全局上下文
function saySomething() {
	// 函数执行上下文
  var say = 'hi leslie';
  // 函数执行上下文
  function sayHi() {
      return say;
  }
  sayHi();
}
saySomething();
```



### 执行上下文的生命周期

执行上下文的生命周期包括三个阶段：**创建阶段 → 执行阶段 → 回收阶段**。



#### 创建阶段

当函数被调用，但未执行任何其内部代码之前，会做以下三件事：

- 创建变量对象：首先初始化函数的参数 arguments，提升函数声明和变量声明。
- 创建作用域链（Scope Chain）：在执行期上下文的创建阶段，作用域链是在变量对象之后创建的。作用域链本身包含变量对象。作用域链用于解析变量。当被要求解析变量时，JavaScript 始终从代码嵌套的最内层开始，如果最内层没有找到变量，就会跳转到上一层父作用域中查找，直到找到该变量。
- 确定 this 指向： **this 的值是在执行的时候才能确认，定义的时候不能确认！**，因为 this 是执行上下文环境的一部分，而执行上下文需要在代码执行之前确定，而不是定义的时候。

> 在一段 JS 脚本执行之前，要先解析代码（所以说 JS 是解释执行的脚本语言），解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来。变量先暂时赋值为 undefined，函数则先声明好可使用。这一步做完了，然后再开始正式执行程序。
>
> 一个函数在执行之前，也会创建一个函数执行上下文环境，跟全局上下文差不多，不过 函数执行上下文中会多出 this arguments 和函数的参数。

```javascript
let person = {
  name: 'leslie',
  birthDay: '1956',
  say: function() {
    console.log('hi ' + this.name)
  }
}

// this 指向 person，因为 say 是被 person 对象引用调用的
person.say(); // hi leslie

// this 指向全局 window 对象，因为没有给出任何对象引用
let globalSay = person.say;
globalSay(); // hi
```

> 在全局执行上下文中，`this` 的值指向全局对象，在浏览器中，`this` 的值指向 window 对象。
>
> 在函数执行上下文中，`this` 的值取决于函数的调用方式。如果它被一个对象引用调用，那么 `this` 的值被设置为该对象，否则 `this` 的值被设置为全局对象或 `undefined`（严格模式下）。

```javascript
function foo() {
    console.log(this.a)
}
var a = 1;
foo(); // 1

function fn() {
    console.log(this);
}
var obj = {
    fn: fn,
}
obj.fn(); // {fn: fn}

function CreateJsPerson(name, age) {
    // this是当前类的一个实例p1
    this.name = name; // p1.name=name
    this.age = age; // p1.age=age
}
var p1 = new CreateJsPerson('leslie', 18);

function add (c, d) {
    return this.a + this.b + c + d;
}
var o = {
    a: 1,
    b: 3,
}
add(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

var obj = {
    name: 'kobe',
	age: 39,
	getName: function () {
		(() => {
			console.log(this); // obj
		})();
	}
};
obj.getName(); // {name: "kobe", age: 39, getName: ƒ}
```

> - 对于直接调用 foo 来说，不管 foo 函数被放在了什么地方，this 一定是 window
> - 对于 obj.foo() 来说，我们只需要记住，谁调用了函数，谁就是 this，所以在这个场景下 foo 函数中的 this 就是 obj 对象
> - 在构造函数模式中，类中(函数体中)出现的 this.xxx=xxx 中的 this 是当前类的一个实例
> - call、apply 和 bind：this 是第一个参数
> - 箭头函数 this 指向:箭头函数没有自己的 this，看其外层的是否有函数，如果有，外层函数的 this 就是内部箭头函数的 this，如果没有，则 this 是 window。

![avatar](./img/context.png)

#### 执行阶段

执行变量赋值、代码执行

#### 回收阶段

执行上下文出栈等待虚拟机回收执行上下文