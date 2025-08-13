
**1. 打开daemon.json文件***(没有就创建一个)
```
vim /etc/docker/daemon.json
```


**2. 将其镜像地址进行替换**

```
{
"registry-mirrors": [
    "https://docker.m.daocloud.io",
    "https://dockerproxy.com",
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://hub.uuuadc.top",
    "https://docker.anyhub.us.kg",
    "https://dockerhub.jobcher.com",
    "https://dockerhub.icu",
    "https://docker.ckyl.me",
    "https://docker.awsl9527.cn",
    "https://mirror.baidubce.com"
  ]
}

```


**3.重启docker服务**

```
systemctl daemon-reload && systemctl restart docker
```


  

参考： https://juejin.cn/post/7439009350049988635  
