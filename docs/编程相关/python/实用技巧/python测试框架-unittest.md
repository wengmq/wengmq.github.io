
## 说明

测试您的代码非常重要。

常常将测试代码和运行代码一起写是一种非常好的习惯。 聪明地使用这种方法将会帮助您更加精确地定义代码的含义，并且代码的耦合性更低。

这边介unittest框架：[https://docs.python.org/zh-cn/3.9/library/unittest.html](https://docs.python.org/zh-cn/3.9/library/unittest.html)

## unittest框架基础

[`unittest`](https://docs.python.org/zh-cn/3.9/library/unittest.html") 包括Python标准库中的测试模型。

这是一段简短的代码，来测试三种字符串方法:
```python
import unittest

class TestStringMethods(unittest.TestCase):

    def test_upper(self):
        self.assertEqual('foo'.upper(), 'FOO')

    def test_isupper(self):
        self.assertTrue('FOO'.isupper())
        self.assertFalse('Foo'.isupper())

    def test_split(self):
        s = 'hello world'
        self.assertEqual(s.split(), ['hello', 'world'])
        # check that s.split fails when the separator is not a string
        with self.assertRaises(TypeError):
            s.split(2)

if __name__ == '__main__':
    unittest.main()
```


继承 [`unittest.TestCase`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase "unittest.TestCase") 就创建了一个测试样例。上述三个独立的测试是三个类的方法，这些方法的命名都以 `test` 开头。 这个命名约定告诉测试运行者类的哪些方法表示测试。

每个测试的关键是：调用 [`assertEqual()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertEqual "unittest.TestCase.assertEqual") 来检查预期的输出； 调用 [`assertTrue()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertTrue "unittest.TestCase.assertTrue") 或 [`assertFalse()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertFalse "unittest.TestCase.assertFalse") 来验证一个条件；调用 [`assertRaises()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertRaises "unittest.TestCase.assertRaises") 来验证抛出了一个特定的异常。使用这些方法而不是 [`assert`](https://docs.python.org/zh-cn/3.9/reference/simple_stmts.html#assert) 语句是为了让测试运行者能聚合所有的测试结果并产生结果报告。

通过 [`setUp()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.setUp "unittest.TestCase.setUp") 和 [`tearDown()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.tearDown "unittest.TestCase.tearDown") 方法，可以设置测试开始前与完成后需要执行的指令。 在 [组织你的测试代码](https://docs.python.org/zh-cn/3.9/library/unittest.html#organizing-tests) 中，对此有更为详细的描述。

最后的代码块中，演示了运行测试的一个简单的方法。 [`unittest.main()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.main "unittest.main") 提供了一个测试脚本的命令行接口。当在命令行运行该测试脚本，上文的脚本生成如以下格式的输出:

```
...
----------------------------------------------------------------------
Ran 3 tests in 0.000s

OK
```

在调用测试脚本时添加 `-v` 参数使 [`unittest.main()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.main "unittest.main") 显示更为详细的信息，生成如以下形式的输出:

```
test_isupper (__main__.TestStringMethods) ... ok
test_split (__main__.TestStringMethods) ... ok
test_upper (__main__.TestStringMethods) ... ok

----------------------------------------------------------------------
Ran 3 tests in 0.001s

OK
```


## unittest命令行接口[](https://docs.python.org/zh-cn/3.9/library/unittest.html#command-line-interface "永久链接至标题")

Unittest支持简单的测试搜索。若需要使用探索性测试，所有的测试文件必须是 [modules](https://docs.python.org/zh-cn/3.9/tutorial/modules.html#tut-modules) 或 [packages](https://docs.python.org/zh-cn/3.9/tutorial/modules.html#tut-packages) （包括 [namespace packages](https://docs.python.org/zh-cn/3.9/glossary.html#term-namespace-package) )并可从项目根目录导入（即它们的文件名必须是有效的 [identifiers](https://docs.python.org/zh-cn/3.9/reference/lexical_analysis.html#identifiers) ）。

探索性测试在 [`TestLoader.discover()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestLoader.discover "unittest.TestLoader.discover") 中实现，但也可以通过命令行使用。它在命令行中的基本用法如下：

```
cd project_directory
python -m unittest discover

```
注解

方便起见， `python -m unittest` 与 `python -m unittest discover` 等价。如果你需要向探索性测试传入参数，必须显式地使用 `discover` 子命令。

`discover` 有以下选项：

> [!NOTE]
> `-v``,` `--verbose`[](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-v "永久链接至目标")
> 
> 更详细地输出结果。
> 
> `-s``,` `--start-directory` `directory`[](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-s "永久链接至目标")
> 
> 开始进行搜索的目录(默认值为当前目录 `.` )。
> 
> `-p``,` `--pattern` `pattern`[](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-p "永久链接至目标")
> 
> 用于匹配测试文件的模式（默认为 `test*.py` ）。
> 
> `-t``,` `--top-level-directory` `directory`[](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-t "永久链接至目标")
> 
> 指定项目的最上层目录（通常为开始时所在目录）。

[`-s`](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-s) ，[`-p`](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-p) 和 [`-t`](https://docs.python.org/zh-cn/3.9/library/unittest.html#cmdoption-unittest-discover-t) 选项可以按顺序作为位置参数传入。以下两条命令是等价的：

```
python -m unittest discover -s project_directory -p "*_test.py"
python -m unittest discover project_directory "*_test.py"
```

正如可以传入路径那样，传入一个包名作为起始目录也是可行的，如 `myproject.subpackage.test` 。你提供的包名会被导入，它在文件系统中的位置会被作为起始目录。

警告

> [!NOTE]
> 探索性测试通过导入测试对测试进行加载。在找到所有你指定的开始目录下的所有测试文件后，它把路径转换为包名并进行导入。如 `foo/bar/baz.py` 会被导入为 `foo.bar.baz` 。
> 
> 如果你有一个全局安装的包，并尝试对这个包的副本进行探索性测试，可能会从错误的地方开始导入。如果出现这种情况，测试会输出警告并退出。
> 
> 如果你使用包名而不是路径作为开始目录，搜索时会假定它导入的是你想要的目录，所以你不会收到警告。
> 
> 测试模块和包可以通过 [load_tests protocol](https://docs.python.org/zh-cn/3.9/library/unittest.html#load-tests-protocol) 自定义测试的加载和搜索。
> 
> 在 3.4 版更改: 测试发现支持初始目录下的 [命名空间包](https://docs.python.org/zh-cn/3.9/glossary.html#term-namespace-package)。注意你也需要指定顶层目录（例如：`python -m unittest discover -s root/namespace -t root`）。


## 断言方法

[`TestCase`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase "unittest.TestCase") 类提供了一些断言方法用于检查并报告失败。 下表列出了最常用的方法（请查看下文的其他表来了解更多的断言方法）:

|方法|检查对象|引入版本|
|---|---|---|
|[`assertEqual(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertEqual "unittest.TestCase.assertEqual")|`a == b`||
|[`assertNotEqual(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertNotEqual "unittest.TestCase.assertNotEqual")|`a != b`||
|[`assertTrue(x)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertTrue "unittest.TestCase.assertTrue")|`bool(x) is True`||
|[`assertFalse(x)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertFalse "unittest.TestCase.assertFalse")|`bool(x) is False`||
|[`assertIs(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIs "unittest.TestCase.assertIs")|`a is b`|3.1|
|[`assertIsNot(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIsNot "unittest.TestCase.assertIsNot")|`a is not b`|3.1|
|[`assertIsNone(x)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIsNone "unittest.TestCase.assertIsNone")|`x is None`|3.1|
|[`assertIsNotNone(x)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIsNotNone "unittest.TestCase.assertIsNotNone")|`x is not None`|3.1|
|[`assertIn(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIn "unittest.TestCase.assertIn")|`a in b`|3.1|
|[`assertNotIn(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertNotIn "unittest.TestCase.assertNotIn")|`a not in b`|3.1|
|[`assertIsInstance(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertIsInstance "unittest.TestCase.assertIsInstance")|`isinstance(a, b)`|3.2|
|[`assertNotIsInstance(a, b)`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertNotIsInstance "unittest.TestCase.assertNotIsInstance")|`not isinstance(a, b)`|3.2|

这些断言方法都支持 _msg_ 参数，如果指定了该参数，它将被用作测试失败时的错误消息 (另请参阅 [`longMessage`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.longMessage "unittest.TestCase.longMessage"))。 请注意将 _msg_ 关键字参数传给 [`assertRaises()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertRaises "unittest.TestCase.assertRaises"), [`assertRaisesRegex()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertRaisesRegex "unittest.TestCase.assertRaisesRegex"), [`assertWarns()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertWarns "unittest.TestCase.assertWarns"), [`assertWarnsRegex()`](https://docs.python.org/zh-cn/3.9/library/unittest.html#unittest.TestCase.assertWarnsRegex "unittest.TestCase.assertWarnsRegex") 的前提是它们必须被用作上下文管理器。