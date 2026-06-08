
## 简介

在 OpenStack 环境中，`cloud-init` 是虚拟机（Instance）启动时进行自动化配置（如注入 SSH 密钥、配置网络、设置主机名、运行自定义 User-Data 脚本）的核心工具。

`cloud-init` 与 OpenStack 的交互，本质上就是 **“虚拟机内的 Agent 如何突破隔离，向底层云平台安全地获取属于自己的配置信息”** 的过程。


## 交互模式


在 OpenStack 中，`cloud-init` 使用 `DataSourceOpenStack` 模块，主要通过以下两种核心机制来获取元数据（Metadata）和用户数据（Userdata）

### 1. Metadata Service（网络模式：169.254.169.254）

这是最经典的交互方式。当虚拟机网卡通过 DHCP 获取到 IP 后，`cloud-init` 会向一个特殊的链路本地地址 `http://169.254.169.254` 发起 HTTP GET 请求。

**底层交互链路与原理：**

1. **VM 发起请求:** 虚拟机内的 `cloud-init` 发送请求到 `169.254.169.254:80`。由于这是一个特殊的保留 IP，虚拟机并不知道它在哪，通常会通过默认网关或 DHCP 下发的特殊静态路由发往所在的二层网络。
    
2. **Neutron 命名空间拦截:** 请求到达宿主机或网络节点的 Neutron `qdhcp`（DHCP 命名空间）或 `qrouter`（路由命名空间）。这里配置了 iptables NAT 规则。
    
3. **NAT 转发与代理:** iptables 规则将目标端口 80 的流量重定向到本地监听的一个代理端口（通常是 `neutron-ns-metadata-proxy`，底层由 HAProxy 实现）。
    
4. **Neutron Metadata Agent:** 代理将请求转发给运行在网络节点或计算节点上的 `neutron-metadata-agent`。
    
5. **注入身份标识 (核心机制):** 所有的 VM 请求对 Nova 来说都是从同一个物理机发出的，Nova 怎么知道是谁在请求？`neutron-metadata-agent` 通过查询 Neutron 数据库（根据请求来源的 MAC/IP 匹配），查出这是哪个 VM。然后，Agent 会在 HTTP 请求头中注入 `X-Instance-ID` 和 `X-Tenant-ID` 等 Header，并使用与 Nova 之间预共享的密码（Metadata Secret）进行签名验证。
    
6. **Nova API 返回数据:** 最终请求到达 `nova-api` (或专用的 `nova-metadata-api`)。Nova 根据 Header 中的 Instance ID 从数据库提取该虚拟机的 Hostname、SSH 密钥、User-Data，组装成 JSON 格式返回给 `cloud-init`。

### 2. ConfigDrive（本地块存储模式）

当虚拟机没有网络连接，或者处于纯二层物理网络（Bare Metal / Ironic 场景）、不支持 DHCP 的环境中，`169.254.169.254` 是不可达的。此时 OpenStack 使用 ConfigDrive 进行交互。

**底层交互链路与原理：**

1. **Nova Compute 生成镜像:** 在创建虚拟机时，如果开启了 `config_drive=True`，`nova-compute` 服务会在计算节点本地将该虚拟机的 Metadata 和 Userdata 写入指定目录，并使用 `genisoimage` 或 `mkisofs` 将其打包成一个 ISO 9660 或 VFAT 格式的微型只读文件系统镜像（通常只有几 MB）。
    
2. **Libvirt/KVM 挂载:** `nova-compute` 生成虚拟机的 XML 配置时，会将这个 ISO 镜像作为一个额外的虚拟光驱或块设备（如 `hdc` 或 `vdb`）挂载给虚拟机。这个设备会被强制打上 `config-2` 的 Volume Label。
    
3. **Cloud-init 本地读取:** 虚拟机系统启动时，`cloud-init` 在其 `Local` 启动阶段（网络拉起之前），会扫描系统内带有 `config-2` 标签的块设备（通过 `/dev/disk/by-label/config-2`）。
    
