# 搭建calibre-web

## 1 拉取镜像

```shell
docker search calibre-web
docker pull linuxserver/calibre-web
```

## 2 准备目录

```shell
mkdir -p /home/data/calibre/config
mkdir -p /home/data/calibre/books
```

## 3 启动容器

```shell
docker run -d --name=calibre --restart=always -p 8083:8083 -v /home/data/calibre/config:/config -v /home/data/calibre/books:/books linuxserver/calibre-web
```

浏览器访问

默认密码是 admin/admin123

## 4 导入数据库

导入`metadata.db` 文件