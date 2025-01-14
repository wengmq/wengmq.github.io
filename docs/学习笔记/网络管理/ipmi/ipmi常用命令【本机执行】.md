Category: 技术
Tags: pelican, publishing

#### 查看 BMC 网络信息

`ipmitool lan print`


#### 查看系统事件日志（SEL）

`ipmitool sel list`


#### 列出用户列表
- 列出所有 BMC 用户（通常用户槽位 `1` 是默认管理槽位）。

`ipmitool user list 1`


#### 查询传感器数据
- 默认展示全部数据，也可以使用type过滤具体的传感器详细数据
	- 例如（内存）：ipmitool sdr type memory

`ipmitool sdr


### 重启 BMC 管理控制器

`ipmitool mc reset cold`
