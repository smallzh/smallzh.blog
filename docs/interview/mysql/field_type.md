## 字段类型相关
---
## 如何区分 FLOAT 和 DOUBLE？⭐ :id=f-vs-d
以下是 FLOAT 和 DOUBLE 的区别：
1. 浮点数以 8 位精度存储在 FLOAT 中，并且有四个字节。
1. 浮点数存储在 DOUBLE 中，精度为 18 位，有八个字节。

## 区分 CHAR_LENGTH 和 LENGTH？⭐ :id=ch-length
1. CHAR_LENGTH 是字符数，而 LENGTH 是字节数。
2. Latin 字符的这两个数据是相同的，但是对于 Unicode 和其他编码，它们是不同的

## 在 Mysql 中 ENUM 的用法是什么？⭐⭐ :id=enum
ENUM 是一个字符串对象，用于指定一组预定义的值，并可在创建表时使用。
Create table size(name ENUM('Smail,'Medium','Large');

## CHAR 和 VARCHAR 的区别? ⭐ :id=char-vs-varchar
以下是 CHAR 和 VARCHAR 的区别：
1. CHAR 和 VARCHAR 类型在存储和检索方面有所不同
1. CHAR 列长度固定为创建表时声明的长度，长度值范围是 1 到 255
1. CHAR 值被存储时，它们被用空格填充到特定长度，检索 CHAR 值时需删除尾随空格

## 列的字符串类型可以是什么？⭐ :id=str-type
字符串类型是：
1. SET
1. BLOB
1. ENUM
1. CHAR
1. TEXT
1. VARCHAR

## TIMESTAMP 在 UPDATE CURRENT_TIMESTAMP 数据类型上做什么？⭐ :id=timestamp
创建表时 TIMESTAMP 列用 Zero 更新。只要表中的其他字段发生更改，UPDATE
CURRENT_TIMESTAMP 修饰符就将时间戳字段更新为当前时间。

## 如果一个表有一列定义为 TIMESTAMP，将发生什么? ⭐ :id=timestamp-line
每当行被更改时，时间戳字段将获取当前时间戳。

## LIKE 声明中的％和\_是什么意思? ⭐⭐ :id=like
％对应于 0 个或更多字符，\_只是 LIKE 语句中的一个字符

## LIKE 和 REGEXP 操作有什么区别？⭐:id=like-vs-regexp
LIKE 和 REGEXP 运算符用于表示^和％。
```sql
SELECT * FROM employee WHERE emp_name REGEXP "^b";
SELECT * FROM employee WHERE emp_name LIKE "%b";
```

## 列对比运算符是什么？⭐⭐ :id=op-type
在 SELECT 语句的列比较中使用=，<>，<=，<，> =，>，<<，>>，<=>，AND，OR 或LIKE 运算符。

## BLOB 和 TEXT 有什么区别？⭐⭐ :id=blob-vs-text
BLOB 是一个二进制对象，可以容纳可变数量的数据。有四种类型的BLOB 
1. TINYBLOB
1. BLOB
1. MEDIUMBLOB
1. LONGBLOB

它们只能在所能容纳价值的最大长度上有所不同。
TEXT 是一个不区分大小写的 BLOB。四种 TEXT 类型
1. TINYTEXT
1. TEXT
1. MEDIUMTEXT
1. LONGTEXT

它们对应于四种 BLOB 类型，并具有相同的最大长度和存储要求。
BLOB 和 TEXT 类型之间的唯一区别在于对 BLOB 值进行排序和比较时区分大小写，对
TEXT 值不区分大小写。

## 什么是非标准字符串类型？⭐ :id=no-standard
以下是非标准字符串类型：
1. TINYTEXT
1. TEXT
1. MEDIUMTEXT
1. LONGTEXT

## mysql 里记录货币用什么字段类型好 ⭐ :id=decimal

NUMERIC 和 DECIMAL 类型被 Mysql 实现为同样的类型，这在 SQL92 标准允许。他们
被用于保存值，该值的准确精度是极其重要的值，例如与金钱有关的数据。当声明一个类是
这些类型之一时，精度和规模的能被(并且通常是)指定；点击这里有一套最全阿里面试题总
结。

例如：salary DECIMAL(9,2)

在这个例子中，9(precision)代表将被用于存储值的总的小数位数，而 2(scale)代表将被用
于存储小数点后的位数。

因 此 ， 在 这 种 情 况 下 ， 能 被 存 储 在 salary 列 中 的 值 的 范 围 是 从 -9999999.99 到
9999999.99。在 ANSI/ISO SQL92 中，句法 DECIMAL(p)等价于 DECIMAL(p,0)。
同样，句法 DECIMAL 等价于 DECIMAL(p,0)，这里实现被允许决定值 p。Mysql 当前不
支持 DECIMAL/NUMERIC 数据类型的这些变种形式的任一种。
这一般说来不是一个严重的问题，因为这些类型的主要益处得自于明显地控制精度和规模的
能力。

DECIMAL 和 NUMERIC 值作为字符串存储，而不是作为二进制浮点数，以便保存那些值
的小数精度。

一个字符用于值的每一位、小数点(如果 scale>0)和“-”符号(对于负值)。如果 scale 是 0，
DECIMAL 和 NUMERIC 值不包含小数点或小数部分。
DECIMAL 和 NUMERIC 值得最大的范围与 DOUBLE 一样，但是对于一个给定的
DECIMAL 或 NUMERIC 列，实际的范围可由制由给定列的 precision 或 scale 限制。
当这样的列赋给了小数点后面的位超过指定 scale 所允许的位的值，该值根据 scale 四舍五
入。

当一个 DECIMAL 或 NUMERIC 列被赋给了其大小超过指定(或缺省的）precision 和 scale
隐含的范围的值，Mysql 存储表示那个范围的相应的端点值。