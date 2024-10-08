---
title: 调试
icon: material/test-tube
comments: false
---

## 错误

### 捕获错误

捕获错误用到的是`try...except...else...finally`的结构.

???+ example "例子"

    ```py
    try:
        print('try...')
        r = 10 / int('2')
        print('result:', r)
    except ValueError as e:
        print('ValueError:', e)
    except ZeroDivisionError as e:
        print('ZeroDivisionError:', e)
    else:
        print('no error!')
    finally:
        print('finally...')
    print('END')
    ```

???+ tip "Tip"

    - 错误是类, 所有的错误类都继承自`BaseException`
    - `except`不但捕获该类型的错误, 还把其子类都一网打尽
    - 可以跨越多层捕获错误

        ???+ example "例子"

            ```py
            def foo(s):
                return 10 / int(s)

            def bar(s):
                return foo(s) * 2

            def main():
                try:
                    bar('0')
                except Exception as e:
                    print('Error:', e)
                finally:
                    print('finally...')
            ```

    - 调用栈: 如果错误没有被捕获, 会一直向上抛, 最后被捕获

        ???+ example "例子"

            定义: 

            ```py
            def foo(s):
                return 10 / int(s)

            def bar(s):
                return foo(s) * 2

            def main():
                bar('0')

            main()
            ```

            执行: 

            ```
            $ python main.py
            Traceback (most recent call last):
                File "err.py", line 11, in <module>
                    main()
                File "err.py", line 9, in main
                    bar('0')
                File "err.py", line 6, in bar
                    return foo(s) * 2
                File "err.py", line 3, in foo
                    return 10 / int(s)
            ZeroDivisionError: division by zero
            ```
    - `e`中存储的是错误的描述

        ???+ example "例子"

            定义:

            ```py
            try:
                x = 1
                y = 0
                z = x / y
            except Exception as e:
                print(e)
            ```

            执行:

            ```
            $ python main.py
            division by zero # 而不是ZeroDivisionError: division by zero
            ```

### 记录错误

如果不捕获错误, 解释器会打印出错误, 但程序被结束了. 如果捕获了错误, 可以用`logging`模块让解释器也按照原来的格式打印出错误.

???+ example "例子"

    定义: 

    ```py
    import logging

    def foo(s):
        return 10 / int(s)

    def bar(s):
        return foo(s) * 2

    def main():
        try:
            bar('0')
        except Exception as e:
            logging.exception(e)

    main()
    print('END')
    ```

    执行:

    ```
    $ python main.py
    ERROR:root:division by zero
    Traceback (most recent call last):
    File "err_logging.py", line 13, in main
        bar('0')
    File "err_logging.py", line 9, in bar
        return foo(s) * 2
    File "err_logging.py", line 6, in foo
        return 10 / int(s)
    ZeroDivisionError: division by zero
    END
    ```

### 抛出错误

捕获错误其实就是捕获到对应错误类的一个对象, 因此错误是有意创建并抛出的. 内置函数会抛出很多类型的错误对象, 我们也可以编写抛出的错误对象. 要抛出错误, 首先, 定义一个错误的类, 选择好继承关系, 然后用`raise`语句抛出一个错误的对象: 

???+ example "例子"

    定义: 

    ```py
    class FooError(ValueError):
        pass

    def foo(s):
        n = int(s)
        if n==0:
            raise FooError('invalid value: %s' % s)
        return 10 / n

    foo('0')
    ```

    执行: 

    ```
    $ python main.py
    Traceback (most recent call last):
    File "err_throw.py", line 11, in <module>
        foo('0')
    File "err_throw.py", line 8, in foo
        raise FooError('invalid value: %s' % s)
    __main__.FooError: invalid value: 0
    ```

#### 错误传播

