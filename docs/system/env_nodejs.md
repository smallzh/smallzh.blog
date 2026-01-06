# NodeJs、Yarn 和 Nvm

## Window系统

## 1 NodeJs配置

从官网[https://nodejs.org/en/](https://nodejs.org/en/)下载安装包，这里，我安装到了`D:\nodejs`目录里。

### 1 创建必要目录
在NodeJs安装目录下，我这里是`D:\nodejs\`创建 `node_global`和`node_cache`目录，NodeJs安装完后，如下：
```shell
node -v
npm -v
```
![image.png](/_assets/img/notes/ne_1.png)

创建必要目录：
```shell
cd D:\nodejs\
mkdir node_global
mkdir node_cache
```
### 2 全局配置NodeJs 
```shell
npm config --location=global set prefix "D:\nodejs\node_global"

npm config --location=global set cache "D:\nodejs\node_cache"
```

## 2 Yarn配置

### 1 创建必要目录
为了目录的整洁和单一，我将**Yarn相关目录**也放在了 `D:\nodejs\`里，在`nodejs`目录下分别创建 `yarn_bin`和 `yarn_cache`目录

```shell
# 激活 yarn, nodejs (Version > 16.0) 用以下命令
corepack enable
# 查看 yarn版本
yarn -v
```
![image.png](/_assets/img/notes/ne_2.png)

创建必要目录：
```shell
cd D:\nodejs\
mkdir yarn_bin
mkdir yarn_cache
```
### 2 全局配置Yarn
```shell
yarn config set global-folder "D:\nodejs\yarn_bin"

yarn config set cache-folder "D:\nodejs\yarn_cache"
```

配置的原因，是为了避免 出现如下问题

```text
文件名、目录名或卷标语法不正确。
error Command failed.
```
该问题的原因是：**yarn bin目录 和 安装的模块 在不同的硬盘分区**，yarn的安装模块的在Window系统中默认是C盘。

### 3 查看修改的配置
```shell
yarn global bin
yarn global dir

```
![](/_assets/img/notes/ne_3.png)

### 4 修改配置，切换国内源，并关闭ssl验证
```shell
yarn config list
yarn config set registry https://registry.npm.taobao.org
yarn config set strict-ssl false
```

## 3 最终NodeJs安装目录内容
```shell
cd D:\nodejs\
ls 

```
![](/_assets/img/notes/ne_4.png)

注：命令行工具为 `NuShell`

## 4 Nvm安装
从 [https://yarnpkg.com/](https://yarnpkg.com/)下载Nvm包，进行安装

## 附
1. [https://nodejs.org/en](https://nodejs.org/en) nodejs官网
2. [https://github.com/coreybutler/nvm-windows](https://github.com/coreybutler/nvm-windows) nvm-window版本
3. [https://yarnpkg.com/](https://yarnpkg.com/) Yarn官网