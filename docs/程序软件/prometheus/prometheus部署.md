
## 容器部署

- 将本地9090端口映射到容器的9090
	- docker run -d -p 9090:9090 -it prom/prometheus
- 可以直接访问http://$ip:9090进入IPMI界面



## 给prometheus配置Basic Auth

- 配置Basic Auth可以防止其他外部恶意请求

```
# 进入容器
docker exec -it relaxed_fermat sh

# 修改容器内配置文件
/prometheus $ vi /etc/prometheus/prometheus.yml

#退出容器后重启容器
docker restart relaxed_fermat

```

- /etc/prometheus/prometheus.yml 中scrape_configs加入下内容 （和static_configs同级）
```
    basic_auth:
      username: 'your-username'
      password: 'your-password'
```