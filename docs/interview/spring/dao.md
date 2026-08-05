## Dao模块题目
---
## 1 解释对象/关系映射集成模块? ⭐ :id=orm-concept
Spring 通过提供ORM模块，支持我们直接在JDBC之上使用一个对象/关系映射映射(ORM)工具，Spring 支持集成主流的ORM框架，如Hiberate，JDO和 iBATIS，JPA，TopLink，JDO，OJB 。Spring的事务管理同样支持以上所有ORM框架及JDBC。

## 2 在Spring框架中如何更有效地使用JDBC？⭐⭐ :id=jdbc-use
使用Spring JDBC 框架，资源管理和错误处理的代价都会被减轻。所以开发者只需写statements 和 queries从数据存取数据，JDBC也可以在Spring框架提供的模板类的帮助下更有效地被使用，这个模板叫JdbcTemplate

## 3 解释JDBC抽象和DAO模块? ⭐⭐⭐ :id=dao-abs
通过使用JDBC抽象和DAO模块，保证数据库代码的简洁，并能避免数据库资源错误关闭导致的问题，它在各种不同的数据库的错误信息之上，提供了一个统一的异常访问层。它还利用Spring的AOP 模块给Spring应用中的对象提供事务管理服务。

## 4 spring DAO 有什么用？⭐ :id=dao-use
Spring DAO（数据访问对象） 使得 JDBC，Hibernate 或 JDO 这样的数据访问技术更容易以一种统一的方式工作。这使得用户容易在持久性技术之间切换。它还允许您在编写代码时，无需考虑捕获每种技术不同的异常。

## 5 spring JDBC API 中存在哪些类？⭐⭐ :id=dao-api
* JdbcTemplate
* SimpleJdbcTemplate
* NamedParameterJdbcTemplate
* SimpleJdbcInsert
* SimpleJdbcCall

## 6 JdbcTemplate是什么? ⭐ :id=jdbc-temp
JdbcTemplate 类提供了很多便利的方法解决诸如把数据库数据转变成基本数据类型或对象，执行写好的或可调用的数据库操作语句，提供自定义的数据错误处理。

## 7 使用Spring通过什么方式访问Hibernate？⭐ :id=hibernate-use
> 使用 Spring 访问 Hibernate 的方法有哪些

在Spring中有两种方式访问Hibernate：
* 使用 Hibernate 模板和回调进行控制反转
* 扩展 HibernateDAOSupport 并应用 AOP 拦截器节点

用Spring的 SessionFactory 调用 LocalSessionFactory。

集成过程分三步：
* 配置the Hibernate SessionFactory
* 继承HibernateDaoSupport实现一个DAO
* 在AOP支持的事务中装配