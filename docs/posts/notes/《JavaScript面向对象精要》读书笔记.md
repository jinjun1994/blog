---
{
title: 《JavaScript面向对象精要》读书笔记,
date: 2018-02-07,
tags: [读书笔记, JavaScript]
}
---

## 1.原始类型和引用类型

### 1.1 什么是类型

**原始类型** 保存为简单数据值。 **引用类型** 保存为对象，其本质是指向内存位置的引用。

为了让开发者能够把原始类型和引用类型按相同的方式处理，JavaScript花费了很大的努力来保证语言的一致性。

其他编程语言用栈存原始类型，用堆存储引用类型。而JavaScript则完全不同：它使用一个变量对象追踪变量的生存期。原始值被直接保存在变量对象内，而引用值则作为一个指针保存在变量对象内，该指针指向实际对象在内存中的存储位置。<!--more--> 

### 1.2 原始类型

原始类型代表照原样保存的一些简单数据。 JavaScript共有 **5** 种原始类型：

- boolean 布尔，值为 `true` or `false`
- number 数字，值为任何整型或浮点数值
- string 字符串，值为由单引号或双引号括住的单个字符或连续字符
- null 空类型，仅有一个值：null
- undefined 未定义，只有一个值：undefined（undefined会被赋给一个还没有初始化的变量）

JavaScript和许多其他语言一样，原始类型的变量直接保存原始值（而不是一个指向对象的指针）。

使一个变量等于另一个变量时，每个变量都有自己的一份数据拷贝（深拷贝）。使用自己的存储空间，修改不会影响到其他变量。

```javascript
var color1 = "red";
var color2 = color1;

console.log(color1); // "red"
console.log(color2); // "red"

color1 = "blue";

console.log(color1); // "blue"
console.log(color2); // "red"
```

#### 1.2.1鉴别原始类型

鉴别原始类型的最佳方式是使用 `typeof` 操作符。

```javascript
console.log(typeof "Nicholas"); // "string"
console.log(typeof 10);         // "number"
console.log(typeof true);       // "boolean"
console.log(typeof undefined);  // "undefined"
```

至于空类型（null）则有些棘手。

```javascript
console.log(typeof null); // "object"
```

对于 typeof null，结果是"object"。（其实这已被设计和维护JavaScript的委员会TC39认定是一个错误。在逻辑上，你可以认为 `null` 是一 个空的对象指针，所以结果为"object"，但这还是很令人困惑。）

判断一个值是否为空类型（null）的最佳方式是直接和 `null` 比较：

```javascript
console.log(value === null); // true or false
```

> **注意：以上这段代码使用了三等号（全等===）**，因为三等号（全等）不会将变量强制转换为另一种类型。

```javascript
console.log("5" == 5); // true
console.log("5" === 5); // false

console.log(undefined == null); // true
console.log(undefined === null); // false
```

#### 1.2.2原始方法

虽然字符串、数字和布尔值是原始类型，但是它们也拥有方法（null和undefined没有方法）。

```javascript
var name = "Nicholas";
var lowercaseName = name.toLowerCase(); // 转为小写

var count = 10;
var fixedCount = count.toFixed(2); // 转为10.00

var flag = true;
var stringFlag = flag.toString(); // 转为"true"

console.log("YIBU".charAt(0)); // 输出"Y"
```

> 尽管原始类型拥有方法，但它们不是对象。JavaScript使它们看上去像对象一样，以此来提高语言上的javas一致性体验。

### 1.3 引用类型

引用类型是指JavaScript中的对象，同时也是你在该语言中能找到最接近类的东西。 引用值是引用类型的实例，也是对象的同义词（后面将用对象指代引用值）。对象是属性的无序列表。属性包含键（始终是字符串）和值。如果一个属性的值是函数，它就被称为方法。除了函数可以运行以外，一个包含数组的属性和一个包含函数的属性没有什么区别。

#### 1.3.1创建对象

把JavaScript对象想象成哈希表可以帮助你更好地理解对象结构。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-7/36685022.jpg)



JavaScript 有好几种方法可以创建对象，或者说实例化对象。第一种是使用 `new` 操作符和构造函数。 构造函数就是通过 `new`操作符来创建对象的函数——任何函数都可以是构造函数。根据命名规范，JavaScript中的构造函数用**首字母大写**来跟非构造函数进行区分。

```javascript
var object = new Object();
```

因为引用类型不再变量中直接保存对象，所以本例中的 `object` 变量实际上并**不包含对象的实例，而是一个指向内存中实际对象所在位置的指针（或者说引用）**。这是对象和原始值之间的一个基本差别，原始值是直接保存在变量中。

当你将一个对象赋值给变量时，实际是赋值给这个变量一个指针。这意味着，将一个变量赋值给另外一个变量时，两个变量各获得了一份指针的拷贝，指向内存中的同一个对象（**浅拷贝**）。

```javascript
var obj1 = new Object();
var obj2 = obj1;
```

