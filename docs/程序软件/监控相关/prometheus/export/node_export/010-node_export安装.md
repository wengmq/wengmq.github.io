
## 一、下载并安装 node\_exporter

1.  **前往 Prometheus 官网下载地址：**

```bash
https://prometheus.io/download/#node_exporter
```
    
    选择你需要的版本。例如：
    
```bash
wget https://github.com/prometheus/node_exporter/releases/download/v1.8.1/node_exporter-1.8.1.linux-amd64.tar.gz
```
    
2.  **解压并移动到系统目录：**
    
```bash
tar -xvf node_exporter-1.8.1.linux-amd64.tar.gz
cd node_exporter-1.8.1.linux-amd64
sudo mv node_exporter /usr/local/bin/
```
    
3.  **检查是否可以正常运行：**
    
```bash
/usr/local/bin/node_exporter --version
```
    

---

## 二、创建 systemd 管理配置

1.  **创建 `node_exporter` 用户（可选）：**
    
```bash
sudo useradd -rs /bin/false node_exporter
```
    
2.  **创建 systemd 服务文件：**
    
```bash
sudo tee /etc/systemd/system/node_exporter.service > /dev/null <<EOF
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

```

---
## 三、启动并设置开机自启

```bash
# 重新加载 systemd
sudo systemctl daemon-reexec
sudo systemctl daemon-reload

# 启动服务
sudo systemctl start node_exporter

# 设置开机启动
sudo systemctl enable node_exporter

# 查看状态
sudo systemctl status node_exporter
```

## 四、验证是否运行成功

```bash
curl http://localhost:9100/metrics
```
默认端口是 `9100`，可在浏览器或 Prometheus 中配置访问该节点指标。