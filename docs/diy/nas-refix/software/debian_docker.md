# Deban安装Docker

执行以下步骤从Docker的存储库安装最新的稳定Docker版本。

## 1 安装通过HTTPS添加新存储库所需的软件包：

```shell
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common gnupg2
```

## 2 使用以下curl命令导入存储库的GPG密钥

```shell
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

成功后，命令将返回OK。

## 3 将稳定的Docker APT存储库添加到系统的软件存储库列表中：
```shell
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/debian $(lsb_release -cs) stable"
```

其中，`$(lsb_release -cs)`将返回Debian发行版的名称。

## 4 更新apt软件包列表并安装最新版本的Docker CE（Community Edition）：
```shell
sudo apt update
sudo apt install docker-ce
```

## 5 安装完成后，查看是否启动

```shell
sudo systemctl status docker
```

## 6 查看docker版本
```shell
sudo docker -v
```
