## 简介

- 说明：
	- ELK 架构由 **Elasticsearch、Logstash、Kibana** 三大核心组件组成，通常还会结合 **Beats**（轻量日志/数据采集器）一起使用，被称为 **Elastic Stack**。
- 官方文档：
	- [https://www.elastic.co/docs/get-started/](https://www.elastic.co/docs/get-started/)


## **架构总览**

```css
[ 数据源 ] → [ Beats / Logstash ] → [ Elasticsearch ] → [ Kibana ]
```

-   **数据源**：应用日志、系统日志、业务指标、网络流量、数据库数据等。
    
-   **Beats / Logstash**：负责采集、过滤、转换数据。
    
-   **Elasticsearch (ES)**：负责存储、索引和搜索数据。
    
-   **Kibana**：负责可视化展示和交互查询。




##  组件说明

### **(1) Elasticsearch**

-   **功能**：核心存储与搜索引擎，基于 Apache Lucene。
    
-   **作用**：
    
    -   存储结构化、半结构化、非结构化数据（JSON 文档形式）。
        
    -   提供分布式全文搜索、高速查询和聚合分析。
        
-   **特性**：
    
    -   **分布式架构**（多节点集群，主分片、副本分片）。
        
    -   **RESTful API** 操作（HTTP/JSON）。
        
    -   支持复杂查询（全文检索、条件过滤、聚合分析）。
        
-   **节点角色**：
    
    -   Master 节点：负责集群元数据管理（索引信息、节点状态）。
        
    -   Data 节点：存储实际数据并处理查询。
        
    -   Ingest 节点：负责数据预处理（也可由 Logstash 完成）。
        
    -   Coordinating 节点：负责请求路由和结果合并。
        

---

### **(2) Logstash**

-   **功能**：数据收集、解析、转换和转发。
    
-   **作用**：
    
    -   从多个数据源采集数据（文件、数据库、消息队列、API 等）。
        
    -   通过 **filter 插件** 进行解析和清洗（grok、mutate、date、geoip 等）。
        
    -   输出到多个目的地（Elasticsearch、Kafka、文件等）。
        
-   **特性**：
    
    -   支持多种输入（input）、过滤（filter）、输出（output）插件。
        
    -   可与 Beats 配合，Beats 将轻量数据发送到 Logstash，Logstash 做复杂处理。
        
-   **优缺点**：
    
    -   功能强大但占用资源较多，复杂场景适合用 Logstash，简单采集可直接用 Beats。
        

---

### **(3) Kibana**

-   **功能**：可视化与管理控制台。
    
-   **作用**：
    
    -   连接 Elasticsearch，提供仪表盘（Dashboard）、可视化分析、查询工具（Discover）。
        
    -   支持数据探索、告警、机器学习模块（需 Elastic 付费版）。
        
    -   管理 Elasticsearch（索引模板、映射、集群状态）。
        
-   **特性**：
    
    -   与 Elasticsearch 紧密耦合。
        
    -   支持交互式查询（Lucene Query Syntax / Kibana Query Language）。
        
    -   图表类型多（柱状、折线、饼图、地理地图等）。
        

---

### **(4) Beats（可选）**

-   **功能**：轻量级数据采集器。
    
-   **常见类型**：
    
    -   **Filebeat**：采集文件日志。
        
    -   **Metricbeat**：采集系统/服务监控指标。
        
    -   **Packetbeat**：采集网络流量数据。
        
    -   **Heartbeat**：采集可用性检测数据（Ping/HTTP/TCP）。
        
    -   **Winlogbeat**：采集 Windows 事件日志。
        
-   **作用**：
    
    -   部署在数据源机器上，资源占用极低。
        
    -   直接发送数据到 Elasticsearch 或 Logstash。
        

---



## **3\. 数据流向**

1.  **数据采集**
    
    -   Beats 直接采集（轻量场景）。
        
    -   Logstash 采集（复杂数据处理）。
        
2.  **数据传输**
    
    -   Beats → Logstash → ES  
        或  
        Beats → ES
        
3.  **数据存储与索引**
    
    -   ES 将数据存储为 JSON 文档并建立倒排索引。
        
4.  **数据查询与可视化**
    
    -   Kibana 连接 ES，提供搜索、聚合、图形化展示。
        

---

## **4\. 典型部署架构**

```scss
                ┌──────────┐
                │  Beats   │ (Filebeat / Metricbeat ...)
                └────┬─────┘
                     │
               ┌─────▼─────┐
               │ Logstash  │ (可选：复杂解析/清洗)
               └─────┬─────┘
                     │
          ┌──────────▼──────────┐
          │   Elasticsearch     │ (集群)
          └──────────┬──────────┘
                     │
               ┌─────▼─────┐
               │  Kibana   │ (可视化)
               └───────────┘
```

---

## **5\. 优缺点**

### 优点

-   高性能搜索和实时分析。
    
-   灵活的数据接入与处理能力。
    
-   丰富的可视化和交互功能。
    
-   水平扩展能力强（支持大规模集群）。
    

### 缺点

-   资源消耗大（特别是 Logstash 和 ES）。
    
-   集群管理复杂（需要注意分片、副本、内存、GC 调优）。
    
-   对硬件要求高（IOPS、内存、CPU）。