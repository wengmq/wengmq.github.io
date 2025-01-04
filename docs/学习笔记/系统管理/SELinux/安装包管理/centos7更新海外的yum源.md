
要将 CentOS 的 `yum` 源更改为海外的镜像源，可以通过以下步骤进行操作。这样可以绕过国内的镜像问题，使用稳定的海外镜像。

### 1. 备份现有的 `yum` 源配置

首先，建议你备份现有的 `yum` 源文件，以便在必要时可以恢复：


`sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak`

### 2. 更换为海外的 `yum` 源

你可以选择一些著名的海外镜像源，例如：

- **Vault CentOS Archive**（适用于旧版本）：CentOS 官方的存档库，适用于 EOL（End of Life）版本。
- **美国的 EPEL 源**：Fedora 项目提供的稳定源。

可以使用以下步骤来替换默认的 `yum` 源。

#### 选项 1：替换为 Vault CentOS 源（适用于 CentOS 7）

编辑 `CentOS-Base.repo` 文件：

`sudo vi /etc/yum.repos.d/CentOS-Base.repo`

将内容替换为以下内容（适用于 CentOS 7）：

```
[base]
name=CentOS-$releasever - Base
baseurl=http://vault.centos.org/7.9.2009/os/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[updates]
name=CentOS-$releasever - Updates
baseurl=http://vault.centos.org/7.9.2009/updates/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

[extras]
name=CentOS-$releasever - Extras
baseurl=http://vault.centos.org/7.9.2009/extras/$basearch/
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

```


保存文件并退出。

#### 选项 2：更换为 EPEL 源

如果需要安装额外的第三方软件包，也可以启用 EPEL 源。首先安装 `epel-release` 包：


`sudo yum install -y epel-release`

启用后，EPEL 仓库会自动添加到 `yum` 源中，并提供许多社区维护的软件包。

### 3. 清除缓存并更新

在修改 `yum` 源后，清除 `yum` 缓存并尝试更新：


`sudo yum clean all sudo yum makecache sudo yum update -y`

### 4. 验证

你可以通过以下命令验证是否成功使用了新的海外源：

`yum repolist`

如果一切正常，你现在应该能够从海外的镜像源获取和安装软件包了。


一键更新命令：curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo;yum clean all;yum makecache