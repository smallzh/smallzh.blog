##  概述
---
## 什么是 Spring Boot？⭐ :id=sb-concept
Spring Boot 是 Spring 开源组织下的子项目，是 Spring 组件一站式解决方案，主要是简化了使用 Spring 的难度，简省了繁重的配置，提供了各种启动器，开发者能快速上手。
1. 用来简化spring应用的初始搭建以及开发过程 使用特定的方式来进行配置（properties或yml文件）
2. 创建独立的spring引用程序 main方法运行
3. 嵌入的Tomcat 无需部署war文件
4. 简化maven配置
5. 自动配置spring添加对应功能starter自动化配置

## 为什么要用 Spring Boot？⭐ :id=why-sb
Spring Boot 优点非常多，如：
1. 独立运行
1. 简化配置
1. 自动配置
1. 无代码生成和XML配置
1. 应用监控
1. 上手容易

## 开启 SpringBoot特性有哪几种方式？⭐ :id=sb-pom
1. 继承spring-boot-starter-parent项目
1. 导入spring-boot-dependencies项目依赖

## SpringBoot需要独立的容器运行吗？⭐ :id=sb-run-env
可以不需要，内置了 Tomcat/ Jetty 等容器。

## 运行SpringBoot有哪几种方式？⭐ :id=sb-run-method
1. 打包用命令或者放到容器中运行
1. 用 Maven/ Gradle 插件运行
1. 直接执行 main 方法运行

## SpringBoot支持哪些日志框架？推荐和默认的日志框架是哪个？⭐ :id=sb-log
Spring Boot 支持 
1. Java Util Logging
2. Log4j2,
3. Lockback 作为日志框架
如果你使用 Starters 启动器，Spring Boot 将使用 Logback 作为默认日志框架

## springboot支持的默认日志框架有哪些? ⭐⭐ :id=sb-use-log
spring-boot: 默认采用Logback作为日志框架.
配置即可:
```properties
logging.file=d:/test/log.log
logging.level.org.springframework.web=DEBUG
#logging.config=classpath:logback.xml 加载单独的日志配置文件.
```

## 保护 Spring Boot 应用有哪些方法？⭐⭐⭐ :id=sb-protect
1. 在生产中使用HTTPS
1. 使用Snyk检查你的依赖关系
1. 升级到最新版本
1. 启用CSRF保护
1. 使用内容安全策略防止XSS攻击

## Spring Boot 2.X 有什么新特性？⭐ :id=sb-vs-1
> 与 1.X 有什么区别

1. 配置变更
1. JDK 版本升级
1. 第三方类库升级
1. 响应式 Spring 编程支持
1. HTTP/2 支持
1. 配置属性绑定
1. 更多的改进与加强

## springboot与spring的区别? ⭐⭐⭐ :id=sb-diff-sp
引用自官方说法:
> java在集成spring等框架需要作出大量的配置,开发效率低,繁琐.所以官方提出 spring boot的核心思想:习惯优于配置.可以快速创建开发基于spring框架的项目.或者支持可以不用或很少的spring配置即可.

## springboot的核心功能与使用优点? ⭐ :id=sb-merit
**核心功能**

1. springboot项目为独立运行的spring项目,java -jar xx.jar即可运行.
1. 内嵌servlet容器(可以选择内嵌: tomcat ,jetty等服务器.).
1. 提供了starter的pom 配置 简化了maven的配置.
1. 自动配置spring容器中的bean.当不满足实际开发场景,可自定义bean的自动化配置.
1. 准生产的应用监控(基于: ssh , http , telnet 对服务器运行的项目进行监控.).
1. springboot无需做出xml配置,也不是通过代码生成来实现(通过条件注解)

**使用优点**

1. 快速搭建项目,
1. 与主流框架集成无需配置集成.
1. 内嵌服务容器.
1. 具有应用监控.
1. 开发部署方便,后期与云计算平台集成方便(docket).