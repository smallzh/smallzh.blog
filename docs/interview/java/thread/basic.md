## 多线程并发题目
---
## 如何创建/实现线程？⭐⭐ :id=create-thread
**1 继承 Thread 类**

Thread 类本质上是实现了 Runnable 接口的一个实例，代表一个线程的实例。启动线程的唯一方法就是通过 Thread 类的 start()实例方法。start()方法是一个 native 方法，它将启动一个新线程，并执行 run()方法。

**2 实现 Runnable 接口**

如果自己的类已经 extends 另一个类，就无法直接 extends Thread，此时，可以实现一个Runnable 接口。

**3 ExecutorService、Callable\<Class>、Future 有返回值线程**

有返回值的任务必须实现 Callable 接口，类似的，无返回值的任务必须 Runnable 接口。执行Callable 任务后，可以获取一个 Future 的对象，在该对象上调用 get 就可以获取到 Callable 任务返回的 Object 了，再结合线程池接口 ExecutorService 就可以实现传说中有返回结果的多线程了。

**4 基于线程池的方式**

线程和数据库连接这些资源都是非常宝贵的资源。那么每次需要的时候创建，不需要的时候销毁，是非常浪费资源的。那么我们就可以使用缓存的策略，也就是使用线程池。

## 线程的生命周期是什么样子？⭐⭐⭐ :id=thread-life
当线程被创建并启动以后，它既不是一启动就进入了执行状态，也不是一直处于执行状态。在线程的生命周期中，它要经过新建(New)、就绪（Runnable）、运行（Running）、阻塞(Blocked)和死亡(Dead)5 种状态。尤其是当线程启动以后，它不可能一直"霸占"着 CPU 独自运行，所以 CPU 需要在多条线程之间切换，于是线程状态也会多次在运行、阻塞之间切换。

![](../../imgs/thread_2.jpg)

**1 新建状态（NEW）**

当程序使用 new 关键字创建了一个线程之后，该线程就处于新建状态，此时仅由 JVM 为其分配内存，并初始化其成员变量的值

**2 就绪状态（RUNNABLE）**

当线程对象调用了 start()方法之后，该线程处于就绪状态。Java 虚拟机会为其创建方法调用栈和程序计数器，等待调度运行。

**3 运行状态（RUNNING）**

如果处于就绪状态的线程获得了 CPU，开始执行 run()方法的线程执行体，则该线程处于运行状态。

**4 阻塞状态（BLOCKED）**

阻塞状态是指线程因为某种原因放弃了 cpu 使用权，也即让出了 cpu 时间片，暂时停止运行。直到线程进入 就绪(runnable)状态，才有机会再次获得 cpu timeslice 转到运行(running)状态。阻塞的情况分三种：
1. 等待阻塞（o.wait->等待对列）: 运行(running)的线程执行 o.wait()方法，JVM 会把该线程放等待队列(waitting queue)中。
2. 同步阻塞(lock->锁池)：运行(running)的线程在获取对象的同步锁时，若该同步锁被别的线程占用，则 JVM 会把该线程放入锁池(lock pool)中。
3. 其他阻塞(sleep/join)：运行(running)的线程执行 Thread.sleep(long ms)或 t.join()方法，或者发出了 I/O 请求时，JVM 会把该线程置为阻塞状态。当 sleep()状态超时、join()等待线程终止或者超时、或者 I/O处理完毕时，线程重新转入就绪(runnable)状态。

**5 线程死亡（DEAD）**

线程会以下面三种方式结束，结束后就是死亡状态。
1. 正常结束：run()或 call()方法执行完成，线程正常结束。
1. 异常结束：线程抛出一个未捕获的 Exception 或 Error。
1. 调用 stop：直接调用该线程的 stop()方法来结束该线程—该方法通常容易导致死锁，不推荐使用。

## 终止线程的方式有哪些？⭐⭐ :id=stop-method
有4中方式：

**1 正常运行结束**

程序运行结束，线程自动结束。

**2 使用退出标志退出线程**

