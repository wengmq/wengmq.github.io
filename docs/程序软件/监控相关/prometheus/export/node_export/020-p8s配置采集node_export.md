

## 一、基本配置方法

以默认 `node_exporter` 监听 `9100` 端口为例：

### 🔧 编辑 `prometheus.yml`

```yaml
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
```

如果你采集的是其他机器的 `node_exporter`，只需要将 `localhost` 替换成对应 IP 或主机名，例如：

```yaml
- targets: ['192.168.1.100:9100', '192.168.1.101:9100']
```

---

## 二、支持标签（可选）

可以加上标签标识来源机器：

```yaml
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['192.168.1.100:9100']
        labels:
          instance: 'node-1'
      - targets: ['192.168.1.101:9100']
        labels:
          instance: 'node-2'
```

---

## 三、Prometheus 重新加载配置

1.  **方式一：重启 Prometheus 服务**
    

```bash
sudo systemctl restart prometheus
```

2.  **方式二：热加载配置**
    

如果启用了 web 管理 API（`--web.enable-lifecycle`），可以通过 HTTP 触发配置热加载：

```bash
curl -X POST http://localhost:9090/-/reload
```

---

## 四、验证是否成功采集

打开 Prometheus Web UI：`http://<your-prometheus-ip>:9090`

-   在 **"Targets"** 页面查看是否采集成功：
    
    -   浏览器访问：`http://localhost:9090/targets`
        
-   也可以直接在 Prometheus 的搜索栏中输入：
    
    ```text
    node_cpu_seconds_total
    ```
    
- 查看是否有数据返回。
    