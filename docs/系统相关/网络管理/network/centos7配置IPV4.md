
vi /etc/sysconfig/network-scripts/ifcfg-eth0

```
TYPE=Ethernet
BOOTPROTO=static
NAME=eht0
DEVICE=eth0
ONBOOT=yes
IPADDR=212.43.10.212
NETMASK=255.255.255.224
GATEWAY=212.43.10.193
DNS1=8.8.8.8

```

修改配置后重启：
```
/etc/init.d/network restart
```