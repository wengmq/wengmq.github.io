
在 Shell（如 Bash）中，可以使用 `case ... in ... esac` 来实现 `switch-case` 的效果。语法如下：

```bash
#!/bin/bash

value=$1

case "$value" in
  start)
    echo "Starting service..."
    ;;
  stop)
    echo "Stopping service..."
    ;;
  restart)
    echo "Restarting service..."
    ;;
  *)
    echo "Usage: $0 {start|stop|restart}"
    ;;
esac
```

### 说明：

-   `case "$value" in`：开始 case 分支结构。
    
-   每个 `pattern)` 是一个 case 分支，匹配到后执行其对应命令。
    
-   `;;` 表示该分支结束。
    
-   `*)` 是默认分支，等价于 `default`，当没有任何 pattern 匹配时执行。
    

### 示例调用：

```bash
./script.sh start     # 输出: Starting service...
./script.sh abc       # 输出: Usage: ...
```