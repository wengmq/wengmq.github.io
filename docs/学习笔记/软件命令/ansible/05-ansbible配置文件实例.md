### ansible基础配置文件说明和示例

- 配置文件规范说明：[http://www.ansible.com.cn/docs/intro_configuration.html#getting-the-latest-configuration](http://www.ansible.com.cn/docs/intro_configuration.html#getting-the-latest-configuration)



```
$ cat /etc/ansible/ecs/ansible.cfg

[defaults]
inventory = ./hosts/ecs.ini
forks = 32
remote_user = root 
gathering = explicit
host_key_checking = False
module_name = shell
interpreter_python = /usr/bin/python3
private_key_file = /Users/wengmq/.ssh/id_rsa
force_valid_group_names = ignore
timeout = 600

[ssh_connection]
transfer_method =  piped
```


> [!NOTE]
> ##### [defaults] 部分
> 
> 1. **inventory**:
>     
>     - 说明：指定主机清单文件的位置，这里是 `./hosts/ecs.ini`。
>     - 用途：定义 Ansible 在执行任务时使用的目标主机列表。
> 2. **forks**:
>     
>     - 说明：指定并行执行的最大任务数，这里设置为 32。
>     - 用途：控制并行运行的任务数，以提高执行效率。
> 3. **remote_user**:
>     
>     - 说明：指定默认的远程用户，这里是 `root`。
>     - 用途：定义 Ansible 连接远程主机时使用的用户。
> 4. **gathering**:
>     
>     - 说明：指定事实收集的策略，这里设置为 `explicit`。
>     - 用途：控制 Ansible 在运行时如何收集主机的事实信息。`explicit` 表示只在显式调用时收集。
> 5. **host_key_checking**:
>     
>     - 说明：禁用主机密钥检查，这里设置为 `False`。
>     - 用途：避免首次连接未知主机时的提示。
> 6. **module_name**:
>     
>     - 说明：默认的模块名称，这里设置为 `shell`。
>     - 用途：指定默认使用的模块，通常在运行 `ansible` 命令时使用。
> 7. **interpreter_python**:
>     
>     - 说明：指定远程主机上使用的 Python 解释器，这里是 `/usr/bin/python3`。
>     - 用途：确保 Ansible 使用正确的 Python 解释器。
> 8. **private_key_file**:
>     
>     - 说明：指定用于 SSH 连接的私钥文件路径，这里是 `/Users/wengmq/.ssh/id_rsa`。
>     - 用途：定义 Ansible 连接远程主机时使用的私钥。
> 9. **force_valid_group_names**:
>     
>     - 说明：指定组名验证策略，这里设置为 `ignore`。
>     - 用途：忽略无效的组名警告。
> 10. **timeout**:
>     
>     - 说明：SSH 连接的超时时间（秒），这里设置为 600。
>     - 用途：定义 SSH 连接在超时之前的等待时间。
> 
> ##### [ssh_connection] 部分
> 
> 1. **transfer_method**:
>     - 说明：指定文件传输方法，这里设置为 `piped`。
>     - 用途：定义 Ansible 如何传输文件到远程主机。`piped` 方法会通过 SSH 管道传输数据。
> 
> 


## 目标主机列表文件
- 文件规范参考：[http://www.ansible.com.cn/docs/intro_inventory.html#inventoryformat](http://www.ansible.com.cn/docs/intro_inventory.html#inventoryformat)

```
cat /etc/ansible/ecs/hosts/ecs.ini
[tx]
150.158.120.220

[ali]
8.222.161.129

[aws]
54.183.108.229
```


### 执行示范

```
# 默认ansible会优先从当前目录查找ansible.cfg
cd /etc/ansible/ecs/
---------------------------------------------------
# 对tx机器执行ping操作
$ ansible tx -m ping
150.158.120.220 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
---------------------------------------------------
# 对所有机器执行ping操作
$ ansible all -m ping
150.158.120.220 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
8.222.161.129 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
54.183.108.229 | SUCCESS => {
    "changed": false,
    "ping": "pong"
}
---------------------------------------------------
# 对tx机器执行shell命令（df -h）
$ ansible tx -m shell -a "df -h"
150.158.120.220 | CHANGED | rc=0 >>
Filesystem      Size  Used Avail Use% Mounted on
udev            937M     0  937M   0% /dev
tmpfs           198M  732K  197M   1% /run
/dev/vda2        40G  8.1G   30G  22% /
tmpfs           986M   48K  986M   1% /dev/shm
tmpfs           5.0M     0  5.0M   0% /run/lock
tmpfs           986M     0  986M   0% /sys/fs/cgroup
tmpfs           198M     0  198M   0% /run/user/0
```