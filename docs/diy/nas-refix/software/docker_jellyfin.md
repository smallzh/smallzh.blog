# 安装Jellykin

## 1 搜索Jellykin镜像

```shell
docker search jellyfin
```

## 2 拉取镜像
```shell
docker pull jellyfin/jellyfin
```

## 3 创建必要目录
```shell
mkdir -p /home/jellyfin/config
mkdir -p /home/data/jellyfin/video
mkdir -p /home/data/jellyfin/photo
mkdir -p /home/data/jellyfin/music
```

## 4 启动镜像
```shell
docker run -d --restart=always -p 4031:8096 -v /home/jellyfin/config:/config -v /home/data/jellyfin:/media --name jellyfin jellyfin/jellyfin
```

## 5 浏览器访问

在浏览器中输入`http://ip:4031` 进行页面访问

# 图片处理
以下基于`Openmediavault`系统，即`Debian`系统

## 转换 HEIC 为 JPG
### 使用 heif-convert 工具
安装 `heif-convert` 工具

```shell
apt install -y libheif-examples
````

执行转换

```shell
heif-convert -q 85 input.HEIC output.JPG
```

多文件转换
```
for file in *.HEIC; do heif-convert $file ${file%.HEIC}.jpg; done
```

### 使用imagemagick 工具

安装 `` 工具

```shell
apt install imagemagick
```

执行转换

```shell
convert input.HEIC -quality 95 output.JPG
```

多文件转换

```shell
for file in *.png; do convert $file ${file%.png}.webp; done
```

旋转图片
```shell
convert input.jpg -rotate 90 out.jpg
```
正数为 顺时针 方向，负数为 逆时针方向

多图片旋转

```shell
for file in *.jpg; do convert $file -rotate 90 rotated-$file; done 

# 指定专门目录的方式
for szFile in /path/*.png do convert "$szFile" -rotate 90 /tmp/"$(basename "$szFile")" ; done 
```
