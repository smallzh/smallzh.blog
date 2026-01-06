## Context题目
---
![](../imgs/spring_context_core.jpg)

context的核心内容

---

## 控制反转(IoC)有什么作用? ⭐ :id=ioc-use
* 管理对象的创建和依赖关系的维护。对象的创建并不是一件简单的事，在对象关系比较复杂时，如果依赖关系需要程序猿来维护的话，那是相当头疼的
* 解耦，由容器去维护具体的对象
* 托管了类的产生过程，比如我们需要在类的产生过程中做一些处理，最直接的例子就是代理，如果有容器程序可以把这部分处理交给容器，应用程序则无需去关心类是如何完成代理的

## IOC的优点是什么？ ⭐ :id=ioc-feature
* IOC 或 依赖注入把应用的代码量降到最低。
* 它使应用容易测试，单元测试不再需要单例和JNDI查找机制。
* 最小的代价和最小的侵入性使松散耦合得以实现。
* IOC容器支持加载服务时的饿汉式初始化和懒加载。

## Spring 的 IoC支持哪些功能? ⭐ :id=ioc-func
Spring 的 IoC 设计支持以下功能：
* 依赖注入
* 依赖检查
* 自动装配
* 支持集合
* 指定初始化方法和销毁方法
* 支持回调某些方法（但是需要实现 Spring 接口，略有侵入）

其中，最重要的就是依赖注入，从 XML 的配置上说，即 ref 标签。对应 Springd的RuntimeBeanReference 对象。
对于 IoC 来说，最重要的就是容器。容器管理着 Bean 的生命周期，控制着 Bean 的依赖注入。

## 什么是Spring的依赖注入？ ⭐ :id=ioc-di
控制反转IoC是一个很大的概念，可以用不同的方式来实现。其主要实现方式有两种：依赖注入和依赖查找
依赖注入：相对于IoC而言，依赖注入(DI)更加准确地描述了IoC的设计理念。所谓依赖注入（Dependency Injection），即组件之间的依赖关系由容器在应用系统运行期来决定，也就是由容器动态地将某种依赖关系的目标对象实例注入到应用系统中的各个关联的组件之中。组件不做定位查询，只提供普通的Java方法让容器去决定依赖关系。

## 依赖注入的基本原则? ⭐⭐⭐ :id=ioc-di-principle
依赖注入的基本原则是：应用组件不应该负责查找资源或者其他依赖的协作对象。配置对象的工作应该由IoC容器负责，“查找资源”的逻辑应该从应用组件的代码中抽取出来，交给IoC容器负责。容器全权负责组件的装配，它会把符合依赖关系的对象通过属性（JavaBean中的setter）或者是构造器传递给需要的对象。

## 依赖注入有什么优势? ⭐ :id=ioc-di-quality
依赖注入之所以更流行是因为它是一种更可取的方式：让容器全权负责依赖查询，受管组件只需要暴露JavaBean的setter方法或者带参数的构造器或者接口，使容器可以在初始化时组装对象的依赖关系。其与依赖查找方式相比，主要优势为：
* 查找定位操作与应用代码完全无关。
* 不依赖于容器的API，可以很容易地在任何容器以外使用应用对象。
* 不需要特殊的接口，绝大多数对象可以做到完全不必依赖容器。

## 有哪些不同类型的依赖注入实现方式？⭐⭐ :id=ioc-di-method
依赖注入是时下最流行的IoC实现方式，依赖注入分为接口注入（Interface Injection），Setter方法注入（Setter Injection）和构造器注入（Constructor Injection）三种方式。其中接口注入由于在灵活性和易用性比较差，现在从Spring4开始已被废弃。

* 构造器依赖注入：构造器依赖注入通过容器触发一个类的构造器来实现的，该类有一系列参数，每个参数代表一个对其他类的依赖。
* Setter方法注入：Setter方法注入是容器通过调用无参构造器或无参static工厂 方法实例化bean之后，调用该bean的setter方法，即实现了基于setter的依赖注入。

## 构造器依赖注入和 Setter方法注入的区别? ⭐⭐ :id=di-m-diff
|构造函数注入|setter 注入|
|---|---|
|没有部分注入	|有部分注入|
|不会覆盖 setter 属性|	会覆盖 setter 属性|
|任意修改都会创建一个新实例|	任意修改不会创建一个新实例|
|适用于设置很多属性|	适用于设置少量属性|

