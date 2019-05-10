---
{
title: 组件：插槽 Angular内容投影与Vue插槽,
date: 2018-05-24 21:53:12,
tags: [vue, 前端框架,angular]
}
---

## 内容投影（Angular）

组件对应的模板代码是这样的：

```html
<div class="panel panel-primary">
  <div class="panel-heading">标题</div>
  <div class="panel-body">
      内容
  </div>
  <div class="panel-footer">
      底部
  </div>
</div>
```

### 投影一块内容

但是，你希望把面板里面的标题设计成可变的，让调用者能把这个标题传进来，而不是直接写死。这时候“内容投影”机制就可以派上用场了，我们可以这样来编写组件的模板：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
    <ng-content></ng-content>
  </div>
  <div class="panel-body">
      内容
  </div>
  <div class="panel-footer">
      底部
  </div>
</div>
```

<!--more--> 

请注意以上模板里面的 <ng-content></ng-content>，你看可以把它想象成一个占位符，我们用它来先占住一块空间，等使用方把参数传递进来之后，再用真实的内容来替换它。使用方可以这样来传递参数：

```html
<test-child-two>
    <h3>这是父层投影进来的内容</h3>
</test-child-two>
```

运行起来的效果是这样的：

![enter image description here](http://images.gitbook.cn/3bc89540-b1a9-11e7-a796-5fbad02195f1)

可以看到，标题的部分是由使用方从外部传递进来的。

### 投影多块内容

接着，问题又来了，你不仅希望面板的标题部分是动态的，你还希望面板的主体区域和底部区域全部都是动态的，应该怎么实现呢？

你可以这样编写组件的模板：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
      <ng-content select="h3"></ng-content>
  </div>
  <div class="panel-body">
      <ng-content select=".my-class"></ng-content>
  </div>
  <div class="panel-footer">
      <ng-content select="p"></ng-content>
  </div>
</div>
```

然后使用方可以这样来使用你所编写的组件：

```html
<test-child-two>
    <h3>这是父层投影进来的内容</h3>
    <p class="my-class">利用CSS选择器</p>
    <p>这是底部内容</p>
</test-child-two>
```

运行起来的效果是这样的：

