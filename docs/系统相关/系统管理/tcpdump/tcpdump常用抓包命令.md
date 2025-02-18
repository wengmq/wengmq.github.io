参考：
	- https://mozillazg.com/2018/01/tcpdump-common-useful-examples-cookbook.html


 抓 HTTP GET 数据

```bash
tcpdump -i any 'tcp[(tcp[12]>>2):4] = 0x47455420'
# "GET "的十六进制是 47455420
```

- 抓 SSH 返回

```bash
tcpdump -i any 'tcp[(tcp[12]>>2):4] = 0x5353482D'
# "SSH-"的十六进制是 0x5353482D
```

- 抓 DNS 请求数据

```bash
tcpdump -i any udp dst port 53
```

- 大于600字节

```bash
tcpdump -i any 'ip[2:2] > 600'
```

  - 过滤 ip/域名
```bash
# 过滤目标域名是 baidu.com:
dst host baidu.com

# 源 ip 或者目标 ip 是 192.168.1.3:
host 192.168.1.3

# 源 ip 是 192.168.1.3:
src host 192.168.1.3

# 目标 ip 是 192.168.1.3:
dst host 192.168.1.3

# 过滤范围内的 ip /网段 ip:
net 192.168.0.0/24
net 192.168.0.0 mask 255.255.255.0

```



- 过滤端口
```bash
# 过滤 80 端口:
port 80

# DNS 53 端口:
port 53

# 排除端口:
not port 80
host www.example.com and not \(port 80 or port 25\)
host www.example.com and not port 80 and not port 25

# 端口范围:
\(tcp[0:2] > 1500 and tcp[0:2] < 1550) or (tcp[2:2] > 1500 and tcp[2:2] < 1550\)
tcp portrange 1501-1549

```


- 过滤协议
```bash
ipv4: ip

ipv6: ip6

tcp: tcp

udp: udp

arp: arp

icmp: icmp
```



- 过滤协议头 (注意要用引号引起来)

```bash
# 过滤 tcp SYN 消息包:
'tcp[tcpflags] & (tcp-syn) != 0'

#过滤 tcp SYN/ACK 消息包:
'tcp[tcpflags] & (tcp-syn|tcp-ack) != 0'

# 常用的 tcp 标记:
tcp-fin, tcp-syn, tcp-rst, tcp-push, tcp-ack, tcp-urg, tcp-ece, tcp-cwr

#源端口大于1024的TCP数据包:
'tcp[0:2] > 1024'


```


