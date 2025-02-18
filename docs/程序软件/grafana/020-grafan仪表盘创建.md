- 官方说明：
	- https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/


## 创建仪表板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#create-a-dashboard)

仪表板和面板允许您以可视化形式显示数据。每个面板都需要至少一个查询来显示可视化。

  **在开始之前：**

- 确保您拥有适当的权限。有关权限的更多信息，请参阅关于用户和权限。
- 确定要向其中添加面板的仪表板。
- 了解目标数据源的查询语言。
- 确保已添加要为其编写查询的数据源。有关添加数据源的更多信息，如果需要说明，请参阅添加数据源。

  要创建仪表板，请执行以下操作：

1. 单击主菜单中的仪表板。
    
2. 单击新建，然后选择新建仪表板。
    
3. 在空白的仪表板上，单击+添加可视化。
    
    ![](assets/Pasted%20image%2020250124115936.png)
    
4. 在打开的对话框中，执行以下操作之一：
    
    - 选择一个现有数据源。
    - 选择Grafana内置的特殊数据源之一。
    - 单击“配置新数据源”以设置新数据源（仅限管理员）。
    
    ![](assets/Pasted%20image%2020250124115951.png)
    “编辑”面板视图打开，数据源已选定。如果需要，您可以稍后使用面板编辑器的“查询”选项卡中的下拉菜单更改面板数据源。
    
    有关数据源的更多信息，请参阅数据源以获取具体指南。
    
5. 用数据源的查询语言编写或构造查询。
    
6. 单击“刷新”以查询数据源。
    
7. 在可视化列表中，选择可视化类型。
    
    ![](assets/Pasted%20image%2020250124120018.png)
    
    Grafana显示应用了可视化的查询结果的预览。
    
    有关单个可视化的更多信息，请参阅可视化选项。
    
8. 在面板选项下，为面板输入标题和描述，或者让Grafana使用生成式AI功能创建它们。
    
9. 有关调整面板设置的方法，请参阅以下文档。
    
    虽然不是必需的，但大多数可视化在正确显示所需信息之前都需要一些调整。
    
    - [配置值映射](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-value-mappings/)
    - [可视化特定选项](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/)
    -   [覆盖字段值](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-overrides/)
    -   [配置阈值](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-thresholds/)
    - [配置标准选项](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-standard-options/)
10. 编辑完面板后，单击“保存仪表板”。
    
    或者，如果您想先看到您的更改应用于仪表板，请单击“返回仪表板”。准备就绪后，单击“保存仪表板”。
    
11. 为您的仪表板输入标题和描述，或者让Grafana使用生成式AI功能创建它们。
    
12. 如果适用，请选择一个文件夹。
    
13.   单击“保存”。
    
14. 要向仪表板添加更多面板，请单击“返回仪表板”。然后单击仪表板标题中的“添加”，并在下拉列表中选择“可视化”。
    
![](assets/Pasted%20image%2020250124120031.png)
    
    当您向仪表板添加其他面板时，您将直接进入编辑面板视图。
    
15. 保存要对仪表板所做的所有更改后，单击“退出编辑”。
    
    现在，当您想对已保存的仪表板进行更多更改时，请单击右上角的“编辑”。
    

##   复制仪表板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#copy-a-dashboard)

要复制仪表板，请执行以下步骤：

1. 单击主菜单中的仪表板。
    
2. 打开要复制的仪表板。
    
3. 单击右上角的“编辑”。
    
4. 单击“保存仪表板”下拉菜单，然后选择“另存为副本”。
    
5. （可选）指定名称、文件夹、描述，以及是否为复制的仪表板复制原始仪表板标记。
    
    默认情况下，复制的仪表板与原始仪表板同名，并附加“复制”一词，且位于同一文件夹中。
    
6.   单击“保存”。
    

##   配置重复行[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#configure-repeating-rows)

您可以配置Grafana，使其根据变量的值动态地向仪表板添加面板或行。变量动态更改仪表板中所有行的查询。有关重复面板的更多信息，请参阅配置重复面板。

要查看重复行的示例，请参阅具有重复行的仪表板。该示例显示，如果变量设置为选择了 `Multi-value` 或 `Include all values` ，您也可以重复行。

  **在开始之前：**

- 确保查询包含多值变量。

**要配置重复行，请执行以下操作：**

1. 单击主菜单中的仪表板。
    
2. 导航到要处理的仪表板。
    
3. 在仪表板顶部，单击添加，然后在下拉列表中选择行。
    
    如果仪表板为空，则可以单击仪表板中间的+添加行按钮。
    
4. 将鼠标悬停在行标题上，然后单击齿轮图标。
    
5. 在“行选项”对话框中，添加标题并选择要为其添加重复行的变量。
    
6.   单击“更新”。
    

要为仪表板用户提供上下文，请将变量添加到行标题中。

### 重复行和仪表板特殊数据源[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#repeating-rows-and-the-dashboard-special-data-source)

如果一行包含使用特殊仪表板数据源（使用同一仪表板中另一个面板的结果集的数据源）的面板，则重复行中的相应面板将引用原始行中的面板，而不是重复行中。

例如，在仪表板中：

- `Row 1` 包括 `Panel 1A` 和 `Panel 1B`
- `Panel 1B` 通过 `-- Dashboard --` 数据源使用 `Panel 1A` 的结果
- 重复行 `Row 2` 包括 `Panel 2A` 和 `Panel 2B`
- `Panel 2B` 引用 `Panel 1A` ，而不是 `Panel 2A`

##   移动面板[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#move-a-panel)

您可以在任何位置的仪表板上放置面板。

1. 单击主菜单中的仪表板。
2. 导航到要处理的仪表板。
3. 单击右上角的“编辑”。
4. 单击面板标题并将面板拖动到新位置。
5.   单击保存仪表板。
6. （可选）输入您所做更改的描述。
7.   单击“保存”。
8.   单击“退出编辑”。

##   调整面板大小[](https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/create-dashboard/#resize-a-panel)

您可以根据需要调整仪表板面板的大小。

1. 单击主菜单中的仪表板。
2. 导航到要处理的仪表板。
3. 单击右上角的“编辑”。
4. 要调整面板的大小，请单击并拖动面板的右下角。
5.   单击保存仪表板。
6. （可选）输入您所做更改的描述。
7.   单击“保存”。
8.   单击“退出编辑”。