## 背景
- 云主机的默认的网卡名称有些可能是eno1、eno2，现在需要修为改为:
	- 公网网卡使用eth1
	- 内网网卡名称使用eth0
- 操作环境：
	- 系统：debian11 云主机

## 操作

###  1.修改GRUB


- 修改grub文件
```
sudo vi /etc/default/grub
```

- 找到GRUB_CMDLINE_LINUX这一行，后面加下面的参数这个和前面的参数空格隔开
```
net.ifnames=0 biosdevname=0
```
  ![](assets/Pasted%20image%2020250813110320.png)

- 更新 GRUB
	- 对于 BIOS 启动：（大部分ECS执行下面这边步即），对于 UEFI 启动（部分机器）sudo grub-mkconfig -o /boot/efi/EFI/debian/grub.cfg
```
sudo update-grub
```


### 2.修改 systemd udev

- 首先确认不同网卡对应的mac地址
```
ip a
```

- 修改udev 规则文件
```
sudo vi /etc/udev/rules.d/70-persistent-net.rules
```

- 修改mac对应的NAME即可，例如
```
SUBSYSTEM=="net", ACTION=="add", ATTR{address}=="00:0c:29:1e:xx:xx", NAME="eth0"
```

- 3. 重建 initramfs（可选，但推荐）
```
sudo update-initramfs -u
```


### 3. 修改网络配置

- 修改为网络配置中的网卡名称，例如：
```
sudo vi /etc/network/interfaces.d/50-cloud-init
```

- 例如：
![](assets/Pasted%20image%2020250813111507.png)

### 4. 重启机器

```
sudo reboot
```