## AOP题目
---
## 什么是AOP? ⭐⭐⭐ :id=aop-concept
OOP(Object-Oriented Programming)面向对象编程，允许开发者定义纵向的关系，但并适用于定义横向的关系，导致了大量代码的重复，而不利于各个模块的重用。
AOP(Aspect-Oriented Programming)，一般称为面向切面编程，作为面向对象的一种补充，用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取并封装为一个可重用的模块，这个模块被命名为“切面”（Aspect），减少系统中的重复代码，降低了模块间的耦合度，同时提高了系统的可维护性。可用于权限认证、日志、事务处理等。

"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，
并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共
同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未
来的可操作性和可维护性。
使用"横切"技术，AOP 把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流
程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生
在核心关注点的多处，而各处基本相似，比如权限认证、日志、事物。AOP 的作用在于分离系统
中的各种关注点，将核心关注点和横切关注点分离开来。

![](../imgs/aop_2.jpg)


## Spring AOP 有哪些实现方式？⭐⭐ :id=aop-diff
> AOP ,AspectJ AOP 有什么区别

AOP实现的关键在于 代理模式，AOP代理主要分为静态代理和动态代理。静态代理的代表为AspectJ；动态代理则以Spring AOP为代表。
1. AspectJ是静态代理的增强，所谓静态代理，就是AOP框架会在编译阶段生成AOP代理类，因此也称为编译时增强，他会在编译阶段将AspectJ(切面)织入到Java字节码中，运行的时候就是增强之后的AOP对象。
1. Spring AOP使用的动态代理，所谓的动态代理就是说AOP框架不会去修改字节码，而是每次运行时在内存中临时为方法生成一个AOP对象，这个AOP对象包含了目标对象的全部方法，并且在特定的切点做了增强处理，并回调原对象的方法。

## JDK动态代理和CGLIB动态代理的区别? ⭐⭐⭐ :id=aop-cglib
Spring AOP中的动态代理主要有两种方式，JDK动态代理和CGLIB动态代理：
* JDK动态代理只提供接口的代理，不支持类的代理。核心InvocationHandler接口和Proxy类，InvocationHandler 通过invoke()方法反射来调用目标类中的代码，动态地将横切逻辑和业务编织在一起；接着，Proxy利用 InvocationHandler动态创建一个符合某一接口的的实例, 生成目标类的代理对象。
* 如果代理类没有实现 InvocationHandler 接口，那么Spring AOP会选择使用CGLIB来动态代理目标类。CGLIB（Code Generation Library），是一个代码生成的类库，可以在运行时动态的生成指定类的一个子类对象，并覆盖其中特定方法并添加增强代码，从而实现AOP。CGLIB是通过继承的方式做的动态代理，因此如果某个类被标记为final，那么它是无法使用CGLIB做动态代理的。

静态代理与动态代理区别在于生成AOP代理对象的时机不同，相对来说AspectJ的静态代理方式具有更好的性能，但是AspectJ需要特定的编译器进行处理，而Spring AOP则无需特定的编译器处理。
InvocationHandler 的 invoke(Object proxy,Method method,Object[] args)：proxy是最终生成的代理实例; method 是被代理目标实例的某个具体方法; args 是被代理目标实例某个方法的具体入参, 在方法反射调用时使用。

## 如何理解 Spring 中的代理？⭐ :id=spring-proxy
将 Advice 应用于目标对象后创建的对象称为代理。在客户端对象的情况下，目标对象和代理对象是相同的。 Advice + Target Object = Proxy

