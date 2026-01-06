# 编辑器逻辑

## 1 功能说明

`wxmked`是一个`vue`的单页面应用，界面交互和逻辑处理在这块完成。

对应文件`assets/scripts/editor.js`。

## 2 内部原理

文件里定义了一个`vue`对象，关联到页面中Id为`app`的html块中。其中，

1. data：定义了页面中用到的属性
2. mounted：初始化了页面中的编辑器和渲染器
3. methods：定义了页面中用到的方法，如：下拉选择的触发方法
4. updated：更新时，自动格式化

## 3 关键属性和方法

### 3.1 关键属性

文件里的关键属性如下：

|名称|属性|说明|
|---|---|---|
|output|字符串|保存最终的微信格式文档|
|source|字符串|编辑器中的文本|
|editorThemes|数组|编辑器主题下拉列表对应的值|
|editor|对象|编辑器对象|
|templateStyles|数组|模板风格|
|builtinFonts|数组|渲染器的字体类型|
|sizeOption|数组|渲染器字体大小|
|colorOption|数组|渲染器中的颜色|
|currentEditorTheme|字符串|当前编辑器的主题|
|currentTemplateStyle|字符串|当前渲染器的风格模板|
|currentFont|字符串|当前渲染器用的字体|
|currentSize|字符串|当前渲染器的字体大小|
|currentColor|字符串|当前渲染器使用的颜色|

### 3.2 初始化对象

页面使用`CodeMirror`初始了编辑器，同时创建了`WxRenderer`渲染器，接着，查看localStorage中是否有缓存的文本，有就直接加载，没有就使用`axios`进行文件加载文本。

### 3.3 关键方法

#### 3.3.1 以Changed结尾的方法

这几个方法对应页面中的下拉框选择触发，修改编辑器和渲染器中的属性。

#### 3.3.2 renderWeChat方法

渲染微信文档格式，步骤如下：

1. 使用`marked`库根据Markdown文档生成html文档。
2. 判断是否有脚注。
3. 有脚注的话，html文档后追加脚注和特定的样式。

#### 3.3.3 copy方法

将输出块的html文档内容复制到剪贴板中，并选中这块区域。