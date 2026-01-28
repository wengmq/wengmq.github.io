
vi /etc/sysconfig/network-scripts/ifcfg-eth0

```
AUTOCONNECT_PRIORITY=120
BOOTPROTO="none"
DEVICE=eth0
HWADDR=fa:16:3e:ab:f7:67
IPADDR0="192.168.1.107"
PREFIX0="24"
GATEWAY0="192.168.1.1"

IPADDR1="192.168.1.154"
PREFIX1="24"

IPADDR2="192.168.1.55"
PREFIX2="24"

MTU=1500
ONBOOT=yes
TYPE=Ethernet
USERCTL=no
```

重启服务器：
systemctl restart NetworkManager


查看网络配置
ip a
ip r

```
[root@vm-sg-1 ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether fa:16:3e:ab:f7:67 brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    altname ens3
    inet 192.168.1.107/24 brd 192.168.1.255 scope global noprefixroute eth0
       valid_lft forever preferred_lft forever
    inet 192.168.1.154/24 brd 192.168.1.255 scope global secondary noprefixroute eth0
       valid_lft forever preferred_lft forever
    inet 192.168.1.55/24 brd 192.168.1.255 scope global secondary noprefixroute eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:feab:f767/64 scope link
       valid_lft forever preferred_lft forever
[root@vm-sg-1 ~]# ip r
default via 192.168.1.1 dev eth0 proto static metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.107 metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.154 metric 100
192.168.1.0/24 dev eth0 proto kernel scope link src 192.168.1.55 metric 100
```
