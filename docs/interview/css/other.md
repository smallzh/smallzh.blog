## 其他
---

## 谈谈你对CSS布局的理解  :id=understand
常见的布局方式：固定布局、流式布局、弹性布局、浮动布局、定位布局、margin和padding

## 请列举几种可以清除浮动的方法  :id=clear_float
浮动会漂浮于普通流之上，像浮云一样，但是只能左右浮动。正是这种特性，导致框内部由于不存在其他普通流元素了，表现出高度为0（高度塌陷）。

1. 添加额外标签，例如 `<div style="clear:both"></div>`
2. 使用br标签和其自身的html属性，例如 `<br clear="all" />`
3. 父元素设置 overflow：hidden；在IE6中还需要触发hasLayout，例如zoom：1；
4. 父元素设置 overflow：auto 属性；同样IE6需要触发hasLayout
5. 父元素也设置浮动
6. 父元素设置display:table
7. 使用:after 伪元素；由于IE6-7不支持:after，使用 zoom:1触发 hasLayout。

在CSS2.1里面有一个很重要的概念，那就是 Block formatting contexts （块级格式化上下文），简称 BFC。

创建了BFC的元素就是一个独立的盒子，里面的子元素不会在布局上影响外面的元素，同时BFC仍然属于文档中的普通流。

IE6-7的显示引擎使用的是一个称为布局（layout）的内部概念。

## 请列举几种隐藏元素的方法  :id=hidden_ele
1. visibility: hidden；这个属性只是简单的隐藏某个元素，但是元素占用的空间任然存在。
2. opacity: 0；一个CSS3属性，设置0可以使一个元素完全透明，制作出和visibility一样的效果。与visibility相比，它可以被transition和animate
3. position: absolute；使元素脱离文档流，处于普通文档之上，给它设置一个很大的left负值定位，使元素定位在可见区域之外。
4. display: none；元素会变得不可见，并且不会再占用文档的空间。
5. transform: scale(0)；将一个元素设置为无限小，这个元素将不可见。这个元素原来所在的位置将被保留。
6. HTML5 hidden attribute；hidden属性的效果和display:none;相同，这个属性用于记录一个元素的状态
7. height: 0; overflow: hidden；将元素在垂直方向上收缩为0,使元素消失。只要元素没有可见的边框，该技术就可以正常工作。
8. filter: blur(0)；将一个元素的模糊度设置为0，从而使这个元素“消失”在页面中。

## 如何让一段文本中的所有英文单词的首字母大写  :id=text_up
text-transform：

|属性|解释|
|---|---|
|none|不做处理|
|capitalize|将每个单词的第一个字母转换成大写)|
|uppercase|将每个单词转换成大写 )|
|lowercase|将每个单词转换成小写 |

## 请简述CSS样式表继承  :id=css_extend
CSS样式表继承指的是，特定的CSS属性向下传递到子孙元素。会被继承下去的属性如下：

1. 文本相关：font-family，font-size， font-style，font-variant，font-weight， font，letter-spacing，line-height，color
2. 列表相关：list-style-image，list-style-position，list-style-type， list-style

## CSS伪类与CSS伪对象的区别  :id=cls-obj
CSS 引入伪类和伪元素的概念是为了描述一些现有CSS无法描述的东西

> 根本区别在于：它们是否创造了新的元素（抽象）

伪类：一开始用来表示一些元素的动态状态，随后CSS2标准扩展了其概念范围，使其成为了所有逻辑上存在但在文档树中却无须标识的“幽灵”分类

伪对象：代表了某个元素的子元素，这个子元素虽然在逻辑上存在，但却并不实际存在于文档树中

## 请简述CSS的权重规则  :id=weight-rule
一个行内样式+1000，一个id+100，一个属性选择器/class类/伪类选择器+10，一个元素名/伪对象选择器+1。

关系选择器将拆分为两个选择器再计算.

## 请写出多种等高布局  :id=equal_layout
1. 假等高列：使用背景图片，在列的父元素上使用这个背景图进行Y轴的铺放，从而实现一种等高列的假像
1. 给容器div使用单独的背景色（固定布局）（流体布局）：用元素中的最大高度撑大其他的容器高度
1. 创建带边框的两列等高布局：用border-left来做，只能使用两列。
1. 使用正padding和负margin对冲实现多列布局方法：在所有列中使用正的上、下padding和负的上、下margin，并在所有列外面加上一个容器，设置overflow:hiden把溢出背景切掉
1. 使用边框和定位模拟列等高：但不能使用在多列
1. 模仿表格布局等高列效果：兼容性不好，在ie6-7无法正常运行

