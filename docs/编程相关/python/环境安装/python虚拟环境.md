
## 背景
- 官网地址：[https://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html](https://virtualenvwrapper.readthedocs.io/en/latest/command_ref.html)
- 具体使用姿势可以看官网

## 安装 virtualenvwrapper

```
pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple virtualenvwrapper
```

## 安装成功后，设置开机启动

- vim ~/.bahrc （看你使用哪个 shell,  可以用 echo $SHELL 看下） 添加以下语句
- 这个/usr/local/python3/bin/virtualenvwrapper.sh文件位置通常是在你安装的python位置目录下
	- 找不到的情况可以用 find / -name 'virtualenvwrapper.sh' 看下路径
- 通常情况安装virtualenvwrapper会自带安装virtualenv，但是如果找不到virtualenv工具可能需要将这个工具的路径加入$PATH变量的目录下
	-  ln -s /usr/local/python3/bin/virtualenv /usr/local/bin/virtualenv
```
# 设置virtualenv的统一管理目录
export WORKON_HOME=$HOME/.virtualenvs  
source /usr/local/python3/bin/virtualenvwrapper.sh

```



## 创建虚拟环境

-p 可以指定 python 解释器的位置， env_django_1 可以替换成你要创建的虚拟环境的名字

```
mkvirtualenv env_django_1 -p `which python3`
```

## 进入虚拟环境

env_django_1 替换成你创建的虚拟环境的名字

```
workon env_django_1
```

## 退出虚拟环境

```
deactivate
```

## 查看有哪些虚拟环境

```
lsvirtualenv
```

或者

```
workon
```

## 删除虚拟环境

```
rmvirtualenv env_django_1
```
