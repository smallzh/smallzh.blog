# joplin、gitea

## 1 docker-compose 配置

```yml
version: '3'
services:
    postgres_db:
        image: postgres:13
        container_name: postgres_db
        volumes:
            - /home/data/postgres:/var/lib/postgresql
        ports:
            - 5432:5432
        restart: unless-stopped
        environment:
            - POSTGRES_PASSWORD=12345687@Smallzh
            - POSTGRES_USER=joplin
            - POSTGRES_DB=joplin
    joplin_server:
        image: joplin/server:latest
        container_name: joplin_server
        depends_on:
            - postgres_db
        ports:
            - 22300:22300
        restart: unless-stopped
        environment:
            - APP_PORT=22300
            - APP_BASE_URL=http://129.204.205.34:22300
            - DB_CLIENT=pg
            - POSTGRES_PASSWORD=12345687@Smallzh
            - POSTGRES_DATABASE=joplin
            - POSTGRES_USER=joplin
            - POSTGRES_PORT=5432
            - POSTGRES_HOST=postgres_db
    gitea_server:
        image: gitea/gitea:1.18.0
        container_name: gitea
        environment:
          - USER_UID=1000
          - USER_GID=1000
          - GITEA__database__DB_TYPE=postgres
          - GITEA__database__HOST=postgres_db:5432
          - GITEA__database__NAME=gitea
          - GITEA__database__USER=gitea
          - GITEA__database__PASSWD=12345687@Smallzh
        restart: always
        volumes:
          - /home/data/gitea:/data
          - /etc/timezone:/etc/timezone:ro
          - /etc/localtime:/etc/localtime:ro
        ports:
          - "3000:3000"
          - "3022:22"
        depends_on:
          - postgres_db
```