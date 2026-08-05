## 其他题目
---
## 1 解释一下Java内部类？⭐ :id=inner-cls-type
Java 类中不仅可以定义变量和方法，还可以定义类，这样定义在类内部的类就被称为内部类。根
据定义的方式不同，内部类分为四种：
1. 静态内部类
2. 成员内部类
3. 局部内部类
4. 匿名内部类

## 解释一下Java的静态内部类？⭐ :id=static-in-cls
定义在类内部的静态类，就是静态内部类。

1. 静态内部类可以访问外部类所有的静态变量和方法，即使是 private 的也一样。
2. 静态内部类和一般类一致，可以定义静态变量、方法，构造方法等。
3. 其它类使用静态内部类需要使用“外部类.静态内部类”方式，如下所示：

```java
Out.Inner inner = new Out.Inner();
inner.print();
```

Java集合类HashMap内部就有一个静态内部类Entry。Entry是HashMap存放元素的抽象，HashMap 内部维护 Entry 数组用了存放元素，但是 Entry 对使用者是透明的。像这种和外部
类关系密切的，且不依赖外部类实例的，都可以使用静态内部类。

如：
```java
public class Out {
 private static int a;
 private int b;
 public static class Inner {
 public void print() {
 System.out.println(a);
 }
 }
}
```

## 解释一下成员内部类？⭐ :id=member-in-cls
定义在类内部的非静态类，就是成员内部类。成员内部类不能定义静态方法和变量（final 修饰的
除外）。这是因为成员内部类是非静态的，类初始化的时候先初始化静态成员，如果允许成员内
部类定义静态变量，那么成员内部类的静态变量初始化顺序是有歧义的。

```java
public class Out {
 private static int a;
 private int b;
 public class Inner {
 public void print() {
 System.out.println(a);
 System.out.println(b);
 }
 }
}
```

## 解释一下局部内部类？⭐ :id=local-in-cls
> 定义在方法中的类，就是局部类。

如果一个类只在某个方法中使用，则可以考虑使用局部类。

```java
 public class Out {
 private static int a;
 private int b;
 public void test(final int c) {
 final int d = 1;
 class Inner {
 public void print() {
 System.out.println(c);
 }
 }
 }
}
```
## 解释一下匿名内部类？⭐ :id=no-name-in-cls
> 匿名内部类我们必须要继承一个父类或者实现一个接口，当然也仅能只继承一个父类或者实现一
个接口。

同时它也是没有 class 关键字，这是因为匿名内部类是直接使用 new 来生成一个对象的引
用。

```java
public abstract class Bird {
 private String name;
 public String getName() {
 return name;
 }
 public void setName(String name) {
 this.name = name;
 }
 public abstract int fly();
}
public class Test {
 public void test(Bird bird){
 System.out.println(bird.getName() + "能够飞 " + bird.fly() + "米");
 }
 public static void main(String[] args) {
 Test test = new Test();
 test.test(new Bird() {
 public int fly() {
 return 10000;
 }
 public String getName() {
 return "大雁";
 }
 });
 }
}
```

## 解释一下Java序列化？⭐⭐⭐ :id=serial
> 目的：创建可复用的 Java 对象

**1 保存(持久化)对象及其状态到内存或者磁盘**

Java 平台允许我们在内存中创建可复用的 Java 对象，但一般情况下，只有当 JVM 处于运行时，
这些对象才可能存在，即，这些对象的生命周期不会比 JVM 的生命周期更长。但在现实应用中，
就可能要求在JVM停止运行之后能够保存(持久化)指定的对象，并在将来重新读取被保存的对象。

**2 Java 对象序列化就能够帮助我们实现该功能**

序列化对象以字节数组保持-静态成员不保存
使用 Java 对象序列化，在保存对象时，会把其状态保存为一组字节，在未来，再将这些字节组装
成对象。必须注意地是，对象序列化保存的是对象的”状态”，即它的成员变量。由此可知，对
象序列化不会关注类中的静态变量。

