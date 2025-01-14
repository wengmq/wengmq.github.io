
在IPMI的本机上执行：
这里的3是用户的ID （可以通过ipmitool user list 1查看）

```
ipmitool user list 1

ipmitool user set name 3 qwilt

ipmitool user set password 3 'Qwilt+WZ+cXOv5JD'

ipmitool user privilege 3 4 1

ipmitool -I open channel setaccess 1 3 callin=on ipmi=on link=on privilege=4

ipmitool user enable 3

ipmitool user list 1
```

