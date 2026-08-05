## Spring事务相关
---
## 说一下事务？⭐ :id=st-concept
事务是计算机应用中不可或缺的组件模型，它保证了用户操作的原子性 ( Atomicity )、一致性
( Consistency )、隔离性 ( Isolation ) 和持久性 ( Durabilily )。

## 解释一下本地事务？⭐⭐⭐ :id=st-local
紧密依赖于底层资源管理器（例如数据库连接 )，事务处理局限在当前事务资源内。此种事务处理
方式不存在对应用服务器的依赖，因而部署灵活却无法支持多数据源的分布式事务。在数据库连
接中使用本地事务示例如下：

```java
 public void transferAccount() { 
Connection conn = null; 
Statement stmt = null; 
try{ 
conn = getDataSource().getConnection(); 
// 将自动提交设置为 false，若设置为 true 则数据库将会把每一次数据更新认定为一个事务并自动提交
conn.setAutoCommit(false);
stmt = conn.createStatement(); 
// 将 A 账户中的金额减少 500
stmt.execute("update t_account set amount = amount - 500 where account_id = 'A'");
// 将 B 账户中的金额增加 500 
stmt.execute("update t_account set amount = amount + 500 where account_id = 'B'");
// 提交事务
 conn.commit();
 // 事务提交：转账的两步操作同时成功
} catch(SQLException sqle){ 
// 发生异常，回滚在本事务中的操做
 conn.rollback();
// 事务回滚：转账的两步操作完全撤销
 stmt.close(); 
 conn.close(); 
} 
}
```

## 解释一下分布式事务？⭐⭐⭐ :id=st-distributed
Java 事务编程接口（JTA：Java Transaction API）和 Java 事务服务 (JTS；Java Transaction Service) 为 J2EE 平台提供了分布式事务服务。分布式事务（Distributed Transaction）包括事务管理器（Transaction Manager）和一个或多个支持 XA 协议的资源管理器 ( Resource Manager )。我们可以将资源管理器看做任意类型的持久化数据存储；事务管理器承担着所有事务参与单元的协调与控制。

```java
public void transferAccount() { 
UserTransaction userTx = null; 
Connection connA = null; Statement stmtA = null; 
Connection connB = null; Statement stmtB = null; 
try{ 
// 获得 Transaction 管理对象
userTx = (UserTransaction)getContext().lookup("java:comp/UserTransaction"); 
connA = getDataSourceA().getConnection();// 从数据库 A 中取得数据库连接
connB = getDataSourceB().getConnection();// 从数据库 B 中取得数据库连接
userTx.begin(); // 启动事务
stmtA = connA.createStatement();// 将 A 账户中的金额减少 500 
stmtA.execute("update t_account set amount = amount - 500 where account_id = 'A'");
// 将 B 账户中的金额增加 500 
stmtB = connB.createStatement();
stmtB.execute("update t_account set amount = amount + 500 where account_id = 'B'");
userTx.commit();// 提交事务
// 事务提交：转账的两步操作同时成功（数据库 A 和数据库 B 中的数据被同时更新）
} catch(SQLException sqle){ 
// 发生异常，回滚在本事务中的操纵
 userTx.rollback();// 事务回滚：数据库 A 和数据库 B 中的数据更新被同时撤销
} catch(Exception ne){ } 
}

```

## Spring支持的事务管理类型? ⭐ :id=st-type
> spring 事务实现方式有哪些？

Spring支持两种类型的事务管理：
* 编程式事务管理：这意味你通过编程的方式管理事务，给你带来极大的灵活性，但是难维护。
* 声明式事务管理：这意味着你可以将业务代码和事务管理分离，你只需用注解和XML配置来管理事务。

## Spring事务的实现方式和实现原理? ⭐⭐⭐ :id=st-tenet
Spring事务的本质其实就是数据库对事务的支持，没有数据库的事务支持，spring是无法提供事务功能的。

真正的数据库层的事务提交和回滚是通过binlog或者redo log实现的。

