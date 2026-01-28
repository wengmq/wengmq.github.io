参考官方：https://docs.openstack.org/install-guide/get-started-conceptual-architecture.html
![](assets/Pasted%20image%2020240801175457.png)

## 架构
Openstack的核心由三大部分构成：计算、网络、存储。而Openstack包含很多个组件，最主要是7个组件：Horizon、Nova、Glance、Keystone、Neutron、Cinder、Swift 每个组件在Openstack中充当什么角色以及各个组件是如何关联的呢，在我看来，虚拟机是中心，其他的组件相互协调，为虚拟机服务
	- 官方的组件说明：[https://www.openstack.org/software/project-navigator/openstack-components](https://www.openstack.org/software/project-navigator/openstack-components)


核心组件：
![](assets/Pasted%20image%2020240731172726.png)
## 组件说明
- Horizon是操作面板，其他组件的信息都可以通过操作面板进行或许和设置，跟我们的WINDOWS的界面很像。
- Keystone是认证服务，其他所有组件的信息流动都要靠它来进行分析和决策。
#### 1.1 计算服务
- Nova虚拟机声明周期的管理，可以创建、管理虚拟机。
创建完虚拟机，得需要操作系统吧，这活儿就有Glance完成。
- Glance提供镜像管理服务，相当于为虚拟机增加了操作系统。
所以，Nova和Glance有配合，并都直接与VM连接。
- Ceilometer提供监控服务（可选），它就像有个漏斗，能把Openstack内部发生的所有的事件收集起来，然后为计费和监控以及其他程序提供数据支撑。
#### 1.2 网络服务
- Neutron提供网络服务，用于外部网络以及各组件之间的网络连接。
#### 1.3 存储服务
- Cinder块存储，可以理解为虚拟的磁盘，可实现挂载，基于文件系统的存储。
- Swift对象存储，文件可以看成是对象，以块为基本单元，传输过程中不存在打包和解包的过程，因此会实现更高速率的传输。




### 其他参考：
- https://blog.csdn.net/daydayup8888/article/details/72911635
- https://governance.openstack.org/tc/reference/projects/
- openstack项目代码仓库：https://opendev.org/openstack