两种依赖方式都可以使用，构造器注入和Setter方法注入。最好的解决方案是用构造器参数实现强制依赖，setter方法实现可选依赖。

---

## 怎么理解Spring IOC 容器?  ⭐⭐⭐ :id=ioc-concept
控制反转即IoC (Inversion of Control)，它把传统上由程序代码直接操控的对象的调用权交给容器，通过容器来实现对象组件的装配和管理。所谓的“控制反转”概念就是对组件对象控制权的转移，从程序代码本身转移到了外部容器。

Spring IOC 负责创建对象，管理对象（通过依赖注入（DI），装配对象，配置对象，并且管理这些对象的整个生命周期。

Spring 通过一个配置文件描述 Bean 及 Bean 之间的依赖关系，利用 Java 语言的反射功能实例化
Bean 并建立 Bean 之间的依赖关系。 Spring 的 IoC 容器在完成这些底层工作的基础上，还提供
了 Bean 实例缓存、生命周期管理、 Bean 实例代理、事件发布、资源装载等高级服务。

![](../imgs/spring_6.jpg)

## Spring IoC 的实现机制？⭐⭐⭐ :id=ioc-theory
Spring 中的 IoC 的实现原理就是
> 1. **工厂模式**
> 1. **反射机制**

```java
interface Fruit {
   public abstract void eat();
 }

class Apple implements Fruit {
    public void eat(){
        System.out.println("Apple");
    }
}

class Orange implements Fruit {
    public void eat(){
        System.out.println("Orange");
    }
}

class Factory {
    public static Fruit getInstance(String ClassName) {
        Fruit f=null;
        try {
            f=(Fruit)Class.forName(ClassName).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }
}

class Client {
    public static void main(String[] a) {
        Fruit f=Factory.getInstance("io.github.dunwu.spring.Apple");
        if(f!=null){
            f.eat();
        }
    }
}
```

## IoC的核心组件有哪些？⭐⭐⭐⭐⭐ :id=ioc-realize
> BeanFactory-框架基础设施

BeanFactory 是 Spring 框架的基础设施，面向 Spring 本身；ApplicationContext 面向使用Spring 框架的开发者，几乎所有的应用场合我们都直接使用 ApplicationContext 而非底层的 BeanFactory。

![](../imgs/ioc_5.jpg)

**1 BeanFactory 顶层接口**

位于类结构树的顶端 ，它最主要的方法就是 getBean(String beanName)，该方法从容器中返回特定名称的 Bean，BeanFactory 的功能通过其他的接口得到不断扩展

**2 ListableBeanFactory**

该接口定义了访问容器中 Bean 基本信息的若干方法，如查看 Bean 的个数、获取某一类型Bean 的配置名、查看容器中是否包括某一 Bean 等方法；

**3 HierarchicalBeanFactory 父子级联**

父子级联 IoC 容器的接口，子容器可以通过接口方法访问父容器； 通过HierarchicalBeanFactory 接口， Spring 的 IoC 容器可以建立父子层级关联的容器体系，子容器可以访问父容器中的 Bean，但父容器不能访问子容器的 Bean。Spring 使用父子容器实现了很多功能，比如在 Spring MVC 中，展现层 Bean 位于一个子容器中，而业务层和持久层的 Bean 位于父容器中。这样，展现层 Bean 就可以引用业务层和持久层的 Bean，而业务层和持久层的 Bean 则看不到展现层的 Bean。

**4 ConfigurableBeanFactory**

是一个重要的接口，增强了 IoC 容器的可定制性，它定义了设置类装载器、属性编辑器、容器初始化后置处理器等方法；

**5 AutowireCapableBeanFactory 自动装配**

定义了将容器中的 Bean 按某种规则（如按名字匹配、按类型匹配等）进行自动装配的方法；

**6 BeanDefinitionRegistry 注册表**

Spring 配置文件中每一个节点元素在 Spring 容器里都通过一个 BeanDefinition 对象表示，它描述了 Bean 的配置信息。而 BeanDefinitionRegistry 接口提供了向容器手工注册BeanDefinition 对象的方法。

**7 SingletonBeanRegistry 运行期间注册单例 Bean**

