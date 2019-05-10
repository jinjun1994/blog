---
{
title: 一篇文章掌握所有 vue 组件通信方法,
date: 2019-03-01 04:10:03,
tags: [vue, 前端框架]
}
---

太长不看版：

prop、slot、event 是 vue 组件通信的核心方法，全局的可以使用总线 bus 和 vuex 。祖孙组件通信为了避免 props 穿透而引入 inheritAttrs 、 $attrs 和 $listener。组件实例获取可以通过 ref 、$parent、$children，派发和广播已经废弃，可以自行实现。还可以使用自定义方法找到任意组件实例，provide/inject 依赖注入组件库使用较多，不推荐业务代码中写。

## 什么是组件

视图按照功能，切分为若干基本单元，所得的东西就可以称为组件，而组件又可以一级一级组合而成复合组件，从而在整个应用的规模上，形成一棵倒置的组件树。一个个组件就像零散的积木，我们需要把这些积木按照一定的规则拼装起来，把而且要让它们**互相之间能进行通讯，这样才能构成一个有机的完整系统**。

不同关系的组件通信方式有所不同。

## 组件的分类

- 纯展示型的组件，数据进，DOM出，直观明了
- 接入型组件，在 React 场景下的 container component，这种组件会跟数据层的service打交道，会包含一些跟服务器或者说数据源打交道的逻辑，container 会把数据向下传递给展示型组件
- 交互型组件，典型的例子是对于表单组件的封装和加强，大部分的组件库都是以交互型组件为主，比如说Element UI，特点是有比较复杂的交互逻辑，但是是比较通用的逻辑，强调组件的复用
- 功能型组件，以 Vue 的应用场景举例，路由的 router-view 组件、transition 组件，本身并不渲染任何内容，是一个逻辑型的东西，作为一种扩展或者是抽象机制存在

## 前端组件化开发理念：

1. 页面上的每个 **独立的** 可视/可交互区域视为一个组件；
2. **每个组件对应一个工程目录**，组件所需的各种资源都在这个目录下**就近维护**；
3. 由于组件具有独立性，因此组件与组件之间可以 **自由组合**；
4. 页面只不过是组件的容器，负责组合组件形成功能完整的界面；
5. 当不需要某个组件，或者想要替换组件时，可以整个目录删除/替换。

## 组件的核心

一个再复杂的组件，都是由三部分组成的：prop、event、slot，它们构成了 Vue.js 组件的 API。如果你开发的是一个通用组件，那一定要事先设计好这三部分，因为组件一旦发布，后面再修改 API 就很困难了，使用者都是希望不断新增功能，修复 bug，而不是经常变更接口。如果你阅读别人写的组件，也可以从这三个部分展开，它们可以帮助你快速了解一个组件的所有功能。

#### 属性 prop

prop 定义了这个组件有哪些可配置的属性，组件的核心功能也都是它来确定的。写通用组件时，props 最好用对象的写法，这样可以针对每个属性设置类型、默认值或自定义校验属性的值，这点在组件开发中很重要，然而很多人却忽视，直接使用 props 的数组用法，这样的组件往往是不严谨的。

#### 插槽 slot

插槽 slot，它可以分发组件的内容。和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：

```
<alert-box>
  Something bad happened.
</alert-box>
```



可能会渲染出这样的东西：

```
Error!Something bad happended.
```



幸好，Vue 自定义的 元素让这变得非常简单：

```
Vue.component('alert-box', {
  template: `
    <div class="demo-alert-box">
      <strong>Error!</strong>
      <slot></slot>
    </div>
  `
})
```



如你所见，我们只要在需要的地方加入插槽就行了——就这么简单！

#### 自定义事件 event

两种写法：

- 在组件内部自定义事件event

  ```js
  <template>
    <button @click="handleClick">
      <slot></slot>
    </button>
  </template>
  <script>
    export default {
      methods: {
        handleClick (event) {
          this.$emit('on-click', event);
        }
      }
    }
  </script>
  ```

通过 $emit，就可以触发自定义的事件 on-click ，在父级通过 @on-click 来监听：

```
<i-button @on-click="handleClick"></i-button>
```



- 用事件修饰符 .native直接在父级声明

  所以上面的示例也可以这样写：

  ```
  <i-button @click.native="handleClick"></i-button>
  ```

 .native 是 监听组件根元素的原生事件

