## Beans题目
---
## 1 什么是Spring beans？⭐ :id=beans-concept
Spring beans 是那些形成Spring应用的主干的java对象。它们被Spring IOC容器初始化，装配，和管理。这些beans通过容器中配置的元数据创建。比如，以XML文件中 的形式定义。

## 2 一个 Spring Bean 定义 包含什么？⭐ :id=beans-compose
一个Spring Bean 的定义包含容器必知的所有配置元数据，包括如何创建一个bean，它的生命周期详情及它的依赖。

## 3 如何给Spring 容器提供配置元数据？⭐⭐ :id=beans-meta
>Spring有几种配置方式

这里有三种重要的方法给Spring 容器提供配置元数据。
* XML配置文件。
* 基于注解的配置。
* 基于java的配置。

## 4 Spring配置文件包含了哪些信息? ⭐ :id=beans-config
Spring配置文件是个XML 文件，这个文件包含类信息，描述了如何配置它们，以及如何相互调用。

## 5 Spring基于xml注入bean的几种方式? ⭐⭐ :id=beans-di
* Set方法注入；
* 构造器注入：①通过index设置参数的位置；②通过type设置参数类型；
* 静态工厂注入；
* 实例工厂；

**1 构造器注入**

```java
/*带参数，方便利用构造器进行注入*/ 
 public CatDaoImpl(String message){ 
 this. message = message; 
 } 
<bean id="CatDaoImpl" class="com.CatDaoImpl"> 
<constructor-arg value=" message "></constructor-arg> 
</bean>
```

**2 setter 方法注入**

```java
 public class Id { 
 private int id; 
 public int getId() { return id; } 
 public void setId(int id) { this.id = id; } 
} 
<bean id="id" class="com.id "> <property name="id" value="123"></property> </bean>
```

**3 静态工厂注入**
静态工厂顾名思义，就是通过调用静态工厂的方法来获取自己需要的对象，为了让 spring 管理所
有对象，我们不能直接通过"工程类.静态方法()"来获取对象，而是依然通过 spring 注入的形式获
取：
```java
public class DaoFactory { //静态工厂 
 public static final FactoryDao getStaticFactoryDaoImpl(){ 
 return new StaticFacotryDaoImpl(); 
 } 
} 
public class SpringAction { 
 private FactoryDao staticFactoryDao; //注入对象
 //注入对象的 set 方法 
 public void setStaticFactoryDao(FactoryDao staticFactoryDao) { 
 this.staticFactoryDao = staticFactoryDao; 
 } 
} 
//factory-method="getStaticFactoryDaoImpl"指定调用哪个工厂方法
 <bean name="springAction" class=" SpringAction" > 
 <!--使用静态工厂的方法注入对象,对应下面的配置文件--> 
 <property name="staticFactoryDao" ref="staticFactoryDao"></property> 
 </bean> 
 <!--此处获取对象的方式是从工厂类中获取静态方法--> 
<bean name="staticFactoryDao" class="DaoFactory" 
factory-method="getStaticFactoryDaoImpl"></bean>
```

**4 实例工厂**

实例工厂的意思是获取对象实例的方法不是静态的，所以你需要首先 new 工厂类，再调用普通的
实例方法：
```java
 public class DaoFactory { //实例工厂 
 public FactoryDao getFactoryDaoImpl(){ 
 return new FactoryDaoImpl(); 
 } 
} 
public class SpringAction { 
 private FactoryDao factoryDao; //注入对象 
 public void setFactoryDao(FactoryDao factoryDao) { 
 this.factoryDao = factoryDao; 
 } 
} 
 <bean name="springAction" class="SpringAction"> 
 <!--使用实例工厂的方法注入对象,对应下面的配置文件--> 
 <property name="factoryDao" ref="factoryDao"></property> 
 </bean> 
 <!--此处获取对象的方式是从工厂类中获取实例方法--> 
<bean name="daoFactory" class="com.DaoFactory"></bean> 
<bean name="factoryDao" factory-bean="daoFactory"
factory-method="getFactoryDaoImpl"></bean> 
```

## 6 你怎样定义类的作用域？⭐⭐ :id=beans-scope
当定义一个bean在Spring里，我们还能给这个bean声明一个作用域。它可以通过bean 定义中的scope属性来定义。如，当Spring要在需要的时候每次生产一个新的bean实例，bean的scope属性被指定为prototype。另一方面，一个bean每次使用的时候必须返回同一个实例，这个bean的scope 属性 必须设为 singleton。

Spring 3 中为 Bean 定义了 5 中作用域，分别为 singleton（单例）、prototype（原型）、
request、session 和 global session，5 种作用域说明如下：