定义了允许在运行期间向容器注册单实例 Bean 的方法；对于单实例（ singleton）的 Bean 来说，BeanFactory 会缓存 Bean 实例，所以第二次使用 getBean() 获取 Bean 时将直接从IoC 容器的缓存中获取 Bean 实例。Spring 在 DefaultSingletonBeanRegistry 类中提供了一个用于缓存单实例 Bean 的缓存器，它是一个用 HashMap 实现的缓存器，单实例的 Bean 以beanName 为键保存在这个 HashMap 中。

**8 依赖日志框框**

在初始化 BeanFactory 时，必须为其提供一种日志框架，比如使用 Log4J， 即在类路径下提供 Log4J 配置文件，这样启动 Spring 容器才不会报错。

## 说一下ApplicationContext的内部组件？⭐⭐⭐⭐⭐ :id=ioc-app-context
ApplicationContext 由 BeanFactory 派 生 而 来 ， 提 供 了 更 多 面 向 实 际 应 用 的 功 能 。ApplicationContext 继承了 HierarchicalBeanFactory 和 ListableBeanFactory 接口，在此基础上，还通过多个其他的接口扩展了 BeanFactory 的功能：

![](../imgs/spring_7.jpg)

1. ApplicationEventPublisher：让容器拥有发布应用上下文事件的功能，包括容器启动事件、关闭事件等。
1. MessageSource：为应用提供 i18n 国际化消息访问的功能；
1. ResourcePatternResolver ： 所 有 ApplicationContext 实现类都实现了类似于PathMatchingResourcePatternResolver 的功能，可以通过带前缀的 Ant 风格的资源文件路径装载 Spring 的配置文件。
1. LifeCycle：该接口是 Spring 2.0 加入的，该接口提供了 start()和 stop()两个方法，主要用于控制异步处理过程。在具体使用时，该接口同时被 ApplicationContext 实现及具体Bean 实现， ApplicationContext 会将 start/stop 的信息传递给容器中所有实现了该接口的 Bean，以达到管理和控制 JMX、任务调度等目的。
1. ConfigurableApplicationContext 扩展于 ApplicationContext，它新增加了两个主要的方法： refresh()和 close()，让 ApplicationContext 具有启动、刷新和关闭应用上下文的能力。在应用上下文关闭的情况下调用 refresh()即可启动应用上下文，在已经启动的状态下，调用 refresh()则清除存并重新装载配置信息，而调用 close()则可关闭应用上下文。

## ApplicationContext通常的实现是什么？ ⭐ :id=ioc-a-ext
1. FileSystemXmlApplicationContext ：此容器从一个XML文件中加载beans的定义，XML Bean 配置文件的全路径名必须提供给它的构造函数。
1. ClassPathXmlApplicationContext：此容器也从一个XML文件中加载beans的定义，这里，你需要正确设置classpath因为这个容器将在classpath里找bean配置。
1. WebXmlApplicationContext：此容器加载一个XML文件，此文件定义了一个WEB应用的所有bean。

## 解释一下WebApplication？⭐⭐⭐⭐ :id=ioc-web-app
WebApplicationContext 是专门为 Web 应用准备的，它允许从相对于 Web 根目录的
路径中装载配置文件完成初始化工作。从 WebApplicationContext 中可以获得
ServletContext 的引用，整个 Web 应用上下文对象将作为属性放置到 ServletContext 
中，以便 Web 应用环境可以访问 Spring 应用上下文。

![](../imgs/spring_8.jpg)

## BeanFactory 和 ApplicationContext有什么区别？⭐⭐⭐⭐ :id=ioc-ba-diff
BeanFactory和ApplicationContext是Spring的两大核心接口，都可以当做Spring的容器。其中ApplicationContext是BeanFactory的子接口。

**依赖关系**

BeanFactory：是Spring里面最底层的接口，包含了各种Bean的定义，读取bean配置文档，管理bean的加载、实例化，控制bean的生命周期，维护bean之间的依赖关系。
ApplicationContext接口作为BeanFactory的派生，除了提供BeanFactory所具有的功能外，还提供了更完整的框架功能：
* 继承MessageSource，因此支持国际化。
* 统一的资源文件访问方式。
* 提供在监听器中注册bean的事件。
* 同时加载多个配置文件。
* 载入多个（有继承关系）上下文 ，使得每一个上下文都专注于一个特定的层次，比如应用的web层。

**加载方式**

