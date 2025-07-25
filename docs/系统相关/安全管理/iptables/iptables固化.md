
## centos下iptables固化

iptables命令配置的防火墙规则默认会在系统下一次重启时失效，如果想让配置的防火墙策略永久生效，还要执行保存命令： 
```
service iptables save
```

- 如果看到类似错误提示（如 `service: command not found`），说明你的系统没有安装 `iptables-services`，你可以先安装它：
```
yum install iptables-services -y
```

- 确保 `iptables` 服务启用并运行：
```
systemctl enable iptables

systemctl start iptables
```


- centos下的iptables默认配置文件位置：/etc/sysconfig/iptables


## ubuntu下iptables固化

- Ubuntu 使用 `netfilter-persistent` 工具来在系统启动时自动加载 `iptables` 规则。需要先安装

```
sudo apt install iptables-persistent -y
```

![](assets/Pasted%20image%2020250122185719.png)
- 它会提示你会将iptables规则文件保存在/etc/iptables/rules.v4

- 你可以再将你的当前的iptables规则保存到这个配置文件
```
sudo iptables-save > /etc/iptables/rules.v4
```
- 如果使用的是 `IPv6` 规则，可以使用以下命令保存：
```
sudo ip6tables-save > /etc/iptables/rules.v6
```
- 你可以查看 netfilter-persistent 这个服务的情况，默认是开机自启的
```
systemctl status netfilter-persistent
```