* singleton : bean在每个Spring ioc 容器中只有一个实例。
* prototype：一个bean的定义可以有多个实例。
* request：每次http请求都会创建一个bean，该作用域仅在基于web的Spring ApplicationContext情形下有效。
* session：在一个HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。
* global-session：在一个全局的HTTP Session中，一个bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。

注意： 缺省的Spring bean 的作用域是Singleton。使用 prototype 作用域需要慎重的思考，因为频繁创建和销毁 bean 会带来很大的性能开销。

**1 singleton：单例模式（多线程下不安全）**

singleton：单例模式，Spring IoC 容器中只会存在一个共享的 Bean 实例，无论有多少个Bean 引用它，始终指向同一对象。该模式在多线程下是不安全的。Singleton 作用域是Spring 中的缺省作用域，也可以显示的将 Bean 定义为 singleton 模式，配置为：
```xml
<bean id="userDao" class="com.ioc.UserDaoImpl" scope="singleton"/>
```

**2 prototype:原型模式每次使用时创建**

prototype:原型模式，每次通过 Spring 容器获取 prototype 定义的 bean 时，容器都将创建
一个新的 Bean 实例，每个 Bean 实例都有自己的属性和状态，而 singleton 全局只有一个对
象。根据经验，对有状态的bean使用prototype作用域，而对无状态的bean使用singleton
作用域。

**3 Request：一次 request 一个实例**

request：在一次 Http 请求中，容器会返回该 Bean 的同一实例。而对不同的 Http 请求则会
产生新的 Bean，而且该 bean 仅在当前 Http Request 内有效,当前 Http 请求结束，该 bean
实例也将会被销毁。
```xml
<bean id="loginAction" class="com.cnblogs.Login" scope="request"/>
```

**4 session**

session：在一次 Http Session 中，容器会返回该 Bean 的同一实例。而对不同的 Session 请
求则会创建新的实例，该 bean 实例仅在当前 Session 内有效。同 Http 请求相同，每一次
session 请求创建新的实例，而不同的实例之间不共享属性，且实例仅在自己的 session 请求
内有效，请求结束，则实例将被销毁。
```xml
<bean id="userPreference" class="com.ioc.UserPreference" scope="session"/>
```

**5 global Session**

global Session：在一个全局的 Http Session 中，容器会返回该 Bean 的同一个实例，仅在使用 portlet context 时有效。

## 8 Spring框架中的单例bean是线程安全的吗？⭐⭐⭐ :id=beans-thread
不是，Spring框架中的单例bean不是线程安全的。
spring 中的 bean 默认是单例模式，spring 框架并没有对单例 bean 进行多线程的封装处理。
实际上大部分时候 spring bean 无状态的（比如 dao 类），所有某种程度上来说 bean 也是安全的，但如果 bean 有状态的话（比如 view model 对象），那就要开发者自己去保证线程安全了，最简单的就是改变 bean 的作用域，把“singleton”变更为“prototype”，这样请求 bean 相当于 new Bean()了，所以就可以保证线程安全了。

* 有状态就是有数据存储功能。
* 无状态就是不会保存数据。

## 9 Spring如何处理线程并发问题？⭐⭐⭐ :id=beans-concurrent
在一般情况下，只有无状态的Bean才可以在多线程环境下共享，在Spring中，绝大部分Bean都可以声明为singleton作用域，因为Spring对一些Bean中非线程安全状态采用ThreadLocal进行处理，解决线程安全问题。
ThreadLocal和线程同步机制都是为了解决多线程中相同变量的访问冲突问题。

同步机制采用了“时间换空间”的方式，仅提供一份变量，不同的线程在访问前需要获取锁，没获得锁的线程则需要排队。

而ThreadLocal采用了“空间换时间”的方式。

ThreadLocal会为每一个线程提供一个独立的变量副本，从而隔离了多个线程对数据的访问冲突。因为每一个线程都拥有自己的变量副本，从而也就没有必要对该变量进行同步了。ThreadLocal提供了线程安全的共享对象，在编写多线程代码时，可以把不安全的变量封装进ThreadLocal。

## 10 解释Spring框架中bean的生命周期? ⭐⭐⭐⭐⭐ :id=beans-life
在传统的Java应用中，bean的生命周期很简单。使用Java关键字new进行bean实例化，然后该bean就可以使用了。一旦该bean不再被使用，则由Java自动进行垃圾回收。相比之下，Spring容器中的bean的生命周期就显得相对复杂了。正确理解Spring bean的生命周期非常重要，因为你或许要利用Spring提供的扩展点来自定义bean的创建过程。

![](../imgs/spring_bean_3.png)

![](../imgs/spring_bean_4.png)