一般 run()方法执行完，线程就会正常结束，然而，常常有些线程是伺服线程。它们需要长时间的
运行，只有在外部某些条件满足的情况下，才能关闭这些线程。使用一个变量来控制循环，例如：
最直接的方法就是设一个 boolean 类型的标志，并通过设置这个标志为 true 或 false 来控制 while
循环是否退出，代码示例：
```java
public class ThreadSafe extends Thread {
 public volatile boolean exit = false; 
 public void run() { 
 while (!exit){
 //do something
 }
 } 
}
```
定义了一个退出标志 exit，当 exit 为 true 时，while 循环退出，exit 的默认值为 false.在定义 exit
时，使用了一个 Java 关键字 volatile，这个关键字的目的是使 exit 同步，也就是说当一个线程修改了 exit 的值后，其他线程能准确读取到。

**3 Interrupt 方法结束线程**

使用 interrupt()方法来中断线程有两种情况：
1. 线程处于阻塞状态：如使用了 sleep,同步锁的 wait,socket 中的 receiver,accept 等方法时，会使线程处于阻塞状态。当调用线程的 interrupt()方法时，会抛出 InterruptException 异常。阻塞中的那个方法抛出这个异常，通过代码捕获该异常，然后 break 跳出循环状态，从而让我们有机会结束这个线程的执行。通常很多人认为只要调用 interrupt 方法线程就会结束，实际上是错的， 一定要先捕获 InterruptedException 异常之后通过 break 来跳出循环，才能正常结束 run 方法。
1. 线程未处于阻塞状态：使用 isInterrupted()判断线程的中断标志来退出循环。当使用interrupt()方法时，中断标志就会置 true，和使用自定义的标志来控制循环是一样的道理。

```java
 public class ThreadSafe extends Thread {
 public void run() { 
 while (!isInterrupted()){ //非阻塞过程中通过判断中断标志来退出
 try{
 Thread.sleep(5*1000);//阻塞过程捕获中断异常来退出
 }catch(InterruptedException e){
 e.printStackTrace();
 break;//捕获到异常之后，执行 break 跳出循环
 }
 }
 } 
}
```

**4 stop 方法终止线程**
> 线程不安全

程序中可以直接使用 thread.stop()来强行终止线程，但是 stop 方法是很危险的，就象突然关闭计算机电源，而不是按正常程序关机一样，可能会产生不可预料的结果，不安全主要是：

thread.stop()调用之后，创建子线程的线程就会抛出 ThreadDeatherror 的错误，并且会释放子线程所持有的所有锁。一般任何进行加锁的代码块，都是为了保护数据的一致性，如果在调用thread.stop()后导致了该线程所持有的所有锁的突然释放(不可控制)，那么被保护数据就有可能呈现不一致性，其他线程在使用这些被破坏的数据时，有可能导致一些很奇怪的应用程序错误。

因此，并不推荐使用 stop 方法来终止线程。

## sleep 与 wait 区别? ⭐ :id=sleep-vs-wait
1. 对于 sleep()方法，我们首先要知道该方法是属于 Thread 类中的。而 wait()方法，则是属于Object 类中的。
2. sleep()方法导致了程序暂停执行指定的时间，让出 cpu 该其他线程，但是他的监控状态依然保持者，当指定的时间到了又会自动恢复运行状态。
3. 在调用 sleep()方法的过程中，线程不会释放对象锁。
4. 而当调用 wait()方法的时候，线程会放弃对象锁，进入等待此对象的等待锁定池，只有针对此对象调用 notify()方法后本线程才进入对象锁定池准备获取对象锁进入运行状态。

## start 与 run 区别? ⭐ :id=satrt-vs-run
1. start（）方法来启动线程，真正实现了多线程运行。这时无需等待 run 方法体代码执行完毕，可以直接继续执行下面的代码。
2. 通过调用 Thread 类的 start()方法来启动一个线程， 这时此线程是处于就绪状态， 并没有运行。
3. 方法 run()称为线程体，它包含了要执行的这个线程的内容，线程就进入了运行状态，开始运行 run 函数当中的代码。 Run 方法运行结束， 此线程终止。然后 CPU 再调度其它线程。

