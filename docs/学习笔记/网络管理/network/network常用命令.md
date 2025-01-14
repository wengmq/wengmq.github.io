查看命令的帮助: 
```
# /etc/init.d/network -h
WARN      : [network] You are using 'network' service provided by 'network-scripts', which are now deprecated.
WARN      : [network] 'network-scripts' will be removed in one of the next major releases of RHEL.
WARN      : [network] It is advised to switch to 'NetworkManager' instead for network management.
Usage: /etc/init.d/network {start|stop|status|restart|force-reload}
```


`/etc/init.d/network` 是用于管理网络服务的脚本，通常用于基于 SysVinit 的 Linux 系统（如早期的 CentOS 和 RHEL 版本）。在较新版本的 Linux 中，可能使用 `systemctl` 管理网络服务，但如果你使用 `/etc/init.d/network`，常见的命令包括：

1. **启动网络服务**：
    
    `/etc/init.d/network start`
    
2. **停止网络服务**：
    
    `/etc/init.d/network stop`
    
3. **重启网络服务**（应用更改）：
    
    `/etc/init.d/network restart`
    
4. **重新加载网络配置**（尝试重新加载而不中断网络连接）：
    
    `/etc/init.d/network reload`
    
5. **查看网络服务的状态**：
    
    `/etc/init.d/network status`
    

这些命令通常需要使用 `root` 权限执行，因此可以在命令前加上 `sudo`：

`sudo /etc/init.d/network restart`

在较新的系统中，推荐使用 `systemctl` 进行网络服务管理，如：

`sudo systemctl restart network`

确保根据你使用的 Linux 发行版选择合适的网络管理工具。