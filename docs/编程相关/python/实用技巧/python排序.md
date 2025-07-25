
`sort()` 和 `sorted()` 是 Python 中用于排序的两个主要函数，它们功能相似但用途略有不同。下面是详细说明：

---

## ✅ 一、共同点（sort 与 sorted 都适用）：

### 参数说明：

-   `key`：指定一个函数，排序时会用该函数作用于每个元素进行比较。
    
-   `reverse`：是否降序排序，`True` 表示降序，默认是 `False`（升序）。
    

### 示例：

```python
data = ['apple', 'banana', 'cherry']
sorted(data, key=len)  # 按字符串长度排序
```

---

## 🔷 二、`list.sort()` 方法

### ✅ 说明：

-   **只能用于列表（list）对象**；
    
-   **原地排序**：会改变原始列表，**返回值为 `None`**。
    

### 📌 语法：

```python
list.sort(key=None, reverse=False)
```

### 📌 示例：

```python
nums = [3, 1, 4, 1, 5]
nums.sort()               # 升序排序
print(nums)               # [1, 1, 3, 4, 5]

nums.sort(reverse=True)   # 降序排序
print(nums)               # [5, 4, 3, 1, 1]
```

### ⚠️ 注意：

```python
res = nums.sort()
print(res)  # None
```

---

## 🔷 三、`sorted()` 函数

### ✅ 说明：

-   **适用于任何可迭代对象**（如 list、tuple、dict、set、string 等）；
    
-   **不会改变原始对象**，**返回一个新的排序结果列表**。
    

### 📌 语法：

```python
sorted(iterable, key=None, reverse=False)
```

### 📌 示例：

```python
nums = [3, 1, 4, 1, 5]
new_nums = sorted(nums)
print(nums)      # 原始列表不变: [3, 1, 4, 1, 5]
print(new_nums)  # 返回新列表:   [1, 1, 3, 4, 5]
```

---

## 🔶 四、使用 key 自定义排序规则

```python
words = ['apple', 'Banana', 'cherry', 'date']

# 按长度排序
print(sorted(words, key=len))  # ['date', 'apple', 'Banana', 'cherry']

# 忽略大小写排序
print(sorted(words, key=str.lower))  # ['apple', 'Banana', 'cherry', 'date']

# 对字典排序（按值）
d = {'a': 3, 'b': 1, 'c': 2}
print(sorted(d.items(), key=lambda x: x[1]))  # [('b', 1), ('c', 2), ('a', 3)]
```

---

## 🔻 五、总结对比表格：

| 特性       | `sort()`    | `sorted()` |
| -------- | ----------- | ---------- |
| 类型限制     | 只能用于 `list` | 可用于任意可迭代对象 |
| 是否改变原始对象 | 是（就地排序）     | 否（返回新列表）   |
| 返回值      | `None`      | 新的已排序列表    |
| 性能       | 稍快（就地排序）    | 稍慢（创建新对象）  |
