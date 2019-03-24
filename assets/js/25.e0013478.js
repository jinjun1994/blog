(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{339:function(t,s,e){"use strict";e.r(s);var n=e(5),a=Object(n.a)({},function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("p",[e("TOC",{class:"table-of-contents",attrs:{"list-type":"ul","include-level":[2,3]}},[e("template",{slot:"header"}),e("template",{slot:"footer"})],2)],1),t._v(" "),e("h2",{attrs:{id:"为什么需要闭包？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么需要闭包？","aria-hidden":"true"}},[t._v("#")]),t._v(" 为什么需要闭包？")]),t._v(" "),e("div",{staticClass:"language-javascript line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-javascript"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeWorker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Pete"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("name"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" name "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"John"')]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 创建一个函数")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" work "),e("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("makeWorker")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// call it")]),t._v("\n"),e("span",{pre:!0,attrs:{class:"token function"}},[t._v("work")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),e("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// 它显示的是什么呢？"Pete"（创建位置的 name）还是"John"（调用位置的 name）呢？')]),t._v("\n")])]),t._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[t._v("1")]),e("br"),e("span",{staticClass:"line-number"},[t._v("2")]),e("br"),e("span",{staticClass:"line-number"},[t._v("3")]),e("br"),e("span",{staticClass:"line-number"},[t._v("4")]),e("br"),e("span",{staticClass:"line-number"},[t._v("5")]),e("br"),e("span",{staticClass:"line-number"},[t._v("6")]),e("br"),e("span",{staticClass:"line-number"},[t._v("7")]),e("br"),e("span",{staticClass:"line-number"},[t._v("8")]),e("br"),e("span",{staticClass:"line-number"},[t._v("9")]),e("br"),e("span",{staticClass:"line-number"},[t._v("10")]),e("br"),e("span",{staticClass:"line-number"},[t._v("11")]),e("br"),e("span",{staticClass:"line-number"},[t._v("12")]),e("br"),e("span",{staticClass:"line-number"},[t._v("13")]),e("br"),e("span",{staticClass:"line-number"},[t._v("14")]),e("br"),e("span",{staticClass:"line-number"},[t._v("15")]),e("br")])]),e("p",[t._v("函数 "),e("code",[t._v("makeWorker")]),t._v(" 生成并返回另一个函数。这个新的函数可以在其他位置进行调用。它访问的是创建位置还是调用位置的外部变量呢，还是都可以？我们从这个问题了来理解闭包。")]),t._v(" "),e("p",[t._v("在允许创建函数引用（例如把函数当参数传递）的语言里，需要解决一个问题，那就是什么时候把作用域规则应用于这种函数，创建这种引用时还是函数最终被调用时？这个问题也就是"),e("strong",[t._v("引用环境的约束规则，在创建时建立引用环境称为深约束，而推迟到调用时建立引用环境称为浅约束。")])]),t._v(" "),e("p",[t._v("在前一种情况下,将这个函数作为参数传递的那段代码,其实已经设想了一个明确的引用环境(当时的环境)，它并不希望该函数在其他环境中被调用。因此,在函数第一次被作为参数传递时就做好环境约束,在该函数最终被调用时恢复这个环境。这种引用环境的早期约束称为深约束。")]),t._v(" "),e("p",[t._v("要想实现深约束，那么就需要一种能够显示的表示引用环境的东西，也就是函数在将来运行时就像在现在运行一样，并将它与有关的函数的引用打包捆绑在一起，这个被捆绑起来产生的整体称为**“闭包”**。"),e("strong",[t._v("闭包是函数和声明该函数的词法环境的组合")]),t._v("。也有说法认为闭包单指词法环境，不包含这个函数。")]),t._v(" "),e("p",[t._v("闭包使得函数可以继续访问定义时的词法作用域。无论使用何种方式对函数类型的值进行传递，当函数在别处被调用时都可以观察到闭包，它会持有对原始定义作用域的引用。")]),t._v(" "),e("p",[t._v("根据ECMA-262规范，JavaScript的函数包含一个[[scopes]]属性。[[scopes]] 指向作用域链 即 scope chain（ECMA-262v3）或者Lexical Environment（ECMA-262v5）。这对应于闭包的环境部分，[[scopes]]中可访问的属性列表即是标识符列表，对象本身的引用则对应于环境。")]),t._v(" "),e("p",[t._v("我们可以通过控制台查看文章开始 "),e("code",[t._v("work")]),t._v(" 函数的闭包。")]),t._v(" "),e("p",[e("img",{attrs:{src:"https://img.dubiqc.com/201902/25012606.png-sign",alt:"闭包"}})]),t._v(" "),e("p",[t._v("本质上无论何时何地，如果将函数（访问它们各自的词法作用域）当作第一\n级的值类型并到处传递，你就会看到闭包在这些函数中的应用。在定时器、事件监听器、\nAjax 请求、跨窗口通信、Web Workers 或者任何其他的异步（或者同步）任务中，只要使\n用了回调函数，实际上就是在使用闭包。")]),t._v(" "),e("h2",{attrs:{id:"作用域"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#作用域","aria-hidden":"true"}},[t._v("#")]),t._v(" 作用域")]),t._v(" "),e("p",[t._v("在 1936 年，图灵提出了现在称为“图灵机”的形式系统。图灵机概念中提出了通过 0、1运算系统来解决复杂问题。 1945 年，冯·诺依曼等人提出了 EDVAC 体系设计，以及其上的编码程序、纸带存储与输入。该设计方案完全实现了图灵的科学预见与构思。我们现在最常见的通用编程环境，就是构架于冯·诺依曼的设计，必然面临这样的物理环境——具有存储系统（例如内存、硬盘等）的计算机体系，并依赖存储（这里指内存）进行运算。后来有人简单地归结这样的运算系统：通过修改内存来反映运算的结果。")]),t._v(" "),e("p",[t._v("程序最终可以被表达为数据（结构）和逻辑（算法）两个方面，几乎所有编程语言最基本的功能之一，就是能够储存变量当中的值，并且能在之后对这个值进行访问或修改。需要一套设计良好的规则来存储变量，并且之后可以方便地找到这些变量。\n这套规则被称为作用域。在大多数现代语言中，变量的作用域都是静态确定的—即在程序编译时确定，这一类可以成为"),e("strong",[t._v("静态作用域")]),t._v("。")]),t._v(" "),e("p",[t._v("在JavaScript中，函数的入口引入一个新的作用域，我们在这里建立局部对象的变量名与值的绑定，与局部变量同名的全局变量就会失效，它们被局部的变量绑定给屏蔽掉了。在函数退出时撤销所有的局部变量的绑定，并重新激活那些被屏蔽的全局对象的绑定。"),e("strong",[t._v("对变量绑定的这些操作看似需要在运行时来处理，但实际则完全不需要执行任何代码，一个变量处于活动状态的那个程序区域完全是由纯粹的正文规则所决定，由于这个原因，静态作用域也被称为词法作用域")]),t._v("。典型的情况就是：对于一个特定的变量名字，其“当前的绑定”就是程序里包围这个名字的，距离该名字最近的那个代码区域里面的那个绑定。")]),t._v(" "),e("p",[t._v("在 JavaScript 中，每个运行的函数、代码块或整个程序，都有一个称为**词法环境（Lexical Environment）**的关联对象。")]),t._v(" "),e("p",[t._v("词法环境对象由两部分组成：")]),t._v(" "),e("ol",[e("li",[e("strong",[t._v("环境记录（Environment Record）")]),t._v("—— 一个把所有局部变量作为其属性（包括一些额外信息，比如 "),e("code",[t._v("this")]),t._v(" 值）的对象。")]),t._v(" "),e("li",[t._v("**外部词法环境（outer lexical environment）**的引用 —— 通常是嵌套当前代码（当前花括号之外）之外代码的词法环境。")])]),t._v(" "),e("p",[t._v("所以，『变量』只是环境记录这个特殊内部对象的属性。『访问或修改变量』意味着『访问或改变词法环境的一个属性』。")]),t._v(" "),e("p",[t._v("举个例子，这段简单的代码中只有一个词法环境：")]),t._v(" "),e("p",[t._v("这是一个所谓的与整个程序关联的全局词法环境。在浏览器中，所有的 "),e("code",[t._v("<script>")]),t._v(" 标签都同享一个全局（词法）环境。")]),t._v(" "),e("p",[t._v("在上图中，矩形表示环境记录（存放变量），箭头表示外部（词法环境）引用。全局词法环境没有外部（词法环境）引用，所以它指向了 "),e("code",[t._v("null")]),t._v("。")]),t._v(" "),e("p",[t._v("这是关于 "),e("code",[t._v("let")]),t._v(" 变量（如何变化）的全程展示：")]),t._v(" "),e("p",[t._v("右侧的矩形演示在执行期间全局词法环境是如何变化的：")]),t._v(" "),e("ol",[e("li",[t._v("执行开始时，词法环境为空。")]),t._v(" "),e("li",[e("code",[t._v("let phrase")]),t._v(" 定义出现。它没有被赋值，所以存为 "),e("code",[t._v("undefined")]),t._v("。")]),t._v(" "),e("li",[e("code",[t._v("phrase")]),t._v(" 被赋予了一个值。")]),t._v(" "),e("li",[e("code",[t._v("phrase")]),t._v(" 引用了一个新值。")])]),t._v(" "),e("p",[t._v("现在一切看起来都相当简单易懂，是吧？")]),t._v(" "),e("p",[t._v("总结一下：")]),t._v(" "),e("ul",[e("li",[t._v("变量是特定内部对象的属性，与当前执行的（代码）块/函数/脚本有关。")]),t._v(" "),e("li",[t._v("操作变量实际上操作的是该对象的属性。")])]),t._v(" "),e("p",[t._v("在大多数现代语言中，约束的作用域都是静态确定的—即在程序编译时确定，这一类可以成为"),e("strong",[t._v("静态作用域")]),t._v("。")]),t._v(" "),e("p",[t._v("什么时候将作用域规则应用与子程序？")]),t._v(" "),e("h2",{attrs:{id:"闭包的历史"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#闭包的历史","aria-hidden":"true"}},[t._v("#")]),t._v(" 闭包的历史")]),t._v(" "),e("p",[t._v("历史背景：闭包这个概念第一次出现在1964年的《The Computer Journal》上，由"),e("strong",[t._v("彼得·约翰·兰丁")]),t._v(" （"),e("strong",[t._v("Peter John Landin")]),t._v("）在《The mechanical evaluation of expressions》一文中提出了applicative expression（应用表达式）和closure（闭包）的概念。")]),t._v(" "),e("p",[t._v("文中AE的概念定义如下：")]),t._v(" "),e("blockquote",[e("p",[t._v("We are, therefore, interested in a class of expressions about any one of which it is appropriate to ask the following questions:\nQ1. Is it an identifier? If so, what identifier?\nQ2. Is it a λ-expression? If so, what identifier or identifiers constitute its bound variable part and in what arrangement? Also what is the expression constituting its λ-body?\nQ3. Is it an operator/operand combination? If so, what is the expression constituting its operator? Also what is the expression constituting its operand?\nWe call these expressions applicative expressions (AEs).")])]),t._v(" "),e("p",[t._v("简单翻译")]),t._v(" "),e("blockquote",[e("p",[t._v("这样，我们对于能够适合提问以下问题的一类特性表达式感兴趣：\nQ1. 它是否是标识符？ 如果是的话，是什么标识符？\nQ2. 它是否是λ表达式？ 如果是的话，哪个或者哪些的标识符构成了它的绑定变量部分，范围是什么？还有是什么表达式构成了它的λ-body？\nQ3. 它是否是操作符/操作数的组合？如果是的话，构成它的操作符的表达式是什么？还有构成它的操作数的表达式又是什么？\n我们称这一类表达式为“适用表达式”（AE）。")])]),t._v(" "),e("p",[t._v("在AE的基础上，闭包定义为")]),t._v(" "),e("blockquote",[e("p",[t._v('Also we represent the value of a λ-expression by a bundle of information called a "closure", comprising the λ-expression and the environment relative to which it was evaluated. We must therefore arrange that such a bundle is correctly interpreted whenever it has to be applied to some argument. More precisely:\na closure has an environment part which is a list whose two items are:\n(1) an environment\n(2) an identifier or list of identifiers\nand a control part which consists of a list whose sole item is an AE.')])]),t._v(" "),e("p",[t._v("翻译如下")]),t._v(" "),e("blockquote",[e("p",[t._v('此外，我们把带有一系列信息的λ表达式称作"闭包"，其中包括λ表达式和它执行时的相关连的环境。于是我们要确保无论当它被用于什么参数时，这些信息都能够被正确解析。更精确地：\n闭包包含环境部分，它是个只有两项的list，这两项分别是：\n(1)环境\n(2)一个标识符或者标识符列表\n以及控制部分，他是个只有一项的list，唯一的项是个AE')])]),t._v(" "),e("p",[t._v("在1975年，Scheme最早实现了闭包。")]),t._v(" "),e("p",[t._v('60年代，因为受到函数式思维影响，计算机软件领域的"表达式"一般是包括λ表达式，也就是函数式语言中的函数的。所以这个闭包的定义在80年代后被更多过程式语言借鉴，其中包括C语言的static全局变量机制、C++的成员函数、JavaScript的局部函数。对于过程式语言中，因为很少有函数以外的"表达式"，所以闭包这个概念更多被用于指函数。')]),t._v(" "),e("h2",{attrs:{id:"闭包的应用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#闭包的应用","aria-hidden":"true"}},[t._v("#")]),t._v(" 闭包的应用")])])},[],!1,null,null,null);s.default=a.exports}}]);