## 组件的结构

在真实的应用中，组件最终会构成树形结构，就像人类社会中的家族树一样：

![](https://img.dubiqc.com/picgo/20190318103439.png)

在树形结构里面，组件之间有几种典型的关系：父子关系、兄弟关系、祖孙关系、没有直接关系。

![](https://img.dubiqc.com/picgo/20190318113004.png)

A 和 B、B 和 C、B 和 D 都是父子关系，C 和 D 是兄弟关系，A 和 C 是祖孙关系（可能隔多代）。

不同关系的组件通信方式有所不同，相应地，vue 中组件之间有以下几种典型的通讯方案：

| 直接的父子关系                          | 兄弟关系 | 没有直接关系 |
| :-------------------------------------- | -------- | ------------ |
| 父组件向子组件传递数据通过prop传递      |          |              |
| 子组件传递数据给父组件通过$emit触发事件 |          |              |
|                                         |          |              |
|                                         |          |              |
|                                         |          |              |



### 直接的父子关系：

- 父组件向子组件传递数据通过prop传递
- 子组件传递数据给父组件通过$emit触发事件
- 父组件通过 ref 直接访问子组件实例的属性和方法
- 通过`$parent` / `$children`：访问父 / 子实例

### 祖孙关系

- $attrs和$listeners  
- 利用 provide / inject ，向所有子孙后代注入依赖
- $boradcast和$dispatch  

### 没有直接关系：

- 借助于中央事件总线  event bus 进行通讯。
- 利用 vuex 进行通讯。
- 利用 cookie 和 localstorage 进行通讯。
- 利用 session 进行通讯。

另外还可以使用工具函数找到任意组件实例进行通信

无论你使用什么前端框架，组件之间的通讯都离开不以上几种方案，这些方案与具体框架无关。

## 组件通信方式

### **1. props和$emit**

父组件向子组件传递数据是通过prop传递的，子组件传递数据给父组件是通过$emit触发自定义事件来做到的。

```js
Vue.component('child',{
        data(){
            return {
                mymessage:this.message
            }
        },
        template:`
            <div>
                <input type="text" v-model="mymessage" @input="passData(mymessage)"> </div>
        `,
        props:['message'],//得到父组件传递过来的数据
        methods:{
            passData(val){
                //触发父组件中的事件
                this.$emit('getChildData',val)
            }
        }
    })
    Vue.component('parent',{
        template:`
            <div>
                <p>this is parent compoent!</p>
                <child :message="message" v-on:getChildData="getChildData"></child>
            </div>
        `,
        data(){
            return {
                message:'hello'
            }
        },
        methods:{
            //执行子组件触发的事件
            getChildData(val){
                console.log(val)
            }
        }
    })
    var app=new Vue({
        el:'#app',
        template:`
            <div>
                <parent></parent>
            </div>
        `
    })
```

在上面的例子中，有父组件parent和子组件child。 

- 父组件传递了message数据给子组件，并且通过v-on绑定了一个getChildData事件来监听子组件的触发事件； 
- 子组件通过props得到相关的message数据,最后通过this.$emit触发了getChildData事件。

### 2. ref 、$parent 以及 $children

- ref：给元素或组件注册引用信息；
- $parent / $[children](https://cn.vuejs.org/v2/api/#vm-children)：访问父 / 子实例。

用 ref 来访问组件（部分代码省略）：

```js
// component-a
export default {
  data () {
    return {
      title: 'Vue.js'
    }
  },
  methods: {
    sayHello () {
      window.alert('Hello');
    }
  }
}
```



```js
<template>
  <component-a ref="comA"></component-a>
</template>
<script>
  export default {
    mounted () {
      const comA = this.$refs.comA;
      console.log(comA.title);  // Vue.js
      comA.sayHello();  // 弹窗
    }
  }
</script>
```

$parent 和 $children 类似，也是基于当前上下文访问父组件或全部子组件的。

 [vm.parent](https://cn.vuejs.org/v2/api/#parent)指定已创建的实例之父实例，在两者之间建立父子关系。子实例可以用 `this.$parent` 访问父实例，子实例被推入父实例的 `$children` 数组中。

节制地使用 `$parent` 和 `$children` - 它们的主要目的是作为访问组件的应急方法。更推荐用 props 和 events 实现父子组件通信

 [vm.$children ](https://cn.vuejs.org/v2/api/#vm-children)当前实例的直接子组件。



这两种方法的弊端是，无法在跨级或兄弟间通信，比如下面的结构：

```
// parent.vue
<component-a></component-a>
<component-b></component-b>
<component-b></component-b>
```



我们想在 component-a 中，访问到引用它的页面中（这里就是 parent.vue）的两个 component-b 组件，那这种情况下,是暂时无法实现的，后面会讲解到方法。

### **3.$attrs和$listeners**

前面两种方式处理父子组件之间的数据传输有一个问题：如果父组件A下面有子组件B，组件B下面有组件C,这时如果组件A想传递数据给组件C怎么办呢？ 
如果采用第一种方法，我们必须让组件A通过prop传递消息给组件B，组件B在通过prop传递消息给组件C；要是组件A和组件C之间有更多的组件，那采用这种方式就很复杂了。Vue 2.4开始提供了$attrs和$listeners来解决这个问题，能够让组件A之间传递消息给组件C。

```js
Vue.component('C',{
        template:`
            <div>
                <input type="text" v-model="$attrs.messagec" @input="passCData($attrs.messagec)"> </div>
        `,

        methods:{
            passCData(val){
                //触发父组件A中的事件
                this.$emit('getCData',val)
            }
        }
    })

    Vue.component('B',{
        data(){
            return {
                mymessage:this.message
            }
        },
        template:`
            <div>
                <input type="text" v-model="mymessage" @input="passData(mymessage)"> 
                <!-- C组件中能直接触发getCData的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
                <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
                <C v-bind="$attrs" v-on="$listeners"></C>
            </div>
        `,
        props:['message'],//得到父组件传递过来的数据
        methods:{
            passData(val){
                //触发父组件中的事件
                this.$emit('getChildData',val)
            }
        }
    })
    Vue.component('A',{
        template:`
            <div>
                <p>this is parent compoent!</p>
                <B :messagec="messagec" :message="message" v-on:getCData="getCData" v-on:getChildData="getChildData(message)"></B>
            </div>
        `,
        data(){
            return {
                message:'hello',
                messagec:'hello c' //传递给c组件的数据
            }
        },
        methods:{
            getChildData(val){
                console.log('这是来自B组件的数据')
            },
            //执行C子组件触发的事件
            getCData(val){
                console.log("这是来自C组件的数据："+val)
            }
        }
    })
    var app=new Vue({
        el:'#app',
        template:`
            <div>
                <A></A>
            </div>
        `
    })
```

详细可参考<https://juejin.im/post/5ae4288a5188256712784787>

### 4. provide / inject

前面几种方法，如果祖孙隔代太远就不好用了。可以使用一种无依赖的组件通信方法：Vue.js 内置的 provide / inject 接口。

provide / inject 是 Vue.js 2.2.0 版本后新增的 API，在文档中这样介绍 ：
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。如果你熟悉 React，这与 React 的上下文特性很相似。
provide 和 inject 主要为高阶插件/组件库提供用例。并不推荐直接用于应用程序代码中。
假设有两个组件： A.vue 和 B.vue，B 是 A 的子组件:

```
// A.vue
export default {
  provide: {
    name: 'Aresn'
  }
}

// B.vue
export default {
  inject: ['name'],
  mounted () {
    console.log(this.name);  // Aresn
  }
}
```



需要注意的是：
provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

只要一个组件使用了 provide 向下提供数据，那其下所有的子组件都可以通过 inject 来注入，不管中间隔了多少代，而且可以注入多个来自不同父级提供的数据。需要注意的是，一旦注入了某个数据，那这个组件中就不能再声明 这个数据了，因为它已经被父级占有。

provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。然后有两种场景它不能很好的解决：

- 父组件向子组件（支持跨级）传递数据；
- 子组件向父组件（支持跨级）传递数据。

这种父子（含跨级）传递数据的通信方式，Vue.js 并没有提供原生的 API 来支持，下面介绍一种在父子组件间通信的方法 dispatch 和 broadcast。

### 5. $boradcast和$dispatch

在 Vue.js 1.x 中，提供了两个方法：`$dispatch` 和 `$broadcast` ，前者用于向上级派发事件，只要是它的父级（一级或多级以上），都可以在组件内通过 `$on` （或 events，2.x 已废弃）监听到，后者相反，是由上级向下级广播事件的。这两个方法虽然看起来很好用，但是在 Vue.js 2.x 中都废弃了，官方给出的解释是：

> 因为基于组件树结构的事件流方式有时让人难以理解，并且在组件结构扩展的过程中会变得越来越脆弱。

很多开源软件都自己封装了这种方式，比如element ui和iview等。 

我们可以自行实现 dispatch 和 broadcast 方法，具有以下功能：

- 在子组件调用 dispatch 方法，向上级指定的组件实例（最近的）上触发自定义事件，并传递数据，且该上级组件已预先通过 `$on` 监听了这个事件；
- 相反，在父组件调用 broadcast 方法，向下级指定的组件实例（最近的）上触发自定义事件，并传递数据，且该下级组件已预先通过 `$on` 监听了这个事件。

实现这对方法的关键点在于，如何正确地向上或向下找到对应的组件实例，并在它上面触发方法。在设计一个新功能（features）时，可以先确定这个功能的 API 是什么，也就是说方法名、参数、使用样例，确定好 API，再来写具体的代码。

因为 Vue.js 内置的方法，才是以 `$` 开头的，比如 `$nextTick`、`$emit` 等，为了避免不必要的冲突并遵循规范，这里的 dispatch 和 broadcast 方法名前不加 `$`。并且该方法可能在很多组件中都会使用，复用起见，我们封装在混合（mixins）里。那它的使用样例可能是这样的：

```js
// 部分代码省略
import Emitter from '../mixins/emitter.js'

export default {
  mixins: [ Emitter ],
  methods: {
    handleDispatch () {
      this.dispatch();  // ①
    },
    handleBroadcast () {
      this.broadcast();  // ②
    }
  }
}
```

上例中行 ① 和行 ② 的两个方法就是在导入的混合 **emitter.js** 中定义的，这个稍后我们再讲，先来分析这两个方法应该传入什么参数。一般来说，为了跟 Vue.js 1.x 的方法一致，第一个参数应当是自定义事件名，比如 “test”，第二个参数是传递的数据，比如 “Hello, Vue.js”，但在这里，有什么问题呢？只通过这两个参数，我们没办法知道要在哪个组件上触发事件，因为自行实现的这对方法，与 Vue.js 1.x 的原生方法机理上是有区别的。上文说到，实现这对方法的关键点在于准确地**找到组件实例**。那在寻找组件实例上，我们的“惯用伎俩”就是通过遍历来匹配组件的 `name` 选项，在独立组件（库）里，每个组件的 `name` 值应当是唯一的，name 主要用于递归组件，在后面小节会单独介绍。

先来看下 **emitter.js** 的代码：

```js
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    const name = child.$options.name;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat([params]));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      let parent = this.$parent || this.$root;
      let name = parent.$options.name;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.name;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
};
```

因为是用作 mixins 导入，所以在 methods 里定义的 dispatch 和 broadcast 方法会被混合到组件里，自然就可以用 `this.dispatch` 和 `this.broadcast` 来使用。

这两个方法都接收了三个参数，第一个是组件的 `name` 值，用于向上或向下递归遍历来寻找对应的组件，第二个和第三个就是上文分析的自定义事件名称和要传递的数据。

可以看到，在 dispatch 里，通过 *while* 语句，不断向上遍历更新当前组件（即上下文为当前调用该方法的组件）的父组件实例（变量 parent 即为父组件实例），直到匹配到定义的 `componentName` 与某个上级组件的 `name` 选项一致时，结束循环，并在找到的组件实例上，调用 `$emit` 方法来触发自定义事件 `eventName`。broadcast 方法与之类似，只不过是向下遍历寻找。

来看一下具体的使用方法。有 **A.vue** 和 **B.vue** 两个组件，其中 B 是 A 的子组件，中间可能跨多级，在 A 中向 B 通信：

```
<!-- A.vue -->
<template>
	<button @click="handleClick">触发事件</button>
</template>
<script>
  import Emitter from '../mixins/emitter.js';
  
  export default {
    name: 'componentA',
    mixins: [ Emitter ],
    methods: {
      handleClick () {
        this.broadcast('componentB', 'on-message', 'Hello Vue.js');
      }
    }
  }
</script>
// B.vue
export default {
  name: 'componentB',
  created () {
    this.$on('on-message', this.showMessage);
  },
  methods: {
    showMessage (text) {
      window.alert(text);
    }
  }
}
```

同理，如果是 B 向 A 通信，在 B 中调用 dispatch 方法，在 A 中使用 $on 监听事件即可。

以上就是自行实现的 dispatch 和 broadcast 方法，相比 Vue.js 1.x，有以下不同：

- 需要额外传入组件的 name 作为第一个参数；
- 无冒泡机制；
- 第三个参数传递的数据，只能是一个（较多时可以传入一个对象），而 Vue.js 1.x 可以传入多个参数，当然，你对 emitter.js 稍作修改，也能支持传入多个参数，只是一般场景传入一个对象足以。

### 6.找到任意组件实例——findComponents 系列方法

前面我们已经介绍了两种组件间通信的方法：provide / inject 和 dispatch / broadcast。它们有各自的使用场景和局限，比如前者多用于子组件获取父组件的状态，后者常用于父子组件间通过自定义事件通信。

现在将介绍第 3 种组件通信方法，也就是自行实现 findComponents 系列方法，以工具函数的形式来使用，它是一系列的函数，可以说是组件通信的终极方案。findComponents 系列方法最终都是返回组件的实例，进而可以读取或调用该组件的数据和方法。

它适用于以下场景：

- 由一个组件，向上找到最近的指定组件；
- 由一个组件，向上找到所有的指定组件；
- 由一个组件，向下找到最近的指定组件；
- 由一个组件，向下找到所有指定的组件；
- 由一个组件，找到指定组件的兄弟组件。

5 个不同的场景，对应 5 个不同的函数，实现原理也大同小异。都是通过递归、遍历，找到指定组件的 `name` 选项匹配的组件实例并返回。

#### 向上找到最近的指定组件——findComponentUpward

先看代码：

```
// assist.js
// 由一个组件，向上找到最近的指定组件
function findComponentUpward (context, componentName) {
  let parent = context.$parent;
  let name = parent.$options.name;

  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}
export { findComponentUpward };
```

findComponentUpward 接收两个参数，第一个是当前上下文，比如你要基于哪个组件来向上寻找，一般都是基于当前的组件，也就是传入 `this`；第二个参数是要找的组件的 `name` 。

该方法会在 while 语句里不断向上覆盖当前的 `parent` 对象，通过判断组件（即 parent）的 name 与传入的 componentName 是否一致，直到直到最近的一个组件为止。

与 dispatch 不同的是，该方法是直接拿到组件的实例，而非通过事件通知组件。只会找到最近的一个组件实例，如果要找到全部符合要求的组件，就需要用到下面的这个方法。

#### 向上找到所有的指定组件——findComponentsUpward

代码如下：

```
// assist.js
// 由一个组件，向上找到所有的指定组件
function findComponentsUpward (context, componentName) {
  let parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  } else {
    return [];
  }
}
export { findComponentsUpward };
```

与 findComponentUpward 不同的是，findComponentsUpward 返回的是一个数组，包含了所有找到的组件实例（注意函数名称中多了一个“s”）。

该方法的使用场景较少，一般只用在递归组件里面，因为这个函数是一直向上寻找父级（parent）的，只有递归组件的父级才是自身。

#### 向下找到最近的指定组件——findComponentDownward

代码如下：

```
// assist.js
// 由一个组件，向下找到最近的指定组件
function findComponentDownward (context, componentName) {
  const childrens = context.$children;
  let children = null;

  if (childrens.length) {
    for (const child of childrens) {
      const name = child.$options.name;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}
export { findComponentDownward };
```

`context.$children` 得到的是当前组件的全部子组件，所以需要遍历一遍，找到有没有匹配到的组件 `name`，如果没找到，继续递归找每个 $children 的 $children，直到找到最近的一个为止。



#### 向下找到所有指定的组件——findComponentsDownward

如果要向下找到所有的指定组件，要用到 findComponentsDownward 函数，代码如下：

```
// assist.js
// 由一个组件，向下找到所有指定的组件
function findComponentsDownward (context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChilds = findComponentsDownward(child, componentName);
    return components.concat(foundChilds);
  }, []);
}
export { findComponentsDownward };
```

这个函数实现的方式有很多，这里巧妙使用 `reduce` 做累加器，并用递归将找到的组件合并为一个数组并返回，代码量较少，但理解起来稍困难。

#### 找到指定组件的兄弟组件——findBrothersComponents

代码如下：

```
// assist.js
// 由一个组件，找到指定组件的兄弟组件
function findBrothersComponents (context, componentName, exceptMe = true) {
  let res = context.$parent.$children.filter(item => {
    return item.$options.name === componentName;
  });
  let index = res.findIndex(item => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}
export { findBrothersComponents };
```

相比其它 4 个函数，findBrothersComponents 多了一个参数 `exceptMe`，是否把本身除外，默认是 true。寻找兄弟组件的方法，是先获取 `context.$parent.$children`，也就是父组件的全部子组件，这里面当前包含了本身，所有也会有第三个参数 exceptMe。Vue.js 在渲染组件时，都会给每个组件加一个内置的属性 `_uid`，这个 _uid 是不会重复的，借此我们可以从一系列兄弟组件中把自己排除掉。

###  7.事件总线（EventBus）

在Vue中可以使用`EventBus`来作为沟通桥梁的概念，就像是所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，所以组件都可以上下平行地通知其他组件。

新建一个Vue事件bus对象，然后通过bus.$emit触发事件，bus.$on监听触发的事件。

```js
Vue.component('brother1',{
        data(){
            return {
                mymessage:'hello brother1'
            }
        },
        template:`
            <div>
                <p>this is brother1 compoent!</p>
                <input type="text" v-model="mymessage" @input="passData(mymessage)"> 

            </div>
        `,
        methods:{
            passData(val){
                //触发全局事件globalEvent
                bus.$emit('globalEvent',val)

            }
        }
    })
    Vue.component('brother2',{
        template:`
            <div>
                <p>this is brother2 compoent!</p>
                <p>brother1传递过来的数据：{{brothermessage}}</p>
            </div>
        `,
        data(){
            return {
                mymessage:'hello brother2',

                brothermessage:''
            }
        },
        mounted(){
            //绑定全局事件globalEvent
            bus.$on('globalEvent',(val)=>{
                this.brothermessage=val;
            })
        }
    })
    //中央事件总线
    var bus=new Vue();

    var app=new Vue({
        el:'#app',
        template:`
            <div>
                <brother1></brother1>
                <brother2></brother2>
            </div>
        `
    })
```

对于全局的事件还有一处简单的写法，即利用 $root 元素：

vm.$root 是当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

```
this.$root.$emit('event', 'params')

// 在另一个组件内
this.$root.$on('event, function(params){})
```

### 8.vuex

[Vuex](https://vuex.vuejs.org/zh/) 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏：

- 多个视图依赖于同一状态。
- 来自不同视图的行为需要变更同一状态。

对于问题一，传参的方法对于多层嵌套的组件将会非常繁琐，并且对于兄弟组件间的状态传递无能为力。对于问题二，我们经常会采用父子组件直接引用或者通过事件来变更和同步状态的多份拷贝。以上的这些模式非常脆弱，通常会导致无法维护的代码。

我们可以把组件的共享状态抽取出来，以一个全局单例模式管理呢。在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

另外，通过定义和隔离状态管理中的各种概念并强制遵守一定的规则，我们的代码将会变得更结构化且易维护。

这就是 Vuex 背后的基本思想，借鉴了 [Flux](https://facebook.github.io/flux/docs/overview.html)、[Redux](http://redux.js.org/) 和 [The Elm Architecture](https://guide.elm-lang.org/architecture/)。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。

### 9. 利用 cookie 或者 localstorage 进行通讯

![](https://img.dubiqc.com/picgo/20190318143701.png-sign)

示例代码片段：

```
window.localStorage.setItem("json",JSON.stringify({name:'金俊',age:18}));

var json=window.localStorage.getItem("json");
// window.localStorage.removeItem("json");
var obj=JSON.parse(json);
console.log(obj.name);
console.log(obj.age);
```

cookie、localstorage 这些东西都可以直接用原生的 API 进行操作。

### 10 利用 session 进行通讯

![](https://img.dubiqc.com/picgo/20190318143723.png-sign)

参考资料：

 [单页应用的数据流方案探索](https://zhuanlan.zhihu.com/p/26426054)

 [前端工程——基础篇](https://github.com/fouber/blog/issues/10)

 [不吹不黑聊聊前端框架--尤雨溪知乎Live整理](https://juejin.im/entry/5a064a716fb9a045117099ad)