
- 官方地址：[https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/getting_started_with_networkmanager](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/getting_started_with_networkmanager)
- 官方在线pdf：[https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/pdf/networking_guide/Red_Hat_Enterprise_Linux-7-Networking_Guide-zh-CN.pdf](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/pdf/networking_guide/Red_Hat_Enterprise_Linux-7-Networking_Guide-zh-CN.pdf)

------------
## [NetworkManager 概述](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/getting_started_with_networkmanager#sec-Overview_of_NetworkManager) 

- 在 Red Hat Enterprise Linux 7 中，默认网络服务由 NetworkManager 提供，后者是一个动态网络控制和配置守护进程，在网络设备和连接可用时保持启动和激活。传统的 `ifcfg` 类型配置文件仍受支持。如需更多信息，请参阅 [“将 NetworkManager 与网络脚本搭配使用”](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-Using_NetworkManager_with_Network_Scripts "2.6. 将 NetworkManager 与网络脚本搭配使用")。

### [使用 NetworkManager 的好处](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/getting_started_with_networkmanager#sec-Benefits_of_Using_NetworkManager) 

使用 NetworkManager 的主要优点是：

- 更轻松地进行网络配置： NetworkManager 确保网络连接正常工作。当发现系统中没有网络配置但存在网络设备时，NetworkManager 会创建临时连接以提供连接。
    
- 提供与用户的简单连接设置：NetworkManager 通过不同的工具（GUI、nmtui、nmcli - ）提供管理。请参阅 [第 2.5 节 “NetworkManager 工具”](https://docs.redhat.com/zh-cn/documentation/red_hat_enterprise_linux/7/html/networking_guide/sec-NetworkManager_Tools "2.5. NetworkManager 工具")。
    
- 支持配置灵活性。例如：配置 WiFi 接口，NetworkManager 会扫描并显示可用的 wifi 网络。您可以选择一个接口，NetworkManager 会显示在重启过程后提供自动连接所需的凭证。NetworkManager 可以配置网络别名、IP 地址、静态路由、DNS 信息和 VPN 连接，以及许多特定于连接的参数。您可以修改配置选项以反应您的需要。
    
- 通过 D-Bus 提供 API，允许应用程序查询和控制网络配置和状态。这样，应用程序可以通过 D-BUS 检查或配置网络。例如，通过 `Web` 浏览器监控和配置服务器的 Web 控制台界面使用 NetworkManager D-BUS 接口来配置网络。
    
- 重启过程后保持设备状态，并接管在重启过程中将其设定为受管模式的接口。
    
- 处理没有被显式设置但由用户或者其他网络设备手动控制的设备。