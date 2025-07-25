## 简介
- 参考官方文档：[https://n9e.github.io/zh/docs/install/binary/](https://n9e.github.io/zh/docs/install/binary/)
- https://flashcat.cloud/docs/content/flashcat-monitor/nightingale-v7/introduction/

## 下载

从 [GitHub](https://github.com/ccfos/nightingale/releases) 下载最新版本，然后你会得到一个类似 `n9e-${version}-linux-amd64.tar.gz` 的压缩包。这是 X86 CPU 架构的发布包，如果你需要 ARM 架构的就下载那个 arm64 的包，没有提供 Windows 版本的发布包，因为夜莺监控是一个服务端项目，通常运行在 Linux 系统上。

如果你想在 Windows 和 Mac 上运行夜莺也是 OK 的，只是需要你自行编译了，编译也比较简单，可以参考项目代码仓库下的 `Makefile` 文件内的逻辑。

将下载的压缩包解压缩到 `/opt/n9e` 目录下。

```bash
mkdir /opt/n9e && tar zxvf n9e-${version}-linux-amd64.tar.gz -C /opt/n9e
```


## 安装
- 推荐下载压缩包后解压直接通过sysytemd进行管理
```
[Unit]
Description=Nightingale Monitoring Service
After=network.target
[Service]
Type=simple
ExecStart=/opt/n9e/n9e
WorkingDirectory=/opt/n9e
Restart=always
RestartSec=5
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=n9e
[Install]
WantedBy=multi-user.target
```

将上述内容保存为 `/etc/systemd/system/n9e.service`，然后执行以下命令：

```bash
## 设置夜莺进程开机自启动
sudo systemctl enable n9e

## 启动夜莺进程
sudo systemctl start n9e
```

### 登录 [](https://n9e.github.io/zh/docs/install/binary/#%e7%99%bb%e5%bd%95-1)

打开浏览器访问 [http://localhost:17000](http://localhost:17000/)。默认用户名是 `root`，默认密码是 `root.2020`。

> 请把 localhost 替换成你的服务器 IP 地址。