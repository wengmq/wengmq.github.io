## 需求背景

- 在centos7.9物理机上进行kvm虚拟化，创建一台4C4G 50G系统盘的centos7.9虚拟机


## 命令执行

```bash

# 查看机器是否支持 KVM
if ! egrep -q '(vmx|svm)' /proc/cpuinfo ; then
    echo "KVM is not supported on this system."
    exit 1
else
    echo "KVM is supported on this system."
fi


## 关闭selinux
setenforce 0
sed -i 's/SELINUX=enforcing/SELINUX=disabled/g' /etc/selinux/config

# 更新yum源
curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo;yum clean all;yum makecache


## 安装 KVM 和依赖组件
sudo yum install -y qemu-kvm libvirt virt-install bridge-utils virt-manager
sudo systemctl start libvirtd
sudo systemctl enable libvirtd

# 修改libvirtd权限
sed -i 's/#user = "root"/user = "root"/g' /etc/libvirt/qemu.conf
sed -i 's/#group = "root"/group = "root"/g' /etc/libvirt/qemu.conf
systemctl restart libvirtd


# 安装openvswitch
### # yum install openvswitch -y 可能找不到对应的rpm包 需要自己手动编译一个rpm包
### https://www.cnblogs.com/prolion/p/10867553.html 可以参考这个
### 我这边自己已经编译好一个了
curl -O https://ss.bscstorage.com/bms/openvswitch-2.5.0-1.x86_64.rpm
yum install ./openvswitch-2.5.0-1.x86_64.rpm -y
systemctl start openvswitch.service
systemctl enable openvswitch.service
/sbin/chkconfig openvswitch on

# 配置网桥（公网配置再网桥上）
nic="bond0" # 这里需要根据实际使用的公网网卡情况修改网卡名称

# 创建网桥
ip_config=$(cat /etc/sysconfig/network-scripts/ifcfg-$nic|egrep 'IPADDR=|GATEWAY=|NETMASK=|PREFIX')
cat>> /etc/sysconfig/network-scripts/ifcfg-br-kvm << EOF
DEVICE=br-kvm
STP=yes
BOOTPROTO=none
ONBOOT=yes
TYPE=OVSBridge
DEVICETYPE=ovs
NAME="br-kvm"
$ip_config
EOF

# 原来网卡走桥接配置
sed -i 's/IPADDR/#IPADDR/g' /etc/sysconfig/network-scripts/ifcfg-$nic
sed -i 's/GATEWAY/#GATEWAY/g' /etc/sysconfig/network-scripts/ifcfg-$nic
sed -i 's/NETMASK/#NETMASK/g' /etc/sysconfig/network-scripts/ifcfg-$nic
sed -i 's/PREFIX/#PREFIX/g' /etc/sysconfig/network-scripts/ifcfg-$nic
cat <<EOF >> /etc/sysconfig/network-scripts/ifcfg-$nic
TYPE=OVSPort
DEVICETYPE=ovs
OVS_BRIDGE="br-kvm"
EOF


# 下载云镜像
# ubuntu地址：https://cloud-images.ubuntu.com/
### centos地址：https://cloud.centos.org/centos/7/images/
### debian地址（9/10）：http://cdimage.debian.org/cdimage/openstack/
# 我这边使用的是官方的centos7.9的云镜像，这里/kvm0/iso/CentOS-7.9-huawei-system50G.qcow2 是你的云镜像的位置
curl -o /kvm0/iso/CentOS-7.9-huawei-system50G.qcow2 https://cloud.centos.org/centos/7/images/CentOS-7-x86_64-GenericCloud-2009.qcow2


# 官网下载的云镜像默认是密钥登录，比较麻烦，我们直接设置密码登录
sudo virt-customize -a /kvm0/iso/CentOS-7.9-huawei-system50G.qcow2 --root-password password:123456

# 云镜像大小扩容
qemu-img info /kvm0/iso/CentOS-7.9-huawei-system50G.qcow2
qemu-img resize /kvm0/iso/CentOS-7.9-huawei-system50G.qcow2 +50G

# 创建云主机 例如这边创建4G内存、4核CPU、50G磁盘的云主机
virt-install \
--name huawei-vm-1 \
--memory 4096 \
--vcpus 4 \
--disk path=/kvm0/iso/CentOS-7.9-huawei-system50G.qcow2,format=qcow2,bus=virtio \
--import \
--network bridge=br-kvm,virtualport_type=openvswitch,model=virtio \
--os-type linux \
--os-variant centos7.0 \
--noautoconsole


# 进去系统 root/123456
virsh console huawei-vm-1

# 启动虚拟机并登录后执行，扩容磁盘
sudo growpart /dev/vda 1         # 扩展分区
sudo xfs_growfs /                # 默认 CentOS 7+ 是 xfs 或 对于ext4文件系统： sudo resize2fs /dev/vda1

# 其他就是安装自己的需求配置ssh、网络等。
```