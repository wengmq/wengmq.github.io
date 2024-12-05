- ### 命令参数说明：
	- -n：不转换主机名、端口号（开启后看到的是IP地址，而不是主机名，实际使用中我们一般都比较关注服务器IP地址）
	- -v：显示详细信息，v越多信息越多
	- -i：指定网络接口，也就网卡的名字，常用的有`eth0`,`eth1`等，如果要监听所有网卡就是用`-i any`。
	- -w：抓取的包写入到文件，方便后续分析。实际中经常使用tcpdump抓包保存，然后使用Wireshark分析
	- -r：抓到的包也可以tcpdump打开再分析，`tcpdump -n -vvvv -r data.cap`
	- -c：指定抓取的包的数目
	- -s：指定抓取的数据的长度
	- -v: 启用 verbose output，抓包时输出包的附加信息（可以使用多个 -v: -v, -vv, -vvv 多个 v 会显示更多更详细的信息）

  - ### 常用过滤规则[](https://mozillazg.com/2018/01/tcpdump-common-useful-examples-cookbook.html#hidsection-2 "Permalink to this headline")

	- 过滤规则一般包含三种修饰符的组合：
	
		- type: 
			- 指定id 所代表的对象类型, id可以是名字也可以是数字. 可选的对象类型有: host, net, port 以及portrange，默认是 host
		- dir: 
			- 描述id 所对应的传输方向, 即发往id 还是从id 接收（而id 到底指什么需要看其前面的type 修饰符）.可取的方向为: src, dst, src or dst, src and dst
		- proto: 
			- 描述id 所属的协议. 可选的协议有: ether, fddi, tr, wlan, ip, ip6, arp, rarp, decnet, tcp以及 upd
	
	- 通过括号(\( xxx \)) 和 bool 操作符可以组合多种过滤规则，一对括号是一组:
	
		- 否定操作: ! 或 not
		- 与操作: && 或 and
		- 或操作: || 或 or
  
	- 详情见文档：[Manpage of PCAP-FILTER](http://www.tcpdump.org/manpages/pcap-filter.7.html)

- ### 数据解读

```shell
$ sudo tcpdump -i any -n -vvv tcp -c 20
tcpdump: listening on any, link-type LINUX_SLL (Linux cooked), capture size 262144 bytes

18:07:39.173432 IP (tos 0x0, ttl 48, id 10489, offset 0, flags [DF], proto TCP (6), length 40)
    122.228.60.78.37000 > 117.28.255.94.43896: Flags [.], cksum 0xe133 (correct), seq 2125271959, ack 4215250380, win 15265, length 0

      
```

- 抓包分析：
	- 时间戳：18:07:39.173432
	- 源 IP 地址：122.228.60.78
	- 源端口：37000
	- 目标 IP 地址：117.28.255.94
	- 目标端口：43896
	- 协议：TCP
	- TCP 标志：[.]（ACK）
	- 序列号：2125271959
	- 确认号：4215250380
	- 窗口大小：15265
	- 数据长度：0
	
- `DF` 标志出现在 IP 头部的标志字段中，表示 IP 数据包中设置了 `DF` 标志。这意味着 IP 数据包应该被视为不可分片的，即不应该被路由器分片为较小的数据包进行传输。

- 还有其他的Flags说明：
```csharp
[S] – SYN (开始连接)
[.] – 没有标记 (表示确认的ACK包)
[P] – PSH (数据推送)
[F] – FIN (结束连接)
[R] – RST (重启连接)
```

为了提高网络效率，一个包也可以包含标志的组合，比如`[S.]`，`[FP.]`

- `seq`：包序号
- `cksum`：校验码（见下面常见问题）
- `win`：滑动窗口大小
- `length`：承载的数据(payload)长度length，如果没有数据则为0

### 注意事项

- `tcpdump`需要`root`权限：_从实现原理来看，如果不需要root权限，也太吓人了_

  
  

- 参考：
	- https://mozillazg.com/2018/01/tcpdump-common-useful-examples-cookbook.html
	- https://www.jianshu.com/p/5db12786ed96