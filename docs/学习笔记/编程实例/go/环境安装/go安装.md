- ### 环境安装：
	- 参考：https://www.runoob.com/go/go-environment.html
	- 去官网下载合适的压缩包 https://go.dev/dl/
	- 将下载的二进制包解压至 /usr/local目录。
		- tar -C /usr/local -xzf go1.4.linux-amd64.tar.gz
	- 将 /usr/local/go/bin 目录添加至 PATH 环境变量：
		- export PATH=$PATH:/usr/local/go/bin
	- source激活 （激活后可以用which go查看）
		- source /etc/bashrc 



- ### 环境变量设置

	##### 1. `GOPATH`
	
	- **作用**：指定 Go 工作空间的路径。
	- **示例**：`export GOPATH=$HOME/go`
	- **说明**：`GOPATH` 包含了 Go 的源码、编译后的包和可执行文件。默认值是 `$HOME/go`。在 Go modules 环境下（即 Go 1.11 及更高版本），不再需要手动设置 `GOPATH`，除非你需要手动管理项目。
		- `GOPATH` 是 Go 的工作空间，用于存放 Go 代码和构建输出。在 `GOPATH` 下，默认会有以下三个主要目录：
		- `src` 目录
			- **路径**：`$GOPATH/src`
			- **说明**：`src` 目录用于存放源码文件。项目的结构通常按 `import path` 路径组织，如 `github.com/username/projectname`，会存储在 `src/github.com/username/projectname` 下。
			- **内容**：该目录下包含 `.go` 文件、依赖的第三方包以及项目的其他源文件。
		-  `pkg` 目录
			- **路径**：`$GOPATH/pkg`
			- **说明**：`pkg` 目录用于存放编译后的包文件。Go 会将 `src` 中的源文件编译成二进制包文件并放在 `pkg` 目录下，以便在下一次构建时复用，提高构建效率。
			- **内容**：`pkg` 目录结构通常为 `$GOPATH/pkg/<OS>_<ARCH>/`，其中 `<OS>` 和 `<ARCH>` 分别表示操作系统和架构，比如 `linux_amd64`。目录下存放 `.a` 文件（已编译的 Go 包）。
		-  `bin` 目录
			- **路径**：`$GOPATH/bin`
			- **说明**：`bin` 目录用于存放编译后的可执行文件。对于带 `main` 包的 Go 程序，编译后会在 `bin` 目录生成一个可执行文件。
			- **内容**：如果项目是一个 CLI 工具，编译完成后会在 `bin` 目录生成一个二进制文件，名称为该工具的项目名称。



### 其他注意事项

- 在 Go modules 模式下（Go 1.11 及以上），不需要将项目放在 `GOPATH/src` 中，可以随意放在文件系统的任意位置。但 `GOPATH/bin` 仍然是 `go install` 生成二进制文件的默认路径。
- 如果 `GOPATH` 包含多个路径（用 `:` 分隔），Go 会使用第一个路径的 `src`、`pkg` 和 `bin` 目录。
	
	##### 2. `GOROOT`
	
	- **作用**：指定 Go 的安装目录。
	- **示例**：`export GOROOT=/usr/local/go`
	- **说明**：一般情况下不需要修改 `GOROOT`，除非你手动安装了 Go，并且没有使用包管理工具自动配置。
	
	##### 3. `GOBIN`
	
	- **作用**：指定编译后生成的二进制文件存放位置。
	- **示例**：`export GOBIN=$GOPATH/bin`
	- **说明**：如果没有设置 `GOBIN`，Go 将默认将编译后的二进制文件放在 `$GOPATH/bin` 中。
	
	##### 4. `GO111MODULE`
	
	- **作用**：启用或禁用 Go modules。
	- **值**：
	    - `on`：强制启用 Go modules。
	    - `off`：强制禁用 Go modules，使用传统的 `GOPATH` 模式。
	    - `auto`（默认）：在项目根目录包含 `go.mod` 文件时启用 Go modules，否则禁用。
	- **示例**：`export GO111MODULE=on`
	- **说明**：在 Go 1.16+ 中，Go modules 已成为默认模式。
	
	##### 5. `GOPROXY`
	
	- **作用**：设置 Go modules 的代理地址。
	- **示例**：`export GOPROXY=https://goproxy.io,direct`
	- **说明**：Go 通过 `GOPROXY` 加速依赖包的下载，尤其是国内环境，可以使用如 `https://goproxy.cn` 等国内代理来提升速度。



参考：https://blog.csdn.net/wenbingy/article/details/136247596