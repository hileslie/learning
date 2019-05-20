# 变量和类型

## JavaScript语言类型

### 原始类型（primitive values）
JavaScript定义了6中原始类型：
- Boolean
- Null
- Undefined
- Number
- String
- Symbol

原始类型存储的都是值。<br>
Boolean布尔类型：表示一个逻辑实体，有两个值`true`和`false`<br>
Null类型：有一个值`null`<br>
Undefined类型：一个没有被赋值的变量，默认值就是`undefined`，如`var a`，a的值默认为undefined<br>
Number数字类型（浮点类型）：<br>
String字符串类型：<br>
Symbol符号类型：
### 对象类型
JavaScript中除了原始类型，其他都是对象类型。原始类型存储值，而对象类型存储地址（指针），当我们定义一个对象时，计算机中就会开辟一个空间来存放值，这个空间就会拥有一个地址（指针）。如`const str = 'test'`。当将变量赋值给另一个变量时，其实复制的原本变量的地址，所以当改变新变量时，是改变地址的值，所以原来的变量的值也会改变。
```js
const a = 'testA'
const b = a
console.log(b) // testA
b = 'testB'
console.log(a) // testB
console.log(b) // testB
```

## JavaScript对象底层数据结构


## 3.Symbol类型在实际开发中的应用、可手动实现一个简单的Symbol


## 4.JavaScript中的变量在内存中的具体存储形式


## 5.基本类型对应的内置对象，以及他们之间的装箱拆箱操作


## 6.理解值类型和引用类型


## 7.null和undefined的区别


## 8.至少可以说出三种判断JavaScript数据类型的方式，以及他们的优缺点，如何准确的判断数组类型


## 9.可能发生隐式类型转换的场景以及转换原则，应如何避免或巧妙应用


## 10.出现小数精度丢失的原因，JavaScript可以存储的最大数字、最大安全数字，JavaScript处理大数字的方法、避免精度丢失的方法