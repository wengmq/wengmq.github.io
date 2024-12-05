
## 背景
- rocky系统安装的过程中默认使用了系统分配的LVM分区，现在需要去除LVM中的SWAP分区和/home分区，剩下的系统盘中的空间全部给/根目录
![](assets/Pasted%20image%2020240816133114.png)


操作命令：
```
# 先修改为可以支持root密码登录

sudo vi /etc/ssh/sshd_config

# 修改

PasswordAuthentication no

改成

PasswordAuthentication yes

  

# 修改selinux为宽松模式

sudo vi /etc/selinux/config

# 修改SELINUX=enforcing为：

SELINUX=permissive

  

sudo setenforce 0

  

# 重启ssh

  

sudo systemctl restart sshd

  

# 下面的操作使用root用户执行

ssh root@38.175.45.34 -p 10022

Baishan@2022!@#

  

# 备份home目录配置

# rm -rf /home/

  

# 卸载/home和禁用swap

sudo umount /home

sudo swapoff /dev/mapper/rl-swap

  

# 删除rl-home和rl-swap逻辑卷

sudo lvremove /dev/mapper/rl-home

sudo lvremove /dev/mapper/rl-swap

  

# 扩展rl-root逻辑卷

sudo lvextend -l +100%FREE /dev/mapper/rl-root

  

# 调整文件系统大小

sudo xfs_growfs /dev/rl/root

  

# 更新系统配置文件

sudo vi /etc/fstab

mount -a

  

# 恢复home目录配置

curl -O https://ss.bscstorage.com/bs-images/useradd.sh; chmod +x ./useradd.sh && bash +x ./useradd.sh && port=10022 && firewall-cmd --zone=public --add-port=$port/tcp --permanent && firewall-cmd --reload && firewall-cmd --zone=public --query-port=$port/tcp

  

# 验证配置

df -h

lsblk

  

# 还需要调整grub的配置

sudo vi /etc/default/grub

  

# 注释原本GRUB_CMDLINE_LINUX ，下面新增一行

# GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/rl-swap rd.lvm.lv=rl/root rd.lvm.lv=rl/swap"

GRUB_CMDLINE_LINUX="crashkernel=auto rd.lvm.lv=rl/root"

  

# 生成新的 GRUB 配置：

sudo grub2-mkconfig -o /boot/grub2/grub.cfg

  

# 重新生成 initramfs（可选，但推荐）：

sudo dracut -f

  

# 重启服务器

sudo reboot


```