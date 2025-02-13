
**MTR** 是一个简单的、跨平台的命令行网络诊断工具，它将常用的 **traceroute** 和 **ping** 命令整合到一个工具中。与 **traceroute** 类似，**mtr** 打印从运行 mtr 的主机到用户指定的目标主机的路由信息​​。

但是，**mtr** 显示的信息比 **traceroute** 丰富，它确定到远程计算机的路径，同时打印响应百分比以及本地系统和远程计算机之间的互联网路由中所有网络跃点的响应时间。

运行 **mtr** 命令后，它会探测本地系统与远程主机之间的网络连接。它首先在不同主机之间建立每个网络设备的跃点（网桥、路由器和网关等）的地址，然后向每一个跃点发送一系列 **ICMP** 请求（**ping**），如果接收方可用，它将使用 ICMP 回复数据包进行响应。


### MTR 工具常用参数说明：

- -r 或 -report：以报告模式显示输出
- -c或 --report-cycles: 发送的ping包的数量 
- -s 或 -psize：指定ping数据包的大小
- -n 或 -no-dns：不对IP地址做域名反解析
- -m或--max-ttl: 指定在本地系统和远程主机之间探测的最大跳数（默认为**30**）
- -a 或 -address：设置发送数据包的IP地址。用于主机有多个IP时
- -4：只使用IPv4协议
- -6：只使用IPv6协议
- -z: 输入每一条IP对应的ASN

## 常用命令

```
# 以报告的形式，展示每条的IP和对应的ASN
$ mtr -rnz 1.1.1.1

```

### 输出项目说明：

```
[tx@root@14:35:36@ ~]$ mtr -rn -c 10 www.baidu.com
Start: 2024-05-06T14:37:18+0800
HOST: VM-4-14-ubuntu              Loss%   Snt   Last   Avg  Best  Wrst StDev
  1.|-- 11.73.8.193               80.0%    10    1.3   1.3   1.3   1.3   0.0
  2.|-- 11.73.55.70               80.0%    10    1.3   1.2   1.2   1.3   0.1
  3.|-- 10.162.66.221             70.0%    10    1.4   1.4   1.3   1.4   0.1
  4.|-- 10.200.66.101              0.0%    10    2.8   2.8   2.8   3.0   0.1
  5.|-- 220.196.197.170            0.0%    10    2.7   2.7   2.6   3.2   0.2
  6.|-- 220.196.197.169            0.0%    10    3.2   3.2   3.2   3.3   0.0
  7.|-- 211.95.32.169              0.0%    10    4.5   3.7   3.1   4.6   0.5
  8.|-- 219.158.104.214            0.0%    10   10.8  10.0   9.1  11.0   0.6
  9.|-- 153.3.228.114             30.0%    10    8.4   8.4   8.3   8.4   0.0
 10.|-- 153.37.96.254              0.0%    10    8.5   8.5   8.4   8.6   0.0
 11.|-- ???                       100.0    10    0.0   0.0   0.0   0.0   0.0
 12.|-- ???                       100.0    10    0.0   0.0   0.0   0.0   0.0
 13.|-- ???                       100.0    10    0.0   0.0   0.0   0.0   0.0
 14.|-- 153.3.238.102              0.0%    10    8.9   8.9   8.9   9.0   0.0
```
- Host: 显示经过每一跳的地址
- LOSS%:到此此节点数据包丢包率,显示每个节点的丢包率
- Snt: 发送包的数量
- Last: 显示的最近一次的返回延时
- Avg: 发送ping包的平均延迟
- Best: 最低延迟时间
- Wrst: 最大延迟时间
- StDev:标准偏差
