
## 宿主机的网络


- 下面是在一台ECS内起了一个docker服务

```bash
docker ps
CONTAINER ID   IMAGE                   COMMAND                  CREATED        STATUS             PORTS     NAMES
272ba0e789b2   docker-python-monitor   "sh -c 'chmod 0644 /…"   24 hours ago   Up About an hour             ens_monitor_cron
```

- ECS的网络情况
```bash
[root@test ~]# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host 
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether fa:16:3e:c3:f1:ad brd ff:ff:ff:ff:ff:ff
    altname enp0s3
    altname ens3
    inet 10.104.68.181/25 brd 10.104.68.255 scope global dynamic noprefixroute eth0
       valid_lft 53781sec preferred_lft 53781sec
    inet6 fd00:4:68:128:1000::6d/128 scope global dynamic noprefixroute 
       valid_lft 63627sec preferred_lft 63627sec
    inet6 fe80::f816:3eff:fec3:f1ad/64 scope link noprefixroute 
       valid_lft forever preferred_lft forever
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default 
    link/ether 36:08:48:51:f5:2b brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::3408:48ff:fe51:f52b/64 scope link 
       valid_lft forever preferred_lft forever
10: br-d9231d44a1ab: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP group default 
    link/ether 92:be:0c:03:3c:83 brd ff:ff:ff:ff:ff:ff
    inet 172.18.0.1/16 brd 172.18.255.255 scope global br-d9231d44a1ab
       valid_lft forever preferred_lft forever
    inet6 fe80::90be:cff:fe03:3c83/64 scope link 
       valid_lft forever preferred_lft forever
21: veth9780200@if2: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue master br-d9231d44a1ab state UP group default 
    link/ether ea:9f:57:00:bf:1d brd ff:ff:ff:ff:ff:ff link-netnsid 0
    inet6 fe80::e89f:57ff:fe00:bf1d/64 scope link 
       valid_lft forever preferred_lft forever
       
[root@test ~]# ip r
default via 10.104.68.129 dev eth0 proto dhcp src 10.104.68.181 metric 100 
10.104.68.128/25 dev eth0 proto kernel scope link src 10.104.68.181 metric 100 
169.254.169.254 via 10.104.68.150 dev eth0 proto dhcp src 10.104.68.181 metric 100 
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown 
172.18.0.0/16 dev br-d9231d44a1ab proto kernel scope link src 172.18.0.1 
```


## 分析一下docker容器的网络配置：

- 可以看到容器默认使用的是桥接模式，ens_monitor_cron这个容器的内网IP是172.18.0.2，起请求会都转发到默认网关172.18.0.1
- 这个容器使用的网桥名称是docker_default

```bash
[root@test ~]# docker inspect ens_monitor_cron
[
......
        "NetworkSettings": {
            "SandboxID": "9e94059c2d3a6e47426479772375ff33a81648e7e201df3e9079f7783db68907",
            "SandboxKey": "/var/run/docker/netns/9e94059c2d3a",
            "Ports": {},
            "Networks": {
                "docker_default": {
                    "IPAMConfig": null,
                    "Links": null,
                    "Aliases": [
                        "ens_monitor_cron",
                        "python-monitor"
                    ],
                    "DriverOpts": null,
                    "GwPriority": 0,
                    "NetworkID": "d9231d44a1ab7bc81da84032ada7a6588d30f8554cc363188d4c2c7a10cad502",
                    "EndpointID": "9c24993596f43f74de2d44a1b1c97109c65f4f4ed1a26188c6f6bb6d59db911f",
                    "Gateway": "172.18.0.1",
                    "IPAddress": "172.18.0.2",
                    "MacAddress": "96:00:76:49:ce:66",
                    "IPPrefixLen": 16,
                    "IPv6Gateway": "",
                    "GlobalIPv6Address": "",
                    "GlobalIPv6PrefixLen": 0,
                    "DNSNames": [
                        "ens_monitor_cron",
                        "python-monitor",
                        "272ba0e789b2"
                    ]
                }
            }
        },
......
]
```

- 查看docker组件使用的网络情况

