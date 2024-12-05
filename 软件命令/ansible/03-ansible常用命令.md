
- 查看ansible 版本等信息：
	- ansible --version


- ansible远程执行命令
	- ansible yd-anhui-huainan-23-112-29-218-144 -m command -a 'df -h'


- Ansible 指定配置文件位置

	export ANSIBLE_CONFIG=/etc/ansible/ansible-wengmq.cfg
	
	eg:
	
	export ANSIBLE_CONFIG=/etc/ansible/ansible-wengmq.cfg && ansible aliyun -m shell -a 'df -h'


- ansible 指定host文件位置
	- export ANSIBLE_INVENTORY=/etc/ansible/wengmq.hosts
	- 也可以在执行的时候-i指定host文件位置
		- ansible -i ./ecs.ini tx_server -m ping
  

- 每个模块的文档能够通过命令行的 ansible-doc 工具来获取
	- ansible-doc yum


- 列出所有已安装的模块文档 : 
	- ansible-doc -l