![](http://p8xb02d0d.bkt.clouddn.com/18-7-7/35723095.jpg)



#### 1.3.2对象引用解除

JavaScript语言有垃圾收集的功能，因此当你使用引用类型时无需担心内存分配。**但最好在不使用对象时将其引用解除，让垃圾收集器对那块内存进行释放。解除引用的最佳手段是将对象变量设置为 null。**

```javascript
var obj1 = new Object();
// dosomething
obj1 = null; // dereference
```

#### 1.3.3添加删除属性

在JavaScript中，可以随时添加和删除其属性。

```javascript
var obj1 = new Object();
var obj2 = obj1;

obj1.myCustomProperty = "Awsome!";
console.log(obj2.myCustomProperty); // "Awsome!" 因为obj1和obj2指向同一个对象。
```

### 1.4 内建类型实例化

内建类型如下：

- Array 数组类型，以数字为索引的一组值的有序列表
- Date 日期和时间类型
- Error 运行期错误类型
- Function 函数类型
- Object 通用对象类型
- RegExp 正则表达式类型

可使用 `new` 来实例化每一个内建引用类型：

```javascript
var items = new Array();
var new = new Date();
var error = new Error("Something bad happened.");
var func = new Function("console.log('HI');");
var object = new Object();
var re = new RegExp();
```

#### 1.4.1字面形式

内建引用类型有字面形式。字面形式允许你在不需要使用 `new` 操作符和构造函数显示创建对象的情况下生成引用值。属性的**键**可以是标识符或字符串（若含有空格或其他特殊字符）

#### 1.4.2对象字面形式

```javascript
var book = {
    name: "Book_name",
    year: 2016
}
```

上面代码与下面这段代码等价：

```javascript
var book = new Object();
book.name = "Book_name";
book.year = 2016;
```

> 虽然使用字面形式并没有调用 new Object()，但是JavaScript引擎背后做的工作和 new Object()一样，除了没有调用构造函数。其他引用类型的字面形式也是如此。

### 1.5 访问属性

可通过 `.` 和 `中括号` 访问对象的属性。 中括号`[]`在需要动态决定访问哪个属性时，特别有用。因为你可以用**变量**而不是字符串字面形式来指定访问的属性。

### 1.6 鉴别引用类型

函数是最容易鉴别的引用类型，因为对函数使用 `typeof` 操作符时，返回"function"。

```javascript
function reflect(value){
    return value;
}
console.log(typeof reflect); // "function"
```

对其他引用类型的鉴别则较为棘手，因为对于所有非函数的引用类型，`typeof` 返回 `object`。为了更方便地鉴别引用类型，可以使用 JavaScript 的 `instanceof` 操作符。

```javascript
var items = [];
var obj = {};
function reflect(value){
    return value;
}

console.log(items instanceof Array); // true;
console.log(obj instanceof Object); // true;
console.log(reflect instanceof Function); // true;
```

`instanceof` 操作符可鉴别继承类型。这意味着所有对象都是 `Oject` 的实例，因为所有引用类型都继承自 `Object`。

> 虽然 instanceof 可以鉴别对象类型（如数组），但是有一个列外。JavaScript 的值可以在同一个网页的不用框架之间传来传去。由于每个网页拥有它自己的全局上下文——Object、Array以及其他内建类型的版本。所以当你把一个对象（如数组）从一个框架传到另外一个框架时，instanceof就无法识别它。

### 1.7鉴别数组

采用Array.isArray()鉴别数组

```javascript
var items = [];
console.log(Array.isArray(items); // true;
```

### 1.8 原始封装类型

原始封装类型有 `3` 种：String、Number 和 Boolean。 当读取字符串、数字或布尔值时，原始封装类型将被自动创建。

```javascript
var name = "Nicholas";
var firstChar = name.charAt(0); // "N"
```

这在背后发生的事情如下：

```javascript
var name = "Nichola";
var temp = new String(name);
var firstChar = temp.charAt(0);
temp = null;
```

由于第二行把字符串当成对象使用，JavaScript引擎创建了一个字符串的实体让 `charAt(0)` 可以工作。字符串对象的存在仅用于该语句并在随后销毁（一种被称为自动打包的过程）。为了测试这一点，试着给字符串添加一个属性看看它是不是对象。

```javascript
var name = "Nicholas";
name.last = "Zakas";

console.log(name.last); // undefined;
```

下面是在JavaScript引擎中实际发生的事情：

```javascript
var name = "Nicholas";
var temp = new String(name);
temp.last = "Zakas";
temp = null; // temporary object destroyed

var temp = new String(name);
console.log(temp.last);
temp = null;
```

新属性 `last` 实际上是在一个立刻就被销毁的临时对象上而不是字符串上添加。之后当你试图访问该属性时，另一个不同的临时对象被创建，而新属性并不存在。

虽然原始封装类型会被自动创建，在这些值上进行 `instanceof` 检查对应类型的返回值却是 `false`。 这是因为**临时对象仅在值被读取时创建**。`instanceof` 操作符并没有真的读取任何东西，也就没有临时对象的创建。

当然你也可以手动创建原始封装类型。

```javascript
var str = new String("me");
str.age = 18;

console.log(typeof str); // object
console.log(str.age); // 18
```

如你所见，手动创建原始封装类型实际会创建出一个 `object`。这意味着 `typeof` 无法鉴别出你实际保存的数据的类型。

另外，手动创建原始封装类型和使用原始值是有一定区别的。所以尽量避免使用。

```javascript
var found = new Boolean(false);
if(found){
    console.log("Found"); // 执行到了，尽管对象的值为 false
}
```

这是因为一个对象(如 `{}` )在条件判断语句中总被认为是 `true`;

> MDN:Any object whose value is not undefined or null, including a Boolean oject whose value is false, evaluates to true when passed to a conditional statement.

### 1.9 总结

- 正确区分原始类型和引用类型
- 对于 `5` 种原始类型都可以用typeof来鉴别，而空类型必须直接跟 `null` 进行全等比较。
- 函数也是对象，可用 `typeof` 鉴别。其它引用类型，可用 `instanceof` 和一个构造函数来鉴别。（当然可以用`Object.prototype.toString.call()` 鉴别，它会返回[object Array]之类的）。
- 为了让原始类型看上去更像引用类型，JavaScript提供了 `3` 种封装类型。JavaScript会在背后创建这些对象使得你能够像使用普通对象那样使用原始值。但这些临时对象在使用它们的语句结束时就立刻被销毁。

## 2. 函数

JavaScript中函数其实也是对象，使对象不同于其它对象的决定性特点是函数存在一个被称为 `[[Call]]` 的内部属性。 **内部属性无法通过代码访问而是定义了代码执行时的行为**。ECMAScript为JavaScript的对象定义了多种内部属性，这些**内部属性都用双重中括号来标注**。

**[[Call]]属性是函数独有的，表明该对象可以被执行。由于仅函数拥有该属性，ECMAScript 定义typeof操作符对任何具有[[Call]]属性的对象返回"function"**。过去因某些浏览器曾在正则表达式中包含 `[[Call]]` 属性，导致正则表达式被错误鉴别为函数。现在所有浏览器已修复。

> 函数通常是使用函数声明语法定义的，如下面的例子所示。 
>
> function sum (num1, num2) { 
>     return num1 + num2; 
> } 
> 这与下面使用函数表达式定义函数的方式几乎相差无几。 
>
> var sum = function(num1, num2){ 
>     return num1 + num2; 
> };                                                   --《JavaScript高级程序设计》

### 2.1 声明还是表达式

两者的一个重要区别是：函数声明会被提升至上下文（要么是该函数被声明时所在的函数范围，要么是全局范围）的顶部。

### 2.2 函数就是值

可以像使用对象一样使用函数（因为函数本来就是对象，Function构造函数更加容易说明）。

```javascript
sum = new Function("num1", "num2", "return num1 + num2"); // 不推荐
```

> 从技术角度讲，这是一个函数表达式。但是，我们不推荐读者使用这种方法定义函数，因为这种语
> 法会导致解析两次代码 （第一次是解析常规 ECMAScript 代码， 第二次是解析传入构造函数中的字符串） ，
> 从而影响性能。不过，这种语法对于理解“函数是对象，函数名是指针”的概念倒是非常直观的。--《JavaScript高级程序设计》

### 2.3 参数

函数参数保存在类数组对象 `argument` （`Array.isArray(arguments)` 返回 `false`）中。可以接收任意数量的参数。 函数的 `length` 属性表明其期望的参数个数。

### 2.4 重载

大多数面向对象语言支持函数重载，它能让一个函数具有多个签名。函数签名由函数的名字、参数的个数及其类型组成。 而JavaScript可以接收任意数量的参数且参数类型完全没有限制。这说明JavaScript函数根本就没有签名，因此也不存在重载。

```javascript
function sayMessage(message){
    console.log(message);
}
function sayMessage(){
    console.log("Default Message");
}

sayMessage("Hello!"); // 输出"Default Message";
```

在Javscript里，当你试图定义多个同名的函数时，只有最后的定义有效，之前的函数声明被完全删除（函数也是对象，变量只是存指针)。

```javascript
var sayMessage = new Function("message", "console.log(message)");
var sayMessage = new Function("console.log(\"Default Message\");");

sayMessage("Hello!"); 
```

当然，你可以根据传入参数的数量来模仿重载。

> 将函数名想象为指针，也有助于理解为什么 ECMAScript 中没有函数重载的概念。以下是曾在第 3
> 章使用过的例子。 
>
> ````javascript
> function addSomeNumber(num){ 
>     return num + 100; 
> } 
> 
> function addSomeNumber(num) { 
>     return num + 200; 
> } 
> var result = addSomeNumber(100); //300 
> ````
>
> 显然，这个例子中声明了两个同名函数，而结果则是后面的函数覆盖了前面的函数。以上代码实际
> 上与下面的代码没有什么区别。
>
> ````javascript
> var addSomeNumber = function (num){ 
> 
>     return num + 100; 
> }; 
> 
> addSomeNumber = function (num) { 
>     return num + 200; 
> }; 
> var result = addSomeNumber(100); //300 
> 
> ````
>
> 
>
> 通过观察重写之后的代码，很容易看清楚到底是怎么回事儿——在创建第二个函数时，实际上覆盖
> 了引用第一个函数的变量 addSomeNumber 。           --《JavaScript高级程序设计》

### 2.5 对象方法

可以在任何时候给对象添加删除属性的值是函数，则该属性被称为方法。

#### 2.5.1 this对象

JavaScript 所有的函数作用域内都有一个 `this` 对象代表调用该函数的对象。在全局作用域中，`this` 代表全局对象（浏览器里的window）。当一个函数作为对象的方法调用时，默认 `this` 的值等于该对象。 **this在函数调用时才被设置。**

```javascript
function sayNameForAll(){
    console.log(this.name);
}

var person1 = {
    name: "Nicholas",
    sayName: sayNameForAll
}

var name = "Jack";

person1.sayName(); // 输出 "Nicholas"
sayNameforAll(); // 输出 "Jack"
```

#### 2.5.2 改变this

有 `3` 种函数方法运行你改变 `this` 值。

1. fun.call(thisArg[, arg1[, arg2[, ...]]]);
2. fun.apply(thisArg, [argsArray]);
3. fun.bind(thisArg[, arg1[, arg2[, ...]]])

使用 `call` 或 `apply` 方法，就不需要将函数加入每个对象——你显示地指定了 `this` 的值而不是让JavaScript引擎自动指定。

`call` 与 `apply` 的不同地方是，`call` 需要把所有参数一个个列出来，而 `apply` 的参数需要一个数组或者类似数组的对象（如 `arguments` 对象）。