## 解释一下Java后台线程？⭐⭐⭐ :id=demo-thread
守护线程--也称“服务线程”，他是后台线程，它有一个特性，即为用户线程 提供 公共服务，在没有用户线程可服务时会自动离开。

有几个特点：

1. 优先级：守护线程的优先级比较低，用于为系统中的其它对象和线程提供服务。
1. 设置：通过 setDaemon(true)来设置线程为“守护线程”；将一个用户线程设置为守护线程的方式是在 线程对象创建 之前 用线程对象的 setDaemon 方法。
1. 在 Daemon 线程中产生的新线程也是 Daemon 的。
1. 线程则是 JVM 级别的，以 Tomcat 为例，如果你在 Web 应用中启动一个线程，这个线程的生命周期并不会和 Web 应用程序保持同步。也就是说，即使你停止了 Web 应用，这个线程依旧是活跃的。
1. example: 垃圾回收线程就是一个经典的守护线程，当我们的程序中不再有任何运行的Thread,程序就不会再产生垃圾，垃圾回收器也就无事可做，所以当垃圾回收线程是 JVM 上仅剩的线程时，垃圾回收线程会自动离开。它始终在低级别的状态中运行，用于实时监控和管理系统中的可回收资源。
1. 生命周期：守护进程（Daemon）是运行在后台的一种特殊进程。它独立于控制终端并且周期性地执行某种任务或等待处理某些发生的事件。也就是说守护线程不依赖于终端，但是依赖于系统，与系统“同生共死”。当 JVM 中所有的线程都是守护线程的时候，JVM 就可以退出了；如果还有一个或以上的非守护线程则 JVM 不会退出。

## 线程有哪些基本方法？⭐⭐⭐⭐ :id=basic-method
线程相关的基本方法有 wait，notify，notifyAll，sleep，join，yield 等。

![](../../imgs/thread_4.jpg)

**1 线程等待（wait）**

调用该方法的线程进入 WAITING 状态，只有等待另外线程的通知或被中断才会返回，需要注意的是调用 wait()方法后，会释放对象的锁。因此，wait 方法一般用在同步方法或同步代码块中。

**2 线程睡眠（sleep）**

sleep 导致当前线程休眠，与 wait 方法不同的是 sleep 不会释放当前占有的锁,sleep(long)会导致线程进入 TIMED-WATING 状态，而 wait()方法会导致当前线程进入 WATING 状态

**3 线程让步（yield）**

yield 会使当前线程让出 CPU 执行时间片，与其他线程一起重新竞争 CPU 时间片。一般情况下，优先级高的线程更有可能竞争到 CPU 时间片，但这不是绝对的，有的操作系统对线程优先级并不敏感。

**4  线程中断（interrupt）**

中断一个线程，其本意是给这个线程一个通知信号，会影响这个线程内部的一个中断标识位。这个线程本身并不会因此而改变状态(如阻塞，终止等)。
1. 调用 interrupt()方法并不会中断一个正在运行的线程。也就是说处于 Running 状态的线程并不会因为被中断而被终止，仅仅改变了内部维护的中断标识位而已。
2. 若调用 sleep()而使线程处于 TIMED-WATING 状态，这时调用 interrupt()方法，会抛出InterruptedException,从而使线程提前结束 TIMED-WATING 状态。
3. 许多声明抛出 InterruptedException 的方法(如 Thread.sleep(long mills 方法))，抛出异常前，都会清除中断标识位，所以抛出异常后，调用 isInterrupted()方法将会返回 false。
4. 中断状态是线程固有的一个标识位，可以通过此标识位安全的终止线程。比如,你想终止一个线程 thread 的时候，可以调用 thread.interrupt()方法，在线程的 run 方法内部可以根据 thread.isInterrupted()的值来优雅的终止线程。

**5 Join 等待其他线程终止**

join() 方法，等待其他线程终止，在当前线程中调用一个线程的 join() 方法，则当前线程转为阻塞状态，等到另一个线程结束，当前线程再由阻塞状态变为就绪状态，等待 cpu 的宠幸。

**6 线程唤醒（notify）**

