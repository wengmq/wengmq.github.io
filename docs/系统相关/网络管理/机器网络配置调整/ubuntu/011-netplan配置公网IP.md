## 背景
- netplan 配置公网IP 
	- IP地址：103.18.80.231 
	- 掩码： 255.255.255.224 
	- 网关：103.18.80.225 
	- DNS： 8.8.8.8


## 配置

假设网卡名称是 `ens33`（你需要换成你实际的网卡名，比如 `ens160`、`eth0` 等）：
- 备注：每一级缩进都是 **2 个空格**

```yaml
network:
  version: 2
  ethernets:
    ens33:
      dhcp4: no
      addresses:
        - 103.18.80.231/27
      gateway4: 103.18.80.225
      nameservers:
        addresses:
          - 8.8.8.8
```

### 应用配置

1.  保存为：
    
    ```bash
    sudo vi /etc/netplan/01-netcfg.yaml
    ```
    
2.  检查配置是否正确：
    
    ```bash
    sudo netplan try
    ```
    
    （测试 120 秒内可回滚）
    
3.  确认无误后应用：
    
    ```bash
    sudo netplan apply
    ```
    