`bind` 是ECMAScript 5 新增的，它会创建一个新函数返回。其参数与 `call` 类似，而且其所有参数代表需要被**永久**设置在新函数中的命名参数（绑定了的参数（没绑定的参数依然可以传入），就算调用时再传入其它参数，也不会影响这些绑定的参数）。

```javascript
function sayNameForAll(label){
    console.log(label + ":" + this.name);
}
var person = {
    name: "Nicholas"
}

var sayNameForPerson = sayNameForAll.bind(person);
sayNameForPerson("Person"); // 输出"Person:Nicholas"

var sayName = sayNameForAll.bind(person, "Jc");

sayName("change"); // 输出"Jc:Nicholas" 因为绑定的形参，会忽略调用时再传入参数
```

### 2.6 总结

- 函数也是对象，所以它可以被访问、复制和覆盖。
- 函数与其他对象最大的区别在于它们有一个特殊的内部属性 `[[Call]]`，包含了该函数的执行指令。
- 函数声明会被提升至上下文的顶部。
- 函数是对象，所以存在一个 `Function` 构造函数。但这会使你的代码难以理解和调试，除非函数的真实形式要直到运行时才能确定的时候才会利用它。

## 3.理解对象

创建自己的对象的时候,记得**JavaScript中的对象是动态的,可在代码执行的任意时刻发生改变**。

基于类的语言会根 据类的定义锁定对象, JavaScript对象没有这种限制。**JavaScript编程一大重点就是管理那些对象**,这就是为什么理解对象如何运作是理解整个JavaScript的关键。

### 3.1定义属性

两种创建自己的对象的方式:

使用Object构造函数或使用对象的字面形式。

````javascript
var person1 = {
name: “Nicholas”
};

var person2 = new 0bject();
person2.name = "Nicholas“;
person1.age = "Redacted“;
person2.age = "Redacted”;
person1.name = "Greg";
person2.name = "Michael";

````

当一个属性第一次被添加给对象时，JavaScript在对象上调用一个名为[[Put]]的内部方法。[[Put]]方法会在对象上创建一个新节点来保存属性， 就像第一次在哈希表上添加一个键一样。 这个操作不仅指定了初始的值， 也定义了属性的一些特征。 所以在前例中， 当属性name和 age在每个对象上第一次被定义时， [[Put]]方法都在该对
象上被调用了。

调用[[Put]]的结果是在对象上创建了一个**自有属性**。 一个自有属性表明仅仅该指定的对象实例拥有该属性。 该属性被直接保存在实例内, 对该属性的所有操作都必须通过该对象进行。

当一个已有的属性被赋予一个新值时， 调用的是一个名为[[Set]]的方法。 该方法将属性的当前值替换为新值。 上例为 name 设置第二个值时， 调用了[[Set]]方法。 下图分步显示了 person1 的 name和 age属性被改变时内部的变化。

图的第一部分显示了用对象字面形式创建的对象pemonl，它在属性name 上隐式调用了 [[Put]]对person1.age 的赋值是在属性 age上调用了 [[Put]]> 而给 person1.name 设置新值 “Greg” 则是在居性name上调用了[[Set]]， 覆盖了已有的属性值。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-7/63121700.jpg)

### 3.2属性探测

属性可以任意时间添加，有时候需要检查对象是否已有一个属性。JavaScript开发新手错误地使用以下模式检测属性是否存在。

```JavaScript
if(person.age){
    // do something with ag
}
```

上面的问题在于JavaScript的类型强制会影响该模式的输出结果。 当if判断中的值如下时，会判断为**真**：

- 对象
- 非空字符串
- 非零
- true

当if判断中的值如下时，会判断为**假**：

- null
- undefined
- 0
- false
- NaN
- 空字符串

当person1.age为0时，属性存在，但是if条件不满足。

因此判断属性是否存在的方法是使用 `in` 操作符。 `in` 操作符会检查**自有属性和原型属性**。仅仅检查自有属性时，可以使用 所有的对象都拥有的 `hasOwnProperty()` 方法（其实是 `Object.prototype` 原型对象的），该方法在给定的属性存在且为**自有属性**时返回 `true`。

```JavaScript
var person = {
    name: "Nicholas"
}

console.log("name" in person); // true
console.log(person.hasOwnpropert("name")); // true

console.log("toString" in person); // true
console.log(person.hasOwnproperty("toString")); // false
```

### 3.3删除属性

设置一个属性的值为 `null` 并不能从对象中彻底移除那个属性，这只是调用 `[[Set]]` 将 `null` 值替换了该属性原来的值而已。

彻底删除使用 `delete` 操作符，针对单个对象属性调用名为 `[[Delete]]` 的内部方法。该操作在哈希表中移除了一个键值对。删除成功时，返回 `true`（某些属性无法移除）。

```JavaScript
var person = {
    name: "Nicholas"
}

person.name = null;
console.log("name" in person); // true
delete person.name;
console.log(person.name); // undefined 访问一个不存在的属性将返回 undefined
console.log("name" in person); // false
```

### 3.4属性枚举

人为添加的属性默认都是可枚举的。可枚举的内部特征 `[[Enumerable]]` 都被设置为 `true`。 `for-in` 循环会枚举一个对象所有的可枚举属性，并将属性名赋值给一个变量。

> 在Chrome中，对象属性会按ASCII表排序，而不是定义时的顺序。

ECMAScript 5 的 Object.key() 方法可以获取可枚举属性的名字的数组。

```javascript
var person = {
    name: "Ljc",
    age: 18
}

Object.keys(person); // ["name", "age"];
```

`for-in` 与 `Object.keys()` 的一个区别是：前者也会遍历原型属性，而后者只返回自有(实例)属性。

实际上，对象的大部分原生方法的 `[[Enumerable]]` 特征都被设置为 `false`。可用 `propertyIsEnumerable()` 方法检查一个属性是否为可枚举的。

```javascript
var arr = ["abc", 2];
console.log(arr.propertyIsEnumerable("length")); // false
```

### 3.5属性类型

属性有两种类型：**数据属性**和**访问器属性**。 数据属性包含一个值。`[[Put]]` 方法的默认行为是创建**数据属性**。 访问器属性不包含值而是定义了一个当属性被读取时调用的函数（称为`getter`）和一个当属性被写入时调用的函数（称为`setter`）。访问器属性仅需要 `getter` 或 `setter` 两者中的任意一个，当然也可以两者。

```javascript
// 对象字面形式中定义访问器属性有特殊的语法：
var person = {
    _name: "Nicholas",
    
    get name(){
        console.log("Reading name");
        return this._name;
    },
    set name(value){
        console.log("Setting name to %s", value);
        this._name = value;
    }
};

console.log(person.name); // "Reading name" 然后输出 "Nicholas"

person.name = "Greg";
console.log(person.name); // "Setting name to Greg" 然后输出 "Greg"
```

> 前置下划线_ 是一个约定俗成的命名规范，表示该属性是私有的，实际上它还是公开的。

访问器就是定义了我们在对象读取或设置属性时，触发的动作（函数），`_name` 相当于一个内部变量。

getter被期望返回一个值，而setter则接受一个需要被赋值给属性的值作为参数。

 当你希望赋值操作会触发一些行为或者读取的值需要通过计算所需的返回值得到，访问器就会非常有用。

> 当只定义getter或setter其一时，该属性就会变成只读或只写。

### 3.6属性特质

在ECMAScript 5 之前没有办法指定一个属性是否可枚举。实际上无法访问属性的任何内部特征。为了改变这点，ECMAScript 5引入了多种方法来和属性特征值直接互动。 可以创建出和内建属性一样的自定义属性。

#### 3.6.1通用特征

数据属性和访问器属性均有以下两个属性特征： `[[Enumerable]]` 决定了能否遍历该属性； `[[Configurable]]` 决定了该属性是否可配置。 

可以用delete删除可配置属性，或者更改，甚至更改属性类型。

所有自定义的属性默认都是可枚举、可配置的。

可以用 `Object.defineProperty()` 方法改变属性特征。 接受三个参数：拥有该属性的对象、属性名和包含需要设置的特性的属性描述对象。 

属性描述对象具有和内部特征同名的属性但名字中不包含中括号。可以用enumerable属性来设置 [[Enumerable]]特征,用configurable属性来设置[[Configurable]]特征。例如,假设你想要让一个对象属性变成不可枚举且不可配置,方法如下。

