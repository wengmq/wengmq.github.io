参考：[EXPOSE](https://docs.docker.com/engine/reference/builder/#expose)

`EXPOSE`指令通知`docker`容器在运行时侦听指定的网络端口

## 语法[¶](https://containerization-automation.readthedocs.io/zh-cn/latest/docker/dockerfile/EXPOSE/#_1 "Permanent link")

`EXPOSE <port> [<port>/<protocol>...]`

- 端口号可以任意指定
- 协议指定端口是侦听`TCP`还是`UDP`，默认为`TCP`

`# 指定TCP协议端口为80 EXPOSE 80 # 指定UDP协议端口为80 EXPOSE 80/udp`

## 作用[¶](https://containerization-automation.readthedocs.io/zh-cn/latest/docker/dockerfile/EXPOSE/#_2 "Permanent link")

`EXPOSE`指令实际上并不发布端口，它用于提示要发布的端口。使用`docker run`启动容器时，有`2`种方式指定容器监听的端口号

1. 使用标识符`-P, --publish-all`来发布`EXPOSE`指定的端口，`docker`会随机映射主机端口到容器的侦听端口
2. 使用标识符`-p, --publish`指定容器和主机的映射端口
    
    `-p host-port:container-port/<protocol> # 比如映射主机端口号80到容器8080端口，侦听TCP协议 -p 80:8080/tcp`
    

## 示例[¶](https://containerization-automation.readthedocs.io/zh-cn/latest/docker/dockerfile/EXPOSE/#_3 "Permanent link")

可以同时设定`TCP`和`UDP`监听端口为同一个，因为容器会将其映射到不同的主机端口

EXPOSE 80/tcp 
EXPOSE 80/udp


使用`-p`标识符指定映射端口如下：

`$ docker run -it -p 10001:80/tcp -p 10002:80/udp ...`


# 注意

`EXPOSE` 指令本身不会自动进行端口映射。它仅声明容器中服务将监听的端口，以便开发者或自动化工具了解容器内部的服务端口。

要将宿主机的端口映射到容器内部的不同端口，例如将宿主机的端口 `80` 映射到容器内部的端口 `8080`，需要在运行容器时使用 `docker run` 命令中的 `-p` 参数来指定端口映射。

### 示例：将宿主机的端口 `80` 映射到容器的端口 `8080`

假设 Dockerfile 中定义了 `EXPOSE 8080`，容器内部的应用监听的是 `8080` 端口，你可以这样运行容器：

bash

复制代码

`docker run -p 80:8080 my_image`

这条命令的意思是：

- 宿主机的 `80` 端口会映射到容器的 `8080` 端口。
- 外部访问宿主机的 `80` 端口时，实际会请求容器内部的 `8080` 端口。