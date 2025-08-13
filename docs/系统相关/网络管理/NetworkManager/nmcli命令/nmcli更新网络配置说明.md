## 简介

问：nmcli命令更新网络配置会固化吗，会更新到配置文件吗？

答：是的，**使用 `nmcli` 更新网络配置时，配置会**✅**固化**（即写入磁盘），会自动**📝**更新到 NetworkManager 的配置文件中。

---

## 📌 说明：

### 🔧 操作类型：**修改连接**

例如：

```bash
nmcli connection modify eth0 ipv4.addresses 192.168.1.100/24
nmcli connection modify eth0 ipv4.gateway 192.168.1.1
nmcli connection modify eth0 ipv4.dns "8.8.8.8"
```

这类命令会修改名为 `eth0` 的连接配置，对应的配置文件将被更新。

---

## 📁 文件存储位置：

### CentOS / Oracle Linux / RHEL 等：

-   NetworkManager 的配置通常会同步到：
    
    ```swift
    /etc/sysconfig/network-scripts/ifcfg-<连接名>
    ```
    

例如上面操作后，会看到 `ifcfg-eth0` 文件内容中对应字段被更新。

---

## 💡 实时 vs 固化对比：

| 操作方式 | 是否固化 | 是否写入配置文件 |
| --- | --- | --- |
| `nmcli connection modify ...` | ✅ 是 | ✅ 是 |
| `nmcli device modify ...` | ❌ 否 | ❌ 否（临时生效） |

🔍 **注意**：

-   `nmcli device modify` 是临时修改设备属性，不会写入配置文件，重启后失效。
    
-   `nmcli connection modify` 是推荐方式，能固化配置。
    

---

## ✅ 示例：验证配置是否固化

你可以这样验证：

```bash
nmcli connection show eth0  # 查看当前配置
cat /etc/sysconfig/network-scripts/ifcfg-eth0  # 查看配置文件
```
