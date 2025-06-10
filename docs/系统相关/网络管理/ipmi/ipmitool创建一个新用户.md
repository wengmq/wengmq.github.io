
### 在IPMI的本机上执行

- 这里的3是通道号，可以理解为用户的ID （可以通过ipmitool user list 1查看）

```
# 查看当前用户列表 1表示通道号，通常是 1，如果不对，可以试试 0 或 2
ipmitool user list 1

# 设置通道3的账号 名称为root
ipmitool user set name 3 root

# 设置通道3的账号的密码
ipmitool user set password 3 '9Xd6@^Ja0t6?+0A'

# 设置权限 

# 3：用户 ID（User ID 3），4：权限等级，4 表示 Administrator（管理员权限），1：通道号，一般通道 1 是 LAN 通道
ipmitool user privilege 3 4 1

# 1：通道号（通常是 LAN， 3：用户 ID，callin=on：允许通过 call-in（主动连接）方式使用 IPMI，ipmi=on：允许使用 IPMI 命令，link=on：允许物理链接访问该通道，privilege=4：设置该用户在该通道上的最大权限为 Administrator
ipmitool -I open channel setaccess 1 3 callin=on ipmi=on link=on privilege=4

# 启用 User ID 为 3 的用户账户（默认新建的用户通常是禁用状态）
ipmitool user enable 3

ipmitool user list 1
```

