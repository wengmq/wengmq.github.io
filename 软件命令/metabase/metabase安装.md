
### 使用docker-compose部署

- 1. docker-compose.yml文件如下：

```
version: '3.3'
services:
  metabase:
    image: metabase/metabase:latest
    container_name: metabase
    hostname: metabase
    volumes:
    - /dev/urandom:/dev/random:ro
    ports:
      - 3000:3000
    environment:
      MB_DB_TYPE: postgres
      MB_DB_DBNAME: metabase
      MB_DB_PORT: 5432
      MB_DB_USER_FILE: /run/secrets/db_user
      MB_DB_PASS_FILE: /run/secrets/db_password
      MB_DB_HOST: postgres
    networks:
      - metanet1
    secrets:
      - db_password
      - db_user
    healthcheck:
      test: curl --fail -I http://localhost:3000/api/health || exit 1
      interval: 15s
      timeout: 5s
      retries: 5
  postgres:
    image: postgres:latest
    container_name: postgres
    hostname: postgres
    environment:
      POSTGRES_USER_FILE: /run/secrets/db_user
      POSTGRES_DB: metabase
      POSTGRES_PASSWORD_FILE: /run/secrets/db_password
    networks:
      - metanet1
    secrets:
      - db_password
      - db_user
networks:
  metanet1:
    driver: bridge
secrets:
   db_password:
     file: db_password.txt
   db_user:
     file: db_user.txt

```


- 2. 据库用户名文件、数据库密码文件准备（和docker-compse.yml同目录即可）

	 db_user.txt

```txt
admin
```

	db_password.txt

```txt
admin123456
```


- 3. 启动容器
	- 起服务：`docker-compose -f docker-compose.yml up -d`

- 4. 验证：访问[http://localhost:3000](http://localhost:3000/)