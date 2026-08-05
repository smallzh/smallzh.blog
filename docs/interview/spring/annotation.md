## Spring注解内容
---
## 1 什么是基于Java的Spring注解配置? ⭐ :id=config-java
基于Java的配置，允许你在少量的Java注解的帮助下，进行你的大部分Spring配置而非通过XML文件。
以@Configuration 注解为例，它用来标记类可以当做一个bean的定义，被Spring IOC容器使用。
另一个例子是@Bean注解，它表示此方法将要返回一个对象，作为一个bean注册进Spring应用上下文。
```java
@Configuration
public class StudentConfig {
    @Bean
    public StudentBean myStudent() {
        return new StudentBean();
    }
}
```

## 2 怎样开启注解装配？⭐ :id=config-enable
注解装配在默认情况下是不开启的，为了使用注解装配，我们必须在Spring配置文件中配置 \<context:annotation-config/>元素。

## 3 @Component,@Controller,@Repository,@Service有何区别？⭐⭐⭐ :id=anno-diff
* @Component：这将 java 类标记为 bean。它是任何 Spring 管理组件的通用构造型。spring 的组件扫描机制现在可以将其拾取并将其拉入应用程序环境中。
* @Controller：这将一个类标记为 Spring Web MVC 控制器。标有它的 Bean 会自动导入到 IoC 容器中。
* @Service：此注解是组件注解的特化。它不会对 @Component 注解提供任何其他行为。您可以在服务层类中使用 @Service 而不是 @Component，因为它以更好的方式指定了意图。
* @Repository：这个注解是具有类似用途和功能的 @Component 注解的特化。它为 DAO 提供了额外的好处。它将 DAO 导入 IoC 容器，并使未经检查的异常有资格转换为 Spring DataAccessException。

## 4 @Required 注解有什么作用? ⭐ :id=anno-req
这个注解表明bean的属性必须在配置的时候设置，通过一个bean定义的显式的属性值或通过自动装配，若@Required注解的bean属性未被设置，容器将抛出BeanInitializationException。示例：
```java
public class Employee {
    private String name;
    @Required
    public void setName(String name){
        this.name=name;
    }
    public string getName(){
        return name;
    }
}
```

## 5 @Autowired 注解有什么作用? ⭐ :id=anno-auto
@Autowired默认是按照类型装配注入的，默认情况下它要求依赖对象必须存在（可以设置它required属性为false）。@Autowired 注解提供了更细粒度的控制，包括在何处以及如何完成自动装配。它的用法和@Required一样，修饰setter方法、构造器、属性或者具有任意名称和/或多个参数的PN方法。
```java
public class Employee {
    private String name;
    @Autowired
    public void setName(String name) {
        this.name=name;
    }
    public string getName(){
        return name;
    }
}
```

## 6 @Autowired和@Resource之间的区别? ⭐⭐⭐ :id=anno-auto-res-diff
@Autowired可用于：构造函数、成员变量、Setter方法
@Autowired和@Resource之间的区别

* @Autowired默认是按照类型装配注入的，默认情况下它要求依赖对象必须存在（可以设置它required属性为false）。
* @Resource默认是按照名称来装配注入的，只有当找不到与名称匹配的bean才会按照类型来装配注入。

## 7 @Qualifier 注解有什么作用? ⭐ :id=anno-qua
当您创建多个相同类型的 bean 并希望仅使用属性装配其中一个 bean 时，您可以使用@Qualifier 注解和 @Autowired 通过指定应该装配哪个确切的 bean 来消除歧义。

## 8 @RequestMapping 注解有什么用？⭐ :id=anno-req-map
@RequestMapping 注解用于将特定 HTTP 请求方法映射到将处理相应请求的控制器中的特定类/方法。此注释可应用于两个级别：
* 类级别：映射请求的 URL
* 方法级别：映射 URL 以及 HTTP 请求方法

## 9 Spring中有哪些常用注解？⭐⭐ :id=anno-type
bean 注入与装配的的方式有很多种，可以通过 xml，get set 方式，构造函数或者注解等。简单易
用的方式就是使用 Spring 的注解了，Spring 提供了大量的注解方式。

![](../imgs/spring_5.jpg)

## @ControllerAdvice和@ExceptionHandler配置全局异常处理？⭐⭐ :id=global-exception
将注解`@ControllerAdvice` 标记到一个类上，然后用`@ExceptionHandler` 标记到该类的方法上，并声明异常类型，完成全局异常处理

## @Configuration和@Bean的作用？⭐⭐ :id=conf-bean-anno
1. `@Configuration` 表面 类是一个 配置类
2. `@Bean` 表面 一个方法 返回一个 Bean对象

## 理解@PostConstruct和@PreDestroy作用？ ⭐⭐ :id=conf-post-pre
@PostConstruct注解好多人以为是Spring提供的。其实是Java自己的注解。

Java中该注解的说明：
> @PostConstruct该注解被用来修饰一个**非静态的void()**方法。被@PostConstruct修饰的方法会在服务器加载Servlet的时候运行，并且只会被服务器执行一次。PostConstruct在构造函数之后执行，`init()`方法之前执行。

通常我们会是在Spring框架中使用到@PostConstruct注解 该注解的方法在整个Bean初始化中的执行顺序：

> Constructor(构造方法) -> @Autowired(依赖注入) -> @PostConstruct(注释的方法)

在Spring中，使用 **类CommonAnnotationBeanPostProcessor** 专门处理`@PostConstruct` 和`@PreDestroy`注解，它是BeanPostProcessor接口的实现。

## @Scheduled的线程模型？ ⭐⭐ :id=schedule-thread
默认情况下是单线程的。也就是无论同时有多少个任务需要执行，都需要排队等待某个任务完成之后才能继续下一个任务。

如果，其中一个任务执行时间过长，则有可能会导致其他后续任务被阻塞直到该任务执行完成。也就是会造成一些任务无法定时执行的错觉。

**应对方法：**
1. 在schedule内部采用多线程
2. 通过ScheduledTaskRegistrar 将其配置成多线程模式