
## grafana变量简述

- 官方说明：
	- https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/

- 变量是值的占位符。您可以在度量查询和面板标题中使用变量。因此，当您使用仪表板顶部的下拉菜单更改值时，面板的指标查询将更改以反映新值。
- 变量允许您创建更具交互性和动态性的仪表板。您可以在度量查询中使用变量代替服务器、应用程序和传感器名称等硬编码。变量显示为仪表板顶部的下拉列表。这些下拉菜单使更改仪表板中显示的数据变得容易。
![](assets/Pasted%20image%2020250124153242.png)
- 模板是包含变量的任何查询。例如，如果您管理一个仪表板来监控多台服务器，您可以为每台服务器制作一个仪表盘。或者，您可以创建一个仪表板，并使用带有模板查询的面板，如下所示：
```none
wmi_system_threads{instance=~"$server"}
```


## grafana变量创建

- 点击编辑。然后进入设置

![](assets/Pasted%20image%2020250124152809.png)
![](assets/Pasted%20image%2020250124152830.png)


- 添加变量
![](assets/Pasted%20image%2020250124152934.png)


- 变量设置
![](assets/Pasted%20image%2020250124153055.png)


## grafan变量详细说明

- 变量类型

| Variable type  变量类型     | Description  说明                                                                                                                                                                                                                                                                                                                                             |
| :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Query  查询               | Query-generated list of values such as metric names, server names, sensor IDs, data centers, and so on. [Add a query variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-query-variable).  <br>查询生成的值列表，如度量名称、服务器名称、传感器ID、数据中心等。添加查询变量。                                                                    |
| Custom  自定义             | Define the variable options manually using a comma-separated list. [Add a custom variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-custom-variable).  <br>使用逗号分隔的列表手动定义变量选项。添加自定义变量。                                                                                                                     |
| Text box  文本框           | Display a free text input field with an optional default value. [Add a text box variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-text-box-variable).  <br>显示具有可选默认值的自由文本输入字段。添加文本框变量。                                                                                                                   |
| Constant  常数            | Define a hidden constant. [Add a constant variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-constant-variable).  <br>定义一个隐藏常数。添加一个常量变量。                                                                                                                                                                  |
| Data source  数据来源       | Quickly change the data source for an entire dashboard. [Add a data source variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-a-data-source-variable).  <br>快速更改整个仪表板的数据源。添加数据源变量。                                                                                                                          |
| Interval  时间间隔          | Interval variables represent time spans. [Add an interval variable](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-an-interval-variable).  <br>区间变量表示时间跨度。添加一个区间变量。                                                                                                                                               |
| Ad hoc filters  特殊过滤器   | Key/value filters that are automatically added to all metric queries for a data source (Prometheus, Loki, InfluxDB, and Elasticsearch only). [Add ad hoc filters](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#add-ad-hoc-filters).  <br>自动添加到数据源的所有度量查询中的键/值过滤器（仅限Prometheus、Loki、InfluxDB和Elasticsearch）。添加临时过滤器。 |
| Global variables  全局变量  | Built-in variables that can be used in expressions in the query editor. Refer to [Global variables](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#global-variables).  <br>可在查询编辑器中的表达式中使用的内置变量。请参阅全局变量。                                                                                                              |
| Chained variables  链式变量 | Variable queries can contain other variables. Refer to [Chained variables](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#chained-variables).  <br>变量查询可以包含其他变量。请参阅链式变量。                                                                                                                                              |


## grafan变量举例

- 比较常用的是Query 这种类型的，可以从其他的数据源中通过SQL进行过滤
- 例如我这边定义一个变量：$testvar
- ![](assets/Pasted%20image%2020250124170408.png)

- 从数据源中的metric查询变量的值

![](assets/Pasted%20image%2020250124170836.png)

- 最终的效果
![](assets/Pasted%20image%2020250124171309.png)

- 在面板中引用这个变量 ，使用$testvar 进行获取
![](assets/Pasted%20image%2020250124171452.png)