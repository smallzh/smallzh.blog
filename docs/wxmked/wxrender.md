# 微信渲染器
## 1 功能说明

微信渲染器是`wxmked`项目的关键文件之一，用于生产微信支持的最终文档格式。

对应项目中的`assets/scripts/renderers/wx-renderer.js`文件。

## 2 内部原理

文件中定义了一个`WxRenderer`的类，用于生成微信支持的文档。类里包含这几个属性：

|名称|类型|说明|
|---|---|---|
|opts|json对象|渲染器的配置项|
|ENV_USE_REFERENCES|boolean||
|ENV_STRETCH_IMAGE|boolean||
|footnotes|数组|存储文档全部的脚注|
|footnote|整数|最后添加的脚注索引|
|styleMapping||

包含以下几个方法：

1. merge：合并两个json对象属性，使用`Object.assign`进行合并。
2. buildTheme：根据主题的属性生成一个主题。
3. getStyles：将转入的参数合并生成一个样式。
4. addFootnote：添加到脚注中。
5. buildFootnotes：根据`footnotes`数组构建文末脚注。
6. buildAddition：生成了一个补充样式。
7. setOptions：设置对象的属性。
8. hasFootnotes：判断是否有脚注。
9. getRenderer：定制Markdown生成器。

## 3 关键方法理解

这些方法中，有些很简单，一下就能看明白，比如：`buildAddition、setOptions、hasFootnotes`等，我们只关注几个重要的方法。

### 3.1 buildTheme

从传入的`theme`主题中获取指定的样式。

### 3.2 buildFootnotes

这个方法也很简单，只是觉着对数组的`map`操作，需要学习。

### 3.3 getRenderer

这个方法是`WxRenderer`类的核心方法，用来定制`marked.Renderer`对象。`marked`的[官网渲染器](https://marked.js.org/#/USING_PRO.md#renderer)文档中，提供了多种Block块的定制，允许我们在生成的html标签中加入自定义样式。

`getRenderer`方法，对以下块进行了定制，加入了特定的样式：

1. heading：html的`h1、h2、h3、h4`标签
2. paragraph：html的`p`标签
3. blockquote：html的`blockquote`文章引用标签
4. code：html的`code`代码标签
5. codespan：html的`code`代码标签
6. listitem：html的`span`标签，对应列表中的每一项
7. list：处理列表的每一块，添加连接符
8. image：处理图片对应的样式
9. link：处理连接，并计入到脚注中
10. strong：字体加粗样式处理
11. em：字体斜体样式
12. table：表格样式处理
13. tablecell：表格中的单元格样式处理
14. hr：横线定制处理