**3 序列化用户远程对象传输**

除了在持久化对象时会用到对象序列化之外，当使用 RMI(远程方法调用)，或在网络中传递对象时，
都会用到对象序列化。Java序列化API为处理对象序列化提供了一个标准机制，该API简单易用。

**4 Serializable 实现序列化**

在 Java 中，只要一个类实现了 java.io.Serializable 接口，那么它就可以被序列化。

**5 ObjectOutputStream 和 ObjectInputStream 对对象进行序列化及反序列化**

通过 ObjectOutputStream 和 ObjectInputStream 对对象进行序列化及反序列化。

**6 writeObject 和 readObject 自定义序列化策略**

在类中增加 writeObject 和 readObject 方法可以实现自定义序列化策略。

**7 序列化 ID**

虚拟机是否允许反序列化，不仅取决于类路径和功能代码是否一致，一个非常重要的一点是两个
类的序列化 ID 是否一致（就是 private static final long serialVersionUID）

**8 序列化并不保存静态变量**

**9 序列化子父类说明**

要想将父类对象也序列化，就需要让父类也实现 Serializable 接口。

**Transient 关键字阻止该变量被序列化到文件中**

1. 在变量声明前加上 Transient 关键字，可以阻止该变量被序列化到文件中，在被反序列化后，transient 变量的值被设为初始值，如 int 型的是 0，对象型的是 null。
2. 服务器端给客户端发送序列化对象数据，对象中有一些数据是敏感的，比如密码字符串等，希望对该密码字段在序列化时，进行加密，而客户端如果拥有解密的密钥，只有在客户端进行反序列化时，才可以对密码进行读取，这样可以一定程度保证序列化对象的数据安全。

## 解释一下Java的复制？⭐ :id=java-copy
> 将一个对象的引用复制给另外一个对象，一共有三种方式。

1. 第一种方式是直接复制
2. 第二种方式是浅拷贝
3. 第三种是深拷贝

这三种概念实际上都是为了拷贝对象。

## 说一下直接赋值复制？⭐ :id=value-copy
直接赋值。在 Java 中，A a1 = a2，我们需要理解的是这实际上复制的是引用，也就是
说 a1 和 a2 指向的是同一个对象。因此，当 a1 变化的时候，a2 里面的成员变量也会跟
着变化。

## 说一下浅复制？⭐ :id=direct-copy
> 复制引用但不复制引用的对象

创建一个新对象，然后将当前对象的非静态字段复制到该新对象，如果字段是值类型的，
那么对该字段执行复制；如果该字段是引用类型的话，则复制引用但不复制引用的对象。
因此，原始对象及其副本引用同一个对象。

```java
class Resume implements Cloneable{ 
 public Object clone() { 
 try { 
 return (Resume)super.clone(); 
 } catch (Exception e) { 
 e.printStackTrace(); 
 return null; 
 } 
 } 
} 
```

## 说一下深复制？⭐ :id=deep-copy
> 复制对象和其应用对象

深拷贝不仅复制对象本身，而且复制对象包含的引用指向的所有对象。

```java
 class Student implements Cloneable {
 String name;
 int age;
 Professor p;
 Student(String name, int age, Professor p) {
 this.name = name;
 this.age = age;
 this.p = p;
 }
 public Object clone() {
 Student o = null;
 try {
 o = (Student) super.clone();
 } catch (CloneNotSupportedException e) {
 System.out.println(e.toString());
 }
 o.p = (Professor) p.clone();
 return o;
 }
}
```

## 说一下序列化复制？⭐ :id=serial-copy
> 深 clone 一中实现

在 Java 语言里深复制一个对象，常常可以先使对象实现 Serializable 接口，然后把对
象（实际上只是对象的一个拷贝）写到一个流里，再从流里读出来，便可以重建对象。