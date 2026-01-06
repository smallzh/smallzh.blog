# 操作内存

## 动态内存分配
在程序运行期间，动态的分配和回收内存空间的方法。

### 1 malloc方法
方法签名
```c
void *malloc(unsigned int size)
```
在内存中分配一块大小为 size的联系空间，返回的是一个指向内存地址的 指针
举例：
```c
int *ary; //定义数组指针
ary = (int *) malloc(13*sizeof(int)); //申请内存空间，并将结果由(void *) 转为 (int *)
```

### 2 calloc方法
方法签名
```c
(数据类型 *) calloc(n, size);
```
在内存中分配大小为 size的 n块连续区域，返回一个指向该区域的首地址的指针
举例：
```c
int *ps; //定义指针
ps=(struet Student*)calloc(2,sizeof(struct Student)); //申请内存空间
```

### 3 free方法
方法签名
```c
void free(void *p)
```
释放指针p指向的内存区域，这里p必须是malloc、calloc返回的指针。如果指针传递其他值，可能会引起灾难性后果，需注意！

### 4 realloc方法
方法签名
```c
(数据类型 *) realloc(void *p, int newsize)
```
在原有的内存基础上，重新分配一个新的内存区域