Object 类中的 notify() 方法，唤醒在此对象监视器上等待的单个线程，如果所有线程都在此对象上等待，则会选择唤醒其中一个线程，选择是任意的，并在对实现做出决定时发生，线程通过调用其中一个 wait() 方法，在对象的监视器上等待，直到当前的线程放弃此对象上的锁定，才能继续执行被唤醒的线程，被唤醒的线程将以常规方式与在该对象上主动同步的其他所有线程进行竞争。类似的方法还有 notifyAll() ，唤醒再次监视器上等待的所有线程。

**7  其他方法**
1. sleep(long n)：强迫一个线程睡眠Ｎ毫秒。
2. isAlive()： 判断一个线程是否存活。
3. join()： 等待线程终止。
4. activeCount()： 程序中活跃的线程数。
5. enumerate()： 枚举程序中的线程。
6. currentThread()： 得到当前线程。
7. isDaemon()： 一个线程是否为守护线程。
8. setDaemon()： 设置一个线程为守护线程。(用户线程和守护线程的区别在于，是否等待主线程依赖于主线程结束而结束) 
9. setName()： 为线程设置一个名称。
10. wait()： 强迫一个线程等待。
11. notify()： 通知一个线程继续运行。
12. setPriority()： 设置一个线程的优先级。
13. getPriority():：获得一个线程的优先级。

## 为什么要用 join方法？⭐⭐ :id=why-join
很多情况下，主线程生成并启动了子线程，需要用到子线程返回的结果，也就是需要主线程需要
在子线程结束后再结束，这时候就要用到 join() 方法。
```java
System.out.println(Thread.currentThread().getName() + "线程运行开始!");
 Thread6 thread1 = new Thread6();
 thread1.setName("线程 B");
 thread1.join();
System.out.println("这时 thread1 执行完毕之后才能执行主线程");
```

## 线程上下文是怎么切换的？⭐⭐⭐⭐⭐ :id=context-switch
上下文切换是指
>CPU任务，它状态的保存及再加载过程

基于时间片轮转的方式, CPU 会对每个任务都执行一定的时间，然后把当前任务的状态保存下来，然后在执行下一任务之前，先加载该任务的状态，然后再执行。

时间片轮转的方式可以使多个任务在同一颗 CPU 上执行。

![](../../imgs/thread_5.jpg)

**重要概念理解：**

**1 进程（有时候也称做任务）**
> 是指一个程序运行的实例

相对于进程来说，线程则是
> 在 Linux 系统中，能并行运行并且与他们的父进程（创建他们的进程）共享同一地址空间（一段内存区域）和其他资源的轻量级的进程。

**2 线程上下文**

是指某一时间点， **CPU 寄存器**和**程序计数器**的内容。

**3 寄存器**

是 CPU 内部的数量较少但是速度很快的内存（与之对应的是 CPU 外部相对较慢的 RAM 主内存）。它里面存常用值（通常是运算的中间值），以此来提高访问速度，从而提高计算机程序运行的速度。

**4 程序计数器**

是一个专用的寄存器，用于表明指令序列中 CPU 正在执行的位置，存的值为正在执行的指令的位置或者下一个将要被执行的指令的位置，具体依赖于特定的系统。

**5 PCB-“切换桢”**

上下文切换可以认为是内核（操作系统的核心）在 CPU 上对于进程（包括线程）进行切换，上下文切换过程中的信息是保存在进程控制块（PCB, process control block）中的。PCB 还经常被称作“切换桢”（switch-frame）。信息会一直保存到 CPU 的内存中，直到他们被再次使用。

**6 上下文切换的活动**
1. 挂起一个进程，将这个进程在 CPU 中的状态（上下文）存储于内存中的某处。
2. 在内存中检索下一个进程的上下文并将其在 CPU 的寄存器中恢复。
3. 跳转到程序计数器所指向的位置（即跳转到进程被中断时的代码行）继续执行。

引起线程上下文切换的原因：
1. 当前执行任务的时间片用完之后，系统 CPU 正常调度下一个任务；
2. 当前执行任务碰到 IO 阻塞，调度器将此任务挂起，继续下一任务；
3. 多个任务抢占锁资源，当前任务没有抢到锁资源，被调度器挂起，继续下一任务；
4. 用户代码挂起当前任务，让出 CPU 时间；
5. 硬件中断；

