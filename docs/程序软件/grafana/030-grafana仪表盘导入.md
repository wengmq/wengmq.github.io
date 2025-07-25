## 简介
- 官方说明：
	- https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/
- 一些常用的采集软件（例如promethrus的各种export），granafa官方通常已经有大佬做一些对应的仪表盘了，我们可以不用自己从头开始辛苦做一个新的仪表盘


##   导入仪表盘[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/#import-a-dashboard)

- 要导入仪表板，请执行以下步骤：
	
	1. 单击主菜单中的仪表板。
	    
	2. 单击新建，然后在下拉菜单中选择导入。
	    
	3. 执行以下步骤之一：（大部分其实输入仪表盘的uuid就行了）
	    - 上传仪表板JSON文件。
	    - 将Grafana.com仪表板URL或ID粘贴到提供的字段中。
	    - 将仪表板JSON文本直接粘贴到文本区域。
	4. （可选）更改仪表板名称、文件夹或UID，并指定度量前缀（如果仪表板使用任何前缀）。
	    
	5. 如果需要，请选择数据源。
	    
	6.   单击“导入”。
    ![](assets/Pasted%20image%2020250725150019.png)
![](assets/Pasted%20image%2020250725150110.png)
## 在grafana.com上发现仪表盘[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/#discover-dashboards-on-grafanacom)

grafana.com上的仪表板页面为您提供了常见服务器应用程序的仪表板。浏览我们的官方和社区构建的仪表板库，并导入它们以快速启动和运行。

![](assets/Pasted%20image%2020250124145114.png)


您还可以通过导出自己的仪表板之一来添加到此库中。有关更多信息，请参阅共享仪表板和面板。

##   更多示例[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/#more-examples)

Grafana Cloud堆栈在dashboards中的Grafana Cloud文件夹中附带了几个默认仪表板。如果您正在运行自己的Grafana安装，您可以在 `public/dashboards/` 目录中找到更多示例仪表板。
- [https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/#more-examples](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/#more-examples)