```javascript
var person = {
    name: "Nicholas"
}
Object.defineProperty(person, "name", {
    enumerable: false
})

console.log("name" in person); // true
console.log(person.propertyIsEnumerable("name")); // false

var properties = Object.keys(person);
console.log(properties.length); // 0

Object.defineProperty(person, "name",{
    configurable: false
})

delete person.name; // false
console.log("name" in person); // true

Object.defineProperty(person, "name",{ // error! 
// chrome：Uncaught TypeError: Cannot redefine property: name
    configurable: true
})
```

首先定义了name属性,然后设置它的[[Enumerable]] , 特征为false。基于这个新值的propertylsEnumerable()方法将返回false。之后name被改为不可配置。从现在起,由于该属性不能被改变,试图删除name将会失败,所以name依然存在于personl中。对name再次调用Object.defineProperty()也不会改变属性。

personl 1对象的属性name被有效地锁定。最后几行代码试图重新定义name为可配置的。然而这将抛出错误。无法将一个不可配置的属性变成可配置。同样,在不可配置的情况下试图将数据属性变为访问器属性或反向变更也会抛出错误。

### 3.6.2数据属性特质

数据属性额外拥有两个访问器属性不具备的特质。

1.  [[Value]],包含属性的值。在对象上创建属性时该特征被自动赋值。所有的属性的值都保存在[[Value]]中,哪怕该值是一个函数。

2. [[Writable]],该特征是一个布尔值,指示该属性是否可以写入。所有的属性默认都是可写的,除非另外指定。

通过这两个额外特征,可以使用Object.defineProperty()完整定义一个数据属性,即使该属性还不存在。

````javascript
var person1= {
    name："Nicholas"
};
````

````javascript
var person1 ={};
object.defineProperty (person1, "name", { 
    value: "Nicholas",
    enumerable: true, 
    configurable: true, 
    writable: true 
});
````

以上代码效果相同，当Object.defineProperty()被调用时,它首先检查属性是否存在。, 如果不存在,将根据属性描述对象指定的特征创建。

用Object.defineProperty()定义新的属性时一定记得为**所有的特征指定一个值**,否则布尔型的特征会被默认设置为`false`。

````javascript
var person1 ={};
object.defineProperty (person1, "name", { 
    value: "Nicholas" 
});
````

上例name属性不可枚举、不可配置、不可写，除读取name属性值，其他任何操作均被锁定

注意事项：除enumerable，其余打印出来显示undefined，其实值是false

````JavaScript
var descriptor = Object.getOwnPropertyDescriptor(person1, "name");
console.log(descriptor.enumerable); // false
console.log(descriptor.configuable); // undefined
console.log(descriptor.value); // "Nicholas"
console.log(descriptor.wirtable); // undefined
````



#### 3.6.3 访问器属性特征

访问器属性额外拥有两个特征。`[[Get]]` 和 `[[Set]]`，内含 `getter` 和 `setter` 函数。 

使用访问其属性特征比使用对象字面形式定义访问器属性的优势在于：可以为已有的对象定义这些属性。而后者只能在创建时定义访问器属性。

和数据属性一样，可指定是否为可配置、可枚举。

```javascript
var person = {
    _name: "Nicholas"
};

Object.defineProperty(person, "name", {
    get: function(){
        return this._name;
    },
    set: function(value){
        this._name = value;
    },
    enumerable: true,
    configurable: true
})

for(var x in person){
    console.log(x); // _name \n(换行) name（访问器属性）
}
```

设置一个不可配置、不可枚举、不可以写的属性：

```javascript
Object.defineProperty(person, "name",{
    get: function(){
        return this._name;
    }
})
```

对于一个新的访问器属性，没有显示设置值为布尔值的属性，默认为 `false`。

#### 3.6.4 定义多重属性

`Object.defineProperties()` 方法可以定义一个对象任意数量的属性，甚至可以同时改变已有的属性并创建新属性。

```javascript
var person = {};

Object.defineProperties(person, {
    
    // data property to store data
    _name: {
        value: "Nicholas",
        enumerable: true,
        configurable: true,
        writable: true
    },
    
    // accessor property
    name: {
        get: function(){
            return this._name;
        },
        set: function(value){
            this._name = value;
        },
        enumerable: true,
        configurable: true,
    }
})
```

#### 3.6.5 获取属性特征

获取属性特质`Object.getOwnPropertyDescriptor()` 方法。

该方法接受两个参数：对象和属性名。如果属性存在，它会返回一个属性描述对象，内含`4`个属性：`configurable` 和 `enumerable`，另外两个属性则根据属性类型决定。

```javascript
var person = {
    name: "Nicholas"
}

var descriptor = Object.getOwnPropertyDescriptor(person, "name");

console.log(descriptor.enumerable); // true
console.log(descriptor.configuable); // Firefox：true     Chrome，edge，ie：undefined
console.log(descriptor.value); // "Nicholas"
console.log(descriptor.wirtable); //Firefox：true         Chrome，edge，ie：undefined
```

### 3.7 禁止修改对象

对象和属性一样具有指导其行为的内部特性。其中， `[[Extensible]]` 是布尔值，指明该对象本身是否可以被修改。默认是 `true`。当值为 `false` 时，就能禁止新属性的添加。

下列三种方法可以锁定对象属性。

#### 3.7.1 禁止扩展

`Object.preventExtensions()` 创建一个不可扩展的对象（即**不能添加新属性**）。 可以用`Object.isExtensible()` 检查 `[[Extensible]]` 的值。

```javascript
var person1 ={
    name: "Nicholas" 
};
console.log (object.isExtensible(person1));//true

Object.preventExtensions (person1);
console.log(Object.isExtensible(person1));// false

person1.sayName = function() { 
    console.log(this.name);
};

console.log("sayName" in person1);// false
```

创建person1后,这段代码先检查其[[Extensible]]特征,然后将其变得不可扩展。由于不可扩展, sayName()方法永远无法被加到personl上。

> 注意：在严格模式下试图给一个不可扩展对象添加属性会抛出错误,而在非严格模式下则会失败。应该对不可扩展对象使用严格模式,这样, 当一个不可扩展对象被错误使用时你就会知道。

#### 3.7.2 对象封印

一个被封印的对象是不可扩展的且其所有属性都是不可配置的（不能添加、删除属性或修改其属性类型（从数据属性变成访问器属性或相反）），**只能读写它的属性**。

可以用 Object.seal()。调用此方法后，该对象的 `[[Extensible]]` 特征被设置为 `false`，其所有属性的 `[[configurable]]` 特征被设置为 `false`。

可以用 `Object.isSealed()` 判断一个对象是否被封印。

如果你熟悉Java或C++语言,你也应该熟悉被封印对象。当你基于这两种语言的类创建对象时,无法给对象添加新的属性,但可, ,以修改该属性的值。实际上,**封印对象就是JavaScript在没有类的'情况下允许你做同样的控制**。

> 确保对被封印对象使用严格模式,这样当有人误用该对象时,你会得到一个错误。

#### 3.7.3 对象冻结

创建不可扩展对象的最后一种方法是冻结它。如果一个对象被冻结,则不能在其上添加或删除属性,不能改变属性类型,也不能写入 ,任何数据属性。简而言之,**被冻结对象是一个数据属性都为只读的被封印对象**。**被冻结对象无法解冻**。

可以用Object.freeze()来冻结一个对象,用Object.isFrozen()来判断一个对象是否被冻结。 

### 3.8 总结

1. 将属性视为键值对,对象视为属性的哈希表有助于理解 JavaScript对象。

   - 使用点号或中括号访问对象的属性。
   - 可以随时用赋值的方式添加新属性,也可以在任何时候用delete操作符删除一个属性。
   - 用in操作符检查对象中某个属性是否存在。
   - 如果是自有属性,可以用hasOwnProperty(0),这个方法存在于所有对象中。
   - 所有对象属性默认都是可枚举的,这意味着它们会出现在for-in循环中或者被Object.keys()获取。

2. 属性有两种类型:数据属性和访问器属性。

   - 数据属性保存值,你可以读写它们。
   - 当数据属性保存了一个函数的值,该属性被认为 , 是对象的一个方法。
   - 不同于数据属性,访问器属性不保存值;它们用getter和setter来进行指定的操作。
   - 可以用对象字面形式创建数据属性和访问器属性。