我们对上图进行详细描述：
1. Spring对bean进行实例化；
1. Spring将值和bean的引用注入到bean对应的属性中；
1. 如果bean实现了BeanNameAware接口，Spring将bean的ID传递给setBean-Name()方法；
1. 如果bean实现了BeanFactoryAware接口，Spring将调用setBeanFactory()方法，将BeanFactory容器实例传入；
1. 如果bean实现了ApplicationContextAware接口，Spring将调用setApplicationContext()方法，将bean所在的应用上下文的引用传入进来；
1. 如果bean实现了BeanPostProcessor接口，Spring将调用它们的post-ProcessBeforeInitialization()方法；
1. 如果bean实现了InitializingBean接口，Spring将调用它们的after-PropertiesSet()方法。类似地，如果bean使用initmethod声明了初始化方法，该方法也会被调用；
1. 如果bean实现了BeanPostProcessor接口，Spring将调用它们的post-ProcessAfterInitialization()方法；此时，bean已经准备就绪，可以被应用程序使用了，它们将一直驻留在应用上下文中，直到该应用上下文被销毁；
1. 如果bean实现了DisposableBean接口，Spring将调用它的destroy()接口方法。同样，如果bean使用destroy-method声明了销毁方法，该方法也会被调用。

现在你已经了解了如何创建和加载一个Spring容器。但是一个空的容器并没有太大的价值，在你把东西放进去之前，它里面什么都没有。为了从Spring的DI(依赖注入)中受益，我们必须将应用对象装配进Spring容器中。

---

![](../imgs/spring_9.jpg)

**Bean 创建阶段**：

1. 实例化：实例化一个 Bean，也就是我们常说的 new。
2. IoC注入：按照 Spring 上下文对实例化的 Bean 进行配置，也就是 IOC 注入。setBeanName 实现
3. BeanNameAware 实现：如果这个 Bean 已经实现了 BeanNameAware 接口，会调用它实现的 setBeanName(String)方法，此处传递的就是 Spring 配置文件中 Bean 的 id 值
4. BeanFactoryAware 实现：如果这个 Bean 已经实现了 BeanFactoryAware 接口，会调用它实现的 setBeanFactory，setBeanFactory(BeanFactory)传递的是 Spring 工厂自身（可以用这个方式来获取其它 Bean，只需在 Spring 配置文件中配置一个普通的 Bean 就可以）。
5. ApplicationContextAware 实现：如果这个 Bean 已经实现了 ApplicationContextAware 接口，会调用setApplicationContext(ApplicationContext)方法，传入 Spring 上下文（同样这个方式也可以实现步骤 4 的内容，但比 4 更好，因为 ApplicationContext 是 BeanFactory 的子接
口，有更多的实现方法）
6. postProcessBeforeInitialization 接口实现-初始化预处理：如果这个 Bean 关联了 BeanPostProcessor 接口，将会调用postProcessBeforeInitialization(Object obj, String s)方法，BeanPostProcessor 经常被用作是 Bean 内容的更改，并且由于这个是在 Bean 初始化结束时调用那个的方法，也可以被应用于内存或缓存技术。
7. init-method：如果 Bean 在 Spring 配置文件中配置了 init-method 属性会自动调用其配置的初始化方法。
8. postProcessAfterInitialization：如果这个 Bean 关联了 BeanPostProcessor 接口，将会调用
postProcessAfterInitialization(Object obj, String s)方法。

> 注：以上工作完成以后就可以应用这个 Bean 了，那这个 Bean 是一个 Singleton 的，所以一般情况下我们调用同一个 id 的 Bean 会是在内容地址相同的实例，当然在 Spring 配置文件中也可以配置非 Singleton。

**Destroy 过期自动清理阶段**

1. DisposableBean实现：当 Bean 不再需要时，会经过清理阶段，如果 Bean 实现了 DisposableBean 这个接口，会调用那个其实现的 destroy()方法；

1. destroy-method 自配置清理：最后，如果这个 Bean 的 Spring 配置中配置了 destroy-method 属性，会自动调用其配置的销毁方法。
1. 注解方式：bean 标签有两个重要的属性（init-method 和 destroy-method）。用它们你可以自己定制初始化和注销方法。它们也有相应的注解（@PostConstruct 和@PreDestroy）。

## 11 哪些是重要的bean生命周期方法？ ⭐⭐⭐⭐ :id=beans-im-life
> 你能重载它们吗

有两个重要的bean 生命周期方法，
第一个是setup ， 它是在容器加载bean的时候被调用。
第二个方法是 teardown 它是在容器卸载类的时候被调用。
bean 标签有两个重要的属性（init-method和destroy-method）。用它们你可以自己定制初始化和注销方法。它们也有相应的注解（@PostConstruct和@PreDestroy）。

