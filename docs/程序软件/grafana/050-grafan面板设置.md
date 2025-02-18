- 官方说明：
	- https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/

## grafan面板简介

- 面板的设置可以说是grafana最核心的部分，你可以在面板设置页面通过查询SQL语法进行过滤、聚合最终展示成你喜欢的页面。
- 最常用的一般是Time series类型的面板，横坐标固定为时间，纵坐标为对应点位的值。如果包含多个label即会展示成多条数据线。
- 右侧是面板的一些面板的配置选项，如标题设置、单位设置、颜色设置等，下方的Queries即可输入你对应查询语句。
![](assets/Pasted%20image%2020250206165556.png)
## grafana配置选项[](https://grafana.com/docs/grafana/latest/panels-visualizations/visualizations/time-series/#configuration-options)

- ### Panel options 
	- 参考： https://grafana.com/docs/grafana/latest/panels-visualizations/configure-panel-options/
	- 说明：设备面板的标题和描述等信息。
	- 这边有个比较高级的用法，例如你有个变量endpoint包含值[server1, server2, server3]，开启Repeat options会生成三个面板。
	- ![](assets/Pasted%20image%2020250206171442.png)

- ### Configure tooltips
	- 参考： https://grafana.com/docs/grafana/latest/panels-visualizations/configure-tooltips/
	-  说明：当将光标悬停在可视化上时，Grafana可以显示工具提示。选择工具提示的行为方式。
		-  **Single -** 单一-悬停工具提示仅显示一个系列，即您在可视化上悬停的那个系列。
		- **All -**  全部-悬停工具提示显示可视化中的所有系列。Grafana在工具提示的系列列表中以粗体突出显示您悬停的系列。
		- **Hidden -** 隐藏-与可视化交互时不显示工具提示。
		
	- ![](assets/Pasted%20image%2020250206173957.png)

- ### Legend
	- 参考： https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/
	- 说明：
		-  Visibility  可见性[](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/#visibility)
			- 设置是否显示图例。使用开关打开或关闭图例。
		- Mode  模式[](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/#mode)
			- 设置显示图例的格式。从以下选项中选择：
				- **List  列表**
				- **Table  表格**
			- 当您将图例格式化为表格时，也可能显示有关图例的其他信息，例如关联值或图例在可视化中的位置。
		- Placement  安置[](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/#placement)
			- 设置图例在可视化中的显示位置。从以下选项中选择：
				- **Bottom  底部**
				- **Right  正确的**
		- Width  宽度[](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/#width)
			- 如果将图例放置设置为“右”，则“宽度”选项将可用。将该字段留空，以便Grafana自动设置图例宽度或在字段中输入值。
		- Values  值[](https://grafana.com/docs/grafana/latest/panels-visualizations/configure-legend/#values)
			- 通过向图例添加系列数据值或计算，可以向可视化添加更多上下文。您可以添加任意数量的值。应用更改后，您可以滚动图例以查看所有值。
	- ![](assets/Pasted%20image%2020250207140829.png)

- ### Standard options
	- 参考 https://grafana.com/docs/grafana/latest/panels-visualizations/configure-standard-options/
	- 说明
		-  Unit  单位
			- 此选项允许您选择字段应使用的单位。单击“单位”字段，然后向下搜索，直到找到所需的单位。您选择的单位将应用于除时间外的所有字段。
		- Min  最小值
			- 设置百分比阈值计算中使用的最小值。将此字段留空以自动计算最小值。
		- Max 最大值
			- 设置百分比阈值计算中使用的最大值。将此字段留空以自动计算最大值。
		- Field min/max  字段最小值/最大值
			- 默认情况下，计算的“最小值”和“最大值”基于所有系列和字段的最小值和最大值。当您启用字段最小值/最大值时，Grafana会根据字段的最小值或最大值单独计算每个字段的最小或最大值。
		- Decimals 小数
			- 指定Grafana在渲染值中需要保留的小数位数。如果将此字段留空，Grafana会根据值自动截断小数位数。例如，1.1234显示为1.12，100.456显示为100。
			- 要显示所有小数，请将单位设置为字符串。
		- Display name  显示名称
			- 设置所有字段的显示标题。您可以在字段标题中使用变量。
			- 当显示多个统计数据、字段或系列时，此字段控制每个统计数据中的标题。您可以使用 `${__field.name}` 等表达式在标题中仅使用系列名称或字段名称。
			- 下表显示了使用各种表达式生成的不同字段名的示例。在这个例子中，有一个名为“Temp”的字段，标签为{“Loc”=“PBI”，“Sensor”=”3“}：
	- ![](assets/Pasted%20image%2020250207175318.png)
- ### Axis