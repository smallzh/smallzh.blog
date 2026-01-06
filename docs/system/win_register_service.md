# 注册服务

## 1. 添加本地服务(注意端口和路径)
```shell
sc create windows_exporter binpath= "D:\windows_exporter.exe --telemetry.addr=:10090" displayname= "windows_exporter" start= auto
```
## 2. 添加描述
```shell
sc description windows_exporter "提供监控本服务器的监控节点。若停止此服务，运维人员不能实时有效获取本服务器的硬件数据，请慎重关闭此服务。";
```

## 3. 启动服务
```shell
net start windows_exporter
```

## 4. 测试端口是否启动
```shell
netstat -ano | findstr 10090
```
## 5. 关闭服务
```shell
net stop  windows_exporter
```
## 6. 删除服务
```shell
sc delete windows_exporter;
```