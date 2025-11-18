
## 1. 安装编译工具

```
yum -y install wget openssl-devel gcc make python-devel openssl-devel kernel-devel kernel-debug-devel autoconf automake rpm-build redhat-rpm-config libtool
```

## 2. 编译环境准备

### 创建编译用户
```
adduser ovs
su - ovs
```

### 创建编译目录，下载openvswitch源码包
```
$mkdir -p ~/rpmbuild/SOURCES
$wget http://openvswitch.org/releases/openvswitch-2.5.0.tar.gz
```
### 准备编译环境
```
$cp openvswitch-2.5.0.tar.gz ~/rpmbuild/SOURCES/
$tar xfz openvswitch-2.5.0.tar.gz
$ sed 's/openvswitch-kmod, //g' openvswitch-2.5.0/rhel/openvswitch.spec > openvswitch-2.5.0/rhel/openvswitch_no_kmod.spec
$rpmbuild -bb --nocheck ~/openvswitch-2.5.0/rhel/openvswitch_no_kmod.spec
$exit
```

## 安装openvswitch

```
#yum localinstall /home/ovs/rpmbuild/RPMS/x86_64/openvswitch-2.5.0-1.x86_64.rpm
```
### 验证安装
```
# ovs-vsctl -V
ovs-vsctl (Open vSwitch) 2.5.0
Compiled Apr 13 2016 06:52:00
DB Schema 7.12.1

```

启动 openvswitch

```
#systemctl start openvswitch.service
#chkconfig openvswitch on  

```
查看服务状态

```
systemctl -l status openvswitch.service
```