## 如何使用CountDownLatch-线程计数器 ？⭐⭐ :id=count-down-latch
CountDownLatch 类位于 java.util.concurrent 包下，利用它可以实现类似计数器的功能。比如有
一个任务 A，它要等待其他 4 个任务执行完毕之后才能执行，此时就可以利用 CountDownLatch
来实现这种功能了。

## 如何使用CyclicBarrier-回环栅栏？⭐⭐ :id=cyclic-barrier
> 等待至 barrier 状态再全部同时执行

字面意思回环栅栏，通过它可以实现让一组线程等待至某个状态之后再全部同时执行。叫做回环
是因为当所有等待线程都被释放以后，CyclicBarrier 可以被重用。我们暂且把这个状态就叫做
barrier，当调用 await()方法之后，线程就处于 barrier 了。
CyclicBarrier 中最重要的方法就是 await 方法，它有 2 个重载版本：
1. public int await()：用来挂起当前线程，直至所有线程都到达 barrier 状态再同时执行后续任务；
2. public int await(long timeout, TimeUnit unit)：让这些线程等待至一定的时间，如果还有线程没有到达 barrier 状态就直接让到达 barrier 的线程执行后续任务。

另外 CyclicBarrier 是可以重用的。

## CountDownLatch 和 CyclicBarrier有什么区别？⭐⭐⭐ :id=cdl-vs-cb
CountDownLatch 和 CyclicBarrier 都能够实现线程之间的等待，只不过它们侧重点不
同；CountDownLatch 一般用于某个线程 A 等待若干个其他线程执行完任务之后，它才执行；而 CyclicBarrier 一般用于一组线程互相等待至某个状态，然后这一组线程再同时执行；另外，CountDownLatch 是不能够重用的，而 CyclicBarrier 是可以重用的。

## 怎么理解volatile 关键字的作用？⭐⭐⭐⭐⭐ :id=volatile
> 1. 变量可见性
> 1. 禁止重排序

**非volatile变量的读取过程**：

![](../../imgs/thread_13.jpg)

当对非 volatile 变量进行读写的时候，每个线程先从内存拷贝变量到 CPU 缓存中。如果计算机有
多个 CPU，每个线程可能在不同的 CPU 上被处理，这意味着每个线程可以拷贝到不同的 CPU 
cache 中。

而声明变量是 volatile 的，JVM 保证了每次读变量都从内存中读，跳过 CPU cache 这一步。

volatile 变量是Java提供的一种稍弱的同步机制，用来确保将变量的更新操作通知到其他线程。它不会被缓存在寄存器或者对其他处理器不可见的地方，因此在读取 volatile 类型的变量时总会返回最新写入的值。

volatile 变量具备两种特性：

**1 变量可见性**

保证该变量对所有线程可见，当一个线程修改了变量的值，那么新的值对于其他线程是可以立即获取的。

**2 禁止重排序**

volatile 禁止了指令重排。

指令重排是指
> Java编译器在编译Java代码的时，或者CPU在执行JVM字节码的时，对现有的指令顺序进行重新排序

会打乱我们程序语句的执行顺序

指令重排的目的是
> 为了在不改变单线程情况下，程序执行的结果，指令重排会优化程序的运行效率

指令重排的缺陷是
> 不能保证多线程下，程序执行的结果是否正确

volatile的实现方式：
> 通过*内存屏障*实现，内存屏障也称为*内存栅栏*或*栅栏指令*，是一种屏障指令，它使CPU或编译器对屏障指令之前和之后发出的内存操作执行一个排序约束。 这通常意味着在屏障之前发布的操作被保证在屏障之后发布的操作之前执行。

内存屏障共分为四种类型：
1. LoadLoad屏障：抽象场景：Load1; LoadLoad; Load2；Load1 和 Load2 代表两条读取指令。在Load2要读取的数据被访问前，保证Load1要读取的数据被读取完毕。
1. StoreStore屏障：抽象场景：Store1; StoreStore; Store2；Store1和 Store2代表两条写入指令。在Store2写入执行前，保证Store1的写入操作对其它处理器可见
1. LoadStore屏障：抽象场景：Load1; LoadStore; Store2；在Store2被写入前，保证Load1要读取的数据被读取完毕。
1. StoreLoad屏障：抽象场景：Store1; StoreLoad; Load2；在Load2读取操作执行前，保证Store1的写入对所有处理器可见。StoreLoad屏障的开销是四种屏障中最大的。

