## 简介
[Prometheus Exporters](https://cloud-atlas.readthedocs.io/zh-cn/latest/kubernetes/monitor/prometheus/prometheus_exporters/index.html#prometheus-exporters) 有一个官方 `ipmi_exporter` 可以基于 [IPMI](https://cloud-atlas.readthedocs.io/zh-cn/latest/linux/server/ipmi/index.html#ipmi) 输出 [Metrics](https://cloud-atlas.readthedocs.io/zh-cn/latest/kubernetes/monitor/metrics/index.html#metrics) 。并且有一个非常完美的 [Grafana通用可视分析平台](https://cloud-atlas.readthedocs.io/zh-cn/latest/kubernetes/monitor/grafana/index.html#grafana) [Grafana Dashboard 15765: IPMI Exporter](https://grafana.com/grafana/dashboards/15765-ipmi-exporter/) 。这样可以用来监控大规模服务器集群，并且生成告警。

`ipmi_exporter` 输出本地IPMI metrics到标准的 `/metrics` ，无需特殊配置。对于远程metrics，通用配置方法非常类似 [Blackbox Exporter](https://cloud-atlas.readthedocs.io/zh-cn/latest/kubernetes/monitor/prometheus/prometheus_exporters/blackbox_exporter.html#blackbox-exporter) (黑盒测试HTTP,HTTPS,DNS,TCP,ICMP和gRPC)，只需要简单使用 `target` 和 `module` URL参数告知IPMI设备入口即可。可以对数以千计的IPMI设备进行metrics输出。

对于本地ipmi无需密码账号，对于远程ipmi，则要提供IPMI设备的用户名和密码。此外，还提供了一个 `blacklist` 屏蔽掉 FreeIPMI 不支持的特殊OEM传感器。

- 参考：
	- https://cloud-atlas.readthedocs.io/zh-cn/latest/kubernetes/monitor/prometheus/prometheus_exporters/ipmi_exporter.html


## 安装IPMI export

- 需要先安装go环境和git工具（过程忽略）
- 下载IPMI export仓库：
	- git clone https://github.com/prometheus-community/ipmi_exporter.git
- 安装README进行编译二进制文件
- 启动docker容器：
	- 可以从看下Dockerfile和
	- 需要把编译好的二进制文件 .build/${OS}-${ARCH}/ipmi_exporter
		- amd64 linux系统通常在.build/linux-amd64/
	- 修改docker-compose.yml
```
# version: '3.7'
services:
  ipmi_exporter:
    build:
      context: .
    command: --config.file /config.yml
    volumes:
      - ./ipmi_local.yml:/config.yml:ro    # replace with your own config
    ports:
      - 9289:9290                           # bind on 0.0.0.0
      # - 127.0.0.1:9290:9290               # or bind to specific interface
    hostname: ipmi_exporter_docker
    restart: always
    user: root
    privileged: true
```
	- 修改./ipmi_local.yml
```
modules:
  default:
    collectors:
      - bmc
      - bmc-watchdog
      - ipmi
      - chassis
      - dcmi
      - sel
      - sel-events
      - sm-lan-mode
    sel_events:
      - name: correctable_memory_error
        regex: Correctable memory error.*
```


- 启动容器IPMI export：
```
docker compose -f ./docker-compose.yml up -d
```



## 加入prometheus

- prometheus安装：
	- docker run -d -p 9090:9090 -it prom/prometheus
- 修改prometheus配置/etc/prometheus/prometheus.yml
	- 加入配置(替换成自己的IP)
```
  - job_name: "ipmi_export"
    static_configs:
      - targets: ["38.175.45.22:9289"]
```

- 重启prometheus容器
- 验证指标采集：
	- curl -s 'http://localhost:9090/api/v1/label/__name__/values' 2>&1|jq .|grep ipmi
```
[root@localhost ipmi_exporter]# curl -s 'http://localhost:9090/api/v1/label/__name__/values' 2>&1|jq .|grep ipmi
    "ipmi_bmc_info",
    "ipmi_bmc_watchdog_current_countdown_seconds",
    "ipmi_bmc_watchdog_initial_countdown_seconds",
    "ipmi_bmc_watchdog_logging_state",
    "ipmi_bmc_watchdog_pretimeout_interrupt_state",
    "ipmi_bmc_watchdog_pretimeout_interval_seconds",
    "ipmi_bmc_watchdog_timeout_action_state",
    "ipmi_bmc_watchdog_timer_state",
    "ipmi_bmc_watchdog_timer_use_state",
    "ipmi_chassis_cooling_fault_state",
    "ipmi_chassis_drive_fault_state",
    "ipmi_chassis_power_state",
    "ipmi_dcmi_power_consumption_watts",
    "ipmi_exporter_build_info",
    "ipmi_fan_speed",
    "ipmi_fan_speed_rpm",
    "ipmi_fan_speed_state",
    "ipmi_power_state",
    "ipmi_power_supply_status",
    "ipmi_power_watts",
    "ipmi_scrape_duration_seconds",
    "ipmi_sel_events_count_by_name",
    "ipmi_sel_events_count_by_state",
    "ipmi_sel_events_latest_timestamp",
    "ipmi_sel_free_space_bytes",
    "ipmi_sel_logs_count",
    "ipmi_sensor_state",
    "ipmi_sensor_value",
    "ipmi_temperature_celsius",
    "ipmi_temperature_state",
    "ipmi_temperatures",
    "ipmi_up",
    "ipmi_voltage_state",
    "ipmi_voltage_volts",
    "ipmi_voltages",
```
- 可以访问localhost:9090进入prometheus页面


## grafana展示

- grafana 部署:
	- docker run -d -p 3000:3000 -it grafana/grafana
- 访问$ip:3000 即可进入grafan的web页面，默认登录 admin/admin
	- 【connection】-> 【Data source】中添加你的promethues
- grafana社区对于ipmi export 有个默认的dashboard，参考：
	- https://grafana.com/grafana/dashboards/15765-ipmi-exporter/
- 导入dashboard
	- 复制其dashboard ID ，在【Dashboard】-> 【import】中输入即可导入
- 可以查看官方的示例：
	- https://grafana.com/api/dashboards/15765/images/11665/image