![enter image description here](http://images.gitbook.cn/5b418760-b1a9-11e7-a56a-2b0687e97e1c)

你可能已经猜出来了，<ng-content></ng-content> 里面的那个 select 参数，其作用和 CSS 选择器非常类似。

这种投影多块内容的方式叫“多插槽模式”（ multi-slot ），你可以把 <ng-content></ng-content> 想象成一个一个的插槽，内容会被插入到这些插槽里面。

### 投影一个复杂的组件

到这里还没完，你不仅仅想投影简单的 HTML 标签到子层组件里面，你还希望把自己编写的一个组件投影进去，那又应该怎么办呢？

请看：

```html
<div class="panel panel-primary">
  <div class="panel-heading">
      <ng-content select="h3"></ng-content>
  </div>
  <div class="panel-body">
      <ng-content select="test-child-three"></ng-content>
  </div>
  <div class="panel-footer">
      <ng-content select="p"></ng-content>
  </div>
</div>
```

使用方可以这样来使用这个组件：

```html
<test-child-two>
    <h3>这是父层投影进来的内容</h3>
    <test-child-three (sayhello)="doSomething()"></test-child-three>
    <p>这是底部内容</p>
</test-child-two>
```

运行起来的效果是这样的：

![enter image description here](http://images.gitbook.cn/8736e2c0-b1a9-11e7-b94f-7986eefa7bc7)

请注意 <ng-content select="test-child-three"></ng-content> 里面的内容，你把 select 属性设置成了子组件的名称。

同时，对于被投影的组件 <test-child-three></test-child-three> 来说，我们同样可以利用小圆括号的方式来进行事件绑定，就像上面例子里的 (sayhello)="doSomething()" 这样。

### 内容投影这个特性存在的意义是什么？

如果没有“内容投影”特性我们也能活得很好，那么它就没有存在的必要了，而事实并非如此，如果没有“内容投影”，有些事情我们就没法做了，典型的有两类：

- 组件标签不能嵌套使用。
- 不能优雅地包装原生的 HTML 标签。

依次解释如下：

比如你自己编写了两个组件 my-comp-1 和 my-comp-2，如果没有内容投影，这两个组件就没办法嵌套使用，比如你想这样用就不行：

```html
<my-comp-1>
    <my-comp-2></my-comp-2>
</my-comp-1>
```

因为没有“内容投影”机制，my-comp-1 无法感知到 my-comp-2 的存在，也无法和它进行交互。这明显有违 HTML 设计的初衷，因为 HTML 的本质是一种 XML 格式，标签能嵌套是最基本的特性，原生的 HTML 本身就有很多嵌套的情况：

```html
<ul>
  <li>神族</li>
  <li>人族</li>
  <li>虫族</li>
</ul>
```

在真实的业务开发里面，另一个典型的嵌套组件就是 Tab 页，以下代码是很常见的：

```html
<tab>
    <pane title="第一个标签页"/>
    <pane title="第二个标签页"/>
    <pane title="第三个标签页"/>
</tab>
```

如果没有内容投影机制，想要这样嵌套地使用自定义标签也是不可能的。

内容投影存在的第二个意义与组件的封装有关。

虽然 Angular 提供了 @Component 装饰器让开发者可以自定义标签，但是请不要忘记，自定义标签毕竟与 HTML 原生标签不一样，原生 HTML 标签上面默认带有很多属性、事件，而你自己定义标签是没有的。原生 HTML 标签上面暴露的属性和事件列表[请参见 W3C 的规范](https://www.w3schools.com/tags/ref_attributes.asp)。

从宏观的角度看，所有的自定义标签都只不过是一层“虚拟的壳子”，浏览器并不认识自定义标签，真正渲染出来的还是 div、form、input 之类的原生标签。所以，自定义标签只不过是一层逻辑上的抽象和包装，让人类更容易理解和组织自己的代码而已。

既然如此，自定义标签和 HTML 原生标签之间的关系是什么呢？本质上说，这是“装饰模式”的一种应用，而内容投影存在的意义就是可以让这个“装饰”的过程做得更加省力、更加优雅一些。



## 内容分发slot插槽(Vue)

为了让组件可以组合，需要一种方式来混合父组件的内容与子组件自己的模板。这个过程被称为 **内容分发** (或 “transclusion” )。Vue实现了一个内容分发 API，参照了当前 Web 组件规范草案，使用特殊的 `<slot>` 元素作为原始内容的插槽。

### 编译作用域

  在深入内容分发 API 之前，先明确内容在哪个作用域里编译。假定模板为

```js
<child-component>
  {{ message }}
</child-component>
```

  `message`应该绑定到父组件的数据，还是绑定到子组件的数据？答案是父组件。组件作用域简单地说是：父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

  一个常见错误是试图在父组件模板内将一个指令绑定到子组件的属性/方法：

```js
<!-- 无效 -->
<child-component v-show="someChildProperty"></child-component>
```

  假定`someChildProperty`是子组件的属性，上例不会如预期工作。父组件模板不应该知道子组件的状态

  如果要绑定作用域内的指令到一个组件的根节点，应当在组件自己的模板上做：

```js
Vue.component('child-component', {
  // 有效，因为是在正确的作用域内
  template: '<div v-show="someChildProperty">Child</div>',
  data: function () {
    return {
      someChildProperty: true
    }
  }
})
```

  类似地，分发内容是在父作用域内编译

### 默认丢弃

  一般地，如果子组件模板不包含`<slot>`插口，父组件的内容将会被**丢弃**

```js
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p>测试内容</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

```js
<div id="example">
  <parent></parent>
</div>
<script src="https://unpkg.com/vue"></script>
<script>
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
  </div>
  `,
};
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p>测试内容</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
// 创建根实例
new Vue({
  el: '#example',
  components: {
    'parent': parentNode
  }
})
</script>
```

  如下图所示，<child>所包含的<p>测试内容</p>被丢弃

![vue_components_slot1](https://pic.xiaohuochai.site/blog/vue_components_slot1.png)

 

### 内联模板

  如果子组件有 `inline-template` 特性，组件将把它的内容当作它的模板，而忽略真实的模板内容

  但是 `inline-template` 让模板的作用域难以理解

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
  </div>
  `,
};
```

```js
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child inline-template>
      <p>测试内容</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

![vue_components_slot2](https://pic.xiaohuochai.site/blog/vue_components_slot2.png)

 

### 匿名slot

  当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot></slot>
  </div>
  `,
};
```

```
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p>测试内容</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

![vue_components_slot3](https://pic.xiaohuochai.site/blog/vue_components_slot3.png)

  如果出现多于1个的匿名slot，vue将报错

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot></slot>
    <slot></slot>
  </div>
  `,
};
```

![vue_components_slot4](https://pic.xiaohuochai.site/blog/vue_components_slot4.png)

【默认值】

  最初在 <slot> 标签中的任何内容都被视为**备用内容**，或者称为默认值。备用内容在子组件的作用域内编译，并且只有在宿主元素为空，且没有要插入的内容时才显示备用内容

  当slot存在默认值，且父元素在<child>中没有要插入的内容时，显示默认值

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot><p>我是默认值</p></slot>
  </div>
  `,
};
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child></child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

![vue_components_slot5](https://pic.xiaohuochai.site/blog/vue_components_slot5.png)

  当slot存在默认值，且父元素在<child>中存在要插入的内容时，则显示设置值

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot><p>我是默认值</p></slot>
  </div>
  `,
};
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p>我是设置值</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

![vue_components_slot6](https://pic.xiaohuochai.site/blog/vue_components_slot6.png)

 

### 具名Slot

  <slot> 元素可以用一个特殊的属性 `name` 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 `slot` 特性的元素

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot name="my-header">头部默认值</slot>
    <slot name="my-body">主体默认值</slot>
    <slot name="my-footer">尾部默认值</slot>
  </div>
  `,
};
```

```js
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p slot="my-header">我是头部</p>
      <p slot="my-footer">我是尾部</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

![vue_components_slot7](https://pic.xiaohuochai.site/blog/vue_components_slot7.png)

  仍然可以有一个匿名 slot，它是**默认 slot**，作为找不到匹配的内容片段的备用插槽。匿名slot只能作为没有slot属性的元素的插槽，有slot属性的元素如果没有配置slot，则会被抛弃

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot name="my-body">主体默认值</slot>
    <slot></slot>
  </div>
  `,
};
```

```js
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p slot="my-body">我是主体</p>
      <p>我是其他内容</p>
      <p slot="my-footer">我是尾部</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

`<p slot="my-body">`插入`<slot name="my-body">`中，

`<p>`我是其他内容`</p>`插入`<slot>`中，
​    而`<p slot="my-footer">`被丢弃

![vue_components_slot8](https://pic.xiaohuochai.site/blog/vue_components_slot8.png)

  如果没有默认的 slot，这些找不到匹配的内容片段也将被抛弃

```js
var childNode = {
  template: `
  <div class="child">
    <p>子组件</p>
    <slot name="my-body">主体默认值</slot>
  </div>
  `,
};
```

```js
var parentNode = {
  template: `
  <div class="parent">
    <p>父组件</p>
    <child>
      <p slot="my-body">我是主体</p>
      <p>我是其他内容</p>
      <p slot="my-footer">我是尾部</p>
    </child>
  </div>
  `,
  components: {
    'child': childNode
  },
};
```

`<p>` 我是其他内容 `</p>`

和`<p slot="my-footer">`都被抛弃

![vue_components_slot9](https://pic.xiaohuochai.site/blog/vue_components_slot9.png)

 