## Spring的事务传播(propagation)行为? ⭐⭐⭐⭐⭐ :id=st-prop
spring事务的传播行为说的是，当多个事务同时存在的时候，spring如何处理这些事务的行为。
1. PROPAGATION_REQUIRED：(required-必须)如果当前存在事务，就加入该事务，如果当前没有事务，就创建一个新事务，该设置是最常用的设置。
1. PROPAGATION_SUPPORTS：(supports-支持)支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就以非事务执行。
1. PROPAGATION_MANDATORY：(mandatory--强制)支持当前事务，如果当前存在事务，就加入该事务，如果当前不存在事务，就抛出异常。
1. PROPAGATION_REQUIRES_NEW：(requires new-需求)无论当前是否存在事务，都创建新事务。
1. PROPAGATION_NOT_SUPPORTED：(not supported-被支持)以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
1. PROPAGATION_NEVER：(never-绝不)以非事务方式执行，如果当前存在事务，则抛出异常。
1. PROPAGATION_NESTED：(nested-嵌套子事务)如果当前存在事务，则在嵌套子事务事务内执行。如果当前没有事务，则按REQUIRED属性执行，对于嵌套子事务而言，如果子事务回滚，不会影响外部事务，如果外部事务回滚，则会影响子事务。

## spring的事务隔离(isolation)？⭐⭐⭐⭐⭐ :id=st-isol
spring 有五大隔离级别，默认值为 ISOLATION_DEFAULT（使用数据库的设置），其他四个隔离级别和数据库的隔离级别一致：
1. ISOLATION_DEFAULT：(default--默认)用底层数据库的设置隔离级别，数据库设置的是什么我就用什么；
1. ISOLATION_READ_UNCOMMITTED：(read uncommitted--未遂的)未提交读，最低隔离级别、事务未提交前，就可被其他事务读取（会出现幻读、脏读、不可重复读）；
1. ISOLATION_READ_COMMITTED：(read committed--付诸的)提交读，一个事务提交后才能被其他事务读取到（会造成幻读、不可重复读），SQL server 的默认级别；
1. ISOLATION_REPEATABLE_READ：(repeatable read--可重复)可重复读，保证多次读取同一个数据时，其值都和事务开始时候的内容是一致，禁止读取到别的事务未提交的数据（会造成幻读），MySQL 的默认级别；
1. ISOLATION_SERIALIZABLE：(serializable--序列化)序列化，代价最高最可靠的隔离级别，该隔离级别能防止脏读、不可重复读、幻读。

**关键词**

1. 幻读 ：指同一个事务内多次查询返回的结果集不一样。比如同一个事务 A 第一次查询时候有 n 条记录，但是第二次同等条件下查询却有 n+1 条记录，这就好像产生了幻觉。发生幻读的原因也是另外一个事务新增或者删除或者修改了第一个事务结果集里面的数据，同一个记录的数据内容被修改了，所有数据行的记录就变多或者变少了。侧重与新增或者删除。办法锁表。
1. 不可重复读 ：是指在一个事务内，多次读同一数据,结果不一致。侧重于修改。办法锁行
1. 脏读 ：表示一个事务能够读取另一个事务中还未提交的数据。比如，某个事务尝试插入记录 A，此时该事务还未提交，然后另一个事务尝试读取到了记录 A。

## Spring事务失效的原因？⭐⭐⭐⭐ :id=st-no-effect
**1 自身this调用问题**

同一个类的不同方法间的事务传播是 不起作用的。

解决方法：
>
> 1. 方法1：把两个调用方法分别放到不同的类里。
> 1. 方法2：自己注入自己，用注入的实例调用。
> 1. 方法3：通过方法`AopContext.currentProxy()`获取代理类，利用代理类调用自己类的方法。

**原因是**：
> 同一个类中，用this调用方法，不会用到 代理类中的 方法，导致 没有事务生效

**2 异常类型不对**

抛出的异常类型 和 事务声明的异常类型不匹配，比如，事务声明 `RuntimeException`， 实际抛出 `Exception` ，导致事务失效

