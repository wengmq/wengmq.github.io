
## 简介

- wsl2默认的网络模式是NAT模式，不方便和外部主机的互相访问，尤其是当Windows上的容器服务需要暴露给外部主机访问时，因此需要修改网络模式。

## WSL的网络架构

> 注意：此方法在 Windows 10 21H2验证没问题。


- 首先分析一下默认wsl2与宿主机的网络关系，wsl2 可以理解为宿主机虚拟出来的一个完整的 Linux 虚拟机，拥有逻辑上独立的网卡。
![](assets/Pasted%20image%2020250616164808.png)

- 上图可以看到wsl2与外界通信需要通过宿主机进行转发，宿主机和wsl2之间存在有一个虚拟局域网，虚拟网卡WSL和虚拟网卡eth0之间由于在同一个网段，所以能够互相通信。wsl2需要访问外部网络时，需要先发往宿主机的虚拟网卡，然后由宿主机的物理网卡将请求转发出去。

![](assets/Pasted%20image%2020250616164851.png)

- 如果wsl2上存在某个服务，暴露8989端口对外部提供服务。由于wsl没有外网ip，且wsl2的ip是经由宿主机使用网络地址转换技术(NAT)才得以访问局域网的，这隐藏了wsl2，保证了虚拟局域网的安全性，同时也使得局域网其它主机无法直接访问wsl2上的服务。

- 当前有3种方式可以实现wsl2和局域网内主机的互通，`端口转发`、 `桥接网络` 或者 `镜像网络`。

## WSL端口转发[](http://www.ronnyz.top/2023/11/18/WSL2%E8%AE%BE%E7%BD%AE%E6%A1%A5%E6%8E%A5%E7%BD%91%E7%BB%9C%E5%8F%8A%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE/#%E7%AB%AF%E5%8F%A3%E8%BD%AC%E5%8F%91)

- 以管理员身份运行powershell，执行下面的命令设置端口映射, 执行完就设置好监听win上所有ip地址和8989端口，并转发到172.17.45.152的8989端口了。
```bash
# 添加端口转发规则
netsh interface portproxy add v4tov4 listenport=8989 listenaddress=0.0.0.0 connectport=8989 connectaddress=172.17.45.152
```


- 拓展命令：
```bash
# 删除端口转发规则
netsh interface portproxy delete v4tov4 listenport=8989 listenaddress=0.0.0.0

# 重置所有端口代理（清空规则）
netsh interface portproxy reset

# 查看所有端口转发规则
netsh interface portproxy show all
```

![](assets/Pasted%20image%2020250616165722.png)

- 注意：
	- 需要再windows的防火墙上面放通你的对外端口或是关闭防火墙。


## WSL设置桥接网络

> 注意：此方法需要至少 Windows 11 22H2。


- 桥接模式就是将主机网卡与虚拟机虚拟的网卡利用虚拟网桥进行通信。 在桥接的作用下，类似于把宿主机虚拟为一个交换机，所有桥接设置的虚拟机连接到这个交换机的一个接口上，宿主机也同样插在这个交换机当中，所以所有桥接下的网卡与网卡都是交换模式的，相互可以访问而不干扰。这种方式下，wsl2会获得一个和主机同网段的ip地址。

![](assets/Pasted%20image%2020250616171049.png)

