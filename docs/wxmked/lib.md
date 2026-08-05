# 依赖库说明

## 1 依赖库目录结构

`wxmked`依赖了多个js库，都在`libs`目录下，目录结构如下：

```txt
libs
├── css
│   ├── code-themes
│   │   ├── github-v2.min.css
│   │   ├── tomorrow-night-eighties.min.css
│   │   ├── tomorrow-night.min.css
│   │   └── tomorrow.min.css
│   ├── codemirror.min.css
│   ├── eclipse.min.css
│   ├── fonts
│   │   ├── element-icons.ttf
│   │   └── element-icons.woff
│   ├── index.css
│   ├── oceanic-next.min.css
│   ├── show-hint.css
│   └── xq-light.min.css
└── scripts
    ├── FuriganaMD.js
    ├── axios.min.js
    ├── codemirror.min.js
    ├── css-hint.js
    ├── index.js
    ├── jquery.min.js
    ├── markdown.min.js
    ├── marked.min.js
    ├── prettify.min.js
    ├── show-hint.js
    └── vue.min.js
```

依赖库包括：`jquery、codemirror、axios、markdown、prettify`。

## 2 依赖库说明

### 2.1 codemirror.min.js

`codemirror.min.js`是CodeMirror库文件，它是一个代码高亮库，官网: [https://codemirror.net/](https://codemirror.net/)，对文档中的代码关键字进行高亮显示。

JavaScript代码
![](/assets/img/wxmked/cm_js.png)

Java代码高亮
![](/assets/img/wxmked/cm_java.png)

### 2.2 marked.min.js
`marked.min.js`是Markdown库文件，用来解析Markdown文档，官网：[https://marked.js.org](https://marked.js.org)。


### 2.3 FuriganaMD.js
`FuriganaMD.js`是一个Markdown插件。官网：[https://github.com/amclees/furigana-markdown](https://github.com/amclees/furigana-markdown)。

### 2.3 Axios 
官网: [https://axios-http.com/zh/](https://axios-http.com/zh/)