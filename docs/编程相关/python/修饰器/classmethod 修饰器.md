在 Python 中，`@classmethod` 是一个内置的装饰器（decorator），用于将一个方法绑定到**类本身**，而不是类的实例（对象）。

简单来说，普通方法操作的是“具体的对象”，而类方法操作的是“整个类”。

### `@classmethod` 的核心作用与特点

1. **隐式传递类本身 (`cls`)**：普通方法的第一个参数通常是 `self`（代表实例对象），而类方法的第一个参数必须是 `cls`（代表类本身）。这让你可以在方法内部访问和修改类级别的属性，或者调用其他的类方法。
    
2. **调用方式灵活**：它既可以通过类直接调用（`ClassName.method_name()`），也可以通过类的实例调用（`instance.method_name()`）。不过，业界规范推荐直接用类名调用，以保持代码的清晰。
    
3. **不依赖实例**：你不需要实例化对象就可以直接使用类方法。
    

###  典型的应用场景

`@classmethod` 在实际开发中有几个非常经典的应用场景：

#### 1. 替代构造函数（工厂方法）—— **最常见的场景**

Python 的 `__init__` 方法只能有一个。如果你需要提供多种不同的方式来初始化同一个类（比如有时传入整数，有时传入字符串），就可以使用 `@classmethod` 来充当“替代构造函数”。

**例子：处理不同格式的时间输入**

Python

```
class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    # 默认的 __init__ 只能接收三个数字
    # 如果用户想通过 "2026-06-17" 这种字符串来创建实例怎么办？

    @classmethod
    def from_string(cls, date_string):
        """这是一个工厂方法，解析字符串并返回一个类的实例"""
        year, month, day = map(int, date_string.split('-'))
        # cls() 相当于 Date()，返回一个新的实例
        return cls(year, month, day)

# 使用默认构造函数
date1 = Date(2026, 6, 17)

# 使用类方法（替代构造函数）
date2 = Date.from_string("2026-06-17")
```

_优势在于_：如果 `Date` 被子类化（比如 `class StrictDate(Date):`），调用 `StrictDate.from_string()` 时，`cls` 会自动指向 `StrictDate`，从而正确返回子类的实例，而不是父类的实例。

#### 2. 修改或管理类级别的状态

当你需要在一个方法内部修改所有实例共享的数据（即类变量）时，应该使用类方法。

**例子：统计类被实例化的次数**

Python

```
class User:
    # 这是一个类变量，所有实例共享
    active_users_count = 0 

    def __init__(self, name):
        self.name = name
        User.increment_count() # 每次实例化时更新计数

    @classmethod
    def increment_count(cls):
        cls.active_users_count += 1

    @classmethod
    def get_user_count(cls):
        return f"当前活跃用户总数: {cls.active_users_count}"

# 创建用户
u1 = User("Alice")
u2 = User("Bob")

# 直接通过类名查询状态
print(User.get_user_count())  # 输出: 当前活跃用户总数: 2
```

### 概念速记对比 (与普通方法、静态方法的区别)

为了更直观地理解，这里将类方法与 Python 中的其他两种方法进行对比：

| **方法类型**                   | **装饰器**         | **首个参数**      | **访问权限**                 | **典型用途**                       |
| -------------------------- | --------------- | ------------- | ------------------------ | ------------------------------ |
| **实例方法 (Instance Method)** | 无               | `self` (实例本身) | 可以访问实例属性/方法，也可以访问类属性/方法。 | 操作具体对象的数据（日常最常用）。              |
| **类方法 (Class Method)**     | `@classmethod`  | `cls` (类本身)   | 只能访问类属性/方法，**不能**访问实例属性。 | 提供额外的构造函数（工厂模式），修改类级别状态。       |
| **静态方法 (Static Method)**   | `@staticmethod` | 无特定要求         | 既不能访问实例属性，也不能直接访问类属性。    | 纯工具函数，只是逻辑上属于这个类，但不依赖这个类的任何状态。 |

总结来说，当你发现你的方法内部不需要用到 `self`（实例变量），但需要用到类本身（比如需要实例化返回当前类，或者读取类变量）时，果断使用 `@classmethod`。