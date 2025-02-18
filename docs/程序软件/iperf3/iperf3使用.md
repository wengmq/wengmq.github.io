## iperf3说明文档
```
Usage: iperf3 [-s|-c host] [options]
       iperf3 [-h|--help] [-v|--version]

Server or Client:
  -p, --port      #         server port to listen on/connect to
  -f, --format   [kmgtKMGT] format to report: Kbits, Mbits, Gbits, Tbits
  -i, --interval  #         seconds between periodic throughput reports
  -F, --file name           xmit/recv the specified file
  -A, --affinity n/n,m      set CPU affinity
  -B, --bind      <host>    bind to the interface associated with the address <host>
  -V, --verbose             more detailed output
  -J, --json                output in JSON format
  --logfile f               send output to a log file
  --forceflush              force flushing output at every interval
  -d, --debug               emit debugging output
  -v, --version             show version information and quit
  -h, --help                show this message and quit
Server specific:
  -s, --server              run in server mode
  -D, --daemon              run the server as a daemon
  -I, --pidfile file        write PID file
  -1, --one-off             handle one client connection then exit
  --rsa-private-key-path    path to the RSA private key used to decrypt
                            authentication credentials
  --authorized-users-path   path to the configuration file containing user
                            credentials
Client specific:
  -c, --client    <host>    run in client mode, connecting to <host>
  --sctp                    use SCTP rather than TCP
  -X, --xbind <name>        bind SCTP association to links
  --nstreams      #         number of SCTP streams
  -u, --udp                 use UDP rather than TCP
  --connect-timeout #       timeout for control connection setup (ms)
  -b, --bitrate #[KMG][/#]  target bitrate in bits/sec (0 for unlimited)
                            (default 1 Mbit/sec for UDP, unlimited for TCP)
                            (optional slash and packet count for burst mode)
  --pacing-timer #[KMG]     set the timing for pacing, in microseconds (default 1000)
  --fq-rate #[KMG]          enable fair-queuing based socket pacing in
                            bits/sec (Linux only)
  -t, --time      #         time in seconds to transmit for (default 10 secs)
  -n, --bytes     #[KMG]    number of bytes to transmit (instead of -t)
  -k, --blockcount #[KMG]   number of blocks (packets) to transmit (instead of -t or -n)
  -l, --length    #[KMG]    length of buffer to read or write
                            (default 128 KB for TCP, dynamic or 1460 for UDP)
  --cport         <port>    bind to a specific client port (TCP and UDP, default: ephemeral port)
  -P, --parallel  #         number of parallel client streams to run
  -R, --reverse             run in reverse mode (server sends, client receives)
  --bidir                   run in bidirectional mode.
                            Client and server send and receive data.
  -w, --window    #[KMG]    set window size / socket buffer size
  -C, --congestion <algo>   set TCP congestion control algorithm (Linux and FreeBSD only)
  -M, --set-mss   #         set TCP/SCTP maximum segment size (MTU - 40 bytes)
  -N, --no-delay            set TCP/SCTP no delay, disabling Nagle's Algorithm
  -4, --version4            only use IPv4
  -6, --version6            only use IPv6
  -S, --tos N               set the IP type of service, 0-255.
                            The usual prefixes for octal and hex can be used,
                            i.e. 52, 064 and 0x34 all specify the same value.
  --dscp N or --dscp val    set the IP dscp value, either 0-63 or symbolic.
                            Numeric values can be specified in decimal,
                            octal and hex (see --tos above).
  -L, --flowlabel N         set the IPv6 flow label (only supported on Linux)
  -Z, --zerocopy            use a 'zero copy' method of sending data
  -O, --omit N              omit the first n seconds
  -T, --title str           prefix every output line with this string
  --extra-data str          data string to include in client and server JSON
  --get-server-output       get results from server
  --udp-counters-64bit      use 64-bit counters in UDP test packets
  --repeating-payload       use repeating pattern in payload, instead of
                            randomized payload (like in iperf2)
  --username                username for authentication
  --rsa-public-key-path     path to the RSA public key used to encrypt
                            authentication credentials

[KMG] indicates options that support a K/M/G suffix for kilo-, mega-, or giga-

iperf3 homepage at: https://software.es.net/iperf/
Report bugs to:     https://github.com/esnet/iperf
```


## iperf3实践

### TCP测试

默认情况下默认使用TCP协议进行测试

- 选择一台机器做为服务端，执行以下命令，默认时间1秒，默认端口5201

```shell
# 以服务端模式运行，设置监控时间1秒，并指定端口为8888
iperf3 -s -i 1 -p 8888
```


- 选择另一台机器做为客户端，执行以下命令进行带宽测速，这里的192.168.1.96即你要连接的上面的服务端的IP

```shell
# 以客户端模式运行，目标host：port为服务端信息，输出结果以MB显示，每个1秒打印一次，共计10秒，忽略前3秒的结果，反向模式运行（即服务器向客户端发送数据。）
iperf3 -c 192.168.1.96 -p 8888 -f m -i 1 -t 10 -O 3 -R
```
![](assets/Pasted%20image%2020250218105146.png)

 上述报告解读 ：

