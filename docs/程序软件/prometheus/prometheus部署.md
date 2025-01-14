
## 容器部署

- 将本地9090端口映射到容器的9090
	- docker run -d -p 9090:9090 -it prom/prometheus
- 可以直接访问http://$ip:9090进入IPMI界面