3. 所有属性都有一些相关特征。这些特征定义了属性的工作模式。

   - 数据属性和访问器属性都具有[[Enumerable]]和[1Configurable]]特征。
   - 数据属性还具有[[Writable]]和[[Value]]特征。
   - 访问器属性则具有[[Get]]和[[Set]]特征。
   - [[Enumerable]]和[[Configurable]]默认对所有属性置为true, [[Writable]]默认对数据属性置为true。
   - 你可以用 Object.defineProperty()或Object.defineProperties()改变这些特征,用 Object.getOwnPropertyDescriptor()获取它们。

4. 有3种方式可以锁定对象的属性。

   - Object.prevent Extensions()方法创建不可扩展的对象,无法在其上添加新的属性。
   -  Object.seal()方法创建被封印对象,它不可扩展且其属性不可配置。
   -  Object.freeze()方法创建被冻结对象,它同时是一个被封印对象且其数据属性不可写。
   - 你要当心这些不可扩展对象并始终对它们使用严格模式,这样任何对其错误的使用都会抛出一个错误。

   

## 4.构造函数和原型对象

由于JavaScript缺乏类,它用构造函数和原型对象来给对象带来与类相似的功能。但是,这些相似的功能并不一定 "表现的跟类完全一致。在本章中,你会详细看到JavaScript如何使用构造函数和原型对象来创建对象。

### 4.1构造函数

构造函数就是用new创建对象时调用的函数。例如, Object、Array和Function。

使用构造函数的好处在于所有用 **同一个构造函数创建的对象都具有同样的属性和方法**。如果想创建多个相同的对象,你可以创建自己的构造函数以及引用类型。构造函数也是函数,你会用同样的方法定义它。唯一的区别是构造函数名应该首字母大写,以此区分于其他函数。下例定义了一个空的Person函数。

````javascript
function Person() { 
    //intentionally empty
}
````

以上就是构造函数。构造函数和其他函数并没有绝对的语法上的区别。唯一的线索是首字母大写。定义好构造函数以后,就可以用它来创建对象,例如下面两个Person对象。

````javascript
var person1 = new Person();
var person2 = new Person();
````

如果没有需要传递的参数，可以忽略小括号。

personl和 person2成为Person类型的实例。new操作符会自动创建给定类型的对象并返回它们。

可以用 instanceof操作符获取对象的类型。如下所示。

````javascript
console.log (person1 instanceof Person); //true
````

也可以用构造函数属性来检查一个对象的类型。**每个对象在创建时都自动拥有一个构造函数属性,其中包含了一个指向其构造函数的引用**。那些通过对象字面形式或Object构造函数创建出来的泛用对象,其构造函数属性指向Object;而通过自定义构造函数创建出来的对象,其构造函数属性指向创建它的构造函数。

使用构造函数可以轻松创建许多拥有相同属性和方法的对象。只需要在构造函数内简单地给this添加任何想要的属性即可,如下例。

````javascript
function Person (name) {
    this.name = name;
    this.sayName= function() { 
        console.log(this.name);
    };
}
````

Person构造函数接受一个命名参数name并将其赋给 this对象的name属性。

同时,构造函数还给对象添加了一个 sayName()方法。当调用构造函数时, new会自动创建this对象, ,且其类型就是构造函数的类型。构造函数本身不需要返回一个值, new操作符会帮你返回。现在可以使用Person构造函数来创建具有初始name属性的对象。

````javascript
var person1 = new Person ("Nicholas");
var person2 = new Person ("Greg");
console. log (person1.name);//"Nicholas"
console.log (person2.name);// "Greg"

person1.sayName();//  "Nicholas" 
person2.sayName();//  "Greg"
````

> 你可以在构造函数中显式调用return。如果返回的值是一个对,象,它会代替新创建的对象实例返回。如果返回的值是一个原始类型，它会被忽略，新创建的对象实例会被返回。

构造函数可以用一致的方式初始化一个类型的实例,在使用 对象前设置好所有的属性。如下例,可以在构造函数中用Object.defineProperty()方法来初始化。

````javascript
function Person (name) {
    Object.defineProperty(this, "name", {
        get: function() { 
            return name;
        },
        set: function (newName) { 
            name= newName;
        },
        enumerable: true, 
        configurable: true 
    });
    this.sayName = function() { 
        console.log(this.name);
    };
}
````

Person构造函数中, name属性是一个访问者属性,利用name参数来存取实际的值。之所以能这样做,是因为命名参数就相当于一个本地变量。

始终确保用new调用构造函数;否则,会冒改变全局对象的风险,而不是创建一个新的对象。考虑如下代码中发生了什么。

````javascript
var person1 = Person ("Nicholas");         //note: missing "new"
console.log (person1 instanceof Person);  // false 
console.log(typeof person1);              //undefined"
console.log(name);                     // "Nicholas"
````

当Person不是被 new 调用时，构造函数中的 this 对象等于全局 this 对象。 

> 在严格模式下,不通过new调用Person构造函数时会出现 ,错误。这是因为严格模式并没有为全局对象设置this, this保持为 undefined,而当试图为undefined添加属性时都会出错。

构造函数允许你给对象配置同样的属性,但是**构造函数并没有消除代码冗余**。在之前的例子中，每一个对象都有自己的sayName()方法。这意味着如果你有100个对象实例,你就有100个函数做相同的事情,只是使用的数据不同。如果**所有的对象实例共享同一个方法会更有效率**,该方法可以使用this.name访问正确的数据,这就需要用到原型对象。

### 4.2原型对象

可以把原型对象看作是对象的基类。几乎所有的函数(除了一些内建函数)都有一个名为 prototype的属性,该属性是一个原型对象用来创建新的对象实例。所有创建的对象实例共享该原型对象,且这些对象实例可以访问原型对象的属性。例如, hasOwnProperty()方法被定义在泛用对象Object的原型对象中,但却可以被任何对象当作自己的属性访问,如下例。

````javascript
var book ={
    title: "The Principles of Object-oriented JavaScript"
};
console.log("title" in book);                                //true   
console.log(book.hasOwnProperty("title"));                   //true
console.log("hasOwnProperty" in book);                       //true
console.log(book.hasOwnProperty ("hasownProperty"));           //false
console.log(Object.prototype.hasOwnProperty("hasOwnProperty"));//true
````

book.hasOwnProperty()方法存在于Object.prototype中。in操作符对原型属性和自有属性都返回true.

鉴别原型属性：

````javascript
function hasPrototypeProperty(object, name){
    return name in object && !object.hasOwnProperty(name);
}
````

#### 4.2.1 [[Prototype]] 属性

一个对象实例通过内部属性[[Prototype]]跟踪其原型对象。该属性是一个指向该实例使用的原型对象的指针。用new创建一个新的对象时,构造函数的原型对象会被赋给该对象的[[Prototype]]属性。图4-1显示了[[Prototype]]属性是如何让多个对象实例引用同一个原型对象来减少重复代码的。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-8/74366479.jpg)

可以调用对象的Object.getPrototypeOf()方法读取[[Prototype]]属性的值。下例代码检查一个泛用空对象的[[Prototype]]属性。

````javascript
var object = {};
var prototype = object.getPrototypeof(object);
console.log(prototype === Object.prototype); // true
````

任何一个泛用对象,其[[Prototype]]属性始终指向 Object.prototype。

> 大部分JavaScript引擎在所有对象上都支持一个名为 `__proto__` 的属性。该属性使你可以直接**读写 [[Prototype]] 属性**。 

可以用isPrototypeOf()方法检查某个对象是否是另一个对象的原型对象,该方法被包含在所有对象中。

````javascript
var object = {};
console.log(Object.prototype.isPrototypeOf (object)); // true
````

因为object是一个泛用对象,原型是Object.prototype,意味着本例中的isPrototypeOf()方法应当返回true。

当读取一个对象的属性时, JavaScript引擎首先在该对象的自有属性中查找属性名字。如果找到则返回。如果自有属性中不包含该名字,则JavaScript会搜索[[Prototype]]中的对象。如果找到则返回。如果找不到,则返回undefined.

````javascript
var obj = new Object();
console.log(obj.toString()); // "[object Object]"

