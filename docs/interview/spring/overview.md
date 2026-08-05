## 概述
---
## 1 怎么理解Spring？⭐ :id=spring-concept

Spring是一个轻量级Java开发框架，最早由Rod Johnson创建，目的是为了解决企业级应用开发的业务逻辑层和其他各层的耦合问题。它是一个分层的JavaSE/JavaEE full-stack（一站式）轻量级开源框架，为开发Java应用程序提供全面的基础架构支持。Spring负责基础架构，因此Java开发者可以专注于应用程序的开发。

Spring最根本的使命是解决企业级应用开发的复杂性，即简化Java开发。

Spring可以做很多事情，它为企业级开发提供给了丰富的功能，但是这些功能的底层都依赖于它的两个核心特性，也就是依赖注入（dependency injection，DI）和面向切面编程（aspect-oriented programming，AOP）。

为了降低Java开发的复杂性，Spring采取了以下4种关键策略：
* 基于POJO的轻量级和最小侵入性编程；
* 通过依赖注入和面向接口实现松耦合；
* 基于切面和惯例进行声明式编程；
* 通过切面和模板减少样板式代码。

它是一个全面的、企业应用开发一站式的解决方案，贯穿表现层、业务层、持久层。但是 Spring
仍然可以和其他的框架无缝整合。

## 2 Spring的设计目标、设计理念和核心是什么？⭐ :id=spring-feature

1. Spring设计目标：Spring为开发者提供一个一站式轻量级应用开发平台；
2.  Spring设计理念：在JavaEE开发中，支持POJO和JavaBean开发方式，使应用面向接口开发，充分支持OO（面向对象）设计方法；Spring通过IoC容器实现对象耦合关系的管理，并实现依赖反转，将对象之间的依赖关系交给IoC容器，实现解耦；
3. Spring框架的核心：IoC容器和AOP模块。通过IoC容器管理POJO对象以及他们之间的耦合关系；通过AOP以动态非侵入的方式增强服务。IoC让相互协作的组件保持松散的耦合，而AOP编程允许你把遍布于应用各层的功能分离出来形成可重用的功能组件。

## 3 Spring包含哪些模块？⭐ :id=spring-module

Spring 总共大约有 20 个模块， 由 1300 多个不同的文件构成。 而这些组件被分别整合在:

1. 核心容器（Core Container） 
2.  AOP（Aspect Oriented Programming）
3. 设备支持（Instrmentation） 
4. 数据访问与集成（Data Access/Integeration） 
5.  Web
6.  消息（Messaging） 
7.  Test
等 7个模块中。

以下是 Spring 5 的模块结构图：

![](../imgs/spring_overview.png)
![](../imgs/spring_2.jpg)

* spring core：提供了框架的基本组成部分，包括控制反转（Inversion of Control，IOC）和依赖注入（Dependency Injection，DI）功能。
* spring beans：提供了BeanFactory，是工厂模式的一个经典实现，Spring将管理对象称为Bean。
*  spring context：构建于 core 封装包基础上的 context 封装包，提供了一种框架式的对象访问方法。
* spring jdbc：提供了一个JDBC的抽象层，消除了烦琐的JDBC编码和数据库厂商特有的错误代码解析， 用于简化JDBC。
* spring aop：提供了面向切面的编程实现，让你可以自定义拦截器、切点等。
* spring Web：提供了针对 Web 开发的集成特性，例如文件上传，利用 servlet listeners 进行 ioc 容器初始化和针对 Web 的 ApplicationContext。
* spring test：主要为测试提供支持的，支持使用JUnit或TestNG对Spring组件进行单元测试和集成测试。

![](../imgs/spring_3.jpg)

## 4 Spring 框架中都用到了哪些设计模式？ ⭐ :id=spring-pattern

* 工厂模式：BeanFactory就是简单工厂模式的体现，用来创建对象的实例；
* 单例模式：Bean默认为单例模式。
* 代理模式：Spring的AOP功能用到了JDK的动态代理和CGLIB字节码生成技术；
* 模板方法：用来解决代码重复的问题。比如. RestTemplate, JmsTemplate, JpaTemplate。
* 观察者模式：定义对象键一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都会得到通知被制动更新，如Spring中listener的实现–ApplicationListener。

