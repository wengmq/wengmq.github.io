
### 1️⃣ 生成密码 hash（非交互）

```bash
PASS_HASH=$(openssl passwd -6 '123456')
```

---

### 2️⃣ 生成 cloud-init 配置文件

#### user-data

```bash
cat > user-data <<EOF
#cloud-config
hostname: ubuntu22-cloud
manage_etc_hosts: true

users:
  - name: ubuntu
    sudo: ALL=(ALL) NOPASSWD:ALL
    groups: sudo
    shell: /bin/bash
    lock_passwd: false
    passwd: ${PASS_HASH}

ssh_pwauth: true
disable_root: false

chpasswd:
  expire: false
EOF
```

---

#### meta-data

```bash
cat > meta-data <<EOF
instance-id: ubuntu22-cloud-001
local-hostname: ubuntu22-cloud
EOF
```

---

### 3️⃣ 生成 seed ISO（NoCloud 数据源）

```bash
genisoimage \
  -output seed.iso \
  -volid cidata \
  -joliet \
  -rock \
  user-data meta-data
```

> 如果系统没有 `genisoimage`：

```bash
yum install -y genisoimage   # CentOS / Rocky
apt install -y genisoimage   # Ubuntu
```

---

### 4️⃣ 准备云镜像（建议复制一份）

```bash
cp ubuntu-22.04-server-cloudimg-amd64.img ubuntu22-cloud.qcow2
```

（可选）扩容磁盘到 50G：

```bash
qemu-img resize ubuntu22-cloud.qcow2 50G
```

---

### 5️⃣ virt-install 启动虚机（关键）

只要把seed.iso 挂载进去，ubutnu系统的cloudinit就可以正常加载了 

```bash
virt-install \
  --name shengwang-ubuntu22-vm \
  --vcpus 32 \
  --memory 65536 \
  --cpu host-passthrough \
  --os-variant ubuntu22.04 \
  --disk path=/var/lib/libvirt/images/sw-ubuntu22-sys50g.qcow2,device=disk,bus=virtio,format=qcow2 \
  --disk path=/var/lib/libvirt/images/sw-ubuntu22-data300g.qcow2,size=300,format=qcow2,bus=virtio,cache=none \
  --disk path=/var/lib/libvirt/images/seed.iso,device=cdrom,readonly=on \
  --network bridge=br-eth0,virtualport_type=openvswitch,model=virtio \
  --graphics none \
  --console pty,target_type=serial \
  --import \
  --noautoconsole
```
