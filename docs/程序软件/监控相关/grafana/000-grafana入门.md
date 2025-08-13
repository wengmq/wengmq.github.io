
## 【入门教程资源】

-  Grafana官方文档: [https://grafana.com/docs/grafana/latest/panels/](https://grafana.com/docs/grafana/latest/panels/)
    
- Grafana常用使用技巧: [https://juejin.cn/post/6844903570593038344](https://juejin.cn/post/6844903570593038344)
    
- Grafana全面瓦解: [https://www.jianshu.com/p/7e7e0d06709b](https://www.jianshu.com/p/7e7e0d06709b)
    
- 在线Demo演示: [https://play.grafana.org/d/000000012/grafana-play-home?orgId=1](https://play.grafana.org/d/000000012/grafana-play-home?orgId=1)
    
- 时间序列类型图表Demo演示: [https://play.grafana.org/d/000000002/influxdb-templated?orgId=1&var-datacenter=America&var-host=All&var-summarize=1m&editPanel=1](https://play.grafana.org/d/000000002/influxdb-templated?orgId=1&var-datacenter=America&var-host=All&var-summarize=1m&editPanel=1)

- PromQL 从入门到学废： https://download.flashcat.cloud/promql-learning.pdf

## 【相关名词】

- 数据源：参考官方 https://grafana.com/docs/grafana/latest/datasources/
	- 底层存储的数据来源，支持常见的时间序列数据库，如prometheus、influxdb
- 仪表盘：参考官方 https://grafana.com/docs/grafana/latest/dashboards/
	- 即Dashboards，一个仪表盘即一个独立的页面
	- 一个仪表盘中可以包含多个Row，点击Row即可展开多个面板
- 变量：参考官方 https://grafana.com/docs/grafana/latest/dashboards/variables/
	- 每个仪表盘可以支持定义多个变量，变量数据可以来自于其他数据源或者自己手动输入的列表。变量可以在面板中引用，通常可以用于做过滤条件。
- 面板：参考官方 https://grafana.com/docs/grafana/latest/panels-visualizations/
	- 即Panels，面板中可以包含多种类型如最常见的折线图、饼图、直方图等

## 【grafana部署】

- ### docker部署：
	- 账号密码默认（admin/admin）
```
docker run -d -p 3000:3000 -it grafana/grafana
```

- ### 本地二进制部署：
	- 参考地址：[https://grafana.com/grafana/download](https://grafana.com/grafana/download)
	- 已ubuntu的部署为例：
	- `systemctl status grafana-server.service` 启动服务默认监听3000端口。
	- 账号密码默认（admin/admin）
```bash
sudo apt-get install -y adduser libfontconfig1 musl
wget https://dl.grafana.com/enterprise/release/grafana-enterprise_12.1.0_amd64.deb
sudo dpkg -i grafana-enterprise_12.1.0_amd64.deb
```
	