> [!NOTE]
> 这个 `iperf3` 报告展示了一个网络性能测试的结果，连接的目标主机是 `192.168.1.96`，并使用了反向模式（`-R`），即目标主机发送数据到客户端（`192.168.1.53`）。以下是对报告的逐项解读：
> 
> ### 主要参数解释：
> 
> - **`-c 192.168.1.96`**：客户端连接到 IP 地址为 `192.168.1.96` 的目标主机。
> - **`-p 8888`**：目标主机监听的端口是 `8888`。
> - **`-f m`**：输出的单位为兆字节（MB）和兆比特（Mbits）。
> - **`-i 1`**：每隔 1 秒输出一次结果。
> - **`-t 10`**：测试持续时间为 10 秒。
> - **`-O 3`**：测试开始前有 3 秒的延迟，允许网络稳定。
> - **`-R`**：反向模式，即目标主机 `192.168.1.96` 作为发送方，客户端作为接收方。
> 
> ### 关键结果分析：
> 
> 1. **每秒传输量**：
>     
>     - 报告显示在 10 秒内的数据传输情况。每一秒的传输量基本保持一致，每秒大约传输 116 MB，约 974-975 Mbps。
>     - 例如，第 0 到 1 秒的传输量为 116 MB（975 Mbps），第二秒为 116 MB（974 Mbps），一直保持稳定。
> 2. **总传输量**：
>     
>     - 在 10 秒的测试过程中，总传输了 **1.13 GB** 的数据。
>     - 总的平均吞吐量为 **973 Mbps**（这与每秒的吞吐量一致，表明网络性能非常稳定）。
> 3. **无丢包**：
>     
>     - 在整个测试期间，没有发生任何丢包（`Retr` 为 0），表示网络连接非常可靠，传输没有丢失数据包。
> 4. **测试模式**：
>     
>     - 由于使用了反向模式（`-R`），所有数据都是从 `192.168.1.96`（目标主机）发送到 `192.168.1.53`（客户端），可以看出目标主机的网络传输性能。
> 
> 结论：
> 
> - 网络连接非常稳定，测试过程中没有出现任何丢包。
> - 吞吐量在 10 秒的测试中保持在 973 Mbps 左右，属于非常高的网络性能。
> - 该测试基本没有出现波动，反映出网络链路没有受到明显干扰或拥塞。
> 
> 这个测试结果显示了目标主机和客户端之间的高效数据传输能力，适合高带宽需求的应用场景。


### UDP测试

UDP测试只需加上-u参数

- 选择一台机器做为服务端，执行以下命令，默认时间1秒，默认端口5201

```shell
# 以服务端模式运行，设置监控时间1秒，并指定端口为8888
iperf3 -s -i 1 -p 8888
```

- 选择另一台机器做为客户端，执行以下命令进行带宽测速，这里的192.168.1.96即你要连接的上面的服务端的IP

```shell
# 以客户端模式运行，目标host：port为服务端信息，输出结果以MB显示，每个1秒打印一次，共计10秒，
iperf3 -c 192.168.1.96 -u -p 8888 -b 0 -t 10
```

![](assets/Pasted%20image%2020250218142014.png)

> [!NOTE]
> 这段 `iperf3` 测试报告显示了 UDP 测试的结果，具体情况如下：
> 
> 1. 基本连接信息：
> 
> - **本地 IP 地址**：192.168.1.53
> - **远程服务器 IP 地址**：192.168.1.96
> - **端口号**：8888
> - **测试协议**：UDP（`-u`）
> - **带宽设置**：`-b 0` 表示不限带宽
> - **测试持续时间**：10秒（`-t 10`）
> 
>  2. 每秒的数据传输情况：
> 
> 报告中列出了每秒的传输情况，包括：
> 
> - **Transfer**（传输量）：每秒传输的数据量。
> - **Bitrate**（比特率）：每秒的平均传输速率。
> - **Total Datagrams**（总数据报文数）：每秒传输的数据报文数。
> 
> 各秒的数据传输：
> 
> - **0.00-1.00 秒**：传输量为 174 MB，传输速率为 1.46 Gbits/sec，传输了 130,870 个数据报。
> - **1.00-2.00 秒**：传输量为 174 MB，传输速率为 1.46 Gbits/sec，传输了 130,630 个数据报。
> - 在接下来的几秒里，数据传输速率和每秒的数据报文数相对稳定，略有波动。
> 
> 3. 最终统计：
> 
> - **发送端统计**：在 10 秒内，总共传输了 1.69 GB 数据，平均速率为 1.46 Gbits/sec。发送端的抖动（jitter）为 0 ms，丢包率为 0%（即没有丢包）。
> - **接收端统计**：接收端接收的总数据量为 1.59 GB，接收速率为 1.37 Gbits/sec，丢包率为 6.2%（80124/1301748 数据报丢失）。
> 
> 4. 关键问题分析：
> 
> - **丢包率**：丢包率为 **6.2%**，这意味着在 10 秒的测试过程中，大约 6.2% 的数据报文未能成功到达接收端。UDP 协议本身是不可靠的，丢包是常见现象，但在高丢包率下可能会影响应用的稳定性或性能。可能的原因包括网络拥塞、路由器或交换机的缓冲区溢出等。
>     
> - **带宽与速率**：发送端的平均带宽（1.46 Gbits/sec）略高于接收端的带宽（1.37 Gbits/sec），这可能表明网络中的某些瓶颈或丢包导致了接收端速率的下降。
>     
> 
> 总结：
> 
> - **带宽利用率**：总体来说，带宽利用率较高，发送端传输速率接近 1.46 Gbits/sec，而接收端的速率略低（1.37 Gbits/sec）。
> - **丢包问题**：接收端丢包较高，6.2% 丢包率是一个值得关注的问题，可能需要进一步优化网络环境或排查带宽瓶颈。