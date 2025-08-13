参考：https://juejin.cn/post/7245275769219203132

##  镜像相关

- 搜索镜像
	- docker search tomcat

- 拉取镜像( 默认拉取的就是 `latest`)
	- docker pull tomcat

- 使用Dockerfile构建镜像
	- docker build -t 镜像名:版本号 . (注意最后边的点 `.` 表示当前目录, 别丢了.)
		- docker build -t my_image:1.0 .
	- 默认情况下，`Dockerfile` 文件位于构建上下文的根目录下，因此 `docker build` 命令会自动读取上下文根路径下名为 `Dockerfile` 的文件。如果 `Dockerfile` 文件不在根目录下，可以使用 `-f` 选项来指定 `Dockerfile` 文件的路径。例如，以下命令将使用 `/path/to/Dockerfile` 文件构建镜像：
		- docker build -f /path/to/Dockerfile -t image_name:tag .

-  查看本地镜像
	- docker images

- 删除本地镜像(> 为了准确删除你的目标镜像, 建议删除有多个版本存在的镜像时, 使用镜像名:版本号, 如果二者镜像 `ID` 不同也可以使用镜像 `ID` 进行删除, 防止误删)
	- docker rmi mysql:5.7
	- docker rmi 2be84dd575ee

- 导出镜像
	- docker save -o 给导出的镜像压缩包起个文件名 要导出的镜像名:版本号
		- docker save -o image.tar target_image:tag
	- tip: 如果用镜像 `ID` 导出的镜像在导入之后是没有名字和`tag`的, 这种情况我们可以提前使用 `docker tag` 给镜像改名字
		- docker tag image_id new_image_name:tag


- 导入镜像
	- docker load -i 指定要导入的镜像压缩包文件名
		- docker load -i image.tar
  

## 容器相关命令

-  创建容器（docker run 镜像名称）
	- docker run -d --name=my_container -p 8080:8080 tomcat:latest
	- 命令常用参数解释：
		- `-d`: 后台运行容器，并返回容器`ID`；
		- `-p`: 指定端口映射，格式为：主机(宿主)端口:容器端口；
		- `-i`: 以交互模式运行容器，通常与 `-t` 同时使用；
		- `-t`: 为容器重新分配一个伪输入终端，通常与 `-i` 同时使用；
		- `--name=my_container`: 为容器指定一个名称；
		- `--dns 8.8.8.8`: 指定容器使用的`DNS`服务器，默认和宿主一致；

- 进入容器(正在运行的容器才可以进入)
	- 使用容器名
		- docker exec -it my_container /bin/bash
	- 使用容器ID
		- docker exec -it container_id /bin/bash

- 查看容器信息
	- 容器名 
		- docker inspect my_container
	- 容器ID 
		- docker inspect container_id


  - 查看容器列表
	  - 查看正在运行的容器列表 
		  - docker ps
	  - 查看全部容器(包括已经停止的容器) 
		  - docker ps -a
	  - 查看正在运行的容器ID列表 
		  - docker ps -q

- 停止运行的容器
	- 使用容器名停止 
		- docker stop my_container
	- 使用容器ID停止 
		- docker stop container_id
	- 使用容器ID停止多个正在运行的容器 
		- docker stop `docker ps -q`

- 启动已停止的容器
	- 使用容器名启动
		- docker start my_container
	- 使用容器ID启动 
		- docker start container_id
	- 使用容器ID启动多个正在运行的容器 
		- docker start `docker ps -q`

- 删除容器
	- 用容器名删除 
		- docker rm my_container
	- 用容器ID删除
		- docker rm container_id 
	- 删除多个未运行的容器, 运行中的无法删除 
		- docker rm `docker ps -aq`


## 容器与宿主机之间的数据拷贝(宿主机上执行)

- 将容器中目录或文件拷贝到宿主机
```
# 将容器中 /app/html 目录拷贝到宿主机 /mnt/ 目录中 
docker cp container_id:/app/html /mnt/ 

# 将容器中 /app/html/index.html 文件拷贝到宿主机 /mnt/dist/ 目录中 
docker cp container_id:/app/html/index.html /mnt/dist/

  
```


- 将宿主机目录或文件拷贝到容器中

```
# 将宿主机 /mnt/dist 目录拷贝到容器的 /app 目录中
docker cp /mnt/dist container_id:/app/

# 将宿主机 /mnt/dist/index.html 文件拷贝到容器的 /app/html 目录中
docker cp /mnt/dist/index.html container_id:/app/html/

```

  
- 将宿主机/mnt/dist目录拷贝到容器中, 并重命名为html
```
# 将宿主机 /mnt/dist 目录拷贝到容器的 /app/ 中重命名为 html 
docker cp /mnt/dist container_id:/app/html 

# 将宿主机 /mnt/dist/index1.html 文件拷贝到容器的 /app/html/ 中重命名为 index.html docker cp /mnt/dist/index1.html container_id:/app/html/index.html

```