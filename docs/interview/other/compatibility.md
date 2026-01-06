## 兼容性问题
---

## 低版本浏览器兼容H5和CSS3  :id=compatibility-version
html5shiv
> 解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题。

respond.min
> 让不支持css3 Media Query的浏览器包括IE6-IE8等其他浏览器支持查询。

由于IE6/IE7/IE8还有很大一部分用户，为了让网站浏览者都能正常的访问HTML5网站，故这两种方案还是需要的，下面是两个解决方法的cdn地址写法：

```js
<!--[if lt IE 9]>
　　<script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.js"></script>
 　 <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<![endif]—>
```