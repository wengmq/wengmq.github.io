## Ollama 本地化部署

#### 1.1 下载Ollama

- 首先登录Ollama官网地址： [https://ollama.com/](https://ollama.com/) 

- 目前Ollama支持macOS、Linux、Windows，选择相应的系统，macOS和Windows直接下载，Linux系统需要执行下面命令：
```
curl -fsSL https://ollama.com/install.sh | sh
```
- windows直接下载对应exe程序进行安装：
![](assets/Pasted%20image%2020250617173845.png)

#### 1.2 选择模型

- 点击进去后，查看各个模型，不同模型执行的命令不同，最后部分看你选择的参数模型。
- DeepSeek R1提供多个版本，参数量越大，模型通常越强大，但也需要更多的计算资源。
- 比如1.5B代表有15亿个参数。
- 具体选择哪一个看你硬件设备了，家用的电脑选择1.5B的就行了。
![](assets/Pasted%20image%2020250617174017.png)

- DeepSeek-R1版本介绍、参数量、特点、使用场景和硬件配置，可以参考下表：

| DeepSeek模型版本                                                                                                                                      | 参数量  | 特点                         | 适用场景                                                               | 硬件配置                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ---- | -------------------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| [DeepSeek-R1-1.5B](https://zhida.zhihu.com/search?content_id=253528608&content_type=Article&match_order=1&q=DeepSeek-R1-1.5B&zhida_source=entity) | 1.5B | 轻量级模型，参数量少，模型规模小           | 适用于轻量级任务，如短文本生成、基础问答等                                              | 4核处理器、8G内存，无需显卡                           |
| [DeepSeek-R1-7B](https://zhida.zhihu.com/search?content_id=253528608&content_type=Article&match_order=1&q=DeepSeek-R1-7B&zhida_source=entity)     | 7B   | 平衡型模型，性能较好，硬件需求适中          | 适合中等复杂度任务，如文案撰写、表格处理、统计分析等                                         | 8核处理器、16G内存，Ryzen7或更高，RTX 3060（12GB）或更高   |
| [DeepSeek-R1-8B](https://zhida.zhihu.com/search?content_id=253528608&content_type=Article&match_order=1&q=DeepSeek-R1-8B&zhida_source=entity)     | 8B   | 性能略强于7B模型，适合更高精度需求         | 适合需要更高精度的轻量级任务，比如代码生成、逻辑推理等                                        | 8核处理器、16G内存，Ryzen7或更高，RTX 3060（12GB）或4060 |
| [DeepSeek-R1-14B](https://zhida.zhihu.com/search?content_id=253528608&content_type=Article&match_order=1&q=DeepSeek-R1-14B&zhida_source=entity)   | 14B  | 高性能模型，擅长复杂的任务，如数学推理、代码生成   | 可处理复杂任务，如长文本生成、数据分析等                                               | i9-13900K或更高、32G内存，RTX 4090（24GB）或A5000   |
| DeepSeek-R1-32B                                                                                                                                   | 32B  | 专业级模型，性能强大，适合高精度任务         | 适合超大规模任务，如语言建模、大规模训练、金融预测等                                         | Xeon 8核、128GB内存或更高，2-4张A100（80GB）或更高      |
| [DeepSeek-R1-70B](https://zhida.zhihu.com/search?content_id=253528608&content_type=Article&match_order=1&q=DeepSeek-R1-70B&zhida_source=entity)，  | 70B  | 顶级模型，性能最强，适合大规模计算和高复杂任务    | 适合高精度专业领域任务，比如多模态任务预处理。这些任务对硬件要求非常高，需要高端的 CPU 和显卡，适合预算充足的企业或研究机构使用 | Xeon 8核、128GB内存或更高，8张A100/H100（80GB）或更高   |
| DeepSeek-R1-671B                                                                                                                                  | 671B | 超大规模模型，性能卓越，推理速度快，适合极高精度需求 | 适合国家级 / 超大规模 AI 研究，如气候建模、基因组分析等，以及通用人工智能探索                         | 64核、512GB或更高，8张A100/H100                  |

如何选择？资源有限选择选1.5B-14B，性价比更高；运行企业复杂任务选择32B-70B平衡性能与成本；尖端科研/高精度需求：优先671B，但需配套基础设施。


## 参考
- https://zhuanlan.zhihu.com/p/20733964413
- 前端工具：
	- 谷歌插件：Page Assist
	- web前端：Open WebUI