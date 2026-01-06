# Neo4j相关教程

## 安装并启动Neo4j

这里使用 neo4j的 4.4.15-community 版本的 docker 镜像

镜像拉取

```shell
docker pull neo4j:4.4.15-community
```

将重要的目录映射到宿主机上

```shell
mkdir -p /home/neo4j/data
mkdir -p /home/neo4j/logs
mkdir -p /home/neo4j/conf
mkdir -p /home/neo4j/import
```

启动镜像

```shell
docker run -d --name neo4j --restart=always -p 7474:7474 -p 7687:7687 -v /home/neo4j/data:/data -v /home/neo4j/logs:/logs -v /home/neo4j/conf:/var/lib/neo4j/conf -v /home/neo4j/import:/var/lib/neo4j/import --env NEO4J_AUTH=neo4j/12345687@ neo4j:4.4.15-community
```

## 参考地址

Neo4j地址：[https://neo4j.com/docs/cypher-manual/5/syntax/values/](https://neo4j.com/docs/cypher-manual/5/syntax/values/)