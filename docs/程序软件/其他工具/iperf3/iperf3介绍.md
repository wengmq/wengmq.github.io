
## iperf3介绍

iperf3是基于Client/Server的网络性能测试工具，通常用于测试网络上可达到的最大带宽，它能够测试TCP、UDP及SCTP的带宽质量，可以提供网络吞吐量、网络波动、网络丢包率以及最大传输单元大小等信息，能够帮助我们测试网络性能，定位网络瓶颈。可在Linux、MacOS、FreeBSD、Window、Android、iOS、Docker等平台使用，是一个简单使用的小工具

### iperf3常用参数

1. 通用参数：
    
    ```shell
    -v	# 查看版本信息
    -p	# 端口
    -f	# 指定带宽输出格式： Kbits、Mbits、Gbits、Tbits
    -i	# 监控报告时间间隔，单位秒(s)
    -J	# Json格式输出结果
    --logfile	# 将结果输出到指定文件中
    ```
    
2. 服务端参数：
    
    ```shell
    -s	# 以服务器模式运行
    -D	# 后台运行服务器模式
    ```
    
3. 客户端参数：
    
    ```shell
    -c	# 以客户端模式运行，连接到服务端
    -t	# 传输时间，默认10秒
    -n	# 传输内容大小，不能与-t同时使用
    -b	# 目标比特率(0表示无限)(UDP默认1Mbit/sec，TCP不受限制)
    -l	# 要读取或写入的缓冲区长度(TCP默认128 KB，UDP默认1460)
    -O	# 忽略前几秒
    -R	# 反向模式运行，即服务端发送，客户端接收
    -u	# 使用UDP协议，默认使用TCP协议
    --get-server-output #输出服务端的结果
    ```
    
    更多参数请通过帮助命令`iperf3 --help`查看
    

iperf3官方下载地址：点击进入[官网下载](https://iperf.fr/iperf-download.php)

iperf3源码GitHub地址：点击进入[GitHub](https://github.com/esnet/iperf)



## iPerf3 的安装

在大多数 Linux 发行版中，iPerf3 可以通过包管理器直接安装。例如，
- 在 Ubuntu 或 Debian 系统中，可以使用以下命令：


```shell
sudo apt update
sudo apt install iperf3
```

- 在 CentOS 或 RHEL 系统中，可以使用以下命令：

```shell
sudo yum install epel-release
sudo yum install iperf3
```



## 参考
- https://www.cnblogs.com/dyd168/p/14778138.html

