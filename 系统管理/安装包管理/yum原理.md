
YUM(Yellowdog Updater Modified)：是一个基于RPM的软件包管理器，能够从指定服务器自动**RPM包并且安装，可以处理软件之间的依赖关系，一次性安装所有依赖的软件包，无需一个个**安装。

### 原理

包括YUM服务器和客户端两个部分：  
- yum服务器
    
    所有要发行的rpm包都放在yum服务器上以提供别人来下载，rpm包根据kernel的版本号，cpu的版本号分别编译发布。yum服务器只要提供简单的下载就可以了，ftp或者httpd的形式都可以。yum服务器有一个最重要的环节就是整理出每个rpm包的基本信息，包括rpm包对应的版本号，conf文件，binary信息，以及很关键的依赖信息。在yum服务器上提供了createrepo工具，用于把rpm包的基本概要信息做成一张"清单"，这张"清单""就是描述每个rpm包的spec文件中信息。
    
- yum client端
    
    client每次调用yum install或者search的时候，都会去解析/etc/yum.repos.d下面所有以.repo结尾的配置文件（即yum源），这些配置文件指定了yum服务器的地址。yum会定期去"更新"yum服务器上的rpm包"清单"，然后把"清单"下载保存到yum自己的cache里面，根据/etc/yum.conf里配置(默认是在/var/cache/yum下面)，每次调用yum装包的时候都会去这个cache目录下去找"清单"，根据"清单"里的rpm包描述从而来确定安装包的名字，版本号，所需要的依赖包等，然后再去yum服务器下载rpm包安装。(前提是不存在rpm包的cache)






### yum的设置文件

配置文件所在目录：`/etc/yum.repos.d/`

```
# vim /etc/yum.repos.d/CentOS-Base.repo
```



> $releaserver：发行版本号
> $basearch：系统基础架构，如x86_64

[base]：代表容器名称，名称可以随意取  
name：描述容器含义  
mirrorlist：列出这个容器可以使用的镜像站点，如果不想使用，可以注释  
baseurl：后面接容器地址，mirrorlist是由yum程序自行找镜像站点，baseurl则是指定一个固定容器地址  
gpgcheck：是否需要查阅RPM文件内数字证书  
gpgkey：数字证书公钥文件所在位置，使用默认值

> 查看yum server所使用的容器：`yum repolist all`  
> 删除所有已下载的所有容器相关数据：`yum clean all`


参数说明
`enabled=1` 表示 `base` 仓库是启用的，而如果你改为 `enabled=0`，`yum` 就不会从这个仓库下载任何包了。