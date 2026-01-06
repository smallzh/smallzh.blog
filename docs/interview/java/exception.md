## 异常题目
---
## 1 怎么理解Java异常？⭐ :id=java-exp
如果某个方法不能按照正常的途径完成任务，就可以通过另一种路径退出方法。在这种情况下
会抛出一个封装了错误信息的对象。此时，这个方法会立刻退出同时不返回任何值。另外，调用
这个方法的其他代码也无法继续执行，异常处理机制会将代码执行交给异常处理器。

## 2 异常都有哪几种？⭐⭐ :id=exp-type
Throwable 是 Java 语言中所有错误或异常的超类。下一层分为 Error 和 Exception 。

![](../imgs/exception_1.jpg)

**Error**

Error 类是指 java 运行时系统的内部错误和资源耗尽错误。应用程序不会抛出该类对象。如果
出现了这样的错误，除了告知用户，剩下的就是尽力使程序安全的终止。

**Exception（RuntimeException、CheckedException）**

Exception 又 有 两 个 分 支 ：
1. 一 个 是 运 行 时 异 常 RuntimeException ， 
2. 一 个 是CheckedException。

**RuntimeException** 如 ： NullPointerException 、 ClassCastException ； **CheckedException**，如 ：I/O 错误导致的 IOException、SQLException。 

RuntimeException: 是那些可能在 Java 虚拟机正常运行期间抛出的异常的超类。 如果出现 RuntimeException，那么一定是程序员的错误。

CheckedException：一般是外部错误，这种异常都发生在编译阶段，Java 编译器会强
制程序去捕获此类异常，即会出现要求你把这段可能出现异常的程序进行 try catch，该类异常一般包括几个方面：

1. 试图在文件尾部读取数据
2. 试图打开一个错误格式的 URL 
3. 试图根据给定的字符串查找 class 对象，而这个字符串表示的类并不存在

## 异常有哪些处理方式？⭐⭐ :id=exp-handle
有两种，throw继续抛出、try-catch进行捕获

抛出异常有三种形式，一个是 throw,一个 throws，还有一种系统自动抛异常。
```java
public static void main(String[] args) { 
     String s = "abc"; 
     if(s.equals("abc")) { 
     throw new NumberFormatException(); 
     } else { 
     System.out.println(s); 
     } 
} 
int div(int a,int b) throws Exception{
	return a/b;
}

```
try catch 捕获异常针对性处理方式

## Throw 和 throws 的区别? ⭐⭐⭐ :id=throw-s
**位置不同**

throws 用在函数上，后面跟的是异常类，可以跟多个；而 throw 用在函数内，后面跟的是异常对象。

**功能不同**

1. throws 用来声明异常，让调用者只知道该功能可能出现的问题，可以给出预先的处理方式;throw 抛出具体的问题对象，执行到 throw，功能就已经结束了，跳转到调用者，并将具体的问题对象抛给调用者。也就是说 throw 语句独立存在时，下面不要定义其他语句，因为执行不到。
1. throws 表示出现异常的一种可能性，并不一定会发生这些异常；throw 则是抛出了异常，执行 throw 则一定抛出了某种异常对象。
1. 两者都是消极处理异常的方式，只是抛出或者可能抛出异常，但是不会由函数去处理异常，真正的处理异常由函数的上层调用处理。

