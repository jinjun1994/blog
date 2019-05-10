---
{
title: angular 核心概念： 组件、依赖注入、数据绑定,
date: 2018-02-05 23:14:03,
tags: [angular, 前端框架]
}
---

### Angular 的概念模型

新版本的 Angular 的[核心概念](https://vsavkin.com/the-core-concepts-of-angular-2-c3d6cbe04d04#.7qmzqn2wd)是什么呢？

非常简单，一切都是围绕着“组件”（ Component ）的概念展开的：

![enter image description here](http://images.gitbook.cn/e0c611d0-acb3-11e7-9ec8-4915d3122415)

- Component（组件）是整个框架的核心，也是终极目标。“组件化”的意义有2个：第一是分治，因为有了组件之后，我们可以把各种逻辑封装在组件内部，避免混在一起；第二是复用，封装成组件之后不仅可以在项目内部复用，而且可以沉淀下来跨项目复用。
- NgModule（模块）是组织业务代码的利器，按照你自己的业务场景，把组件、服务、路由打包到模块里面，形成一个个的积木块，然后再用这些积木块来搭建出高楼大厦。https://angular.cn/guide/ngmodules
- Router（路由）的角色也非常重要，它有3个重要的作用：第一是封装浏览器的 History 操作；第二是负责异步模块的加载；第三是管理组件的生命周期。

模块和路由是为了实现组件化，所以，Component、NgModule、Router 加起来会占据绝大部分篇幅。只要紧扣“组件化”这个主线，就能站在一个很高的角度统摄全局，从而掌握到这门框架的精髓。

<!--more--> 

### 架构特色

####　1依赖注入

注射是通过constructor进行的

#### 2数据绑定

1. zone.js ： 时间回调、 定时器回调、 axjs回调、 运行时js对象改变三种情况，拦截即可

2. rxjs 异步及数据流  

   单向数据流：数据流从根组件流向子组件。

3. Immutable Data   

[angular2 变更检测详解](http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html)

[Angular 2变更检测系统](https://vsavkin.com/change-detection-in-angular-2-4f216b855d4c)

- Angular 2应用程序是一个反应系统。
- 变化检测系统将绑定从根传播到叶子。
- 与Angular 1.x不同，更改检测图是有向树。结果，该系统更具性能和可预测性。
- 默认情况下，更改检测系统遍历整个树。但是如果使用不可变对象或可观察对象，只有当它们“真正改变”时，您才可以利用它们并检查树的某些部分。
- 这些优化构成并且不会破坏变更检测提供的保证。

[不同前端框架变更检测](http://teropa.info/blog/2015/03/02/change-and-its-detection-in-javascript-frameworks.html)

#### 命名约定

老版本使用 AngularJS 指代，所有新版本都叫做 Angular。原因很好理解，因为老版本是用 JS 开发的，所以带一个 JS 后缀，而新版本是基于 TypeScript 的，带 JS 后缀不合适。

#### 关于 TypeScript

TypeScript 可以非常有效地提升编码效率和程序可读性。

#### 关于版本号

根据官方的解释，Angular 从2.0之后会保证向下兼容，每隔半年会升级一个大版本，只有升级大版本的时候才会做一些 breaking change。

### [VS code Debug Angular应用](http://www.ngfans.net/topic/17/post)



