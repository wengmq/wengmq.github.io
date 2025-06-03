
`-m` 是 `iptables` 中用于**加载额外的匹配模块**的参数，通过指定不同的模块，可以实现更多高级的流量匹配规则。

---

## **常用匹配模块**

|模块名称|描述|
|---|---|
|`state`|匹配数据包的连接状态 (`NEW`, `ESTABLISHED`, `RELATED`, `INVALID`)|
|`conntrack`|更强大的连接状态跟踪模块，支持更多细节控制 (替代 `state`)|
|`multiport`|允许一次匹配多个端口|
|`limit`|限制匹配的频率，通常用于防止 DoS 攻击|
|`mac`|匹配基于 MAC 地址的数据包|
|`iprange`|匹配 IP 地址范围|
|`time`|匹配特定时间段的数据包|
|`comment`|添加注释，便于管理和查看规则|
|`owner`|匹配本地进程用户、组、PID (仅 OUTPUT 链有效)|
|`tos`|匹配 Type of Service (服务类型)|
|`length`|匹配数据包长度|
|`tcp`|匹配 TCP 协议特定字段|
|`udp`|匹配 UDP 协议特定字段|
|`icmp`|匹配 ICMP 协议特定字段|
|`recent`|匹配最近访问的 IP，支持白名单和黑名单|
|`mark`|匹配数据包标记（通常用于流量整形和 QoS）|
|`hashlimit`|基于哈希的频率限制，更细粒度的流量控制|

---

## **1️⃣ state 模块**

- 匹配连接状态：
    
    - `NEW`: 新的连接
        
    - `ESTABLISHED`: 已建立的连接
        
    - `RELATED`: 相关连接 (如 FTP 的数据连接)
        
    - `INVALID`: 无效的包
        

`iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT`

---

## **2️⃣ conntrack 模块**

- 取代 `state` 模块，支持更细粒度的匹配
    
    - `--ctstate`：类似 `--state`
        
    - `--ctorigsrc`：原始连接的源 IP
        
    - `--ctorigdst`：原始连接的目标 IP
        

`iptables -A INPUT -m conntrack --ctstate NEW,ESTABLISHED -j ACCEPT`

---

## **3️⃣ multiport 模块**

- 匹配多个端口，最多支持 15 个
    
    - `--sports`: 源端口列表
        
    - `--dports`: 目标端口列表
        

`iptables -A INPUT -p tcp -m multiport --dports 22,80,443 -j ACCEPT`

---

## **4️⃣ limit 模块**

- 限制数据包的匹配频率
    
    - `--limit`：设置匹配速率
        
    - `--limit-burst`：设置初始突发数量
        

**示例：限制每分钟最多 10 个连接**


`iptables -A INPUT -p tcp --dport 22 -m limit --limit 10/minute --limit-burst 5 -j ACCEPT`

---

## **5️⃣ mac 模块**

- 基于 MAC 地址进行匹配
    
    - `--mac-source`: 匹配源 MAC 地址
        

**示例：允许特定 MAC 地址的访问**


`iptables -A INPUT -m mac --mac-source AA:BB:CC:DD:EE:FF -j ACCEPT`

---

## **6️⃣ iprange 模块**

- 匹配 IP 地址范围
    
    - `--src-range`：源 IP 范围
        
    - `--dst-range`：目标 IP 范围
        

**示例：匹配来自特定 IP 范围的连接**


`iptables -A INPUT -m iprange --src-range 192.168.1.1-192.168.1.100 -j ACCEPT`

---

## **7️⃣ time 模块**

- 匹配特定时间段的数据包
    
    - `--timestart`: 开始时间 (`HH:MM`)
        
    - `--timestop`: 结束时间 (`HH:MM`)
        
    - `--days`: 指定匹配的星期 (`Mon, Tue, Wed...`)
        
    - `--kerneltz`: 使用系统时区
        

**示例：只允许工作时间访问服务**


`iptables -A INPUT -p tcp --dport 22 -m time --timestart 09:00 --timestop 18:00 --days Mon,Tue,Wed,Thu,Fri -j ACCEPT`

---

## **8️⃣ recent 模块**

- 记录最近访问的 IP
    
    - `--name`: 定义名单名称
        
    - `--set`: 将 IP 添加到名单
        
    - `--rcheck`: 检查是否存在于名单
        
    - `--remove`: 从名单中移除
        
    - `--update`: 更新计时
        

**示例：限制每 60 秒只允许一次访问**


`iptables -A INPUT -p tcp --dport 22 -m recent --name SSH --set iptables -A INPUT -p tcp --dport 22 -m recent --name SSH --rcheck --seconds 60 --hitcount 1 -j DROP`

---

## **9️⃣ comment 模块**

- 为规则添加注释，方便管理
    
    - `--comment`: 添加描述信息
        

**示例：添加注释**


`iptables -A INPUT -p tcp --dport 22 -m comment --comment "Allow SSH access" -j ACCEPT`

---

## **🔍 查看当前所有规则**


`iptables -L -v -n --line-numbers`



## **使用 `iptables -m <模块名> --help` 查看模块详情**

如果想查看某个模块的详细参数，可以加上模块名称，例如：


```
iptables -m tcp --help 
iptables -m state --help 
iptables -m conntrack --help
iptables -m multiport --help
```