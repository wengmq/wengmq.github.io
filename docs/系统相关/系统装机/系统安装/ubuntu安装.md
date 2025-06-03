
### 登录机器使用 nvme 盘制作启动系统盘：

- ubuntu常用的镜像可以上官网去下载 https://releases.ubuntu.com/ ，常用的有22.04、20.04、18.04 ![](assets/Pasted%20image%2020240712152312.png)
- 有两个版本的注意不要下载桌面版的，下载下面的
- ![](assets/Pasted%20image%2020240712152428.png)
- 下载镜像：wget https://releases.ubuntu.com/focal/ubuntu-20.04.6-live-server-amd64.iso
- 格式化 nvme 盘：mkfs.ext4 /dev/nvme0n1
- 写入到 nvme 盘：dd if=/root/ubuntu-20.04.6-live-server-amd64.iso of=/dev/nvme0n1 bs=100M status=progress
- 后面就是进入 ipmi 选择nvme 盘的 iso 进行重装系统，类似于 本地U 盘重装系统， 不受网络影响，需要设置 boot options
![](assets/Pasted%20image%2020240712151516.png)
![](assets/Pasted%20image%2020240712151531.png)
![](assets/Pasted%20image%2020240712151543.png)


### 语言设置为英文
![](assets/Pasted%20image%2020240712151621.png)

![](assets/Pasted%20image%2020240712151652.png)

### 配置网卡信息：

- 可以按 table 键移动光标向下，配置第一个网卡，选择配置 IPV4 地址，Method 选择 manual 手动
- 配置子网掩码、IPV4 地址、网关、DNS 服务器
- 这里配置错的话ssh 会连接不上，检查下，配置好之后选择 Save
- 选择 Done，继续下一步
![](assets/Pasted%20image%2020240712151709.png)![](assets/Pasted%20image%2020240712151736.png)
![](assets/Pasted%20image%2020240712151752.png)
子网使用CIDR的格式  网关和子网信息需要提前确认清楚
![](assets/Pasted%20image%2020240712151808.png)
![](assets/Pasted%20image%2020240712151916.png)


### 设置引导盘

![](assets/Pasted%20image%2020240712152009.png)

![](assets/Pasted%20image%2020240712152019.png)

### 设置账号密码

![](assets/Pasted%20image%2020240712152042.png)

这里的 Install OpenSSL server 要勾选，再继续
![](assets/Pasted%20image%2020240712152118.png)

这边扫描会比较久，当出现 cancel update and reboot 的时候可以直接选择这个

此时不出意外的话，稍等一会儿，机器就可以使用 ssh 登录上去， 账号密码就是上面设置的
![](assets/Pasted%20image%2020240712152059.png)