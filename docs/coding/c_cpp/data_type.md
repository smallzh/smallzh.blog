计算机程序在存储数据时必须跟踪的3种基本属性:
(1)信息存储在何处
(2)存储的值是多少
(3)存储的信息是什么类型
## 1 基本类型
### 1.1 整形
对应整数，比如，100，-100等等

| 名称 | bit位数 |
| --- | --- |
| short | 至少16位 |
| int | 至少和short一样长 |
| long | 至少32位，且至少和int一样长 |
| long long | 至少64位，且至少和long一样长 |


### 1.2 字符型
对应单个字符或小整形，比如，a、b、122等等

### 1.3 布尔类型
对应true和false，只有这两个取值

### 1.4 浮点型
对应于小数，比如，100.55、-100.55等等

| 名称 | bit位数 |
| --- | --- |
| float | 至少32位 |
| double | 至少64位 |
| long double | 至少64位 |


## 2 复合类型
### 2.1 数组
是一种数据格式，用于存储**多个相同类型**的值
格式：
`typeName arrayName[arraySize]` 
`typeName arrayName[arraySize] = {e1,e2,e3}` 或
`typeName arrayName[arraySize] {e1,e2,e3}`
举例：

```cpp
int months[12]; // 创建一个存储12个int类型的数组，不进行初始化
int months[12] = {1, 2, 3, 4}; // 创建存储12个int类型的数组，并初始化，c++11前
int months[12] = {1, 2, 3, 4}; // 同上，c++11 以上
```
访问：
`arrayName[index]` 数组名称加元素索引，索引从0开始
举例：

```cpp
month[0]; // 一月
month[11]; // 12月
```

### 2.2 字符串
字符串是存储在内存的连续字节中的一系列字符。C++处理字符串的方式有两种。
(1)称为C-风格字符串（C-style string）
(2)另一种基于string类库的方法
#### 2.2.1 C风格字符串
以空字符结尾的字符数组表示一个字符串，空字符写作 `\0` 
或
双引号括起来
举例：

```cpp
char dog[3] = {'d','o','g'}; // 字符数组
char cat[4] = {'c','a','t','\0'}; // 数组形式的 字符串
char cat[4] = "cat"; // 双引号形式的 字符串
```

#### 2.2.2 string类
引入 `std` 空间的 `string` 类，然后直接定义
举例

```cpp
#include <string> //引入string类

string cat = "cat"; 定义字符串
```

### 2.3 结构体
结构体是一种比数组更灵活的数据格式，同一个结构可以存储多种类型的数据
格式：

```cpp
struct structName {
	dataType variableName;
};
```
举例：

```cpp
struct Student {
	char name[20]; // 姓名
    short sex; // 性别
};
// 使用
struct Student s1; // 带struct关键字的变量定义
Student s2; // 不带关键字的变量定义
// 初始化值
Student s3 = {
	"smallzh"; // 名字
    1; // 性别
};
// 赋值和引用值
s2.name = "smallzh";
s3.name;
// 结构体数组
Student ss[66];
```

### 2.4 共用体
共用体（union）也是一种数据格式，它能够存储不同的数据类型，但只能同时存储其中的一种类型，即，只有其中的一个值起作用。
格式：

```cpp
union unionName {
	int var1; // 第一个变量
    long var2; // 第二个变量
};
```
举例：

```cpp
union Id {
	long id;
    char idChar[20];
};
// 使用
Id id1;
// 赋值 和引用
id1.id = 1;
id1.idChar = "smallzh";
```

### 2.5 枚举
创建符号常量的方式，这种方式可以代替const
格式：

```cpp
// 直接使用
enum enumName {
	value1,
    value2,
    value3
};
// 定义值
enum enumName {
	key1 = value1,
    key2 = value2,
    key3 = value3
};
```
举例：

```cpp
enum Color {
	red,
    yellow,
    blue
};

enum Bit {
	one = 1,
    two = 2,
    eight = 8
};

// 使用
Color color = red;
```

### 2.6 指针
将数据所处位置告诉计算机的变量，是一个变量，其存储的是值的地址，而不是值本身
格式：

```cpp
dataType * variableName;
dataType* variableName;
```
举例：

```cpp
int size = 10; // 定义一个变量
int * point = &size; //存储变量的地址
int* point1 = &size; //存储变量的地址
```

### 2.7 模板类vector
### 2.8 模板类array

## 3 变量和常量
### 3.1 常量
### 3.2 变量
在程序运行期间，值可以被修改的量
#### 3.2.1 自动变量
属于动态存储方式，使用 `auto` 关键字进行修饰，为默认方式
#### 3.2.2 寄存器变量
属于动态存储方式，使用 `register` 关键字进行修饰
#### 3.2.3 外部变量
属于静态存储方式，使用 `extern` 关键字进行修饰
#### 3.2.4 静态变量
属于静态存储方式，使用 `static` 关键字进行修饰