

## 一、`systemd-resolved` 是什么

`systemd-resolved` 是 **systemd 提供的本地 DNS 解析守护进程**，用于管理 DNS、DNSSEC、LLMNR、MulticastDNS 等解析功能。它的核心特点：

1.  **Stub Resolver 模式**
    
    -   本地监听 127.0.0.53 端口 ，即本地的53端口（stub resolver）
        
    -   所有系统 DNS 查询都先到 127.0.0.53，再由 `systemd-resolved` 转发到上游 DNS
        
2.  **支持多个网络接口 DNS**
    
    -   不同接口可以使用不同 DNS
        
    -   支持全局 DNS、接口 DNS 优先级、Fallback DNS
        
3.  **集成 DNSSEC 和缓存**
    
    -   支持 DNSSEC 验证
        
    -   缓存负载和解析结果，提高解析效率
        
4.  **兼容现有应用**
    
    -   Linux 上 `/etc/resolv.conf` 默认指向 stub resolver
        
    -   传统应用无需修改即可使用
        

---

## 二、主要配置文件

1.  **全局配置**（可修改）
    
    ```
    /etc/systemd/resolved.conf
    ```
    
    示例：
    
```ini
[Resolve]
DNS=8.8.8.8 1.1.1.1
FallbackDNS=223.5.5.5
Domains=example.com
DNSSEC=no
DNSOverTLS=no
```

1.  **默认配置**（编译自带，不建议修改）
    
```
/usr/lib/systemd/resolved.conf
```
    
2.  **drop-in 配置**（覆盖全局配置，可单独设置某些参数）
    
```
/etc/systemd/resolved.conf.d/*.conf
```
    

## 三、常用命令

### 1\. 查看服务状态


```bash
systemctl status systemd-resolved
```

输出示例：

```
Active: active (running)
Main PID: 123 (systemd-resolve)
```

### 2\. 查看 DNS 配置

```bash
resolvectl status
```

示例输出：

```
Global
       DNS Servers: 8.8.8.8
        DNSSEC: no
Link 2 (eth0)
       Current Scopes: DNS
       LLMNR setting: yes
       MulticastDNS setting: no
       DNS Servers: 8.8.8.8
```

-   **Global DNS Servers** → 全局上游 DNS
    
-   **Link N (接口名)** → 指定接口 DNS
    
-   **Current Scopes** → 当前作用域
    

### 3\. 查询 DNS 信息

```bash
resolvectl query www.google.com
resolvectl query www.baidu.com A
resolvectl query www.example.com AAAA
```

-   可以直接指定上游 DNS：
    

```bash
resolvectl query www.google.com @8.8.8.8
```

### 4\. 启动 / 停止 / 重启服务

```bash
sudo systemctl start systemd-resolved
sudo systemctl stop systemd-resolved
sudo systemctl restart systemd-resolved
sudo systemctl enable systemd-resolved
sudo systemctl disable systemd-resolved
```

### 5\. 临时修改接口 DNS

```bash
resolvectl dns eth0 8.8.8.8 1.1.1.1
resolvectl domain eth0 "~example.com"
```

-   `~example.com` → 指定接口处理特定域名
    

### 6\. 清理缓存

```bash
sudo resolvectl flush-caches
```

### 7\. 检查系统当前解析

```bash
resolvectl status
dig @127.0.0.53 www.google.com
```

---

## 四、常见问题与注意事项

1.  **127.0.0.53 是正常的 stub resolver**，不要直接修改 `/etc/resolv.conf`，改 `/etc/systemd/resolved.conf` 或 drop-in 文件。
    
2.  如果 DNS 解析失败：
    
    -   检查 `systemctl status systemd-resolved` 是否 running
        
    -   检查上游 DNS 是否可达 (`dig @8.8.8.8 www.google.com`)
        
3.  `resolvectl` 是 `systemd-resolved` 的官方工具，用于查看、查询、修改 DNS，不要用 `nslookup` 或 `dig` 直接修改配置。
    
4.  如果要彻底关闭 systemd-resolved 并自己管理 `/etc/resolv.conf`，必须：
    
    ```bash
    sudo systemctl disable --now systemd-resolved
    sudo rm /etc/resolv.conf
    sudo tee /etc/resolv.conf <<EOF
    nameserver 8.8.8.8
    nameserver 1.1.1.1
    EOF
    ```
    