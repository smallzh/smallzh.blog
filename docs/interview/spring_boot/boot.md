## 启动过程题目
---

## SpringBoot中的核心启动主函数(main函数)的作用? ⭐⭐⭐ :id=sb-main-method
> 用到哪些注解.注解的作用
```java
@SpringBootApplication
public class SpringBoot1Application {
    public static void main(String[] args) {
    	SpringApplication.run(SpringBoot1Application.class, args);
    }
}
```

该主函数: 主要启动springboot框架.用于加载容器和诸多默认组件。

用到核心注解: @SpringBootApplication . 作用:用于标识声明一个springboot框架容器。

## SpringBoot启动过程是什么样？⭐⭐⭐⭐⭐ :id=sb-process
![](../imgs/spring_boot_process.png)

大体分为3个部分：
1. 初始化SpringApplication：配置一些基本的环境变量、资源、构造器、监听器
2. 实现应用的具体启动方案：包括监听启动流程、加载配置环境、及核心的创建上下文环境
3. 自动化配置：使用自动化配置加载Starter中的Bean

整个过程大致分为两段：

**1 初始化SpringApplication**

这一步主要在`SpringApplication.initialize`方法中完成，主要是配置一些基础环境、资源和各种监听器，这里也加载了Start中配置的Configuration类

**2 启动整个Spring应用**

这一步主要在`SpringApplication.run`方法中完成，最主要的是创建Context上下文、实例化配置的Bean实例，包括Start中的Bean