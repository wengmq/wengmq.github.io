
在编写 Linux bash shell 脚本时，经常会用到 `$0、$1、$2、$#、$@、$*、$?` 等参数。下面具体说明这些参数的含义。

#### 假设执行 `./test.sh a b c` 这样一个命令，则可以使用下面的参数来获取一些值：

- `$0`  
    对应 _./test.sh_ 这个值。如果执行的是 `./work/test.sh`， 则对应 _./work/test.sh_ 这个值，而不是只返回文件名本身的部分。
- `$1`  
    会获取到 a，即 `$1` 对应传给脚本的第一个参数。
- `$2`  
    会获取到 b，即 `$2` 对应传给脚本的第二个参数。
- `$3`  
    会获取到 c，即 `$3` 对应传给脚本的第三个参数。`$4`、`$5` 等参数的含义依此类推。
- `$#`  
    会获取到 3，对应传入脚本的参数个数，统计的参数不包括 `$0`。
- `$@`  
    会获取到 "a" "b" "c"，也就是所有参数的列表，不包括 `$0`。
- `$*`  
    也会获取到 "a" "b" "c"， 其值和 `$@` 相同。但 `"$*"` 和 `"$@"` 有所不同。  
    `"$*"` 把所有参数合并成一个字符串，而 `"$@"` 会得到一个字符串参数数组。
- `$?`  
    可以获取到执行 `./test.sh a b c` 命令后的返回值。  
    在执行一个前台命令后，可以立即用 `$?` 获取到该命令的返回值。  
    该命令可以是系统自身的命令，可以是 shell 脚本，也可以是自定义的 bash 函数。
    通常系统命令的返回值0表示没有错误，其他表示有错误
- `$$`  
    脚本运行的当前进程ID号

当执行系统自身的命令时，`$?` 对应这个命令的返回值。  
当执行 shell 脚本时，`$?` 对应该脚本调用 `exit` 命令返回的值。如果没有主动调用 `exit` 命令，默认返回为 0。  
当执行自定义的 bash 函数时，`$?` 对应该函数调用 `return` 命令返回的值。如果没有主动调用 `return` 命令，默认返回为 0。


#### 下面举例说明 `"$*"` 和 `"$@"` 的差异。假设有一个 `testparams.sh` 脚本，内容如下：

```
#!/bin/bash

for arg in "$*"; do
    echo "****:" $arg
done
echo --------------
for arg in "$@"; do
    echo "@@@@:" $arg
done

```

这个脚本分别遍历 `"$*"` 和 `"$@"` 扩展后的内容，并打印出来。

执行 `./testparams.sh` 脚本，结果如下：

```
$ ./testparams.sh This is a test
****: This is a test
--------------
@@@@: This
@@@@: is
@@@@: a
@@@@: test
```

可以看到，`"$*"` 只产生一个字符串，for 循环只遍历一次。  
而 `"$@"` 产生了多个字符串，for 循环遍历多次，是一个字符串参数数组。

**注意**：如果传入的参数多于 9 个，则不能使用 `$10` 来引用第 10 个参数，而是要用 `${10}` 来引用。

即，需要用大括号`{}`把大于 9 的数字括起来。  
例如，`${10}` 表示获取第 10 个参数的值，写为 `$10` 获取不到第 10 个参数的值。  
实际上，`$10` 相当于 `${1}0`，也就是先获取 `$1` 的值，后面再跟上 0。  
如果 `$1` 的值是 "first"，则 `$10` 的值是 "first0"。

查看 man bash 里面对位置参数（positional parameters）的说明如下：

> **Positional Parameters**  
> A positional parameter is a parameter denoted by one or more digits, other than the single digit 0.
> 
> Positional parameters are assigned from the shell's arguments when it is invoked, and may be reassigned using the set builtin command.  
> Positional parameters may not be assigned to with assignment statements.  
> The positional parameters are temporarily replaced when a shell function is executed.
> 
> When a positional parameter consisting of more than a single digit is expanded, it must be enclosed in braces.

即，最后一句提到，当位置参数由多位数字组成时，需要用大括号`{}`把多位数字括起来。



#### 获取位置参数的个数

在 bash 中，可以使用 `$#` 来获取传入的命令行或者传入函数的参数个数。  
要注意的是，`$#` 统计的参数个数不包括脚本自身名称或者函数名称。  
例如，执行 `./a.sh a b`，则 `$#` 是 2，而不是 3。

查看 man bash 的说明如下：

> **Special Parameters**  
> **#** Expands to the number of positional parameters in decimal.

可以看到，`$#` 实际上是扩展为位置参数（positional parameters）的个数，统计的参数不包括 `$0`


#### 参考：
- https://segmentfault.com/a/1190000021435389