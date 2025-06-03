
例如，要在 `firewalld` 中放通 `8632` 端口，请执行以下步骤：

### 1️⃣ **开放端口**


```
sudo firewall-cmd --zone=public --add-port=8632/tcp --permanent
```

- `--zone=public`: 使用公共区域，如果你使用的是其他区域请替换。
    
- `--add-port=8632/tcp`: 添加 TCP 协议的 8632 端口，如果要开放UDP端口这边需要改成`--add-port=8632/udp`，如果需要同时开放udp和tcp则需要执行两条这样的命令
    
- `--permanent`: 设置为永久生效（重启后依然生效）。
    

---

### 2️⃣ **重新加载防火墙配置**

```
sudo firewall-cmd --reload
```

---

### 3️⃣ **验证端口是否放通**



```
sudo firewall-cmd --list-ports

```

如果看到 `8632/tcp` 出现在列表中，说明已经成功放通。