## 12 什么是Spring的内部bean( inner beans)？⭐⭐⭐ :id=beans-inner
在Spring框架中，当一个bean仅被用作另一个bean的属性时，它能被声明为一个内部bean。内部bean可以用setter注入“属性”和构造方法注入“构造参数”的方式来实现，内部bean通常是匿名的，它们的Scope一般是prototype。

## 13 在 Spring中如何注入一个java集合？⭐⭐ :id=beans-col
Spring提供以下几种集合的配置元素：
类型用于注入一列值，允许有相同的值。
类型用于注入一组值，不允许有相同的值。
类型用于注入一组键值对，键和值都可以为任意类型。
类型用于注入一组键值对，键和值都只能为String类型。

## 14 什么是bean装配？⭐ :id=beans-auto-set
装配，或bean 装配是指在Spring 容器中把bean组装到一起，前提是容器需要知道bean的依赖关系，如何通过依赖注入来把它们装配到一起。

在Spring框架中，在配置文件中设定bean的依赖关系是一个很好的机制，Spring 容器能够自动装配相互合作的bean，这意味着容器不需要和配置，能通过Bean工厂自动处理bean之间的协作。这意味着 Spring可以通过向Bean Factory中注入的方式自动搞定bean之间的依赖关系。自动装配可以设置在每个bean上，也可以设定在特定的bean上。

## 16 spring 自动装配 bean 有哪些方式？⭐⭐ :id=beans-auto-setj-mehtod
在spring中，对象无需自己查找或创建与其关联的其他对象，由容器负责把需要相互协作的对象引用赋予各个对象，使用autowire来配置自动装载模式。
在Spring框架xml配置中共有5种自动装配：
* no：默认的方式是不进行自动装配的，通过手工设置ref属性来进行装配bean。
* byName：通过bean的名称进行自动装配，如果一个bean的 property 与另一bean 的name 相同，就进行自动装配。
* byType：通过参数的数据类型进行自动装配。
* constructor：利用构造函数进行装配，并且构造函数的参数通过byType进行装配。
* autodetect：自动探测，如果有构造方法，通过 construct的方式自动装配，否则使用 byType的方式自动装配。

Spring 装配包括手动装配和自动装配，手动装配是有基于 xml 装配、构造方法、setter 方法等
自动装配有五种自动装配的方式，可以用来指导 Spring 容器用自动装配方式来进行依赖注入。

1. no：默认的方式是不进行自动装配，通过显式设置 ref 属性来进行装配。
2. byName：通过参数名 自动装配，Spring 容器在配置文件中发现 bean 的 autowire 属性被设
置成 byname，之后容器试图匹配、装配和该 bean 的属性具有相同名字的 bean。
3. byType：通过参数类型自动装配，Spring 容器在配置文件中发现 bean 的 autowire 属性被
设置成 byType，之后容器试图匹配、装配和该 bean 的属性具有相同类型的 bean。如果有多
个 bean 符合条件，则抛出错误。
4. constructor：这个方式类似于 byType， 但是要提供给构造器参数，如果没有确定的带参数
的构造器参数类型，将会抛出异常。
5. autodetect：首先尝试使用 constructor 来自动装配，如果无法工作，则使用 byType 方式。

## 17 使用@Autowired注解自动装配的过程是怎样的？⭐⭐⭐ :id=beans-autowired
使用@Autowired注解来自动装配指定的bean。在使用@Autowired注解之前需要在Spring配置文件进行配置，<context:annotation-config />。
在启动spring IoC时，容器自动装载了一个AutowiredAnnotationBeanPostProcessor后置处理器，当容器扫描到@Autowied、@Resource或@Inject时，就会在IoC容器自动查找需要的bean，并装配给该对象的属性。在使用@Autowired时，首先在容器中查询对应类型的bean：
* 如果查询结果刚好为一个，就将该bean装配给@Autowired指定的数据；
* 如果查询的结果不止一个，那么@Autowired会根据名称来查找；
* 如果上述查找的结果为空，那么会抛出异常。解决方法时，使用required=false。

## 18 自动装配有哪些局限性？⭐⭐⭐ :id=beans-autowired-ne
自动装配的局限性是：
* 重写：你仍需用 和 配置来定义依赖，意味着总要重写自动装配。
* 基本数据类型：你不能自动装配简单的属性，如基本数据类型，String字符串，和类。
* 模糊特性：自动装配不如显式装配精确，如果有可能，建议使用显式装配。

## 19 你可以在Spring中注入一个null 和一个空字符串吗？⭐ :id=beans-auto-null
可以