## 解释一下Spring AOP里面的几个名词? ⭐⭐⭐⭐ :id=aop-words
1. 切面（Aspect）：切面是通知和切点的结合。通知和切点共同定义了切面的全部内容。 在Spring AOP中，切面可以使用通用类（基于模式的风格） 或者在普通类中以 @AspectJ 注解来实现。
1. 连接点（Join point）：指方法，在Spring AOP中，一个连接点 总是 代表一个方法的执行。 应用可能有数以千计的时机应用通知。这些时机被称为连接点。连接点是在应用执行过程中能够插入切面的一个点。这个点可以是调用方法时、抛出异常时、甚至修改一个字段时。切面代码可以利用这些点插入到应用的正常流程之中，并添加新的行为。
1. 通知（Advice）：在AOP术语中，切面的工作被称为通知。
1. 切入点（Pointcut）：切点的定义会匹配通知所要织入的一个或多个连接点。我们通常使用明确的类和方法名称，或是利用正则表达式定义所匹配的类和方法名称来指定这些切点。
1. 引入（Introduction）：引入允许我们向现有类添加新方法或属性。
1. 目标对象（Target Object）： 被一个或者多个切面（aspect）所通知（advise）的对象。它通常是一个代理对象。也有人把它叫做 被通知（adviced） 对象。 既然Spring AOP是通过运行时代理实现的，这个对象永远是一个 被代理（proxied） 对象。
1. 织入（Weaving）：织入是把切面应用到目标对象并创建新的代理对象的过程。

解释2：

1. 切面（aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象
2. 横切关注点：对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点。
3. 连接点（joinpoint）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring
中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器。
4. 切入点（pointcut）：对连接点进行拦截的定义
5. 通知（advice）：所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、
异常、最终、环绕通知五类。
6. 目标对象：代理的目标对象
7. 织入（weave）：将切面应用到目标对象并导致代理对象创建的过程
8. 引入（introduction）：在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法
或字段。

![](../imgs/aop_1.jpg)

在目标对象的生命周期里有多少个点可以进行织入：

* 编译期：切面在目标类编译时被织入。AspectJ的织入编译器是以这种方式织入切面的。
* 类加载期：切面在目标类加载到JVM时被织入。需要特殊的类加载器，它可以在目标类被引入应用之前增强该目标类的字节码。AspectJ5的加载时织入就支持以这种方式织入切面。
* 运行期：切面在应用运行的某个时刻被织入。一般情况下，在织入切面时，AOP容器会为目标对象动态地创建一个代理对象。SpringAOP就是以这种方式织入切面。

## Spring在运行时通知对象? ⭐ :id=aop-advice
通过在代理类中包裹切面，Spring在运行期把切面织入到Spring管理的bean中。代理封装了目标类，并拦截被通知方法的调用，再把调用转发给真正的目标bean。当代理拦截到方法调用时，在调用目标bean方法之前，会执行切面逻辑。
直到应用需要被代理的bean时，Spring才创建代理对象。如果使用的是ApplicationContext的话，在ApplicationContext从BeanFactory中加载所有bean的时候，Spring才会创建被代理的对象。因为Spring运行时才创建代理对象，所以我们不需要特殊的编译器来织入SpringAOP的切面。

## Spring只支持方法级别的连接点? ⭐ :id=aop-join
因为Spring基于动态代理，所以Spring只支持方法连接点。Spring缺少对字段连接点的支持，而且它不支持构造器连接点。方法之外的连接点拦截功能，我们可以利用Aspect来补充。

## 在Spring AOP 中，关注点和横切关注的区别是什么？⭐⭐⭐ :id=aop-point
> 在 spring aop 中 concern 和 cross-cutting concern 的不同之处

关注点（concern）是应用中一个模块的行为，一个关注点可能会被定义成一个我们想实现的一个功能。
横切关注点（cross-cutting concern）是一个关注点，此关注点是整个应用都会使用的功能，并影响整个应用，比如日志，安全和数据传输，几乎应用的每个模块都需要的功能。因此这些都属于横切关注点。

## Spring通知有哪些类型？⭐⭐ :id=aop-advice-type
在AOP术语中，切面的工作被称为通知，实际上是程序执行时要通过SpringAOP框架触发的代码段。Spring切面可以应用5种类型的通知：
* 前置通知（Before）：在目标方法被调用之前调用通知功能；
* 后置通知（After）：在目标方法完成之后调用通知，此时不会关心方法的输出是什么；
* 返回通知（After-returning ）：在目标方法成功执行之后调用通知；
* 异常通知（After-throwing）：在目标方法抛出异常后调用通知；
* 环绕通知（Around）：通知包裹了被通知的方法，在被通知的方法调用之前和调用之后执行自定义的行为。

