Prometheus 原始数据格式基于时间序列，核心概念是 **指标（metrics）** 和 **标签（labels）**，并使用一个叫做 **Prometheus TSDB**（Time Series Database）的存储引擎来存储和检索这些时间序列数据。

### Prometheus 原始数据的结构

1. **时间序列**：
    
    - 每个时间序列包含一组 **标签** 和一个指标名称。
    - 标签是键值对，用于对同一个指标的不同实例进行标识（例如区分不同的主机、端口、实例等）。
    - 时间序列数据由 **时间戳** 和对应的 **值** 组成。
2. **指标（Metric）**：
    
    - 一个指标由其 **名称** 和 **标签集合** 唯一标识。
    - 每个指标名称表示一类监控数据，例如 `http_requests_total` 表示 HTTP 请求的总数。
3. **标签（Labels）**：
    
    - 每个时间序列可以有多个标签，标签是键值对，用来为时间序列打上不同的标识。
    - 例如：对于 `http_requests_total` 指标，你可以有标签 `instance="localhost:9090"` 和 `job="prometheus"` 来标识是哪一个 Prometheus 实例生成的这个数据。
4. **样本（Sample）**：
    
    - 样本由一个时间戳和一个数值组成。每个时间序列都会随着时间推移不断地记录样本数据。
    - 时间戳是 Unix 时间格式，以毫秒为单位。

```
[root@node01 ~]# curl -sk -u 'admin:xxxxx' --resolve prometheus.openstack.svc.shenzhen-a.com:443:38.175.42.221 https://prometheus.openstack.svc.shenzhen-a.com/api/v1/query_range --data-urlencode "query=node_load1" --data-urlencode "start=1725120000" --data-urlencode "end=1725121800" --data-urlencode "step=5m" 2>&1| jq .
{
  "status": "success",
  "data": {
    "resultType": "matrix",
    "result": [
      {
        "metric": {
          "__name__": "node_load1",
          "hostname": "node01.shenzhen-a.com",
          "instance": "38.175.42.197:9100",
          "job": "node-exporter"
        },
        "values": [
          [
            1725120000,
            "18.44"
          ],
          [
            1725120300,
            "14.2"
          ],
          [
            1725120600,
            "7.68"
          ],
          [
            1725120900,
            "4.83"
          ],
          [
            1725121200,
            "5.94"
          ],
          [
            1725121500,
            "5.72"
          ],
          [
            1725121800,
            "3.76"
          ]
        ]
      },
      {
        "metric": {
          "__name__": "node_load1",
          "hostname": "node02.shenzhen-a.com",
          "instance": "38.175.42.198:9100",
          "job": "node-exporter"
        },
        "values": [
          [
            1725120000,
            "9.33"
          ],
          [
            1725120300,
            "20.99"
          ],
          [
            1725120600,
            "13.91"
          ],
          [
            1725120900,
            "5.63"
          ],
          [
            1725121200,
            "6.47"
          ],
          [
            1725121500,
            "9.13"
          ],
          [
            1725121800,
            "2.3"
          ]
        ]
      },
      {
        "metric": {
          "__name__": "node_load1",
          "hostname": "node03.shenzhen-a.com",
          "instance": "38.175.42.199:9100",
          "job": "node-exporter"
        },
        "values": [
          [
            1725120000,
            "3.8"
          ],
          [
            1725120300,
            "4.83"
          ],
          [
            1725120600,
            "6.08"
          ],
          [
            1725120900,
            "9.77"
          ],
          [
            1725121200,
            "6.45"
          ],
          [
            1725121500,
            "17.59"
          ],
          [
            1725121800,
            "18.13"
          ]
        ]
      }
    ]
  }
}

```