## 在CSS样式中常使用px、em，各有什么优劣，在表现上有什么区别？  :id=px-vs-em
px是相对长度单位，相对于显示器屏幕分辨率而言的。

em是相对长度单位，相对于当前对象内文本的字体尺寸。

px定义的字体，无法用浏览器字体放大功能。

em的值并不是固定的，会继承父级元素的字体大小，1 ÷ 父元素的font-size × 需要转换的像素值 = em值。

## CSS中 link 和@import 的区别是什么？  :id=link-vs-import
1. link属于HTML标签，而@import是CSS提供的，且只能加载 CSS
1. 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
1. import只在IE5以上才能识别，而link是HTML标签，无兼容问题
1. link方式的样式的权重 高于@import的权重
1. 当使用 Javascript 控制 DOM 去改变样式的时候，只能使用 link 方式，因为 @import 眼里只有 CSS ，不是 DOM 可以控制

## position的absolute与fixed共同点与不同点  :id=position-vs-ab-fix
相同：

1. 改变行内元素的呈现方式，display被置为block
1. 让元素脱离普通流，不占据空间
1. 默认会覆盖到非定位元素上

区别：

1. absolute的”根元素“是可以设置的，而fixed的”根元素“固定为浏览器窗口。
1. 当你滚动网页，fixed元素与浏览器窗口之间的距离是不变的。

## 为什么要初始化CSS样式？  :id=init-css
因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

## 解释下 CSS Sprites原理，优缺点  :id=css-sprites
CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字精确的定位出背景图片的位置。

优点：
1. 减少网页的http请求
1. 减少图片的字节
1. 解决了网页设计师在图片命名上的困扰，只需对一张集合的图片上命名就可以了，不需要对每一个小元素进行命名
1. 更换风格方便，只需要在一张或少张图片上修改图片的颜色或样式，整个网页的风格就可以改变。

缺点：
1. 在宽屏，高分辨率的屏幕下的自适应页面，你的图片如果不够宽，很容易出现背景断裂
1. CSS Sprites在开发的时候，要通过photoshop或其他工具测量计算每一个背景单元的精确位置
1. 在维护的时候比较麻烦，如果页面背景有少许改动，一般就要改这张合并的图片

## 什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？  :id=fouc
如果使用import方法对CSS进行导入，会导致某些页面在Windows下的IE出现一些奇怪的现象：

> 以无样式显示页面内容的瞬间闪烁，这种现象称之为文档样式短暂失效(Flash of Unstyled Content)，简称为FOUC。

原理：当样式表晚于结构性html加载，当加载到此样式表时，页面将停止之前的渲染。此样式表被下载和解析后，将重新渲染页面，也就出现了短暂的花屏现象。

解决方法：使用LINK标签将样式表放在文档HEAD中。

## line-height三种赋值方式有何区别？（带单位、纯数字、百分比）  :id=lh
带单位：px不用计算，em则会使元素以其父元素font-size值为参考来计算自己的行高

纯数字：把比例传递给后代，例如父级行高为1.5，子元素字体为18px，则子元素行高为1.5\*18=27px

百分比：将计算后的值传递给后代

## :link、:visited、:hover、:active的执行顺序是怎么样的？  :id=order
L-V-H-A，l(link)ov(visited)e h(hover)a(active)te，即用喜欢和讨厌两个词来概括

##  经常遇到的浏览器兼容性有哪些？如何解决？  :id=compatible
1. 浏览器默认的margin和padding不同
1. IE6双边距bug
1. 在ie6，ie7中元素高度超出自己设置高度。原因是IE8以前的浏览器中会给元素设置默认的行高的高度导致的
1. min-height在IE6下不起作用
1. 透明性IE用filter:Alpha(Opacity=60)，而其他主流浏览器用 opacity:0.6
1. input边框问题，去掉input边框一般用border:none;就可以，但由于IE6在解析input样式时的BUG(优先级问题)，在IE6下无效

## 有哪项方式可以对一个DOM设置它的CSS样式？  :id=dom-css
1. 外部样式表：通过 `<link>`标签引入一个外部css文件
1. 内部样式表：将css代码放在`<style>` 标签内部
1. 内联样式：将css样式直接定义在 HTML 元素内部

## rgba()和opacity的透明效果有什么不同？  :id=rgba-opa
1. opacity作用于元素，以及元素内的所有内容的透明度，rgba()只作用于元素的颜色或其背景色。
1. 设置rgba透明的元素的子元素不会继承透明效果！

## css属性content有什么作用？有什么应用？  :id=content
css的content属性专门应用在 before/after 伪元素上，用于来插入生成内容。

可以配合自定义字体显示特殊符号。