## 高并发相关问题
---

## 怎么理解高并发？ ⭐ :id=hc-concept
怎么让有限的服务器支撑更多的用户请求

## 高并发的无状态原则？ ⭐ :id=hc-no-status
1. ⽆状态应⽤，便于⽔平扩展
1. 有状态配置可通过配置中⼼实现⽆状态
1. 实践: Disconf、Yaconf、Zookpeer、Consul、Confd、Diamond、Xdiamond等

## 高并发的拆分原则？ ⭐ :id=hc-split
1. 系统维度：按照系统功能、业务拆分，如购物⻋，结算，订单等
1. 功能维度：对系统功能在做细粒度拆分
1. 读写维度：根据读写⽐例特征拆分；读多，可考虑多级缓存；写多，可考虑分库分表
1. AOP维度： 根据访问特征，按照AOP进⾏拆分，⽐如商品⻚可分为CDN、⻚⾯渲染系统，CDN就是⼀个AOP系统
1. 模块维度：对整体代码结构划分Web、Service、DAO

## 高并发的服务化原则？ ⭐ :id=hc-server
1. 服务化演进: 进程内服务-单机远程服务-集群⼿动注册服务-⾃动注册和发现服务-服务的分组、隔离、路由-服务治理
1. 考虑服务分组、隔离、限流、⿊⽩名单、超时、重试机制、路由、故障补偿等
1. 实践：利⽤Nginx、HaProxy、LVS等实现负载均衡，ZooKeeper、Consul等实现⾃动注册和发现服务。

## 高并发的消息队列？ ⭐ :id=hc-msg-queue
1. ⽬的: 服务解耦(⼀对多消费)、异步处理、流量削峰缓冲等
1. ⼤流量缓冲： 牺牲强⼀致性，保证最终⼀致性(案例：库存扣减，现在Redis中做扣减，记录扣减⽇志，通过后台进程将扣减⽇志应⽤到DB)
1. 数据校对: 解决异步消息机制下消息丢失问题

## 高并发的数据异构问题？ ⭐ :id=hc-data-struct
1. 数据异构: 通过消息队列机制接收数据变更，原⼦化存储
1. 数据闭环: 屏蔽多从数据来源，将数据异构存储，形成闭环

## 高并发中的缓存？ ⭐ :id=hc-cache
1. ⽤户层：DNS缓存、浏览器DNS缓存、操作系统DNS缓存、本地DNS服务商缓存、DNS服务器缓存、客户端缓存、浏览器缓存(Expires、Cache-Control、Last-Modified、Etag)、 App
客户缓存(js/css/image…)
1. 代理层：CDN缓存(⼀般基于ATS、Varnish、Nginx、Squid等构建,边缘节点-⼆级节点-中⼼节点-源站)
1. 接⼊层（Nginx为例）：Proxy_cache： 代理缓存,可以存储到/dev/shm或者SSDFastCGI Cache、Nginx+Lua+Redis: 业务数据缓存
1. 应⽤层：⻚⾯静态化、业务数据缓存(Redis/Memcached/本地⽂件等)、消息队列
1. 数据层：NoSQL： Redis、Memcache、SSDB等、MySQL： Innodb/MyISAM等Query Cache、Key Cache、Innodb、Buffer Size等
1. 系统层：CPU : L1/L2/L3 Cache/NUMA、内存、磁盘：磁盘本身缓存dirty_ratio/dirty_background_ratio、阵列卡本身缓存