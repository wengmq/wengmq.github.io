
- 修改配置文件 root@ubuntu:~# cat /etc/netplan/00-installer-config.yaml
```

network:
  ethernets:
    enp26s0f0:
      dhcp4: no
    enp26s0fs:
      dhcp4: yes
  vlans:
     enp26s0f0.101:
       id: 101
       link: enp26s0f0
       addresses:
         - 183.2.194.232/28
       gateway4: 183.2.194.225
       nameservers:
         addresses:
           - 8.8.8.8
     enp26s0f0.257:
       id: 257
       link: enp26s0f0
       addresses:
         - 156.238.128.232/27
       gateway4: 156.238.128.225
       nameservers:
         addresses:
           - 8.8.8.8
  version: 2
```

- 重新加载配置： netplan apply
- 最终配置:
```
root@ubuntu:~# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: enp26s0f0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether ec:0d:9a:49:4e:d4 brd ff:ff:ff:ff:ff:ff
    inet6 fe80::ee0d:9aff:fe49:4ed4/64 scope link
       valid_lft forever preferred_lft forever
3: enp26s0f1: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc mq state DOWN group default qlen 1000
    link/ether ec:0d:9a:49:4e:d5 brd ff:ff:ff:ff:ff:ff
4: enp26s0f0.101@enp26s0f0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:0d:9a:49:4e:d4 brd ff:ff:ff:ff:ff:ff
    inet 183.2.194.232/28 brd 183.2.194.239 scope global enp26s0f0.101
       valid_lft forever preferred_lft forever
    inet6 fe80::ee0d:9aff:fe49:4ed4/64 scope link
       valid_lft forever preferred_lft forever
5: enp26s0f0.257@enp26s0f0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default qlen 1000
    link/ether ec:0d:9a:49:4e:d4 brd ff:ff:ff:ff:ff:ff
    inet 156.238.128.232/27 brd 156.238.128.255 scope global enp26s0f0.257
       valid_lft forever preferred_lft forever
    inet6 fe80::ee0d:9aff:fe49:4ed4/64 scope link
       valid_lft forever preferred_lft forever
root@ubuntu:~# ip r
default via 183.2.194.225 dev enp26s0f0.101 proto static
default via 156.238.128.225 dev enp26s0f0.257 proto static
156.238.128.224/27 dev enp26s0f0.257 proto kernel scope link src 156.238.128.232
183.2.194.224/28 dev enp26s0f0.101 proto kernel scope link src 183.2.194.232
```


- 当前的配置的默认网关只有一个，需要156.238.128.232正常通信的话，需要配置策略路由


