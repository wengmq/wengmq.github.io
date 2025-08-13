## 简介
- 官方说明：
	- https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/

## 添加数据源

- 在创建仪表之前，你需要先添加数据，例如prometheus、influxDB这些时序数据库
![](assets/Pasted%20image%2020250725143933.png)
- 例如我这边添加了一个prometheus数据库
![](assets/Pasted%20image%2020250725144024.png)
## 创建仪表板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#create-a-dashboard)

  - 要创建仪表板，请执行以下操作：

	1. 单击主菜单中的仪表板。
	    
	2. 单击新建，然后选择新建仪表板。
	    
	3. 在空白的仪表板上，单击+添加可视化。

![](assets/Pasted%20image%2020250725143640.png)
    
![](assets/Pasted%20image%2020250124115936.png)
    
2. 在打开的对话框中，执行以下操作之一：
    
    - 选择一个现有数据源。
    - 选择Grafana内置的特殊数据源之一。
    - 单击“配置新数据源”以设置新数据源（仅限管理员）。
    ![](assets/Pasted%20image%2020250124115951.png)
    “编辑”面板视图打开，数据源已选定。如果需要，您可以稍后使用面板编辑器的“查询”选项卡中的下拉菜单更改面板数据源。
    
    
3. 用数据源的查询语言编写或构造查询。
![](assets/Pasted%20image%2020250725144415.png)
4. 单击“刷新”以查询数据源。
    
5. 在可视化列表中，选择可视化类型。
    
    ![](assets/Pasted%20image%2020250124120018.png)
    
6. 在面板选项下，为面板输入标题和描述
    
7. 有关调整面板设置的方法，请参阅以下文档。
    
    虽然不是必需的，但大多数可视化在正确显示所需信息之前都需要一些调整。
    
    - [配置值映射](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-value-mappings/)
    - [可视化特定选项](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/)
    -   [覆盖字段值](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-overrides/)
    -   [配置阈值](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-thresholds/)
    - [配置标准选项](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-standard-options/)
8. 编辑完面板后，单击“保存仪表板”。
    
    或者，如果您想先看到您的更改应用于仪表板，请单击“返回仪表板”。准备就绪后，单击“保存仪表板”。
    
9. 为您的仪表板输入标题和描述，或者让Grafana使用生成式AI功能创建它们。
    
10. 如果适用，请选择一个文件夹。
    
11.   单击“保存”。
    
12. 要向仪表板添加更多面板，请单击“返回仪表板”。然后单击仪表板标题中的“添加”，并在下拉列表中选择“可视化”。
    
![](assets/Pasted%20image%2020250124120031.png)
    
    当您向仪表板添加其他面板时，您将直接进入编辑面板视图。
    
13. 保存要对仪表板所做的所有更改后，单击“退出编辑”。
    
    现在，当您想对已保存的仪表板进行更多更改时，请单击右上角的“编辑”。
    
##   配置【row】[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#configure-repeating-rows)

- 你可以在仪表盘中增加【row】，每个【row】可以包含多个【panel】面板，可以通过row来实现折叠多个面板的效果。

![](assets/Pasted%20image%2020250725145112.png)

- 举个例子，充分使用row可以使你的页面更加简洁
  ![](assets/Pasted%20image%2020250725145548.png)

##   移动面板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#move-a-panel)

- 您可以在任何位置的仪表板上放置面板。

	1. 单击主菜单中的仪表板。
	2. 导航到要处理的仪表板。
	3. 单击右上角的“编辑”。
	4. 单击面板标题并将面板拖动到新位置。
	5.   单击保存仪表板。
	6. （可选）输入您所做更改的描述。
	7.   单击“保存”。
	8.   单击“退出编辑”。

##   调整面板大小[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#resize-a-panel)

- 您可以根据需要调整仪表板面板的大小。

	1. 单击主菜单中的仪表板。
	2. 导航到要处理的仪表板。
	3. 单击右上角的“编辑”。
	4. 要调整面板的大小，请单击并拖动面板的右下角。
	5.   单击保存仪表板。
	6. （可选）输入您所做更改的描述。
	7.   单击“保存”。
	8.   单击“退出编辑”。

##   复制仪表板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#copy-a-dashboard)

- 要复制仪表板，请执行以下步骤：

	1. 单击主菜单中的仪表板。
	    
	2. 打开要复制的仪表板。
	    
	3. 单击右上角的“编辑”。
	    
	4. 单击“保存仪表板”下拉菜单，然后选择“另存为副本”。
	    
	5. （可选）指定名称、文件夹、描述，以及是否为复制的仪表板复制原始仪表板标记。
	    
	    默认情况下，复制的仪表板与原始仪表板同名，并附加“复制”一词，且位于同一文件夹中。
	    
	6.   单击“保存”。
    ![](assets/Pasted%20image%2020250725144807.png)