4. **解析配置:** 发现该设备后，`cloud-init` 会将其挂载到临时目录，直接从里面的 `/openstack/latest/meta_data.json` 和 `user_data` 文件中读取配置，从而完成初始化。
    

---

### Cloud-init 视角的启动阶段交互

为了确保在不同环境下都能成功，`cloud-init` 在系统启动时采用了分阶段执行的设计：

- **Local 阶段:** 优先寻找 ConfigDrive。如果在 `/dev/disk/by-label/config-2` 找到了数据，它会立即读取。如果 ConfigDrive 中包含网络配置（network_data.json），它会在这里生成网络配置并重启网络服务。
    
- **Network 阶段:** 网络接口完全 UP 之后（通过 DHCP 或 Local 阶段的静态配置）。此时 `cloud-init` 开始尝试探测网络 Datasource（即轮询 169.254.169.254），获取动态 Metadata。
    
- **Config & Final 阶段:** 数据获取完毕后，执行模块（如写入 authorized_keys、创建用户、运行特定的 Ansible playbooks 或 bash 脚本）。

## 关闭虚拟机的cloud-init的服务的影响

简单来说：**对当前已经配置完成并正常运行的云主机几乎没有影响，甚至能稍微加快重启速度；但会导致该主机失去与底层云平台（如 OpenStack）的联动能力，并在后续的扩容、制作镜像等运维场景中产生严重隐患。**

作为运维/系统工程师，在决定关闭或删除 `cloud-init` 之前，你需要评估以下几个核心层面的影响：

### 1. 对当前系统的直接影响（几乎无影响）

- **已注入的配置永久生效：** `cloud-init` 成功运行一次后，你的密码、注入的 SSH 公钥（已经写入 `~/.ssh/authorized_keys`）、主机名（已写入 `/etc/hostname`）和网络配置（已写入 Netplan 或 Network-Scripts）都已经固化在本地磁盘上。
    
- **系统依然可以正常重启：** 删除服务后，系统重启时跳过了元数据拉取和配置阶段，开机速度通常会变快几秒到十几秒。
    

### 2. 失去与云平台的联动能力（管控失效）

删除 `cloud-init` 意味着切断了虚拟机内部 Agent 与 OpenStack Nova/Neutron 之间的通信桥梁。

- **无法通过控制台重置密码/密钥：** 如果你忘记了密码，试图在 OpenStack 控制面板或通过 API 发起“重置密码”或“注入新 SSH 密钥”的操作，指令会下发，但虚拟机内部没有 `cloud-init` 去执行替换动作，导致操作无效。
    
- **User-Data 和 Metadata 变更失效：** 如果你修改了虚拟机的 Metadata 标签，或者希望在下次重启时运行新的 User-Data 脚本，虚拟机将无法感知和执行。
    

### 3. 运维生命周期的严重隐患（核心风险点）

这是在生产环境中极不推荐直接删除 `cloud-init` 的主要原因：

- **云主机变配（Resize）后无法自动扩容磁盘：** OpenStack 的 Flavor 变更（例如系统盘从 40G 扩容到 100G）底层只是调整了块设备的大小。`cloud-init` 包含 `growpart` 和 `resizefs` 模块，会在开机时自动把分区和文件系统扩容到 100G。如果删除了它，变配后你登录系统会发现文件系统依然是 40G，必须手动执行 `fdisk/parted` 和 `resize2fs/xfs_growfs`。
    
- **制作自定义镜像（Snapshot/Image）的灾难：** 如果你基于这台删除了 `cloud-init` 的虚拟机打了一个镜像（Image），然后用这个镜像去批量创建新的云主机，**新创建的云主机将全部处于“失联”状态**。因为新主机启动时没有 `cloud-init` 去拉取新的 IP、新的主机名和新的 SSH 密钥，它们会完全克隆老主机的配置（包括 MAC 地址绑定的网卡信息），导致网络不通且无法登录。