在一个变量被volatile修饰后，JVM会为我们做两件事：
> 1. 在每个volatile写操作前插入StoreStore屏障，在写操作后插入StoreLoad屏障。
> 2. 在每个volatile读操作前插入LoadLoad屏障，在读操作后插入LoadStore屏障。

![](../../imgs/volatile_1.png)
![](../../imgs/volatile_2.png)

## 为什么说volatile是比sychronized更轻量级的同步锁？⭐ :id=volatile-vs-sync
在访问 volatile 变量时，不会执行**加锁操作**，也就不会导致线程阻塞，因此 volatile 变量是一
种比 sychronized 关键字更轻量级的同步机制。

## volatile适用于哪些场景？⭐⭐⭐ :id=volatile-sence
volatile 适合这种场景：一个变量被多个线程共享，线程直接给这个变量赋值。

值得说明的是对 volatile 变量的单次读/写操作可以保证原子性的，如 long 和 double 类型变量，但是并不能保证 i++这种操作的原子性，因为本质上 i++是读、写两次操作。在某些场景下可以代替 Synchronized。但是,volatile 的不能完全取代 Synchronized 的位置，只有在一些特殊的场景下，才能适用 volatile。

总的来说，必须同时满足下面两个条件才能保证在并发环境的线程安全：
1. 单纯的变量赋值（比如：boolean flag = true），即，对变量的写操作不依赖于当前值（比如 ：i++）。
1. 该变量没有包含在具有其他变量的不变式中，也就是说，不同的 volatile 变量之间，不能互相依赖。只有在状态真正独立于程序内其他内容时才能使用 volatile。

## 如何在两个线程间共享数据？⭐⭐ :id=share-data
Java 里面进行多线程通信的主要方式就是共享内存的方式，共享内存主要的关注点有两个：可见
性和有序性原子性。Java 内存模型（JMM）解决了可见性和有序性的问题，而锁解决了原子性的
问题，理想情况下我们希望做到“同步”和“互斥”。有以下常规实现方法：

1. 将数据抽象成一个类，并将数据的操作作为这个类的方，这么设计可以和容易做到
同步，只要在方法上加”synchronized“。
1. 将 Runnable 对象作为一个类的内部类，共享数据作为这个类的成员变量，每个线程对共享数据的操作方法也封装在外部类，以便实现对数据的各个操作的同步和互斥，作为内部类的各个 Runnable 对象调用外部类的这些方法。

## 怎么理解ThreadLocal？⭐⭐⭐⭐ :id=thread-local
> 线程本地存储

ThreadLocal，很多地方叫做线程本地变量，也有些地方叫做线程本地存储，ThreadLocal 的作用
是提供线程内的局部变量，这种变量在线程的生命周期内起作用，减少同一个线程内多个函数或
者组件之间一些公共变量的传递的复杂度。

**ThreadLocalMap（线程的一个属性）**
1. 每个线程中都有一个自己的 ThreadLocalMap 类对象，可以将线程自己的对象保持到其中，
各管各的，线程可以正确的访问到自己的对象。
2. 将一个共用的 ThreadLocal 静态实例作为 key，将不同对象的引用保存到不同线程的
ThreadLocalMap 中，然后在线程执行的各处通过这个静态 ThreadLocal 实例的 get()方法取
得自己线程保存的那个对象，避免了将这个对象作为参数传递的麻烦。
3. ThreadLocalMap 其实就是线程里面的一个属性，它在 Thread 类中定义ThreadLocal.ThreadLocalMap threadLocals = null;

![](../../imgs/thread_7.jpg)

## ThreadLocal适用于哪些场景？⭐⭐⭐ :id=thread-local-sence
1. 线程间数据隔离
2. 线程内不同方法间，数据传递，如：数据库连接、Session 管理等。