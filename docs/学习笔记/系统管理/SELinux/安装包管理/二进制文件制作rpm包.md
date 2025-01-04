
## 背景
- 将二进制文件制作为RPM包，并且加入systemctl的管理
- 这边使用IPMI_export为例：https://github.com/prometheus-community/ipmi_exporter
	- 请提前根据官网文档编译对应的二进制文件（AMD64系统）
- 制作的RPM只针对AMD64系统

## 制作RPM包

以下是创建 RPM 包并自动将程序加入 `systemctl` 管理的流程，假设你的 IPMI export 程序已经编译为二进制文件 `ipmi_exporter`：

---

### 1. 准备环境

确保已安装以下工具：

- `rpm-build`
- `rpmbuild`
- `systemd`（用于创建服务文件）

安装命令：

`sudo yum install rpm-build`

---

### 2. 创建 RPM 构建目录结构

在你的主目录下创建 RPM 构建目录结构：

bash

复制代码

`mkdir -p ~/rpmbuild/{BUILD,RPMS,SOURCES,SPECS,SRPMS}`

---

### 3. 准备文件

将你的二进制文件 `ipmi_exporter` 放在 `~/rpmbuild/SOURCES` 目录中。

---

### 4. 创建 systemd 服务文件

在 `~/rpmbuild/SOURCES` 中创建 `ipmi_exporter.service` 文件，内容如下：


```
[Unit]
Description=IPMI Exporter Service
After=network.target

[Service]
ExecStart=/usr/bin/ipmi_exporter --web.listen-address=:9289
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
```

---

### 5. 创建 SPEC 文件

在 `~/rpmbuild/SPECS` 目录中创建 `ipmi_exporter.spec` 文件，内容如下：

```
Name:           ipmi_exporter
Version:        1.0
Release:        1%{?dist}
Summary:        IPMI Exporter for Prometheus

License:        GPL
URL:            https://example.com
Source0:        ipmi_exporter
Source1:        ipmi_exporter.service
Source2:        ipmi_local.yml

BuildArch:      x86_64
Requires(post): systemd
Requires(preun): systemd
Requires(postun): systemd

%description
IPMI Exporter collects IPMI metrics and exposes them to Prometheus.

%prep
# Install freeipmi package as a dependency
sudo yum install -y freeipmi


%build

%install
# Create installation directories
mkdir -p %{buildroot}/etc
mkdir -p %{buildroot}/usr/bin
mkdir -p %{buildroot}/usr/lib/systemd/system

# Install config file
install -m 0644 %{SOURCE2} %{buildroot}/etc/

# Install the binary
install -m 0755 %{SOURCE0} %{buildroot}/usr/bin/ipmi_exporter

# Install the systemd service file
install -m 0644 %{SOURCE1} %{buildroot}/usr/lib/systemd/system/ipmi_exporter.service

%post
# Reload systemd and enable the service
%systemd_post ipmi_exporter.service

%preun
# Stop and disable the service
%systemd_preun ipmi_exporter.service

%postun
# Reload systemd
%systemd_postun ipmi_exporter.service

%files
/usr/bin/ipmi_exporter
/usr/lib/systemd/system/ipmi_exporter.service

%config(noreplace) /etc/ipmi_local.yml

%changelog
* Tue Dec 24 2024 Your Name <yourname@example.com> - 1.0-1
- Initial RPM release

```


---

### 6. ipmi export配置文件

生成配置文件配置监听9289端口：

`vi ~/rpmbuild/SOURCES/ipmi_local.yml

加入下面内容：
```
# Configuration file for ipmi_exporter

# This is an example config for scraping the local host.
# In most cases, this should work without using a config file at all, but here
# are some examples of things that can be customized. If you require privilege
# elevation to get the local metrics, see the `ipmi_local_sudo.yml` example.
modules:
  default:
    # Available collectors are bmc, bmc-watchdog, ipmi, chassis, dcmi, sel, sel-events and sm-lan-mode
    collectors:
      - bmc
      # - bmc-watchdog
      - ipmi
      - chassis
      - dcmi
      - sel
      - sel-events
      - sm-lan-mode
    # Got any sensors you don't care about? Add them here.
    # exclude_sensor_ids:
    #  - 2
    #  - 29
    #  - 32
    # Define custom metrics for SEL entries
    # sel_events:
      # - name: correctable_memory_error
       # regex: Correctable memory error.*
```

---

### 7. 构建 RPM 包

运行以下命令以构建 RPM 包：

`rpmbuild -ba ~/rpmbuild/SPECS/ipmi_exporter.spec`

构建成功后，RPM 包会出现在 `~/rpmbuild/RPMS/x86_64/` 目录中。

---

### 8. 安装 RPM 包

将 RPM 包安装到目标服务器并测试：

`sudo rpm -ivh ~/rpmbuild/RPMS/x86_64/ipmi_exporter-1.0-1.el7.x86_64.rpm

安装完成后，程序会自动加入 `systemctl` 管理并启动。

---

### 9. 验证

1. 查看服务状态：
    
    `systemctl status ipmi_exporter`
    
2. 服务开机启动：
	`systemctl start ipmi_exporter`
    `systemctl enable ipmi_exporter`
    

---

通过以上步骤，你可以创建一个完整的 RPM 包，将二进制文件和服务配置文件打包，并确保程序能通过 `systemctl` 管理和启动。