**3 代码内部捕获异常**

事务声明了异常，但 代码内部却 捕获了异常，没有进行抛出，导致事务失效

**4 事务传播类型声明为NOT_SUPPORTED**

事务声明为不支持时，如果 当前有事务，也会进行 挂起，导致 方法内部事务失效

**5 方法不是public的**

`@Transactional` 只能用于 public 的方法上，否则事务不会失效。

原因：
>  Spring的声明式事务是基于代理模式的，无法代理 private 方法, final 方法 和 static 方法

**6 没有被Spring管理**

Spring无法为没有管理的Bean生成代理，从而导致事务失效

**7 数据源没有配置事务管理器**

Spring本身并不提供底层的事务管理功能，如果数据源中不进行配置，也会导致事务失效

**8 MySQL的存储引擎不支持**

MySQL使用的存储引擎如果不支持事务，事务也会失效

## Spring事务特性（ACID）? ⭐⭐⭐ :id=st-acid
* 原子性（Atomicity，或称不可分割性）：一个事务（transaction）中的所有操作，要么全部完成，要么全部不完成，不会结束在中间某个环节。事务在执行过程中发生错误，会被回滚（Rollback）到事务开始前的状态，就像这个事务从来没有执行过一样。
* 一致性（Consistency）：在事务开始之前和事务结束以后，数据库的完整性没有被破坏。这表示写入的资料必须完全符合所有的预设规则，这包含资料的精确度、串联性以及后续数据库可以自发性地完成预定的工作。
* 隔离性（Isolation，又称独立性）：数据库允许多个并发事务同时对其数据进行读写和修改的能力，隔离性可以防止多个事务并发执行时由于交叉执行而导致数据的不一致。事务隔离分为不同级别，包括读未提交（Read uncommitted）、读提交（read committed）、可重复读（repeatable read）和串行化（Serializable）。
* 持久性（Durability）：事务处理结束后，对数据的修改就是永久的，即便系统故障也不会丢失

## Spring框架的事务管理有哪些优点？⭐⭐⭐ :id=st-merit
* 为不同的事务API 如 JTA，JDBC，Hibernate，JPA 和JDO，提供一个不变的编程模式。
* 为编程式事务管理提供了一套简单的API而不是一些复杂的事务API
* 支持声明式事务管理。
* 和Spring各种数据访问抽象层很好得集成。

## 你更倾向用那种事务管理类型？⭐ :id=st-my
大多数Spring框架的用户选择声明式事务管理，因为它对应用代码的影响最小，因此更符合一个无侵入的轻量级容器的思想。声明式事务管理要优于编程式事务管理，虽然比编程式事务管理（这种方式允许你通过代码控制事务）少了一点灵活性。唯一不足地方是，最细粒度只能作用到方法级别，无法做到像编程式事务那样可以作用到代码块级别。

## 说一下事务的两段提交？⭐⭐⭐ :id=st-two
两阶段提交主要保证了分布式事务的原子性：即所有结点要么全做要么全不做，所谓的两个阶段
是指：第一阶段：准备阶段；第二阶段：提交阶段。

![](../imgs/spring_t_1.jpg)

**1 准备阶段**

事务协调者(事务管理器)给每个参与者(资源管理器)发送 Prepare 消息，每个参与者要么直接返回
失败(如权限验证失败)，要么在本地执行事务，写本地的 redo 和 undo 日志，但不提交，到达一
种“万事俱备，只欠东风”的状态。

**2 提交阶段**

如果协调者收到了参与者的失败消息或者超时，直接给每个参与者发送回滚(Rollback)消息；否则，
发送提交(Commit)消息；参与者根据协调者的指令执行提交或者回滚操作，释放所有事务处理过
程中使用的锁资源。(注意:必须在最后阶段释放锁资源)将提交分成两阶段进行的目的很明确，就是尽可能晚地提交事务，让事务在提交前尽可能地完成所有能完成的工作。