
/etc/sysconfig/network-scripts配置文件信息：

```
[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# cat ifcfg-bond0
DEVICE=bond0
NAME=bond0
TYPE=Bond
BONDING_MASTER=yes
ONBOOT=yes
BOOTPROTO=static
BONDING_OPTS="mode=2 xmit_hash_policy=layer3+4 miimon=100 downdelay=200 updelay=200"


[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# cat ifcfg-enp26s0f0
DEVICE=enp26s0f0
NAME=bond0-slave
TYPE=Ethernet
BOOTPROTO=none
ONBOOT=yes
MASTER=bond0
SLAVE=yes


[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# cat ifcfg-enp26s0f1
DEVICE=enp26s0f1
NAME=bond0-slave
TYPE=Ethernet
BOOTPROTO=none
ONBOOT=yes
MASTER=bond0
SLAVE=yes


[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# cat ifcfg-bond0.101
NAME=bond0.101
DEVICE=bond0.101
ONBOOT=yes
NETBOOT=yes
BOOTPROTO=static
TYPE=Vlan
VLAN=yes
BONDING_OPTS="mode=2 xmit_hash_policy=layer3+4 miimon=100 downdelay=200 updelay=200"
IPADDR=183.2.194.227
NETMASK=255.255.255.240
#GATEWAY=183.2.194.225
GATEWAY=183.2.194.225


[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# cat ifcfg-bond0.257
NAME=bond0.257
DEVICE=bond0.257
ONBOOT=yes
NETBOOT=yes
BOOTPROTO=static
TYPE=Vlan
VLAN=yes
BONDING_OPTS="mode=2 xmit_hash_policy=layer3+4 miimon=100 downdelay=200 updelay=200"
IPADDR=156.238.128.227
NETMASK=255.255.255.224
#GATEWAY=156.238.128.225
```


ip a 信息：
```
[root@dx-obgp-guangdong-dongguan-22-183-2-194-227 network-scripts]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp26s0f0: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc mq master bond0 state UP group default qlen 1000
    link/ether ec:0d:9a:49:64:04 brd ff:ff:ff:ff:ff:ff
3: enp26s0f1: <BROADCAST,MULTICAST,SLAVE,UP,LOWER_UP> mtu 1500 qdisc mq master bond0 state UP group default qlen 1000
    link/ether ec:0d:9a:49:64:04 brd ff:ff:ff:ff:ff:ff
4: bond0: <BROADCAST,MULTICAST,MASTER,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:0d:9a:49:64:04 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::ee0d:9aff:fe49:6404/64 scope link
       valid_lft forever preferred_lft forever
5: bond0.101@bond0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:0d:9a:49:64:04 brd ff:ff:ff:ff:ff:ff
    inet 183.2.194.227/28 brd 183.2.194.239 scope global bond0.101
       valid_lft forever preferred_lft forever
    inet6 fe80::ee0d:9aff:fe49:6404/64 scope link
       valid_lft forever preferred_lft forever
6: bond0.257@bond0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:0d:9a:49:64:04 brd ff:ff:ff:ff:ff:ff
    inet 156.238.128.227/27 brd 156.238.128.255 scope global bond0.257
       valid_lft forever preferred_lft forever
    inet6 fe80::ee0d:9aff:fe49:6404/64 scope link
       valid_lft forever preferred_lft forever
```


