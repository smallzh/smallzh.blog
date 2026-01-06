## 网络

解决的核心问题：**计算机之间的互通**

### 1. 核心概念
1. 包（package）：网络中主要的研究、操作对象
2. 层/栈（layer）：对不同种类包的一种**领域**划分，每层**解决的问题**不一样
3. 协议（protocol）：规定了包的结构，或者说，规定了信息的编码方式

### 2. 上层概念
1. 路由追踪（traceroute）：跟踪包的路由路径


## Scapy
官网：[https://scapy.net/](https://scapy.net/)

官方文档：[https://scapy.readthedocs.io/en/latest/](https://scapy.readthedocs.io/en/latest/)

用python来操作**网络包**的一个Python库，同时支持repl、嵌入到Python项目的方式

### 1.关键概念
1. package：在python中以object的形式存在，对应着各种class，如IP、TCP、Ether等
2. `/`：一个操作符，用于表示不同的`层`或`栈`

```text
计算机的本质，就是0、 1组成的一堆二进制数，对其按某种协议、格式进行编码，并做相应处理。比如网络中的包、图片、文本等等
```