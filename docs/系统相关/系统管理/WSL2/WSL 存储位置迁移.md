
wsl镜像导出导入命令参考：[https://learn.microsoft.com/zh-cn/windows/wsl/enterprise](https://learn.microsoft.com/zh-cn/windows/wsl/enterprise)

```bash
# 关闭wsl
wsl --shutdown
# 确保为stop状态
wsl -l -v
# 文件夹需提前创建
wsl --export Ubuntu-20.04 E:\UbuntuWSL\ubuntu.tar
# 注销
wsl --unregister Ubuntu-20.04
# 确定已注销
wsl -l -v
# 执行导入(如果失败可再次尝试执行)
# 执行完会在E:\UbuntuWSL\创建ext4.vhdx，然后ubuntu.tar就可以删掉了
wsl --import Ubuntu-20.04 E:\UbuntuWSL\ E:\UbuntuWSL\ubuntu.tar
wsl -l -v
```