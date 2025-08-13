### 背景
在机器可以登录的情况，修改自身IPMI的IP地址


### 操作

以通过 `ipmitool` 来修改 Ubuntu 系统上 IPMI 的网络配置信息，具体步骤如下：

1. **查看当前的 IPMI 网络配置信息：** 你可以使用以下命令来查看当前的网络配置：
```
ipmitool lan print 1
```

2. **修改 IP 地址、子网掩码和网关：** 使用以下命令来设置新的 IP 地址、子网掩码和网关信息：
```
    ipmitool lan set 1 ipaddr <新的IP地址> 
    ipmitool lan set 1 netmask <新的子网掩码> 
    ipmitool lan set 1 defgw ipaddr <新的网关地址>
```
    
3. **设置 IPMI 的 IP 分配模式：** 你可以选择使用静态 IP 或 DHCP 分配 IP 地址。使用以下命令来设置：
    
    -设置为静态 IP：
```
	 ipmitool lan set 1 ipsrc static
```
	-设置为 DHCP：
```
	ipmitool lan set 1 ipsrc dhcp
```
4. **重启 BMC 服务（可选）：** 在某些情况下，修改 IPMI 配置后需要重启 BMC 服务以使更改生效：
```
    pmitool mc reset warm
```

修改完成后，你可以再次使用 `ipmitool lan print 1` 命令确认配置已经更新。



命令实例：
```
ipmitool lan print 1
ipmitool lan set 1 ipaddr 38.175.38.121
ipmitool lan set 1 netmask 255.255.255.0
ipmitool lan set 1 defgw ipaddr 38.175.38.1
ipmitool lan set 1 ipsrc static
ipmitool mc reset cold
ipmitool lan print 1
```