## 5 详细说一下context模块（spring-context应用上下文) 模块? ⭐ :id=spring-context

这是基本的Spring模块，提供spring 框架的基础功能，BeanFactory 是 任何以spring为基础的应用的核心。Spring 框架建立在此模块之上，它使Spring成为一个容器。

Bean 工厂是工厂模式的一个实现，提供了控制反转功能，用来把应用的配置和依赖从真正的应用代码中分离。最常用的就是org.springframework.beans.factory.xml.XmlBeanFactory ，它根据XML文件中的定义加载beans。该容器从XML 文件读取配置元数据并用它去创建一个完全配置的系统或应用。

## 6 Spring框架中有哪些不同类型的事件? ⭐ :id=spring-event

Spring 提供了以下5种标准的事件：

* 上下文更新事件（ContextRefreshedEvent）：在调用ConfigurableApplicationContext 接口中的refresh()方法时被触发。
* 上下文开始事件（ContextStartedEvent）：当容器调用ConfigurableApplicationContext的Start()方法开始/重新开始容器时触发该事件。
* 上下文停止事件（ContextStoppedEvent）：当容器调用ConfigurableApplicationContext的Stop()方法停止容器时触发该事件。
* 上下文关闭事件（ContextClosedEvent）：当ApplicationContext被关闭时触发该事件。容器被关闭时，其管理的所有单例Bean都被销毁。
* 请求处理事件（RequestHandledEvent）：在Web应用中，当一个http请求（request）结束触发该事件。如果一个bean实现了ApplicationListener接口，当一个ApplicationEvent 被发布以后，bean会自动被通知。

## 7 Spring 应用程序有哪些不同组件？ ⭐ :id=spring-component

Spring 应用一般有以下组件：
* 接口 : 定义功能。
* Bean 类 : 它包含属性，setter 和 getter 方法，函数等。
* Bean 配置文件: 包含类的信息以及如何配置它们。
* Spring 面向切面编程（AOP):  提供面向切面编程的功能。
* 用户程序:  它使用接口。

## 8 Spring的优缺点是什么？ ⭐ :id=spring-merit
**优点**

1. 方便解耦，简化开发。Spring就是一个大工厂，可以将所有对象的创建和依赖关系的维护，交给Spring管理。
1. AOP编程的支持。Spring提供面向切面编程，可以方便的实现对程序进行权限拦截、运行监控等功能。
1. 声明式事务的支持。只需要通过配置就可以完成对事务的管理，而无需手动编程。
1. 方便程序的测试。Spring对Junit4支持，可以通过注解方便的测试Spring程序。
1. 方便集成各种优秀框架。Spring不排斥各种优秀的开源框架，其内部提供了对各种优秀框架的直接支持（如：Struts、Hibernate、MyBatis等）。
1. 降低JavaEE API的使用难度。Spring对JavaEE开发中非常难用的一些API（JDBC、JavaMail、远程调用等），都提供了封装，使这些API应用难度大大降低。

**缺点**

1. Spring明明一个很轻量级的框架，却给人感觉大而全
1. Spring依赖反射，反射影响性能
1. 使用门槛升高，入门Spring需要较长时间

## 9 Spring有哪些应用场景?  ⭐ :id=spring-scene
应用场景：JavaEE企业应用开发，包括SSH、SSM等
Spring价值：
1. Spring是非侵入式的框架，目标是使应用程序代码对框架依赖最小化；
1. Spring提供一个一致的编程模型，使应用直接使用POJO开发，与运行环境隔离开来；
1. Spring推动应用设计风格向面向对象和面向接口开发转变，提高了代码的重用性和可测试性；

## 10 使用 Spring 有哪些方式？ ⭐ :id=spring-app
使用 Spring 有以下方式：
1. 作为一个成熟的 Spring Web 应用程序。
1. 作为第三方 Web 框架，使用 Spring Frameworks 中间层。
1. 作为企业级 Java Bean，它可以包装现有的 POJO（Plain Old Java Objects）。
1. 用于远程使用。

## 11 Spring有哪些特点？⭐  :id=spring-trait
1. 轻量级
1. 控制反转
1. 面向切面
1. 容器
1. 框架集合

![](../imgs/spring_1.jpg)

## 12 Spring常用包有哪些？⭐ :id=spring-package
![](../imgs/spring_4.jpg)
