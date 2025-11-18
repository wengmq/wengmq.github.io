
## 简介

- 参考官方的安装过程：
	- https://www.zabbix.com/cn/download?zabbix=7.4&os_distribution=ubuntu&os_version=22.04&components=server_frontend_agent&db=mysql&ws=nginx

- 其他参考：
	- https://flashcat.cloud/blog/zabbix-install/
## 过程

- 我这边以本地的wsl的ubuntu22为例，安装：
![](assets/Pasted%20image%2020250813162415.png)
- 这边需要你自己本地安装一个mysql， 按照成功后默认是免密登录
```
sudo apt install mysql-server -y
sudo systemctl start mysql
sudo systemctl enable mysql
```
![](assets/Pasted%20image%2020250813162633.png)

- 其他的按照文档按照即可，安装后访问可以通过web访问UI， 安装UI提示进入页面安装即可以，如果出现类似 Locale for language "en_US" is not found on the web server. 提示可以执行下面命令来更新本地的语言包
```
dpkg-reconfigure locales
```
- 更新后再重启服务即可
```
systemctl restart zabbix-server zabbix-agent nginx php8.1-fpm
```


- 正常后就可以访问zabbix的web ui了，默认的账号密码是Admin/zabbix

![](assets/Pasted%20image%2020250813163718.png)