# Docker安装portainer

## 1 搜索portainer
```shell
docker search portainer
```

## 2 拉取portiner-ce镜像
```shell
docker pull portainer/portainer-ce
```

## 3 启动容器
```shell
docker run -d -p 9000:9000 --restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
--name portainer portainer/portainer-ce
```

## 4 查看启动日志
```shell
docker logs -f portainer
```

## 5 浏览器中访问

在浏览器中输入`http://ip:9000`进行访问