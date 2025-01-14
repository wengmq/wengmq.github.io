yum仓库位置：/etc/yum.repos.d/
yum配置文件位置：/etc/yum.conf
#### 1 查询

```
# yum search raid    //搜索某个软件名称或者描述的重要关键字
# yum info mdadm     //列出软件功能
# yum list			 //列出yum服务器上面所有的软件名称
# yum list pam*		 //找出以pam开头的软件名称
# yum list updates	 //列出yum服务器上可提供本机进行升级的软件
# yum clean package-xxx // 删除本地换缓存的软件包package-xxx （yum默认会先缓存到本机的 /var/cache/yum）
```

#### 2 安装/升级

```
# yum install/update 软件名称 
# yum install 软件名称 -y 		//安装过程中免输入y确认
```

#### 3 删除

```
# yum remove 软件名称
```

#### 4 软件组功能

```
# yum grouplist			 			//查看容器和本机上可用与安装过的软件组
# yum groupinfo group_name     		//查看group内所有组名称
# yum install/remove group_name		//安装与删除 
```


#### 5 yum源

查看yum源列表
```
yum repolist
```



#### 全系统升级

yum -y update 升级所有包，改变软件设置和系统设置,系统版本内核都升级  
yum -y upgrade 升级所有包，不改变软件设置和系统设置，系统版本升级，内核不改变  
已经上线的用yum -y upgrade 比较稳  
全新的用yum -y update 会更好

