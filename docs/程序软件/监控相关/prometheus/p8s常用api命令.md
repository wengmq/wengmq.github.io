

- 查看某个metric某个时间段内的数据
```
curl -sk -u 'admin:a02aeZG0xov7F8QQuVqM90ghnn9Ut1sL'  https://prometheus.openstack.svc.shenzhen-a.com/api/v1/query_range \
--data-urlencode "query=node_load1" \
--data-urlencode "start=1725120000" \
--data-urlencode "end=1725121800" \
--data-urlencode "step=5m" 2>&1| jq .|less
```

- 查看当前prometheus下的全部metric列表
```
curl -sk -u 'admin:a02aeZG0xov7F8QQuVqM90ghnn9Ut1sL'  https://prometheus.openstack.svc.shenzhen-a.com/api/v1/label/__name__/values 2>&1|jq .|less
```

- 查看当前服务相关的metric列表（prometheus自带的监控自身服务情况的metric）
```
curl -sk -u 'admin:a02aeZG0xov7F8QQuVqM90ghnn9Ut1sL'  'https://prometheus.openstack.svc.shenzhen-a.com/metrics'
```