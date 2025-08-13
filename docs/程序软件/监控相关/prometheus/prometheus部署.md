
## 容器部署

- 将本地9090端口映射到容器的9090
```bash
docker run -d -p 9090:9090 -it prom/prometheus
```
- 可以直接访问http://$ip:9090进入IPMI界面



- 给prometheus配置Basic Auth 配置Basic Auth可以防止其他外部恶意请求

```
# 进入容器
docker exec -it relaxed_fermat sh

# 修改容器内配置文件
/prometheus $ vi /etc/prometheus/prometheus.yml

#退出容器后重启容器
docker restart relaxed_fermat

```

- /etc/prometheus/prometheus.yml 中scrape_configs加入下内容 （和static_configs同级）
```
    basic_auth:
      username: 'your-username'
      password: 'your-password'
```


## 二进制部署

- 参考：[https://flashcat.cloud/docs/content/flashcat-monitor/nightingale-v7/install/prometheus/](https://flashcat.cloud/docs/content/flashcat-monitor/nightingale-v7/install/prometheus/)
- ⬇️面是一段小脚本，用于安装 Prometheus，供参考：

```bash
version=2.45.3
filename=prometheus-${version}.linux-amd64
mkdir -p /opt/prometheus
wget https://github.com/prometheus/prometheus/releases/download/v${version}/${filename}.tar.gz
tar xf ${filename}.tar.gz
cp -far ${filename}/*  /opt/prometheus/

# service 
cat <<EOF >/etc/systemd/system/prometheus.service
[Unit]
Description="prometheus"
Documentation=https://prometheus.io/
After=network.target

[Service]
Type=simple

ExecStart=/opt/prometheus/prometheus --config.file=/opt/prometheus/prometheus.yml --storage.tsdb.path=/opt/prometheus/data --web.enable-lifecycle --web.enable-remote-write-receiver

Restart=on-failure
SuccessExitStatus=0
LimitNOFILE=65536
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=prometheus


[Install]
WantedBy=multi-user.target
EOF

systemctl enable prometheus
systemctl restart prometheus
systemctl status prometheus
```