```bash
[root@test ~]# docker network ls
NETWORK ID     NAME             DRIVER    SCOPE
155ece36f232   bridge           bridge    local
d9231d44a1ab   docker_default   bridge    local
1b235a4127d5   host             host      local
87ee577966f0   none             null      local
[root@test ~]# docker network inspect d9231d44a1ab
[
    {
        "Name": "docker_default",
        "Id": "d9231d44a1ab7bc81da84032ada7a6588d30f8554cc363188d4c2c7a10cad502",
        "Created": "2026-01-26T16:23:32.966499342+08:00",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv4": true,
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.18.0.0/16",
                    "IPRange": "",
                    "Gateway": "172.18.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Options": {},
        "Labels": {
            "com.docker.compose.config-hash": "e7869dccd0af1856c658cbabad8f131128ffb37f03d845c4244677d8b7adea0c",
            "com.docker.compose.network": "default",
            "com.docker.compose.project": "docker",
            "com.docker.compose.version": "5.0.2"
        },
        "Containers": {
            "272ba0e789b283f9ffa1338f0c3f35e4376dcbeb70b92d277591ef8d13a60dbc": {
                "Name": "ens_monitor_cron",
                "EndpointID": "9c24993596f43f74de2d44a1b1c97109c65f4f4ed1a26188c6f6bb6d59db911f",
                "MacAddress": "96:00:76:49:ce:66",
                "IPv4Address": "172.18.0.2/16",
                "IPv6Address": ""
            }
        },
        "Status": {
            "IPAM": {
                "Subnets": {
                    "172.18.0.0/16": {
                        "IPsInUse": 4,
                        "DynamicIPsAvailable": 65532
                    }
                }
            }
        }
    }
]
```


## 容器网络通信的流程

- 结合宿主机的网络配置以及docker容器的网络配置，ens_monitor_cron这个容器的网络通信的架构如下：
	- 这里的**veth9780200**可以把它看作一根**虚拟的双头网线**，**veth9780200** 是宿主机这头的“插座”。**br-d9231d44a1ab** 是插座背后的“总线交换机”。**eth0 (容器内)** 是网线的另一头，插在容器的“主机”上。它不负责处理宿主机自身的请求，它唯一的作用就是**当搬运工**。它把容器发出来的包，“漏”给宿主机的网桥接口；把网桥转发回来的包，“漏”回给容器。
```python
[ 容器 (IP: 172.18.0.2) ]
      |
      | (内网卡 eth0, 索引 id: 2)
      |
      | <---- 虚拟网线 (veth pair) ---->
      |
      | (宿主机端 veth9780200)
      |
[ 虚拟交换机 br-d9231d44a1ab (IP: 172.18.0.1) ]
      |
      | (宿主机内核路由转发 + NAT)
      |
[ 物理网卡 eth0 (宿主机外网 IP) ] ----> 互联网
```

- **虚拟交换机 (`br-d9231d44a1ab`)** 与 **物理网卡 (`eth0`)** 之间的关系
	- 简单来说：**它们之间没有物理线缆连接，而是通过宿主机的“内核路由表”和“iptables 规则”在逻辑上进行接力的。**

		- **从内向外**：当容器请求 `baidu.com`，包到达 `br-d9231d44a1ab。内核看了一眼路由表：“目标不是 172.18.0.0，也不是本地，那就走 `default` 路由吧。” 于是，包被转交给了 **`eth0`**。
    
		- **从外向内**：外面回包给宿主机 IP，内核收到后看了一眼：“喔，这是找容器的（根据 NAT 记录），目标属于 172.18.0.0 范围。” 于是，包被转发进了 **`br-d9231d44a1ab`**的网关地址。


## 容器的iptables配置

- 主要是包含的filter表和nat表

- filter表：Filter 表是默认的表，主要负责“**放行**”或“**拦截**”数据包。
	- 核心链分析

		- **FORWARD 链 (Policy: DROP)**： 这是 Docker 网络的安全核心。默认策略是 `DROP`，意味着除非规则明确允许，否则容器间或容器与外部的通信流量都会被拦截。
		    
		    - **DOCKER-USER**：这是预留给用户自定义规则的。它位于 Docker 规则之前，方便你在不破坏 Docker 默认逻辑的情况下添加防火墙策略。
		        
		    - **DOCKER-FORWARD**：Docker 内部逻辑的入口。
		        
		- **DOCKER-CT (Conntrack)**：
		    
		    - `ctstate RELATED,ESTABLISHED`：这两条规则非常关键。它允许**已经建立连接**或**与已有连接相关**的数据包通过。比如容器请求访问百度，百度回传的数据包就靠这两条规则放行。
		        
		- **DOCKER-BRIDGE**：
		    
		    - 主要用于处理跨网桥的流量。在这里它引用了 `DOCKER` 链，而你的 `DOCKER` 链中目前是 `DROP`。这通常意味着如果没有具体的端口映射规则，外部流量无法主动进入容器。
		        
		- **DOCKER-INTERNAL**：
		    
		    - 通常用于 `--internal` 模式的 Docker 网络，限制容器只能在内部通信，不能上外网。
	- 总结 Filter 表的作用：

		1. **连接追踪**：利用 `DOCKER-CT` 保证容器“能发能收”。
		    
		2. **默认隔离**：通过 `FORWARD DROP` 确保未经授权的流量无法穿透宿主机到达容器。
		    
		3. **精确控制**：提供 `DOCKER-USER` 钩子，让管理员可以手动限制特定 IP 对容器服务的访问。

```python
[root@test ~]# iptables -nL -t filter
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy DROP)
target     prot opt source               destination         
DOCKER-USER  all  --  0.0.0.0/0            0.0.0.0/0           
DOCKER-FORWARD  all  --  0.0.0.0/0            0.0.0.0/0           

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         

