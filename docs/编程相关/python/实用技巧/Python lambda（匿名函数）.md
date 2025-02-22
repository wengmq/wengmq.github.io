[`lambda`](https://docs.python.org/zh-cn/3.9/reference/expressions.html#lambda) 关键字用于创建小巧的匿名函数。`lambda a, b: a+b` 函数返回两个参数的和。Lambda 函数可用于任何需要函数对象的地方。在语法上，匿名函数只能是单个表达式。在语义上，它只是常规函数定义的语法糖。与嵌套函数定义一样，lambda 函数可以引用包含作用域中的变量：

```python
>>> def make_incrementor(n):
...     return lambda x: x + n
...
>>> f = make_incrementor(42)
>>> f(0)
42
>>> f(1)
43
```
上例用 lambda 表达式返回函数。还可以把匿名函数用作传递的实参：

```python

>>> pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
>>> pairs.sort(key=lambda pair: pair[1])
>>> pairs
[(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]

```
## 参考
- 官方说明：
	- https://docs.python.org/zh-cn/3.9/tutorial/controlflow.html#lambda-expressions
- 详细请参考：
	- https://www.runoob.com/python3/python-lambda.html