## 函数相关
---
## 如何定义 REGEXP？⭐⭐ :id=regexp
REGEXP 是模式匹配，其中匹配模式在搜索值的任何位置。

## 如何获取当前的 Mysql 版本？⭐ :id=version
SELECT VERSION();用于获取当前 Mysql 的版本

## myisamchk 是用来做什么的？⭐ :id=myisamchk
它用来压缩 MyISAM 表，这减少了磁盘或内存使用。

## 怎样才能找出最后一次插入时分配了哪个自动增量？⭐ :id=last-insert-id
LAST_INSERT_ID 将返回由 Auto_increment 分配的最后一个值，并且不需要指定表名
称。

## 你怎么看到为表格定义的所有索引？⭐⭐ :id=show-index
索引是通过以下方式为表格定义的：
```shell
SHOW INDEX FROM <tablename>;
```

## 如何在 Unix 和 Mysql 时间戳之间进行转? ⭐⭐ :id=time-convert
UNIX_TIMESTAMP 是从 Mysql 时间戳转换为 Unix 时间戳的命令

FROM_UNIXTIME 是从 Unix 时间戳转换为 Mysql 时间戳的命令

## 我们如何得到受查询影响的行数？⭐⭐ :id=count
行数可以通过以下代码获得：
```sql
SELECT COUNT(user_id)FROM users;
```

## Mysql 查询是否区分大小写？⭐:id=upper
不区分
```sql
SELECT VERSION(), CURRENT_DATE;
SeLect version(), current_date;
seleCt vErSiOn(), current_DATE;
```
所有这些例子都是一样的，Mysql 不区分大小写。

## mysql_fetch_array 和 mysql_fetch_object 的区别是什么？⭐⭐⭐:id=ary-vs-obj
以下是 mysql_fetch_array 和 mysql_fetch_object 的区别：
1. mysql_fetch_array（） - 将结果行作为关联数组或来自数据库的常规数组返回。
1. mysql_fetch_object - 从数据库返回结果行作为对象。

## 我们如何在 mysql 中运行批处理模式? ⭐:id=batch
以下命令用于在批处理模式下运行：
```shell
mysql;
mysql mysql.out
```

## Mysql 如何优化 DISTINCT？⭐⭐⭐:id=distinct
DISTINCT 在所有列上转换为 GROUP BY，并与 ORDER BY 子句结合使用。
```sql
SELECT DISTINCT t1.a FROM t1,t2 where t1.a=t2.a
```

## 如何显示前 50 行？⭐:id=limit
在 Mysql 中，使用以下代码查询显示前 50 行：
```sql
SELECT * FROM LIMIT 0,50;
```

## NOW（）和 CURRENT_DATE（）有什么区别? ⭐:id=data-diff
1. NOW（）命令用于显示当前年份，月份，日期，小时，分钟和秒。
1. CURRENT_DATE（）仅显示当前年份，月份和日期。

## 什么样的对象可以使用 CREATE 语句创建？⭐:id=create
以下对象是使用 CREATE 语句创建的：
1. DATABASE
1. EVENT
1. FUNCTION
1. INDEX
1. PROCEDURE
1. TABLE
1. TRIGGER
1. USER
1. VIEW

## 什么是通用 SQL 函数？⭐:id=common-sql
1. CONCAT(A, B) - 连接两个字符串值以创建单个字符串输出。通常用于将两个或多个
字段合并为一个字段。
1. FORMAT(X, D)- 格式化数字 X 到 D 有效数字。
1. CURRDATE(), CURRTIME()- 返回当前日期或时间。
1. NOW（） - 将当前日期和时间作为一个值返回。
1. MONTH（），DAY（），YEAR（），WEEK（），WEEKDAY（） - 从日期值中
提取给定数据。
1. HOUR（），MINUTE（），SECOND（） - 从时间值中提取给定数据。
1. DATEDIFF（A，B） - 确定两个日期之间的差异，通常用于计算年龄
1. SUBTIMES（A，B） - 确定两次之间的差异。
1. FROMDAYS（INT） - 将整数天数转换为日期值。

## MySQL 的 SQL 调优? ⭐⭐⭐⭐:id=opt-sql
MySQL里最直接的优化就是保证减少io请求，尽量90%多业务走单表扫描，需要计算或 者关联的业务，尽段在聞层完成。然而此时就会有疑问，都单表了，还有什么雌 化的呢？ 如果一个线上业务SQL比较慢，十有八九就是因为那个SQL没有用索引，所以这个时 候，第一步就是去看MySQL的执行计划，看看那个SQL有没有用到索引，如果没有，那 么就改写一下SQL让他用上索引，或者是额外加个索引。

关于mysql执彳亍计划，可以用explain或explain extended分析下执彳亍计划，重点关注下 key （用到那个索引）、rows （扫描行数）、extra： using filesort （需要额夕卜进行 排序），using temporary （ mysql构建了临时表，比如排序的时候），using where （就是对索引扫出来的数据再次根据where来过滤出了结果）重点的信息，基本 也就能定位sql性能的问题了。
