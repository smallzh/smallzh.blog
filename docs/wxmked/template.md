# 模板风格定制

## 1 模板原理

模板是一个json对象，其中包含4个属性：

|名称|说明|
|---|---|
|BASE|基础属性|
|BASE_BLOCK|块基础属性|
|block|块相关属性|
|inline|行内相关属性|

其中`block`属性包含块级元素的属性，如：`h1、h2、p、code`等。`inline`属性包含行内元素属性，如：`link、strong`等。

## 2 自定义模板

自定义模板只需复制`aseets/scripts/themes/normal-theme.js`文件并重命名，修改对应的标签样式，比如：修改`h2`的样式，然后在`index.html`中引入，最后，加入到`templateStyles`数组中即可。