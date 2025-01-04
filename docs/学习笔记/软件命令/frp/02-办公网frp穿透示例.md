
- 参考官网：https://gofrp.org/zh-cn/docs/overview/
- 安装：https://github.com/fatedier/frp/releases/tag/v0.59.0
	- 每个包都有包含client端和server端，注意你的cpu型号
- server 端配置：
	- 解压后执行：./frps -c frps.toml
```
$ cat ./frps.toml
bindPort = 7000
auth.token = "kkkkkkk"
```

- client端配置（需要被访问的内网设备）
	- 解压后执行：./frpc -c frpc.toml
```
$ cat frpc.toml
serverAddr = "150.158.120.220"
serverPort = 7000
# 这里的auth.token需要和server端一致
auth.token = "kkkkkkk" 
[[proxies]]
name = "wengmq_ssh"
type = "stcp"
# 只有与此处设置的 secretKey 一致的用户才能访问此服务
secretKey = "xxxxxx"
localIP = "127.0.0.1"
localPort = 22
```

- 你本地需要连接到内网设备的机器：
	- 解压后执行：./frpc -c frpc.toml
	- 然后就可以远程ssh登录到内网设备：ssh yelingjie@127.0.0.1 -p 6000

```
$ cat ./frpc.toml
serverAddr = "150.158.120.220"
serverPort = 7000
# 这里的auth.token需要和server端一致
auth.token = "kkkkkkk" 
[[visitors]]
 name = "wengmq_ssh"
 type = "stcp"
# 要访问的 stcp 代理的名字
serverName = "wengmq_ssh"
secretKey = "xxxxxx"
#  绑定本地端口以访问 SSH 服务
 bindAddr = "127.0.0.1"
 bindPort = 6000
```

	