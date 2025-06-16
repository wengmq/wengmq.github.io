
- ubuntu安装docker：[https://www.runoob.com/docker/ubuntu-docker-install.html](https://www.runoob.com/docker/ubuntu-docker-install.html)

```bash

# ### 卸载旧版本
sudo apt-get remove docker docker-engine docker.io containerd runc

# ### 设置仓库
sudo apt-get update
sudo apt-get install \  
    apt-transport-https \  
    ca-certificates \  
    curl \  
    gnupg-agent \  
    software-properties-common

#添加 Docker 的官方 GPG 密钥：
mkdir -p /etc/apt/keyrings/
curl -fsSL https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc

# 使用以下指令设置稳定版仓库
echo \  
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://mirrors.ustc.edu.cn/docker-ce/linux/ubuntu/ \  
 $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \  
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update

# ### 安装 Docker Engine-Community
sudo apt-get install docker-ce docker-ce-cli containerd.io

```

