# Docker容器启动顺序

## 启动容器实例

这里使用 `tomcat9`和`mysql8` 作为演示，其中 mysql8的启动，参考 `教程/MySql8` 下的启动过程

tomcat9依赖mysql8，因此，我们将tomcat9的容器 放在 mysql8容器启动之后。

mysql8容器没有要依赖的容器，设置成随docker启动自启就行，因此，只设置 tomcat9的顺序

整个过程中，关键的地方是 **延迟容器启动时间**

首先拉取 tomcat9的 docker镜像

```shell
docker pull tomcat:9-jdk8-corretto
```

创建一个存放应用文件的目录，同时将tomcat的`logs`和`webapp`目录映射到宿主机上

```shell
# 创建应用文件目录
mkdir -p /home/tomcat9/app_files
# 创建tomcat的映射目录
mkdir -p /home/tomcat9/logs
mkdir -p /home/tomcat9/webapp
```

启动容器

```shell
docker run -d --name tomcat9 -p 8080:8080 -v /home/tomcat9/logs:/usr/local/tomcat/logs -v /home/tomcat9/webapp:/usr/local/tomcat/webapps -v /home/tomcat9/app_files:/data/files tomcat:9-jdk8-corretto
```

## 配置容器启动顺序

将docker设置为开机自启

```shell
systemctl enable docker.service
```

### 编辑**rc-local.service** 文件

```shell
vim /lib/systemd/system/rc-local.service
```

末尾添加以下内容

```txt
[Install]
WantedBy=multi-user.target
Alias=rc-local.service
```

### 编辑 **rc.local** 文件

先查看一下tomcat9容器的id

```shell
docker ps
```

我这里，tomcat9的容器id是 `f887619c2c11`

编辑 `rc.local`文件

```shell
vim /etc/rc.local
```

文件末尾添加以下内容

```txt
sleep 10s;docker start f887619c2c11
```

延迟`10s`启动tomcat9容器

ok，重启服务器，试一下效果。