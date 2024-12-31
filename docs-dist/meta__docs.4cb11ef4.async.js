"use strict";(self.webpackChunkwengmq=self.webpackChunkwengmq||[]).push([[904],{60810:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(25223),a={}},11171:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(68537),a={}},60339:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(1939),a={}},97241:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(70527),a={}},25629:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(84327),a={}},34429:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(13303),a={}},38453:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(7057),a={}},39576:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(6874),a={}},72509:function(o,t,n){n.r(t),n.d(t,{demos:function(){return a}});var e=n(67294),d=n(26079),a={}},87799:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(25223);const d=[{value:"This is a guide example.",paraId:0}]},51446:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(68537);const d=[{value:"wengmq",paraId:0}]},36571:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(1939);const d=[{value:`rocky\u7CFB\u7EDF\u5B89\u88C5\u7684\u8FC7\u7A0B\u4E2D\u9ED8\u8BA4\u4F7F\u7528\u4E86\u7CFB\u7EDF\u5206\u914D\u7684LVM\u5206\u533A\uFF0C\u73B0\u5728\u9700\u8981\u53BB\u9664LVM\u4E2D\u7684SWAP\u5206\u533A\u548C/home\u5206\u533A\uFF0C\u5269\u4E0B\u7684\u7CFB\u7EDF\u76D8\u4E2D\u7684\u7A7A\u95F4\u5168\u90E8\u7ED9/\u6839\u76EE\u5F55
`,paraId:0,tocIndex:0},{value:`\u64CD\u4F5C\u547D\u4EE4\uFF1A
`,paraId:1,tocIndex:0},{value:`# \u5148\u4FEE\u6539\u4E3A\u53EF\u4EE5\u652F\u6301root\u5BC6\u7801\u767B\u5F55

sudo vi /etc/ssh/sshd_config

# \u4FEE\u6539

PasswordAuthentication no

\u6539\u6210

PasswordAuthentication yes

  

# \u4FEE\u6539selinux\u4E3A\u5BBD\u677E\u6A21\u5F0F

sudo vi /etc/selinux/config

# \u4FEE\u6539SELINUX=enforcing\u4E3A\uFF1A

SELINUX=permissive

  

sudo setenforce 0

  

# \u91CD\u542Fssh

  

sudo systemctl restart sshd

  

# \u4E0B\u9762\u7684\u64CD\u4F5C\u4F7F\u7528root\u7528\u6237\u6267\u884C

ssh root@38.175.45.34 -p 10022

Baishan@2022!@#

  

# \u5907\u4EFDhome\u76EE\u5F55\u914D\u7F6E

# rm -rf /home/

  

# \u5378\u8F7D/home\u548C\u7981\u7528swap

sudo umount /home

sudo swapoff /dev/mapper/rl-swap

  

# \u5220\u9664rl-home\u548Crl-swap\u903B\u8F91\u5377

sudo lvremove /dev/mapper/rl-home

sudo lvremove /dev/mapper/rl-swap

  

# \u6269\u5C55rl-root\u903B\u8F91\u5377

sudo lvextend -l +100%FREE /dev/mapper/rl-root

  

# \u8C03\u6574\u6587\u4EF6\u7CFB\u7EDF\u5927\u5C0F

sudo xfs_growfs /dev/rl/root

  

# \u66F4\u65B0\u7CFB\u7EDF\u914D\u7F6E\u6587\u4EF6

sudo vi /etc/fstab

mount -a

  

# \u6062\u590Dhome\u76EE\u5F55\u914D\u7F6E

curl -O https://ss.bscstorage.com/bs-images/useradd.sh; chmod +x ./useradd.sh && bash +x ./useradd.sh && port=10022 && firewall-cmd --zone=public --add-port=$port/tcp --permanent && firewall-cmd --reload && firewall-cmd --zone=public --query-port=$port/tcp

  

# \u9A8C\u8BC1\u914D\u7F6E

df -h

lsblk

  

# \u8FD8\u9700\u8981\u8C03\u6574grub\u7684\u914D\u7F6E

sudo vi /etc/default/grub

  

# \u6CE8\u91CA\u539F\u672CGRUB_CMDLINE_LINUX \uFF0C\u4E0B\u9762\u65B0\u589E\u4E00\u884C

# GRUB_CMDLINE_LINUX="crashkernel=auto resume=/dev/mapper/rl-swap rd.lvm.lv=rl/root rd.lvm.lv=rl/swap"

GRUB_CMDLINE_LINUX="crashkernel=auto rd.lvm.lv=rl/root"

  

# \u751F\u6210\u65B0\u7684 GRUB \u914D\u7F6E\uFF1A

sudo grub2-mkconfig -o /boot/grub2/grub.cfg

  

# \u91CD\u65B0\u751F\u6210 initramfs\uFF08\u53EF\u9009\uFF0C\u4F46\u63A8\u8350\uFF09\uFF1A

sudo dracut -f

  

# \u91CD\u542F\u670D\u52A1\u5668

sudo reboot


`,paraId:2,tocIndex:0}]},60132:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(70527);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:"\u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D ",paraId:2,tocIndex:2},{value:"1",paraId:2,tocIndex:2},{value:" \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002",paraId:2,tocIndex:2},{value:"ipmitool user list 1",paraId:3,tocIndex:2},{value:`\u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
`,paraId:4,tocIndex:3},{value:"\u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory",paraId:5,tocIndex:3},{value:"`ipmitool sdr",paraId:6,tocIndex:3},{value:"ipmitool mc reset cold",paraId:7,tocIndex:4}]},73728:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(84327);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:"\u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D ",paraId:2,tocIndex:2},{value:"1",paraId:2,tocIndex:2},{value:" \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002",paraId:2,tocIndex:2},{value:"ipmitool user list 1",paraId:3,tocIndex:2},{value:`\u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
`,paraId:4,tocIndex:3},{value:"\u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory",paraId:5,tocIndex:3},{value:"`ipmitool sdr",paraId:6,tocIndex:3},{value:"ipmitool mc reset cold",paraId:7,tocIndex:4}]},41743:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(13303);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:`#### \u5217\u51FA\u7528\u6237\u5217\u8868
- \u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D \`1\` \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002

\`ipmitool user list 1\`


#### \u67E5\u8BE2\u4F20\u611F\u5668\u6570\u636E
- \u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
	- \u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory

\`ipmitool sdr

`,paraId:2,tocIndex:1},{value:"ipmitool mc reset cold",paraId:3,tocIndex:2}]},2931:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(7057);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:"\u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D ",paraId:2,tocIndex:2},{value:"1",paraId:2,tocIndex:2},{value:" \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002",paraId:2,tocIndex:2},{value:"ipmitool user list 1",paraId:3,tocIndex:2},{value:`\u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
`,paraId:4,tocIndex:3},{value:"\u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory",paraId:5,tocIndex:3},{value:"`ipmitool sdr",paraId:6,tocIndex:3},{value:"ipmitool mc reset cold",paraId:7,tocIndex:4}]},94428:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(6874);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:"\u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D ",paraId:2,tocIndex:2},{value:"1",paraId:2,tocIndex:2},{value:" \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002",paraId:2,tocIndex:2},{value:"ipmitool user list 1",paraId:3,tocIndex:2},{value:`\u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
`,paraId:4,tocIndex:3},{value:"\u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory",paraId:5,tocIndex:3},{value:"`ipmitool sdr",paraId:6,tocIndex:3},{value:"ipmitool mc reset cold",paraId:7,tocIndex:4}]},66855:function(o,t,n){n.r(t),n.d(t,{texts:function(){return d}});var e=n(26079);const d=[{value:"ipmitool lan print",paraId:0,tocIndex:0},{value:"ipmitool sel list",paraId:1,tocIndex:1},{value:"\u5217\u51FA\u6240\u6709 BMC \u7528\u6237\uFF08\u901A\u5E38\u7528\u6237\u69FD\u4F4D ",paraId:2,tocIndex:2},{value:"1",paraId:2,tocIndex:2},{value:" \u662F\u9ED8\u8BA4\u7BA1\u7406\u69FD\u4F4D\uFF09\u3002",paraId:2,tocIndex:2},{value:"ipmitool user list 1",paraId:3,tocIndex:2},{value:`\u9ED8\u8BA4\u5C55\u793A\u5168\u90E8\u6570\u636E\uFF0C\u4E5F\u53EF\u4EE5\u4F7F\u7528type\u8FC7\u6EE4\u5177\u4F53\u7684\u4F20\u611F\u5668\u8BE6\u7EC6\u6570\u636E
`,paraId:4,tocIndex:3},{value:"\u4F8B\u5982\uFF08\u5185\u5B58\uFF09\uFF1Aipmitool sdr type memory",paraId:5,tocIndex:3},{value:"`ipmitool sdr",paraId:6,tocIndex:3},{value:"ipmitool mc reset cold",paraId:7,tocIndex:4}]}}]);
