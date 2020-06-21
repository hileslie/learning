# this



## this

在绝大多数情况下，函数的调用方式决定了`this`的值。`this`不能在执行期间被赋值，并且在每次函数被调用时`this`的值也可能会不同。

**在函数中this到底取何值，是在函数真正被调用执行的时候确定的，函数定义的时候确定不了**。因为this的取值是执行上下文环境的一部分，每次调用函数，都会产生一个新的执行上下文环境。

### this取值的4中情况

#### 构造函数

所谓构造函数就是用来new对象的函数。

```javascript
function Foo(){
    this.name = 'leslie';
    this.age = '18';
    console.log(this); // Foo {name: "leslie", age: "18"}
}
var f1 = new Foo();
console.log(f1.name) // leslie
console.log(f1.age) // 18
```

以上代码中，如果函数作为构造函数用，那么其中的this就代表它即将new出来的对象。

以上仅限new Foo()的情况，即Foo函数作为构造函数的情况。如果直接调用Foo函数，情况如下：

```javascript
function Foo() {
    this.name = 'leslie';
    this.age = '18';
    console.log(this); // Window {parent: Window, opener: Window, top: Window, length: 2, frames: Window, …}
}
Foo();
```

#### 函数作为对象的一个属性

如果函数作为对象的一个属性时，并且作为对象的一个属性被调用时，函数中的this指向该对象。

```javascript
var obj = {
    name: 'leslie',
    fn: function () {
		console.log(this) // {age: leslie, fn: ƒ}
        console.log(this.age) // leslie
    }
}
obj.fn();
```

以上代码中，`fn`不仅作为一个对象的一个属性，而且的确是作为对象的一个属性被调用。结果this就是`obj`对象。

注意，如果`fn`函数不作为`obj`的一个属性被调用，情况如下：

```javascript
var obj = {
    name: 'leslie',
    fn: function () {
		console.log(this) // ndow {parent: Window, opener: Window, top: Window, length: 2, frames: Window, …}
        console.log(this.name) // undefined
    }
}
let fn1 = obj.fn;
fn1();
```

如上代码，如果`fn`函数被赋值到了另一个变量中，并没有作为`obj`的一个属性被调用，那么this的值就是window，`this.age`为undefined。

#### 函数用call或者apply调用

当一个函数被call和apply调用时，this的值就取传入的对象的值。

```javascript
var obj = {
    name: 'leslie'
}
var fn = function() {
    console.log(this) // {name: "leslie"}
    console.log(this.name) // leslie 
}
fn.call(obj);
```

#### 全局&调用普通函数

在全局环境下，this永远指向window。

```javascript
console.log(this === window) // true
```

普通函数在调用时，其中的this也都是window。

```javascript
var name = 'leslie';
var fn = function() {
    console.log(this); // ndow {parent: Window, opener: Window, top: Window, length: 2, frames: Window, …}
    console.log(this.name); // leslie
}
fn();
```

特殊情况：

```javascript
var obj = {
    name: 'leslie',
    fn: function () {
        function f() {
            console.log(this) // Window {parent: Window, opener: Window, top: Window, length: 2, frames: Window, …}
            console.log(this.name) // undefined
        }
        f();
    }
}
obj.fn();
```

函数f虽然是在`obj.fn`内部定义的，但是它仍然是一个普通的函数，this仍然指向window。



## call & apply

### call

`**call()**` 方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。

`call()` 提供新的 **this** 值给当前调用的函数/方法。

```javascript
var obj = {
    name: 'leslie'
}
function fn(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
fn('first', 'last'); // first  last
fn.call(obj, 'first', 'last'); // first leslie last
```

### apply

**`apply()`** 方法调用一个具有给定`this`值的函数，以及作为一个数组（或[类似数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）提供的参数。

`call()` 提供新的 **this** 值给当前调用的函数/方法。

```javascript
var obj = {
    name: 'leslie'
}
function fn(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
fn('first', 'last'); // first  last
fn.apply(obj, ['first', 'last']); // first leslie last
```

### 如何实现call

```javascript
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    
    var args = [];
    args = [...arguments].slice(1);
    context.fn(...args);
    delete context.fn;
}
var obj = {
    name: 'leslie'
}
function fn(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
fn.call2(obj, 'first', 'last');
```

### 如何实现apply

```javascript
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;
    
    var args = [];
    args = [...arguments].slice(1);
    var newArgs = args[0].slice(0);
    context.fn(...newArgs);
    delete context.fn;
}
var obj = {
    name: 'leslie'
}
function fn(firstName, lastName) {
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
fn.call2(obj, ['first', 'last']);
```



## bind

bind 接收多个参数，第一个是bind返回值*返回值是一个函数*上下文的this，不会立即执行。

```javascript
var obj = {
    name: 'leslie',
}
function fn(firstName, lastName) {
    console.log(this)
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
var bn = fn.bind(obj);
bn('first', 'last'); // {name: "leslie"}  // first leslie last

var bn2 = fn.bind(obj, 'first');
bn2('last'); // {name: "leslie"}  // first leslie last
```

### 如何实现bind

```javascript
Function.prototype.bind2 = function(context) {
    var self = this;
    var args = [...arguments].slice(1);
    return function() {
        var newArgs = [...arguments];
        return self.apply(context, args.concat(newArgs));
    }
}
var obj = {
    name: 'leslie',
}
function fn(firstName, lastName) {
    console.log(this)
    console.log(firstName + ' ' + this.name + ' ' + lastName)
}
var bn = fn.bind(obj);
bn('first', 'last'); // {name: "leslie"}  // first leslie last
```

