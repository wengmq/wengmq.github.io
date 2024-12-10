1、下载
在github上进行下载 https://github.com/coder/code-server/releases ，选择对应架构的安装包(我比较喜欢下载tar.gz包，因为定制化程度高一些)，解压

2、配置
新建配置文件 ~/.config/code-server/config.yaml，填入以下内容
bind-addr: 0.0.0.0:8002
auth: password
password: 123456
cert: false
端口自定，密码可修改

3、执行
进入code-server文件夹，直接执行./code-server即可

4、使用systemctl管理
新建 code-server.service，写入以下内容
```
[Unit]
Description=code-server
After=network.target

[Service]
Type=exec
ExecStart=${code-server目录}/code-server
Restart=always
User=${配置文件所在目录所属用户}

[Install]
WantedBy=default.target
```

复制文件到 /etc/systemd/system/

#启动
sudo systemctl start code-server
#停止
sudo systemctl stop code-server
#开机自启
sudo systemctl enable code-server
