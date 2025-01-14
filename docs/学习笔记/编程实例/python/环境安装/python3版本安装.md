


本例以 centos7上安装 Pyhton3.8 版本为例进行说明

1、依赖包安装

```
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel libffi-devel
```

2、下载包：这边可以选择对应版本的安装包

https://www.python.org/ftp/python/3.8.1/

wget https://www.python.org/ftp/python/3.8.1/Python-3.8.1.tgz

3、解压：

```
tar -zxvf Python-3.8.1.tgz
```

4、安装：

```
cd Python-3.8.1
./configure --prefix=/usr/local/python3
make && make install
```

5、建立软连接

```
ln -s /usr/local/python3/bin/python3.8 /usr/bin/python3
ln -s /usr/local/python3/bin/pip3.8 /usr/bin/pip3
```

6、验证是否安装成功

执行 python3 -V 命令

执行 pip3 -V命令

