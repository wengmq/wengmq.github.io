我们知道，像java，C这样的编译型语言都会有一个函数入口，这种结构使得代码可读性很强，我们知道哪些直接执行，那些是函数。但是脚本不一样，脚本属于解释性语言，从第一行直接执行到最后一行，如果在这当中命令与函数糅杂在一起，那就非常难读了。

各位同学应该都写过python，因此大家都知道一个合乎标准的python脚本大体上至少是这样的：

```text
#!/usr/bin/env python

def func1():
    pass

def func2():
    pass

if __name__=='__main__':
    func1()
    func2()
```

他用一个很巧妙的方法实现了我们习惯的main函数，使得代码可读性更强。

在shell中，我们也有类似的小技巧:

```text
#!/usr/bin/bash

func1(){
    #do sth
}

func2(){
    #do sth
}

main(){
    func1
    func2
}

main "$@"
```

我们可以采用这种写法，同样实现类似的main函数，使得脚本的结构化程度更好。

另外在传递参数的时候可能会遇到参数接收位置的变化，记得使用`shift`函数。