
- ipmi查看对应的电源状态
	- `ipmitool -H $对应ipmi_ip -U $ipmi账号 -P $ipmi密码 -I lanplus power status`
```
ipmitool -H 10.20.2.28 -U bmsipmi -P aswPk6%5W_13366 -I lanplus power status
```

