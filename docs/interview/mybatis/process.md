## 执行过程问题
---
![](../imgs/mb_pro_4.png)

---
## 获取SQLSessionFactory和SQLSession的过程？⭐⭐⭐⭐ :id=mb-ssf-vs-ss
![](../imgs/mb_pro_1.png)

执行过程如下：
1. 获取SQLSessionFactory：SqlSessionFactoryBuilder去读取mybatis的配置文件，然后build一个DefaultSqlSessionFactory
2. 获取SQLSession：通过SqlSessionFactory去获取SqlSession对象

## MyBatis获取接口的代理实例过程？ ⭐⭐⭐⭐ :id=mb-proxy
![](../imgs/mb_pro_2.png)

执行过程如下：
1. 通过SqlSession从Configuration中获取
2. Configuration从MapperRegistry中获取
3. MapperRegistry通过MapperProxyFactory生成一个代理类

## Sql的执行过程？⭐⭐⭐⭐⭐ :id=mb-sql-exe
![](../imgs/mb_pro_3.png)

执行过程如下：
1. MapperProxy通过MapperMethod来执行Sql
2. MapperMethod通过SqlSession来执行Sql语句