- #### 1. 更新WSL到最新的版本
	- 首先需要从 Microsoft Store 里面下载最新的 Windows Subsystem for Linux。
	- 用不了商店的可以前往这里自己下载部署安装：[https://github.com/microsoft/WSL/releases](https://github.com/microsoft/WSL/releases) ，装好之后可以运行 `wsl --version` 查看版本信息。
```
WSL 版本： 2.0.9.0
内核版本： 5.15.133.1-1
WSLg 版本： 1.0.59
MSRDC 版本： 1.2.4677
Direct3D 版本： 1.611.1-81528511
DXCore 版本： 10.0.25131.1002-220531-1700.rs-onecore-base2-hyp
Windows 版本： 10.0.22621.819
```

#### 2.使用 Hyper-V 创建和配置虚拟交换机

##### 2.1 启用 Hyper-V 
- 以在 Windows 10 上创建虚拟机。参考：[在 Windows 10 上安装 Hyper-V](https://learn.microsoft.com/zh-cn/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v)
	- 使用 PowerShell 启用 Hyper-V
		- 以管理员身份打开 PowerShell 控制台，执行命令：`Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All`
	- 通过“设置”启用 Hyper-V 角色
		- 按下win + s打开Windows搜索，输入“Windows 功能”。选择【启用或关闭Windows功能】
		- 选择“Hyper-V”，然后单击“确定”。
		- 安装完成后，系统会提示你重新启动计算机。

##### 2.2 添加虚拟交换机

- 介绍如何使用 Hyper-V Manager 或 PowerShell 创建和配置虚拟交换机（选择其中一种方式即可）
- **2.2.1 使用 Hyper-V Manager 创建和配置虚拟交换机**：
	- 在Windows搜索栏内输入”hyper-v”，出现Hyper-V管理器，点击即可打开Hyper-V管理器程序。
	- Hyper-V管理器的网络模式默认为NAT，如果想使用桥接模式，需要添加一个外部网络的虚拟交换机。点击“虚拟交换机管理器”。
	- 弹出虚拟交换机管理器窗口，点击“新建虚拟网络交换机”，然后在右侧选中“外部”，再点击“创建虚拟交换(S)”。
	- 在弹出的窗口中，填入虚拟交换机的名称，如WSLSwitch，连接类型栏确保选中的是“外部网络(E)”，如果主机配置了多块物理网卡，点击下拉箭头，可选择虚拟机交换机绑定（桥接）的物理网卡。
	- 点击“确定(O)”，提示应该网络更改可能导致网络连接中断，点击“是(Y)”即可。看到虚拟机交换机一栏中，已经出现刚才添加的WSLSwitch交换机了，点击确定完成设置。
![](assets/Pasted%20image%2020250616171739.png)

![](assets/Pasted%20image%2020250616171752.png)
![](assets/Pasted%20image%2020250616171806.png)

   - **2.2.2 使用 PowerShell 创建和配置虚拟交换机, 使用 [New-VMSwitch](https://learn.microsoft.com/zh-cn/powershell/module/hyper-v/new-vmswitch) 命令创建虚拟交换机。**
	- 在提升的会话中在计算机上运行 PowerShell。
	- 执行以下命令查找现有网络适配器。 标识要用于虚拟交换机的网络适配器名称。
```
 Get-NetAdapter
```
	- 执行以下命令创建外部虚拟交换机，将 `<value>` 占位符替换为你自己的值。并设置允许虚拟交换机与管理操作系统共享。
```bash
New-VMSwitch -Name <switch-name>  -NetAdapterName <netadapter-name> -AllowManagementOS $true

# 示例
New-VMSwitch -Name WSLSwitch -NetAdapterName WLAN -AllowManagementOS $true
```

#### 3. 创建`.wslconfig`配置文件

- `win+R`快捷键输入`%USERPROFILE%`打开默认用户目录，在此目录下创建`.wslconfig`配置文件。文件内容如下：
```
[wsl2]
networkingMode=bridged # 桥接模式
vmSwitch=WSLSwitch # 你所创建的虚拟交换机名
ipv6=true # 启用 IPv6
```
- `wsl --shutdown`和`wsl` 重启 WSL2。

## WSL镜像网络

> 注意：使用这种方式至少 Windows 11 23H2。需要加入 Windows Insider 预览版计划，而且可能还需要Canary`渠道，可能存在系统不稳定的情况。


这种配置方式我也没试验过，网络拓扑类似下面这样？
![](assets/Pasted%20image%2020250616173422.png)

参考[WSL2 今天史诗级更新 - V2EX](https://www.v2ex.com/t/975098?p=2)，如下设置`.wslconfig`文件：

```
[experimental]
networkingMode=mirrored
dnsTunneling=true
firewall=true
autoProxy=true
```

这样wsl2 和 Windows 主机的网络互通而且 IP 地址相同了，还支持 IPv6 了，并且从外部（比如局域网）可以同时访问 WSL2 和 Windows 的网络。这波升级彻底带回以前 WSL1 那时候的无缝网络体验了，并且 Windows 防火墙也能过滤 WSL 里的包了，再也不需要什么桥接网卡、端口转发之类的操作了。


## 参考：
- http://www.ronnyz.top/2023/11/18/WSL2%E8%AE%BE%E7%BD%AE%E6%A1%A5%E6%8E%A5%E7%BD%91%E7%BB%9C%E5%8F%8A%E9%AB%98%E7%BA%A7%E8%AE%BE%E7%BD%AE/