obj.toString = function(){
    return "[object Custom]";
}
console.log(obj.toString()); // "[object Custom]"
// 删除自有属性
delete obj.toString; 
console.log(obj.toString()); // "[object Object]"
// 无效，delete不能删除一个对象从原型继承而来的属性
delete obj.toString; 
console.log(obj.toString()); //  "[object Object]"
````

本例最初的toString()方法来自原型对象,默认返回“[object Object]"。如果你定义一个名叫toString()的自有属性,那么每次调用该对象toString()方法都会调用该自有属性。自有属性会覆盖原型 属性。仅当自有属性被删除时,原型属性才会再一次被使用。delete操作符仅对自有属性起作用,你无法删除一个对象的原型属性。图 4-2对本例做了很好的解释。

同时也揭示了一个重要概念:**无法给一个对象的原型属性赋值**。,如你在图4-2中所见,对toString的赋值在对象上创建了一个新的自有属性,而不是改变原型属性。

> MDN：delete 操作符不能删除的属性有：
>
> ①显式声明的全局变量不能被删除,该属性不可配置（not configurable）；
>
>  ②内置对象的内置属性不能被删除；
>
> ③不能删除一个对象从原型继承而来的属性(不过可以从原型上直接删掉它)。 

![](http://p8xb02d0d.bkt.clouddn.com/18-7-8/9054367.jpg)

#### 4.2.2 在构造函数中使用原型对象

原型对象的共享机制使得它们成为一次性为所有对象定义方法一的理想手段。将方法放在原型对象中并用this访问当前实例是更有效的做法。

下例展现了新Person构造函数。

````javascript
function Person(name) { 
    this.name = name;}
Person.prototype.sayName = function() {
    console.log (this.name);
};
var person1 = new Person ( "Nicholas");
var person2 = new Person ("Greg");

console.log(person1.name);// "Nicholas"
console.log(person2.name); // "Greg"

person1.sayName(); // "Nicholas"
person2.sayName(); // "Greg"
````

在这个版本的Person构造函数中, sayName()被定义在原型对象上而不是构造函数中。创建出的对象和本章之前的例子中创建的对象别无二致,只不过sayName()现在是一个原型属性而不是自有属性。在person1和person2调用sayName()时,相对的this的值被分别赋上person1或person2.

也可以在原型对象上存储其他类型的数据,但在存储引用值时需要注意。因为这些引用值会被多个实例共享,可能大家不希望一个实例能够改变另一个实例的值。

下例显示当你不注意你的引用值实际指向哪里时会发生的情况。

````javascript
function Person(name){
	this.name = name
}

Person.prototype.sayName = function(){
	console.log(this.name);
}
Person.prototype.favorites= [];

var person1 = new Person ("Nicholas");
var person2 = new Person ("Greg");

person1.favorites.push("pizza");
person2.favorites.push("quinoa");

console.log (person1.favorites);// "pizza, quinoa"
console.log(person2.favorites);//"pizza. quinoa"
````

favorites属性被定义在原型对象上,意味着person1.favorites和 person2.favorites指向同一个数组。对任一Person对象的favorites插入的值都将成为原型对象上数组的元素。但这可能不是你期望的 行为,所以在原型对象上定义时你需要非常小心。

虽然你可以在原型对象上一一添加属性,但是很多开发者会使用一种更简洁的方式:直接用一个对象字面形式替换原型对象如下。

```javascript
function Person(name){
    this.name
}

Person.prototype = {
    sayName: function(){
        console.log(this.name);
    },
    toString: function(){
        return "[Person " + this.name + "]";
    }
}
```

这种方式有一个副作用

````javascript
var person1 = new Person ( "Nicholas");
console.log (person1 instanceof Person); // true 
console.log (person1.constructor === Person); // false 
console.log(person1.constructor === Object); // true
````

使用对象字面形式改写原型对象改变了构造函数的属性,因此它现在指向Object而不是Person。这是因为原型对象具有一个 constructor属性,这是其他对象实例所没有的。当一个函数被创建时, ,它的 prototype属性也被创建,且该原型对象的constructor属性指向该函数。当使用对象字面形式改写原型对象Person.prototype时,其 constructor属性将被置为泛用对象Object,为了避免这一点,需要在改写原型对象时手动重置其constructor属性,如下。

````javascript
function Person(name){
    this.name
}

Person.prototype = {
    constructor: Person,

    sayName: function(){
        console.log(this.name);
    },
    toString: function(){
        return "[Person ]" + this.name + "]";
    }
};
var person1 = new Person ("Nicholas");
var person2 = new Person("Greg");

console.log (person1 instanceof Person);// true . 
console.log (person1.constructor === Person); // true 
console.log (person1.constructor === Object); // false
console.log(person2 instanceof Person); //true 
console.log (person2.constructor === Person); // true 
console.log(person2.constructor === Object); // false
````

本例显式指定了原型对象的constructor属性。为了不忘记赋值,最好把它设为原型对象的第一个属性。

构造函数、原型对象和对象实例之间的关系最有趣的一个方面 ,也许就是对象实例和构造函数之间没有直接联系。不过对象实例和原型对象以及原型对象和构造函数之间都有直接联系。图4-3描述了这个关系。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-9/54663476.jpg)

这样的连接关系意味着,如果打断对象实例和原型对象之间的 ,联系,那么也将打断对象实例和其构造函数的联系。

#### 4.2.3改变原型对象

给定类型的所有对象实例共享一个原型对象,所以可以一次性扩充所有对象实例。 [[Prototype]]属性只是包含了一个指向原型对象的指针,**任何对原型对象的改变都立即反映到所有引用它的对象实例**上。这意味着你给原型对象添加的新成员都可以立即被所有已经存在的对象实例使用。

可以随时改变原型对象的能力在封印对象和冻结对象上有一个十分有趣的后果。当你在一个对象上使用Object.seal()或  Object.freeze()时,完全是在操作对象的自有属性。你无法添加自有属性或改变冻结对象的自有属性,但仍然可以通过在原型对象上添加属性来扩展这些对象实例。

#### 4.2.4内建对象的原型对象

原型对象也允许改变JavaScript引擎的标准内建对象。所有内建对象都有构造函数，因此也都有原型对象改变。例如,在所有数组上添加一个新的方法只需要简单地修改Array.prototype即可。

````javascript
Array.prototype.sum= function() {
    return this. reduce(function (previous, current) { 
        return previous + current;
    });
};
var numbers = [ 1, 2, 3, 4, 5, 6];
var result = numbers.sum();
console.log(result);               //21
````

这个例子在Array.prototype上创建了一个名为sum()的方法,该方法对数组的所有元素求和并返回。numbers数组通过原型对象自动拥有了这个方法。在sum()内部, this指向数组的对象实例numbers,于是该方法也可以自由使用数组的其他方法,比如reduce()。

字符串、数字和布尔类型都有内建的原始封装类型来帮助我们像使用普通对象一样使用它们。如果改变原始封装类型的原型对象,就可以给这些原始值添加更多的功能。

> 修改内建对象来试验各种功能是既有趣又好玩的事,但在生产环境中这么做可不是一个好主意。开发者们都期望一个内建对象具有一定的方法并表现出一定的行为。故意改变内建对象会破坏这种期望并导致其他开发者无法确定这些对象会如何工作。

### 4.3总结

