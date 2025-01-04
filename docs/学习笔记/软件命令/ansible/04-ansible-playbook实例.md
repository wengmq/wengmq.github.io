
- ### 将当前目录下的./test20210609.txt 复制到主机47.102.98.58 的/tmp 目录下

```
#!/usr/bin/env ansible-playbook
- hosts:
    - 47.102.98.58
  gather_facts: False
  become: True

  tasks:
    - name: copy config
      copy:
        src: ./test20210609.txt
        dest: /tmp
      register: update_config
```

- ### palybook执行shell命令，并且返回执行结果
```
#!/usr/bin/env ansible-playbook
- hosts:
    - 47.102.98.58
  gather_facts: False
  become: True

  become: yes
  tasks:
    - name: "deploy_aresagent"
      shell: | 
        df -h
        lsblk
      register: shell_result
    - debug:
        var: shell_result.stdout_lines
```
 - 执行结果如下:iiiii
```
$ ansible-playbook ./playbook/test.yml

PLAY [tx] *************************************************************************************************************************************

TASK [test df] ********************************************************************************************************************************
changed: [150.158.120.220]

TASK [debug] **********************************************************************************************************************************
ok: [150.158.120.220] => {
    "shell_result.stdout_lines": [
        "Filesystem      Size  Used Avail Use% Mounted on",
        "udev            937M     0  937M   0% /dev",
        "tmpfs           198M  732K  197M   1% /run",
        "/dev/vda2        40G  8.1G   30G  22% /",
        "tmpfs           986M   48K  986M   1% /dev/shm",
        "tmpfs           5.0M     0  5.0M   0% /run/lock",
        "tmpfs           986M     0  986M   0% /sys/fs/cgroup",
        "tmpfs           198M     0  198M   0% /run/user/0"
    ]
}

PLAY RECAP ************************************************************************************************************************************
150.158.120.220            : ok=2    changed=1    unreachable=0    failed=0    skipped=0    rescued=0    ignored=0

```