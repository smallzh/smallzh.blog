## 引擎相关题目
---
## 1 说一下MySQL用到的引擎？⭐ :id=engine
数据库存储引擎是数据库底层软件组织，数据库管理系统（DBMS）使用数据引擎进行创建、查询、更新和删除数据。不同的存储引擎提供不同的存储机制、索引技巧、锁定水平等功能，使用不同的存储引擎，还可以 获得特定的功能。现在许多不同的数据库管理系统都支持多种不同的数据引擎。

存储引擎主要有： 
1. MyIsam 
2. InnoDB
3. Memory
4. Archive
5. Federated 

存储引擎也对应了表类型，可分为：
1. MyISAM
1. Heap
1. Merge
1. INNODB
1. ISAM

mysql支持的存储引擎有很多种，innodb、myisam、memory等，最常用的是innodb， myisam在以前可能还有场景会用到，但现在用的 已经非常少了，尤其在oltp业务中，一旦涉及事务、高并发等场景。

## 解释一下InnoDB？⭐⭐⭐⭐⭐ :id=innodb
lnnoDB 是一个由 Oracle 公司开发的 Innobase Oy 事务安全存储引擎， 底层存储结构为B+树， B树的每个节点对应innodb的一个page，page大小是固定的，一般设为 16k。其中非叶子节点只有键值，叶子节点包含完成数据。

Mysql 主要是由 server 层和存储层两部分构成的。server 层主要包括连接器、查询缓存，分析器、优化器、执行器。存储层主要是用来存储和查询数据的，常用的存储引擎有 InnoDB、MyISAM，MySQL 5.5.5版本后使用 InnoDB 作为默认存储引擎。

![](../imgs/mysql_4.jpg)

主要特点就是
> 支持事务，走聚簇索引，强制有主键，支持夕躍约束，并且高并发、大数 据量、高可用等有相关成熟的数据库架构，分库分表、读写分离、主备切换

适用场景：
1. 经常更新的表，适合处理多重并发的更新请求。
1. 支持事务。
1. 可以从灾难中恢复（通过 bin-log 日志等）。
1. 外键约束。只有他支持外键。
1. 支持自动增加列属性 auto_increment。

## 解释一下TokuDB?⭐⭐⭐⭐⭐ :id=tokudb
> Fractal Tree-节点带数据

TokuDB 底层存储结构为 Fractal Tree，Fractal Tree 的结构与 B+树有些类似, 在 Fractal Tree中，每一个 child 指针除了需要指向一个 child 节点外，还会带有一个 Message Buffer ，这个Message Buffer 是一个 FIFO 的队列，用来缓存更新操作。

例如，一次插入操作只需要落在某节点的 Message Buffer 就可以马上返回了，并不需要搜索到叶子节点。这些缓存的更新会在查询时或后台异步合并应用到对应的节点中。

![](../imgs/mysql_5.jpg)

TokuDB 在线添加索引，不影响读写操作, 非常快的写入性能， Fractal-tree 在事务实现上有优势。 他主要适用于访问频率不高的数据或历史数据归档。

## 说一下MyIASM？⭐⭐⭐⭐⭐ :id=myiasm
MyIASM是 MySQL默认的引擎，但是它没有提供对数据库事务的支持，也不支持行级锁和外键，因此当 INSERT(插入)或 UPDATE(更新)数据时即写操作需要锁定整个表，效率便会低一些。

MyISAM 执行读取操作的速度很快，而且不占用大量的内存和存储资源。在设计之初就预想数据组织成有固定长度的记录，按顺序存储的。---ISAM 是一种静态索引结构。

缺点是

> 不支持事务，不支持夕躍约束，索引文件和数据文件分开，这样在内存里可以 缓存更多的索引,对查询的性能会更好，适用于那种少量的插入，大量查询的场景。

最经典的就是报表系统，比如大数据的报表系统，常见的就是走hadoop生态来搞，hdfs 来存储数据，然后基于hive来进行数仓建模，每次hive跑出来的数据都用sqoop从hive 中导出到mysql中去。然后基于mysql的在线查询，就接上php写个简单的web系统， 每个报表开发一套代码，写sql查数据，组织数据，按照前端要求的格式返回数据，展 现出来T报表。

这种报表系统，是最适合mysql的myisam存储引擎的，不需要事务，就是一次性批量 导入，接下来一天之内就是纯查询了。

## MyISAM Static 和 MyISAM Dynamic ? ⭐⭐⭐ :id=myiasm-sd
在 MyISAM Static 上的所有字段有固定宽度。动态 MyISAM 表将具有像 TEXT，BLOB
等字段，以适应不同长度的数据类型。点击这里有一套最全阿里面试题总结。
MyISAM Static 在受损情况下更容易恢复

## MyISAM 表格将在哪里存储，并且还提供其存储格式？⭐ :id=myisam-ext
每个 MyISAM 表格以三种格式存储在磁盘上：
1. “.frm”文件存储表定义
1. 数据文件具有“.MYD”（MYData）扩展名
1. 索引文件具有“.MYI”（MYIndex）扩展名

## 说一下Memory？⭐⭐⭐⭐ :id=memory
Memory（也叫 HEAP）堆内存：使用存在内存中的内容来创建表。每个 MEMORY 表只实际对应
一个磁盘文件。MEMORY 类型的表访问非常得快，因为它的数据是放在内存中的，并且默认使用
HASH 索引。但是一旦服务关闭，表中的数据就会丢失掉。 Memory 同时支持散列索引和 B 树索
引，B树索引可以使用部分查询和通配查询，也可以使用\<,>和>=等操作符方便数据挖掘，散列索
引相等的比较快但是对于范围的比较慢很多。

##  一张表，里面有 ID 自增主键，当 insert 了 17 条记录之后，删除了第 15,16,17 条记录，再把 Mysql 重启，再 insert 一条记录，这条记录的 ID 是 18 还是 15 ？⭐ :id=max-id
1. 如果表的类型是MyISAM，那么是18。因为MyISAM表会把自增的最大记录ID记录到数据文件里，重启MySQL，自增主键的最大记录ID不会丢失
2. 如果表的类型是InnoDB，那么是15。InnoDB把表的自增的最大记录ID存在内存中，所以，重启数据库或对表进行OPTIMIZE操作，都会导致最大记录ID丢失

## Mysql 中使用什么存储引擎？⭐ :id=engine-tech
存储引擎称为表类型，数据使用各种技术存储在文件中。
技术涉及：
1. Storage mechanism
1. Locking levels
1. Indexing
1. Capabilities and functions.

## ISAM 是什么？⭐ :id=isam
ISAM 简称为索引顺序访问方法。它是由 IBM 开发的，用于在磁带等辅助存储系统上存储
和检索数据。