1. 构造函数就是用new操作符调用的普通函数。可以随时定义自己的构造函数来创建多个具有同样属性的对象。可以用 instanceof操作符或直接访问constructor属性来鉴别对象是被哪个构造函数创建的。
2. 每一个函数都具有prototype属性,它定义了该构造函数创建的所有对象共享的属性。通常,共享的方法和原始值属性被定义在原型对象里,而其他属性都定义在构造函数里。constructor属性实际上被定义在原型对象里供所有对象实例共享。
3. 原型对象被保存在对象实例内部的[[Prototypel1属性中。这个属性是一个引用而不是一个副本。由于JavaScript查找属性的机制,你对原型对象的修改都立刻出现在所有对象实例中。当你试图访问一个对象的某个属性时, JavaScript首先在自有属性里查找该名字,如果在自有属性中没有找到则查找原型属性。这样的机制意味着原型对象可以随时改变而引用它的对象实例则立即反映出这些改变。
4. 内建对象也有可以被修改的原型对象。虽然不建议在生产环境,中这么做,但它们可以被用来做实验以及验证新功能。

## 5.继承

学习如何创建对象是理解面向对象编程的第一步。第二步是理解继承。在传统面向对象语言中,类从其他类继承属性。然而**在 JavaScript中,继承可以发生在没有类的继承关系的对象之间。这种继承的机制就是原型对象**。

### 5.1原型对象和Object.prototype

JavaScript内建的继承方法被称为原型对象链,又可称为原型对象继承。原型对象的属性可经由对象实例访问, , 这就是继承的一种形式。对象实例继承了原型对象的属性。因为原型对象也是一个对象,它也有自己的原型对象并继承其属性。这就是原型对象链:对象继承其原型对象,而原型对象继承它的原型对象，依此类推。

所有的对象,包括那些你自己定义的对象都自动继承自Object,除非你另有指定(本章后续会讨论到)。更确切地说,所有对象都继承自Object.prototype。任何以对象字面形式定义的对象,其[[Prototype]]的值都被设为Object.prototype,这意味着它继承Object.prototype的属性,如下例中的book。

````javascript
var book ={ 
    title: "The Principles of object-oriented JavaScript"
};
var prototype = Object.getPrototypeOf (book);
console.log(prototype === Object.prototype); // true
````

book的对象原型是Object.prototype。这里不需要多余的代码来 ,指定,因为这是创建新对象的默认行为。这个关系意味着book会自动接收来自Object.prototype的方法。

#### 5.1.1继承自Object.prototype的方法

1. hasOwnProperty() 检测是否存在一个给定名字的自有属性
2. propertyIsemumerable() 检查一个自有属性是否可枚举
3. isPrototypeOf 检查一个对象是否是另一个对象的原型对象
4. valueOf() 返回一个对象的值表达
5. toString() 返回一个对象的字符串表达

这 5 种方法经由继承出现在所有对象中。 

#### 5.1.2修改Object.prototype

所有的对象都默认继承自Object.prototype,所以改变Object.. prototype会影响所有的对象,这是非常危险的。第4章告诫过你不要修改内建对象的原型对象,到了Object.prototype,这个告诫就要加倍。查看下面的代码会发生什么。

````javascript
Object.prototype.add= function(value) { 
    return this + value;
};
var book ={
    title: "The Principles of Object-Oriented JavaScript"
};
console.log(book.add(5));// "[object Object]5" 
console.log("title".add ("end"));// "titleend"

// in a web browser
console. log (document.add (true));  // "[object HTMLDocument]true" 
console.log(window.add(5));// "[obiect Window]5"
````

添加Object.prototype.add)会导致所有的对象都有了一个add()方法,不管这样是不是合理。不仅仅给开发者,同时也给JavaScript委员会带来了问题:它不得不把新方法添加到各种不同的地方,因,为给Object.prototype添加方法可能会带来不可预知的结果。

这个问题的另一方面在于给Object.prototype添加可枚举属性。在之前的例子里, Object.prototype.add()是一个可枚举属性,这意味着它会出现在for-in循环中。

考虑到JavaScript中使用 for-in的频繁程度,为Object.prototype添加可枚举属性会影响大量代码。因为这个原因, Douglas Crockford推荐在for-in循环中始终使用hasOwnProperty(),如下。

````javascript
var empty = {};
for(var property in empty) {
    if (empty.hasOwnProperty(property)) { 
        console.log (property);
    }
}
````

不过这个方法虽然可以有效过滤那些不想要的原型对象的属性, ,但也同时限制了for-in循环,使其只能用于自有属性,这也许不是你想要的。对你来说,最灵活的做法还是不要修改Object.prototype。

### 5.2对象继承

对象继承是最简单的继承类型。你唯一需要做的就是指定哪个对象是新对象的[[Prototype]]。对象字面形式会隐式指定Object.prototype为其[[Prototype]],你也可以用Object.create()方法显式指定。

Object.create()方法接受两个参数。

第一个参数是需要被设置为新对象的[[Prototype]]的对象。

第二个可选参数是一个属性描述对象,其格式如你在Object.defineProperties()中使用的一样(见第3章)。考虑下面的代码。

````javascript
var obj = {
    name: "The Principles of Object-oriented JavaScript"
};

// 等同于
var obj = Object.create(Object.prototype, {
    name: {
        value: "The Principles of Object-oriented JavaScript",
        configurable: true,
        enumberable: true,
        writable: true
    }
});
````

两种声明具有相同的效果。

第一种声明使用对象字面形式来定义一个具有单一属性title的对象。该对象自动继承自Object prototype,且其属性被默认设置为可配置、可枚举和可写。

第二种 ,声明使用Object.create()显式做了同样的操作。两个book对象的行为完全一致。但你可能永远不会这样写出直接继承自Object.prototype的代码,毕竟那是默认行为。继承自其他对象则有趣多了,如下。

````javascript
var person1 = {
    name: "Nicholas", 
    sayName: function() { 
        console.log(this.name);
    }
};
var person2 = Object.create(person1, { 
    name: { 
        configurable: true, 
        enumerable: true, 
        value: "Greg", 
        writable: true
    }
});
person1. sayName();// outputs "Nicholas"
person2. sayName();// outputs "Greg"
console.log(person1.hasOwnProperty("sayName"));// true
console.log(person1.isPrototypeOf(person2)); // true
console.log(person2.hasOwnProperty("sayName")); // false
````

这段代码创建了一个对象person1,具有一个name属性和一个 sayName()方法。对象person2继承自person1,也就继承了name和 sayName()。然而person2在通过Object.create()创建时还定义了一个自有属性name。该自有属性隐藏并代替了原型对象的同名属性。所以, person1.sayName()输出"Nicholas ",而person2.sayName()输出"Greg"。

请记住, sayName()依然只存在于personl并被person2继承。本例person2的继承链长于person1。对象person2继承自person1而person1继承自Object.prototype。如图5-1所示。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-9/94219659.jpg)

当访问一个对象的属性时, JavaScript引擎会执行一个搜索过程。如果在对象实例上发现该属性(就是说是个自有属性),该属性值就会被使用。如果对象实例上没有发现该属性,则搜索 [[Prototype]]。如果仍然没有发现,则继续搜索该原型对象的 [[Prototype]],直到继承链末端。末端通常是一个Object.prototype,其[[Prototype]]被置为null.

也可以通过Object.create()创建[[Prototype]]为null的对象,如下所示。

````javascript
var nakedobject= Object.create (null);
console.log ("tostring" in nakedobject); // false 
console.log("valueof" in nakedobject); // false
````

本例中的nakedObject是一个没有原型对象链的对象。这意味着toString()和valueOf()等内建方法都不存在于该对象上。

实际上,**该对象完全就是一个没有任何预定义属性的白板**,这使得它成为一个完美的哈希容器,因为不会发生跟继承来的属性名字的冲突。除此之外这种对象也没有什么别的用处了,你不能把它当成一个其他继承自Object.prototype的对象一样使用。例如,无论何时当你对 nakedObject使用操作符时,你都会得到一个"Cannot convert object to primitive value."的错误。这只是一个有趣的JavaScript语言诡计,使你可以创建出一个没有原型对象的对象。

### 5.3构造函数继承

JavaScript中的对象继承也是构造函数继承的基础。还记得第4章提到,几乎所有的函数都有prototype属性,它可以被修改或替换。该prototype属性被自动设置为一个新的继承自Object.prototype的泛用对象,该对象有一个自有属性constructor。实际上, JavaScript引擎为你做了下面的事情。

````javascript
// 你的代码
function YourConstructor(){
    // initialization
}

// JavaScript引擎在背后为你做的处理
YourConstructor.prototype = Object.create(Object.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: YourConstructor,
        writable: true
    }
})
````

由于 prototype 可写，你可以通过改变它来改变原型对象链。 

````javascript
function Rectangle(length, width){
	this.length = length;
	this.width = width
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width
}

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
}


// inherits from Rectangle
function Square(size){
	this.length = size;
	this.width = size;
}

Square.prototype = new Rectangle(); // 尽管是 Square.prototype 是指向了 Rectangle 的对象实例，即Square的实例对象也能访问该实例的属性（如果你提前声明了该对象，且给该对象新增属性）。
// Square.prototype = Rectangle.prototype; // 这种实现没有上面这种好，因为Square.prototype 指向了 Rectangle.prototype，导致修改Square.prototype时，实际就是修改Rectangle.prototype。
console.log(Square.prototype.constructor); // 输出 Rectangle 构造函数

