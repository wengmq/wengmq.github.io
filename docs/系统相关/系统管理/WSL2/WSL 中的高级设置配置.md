> 详细配置参考：[WSL 中的高级设置配置](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config)

为已安装的 Linux 发行版配置设置，使它们在每次启动 WSL 时自动应用，有两种方法：

- **[.wslconfig](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#wslconfig)** 用于在 WSL 2 上运行的所有已安装发行版中**全局**配置设置。
- **[wsl.conf](https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#wslconf)** 用于为在 WSL 1 或 WSL 2 上运行的 Linux 发行版**针对每个发行版**配置设置。

这两种文件类型都用于配置 WSL 设置，但存储文件的位置、配置的范围以及运行发行版的 WSL 版本都会影响应选择的文件类型。

这里再介绍几个实用的配置项：

```
[wsl2]
networkingMode=bridged # 桥接模式
vmSwitch=WSLSwitch # 虚拟交换机名
ipv6=true # 启用 IPv6

# 限制 WSL2 虚拟机使用的内存不超过 8GB。可以使用 GB 或 MB 来设置整数值。
memory=8GB 

# 设置 WSL2 虚拟机使用的虚拟处理器数量为4
processors=4

# 设置交换空间的大小为 8GB，默认为可用内存的 25%。
swap=8GB

# 指定交换文件的路径。默认路径为 %USERPROFILE%\AppData\Local\Temp\swap.vhdx。
swapfile=C:\\temp\\wsl-swap.vhdx
```