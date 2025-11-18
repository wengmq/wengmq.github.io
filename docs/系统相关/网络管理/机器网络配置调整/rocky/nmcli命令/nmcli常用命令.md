## 简介
- 官方说明：[https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-configuring_ip_networking_with_nmcli](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-configuring_ip_networking_with_nmcli)

## 命令说明

nmcli （NetworkManager 命令行界面）命令行工具用于控制 NetworkManager 和报告网络状态。它可用作 nm-applet 或其他图形客户端的替代。请参阅 [第 2.5 节 “NetworkManager 工具”](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-NetworkManager_Tools "2.5. NetworkManager 工具")。nmcli 用于创建、显示、编辑、删除、激活和停用网络连接，以及控制和显示网络设备状态。

nmcli 工具可供用户和脚本用于控制 NetworkManager ：

- 对于服务器、无头计算机和终端，nmcli 可用于直接控制 NetworkManager，无需 GUI，包括创建、编辑、启动和停止网络连接，以及查看网络状态。
    
- 对于脚本，nmcli 支持更适合脚本处理的 terse 输出格式。它是集成网络配置而不是手动管理网络连接的一种方式。
    

nmcli 命令的基本格式如下：

```plaintext
nmcli [OPTIONS] OBJECT { COMMAND | help }
```

其中 OBJECT 可以是以下选项之一： `一般`、`联网`、`无线`、`连接`、`设备`、`代理` `和监控` 器。您可以在命令中使用这些选项的任何前缀。**例如，nmcli con help、nmcli c help** 和**nmcli 连接帮助生成相同的输出**。

要开始的一些有用的可选 OPTIONS 是：

-t, terse  -t、 简洁明了

此模式可用于计算机脚本处理，因为您可以看到仅显示值的 terse 输出。

**例 3.1. 查看 terse 输出**

```plaintext
nmcli -t device
ens3:ethernet:connected:Profile 1
lo:loopback:unmanaged:
```

Show more

-f, 字段

此选项指定输出中可以显示哪些字段。例如，NAME,UUID,TYPE,AUTOCONNECT,ACTIVE,DEVICE,STATE.您可以使用一个或多个字段。如果要使用更多，请不要在逗号后使用空格来分隔字段。

**例 3.2. 指定输出中的字段**

```plaintext
~]$ nmcli -f DEVICE,TYPE device
DEVICE  TYPE
ens3    ethernet
lo      loopback
```

甚至更适合编写脚本：

```plaintext
~]$ nmcli -t -f DEVICE,TYPE device
ens3:ethernet
lo:loopback
```

-p，相当好。

此选项可使 nmcli 生成人类可读的输出。例如，值是一致的，打印标头。

**例 3.3. 以用户友善模式查看输出**

```plaintext
nmcli -p device
=====================
  Status of devices
=====================
DEVICE  TYPE      STATE      CONNECTION
--------------------------------------------------------------
ens3    ethernet  connected  Profile 1
lo      loopback  unmanaged  --
```

Show more

-h, help  -h、 帮助

打印帮助信息.

nmcli 工具有一些内置上下文敏感的帮助：

**nmcli help  nmcli 帮助**

此命令列出可在后续命令中使用的可用选项和对象名称。

**nmcli _对象帮助_**

此命令显示与指定对象相关的可用操作列表。例如：

```plaintext
nmcli c help
```

## [3.3.1. nmcli 示例的简短选择](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-configuring_ip_networking_with_nmcli#sec-Brief_Selection_of_nmcli_Examples) 

**例 3.4.  检查 NetworkManager 的整体状态**

```plaintext
~]$ nmcli general status
STATE      CONNECTIVITY  WIFI-HW  WIFI     WWAN-HW  WWAN
connected  full          enabled  enabled  enabled  enabled
```

在 terse 模式中：

```plaintext
~]$ nmcli -t -f STATE general
connected
```

**例 3.5.  查看 NetworkManager 日志状态**

```plaintext
~]$ nmcli general logging
  LEVEL  DOMAINS
  INFO   PLATFORM,RFKILL,ETHER,WIFI,BT,MB,DHCP4,DHCP6,PPP,WIFI_SCAN,IP4,IP6,A
UTOIP4,DNS,VPN,SHARING,SUPPLICANT,AGENTS,SETTINGS,SUSPEND,CORE,DEVICE,OLPC,
WIMAX,INFINIBAND,FIREWALL,ADSL,BOND,VLAN,BRIDGE,DBUS_PROPS,TEAM,CONCHECK,DC
B,DISPATCH
```

Show less

**例 3.6.  查看所有连接**

```plaintext
~]$ nmcli connection show
  NAME       UUID                                  TYPE      DEVICE
Profile 1  db1060e9-c164-476f-b2b5-caec62dc1b05  ethernet    ens3
ens3       aaf6eb56-73e5-4746-9037-eed42caa8a65  ethernet    --
```

**例 3.7. 仅查看当前活跃的连接**

```plaintext
~]$ nmcli connection show --active
  NAME       UUID                                  TYPE      DEVICE
Profile 1  db1060e9-c164-476f-b2b5-caec62dc1b05  ethernet     ens3
```

**例 3.8. 仅查看 NetworkManager 识别的设备及其状态**

```plaintext
~]$ nmcli device status
DEVICE  TYPE      STATE      CONNECTION
ens3    ethernet  connected  Profile 1
lo      loopback  unmanaged  --
```

您还可以使用以下 nmcli 命令缩写：

表 3.1. 某些 nmcli 命令的缩写

|nmcli 命令|缩写||
|---|---|---|
|nmcli 常规状态|nmcli g   nmcli g 的||
|nmcli 常规日志记录|nmcli g 日志||
|nmcli 连接显示|nmcli con show  <br>NMCLI 显示||
|nmcli connection show --active  <br>NMCLI 连接显示--活动|nmcli con show -a  <br>带有 Show-A 的 NMCLI||
|nmcli 设备状态|nmcli dev   NMCLI 开发||



更多示例请查看 _nmcli-examples(5)_ man page。