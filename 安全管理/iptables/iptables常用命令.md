- 查看详细的入请求的防火墙规则(默认表为filter)
```
sudo iptables -nL INPUT -v 
```

-  查看INPUT链的规则的序号(默认表为filter)
```
sudo iptables -nL INPUT --line-numbers
```

- 删除nat表的链的序号为10的规则
```
iptables -t nat -D POSTROUTING 10
```

- 允许来自 `183.131.145.0/24` 子网发送到目标端口为 22 的 TCP 数据包通过防火墙，即允许 SSH 连接
```
iptables -A INPUT -s 183.131.145.0/24    -p tcp -m tcp --dport 22 -j ACCEPT
```

- iptables命令配置的防火墙规则默认会在系统下一次重启时失效，如果想让配置的防火墙策略永久生效，还要执行保存命令：
	- service iptables save

- iptables默认配置文件位置：
	- /etc/sysconfig/iptables

- 将一个 `/etc/sysconfig/iptables` 文件中的配置应用到系统中，你可以使用 `iptables-restore` 命令。该命令用于从文件中加载 iptables 规则：
	- sudo iptables-restore < /etc/sysconfig/iptables