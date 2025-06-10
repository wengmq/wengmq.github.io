## 简介

- 包含了基本的结构、常用的功能（如参数处理、日志记录、错误处理和清理操作等），你可以根据实际需求进行修改和扩展。

- 模板说明：
	- #!/bin/bash 表明使用 Bash 解释器执行脚本。
	- cleanup 函数：用于在脚本终止时执行清理操作（如删除临时文件），并捕捉常见信号（SIGINT、SIGTERM）。
	- 日志函数：log 函数用于输出带有时间戳的日志信息。
	- 错误处理：error_exit 函数用于处理错误并以非零退出状态终止脚本。
	- 命令行参数处理：使用 getopts 解析命令行选项（例如 -h 显示帮助，-v 显示版本，-o 指定输出文件）。
	- 主逻辑：在 main 函数中定义主要的操作流程，包括对输出文件的处理。
	- 调试和退出码：使用 $? 检查命令执行状态，确保正确处理错误情况。

- 如何运行：
	- 保存脚本为 script_template.sh。
- 赋予执行权限：
	- chmod +x script_template.sh
- 使用方式：
	- 查看帮助：./script_template.sh -h
	- 查看版本：./script_template.sh -v

## 脚本内容

```bash
#!/bin/bash
#======================================================
# 脚本名称：        script_template.sh
# 版本：            1.1
# 作者：            Your Name
# 创建日期：        YYYY-MM-DD
# 描述：            通用的 Shell 脚本模板（带日志、多参数支持）
# 用法：            ./script_template.sh [-h] [-v] [-f <value>] [-k <value>]
#======================================================

# 更安全的脚本设置
set -euo pipefail
IFS=$'\n\t'

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SCRIPT_NAME="$(basename "$0")"
LOG_FILE="${SCRIPT_DIR}/${SCRIPT_NAME%.sh}.log"


# 日志函数：同时输出到终端和日志文件
log() {
    local msg="[INFO] $(date '+%Y-%m-%d %H:%M:%S') : $*"
    echo "$msg" | tee -a "$LOG_FILE"
}

error_exit() {
    local msg="[ERROR] $(date '+%Y-%m-%d %H:%M:%S') : $*"
    echo "$msg" | tee -a "$LOG_FILE" >&2
    exit 1
}

# 清理函数（接收 Ctrl+C 或其他终止信号时调用）
cleanup() {
    log "接收到中断信号，开始清理操作..."
    # TODO: 添加清理逻辑
    exit 1
}
trap cleanup SIGINT SIGTERM

# 打印帮助信息
usage() {
    cat <<EOF
Usage: $0 [-h] [-v] [-o <output file>]

  -h            显示帮助信息
  -v            显示脚本版本
  -f  <value>   执行测试函数，参数值为 <value>
  -k  <value>   执行测试函数2，参数值为 <value>
EOF
    exit 0
}

# 打印版本信息
version() {
    echo "${SCRIPT_NAME} version 1.1"
}

# 参数对应的函数
test_function() {
    log "执行测试函数, 参数值为：$1"
}
# 参数对应的函数
test2_function() {
    log "执行测试函数2, 参数值为：$1"
}

# 参数解析封装（参数后面加:表示需要带上参数值）
parse_args() {
    while getopts ":hvf:k:" opt; do
        case "${opt}" in
            h) usage ;;
            v) version ;;
            f) 
                test_function ${OPTARG}
                ;;
            k) 
                test2_function ${OPTARG}
                ;;
            :) error_exit "选项 -${OPTARG} 需要参数。" ;;
            \?) error_exit "无效的选项: -${OPTARG}" ;;
        esac
    done
}

# 主逻辑
main() {
    # 记录脚本开始时间
    SCRIPT_START_TIME=$(date +%s)
    log "脚本开始时间: $(date '+%Y-%m-%d %H:%M:%S')"
    # 解析参数
    parse_args "$@"

    #=======================主逻辑开始=======================
    log "主逻辑开始执行..."

    log "111111"
    sleep 3

    log "主逻辑执行结束"
    #=======================主逻辑解释=======================

    # 记录脚本结束时间
    SCRIPT_END_TIME=$(date +%s)
    log "脚本完成时间: $(date '+%Y-%m-%d %H:%M:%S')"
    log "脚本总耗时: $((SCRIPT_END_TIME - SCRIPT_START_TIME)) 秒"
}

# 执行主函数
main "$@"



```


## 参考：
- https://blog.csdn.net/weixin_44251074/article/details/142457829