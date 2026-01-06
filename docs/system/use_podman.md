# 使用Podman

podman官网： [https://podman.io/](https://podman.io/)

## Window下使用
## 0x01. Window下使用wsl
安装的时候，选择 wsl

### 1. 启动命令
需要先启动虚拟机， 常用命令

```shell
# 初始化虚拟机。此过程会下载 VM 镜像，需要一些时间
podman machine init
# 启动虚拟机
podman machine start
# 进入虚拟机
podman machine ssh
### 2.6 podman 虚拟机配置

# 查看虚拟机信息
podman machine status
# 查看虚拟机 IP
podman machine ip
# 关闭虚拟机
podman machine stop
# 删除虚拟机
podman machine rm

#验证是否可以运行容器（拉取 hello-word 镜像并运行它，成功会输出）
podman run hello-world

# 查看安装信息
podman info
```

### 2. 配置镜像源
需要以root的 身份启动虚拟机
```shell
# 设置 root 身份
podman machine set --rootful
# 启动虚拟机
podman machine start
# 进入虚拟机
podman machine ssh
# 编辑配置文件
cd /etc/containers/
cp registries.conf registries.conf_bck
vi registries.conf
```

加入以下内容

```txt
# 认情况下，podman pull 和 podman search 命令以指定顺序在 unqualified-search-registries 列表中列出的注册表中搜索容器镜像
unqualified-search-registries = ["docker.m.daocloud.io", "registry.access.redhat.com", "registry.redhat.io", "docker.io"]
# short-name-mode = "disabled"

# 设置 docker.io 前缀的 docker 地址使用其他镜像地址
[[registry]]
prefix = "docker.io"
location = "docker.1ms.run"
# location = docker.m.daocloud.io
# 当 registry.location 无法访问时，会以 mirror 顺序访问镜像源
[[registry.mirror]]
location = "hub.mirrorify.net"
insecure = true
[[registry.mirror]]
location = "dislabaiot.xyz"
insecure = true
[[registry.mirror]]
location = "doublezonline.cloud"
insecure = true

# 设置 quay.io 镜像地址 -- Redhat 镜像中心
[[registry]]
prefix = "quay.io"
location = "quay.mirrorify.net"
# location = "quay.m.daocloud.io"

# 设置 ghcr.io 镜像地址 -- github 镜像中心
[[registry]]
prefix = "ghcr.io"
location = "ghcr.mirrorify.net"
# location = "ghcr.m.daocloud.io"

# 设置 gcr.io 镜像地址 -- google 镜像中心
[[registry]]
prefix = "gcr.io"
location = "gcr.mirrorify.net"
# location = "gcr.m.daocloud.io"

# 设置 k8s.gcr.io 镜像地址
[[registry]]
prefix = "k8s.gcr.io"
location = "k8s.mirrorify.net"
# location = "k8s.m.daocloud.io"

```

执行以下命令验证

```shell
podman info
```