export default [
  {
    "excerpt": " [[toc]]     异步编程全传    各种技术方案的涌现是为了解决实践中遇到的各种问题，本文将从这个角度带你梳理并掌握异步编程的核心内容。    首先对单线程异步的原理进行解读，接着按照发展历程分析JavaScript异步解决方案，详述Callback、Promise、Generator、Async/Await的特性和使用原理。         一、同步异步、阻塞非阻塞    **......",
    "tags": [
      "JavaScript",
      "异步编程"
    ],
    "id": 0,
    "title": "异步编程全传",
    "lastUpdated": "2019/3/10",
    "path": "/posts/JavaScript/async.html"
  },
  {
    "excerpt": " 太长不看版：    prop、slot、event 是 vue 组件通信的核心方法，全局的可以使用总线 bus 和 vuex 。祖孙组件通信为了避免 props 穿透而引入 inheritAttrs 、 $attrs 和 $listener。组件实例获取可以通过 ref 、$parent、$children，派发和广播已经废弃，可以自行实现。还可以使用自定义方法找到任意组件实例，provide/......",
    "tags": [
      "vue",
      "前端框架"
    ],
    "id": 1,
    "title": "一篇文章掌握所有 vue 组件通信方法",
    "lastUpdated": "2019-03-01 04:10:03",
    "path": "/posts/vue.html"
  },
  {
    "excerpt": " [[toc]]     类型    JavaScript 中有八种基本的类型。    - `number` 用于任何类型的数字：整数或者浮点数。  - `string` 用于字符串。一个字符串可以包含一个或多个字符，所以没有单独的单字符类型。  - `boolean` 用于 `true` 和 `false`。  - `null` 用于未知的值 —— 只有一个 `null` 值的独立类型。  ......",
    "tags": [
      "JavaScript",
      "基础知识"
    ],
    "id": 2,
    "title": "JavaScript基础知识",
    "lastUpdated": "2019/02/23",
    "path": "/posts/JavaScript/"
  },
  {
    "excerpt": "  webpack优化    webpack在一线开发中的优化     一 、开启多核压缩 [uglifyjs-webpack-plugin](https://www.npmjs.com/package/uglifyjs-webpack-plugin)    To begin, you'll need to install `uglifyjs-webpack-plugin`:    ```......",
    "tags": [
      "webpack",
      "前端工程化"
    ],
    "id": 3,
    "title": "webpack开发与上线优化",
    "lastUpdated": "2019-02-10 22:45:22",
    "path": "/posts/webpack-optimize.html"
  },
  {
    "excerpt": " webpack 是一个模块打包工具    模块化概念<https://webpack.js.org/concepts/modules>    [模块化语法](https://webpack.js.org/api/module-methods)、[变量](https://webpack.js.org/api/module-variables)     webpack的正确安装姿势    安装最......",
    "tags": [
      "webpack",
      "前端工程化"
    ],
    "id": 4,
    "title": "webpack速查",
    "lastUpdated": "2019-02-08 18:10:09",
    "path": "/posts/webpack-search.html"
  },
  {
    "excerpt": " [[toc]]     为什么需要闭包？    ```javascript  function makeWorker() {    let name = \"Pete\";      return function() {      alert(name);    };  }    let name = \"John\";    // 创建一个函数  let work = makeWorker();......",
    "tags": [
      "JavaScript",
      "闭包"
    ],
    "id": 5,
    "title": "闭包的前世今生",
    "lastUpdated": "2019/2/1",
    "path": "/posts/JavaScript/closure.html"
  },
  {
    "excerpt": "   模块简述    模块（Modules）是使用不同方式加载的 JS 文件（与 JS 原先的脚本加载方式相对）。这种不同模式很有必要，因为它与脚本（script）有大大不同的语义：    - 模块代码自动运行在严格模式下，并且没有任何办法跳出严格模式；  - 在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模块顶级作用域的内部存在；  - 模块顶级作用域的 this......",
    "tags": [
      "es6+",
      "module"
    ],
    "id": 6,
    "title": "es6之模块笔记",
    "lastUpdated": "2019-01-20 23:00:03",
    "path": "/posts/es6+/%E6%A8%A1%E5%9D%97.html"
  },
  {
    "excerpt": " [[toc]]     如何学习css    如何学习css推荐这篇文章    [如何学习CSS](https://www.smashingmagazine.com/2019/01/how-to-learn-css/)    [中文版](https://juejin.im/post/5c447efa51882528735eedb2)     盒模型    HTML文档中的每个元素在渲染的......",
    "tags": [
      "css"
    ],
    "id": 7,
    "title": "css核心知识",
    "lastUpdated": "2019/1/8",
    "path": "/posts/css/css.html"
  },
  {
    "excerpt": " [[toc]]     面向对象的三大特性    - 封装  - 继承  - 多态     对象创建     方式一：字面量    ```      var obj11 = {name: 'smyh'};      var obj12 = new Object(name: `smyh`); //内置对象（内置的构造函数）  ```    上面的两种写法，效果是一样的。因为，第一种写......",
    "tags": [
      "JavaScript",
      "基础知识"
    ],
    "id": 8,
    "title": "对象、类和继承",
    "lastUpdated": "2018/11/10",
    "path": "/posts/JavaScript/object.html"
  },
  {
    "excerpt": " [[toc]]     数组的创建    数组的创建有三种方式：构造函数方式、字面量方式、ES6新增的Array.of()方法创建。    - 构造函数方式：      ```javascript    let arr = new Array(); // 创建一个空数组    let arr = new Array(10); // 创建长度为10的数组    let arr = new Ar......",
    "tags": [
      "JavaScript",
      "数组"
    ],
    "id": 9,
    "title": "数组总结",
    "lastUpdated": "2018/09/10",
    "path": "/posts/JavaScript/array.html"
  },
  {
    "excerpt": "  什么是跨域      域（Domain）是网络中独立运行的单位，域之间相互访问则需要建立信任关系（即Trust Relation）。信任关系是连接在域与域之间的桥梁。当一个域与其他域建立了信任关系后，2个域之间不但可以按需要相互进行管理，还可以跨网分配资源，使不同的域之间实现网络资源的共享与管理。跨域访问是指，没有建立信任关系的两个域之间通讯，但是由于安全原因，跨域访问是被各大浏览器所默......",
    "tags": [
      "开发环境",
      "跨域"
    ],
    "id": 10,
    "title": "前端跨域问题各种解决方案（开发环境中）",
    "lastUpdated": "2018-07-01 23:14:23",
    "path": "/posts/%E8%B7%A8%E5%9F%9F.html"
  },
  {
    "excerpt": "  组件：组件间通讯    ![enter image description here](http://images.gitbook.cn/08a931a0-ae67-11e7-8003-dd1d9d56caa7)    组件就像零散的积木，我们需要把这些积木按照一定的规则拼装起来，而且要让它们互相之间能进行通讯，这样才能构成一个有机的完整系统。    在真实的应用中，组件最终会构成树形结构......",
    "tags": [
      "vue",
      "angular",
      "组件"
    ],
    "id": 11,
    "title": "组件：通信 angular、vue组件间通信",
    "lastUpdated": "2018-06-04 23:35:45",
    "path": "/posts/component/%E7%BB%84%E4%BB%B6%EF%BC%9A%E7%BB%84%E4%BB%B6%E9%97%B4%E9%80%9A%E8%AE%AF.html"
  },
  {
    "excerpt": "  内容投影（Angular）    组件对应的模板代码是这样的：    ```html  <div class=\"panel panel-primary\">    <div class=\"panel-heading\">标题</div>    <div class=\"panel-body\">        内容    </div>    <div class=\"panel-footer\">  ......",
    "tags": [
      "vue",
      "前端框架",
      "angular"
    ],
    "id": 12,
    "title": "组件：插槽 Angular内容投影与Vue插槽",
    "lastUpdated": "2018-05-24 21:53:12",
    "path": "/posts/component/%E7%BB%84%E4%BB%B6%EF%BC%9A%E5%86%85%E5%AE%B9%E6%8A%95%E5%BD%B1%EF%BC%88Angular%EF%BC%89%E3%80%81%E6%8F%92%E6%A7%BD%EF%BC%88Vue%EF%BC%89.html"
  },
  {
    "excerpt": " [[toc]]     dom操作总结     节点查找API    > document.getElementById ：根据ID查找元素，大小写敏感，如果有多个结果，只返回第一个；  >  > document.getElementsByClassName ：根据类名查找元素，多个类名用空格分隔，返回一个 HTMLCollection 。注意兼容性为IE9+（含）。另外，不仅仅是d......",
    "tags": [
      "JavaScript",
      "DOM"
    ],
    "id": 13,
    "title": "DOM总结",
    "lastUpdated": "2018/05/10",
    "path": "/posts/JavaScript/dom.html"
  },
  {
    "excerpt": " 本文从依恋理论出发，首先剖析女性缺乏安全感的原因，然后以依恋理论为基础，探究安全感是什么，及其对于女生的四层意义，其次从四种依恋类型研究不同女生的安全感水平，再次批判了“安全感是自己给自己的”这一观念，最后对于男女生给出提高安全感及恋爱质量的建议。     1 为什么女生普遍缺乏安全感？  > 男人的极大幸运在于，他，不论在成年还是在小时候，必须踏上一条极为艰苦的道路，不过这又是一条最可......",
    "tags": [
      "心理学",
      "情感"
    ],
    "id": 14,
    "title": "女生需要的安全感究竟是什么？",
    "lastUpdated": "2018-05-01 20:10:23",
    "path": "/posts/psychology/safe.html"
  },
  {
    "excerpt": " 恋爱与婚姻的意义是什么？我们究竟想从恋爱与婚姻中得到什么？以下论文将告诉你答案。        该论文研究了美国婚姻变化的三个阶段，并对婚姻制度未来发展做出预测。美国婚姻第一个阶段是**制度化婚姻**，提供性交和繁衍后代的合理场所。从20世纪50年代开始，逐渐变成了一种基于**相互陪伴的关系**，双方是朋友恋人，男人赚钱女人顾家，最后发展成**个人式婚姻**，注重个人的成长和深层次的亲密感。  ......",
    "tags": [
      "翻译",
      "心理学",
      "情感"
    ],
    "id": 15,
    "title": "恋爱与婚姻的意义是什么？",
    "lastUpdated": "2018-03-04 19:17:53",
    "path": "/posts/psychology/marriage.html"
  },
  {
    "excerpt": "  1.原始类型和引用类型     1.1 什么是类型    **原始类型** 保存为简单数据值。 **引用类型** 保存为对象，其本质是指向内存位置的引用。    为了让开发者能够把原始类型和引用类型按相同的方式处理，JavaScript花费了很大的努力来保证语言的一致性。    其他编程语言用栈存原始类型，用堆存储引用类型。而JavaScript则完全不同：它使用一个变量对象追踪变量......",
    "tags": [
      "读书笔记",
      "JavaScript"
    ],
    "id": 16,
    "title": "《JavaScript面向对象精要》读书笔记",
    "lastUpdated": "2018-02-07 00:00:00",
    "path": "/posts/notes/%E3%80%8AJavaScript%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%B2%BE%E8%A6%81%E3%80%8B%E8%AF%BB%E4%B9%A6%E7%AC%94%E8%AE%B0.html"
  },
  {
    "excerpt": "  Angular 的概念模型    新版本的 Angular 的[核心概念](https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04.7qmzqn2wd)是什么呢？    非常简单，一切都是围绕着“组件”（ Component ）的概念展开的：    ![enter image description here](h......",
    "tags": [
      "angular",
      "前端框架"
    ],
    "id": 17,
    "title": "angular 核心概念： 组件、依赖注入、数据绑定",
    "lastUpdated": "2018-02-05 23:14:03",
    "path": "/posts/component/angular%20%E6%A0%B8%E5%BF%83%E6%A6%82%E5%BF%B5.html"
  },
  {
    "excerpt": " - 什么是 UI 组件的生命周期？  - Angular 组件的生命周期有什么特别的地方？  - OnPush 策略的使用方式。  - 脏检查的实现原理。     UI 组件的生命周期    ![enter image description here](http://images.gitbook.cn/e4cf9d10-af2d-11e7-b111-4d6e630f480d)    无论使......",
    "tags": [
      "vue",
      "前端框架",
      "angular",
      "组件"
    ],
    "id": 18,
    "title": "组件：生命周期钩子 angular、vue生命周期",
    "lastUpdated": "2018-02-02 04:10:03",
    "path": "/posts/component/%E7%BB%84%E4%BB%B6%EF%BC%9A%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E9%92%A9%E5%AD%90.html"
  },
  {
    "excerpt": "  编程范式    编程范式的英语是 programming paradigm，范即模范之意，范式即模式、方法，是一类典型的编程风格，是指从事软件工程的一类典型的风格（可以对照“方法学”一词）。编程语言发展到今天，出现了好多不同的代码编写方式，但不同的方式解决的都是同一个问题 。    下面是一张编程范式的图        ![面向对象](http://p8xb02d0d.bkt.cloud......",
    "tags": [
      "开发思想",
      "编程范式",
      "对象"
    ],
    "id": 19,
    "title": "基于类与原型的编程范式",
    "lastUpdated": "2017-12-23 19:58:03",
    "path": "/posts/%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1.html"
  },
  {
    "excerpt": "  一、背景知识：    对象与数组的字面量在 JS 中是最常用的两种表示法，并且感谢流行的 JSON 数据格式，它  们已成为这门语言中的格外重要的部分。定义对象与数组非常普遍，定义之后就能有条不紊  地从这些结构中提取出相关信息。为了简化提取信息的任务， ES6 新增了解构（  destructuring ），这是将一个数据结构分解为更小的部分的过程。本文介绍如何在对象与数  组上利用解构......",
    "tags": [
      "es6+",
      "JavaScript"
    ],
    "id": 20,
    "title": "解构赋值",
    "lastUpdated": "2017-12-10 20:40:33",
    "path": "/posts/es6+/%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC.html"
  },
  {
    "excerpt": " 一.需求讲解        1.理解需求背景      2.确认需求明确，无逻辑遗漏      3.确认所有的需求都有实现方案      4.合理预估时间      5.需求不明确或者是不清晰的点，可以当场提出来 ，或者是稍后整理      6.快速整理出未实现过功能，逻辑，技术点，可以和leader一起讨论交流方案      7.确认验收标准是否完善      8.确认Story优先级和粒度有......",
    "tags": [
      "开发思想"
    ],
    "id": 21,
    "title": "敏捷开发流程",
    "lastUpdated": "2017-11-02 19:58:03",
    "path": "/posts/%E6%95%8F%E6%8D%B7%E5%BC%80%E5%8F%91.html"
  },
  {
    "excerpt": " 从前有一段时间，因为世界全面战争，到处都在打战，这时有一批人就躲到一个山谷，他们在那儿定居下来，这地方山明水秀，简直在像世外桃源，与世隔绝，他们种菜和畜养猪、养牛，自立更生，完全不和外地来往。可是可怕的事却发生了。<!--more-->     这儿的人，眼睛慢慢地看不见，尤其是刚出生的小婴儿，几乎都看不见，他们也不知道为什么会这样。他们不知道怎么发生，以为是上天要惩罚他们，于是，他们便把金银财......",
    "tags": [
      "小说",
      "转载"
    ],
    "id": 22,
    "title": "country of blind 盲人国",
    "lastUpdated": "2016/12/10",
    "path": "/posts/reprint/country%20of%20blind.html"
  }
];