同一个aspect，不同advice的执行顺序：

1. 没有异常情况下的执行顺序：
around before advice，before advice，target method 执行，around after advice，after advice，afterReturning
2. 有异常情况下的执行顺序：
around before advice，before advice，target method 执行，around after advice，after advice，afterThrowing:异常发生，java.lang.RuntimeException: 异常发生

## 什么是切面 Aspect？⭐ :id=aspect-concept
aspect 由 advice 和pointcount 组成，切面是通知和切点的结合。 它既包含了横切逻辑的定义, 也包括了连接点的定义. Spring AOP 就是负责实施切面的框架, 它将切面所定义的横切逻辑编织到切面所指定的连接点中.
AOP 的工作重心在于如何将增强编织目标对象的连接点上, 这里包含两个工作:
1. 如何通过 pointcut 和 advice 定位到特定的 joinpoint 上
1. 如何在 advice 中编写切面代码.
可以简单地认为, 使用 @Aspect 注解的类就是切面.

![](../imgs/aop.png)

## Spring中面向切面的配置方式有哪几种?  ⭐ :id=aop-use-method
1. 在这种情况下，切面由常规类以及基于XML的配置实现。
1. 在这种情况下(基于@AspectJ的实现)，涉及到的切面声明的风格与带有java5标注的普通java类一致。

## 有几种不同类型的自动代理？⭐ :id=aop-auto-proxy
1. BeanNameAutoProxyCreator
1. DefaultAdvisorAutoProxyCreator
1. Metadata autoproxying

## AOP有哪些应用场景？⭐ :id=aop-sence
AOP 主要应用场景有：
1. Authentication 权限
2. Caching 缓存
3. Context passing 内容传递
4. Error handling 错误处理
5. Lazy loading 懒加载
6. Debugging 调试
7. logging, tracing, profiling and monitoring 记录跟踪 优化 校准
8. Performance optimization 性能优化
9. Persistence 持久化
10. Resource pooling 资源池
11. Synchronization 同步
12. Transactions 事务

## AOP使用哪些代理方式？⭐⭐⭐ :id=aop-proxy
Spring 提供了两种方式来生成代理对象: JDKProxy 和 Cglib，具体使用哪种方式生成由
AopProxyFactory 根据 AdvisedSupport 对象的配置来决定。默认的策略是如果目标类是接口，
则使用 JDK 动态代理技术，否则使用 Cglib 来生成代理。

**1 JDK 动态接口代理**

JDK 动态代理主要涉及到 java.lang.reflect 包中的两个类：Proxy 和 InvocationHandler。
InvocationHandler是一个接口，通过实现该接口定义横切逻辑，并通过反射机制调用目标类
的代码，动态将横切逻辑和业务逻辑编制在一起。Proxy 利用 InvocationHandler 动态创建
一个符合某一接口的实例，生成目标类的代理对象。

**2 CGLib 动态代理**

CGLib 全称为 Code Generation Library，是一个强大的高性能，高质量的代码生成类库，
可以在运行期扩展 Java 类与实现 Java 接口，CGLib 封装了 asm，可以再运行期动态生成新
的 class。和 JDK 动态代理相比较：JDK 创建代理有一个限制，就是只能为接口创建代理实例，
而对于没有通过接口定义业务方法的类，则可以通过 CGLib 创建动态代理。

## Spring中怎么使用AOP？⭐⭐ :id=use-aop
```java
@Aspect
public class TransactionDemo {
 @Pointcut(value="execution(* com.yangxin.core.service.*.*.*(..))")
 public void point(){
 }
 @Before(value="point()")
 public void before(){
 System.out.println("transaction begin");
 }
 @AfterReturning(value = "point()")
 public void after(){
 System.out.println("transaction commit");
 }
 @Around("point()")
 public void around(ProceedingJoinPoint joinPoint) throws Throwable{
 System.out.println("transaction begin");
 joinPoint.proceed();
 System.out.println("transaction commit");
 }
}
```