
```bash
## bond网卡文件
[root@node01 network-scripts]# cat ifcfg-bond0
DEVICE=bond0
NAME=bond0
TYPE=Bond
BONDING_MASTER=yes
IPADDR=151.242.222.74
NETMASK=255.255.255.192
GATEWAY=151.242.222.65
DNS1=8.8.8.8
ONBOOT=yes
BOOTPROTO=none
BONDING_OPTS="mode=2 miimon=100"

# 子网卡文件
[root@node01 network-scripts]# cat ifcfg-ens31f0
TYPE=Ethernet
BOOTPROTO=static
NAME=ens31f0
DEVICE=ens31f0
ONBOOT=yes
MASTER=bond0
SLAVE=yes
```