## SpringMvc相关题目
---
## 1 说一下SpringMVC？⭐ :id=mvc-concept
Spring 的模型-视图-控制器（MVC）框架是围绕一个 DispatcherServlet 来设计的，这个 Servlet
会把请求分发给各个处理器，并支持可配置的处理器映射、视图渲染、本地化、时区与主题渲染
等，甚至还能支持文件上传。

## 2 说一下SpringMVC的处理流程？⭐⭐⭐⭐ :id=mvc-process
![](../imgs/mvc_1.jpg)

**1 Http 请求到 DispatcherServlet**

(1) 客户端请求提交到 DispatcherServlet。

**2 HandlerMapping 寻找处理器**

(2) 由 DispatcherServlet 控制器查询一个或多个 HandlerMapping，找到处理请求的Controller。
调用处理器 Controller
(3) DispatcherServlet 将请求提交到 Controller。

**3 Controller 调用业务逻辑处理后，返回 ModelAndView**

(4)(5)调用业务处理和返回结果：Controller 调用业务逻辑处理后，返回 ModelAndView。

**4 DispatcherServlet 查询 ModelAndView**

(6)(7)处理视图映射并返回模型： DispatcherServlet 查询一个或多个 ViewResoler 视图解析器，找到 ModelAndView 指定的视图。

**5 ModelAndView 反馈浏览器 HTTP**

(8) Http 响应：视图负责将结果显示到客户端。

## 3 SpringMvc常用注解有哪些？⭐⭐ :id=mvc-anno
![](../imgs/mvc_2.jpg)