## 功能配置题目
---
## Spring Boot 的核心配置文件有哪几个？⭐⭐⭐ :id=sb-config
> 它们的区别是什么

Spring Boot 的核心配置文件是 application 和 bootstrap 配置文件。application 配置文件这个容易理解，主要用于 Spring Boot 项目的自动化配置。bootstrap 配置文件有以下几个应用场景。
1. 使用 Spring Cloud Config 配置中心时，这时需要在 bootstrap 配置文件中添加连接到配置中心的配置属性来加载外部配置中心的配置信息；
1. 一些固定的不能被覆盖的属性；
1. 一些加密/解密的场景；

## Spring Boot 的配置文件有哪几种格式？⭐⭐ :id=sb-config-type
.properties 和 .yml，它们的区别主要是书写格式不同。
1. .properties
```text
app.user.name = javastack
```
1. .yml
```yml
app:
  user:
    name: javastack
```
另外，.yml 格式不支持 @PropertySource 注解导入配置。

## 如何在Spring Boot启动的时候运行一些特定的代码？⭐⭐ :id=sb-main
可以实现接口 ApplicationRunner 或者 CommandLineRunner，这两个接口实现方式一样，它们都只提供了一个 run 方法。

## Spring Boot有哪几种读取配置的方式？⭐⭐ :id=sb-get-config
Spring Boot 可以通过 
1. @PropertySource
2. @Value
3. @Environment,
4. @ConfigurationProperties 
来绑定变量

## SpringBoot实现热部署有哪几种方式？⭐⭐ :id=sb-dev-hot
主要有两种方式：
1. Spring Loaded
1. Spring-boot-devtools

## 你如何理解 Spring Boot 配置加载顺序？⭐⭐ :id=sb-load-order
在 Spring Boot 里面，可以使用以下几种方式来加载配置。
1. properties文件；
1. YAML文件；
1. 系统环境变量；
1. 命令行参数；

## Spring Boot 如何定义多套不同环境配置？⭐⭐ :id=sb-config-env
提供多套配置文件，如：
1. applcation.properties
1. application-dev.properties
1. application-test.properties
1. application-prod.properties
运行时指定具体的配置文件

## Spring Boot 可以兼容老 Spring 项目吗，如何做？⭐ :id=sb-old
可以兼容，使用 @ImportResource 注解导入老 Spring 项目配置文件。

集成老项目spring框架的容器配置文件即可:
spring-boot一般提倡零配置.但是如果需要配置,也可增加:
@ImportResource({"classpath:spring1.xml" , "classpath:spring2.xml"})

注意:resources/spring1.xml位置.

## springboot中的application.properties有哪些配置? ⭐ :id=sb-config-content
application.properties为boot项目中的一个系统自带的全局属性配置文件. 提供默认属性重写的作用. 可包含重写系tomcat,spring,springmvc,mybatis等诸多默认配置属性: 列举部分如下:
```properties
#全局配置文件: 重写视图解析器的资源地址.
#页面默认前缀目录
spring.mvc.view.prefix=/WEB-INF/jsp/
#?响应页面默认后缀
spring.mvc.view.suffix=.jsp
#静态资源目录配置,
spring.mvc.static-path-pattern=/static/**
#tomcat服务器的配置:
server.port=8081
server.servlet.context-path=/sb2
#默认支持的日志记录:
#logging.config=classpath:logback.xml 加载单独的日志配置文件.
logging.file=d:/test/log.log
logging.level.org.springframework.web=DEBUG
#提供jdbc的基本配置:
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/c01?useUnicode=true&characterEncoding=utf-8
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.type=org.apache.commons.dbcp.BasicDataSource
#提供mybatis的属性配置: 扫描.
mybatis.mapper-locations=classpath:mapper/*_mapper.xml
```

## springboot中的常用配置入口有哪些? ⭐⭐ :id=sb-config-type
1. bootstrap.properties/bootstrap.yml //用于配置无需重写的系统常量,例如springcloud项目用到的config配置中心的连接属性等.加载优先级高于application.properties.
1. application.properties/application.yml //用于配置重写springboot项目的默认框架属性,例如:重写tomcat,springmvc,日志框架等默认属性.主要提供给spring框架加载使用.

注: properties后缀名与yml后缀名配置文件二选一即可. 两种不同格式的配置文件而已.

## 如何加载外部配置文件中的自定义属性? ⭐⭐ :id=sb-load-ext
需求一批量加载多个属性.
```text
步骤一: 首先需要自定义外部配置文件和其中的自定义属性:
user.properties . 存放在resources目录下:
内部:
#自定义配置其他属性:
user.username=zhangsan
user.age=20
步骤二: 加载属性到程序中:
springboot 1.5版本以及之前采用:br/>@ConfigurationProperties(prefix="user",locations={"classpath:user.propeties"})
<="" a="">public class User {
private String username;
private Integer age;
get/set封装省略....
}
springboot 1.5版本以后采用如下: 
@PropertySource(value ="classpath:user.properties")
@ConfigurationProperties(prefix = "user")br/>@Component
<="" a="">public class User {
private String username;
private Integer age;
get/set封装省略....
}
步骤三:
以上配置需要在main启动函数类文件上激活配置: 新版本中默认开启.
@EnableConfigurationProperties
需求二:如果加载单个属性:
步骤一：省略.如上.
步骤二: br/>@Value("${name}")
<="" a="">private String name;
```
备注:以上外部文件属性加载.切记注意中文乱码问题.

## 如何实现切换开发环境,生产环境配置? ⭐⭐ :id=sb-switch-env
**profile配置**

spring-boot默认为了支持不同的配置环境. 

配置步骤: 
```text
1.提供环境:
按照命名模板:application-{profile}.properties(例如: application-pro1.properties/applicationpro2.properties)
2.选择激活的环境:
application.properties中设置:spring.profiles.active=pro1
```

## 如何在SpringBoot应用启动的时候，加载数据库数据？ ⭐⭐ :id=sb-start-load-db
**可选方式：**
1. `@PostConstruct`注解修饰方法：被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器调用一次，类似于Serclet的inti()方法。被@PostConstruct修饰的方法会在构造函数之后，init()方法之前运行。
2. 实现`CommandLineRunner`接口：以监听接口方式，启动服务，执行方式时仍然提供服务，服务初始化之后，执行方法。

**@PostConstruct 缺点**

1. 服务初始化过程中，执行该方法，该方法不结束无法提供服务。