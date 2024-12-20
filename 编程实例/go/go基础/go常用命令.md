
Go 编程语言有一些常用的命令行工具和选项，主要通过 `go` 工具来管理项目、构建、测试、以及模块化依赖等。以下是 Go 常用的命令行工具和选项：

### 1. 基础项目管理

- **`go run <file.go>`**  
    编译并运行 Go 源文件。适合快速测试和执行单文件程序。
    
- **`go build`**  
    编译代码并生成二进制文件。会输出到当前目录。
    
- **`go install`**  
    编译并安装包，输出到 `$GOPATH/bin`，然后可以直接在命令行运行生成的可执行文件。
    
- **`go get <package>`**  
    下载并安装指定的包或模块。
    

### 2. 依赖管理

- **`go mod init <module-name>`**  
    初始化一个新的模块，创建 `go.mod` 文件 。
    
- **`go mod tidy`**  
    清理 `go.mod` 文件，移除未使用的依赖并添加缺失的依赖。
    
- **`go mod download`**  
    下载 `go.mod` 中的所有依赖包到本地 `module cache`。
    
- **`go mod verify`**  
    验证模块依赖的哈希值，确保模块未被篡改。
    

### 3. 测试与代码质量

- **`go test`**  
    执行测试文件，以 `*_test.go` 文件中的单元测试为准。
    
- **`go test -v`**  
    显示详细的测试过程和输出信息。
    
- **`go test -bench .`**  
    执行基准测试。
    
- **`go fmt <file.go>`**  
    格式化 Go 源代码，使之符合 Go 编码规范。
    
- **`go vet`**  
    静态代码分析工具，检查代码中的潜在错误。
    

### 4. 文档与查看

- **`go doc <package>`**  
    查看包的文档，或查看包中指定函数、变量的详细信息。
    
- **`go list`**  
    列出项目中的包及其依赖项信息。可以加选项以获取更详细的模块信息。
    

### 5. 其他

- **`go clean`**  
    清理构建过程中生成的文件，例如可执行文件、缓存等。
    
- **`go env`**  
    查看和设置 Go 的环境变量。
    
- **`go version`**  
    显示当前安装的 Go 版本信息。


