
在IPMI的本机上执行：
这里的3是通道号，可以理解为用户的ID （可以通过ipmitool user list 1查看）

```
# 查看当前用户列表 1表示通道号，通常是 1，如果不对，可以试试 0 或 2
ipmitool user list 1

# 设置通道3的账号 名称为testname
ipmitool user set name 3 testname

# 设置通道3的账号的密码
ipmitool user set password 3 'Qwilt+WZ+cXOv5JD'

# 设置权限 
ipmitool user privilege 3 4 1

ipmitool -I open channel setaccess 1 3 callin=on ipmi=on link=on privilege=4

ipmitool user enable 3

ipmitool user list 1
```

