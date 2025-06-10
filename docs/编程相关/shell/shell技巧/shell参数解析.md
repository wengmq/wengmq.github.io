`getopts` 是 Bash 中用于解析**短选项参数**（如 `-a -b -c value`）的内建命令，适用于编写结构化的命令行脚本。相比直接使用 `"$@"` 遍历参数，`getopts` 提供了更清晰和标准的方式来处理选项。

---

## 📌 一、基本语法

```bash
getopts optstring variable
```


- `optstring` 是选项字符的集合，例如 `ab:c` 表示 `-a`、`-b`（带参数）、`-c`。
    
    - 如果一个选项后跟冒号 `:`，表示该选项需要一个参数。
        
- `variable` 是 `getopts` 每次解析一个参数后存入的变量名。
    

---

## 📌 二、示例：处理 `-a -b value -c`

### 1. 示例脚本

```bash
#!/bin/bash

while getopts "ab:c" opt; do
  case "$opt" in
    a)
      echo "选项 -a 被触发"
      ;;
    b)
      echo "选项 -b 被触发，参数为 $OPTARG"
      ;;
    c)
      echo "选项 -c 被触发"
      ;;
    \?)
      echo "无效的选项: -$OPTARG" >&2
      ;;
    :)
      echo "选项 -$OPTARG 缺少参数" >&2
      ;;
  esac
done

```


### 2. 执行示例

```bash
./script.sh -a -b value -c

```

输出：

```bash
选项 -a 被触发
选项 -b 被触发，参数为 value
选项 -c 被触发
```


---

## 📌 三、重要变量说明

|变量|说明|
|---|---|
|`$OPTIND`|当前处理到的位置索引，`getopts` 会自动更新。可以在处理完选项后用 `shift $((OPTIND - 1))` 获取剩余参数。|
|`$OPTARG`|当前选项的参数（如果有的话）。|
|`$opt`|当前解析的选项名。|
|`\?)`|无效选项处理|
|`:)`|缺失参数的选项处理（需要在 `optstring` 前加冒号）|

---

## 📌 四、支持错误处理：使用前导冒号

```bash
getopts ":ab:c" opt
```


- 这样设置可以自定义错误处理：
    
    - `opt` 为 `?`：表示未知选项。
        
    - `opt` 为 `:`：表示缺少参数，此时 `$OPTARG` 是缺失参数的选项。
        

---

## 📌 五、处理剩余参数

- #### shift $((OPTIND - 1)) 是将位置参数左移，以「去掉已经被 getopts 处理过的选项参数」。
- #### echo "$@" 是打印剩下的参数（即非选项参数）。

#### 举例说明

假设你执行脚本：

```bash
./myscript.sh -a -b value foo bar
```

在 `getopts` 处理完 `-a` 和 `-b value` 之后，位置参数列表仍然是：

```bash
$1 = -a  
$2 = -b  
$3 = value  
$4 = foo  
$5 = bar
```

而 `getopts` 会更新 `$OPTIND` 为 4（表示已经处理到第4个参数）。

那么这句：

```bash
shift $((OPTIND - 1))   # shift 3
```

会将前 3 个参数移出，剩下：

```bash
$1 = foo  
$2 = bar
```

此时：

```bash
echo "$@"
```

就会打印：

```nginx
foo bar
```


```bash
shift $((OPTIND - 1)) 
echo "剩余参数: $@"
```



---

## 📌 六、完整示例：常见参数解析

```bash
#!/bin/bash

usage() {
  echo "用法: $0 [-u 用户名] [-p 密码] [-h]"
  exit 0
}

while getopts ":u:p:h" opt; do
  case "$opt" in
    u) user=$OPTARG ;;
    p) pass=$OPTARG ;;
    h) usage ;;
    :) echo "错误: -$OPTARG 缺少参数" >&2; usage ;;
    \?) echo "错误: 无效选项 -$OPTARG" >&2; usage ;;
  esac
done

shift $((OPTIND - 1))

echo "用户名: $user"
echo "密码: $pass"
echo "剩余参数: $@"

```

---

## 📌 七、注意事项

- `getopts` 不支持长选项（如 `--help`），如需支持长选项请使用 `getopt`（注意不是 `getopts`）或手动处理参数。
    
- `getopts` 是内建命令，比 `getopt` 更可移植。
    
- 要兼容 POSIX 脚本，应避免空格写法：推荐 `while getopts "ab:" opt`，而不是 `while getopts "a b:" opt`。