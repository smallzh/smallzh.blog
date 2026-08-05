## Starter相关问题
---
## 你如何理解SpringBoot中的Starters？⭐⭐⭐⭐⭐ :id=sb-starter
1. Starters可以理解为启动器，它包含了一系列可以集成到应用里面的依赖包，你可以一站式集成 Spring 及其他技术，而不需要到处找示例代码和依赖包。如你想使用 Spring JPA 访问数据库，只要加入 spring-boot-starter-data-jpa 启动器依赖就能使用了。
1. Starters包含了许多项目中需要用到的依赖，它们能快速持续的运行，都是一系列得到支持的管理传递性依赖。

## springboot中常用的starter的组件有哪些? ⭐ :id=sb-start-type
1. spring-boot-starter-parent //boot项目继承的父项目模块.
1. spring-boot-starter-web //boot项目集成web开发模块.
1. spring-boot-starter-tomcat //boot项目集成tomcat内嵌服务器.
1. spring-boot-starter-test //boot项目集成测试模块.
1. mybatis-spring-boot-starter //boot项目集成mybatis框架.
1. spring-boot-starter-jdbc //boot项目底层集成jdbc实现数据库操作支持.