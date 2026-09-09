Python 中的 `@property` 装饰器是一个非常优雅且强大的面向对象编程工具。简单来说，**它的核心作用是将一个类方法（method）伪装成一个数据属性（attribute）来访问**。

这样做的最大好处是：在不改变属性访问方式（`obj.attribute`）的前提下，在底层注入了方法调用的逻辑。

以下是 `@property` 的核心作用以及最常见的应用场景：

### 一、 `@property` 的核心作用

1. **实现只读属性（Read-only Attributes）：** 防止类的核心属性被外部代码意外修改。
    
2. **数据校验与拦截（Data Validation）：** 在给属性赋值时，拦截赋值操作，检查数据的合法性（结合 `@<name>.setter` 使用）。
    
3. **动态计算（Computed Properties）：** 某些属性的值依赖于其他属性，不需要在内存中死记硬背，而是在被访问时动态计算得出。
    
4. **平滑重构（Graceful Refactoring）：** 当你需要把一个公开的“属性”改为“方法”来增加内部逻辑时，使用 `@property` 可以保证所有调用该类的外部代码不需要做任何修改。
    

### 二、 经典应用场景与代码示例

#### 场景 1：动态计算属性（且作为只读属性保护起来）

有些属性的值是基于其他属性计算出来的。如果直接存储，当基础数据改变时，很容易出现数据不一致。使用 `@property` 可以实时计算，并且由于没有定义 `setter`，它天生就是**只读**的。

Python

```python
class Circle:
    def __init__(self, radius):
        self.radius = radius

    @property
    def area(self):
        # 面积是动态计算出来的，不需要单独用 self.area 去存储
        return 3.14159 * (self.radius ** 2)

c = Circle(5)
print(c.radius)  # 输出: 5
print(c.area)    # 输出: 78.53975 (像访问属性一样调用方法)

# 如果尝试修改 area，会报错 AttributeError: can't set attribute
# c.area = 100 
```

#### 场景 2：数据校验（结合 Setter 使用）

在公有属性被外部赋值时，我们往往需要确保传入的数据是合法的。如果不使用 `@property`，我们就得写 `set_age()` 和 `get_age()` 这样的 Java 风格代码，这在 Python 中不够优雅。

Python

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age  # 注意：这里赋值时会自动触发下方的 @age.setter

    @property
    def age(self):
        """这是 getter 方法"""
        return self._age

    @age.setter
    def age(self, value):
        """这是 setter 方法，用于数据校验"""
        if not isinstance(value, int):
            raise TypeError("年龄必须是整数！")
        if value < 0 or value > 150:
            raise ValueError("年龄必须在 0 到 150 之间！")
        self._age = value  # 校验通过后，存入内部私有变量 _age 中

p = Person("Alice", 25)
p.age = 30  # 正常赋值
print(p.age) # 输出: 30

# p.age = -5 # 会抛出 ValueError: 年龄必须在 0 到 150 之间！
```

_注意：在 `setter` 中，我们通常将实际数据存储在一个带下划线的私有变量中（如 `self._age`），以避免与 `@property` 定义的方法名（`age`）冲突导致无限递归。_

#### 场景 3：实现属性删除拦截（结合 Deleter 使用）

虽然不常用，但当你需要控制某个属性被 `del` 关键字删除时的行为，可以使用 `@<name>.deleter`。

Python

```python
class FileManager:
    def __init__(self, filename):
        self._filename = filename

    @property
    def filename(self):
        return self._filename

    @filename.deleter
    def filename(self):
        print(f"警告：正在清理文件记录 {self._filename}...")
        self._filename = None

f = FileManager("data.txt")
del f.filename  # 输出: 警告：正在清理文件记录 data.txt...
```

#### 场景 4：平滑的代码重构（API 兼容性）

假设你写了一个类，早期版本直接暴露了属性：

Python

```python
class Wallet:
    def __init__(self):
        self.balance = 0
```

很多外部代码已经使用了 `wallet.balance += 100`。后来你决定每次修改余额时都要记录日志。如果你把 `balance` 改成 `set_balance()`，所有外部代码都要跟着改，代价极大。

此时 `@property` 就是救星：

Python

```python
class Wallet:
    def __init__(self):
        self._balance = 0

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, value):
        print(f"[日志] 余额发生变动: 从 {self._balance} 变为 {value}")
        self._balance = value
```

**外部代码完全不需要修改**，依旧可以写 `wallet.balance = 100`，但底层逻辑已经无缝升级了。

### 总结

使用 `@property` 是编写 **Pythonic** 代码的标志之一。它让你既能享受直接访问属性的简洁语法，又能拥有方法调用带来的封装性和控制力。