???+ example "例子"

    定义: 

    ```py
    def foo(s):
        n = int(s)
        if n == 0:
            raise ValueError('invalid value: %s' % s)
        return 10 / n

    def bar():
        try:
            foo('0')
        except ValueError as e:
            print('ValueError caught in bar()')
            raise

    def baz():
        try:
            bar()
        except ValueError as e:
            print('ValueError caught in baz()')

    baz()
    ```

    执行: 

    ```
    $ python main.py
    ValueError caught in bar()
    ValueError caught in baz()
    ```

    在这个函数中, 我们已经捕获到了错误, 但是又把错误通过`raise`抛出去了. 这样做的目的是为了将原始异常的信息向上传播, 实现和调用栈相似的功能. 如果没有在`bar()`将错误抛出, 如: 

    ```py
    def foo(s):
        n = int(s)
        if n == 0:
            raise ValueError('invalid value: %s' % s)
        return 10 / n

    def bar():
        try:
            foo('0')
        except ValueError as e:
            print('ValueError caught in bar()')

    def baz():
        try:
            bar()
        except ValueError as e:
            print('ValueError caught in baz()')

    baz()
    ```

    执行: 

    ```
    $ python main.py
    ValueError caught in bar()
    ```

    `baz()`和函数是不知道`bar`函数中发生了异常的, 这样就无法实现调用栈的功能. 

## 调试

程序能一次性写对的概率很小, 我们需要知道出错的地方, 可以通过调试解决, 一般有5种方法: 