BeanFactroy采用的是延迟加载形式来注入Bean的，即只有在使用到某个Bean时(调用getBean())，才对该Bean进行加载实例化。这样，我们就不能发现一些存在的Spring的配置问题。如果Bean的某一个属性没有注入，BeanFacotry加载后，直至第一次使用调用getBean方法才会抛出异常。
ApplicationContext，它是在容器启动时，一次性创建了所有的Bean。这样，在容器启动时，我们就可以发现Spring中存在的配置错误，这样有利于检查所依赖属性是否注入。 ApplicationContext启动后预载入所有的单实例Bean，通过预载入单实例bean ,确保当你需要的时候，你就不用等待，因为它们已经创建好了。
相对于基本的BeanFactory，ApplicationContext 唯一的不足是占用内存空间。当应用程序配置Bean较多时，程序启动较慢。

**创建方式**

BeanFactory通常以编程的方式被创建，ApplicationContext还能以声明的方式创建，如使用ContextLoader。

**注册方式**

BeanFactory和ApplicationContext都支持BeanPostProcessor、BeanFactoryPostProcessor的使用，但两者之间的区别是：BeanFactory需要手动注册，而ApplicationContext则是自动注册。

## 详细说一下BeanFactory和ApplicationContext的关系? ⭐⭐⭐⭐ :id=ioc-ba-real
Spring 作者 Rod Johnson 设计了两个接口用以表示容器。
* BeanFactory
* ApplicationContext
BeanFactory 简单粗暴，可以理解为就是个 HashMap，Key 是 BeanName，Value 是 Bean 实例。通常只提供注册（put），获取（get）这两个功能。我们可以称之为 “低级容器”。
ApplicationContext 可以称之为 “高级容器”。因为他比 BeanFactory 多了更多的功能。他继承了多个接口。因此具备了更多的功能。例如资源的获取，支持多种消息（例如 JSP tag 的支持），对 BeanFactory 多了工具级别的支持等待。所以你看他的名字，已经不是 BeanFactory 之类的工厂了，而是 “应用上下文”， 代表着整个大容器的所有功能。该接口定义了一个 refresh 方法，此方法是所有阅读 Spring 源码的人的最熟悉的方法，用于刷新整个容器，即重新加载/刷新所有的 bean。
当然，除了这两个大接口，还有其他的辅助接口，这里就不介绍他们了。

**BeanFactory和ApplicationContext的关系**

为了更直观的展示 “低级容器” 和 “高级容器” 的关系，这里通过常用的 ClassPathXmlApplicationContext 类来展示整个容器的层级 UML 关系。

![](../imgs/bean_facatory_vs_application_context.png) 

有点复杂？ 先不要慌，我来解释一下。
最上面的是 BeanFactory，下面的 3 个绿色的，都是功能扩展接口，这里就不展开讲。
看下面的隶属 ApplicationContext 粉红色的 “高级容器”，依赖着 “低级容器”，这里说的是依赖，不是继承哦。他依赖着 “低级容器” 的 getBean 功能。而高级容器有更多的功能：支持不同的信息源头，可以访问文件资源，支持应用事件（Observer 模式）。
通常用户看到的就是 “高级容器”。 但 BeanFactory 也非常够用啦！
左边灰色区域的是 “低级容器”， 只负载加载 Bean，获取 Bean。容器其他的高级功能是没有的。例如上图画的 refresh 刷新 Bean 工厂所有配置，生命周期事件回调等。

**小结**

说了这么多，不知道你有没有理解Spring IoC？ 这里小结一下：IoC 在 Spring 里，只需要低级容器就可以实现，2 个步骤：
* 加载配置文件，解析成 BeanDefinition 放在 Map 里。
* 调用 getBean 的时候，从 BeanDefinition 所属的 Map 里，拿出 Class 对象进行实例化，同时，如果有依赖关系，将递归调用 getBean 方法 —— 完成依赖注入。

上面就是 Spring 低级容器（BeanFactory）的 IoC。
至于高级容器 ApplicationContext，他包含了低级容器的功能，当他执行 refresh 模板方法的时候，将刷新整个容器的 Bean。同时其作为高级容器，包含了太多的功能。一句话，他不仅仅是 IoC。他支持不同信息源头，支持 BeanFactory 工具类，支持层级容器，支持访问文件资源，支持事件发布通知，支持接口回调等等。