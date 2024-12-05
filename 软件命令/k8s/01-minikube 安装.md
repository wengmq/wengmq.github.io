- 官网下载页面：[https://minikube.sigs.k8s.io/docs/start/](https://minikube.sigs.k8s.io/docs/start/)

- 参考文档：[gitee学习地址](https://gitee.com/-/ide/project/mikiweng/geek_crawler/edit/master/-/Kubernetes%E5%85%A5%E9%97%A8%E5%AE%9E%E6%88%98%E8%AF%BE/09%EF%BD%9C%E8%B5%B0%E8%BF%91%E4%BA%91%E5%8E%9F%E7%94%9F%EF%BC%9A%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9C%AC%E6%9C%BA%E6%90%AD%E5%BB%BA%E5%B0%8F%E5%B7%A7%E5%AE%8C%E5%A4%87%E7%9A%84Kubernetes%E7%8E%AF%E5%A2%83.md](https://gitee.com/-/ide/project/mikiweng/geek_crawler/edit/master/-/Kubernetes%E5%85%A5%E9%97%A8%E5%AE%9E%E6%88%98%E8%AF%BE/09%EF%BD%9C%E8%B5%B0%E8%BF%91%E4%BA%91%E5%8E%9F%E7%94%9F%EF%BC%9A%E5%A6%82%E4%BD%95%E5%9C%A8%E6%9C%AC%E6%9C%BA%E6%90%AD%E5%BB%BA%E5%B0%8F%E5%B7%A7%E5%AE%8C%E5%A4%87%E7%9A%84Kubernetes%E7%8E%AF%E5%A2%83.md)


- Mac安装命令：（M1选择arm64）
```
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-arm64

sudo install minikube-darwin-arm64 /usr/local/bin/minikube
```


- 可以查看minikube版本(需要先启动docker)

	- `minikube version`

- kubectl工具安装
	- kubectl的作用有点类似之前我们学习容器技术时候的工具“docker”，它也是一个命令行工具，作用也比较类似，同样是与Kubernetes后台服务通信，把我们的命令转发给Kubernetes，实现容器和集群的管理功能。kubectl是Kubernetes集群的命令行工具，通过kubectl能够对集群本身进行管理，并能够在集群上进行容器化应用的安装和部署
	- Minikube 用于在本地运行 kubernetes 环境，用来开发和测试
	- kubectl是一个与Kubernetes、minikube彼此独立的项目，所以不包含在minikube里，但minikube提供了安装它的简化方式，你只需执行下面的这条命令：
		- minikube kubectl
	- 在minikube环境里，我们会用到两个客户端：minikube管理Kubernetes集群环境，kubectl操作实际的Kubernetes功能，和Docker比起来有点复杂。
![](assets/Pasted%20image%2020240414144338.png)