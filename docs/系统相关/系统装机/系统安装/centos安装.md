
- 下载centos系统镜像 
	- centos官方网站推荐去第三方网站下载镜像可以去阿里云下载 https://mirrors.aliyun.com/centos
	- 
	- 通常默认安装最小版本（Minmal），没有额外的安装软件，镜像不到1G比较小，DVD版本的比较大，没有多大必要
		- https://mirrors.aliyun.com/centos/7.9.2009/isos/x86_64/CentOS-7-x86_64-Minimal-2009.iso
	- ![](assets/Pasted%20image%2020240712152800.png)
- dd镜像到某个磁盘后开机选择这块盘启动，过程参考ubuntu安装
- 设置语言为英文
-  设置安装分区
	- 选择自动配置分区、如果原本的磁盘有系统，可能会要求你格式化磁盘
![](assets/Pasted%20image%2020240712150546.png)

![](assets/Pasted%20image%2020240712150613.png)


- 配置网络
![](assets/Pasted%20image%2020240712150723.png)
除了unplugged 的网卡，其他随便选择一个网卡进行配置IPV4信息 

![](assets/Pasted%20image%2020240712150738.png)

配置静态IP
![](assets/Pasted%20image%2020240712150905.png)

这边记得要on打开
![](assets/Pasted%20image%2020240712150938.png)

网络和引导盘设置好之后就可以点击安装了

设置root用户的账号密码 
![](assets/Pasted%20image%2020240712151051.png)