1. 打印变量
2. [`assert`](#断言)
3. [`logging`模块](#loggingmodule)
4. [`pdb`模块](#pdbmodule)
5. IDE

### 断言 {#断言}

可以使用`assert`来判断表达式的结果是否和我们预期的相符. 如果相符, 则正常运行; 否则, 抛出`AssertionError`错误.

???+ example "例子"

    定义: 

    ```py
    def foo(s):
        n = int(s)
        assert n != 0, 'n is zero!'
        return 10 / n

    def main():
        foo('0')
    ```

    执行: 

    ```
    $ python main.py
    Traceback (most recent call last):
        ...
    AssertionError: n is zero!
    ```

    ???+ tip "Tip"

        启动Python解释器时可以用`-O`参数关闭断言, 关闭后, 所有的`assert`语句相当于`pass`.

        ???+ example "例子"

            ```
            $ python -O main.py
            Traceback (most recent call last):
                ...
            ZeroDivisionError: division by zero
            ```

### `logging`模块 {#logging模块}

与`assert`相比, `logging`不会抛出错误, 但是会输出一些信息. 

???+ example "例子"

    定义: 

    ```py
    import logging

    logging.basicConfig(level=logging.INFO)
    s = '0'
    n = int(s)
    logging.info('n = %d' % n)
    print(10 / n)
    ```

    执行: 

    ```
    $ python main.py
    INFO:root:n = 0
    Traceback (most recent call last):
    File "err.py", line 8, in <module>
        print(10 / n)
    ZeroDivisionError: division by zero
    ```

???+ tip "Tip"

    `logging`允许指定信息的级别, 有`logging.DEBUG`, `logging.INFO`, `logging.WARNING`, `logging.ERROR`几个级别, 当指定`level=logging.INFO`的时候, `logging.debug`就不起作用了. 同理, 指定`level=logging.WARNING`的时候, `logging.debug`和`logging.info`就不起作用了.

### `pdb`模块 {#pdb模块}

???+ example "例子"

    定义: 

    ```
    s = '0'
    n = int(s)
    print(10 / n)
    ```

    执行: 

    ```
    $ python -m pdb main.py
    ```

    启动之后: 

    - 输入`l`回车查看代码
    - 输入`n`回车单步执行代码
    - 输入`p [变量名]`查看变量
    - 输入`q`结束调试
    - 输入`c`继续运行

???+ tip "Tip"

    可以用`pdb.set_trace()`方法设置断点, pdb启动后会直接到断点所在的位置.

    ???+ example "例子"

        ```py
        import pdb

        s = '0'
        n = int(s)
        pdb.set_trace() # 运行到这里会自动暂停
        print(10 / n)
        ```

## 单元测试

单元测试是用来对一个模块, 一个函数或者一个类进行正确性检验的测试公国. 对于一个已有的(或者还没有的)的函数或者类, 构造出一些输入数据, 然后验证其运行结果是否与我们预期的相同, 从而判断这个模块是否正确. 同时, 如果后续修改更新了这些代码, 只需要简单的运行一遍单元测试, 就可以知道修改是否对原有的功能造成了损坏. 

有一个著名的理念为测试驱动开发, TDD. 倡导先写测试程序, 然后编码实现其功能. 

编写单元测试时, 需要用到`unittest`模块, 编写一个测试类, 从`unittest.TestCase`继承, 由这个类产生的对象可以运行很多条件判断方法(由`unittest.TestCase`继承): 

- `[test_instance].assertEqual([var], [expected_value])`
- `[test_instance].assertTrue([var], [expected_bool])`
- `[test_instance].assertRaises([error_cls])`

???+ example "例子"

    `mydict.py`文件: 

    ```py
    class Dict(dict):

        def __init__(self, **kw):
            super().__init__(**kw)

        def __getattr__(self, key):
            try:
                return self[key]
            except KeyError:
                raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

        def __setattr__(self, key, value):
            self[key] = value
    ```

    `test_mydict.py`文件:

    ```py
    import unittest

    from mydict import Dict

    class TestDict(unittest.TestCase):

        def test_init(self):
            d = Dict(a=1, b='test')
            self.assertEqual(d.a, 1)
            self.assertEqual(d.b, 'test')
            self.assertTrue(isinstance(d, dict))

        def test_key(self):
            d = Dict()
            d['key'] = 'value'
            self.assertEqual(d.key, 'value')

        def test_attr(self):
            d = Dict()
            d.key = 'value'
            self.assertTrue('key' in d)
            self.assertEqual(d['key'], 'value')

        def test_keyerror(self):
            d = Dict()
            with self.assertRaises(KeyError):
                value = d['empty']

        def test_attrerror(self):
            d = Dict()
            with self.assertRaises(AttributeError):
                value = d.empty
    ```

???+ tip "Tip"

    可以在单元测试类中编写两个特殊的`setUp()`和`tearDown()`方法, 这两个方法会分别在每调用一个测试方法的前后被执行. 比如可以用于在测试前启动数据库, 在测试后关闭数据库.

    ???+ example "例子"

        ```py
        class TestDict(unittest.TestCase):

            def setUp(self):
                print('setUp...')

            def tearDown(self):
                print('tearDown...')
        ```

### 测试目录结构

为了易于管理和测试代码, 我们的文件和目录要遵循特定的组织方式.

???+ example "例子"

    ```
    project/
    │
    ├── src/
    │   └── mymodule.py
    │
    ├── tests/
    │   └── test_mymodule.py
    │
    ├── README.md
    ├── setup.py
    └── requirements.txt
    ```

    - `src/mymodule.py`: 存放实际代码的文件
    - `tests/test_mymodule.py`: 存放单元测试的文件

    要运行单元测试, 可以在项目根目录下使用以下命令: `python -m unittest discover tests`, 这会自动发现并运行`tests`目录中的所有测试文件.

## 文档测试

`doctest`为Python的一个自带模块, 它会搜索模块中看起来像是交互式会话的代码片段, 然后执行并验证结果.

???+ example "例子"

    定义`Dict`类: 

    ```py
    class Dict(dict):
        '''
        Simple dict but also support access as x.y style.

        >>> d1 = Dict()
        >>> d1['x'] = 100
        >>> d1.x
        100
        >>> d1.y = 200
        >>> d1['y']
        200
        >>> d2 = Dict(a=1, b=2, c='3')
        >>> d2.c
        '3'
        >>> d2['empty']
        Traceback (most recent call last):
            ...
        KeyError: 'empty'
        >>> d2.empty
        Traceback (most recent call last):
            ...
        AttributeError: 'Dict' object has no attribute 'empty'
        '''
        def __init__(self, **kw):
            super(Dict, self).__init__(**kw)

        def __getattr__(self, key):
            try:
                return self[key]
            except KeyError:
                raise AttributeError(r"'Dict' object has no attribute '%s'" % key)

        def __setattr__(self, key, value):
            self[key] = value

    if __name__=='__main__':
        import doctest
        doctest.testmod()
    ```

    测试`Dict`类: 

    ```
    $ python main.py
    ```

    什么都没有输出, 说明测试全部通过.

    ???+ tip "Tip"

        可以使用`...`表示异常中间的那些输出. 

        ???+ example "例子"

            ```py
            '''
            >>> d2['empty']
            Traceback (most recent call last):
                ...
            KeyError: 'empty'
            >>> d2.empty
            Traceback (most recent call last):
                ...
            AttributeError: 'Dict' object has no attribute 'empty'
            '''
            ```

[^1]: 错误处理. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017598873256736
[^2]: 调试. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017602696742912
[^3]: 单元测试. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017604210683936
[^4]: 文档测试. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017605739507840