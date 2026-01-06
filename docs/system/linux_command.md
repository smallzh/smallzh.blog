# Linux常用命令

## man
学会 使用 man命令，并 理解 各种 符合，如`[]、<>`

## readlink
```shell
# 查找某个文件
readlink -f $(which nc)
# 查找文件
readlink -f test
```
功能：输出符号链接的链接值、文件的全路径
-f参数含义：递归跟随文件名，以给出文件名的全部符号链接

## nc
网站：https://nmap.org/ncat/
```shell
# centos安装
yum install -y nc
# 检测端口是否通； v:显示更多信息；z:不发送数据
nc -vz 192.168.1.12 8080
# 监听端口；l：listen缩写，表示开启监听功能；p：port缩写，表示监听的端口
nc -l -p 8080
```