## 命令参数说明：
-   `iostat`：显示 Linux 系统的 CPU 和 I/O 统计信息。
    
-   `-d`：仅显示 **设备统计信息**（Device stats），而不显示 CPU 使用情况。  
    如果不加 `-d`，默认会显示 CPU + 设备。
    
-   `-x`：显示 **扩展设备统计信息**（Extended stats），包括更多详细指标，比如：
    
    -   `r/s` / `w/s` → 每秒读/写请求数
        
    -   `rkB/s` / `wkB/s` → 每秒读/写的 KB 数
        
    -   `await` → 每次 I/O 平均等待时间（ms）
        
    -   `svctm` → 每次 I/O 平均服务时间（ms）
        
    -   `util` → 设备繁忙百分比
        
-   `1`：**采样间隔 1 秒**。  
    iostat 会每隔 1 秒输出一次统计数据。
    

> ⚠️ 注意：如果只写 `1`，iostat 会**连续打印每秒的统计**，直到你 Ctrl+C 停止。  
> 如果写 `1 10`，就是每秒输出一次，共输出 10 次，然后退出。



##  输出解释（典型字段）

```bash
# iostat -dx 1

Device:         r/s     w/s    rkB/s   wkB/s  rrqm/s  wrqm/s  r_await w_await svctm  %util
vdb             40.62   100.5  3072    39011    0       0      12.3    7.8     1.2    99.8
```

-   `r/s`、`w/s`：每秒的 **读/写 I/O 请求数**
    
-   `rkB/s`、`wkB/s`：每秒 **读/写的数据量（KB/s）**
    
-   `rrqm/s`、`wrqm/s`：**合并 I/O 请求数**（Request merged）
    
-   `r_await`、`w_await`：读/写 I/O 平均等待时间（ms）
    
-   `svctm`：I/O 平均服务时间（ms）
    
-   `%util`：设备繁忙百分比（100% 表示设备满负荷）
    
