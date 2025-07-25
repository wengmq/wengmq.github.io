
## 一、集合运算符/方法详解
### ✅ 并集（union）

| 说明  | 两个集合中所有不重复的元素 |
| --- | ------------- |

```python
a = {1, 2, 3}
b = {3, 4, 5}

print(a | b)            # 输出: {1, 2, 3, 4, 5}
print(a.union(b))       # 同上
```

---

### ✅ 交集（intersection）

| 说明 | 两个集合中都包含的元素 |
| --- | --- |

```python
a = {1, 2, 3}
b = {2, 3, 4}

print(a & b)                  # 输出: {2, 3}
print(a.intersection(b))     # 同上
```

---

### ✅ 差集（difference）

| 说明 | A 中有而 B 中没有的元素 |
| --- | --- |

```python
a = {1, 2, 3}
b = {2, 3, 4}

print(a - b)                # 输出: {1}
print(a.difference(b))     # 同上
```

---

### ✅ 对称差集（symmetric\_difference）

| 说明 | 两个集合中 **不重叠** 的元素 |
| --- | --- |

```python
a = {1, 2, 3}
b = {2, 3, 4}

print(a ^ b)                          # 输出: {1, 4}
print(a.symmetric_difference(b))     # 同上
```



## 二、判断集合关系

### ✅ 是否为子集（subset）

```python
a = {1, 2}
b = {1, 2, 3}

print(a <= b)             # True
print(a.issubset(b))      # True
```

### ✅ 是否为超集（superset）

```python
print(b >= a)             # True
print(b.issuperset(a))    # True
```

### ✅ 是否没有交集（isdisjoint）

```python
a = {1, 2}
b = {3, 4}

print(a.isdisjoint(b))    # True
```