Square.prototype.constructor = Square; // 重置回 Square 构造函数
console.log(Square.prototype.constructor); // 输出 Square 构造函数

Square.prototype.toString = function(){
	return "[Square " + this.length + "x" + this.width + "]";
}

var rect = new Rectangle(5, 10);
var square = new Square(6);

console.log(rect.getArea()); // 50
console.log(square.getArea()); // 36

console.log(rect.toString()); // "[Rectangle 5 * 10]", 但如果是Square.prototype = Rectangle.prototype，则这里会"[Square 5 * 10]"
console.log(square.toString()); // "[Square 6 * 6]"

console.log(square instanceof Square); // true
console.log(square instanceof Rectangle); // true
console.log(square instanceof Object); // true
````

这段代码里有两个构造函数: Rectangle和Square。

Square构造函数的prototype属性被改写为Rectangle的一个对象实例。此时不需要给Rectangle的调用提供参数,因为它们不需要被使用,而且如果提供了,那么所有的Square的对象实例都会共享同样的维度。用这种方式改变原型对象链时,你需要确保构造函数不会在参数缺失时抛出错误(很多构造函数包含的初始化逻辑会需要参数)且构造函数不会改变任何全局状态,比如追踪有多少对象实例被创建等。Square.prototype被改写后,其constructor属性会被重置为Square.

然后, rect作为Rectangle的对象实例被创建,而square则被作为Square的实例创建。两个对象都有getArea()方法,因为那继承自 Rectangle.prototype。 instanceof操作符认为变量square同时是Square、Rectangle和Object的对象实例。因为instanceof使用原型对象链检查对象类型。如图5-2所示。

![](http://p8xb02d0d.bkt.clouddn.com/18-7-9/60734397.jpg)

Square.prototype并不真的需要被改写为一个Rectangle对象,毕竟Rectangle构造函数并没有真的为Square做什么必要的事情。事实上,唯一相关的部分是Square.prototype需要指向Rectangle.prototype,使得继承得以实现。这意味着你可以用Object.create()简化例子,代码如下。

````javascript
// inherits from Rectangle
function Square(size){
    this.length = size;
    this.width = size;
}

Square.prototype= Object.create(Rectangle.prototype, {
    constructor: {
        configurable: true,
        enumerable: true,
        value: Square,
        writable: true
    }
});
Square.prototype.tostring= function() { return "[Square "+ this.length+ "x"+ this.width+ "]";
````

在这个版本的代码中, Square.prototype被改写为一个新的继承自Rectangle.prototype的对象,而Rectangle构造函数没有被调用。这意味着,不再需要担心不加参数调用构造函数会导致的错误。,除此之外,这段代码和前面的代码行为完全一致。原型对象链完好无缺,所有的Square对象实例都继承自Rectangle.prototype且其 constructor属性也都在同样的地方被重置。

## 5.4构造函数窃取

由于JavaScript中的继承是通过原型对象链来实现的,因此不需要调用对象的父类的构造函数。如果你确实需要在子类构造函数中调用父类构造函数,那你就需要利用JavaScript函数工作的特性。

call0)和apply()方法允许你在调用函数时提 , 供一个不同的this值。那正好是构造函数窃取的关键。只需要在子类的构造函数中用call()或者apply()调用父类的构造函数,并将新创建的对象传进去即可。实际上,就是用自己的对象窃取父类的构造函数,如下例。

````javascript
function Rectangle(length, width){
	this.length = length;
	this.width = width
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width
}

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
}

function Square(size){
    Rectangle.call(this, size, size);
   
    // optional: add new properties or override existing ones here
}
Square.prototype= Object.create (Rectangle.prototype, { 
    constructor: { 
        configurable: true, 
        enumerable: true, 
        value: Square, 
        writable: true
    }
});
Square.prototype.tostring= function() {
    return "[Square " + this.length+ "x" + this.width+ "]";
};
var square = new Square(6);
console.log(square.length); //6 
console.log (square.width);// 6 
console.log(square.getArea()); // 36
````

Square构造函数调用了Rectangle构造函数,并传入了this和 size两次(一次作为length,另一次作为width)。这么做会在新对象上创建length和width属性并让它们等于size,这是一种避免在构造函数里重新定义你希望继承的属性的手段。你可以在调用完父类的构造函数后继续添加新属性或覆盖已有的属性。

这个分两步走的过程在你需要完成自定义类型之间的继承时比较有用。你经常需要修改一个构造函数的原型对象,你也经常需要在子类的构造函数中调用父类的构造函数。一般来说,需要修改 prototype来继承方法并用构造函数窃取来设置属性。由于这种做法模仿了那些基于类的语言的类继承,通常被称为伪类继承。

### 5.5访问父类方法

在前面的例子中, Square类型有自己的toString()方法隐藏了其原型对象的toString()方法。子类提供新功能覆盖父类的方法十分常见,但如果你还想访问父类的方法该怎么办呢?在其他语言中,可以用super.toString(),但在JavaScript中没有类似的方式。代替的方法是在通过call()或apply()调用父类的原型对象的方法时传入一个子类的对象。如下例所示。

````javascript
function Rectangle(length, width){
	this.length = length;
	this.width = width
}

Rectangle.prototype.getArea = function(){
	return this.length * this.width
}

Rectangle.prototype.toString = function(){
	return "[Rectangle " + this.length + "x" + this.width + "]";
}

// inherits from Rectangle 
function Square(size) {
    Rectangle.call(this, size, size);
}
Square.prototype= Object.create (Rectangle.prototype, { 
    constructor: { 
        configurable: true, 
        enumerable: true, 
        value: square, 
        writable: true
    });// call the supertype method 
Square.prototype.tostring= function() { 
    vartext = Rectangle.prototype.tostring.call(this);
    return text.replace("Rectangle", "Square");
};
````

在这个版本的代码中, Square.prototype.toString()通过call()调用 Rectangle.prototype.toString()。该方法只需在返回文本结果前用 "Square"替换"Rectangle",这种做法看上去可能有一点冗长,但这是唯一的访问父类方法的手段。

## 5.6总结

1. JavaScript通过原型对象链支持继承。当将一个对象的[[Prototype]]设置为另一个对象时,就在这两个对象之间创建了一条原型对象链。所有的泛用对象都自动继承自Object.prototype。如果你想要创建个继承自其他对象的对象,你可以用Object.create()指定[[Prototype]]为一个新对象。
2. 可以在构造函数中创建原型对象链来完成自定义类型之间的继承。通过将构造函数的prototype属性设置为某一个对象,就建立了自定义类型对象和该对象的继承关系。构造函数的所有对象实例共享同一个原型对象,所以它们都继承自该对象。这个技术在继承其他对象的方法时工作得十分好,但你不能用原型对象继承自有属性。
3. 为了正确继承自有属性,可以使用构造函数窃取。只需以call()或apply()调用父类的构造函数,就可以在子类里完成各种初始化。结合构造函数窃取和原型对象链是JavaScript中最常见的继承手段。由于和基于类的继承相似,这个组合经常被称为 ,伪类继承。
4. 可以通过直接访问父类原型对象的方式访问父类的方法。当你这么做时,你必须以call()或apply()执行父类方法并传入一个子类的对象。

## 6.对象模式

JavaScript有很多创建对象的模式,完成工作的方式也不只一种。可以随时定义自己的类型或自己的泛用对象。可以使用继承或混入等其他技术令对象间行为共享。也可以利用JavaScript高级 ,技巧来阻止对象结构被改变。下面讨论的模式赐予强大的管理和创建对象的能力,完全基于自己的用例。

### 6.1私有成员和特权成员

JavaScript对象的所有属性都是公有的,且没有显式的方法指定,某个属性不能被外界某个对象访问。然而,有时你可能不希望数据公有。例如,当一个对象使用一个值来决定某种状态,在对象不知,情的情况下修改该值会让状态管理过程陷入混乱。一种避免它的方法是通过使用命名规则。例如,在不希望公有的属性名字前加上下划线(如this._name),还有很多其他方法不需要依赖命名规则,因此在阻止私有信息被修改方面也就更加“防弹”。

#### 6.1.1模块模式

模块模式是一种用于创建拥有私有数据的单件对象的模式

