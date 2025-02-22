Python 的 `filter()` 函数用于**过滤序列**，保留符合条件的元素，返回一个迭代器对象。以下是它的核心用法和示例：

---

## 基本语法

```python
filter(function, iterable)
```

- **function**：过滤条件函数（若为 `None`，则过滤掉 `iterable` 中判断为 `False` 的元素，如空字符串、`0` 等）。
    
- **iterable**：可迭代对象（如列表、元组等）。
    

---

## 示例代码

#### 1. 过滤偶数

```python
numbers = [1, 2, 3, 4, 5, 6]
result = filter(lambda x: x % 2 == 0, numbers)
print(list(result))  # 输出 [2, 4, 6]
```


#### 2. 过滤非空字符串


```python
words = ["hello", "", "world", None, " ", "python"]
result = filter(None, words)  # 过滤掉空字符串、None（但保留空格" "）
print(list(result))  # 输出 ['hello', 'world', ' ', 'python']
```



#### 3. 自定义过滤函数

```python
def is_positive(n):
    return n > 0

numbers = [-5, 10, 0, -3, 8]
result = filter(is_positive, numbers)
print(list(result))  # 输出 [10, 8]
```


#### 4. 过滤字典列表中的特定数据

```python
students = [
    {"name": "Alice", "age": 20},
    {"name": "Bob", "age": 17},
    {"name": "Charlie", "age": 22}
]
# 过滤年龄 >=18 的学生
adults = filter(lambda s: s["age"] >= 18, students)
print(list(adults))  # 输出 [{'name': 'Alice', 'age': 20}, {'name': 'Charlie', 'age': 22}]

```


---


## 注意事项

1. **返回迭代器**：`filter()` 返回的是迭代器（Python3），需用 `list()`、`tuple()` 等转换为容器类型才能直接查看结果。
    
2. **函数返回值**：传入的函数应返回布尔值（`True`/`False`）。非布尔值时，Python 会尝试隐式转换（如非零数值视为 `True`）。
    
3. **性能优化**：相比 `for` 循环，`filter()` 更简洁，但在复杂逻辑时，列表推导式可能更直观：
    

```python
# 等效于 filter 的列表推导式
[x for x in iterable if condition(x)]
```
    

---

