
## **_iptables语法格式_**

  

iptables 命令的基本语法格式如下：

```text
[root~]# iptables [-t table] COMMAND [chain] CRETIRIA -j ACTION
```

  

各参数的含义为：

- -t：指定需要维护的防火墙规则表 filter、nat、mangle或raw。在不使用 -t 时则默认使用 filter 表。
- COMMAND：子命令，定义对规则的管理。
- chain：指明链表。
- CRETIRIA：匹配参数。
- ACTION：触发动作。

  

iptables 命令常用的选项及各自的功能：

```bash
选 项    功 能
-A  添加防火墙规则
-D  删除防火墙规则
-I  插入防火墙规则
-F  清空防火墙规则
-L  列出添加防火墙规则
-R  替换防火墙规则
-Z  清空防火墙数据表统计信息
-P  设置链默认规则
```

  

iptables 命令常用匹配参数及各自的功能：

```text
参 数    功 能
[!]-p  匹配协议，! 表示取反
[!]-s  匹配源地址
[!]-d  匹配目标地址
[!]-i  匹配入站网卡接口
[!]-o  匹配出站网卡接口
[!]--sport  匹配源端口
[!]--dport  匹配目标端口
[!]--src-range  匹配源地址范围
[!]--dst-range  匹配目标地址范围
[!]--limit  四配数据表速率
[!]--mac-source  匹配源MAC地址
[!]--sports  匹配源端口
[!]--dports  匹配目标端口
[!]--stste  匹配状态（INVALID、ESTABLISHED、NEW、RELATED)
[!]--string  匹配应用层字串
```

  

iptables 命令触发动作及各自的功能：

```text
触发动作   功 能
ACCEPT  允许数据包通过
DROP  丢弃数据包
REJECT  拒绝数据包通过
LOG  将数据包信息记录 syslog 曰志
DNAT  目标地址转换
SNAT  源地址转换
MASQUERADE  地址欺骗
REDIRECT  重定向
```

  

内核会按照顺序依次检查 iptables 防火墙规则，如果发现有匹配的规则目录，则立刻执行相关动作，停止继续向下查找规则目录；如果所有的防火墙规则都未能匹配成功，则按照默认策略处理。使用 -A 选项添加防火墙规则会将该规则追加到整个链的最后，而使用 -I 选项添加的防火墙规则则会默认插入到链中作为第一条规则。