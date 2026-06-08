参考官方：https://docs.openstack.org/install-guide/get-started-conceptual-architecture.html
![](assets/Pasted%20image%2020240801175457.png)

## 架构
Openstack的核心由三大部分构成：计算、网络、存储。而Openstack包含很多个组件，最主要是7个组件：Horizon、Nova、Glance、Keystone、Neutron、Cinder、Swift 每个组件在Openstack中充当什么角色以及各个组件是如何关联的呢，在我看来，虚拟机是中心，其他的组件相互协调，为虚拟机服务
	- 官方的组件说明：[https://www.openstack.org/software/project-navigator/openstack-components](https://www.openstack.org/software/project-navigator/openstack-components)


核心组件：
![](assets/Pasted%20image%2020240731172726.png)


## 节点服务

OpenStack 是一个高度分布式的云计算平台。为了保证系统的高可用性、可扩展性和安全性，OpenStack 将不同的核心功能拆分到了不同类型的节点（物理机或虚拟机）上。

以下是 OpenStack 集群中控制节点、计算节点、网络节点和存储节点的区别，以及它们各自运行的核心服务：

### 1. 控制节点 (Controller Node)

控制节点是整个 OpenStack 集群的“大脑”和管理中枢。它不负责运行用户的虚拟机，而是负责处理所有的 API 请求、调度资源、管理状态以及提供 Web 管理界面。

- **核心职责**：管理集群状态、用户认证、接收和分发 API 请求、虚拟机调度。
    
- **安装的核心服务**：
    
    - **基础环境服务**：MariaDB/MySQL（数据库）、RabbitMQ（消息队列）、Memcached（缓存）。
        
    - **Keystone (身份认证服务)**：负责全组件的用户授权、服务目录管理。
        
    - **Glance (镜像服务)**：提供虚拟机镜像的发现、注册和检索。
        
    - **Nova (计算管理服务)**：安装 `nova-api`、`nova-scheduler`、`nova-conductor`，负责接收创建虚拟机的请求并决定将其分配到哪个计算节点。
        
    - **Neutron (网络管理服务)**：安装 `neutron-server`，处理网络 API 请求。
        
    - **Cinder (块存储管理服务)**：安装 `cinder-api`、`cinder-scheduler`，处理存储卷的创建和调度请求。
        
    - **Horizon (仪表盘服务)**：提供 Web GUI 控制台。
        

---

### 2. 计算节点 (Compute Node)

计算节点是 OpenStack 集群的“苦力”或“工作马”。它们是实际运行用户虚拟机（Instance）的宿主机。计算节点的数量通常是集群中最多的，可以通过增加计算节点来横向扩展集群的计算能力。

- **核心职责**：通过底层 Hypervisor（如 KVM、QEMU）提供 CPU、内存资源，并运行虚拟机；管理虚拟机的生命周期。
    
- **安装的核心服务**：
    
    - **Nova (计算服务)**：安装 `nova-compute`。它负责与底层的 Hypervisor（通常是通过 Libvirt）交互，执行虚拟机的创建、销毁、重启等动作。
        
    - **Neutron (网络代理服务)**：安装网络二层代理（如 `neutron-openvswitch-agent` 或 `neutron-linuxbridge-agent`），负责将虚拟机网卡连接到虚拟网络上。
        

---

### 3. 网络节点 (Network Node)

网络节点负责处理 OpenStack 内部环境与外部网络（如互联网或企业内网）之间的路由和数据交换。

> **注意**：在很多现代的部署架构中，为了节省硬件，网络节点的功能经常被合并到**控制节点**上。但在大规模生产环境中，通常会独立出来以避免网络 I/O 成为瓶颈。

- **核心职责**：提供 DHCP 服务、路由转发（L3）、网络地址转换（NAT/SNAT/DNAT）、以及浮动 IP（公网 IP）的绑定。
    
- **安装的核心服务**：
    
    - **Neutron (网络代理服务)**：
        
        - `neutron-dhcp-agent`：为虚拟机自动分配私网 IP 地址。
            
        - `neutron-l3-agent`：提供虚拟路由器、公网访问和浮动 IP 映射。
            
        - `neutron-metadata-agent`：允许虚拟机在启动时获取自身的元数据（如 SSH 密钥、主机名）。
            
        - 二层代理（如 Open vSwitch Agent）。
            

---

### 4. 存储节点 (Storage Node)

存储节点负责为虚拟机提供持久化的数据存储。如果虚拟机直接使用计算节点的本地磁盘，一旦计算节点宕机，数据可能会丢失；而存储节点提供的是网络共享存储或独立的块存储/对象存储。

- **核心职责**：提供云盘（块存储）、文件共享存储或对象存储服务。
    
- **安装的核心服务**：
    
    - **Cinder (块存储服务)**：安装 `cinder-volume`。负责对接后端的存储设备（如 LVM 本地磁盘阵列、企业级 SAN 存储、或者分布式存储如 Ceph），为虚拟机提供可挂载的虚拟硬盘。
        
    - **Swift (对象存储服务)**：如果需要类似 AWS S3 的存储，会安装 Swift 的对象、容器和账户服务。
        
    - **Manila (共享文件系统)**：如果需要提供 NFS/CIFS 共享目录给虚拟机，会安装 `manila-share` 服务。


### 其他参考：
- https://blog.csdn.net/daydayup8888/article/details/72911635
- https://governance.openstack.org/tc/reference/projects/
- openstack项目代码仓库：https://opendev.org/openstack


