etc/sysconfig/network-scripts/ 和 NetworkManager 在 Rocky Linux 中是紧密关联的。它们之间的关系如下：

  

1. **传统网络配置**：

• /etc/sysconfig/network-scripts/ 目录中包含了网络接口的配置文件，文件名通常以 ifcfg-接口名称 命名（如 ifcfg-enp0s3）。

• 这些文件是基于旧的 network-scripts 脚本系统的，用于手动配置网络接口。

• 在较旧的 Linux 发行版中，network-scripts 通常与 network 服务配合使用来管理网络接口。

2. **NetworkManager 的集成**：

• NetworkManager 是现代 Linux 发行版（包括 Rocky Linux）中用于管理网络的主要工具。它可以自动检测和使用 /etc/sysconfig/network-scripts/ 中的配置文件来管理网络接口。

• NetworkManager 在启动时，会读取并应用 ifcfg-* 文件中的配置。如果配置文件中指定了特定的选项，如 NM_CONTROLLED=yes，NetworkManager 就会管理这个接口。

• 如果文件中设置了 NM_CONTROLLED=no，NetworkManager 会忽略该配置，可能需要手动使用 network-scripts 脚本或其他方式管理该接口。

3. **NetworkManager 如何使用这些文件**：

• NetworkManager 可以写入和修改这些 ifcfg-* 文件。如果通过 nmcli 或 nmtui 修改了网络配置，NetworkManager 通常会更新 /etc/sysconfig/network-scripts/ 中的相关文件。

• 同样，如果直接编辑这些配置文件并重启 NetworkManager，配置也会生效。

4. **向后兼容性**：

• NetworkManager 的设计考虑了向后兼容性，确保管理员可以继续使用传统的 ifcfg-* 文件配置网络。

• 不过，在较新的系统中，NetworkManager 提供了更现代和灵活的网络管理方式，支持更复杂的配置如 VPN、Wi-Fi 和多种网络接口聚合。

  

**总结**

  

/etc/sysconfig/network-scripts/ 目录包含的是传统的网络接口配置文件，而 NetworkManager 是一个现代化的网络管理工具，它可以读取和使用这些文件来配置和管理网络接口。两者可以一起工作，提供了一种兼容传统和现代方法的灵活网络管理方式。