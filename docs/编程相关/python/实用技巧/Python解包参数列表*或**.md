参数的解包(拆包)： 例如传递实参时，可以在序列类型的参数前添加星号，  
这样他会自动将序列中的元素依次作为参数传递
官方的解释：
- https://docs.python.org/zh-cn/3.9/tutorial/controlflow.html#unpacking-argument-lists


## 解包列表或元组 *

```python
a = [1, 10]
a = (1, 10)
print(*a)  # 相当于print(1, 10)
print(list(range(*a)))  # 相当于print(list(range(1, 10)))
```


## 解包字典 **

```python
def linear(x, k, b=0):
    return k * x + b


a = {'x': 2, 'k': 3}
print(linear(**a))  # 相当于 print(linear(x=2, k=3))
```


## 变量解包

```python
data = [1, 2, 3, 4, 5]
first, *middle, last = data
print(first)
print(middle)
print(last)
```


## 参考
- https://blog.csdn.net/lly1122334/article/details/106994678