## 触发器题目
---
## 1 解释一下MySQL中的触发器？⭐ :id=trigger
> 一段能自动执行的程序

触发器是一段能自动执行的程序，是一种特殊的存储过程，触发器和普通的存储过程的区别是：触发器是当对某一个表进行操作时触发。

诸如：update、insert、delete 这些操作的时候，系统
会自动调用执行该表上对应的触发器。SQL Server 2005 中触发器可以分为两类：DML 触发器和
DDL 触发器，其中 DDL 触发器它们会影响多种数据定义语言语句而激发，这些语句有 create、
alter、drop 语句。

## Mysql 表中允许有多少种 TRIGGERS？⭐ :id=trigger-num
在 Mysql 表中允许有六个触发器，如下：
1. BEFORE INSERT
1. AFTER INSERT
1. BEFORE UPDATE
1. AFTER UPDATE
1. BEFORE DELETE
1. AFTER DELE