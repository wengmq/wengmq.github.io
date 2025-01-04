参考：
https://zhuanlan.zhihu.com/p/497224440


使用wget下载

```text
wget https://github.com/coder/code-server/releases/download/v4.2.0/code-server_4.2.0_amd64.deb
```

安装

```text
dpkg -i code-server_4.2.0_amd64.deb
```

运行一次，生成配置文件

```text
code-server
```

关闭程序

修改配置文件

```text
vim ~/.config/code-server/config.yaml
```

bind-addr改为0.0.0.0并设置需要的端口

更改password

![](https://pic2.zhimg.com/80/v2-1d558ab7b03854cbd9ce5a224683bff5_1440w.webp)

开启服务

```text
sudo systemctl start code-server@username
```

开机自启

```text
sudo systemctl enable code-server@username
```

这里的username为你的用户名

至于为什么这么写，参考我的另一篇记录，位于最后

[峰峰：Ubuntu 20.04 systemd 开机启动项3 赞同 · 0 评论文章](https://zhuanlan.zhihu.com/p/496990810)

迁移插件目录

|系统|目录|
|---|---|
|Ubuntu+code-server|~/.local/share/code-server/extensions/|
|linux|~/.vscode/extensions,不同发行版可能不同|
|windows|C:/Users/（你的用户名）/.vscode/extensions|
|mac|User/（你的用户名）/.vscode/extensions|

将对应目录的插件迁移过去即可

先将插件打包（全选各个插件文件夹然后打包），再使用scp上传

```text
scp extensions.zip user@host:~/local/share/code-server/extensions/
```

解压

```text
unzip extensions.zip
```