Chain DOCKER (2 references)
target     prot opt source               destination         
DROP       all  --  0.0.0.0/0            0.0.0.0/0           
DROP       all  --  0.0.0.0/0            0.0.0.0/0           

Chain DOCKER-BRIDGE (1 references)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0            0.0.0.0/0           
DOCKER     all  --  0.0.0.0/0            0.0.0.0/0           

Chain DOCKER-CT (1 references)
target     prot opt source               destination         
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0            ctstate RELATED,ESTABLISHED

Chain DOCKER-FORWARD (1 references)
target     prot opt source               destination         
DOCKER-CT  all  --  0.0.0.0/0            0.0.0.0/0           
DOCKER-INTERNAL  all  --  0.0.0.0/0            0.0.0.0/0           
DOCKER-BRIDGE  all  --  0.0.0.0/0            0.0.0.0/0           
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           
ACCEPT     all  --  0.0.0.0/0            0.0.0.0/0           

Chain DOCKER-INTERNAL (1 references)
target     prot opt source               destination         

Chain DOCKER-USER (1 references)
target     prot opt source               destination  
```

- nat表分析：Nat 表主要负责修改数据包的源地址（SNAT）或目的地址（DNAT），是容器“**上外网**”和“**暴露端口**”的关键。
	- 核心链分析
		- **PREROUTING & OUTPUT 链**：
		    
		    - `ADDRTYPE match dst-type LOCAL`：如果数据包的目标地址是宿主机本地 IP，则跳转到 `DOCKER` 链。
		        
		    - 这决定了当你访问宿主机的 `8080` 端口时，系统能否意识到这其实是一个要发往容器的请求。
		        
		- **POSTROUTING 链 (MASQUERADE)**：
		    
		    - `MASQUERADE all -- 172.18.0.0/16 0.0.0.0/0`
		        
		    - `MASQUERADE all -- 172.17.0.0/16 0.0.0.0/0`
		        
		    - **作用**：这是所谓的 **SNAT（源地址转换）**。当容器（如 IP 为 `172.17.0.2`）想要访问互联网时，外网路由器并不认识私有 IP。宿主机会通过这两条规则，把容器发出的包的源 IP 伪装成宿主机的公网/物理 IP。
		        
		- **DOCKER 链 (Nat)**：
		    
		    - 虽然你提供的截图末尾切断了，但通常这里会存放具体的端口映射规则（DNAT）。例如，你运行 `docker run -p 80:80`，这里就会出现一条将目标端口 `80` 修改为容器内部 IP 端口的规则。
        

	- 总结 Nat 表的作用：

		1. **出站 (Outbound)**：通过 `MASQUERADE` 让容器可以共享宿主机的网卡访问外部网络。
		    
		2. **入站 (Inbound)**：通过 DNAT 规则实现“端口映射”，让外部用户访问宿主机端口时，流量能准确导向容器内部。

```python
[root@test ~]# iptables -nL -t nat
Chain PREROUTING (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0            0.0.0.0/0            ADDRTYPE match dst-type LOCAL

Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination         
DOCKER     all  --  0.0.0.0/0           !127.0.0.0/8          ADDRTYPE match dst-type LOCAL

Chain POSTROUTING (policy ACCEPT)
target     prot opt source               destination         
MASQUERADE  all  --  172.18.0.0/16        0.0.0.0/0           
MASQUERADE  all  --  172.17.0.0/16        0.0.0.0/0           

Chain DOCKER (2 references)
target     prot opt source               destination         
```