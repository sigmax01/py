---
title: contextlib
icon: material/boom-gate-up-outline
comments: true
---

## 上下文管理器

`with`语句用于方便事前和事后执行代码. 任何实现了`__enter__()`和`__exit__()`方法的对象, 都可以用于`with`语句.

???+ example "例子"

    下面的`Query`实现了`__enter__()`和`__exit__()`方法, 所以由它产生的对象可以用于`with`语句: 

    ```py
    class Query(object):

        def __init__(self, name):
            self.name = name

        def __enter__(self):
            print('Begin')
            return self
        
        def __exit__(self, exc_type, exc_value, traceback):
            if exc_type:
                print('Error')
            else:
                print('End')
        
        def query(self):
            print('Query info about %s...' % self.name)
    ```

    这样就可以将自己写的资源用于`with`语句: 

    ```py
    with Query('wenzexu') as q:
        q.query()
    ```

    执行过程: 

    1. `with`语句首先会调用`Query('wenzexu')`对象的`__enter__()`方法
    2. `__enter__()`方法打印`'Begin'`, 然后返回`self`, 即当前的`Query('wenzexu')`对象
    3. `with`语句将`__enter__()`方法的返回值赋值给变量`q`, 即`q`就是`Query('wenzexu')`这个对象
    4. 执行`with`语句块内部的代码, 即`q.query()`, 这将打印`'Query info about example ...'`
    5. 执行完成后, 无论代码是否抛出异常, `with`语句都会执行`Query('wenzexu')`对象的`__exit__()`方法
    6. 如果代码块中没有异常发生, `__exit__()`方法将会打印`'End'`; 如果有异常发生, 则打印`'Error'`

## `@contextmanager`

编写`__enter__()`和`__exit__()`非常繁琐, `contextlib`提供了更简单的写法, 上面的例子中的代码可以修改.

???+ example "例子"

    === "例子1"

        定义: 

        ```py
        from contextlib import contextmanager

        class Query(object):

            def __init__(self, name):
                self.name = name

            def query(self):
                print('Query info about %s...' % self.name)

        @contextmanager
        def create_query(name):
            print('Begin')
            o = Query(name)
            yield o
            print('End')

        with create_query('example') as q:
            q.query()
        ```

        执行: 

        ```
        $ python main.py
        Begin
        Query info about example...
        End
        ```

        执行过程: 

        1. `with`语句首先调用`create_query()`函数, 打印`'Begin'`, 创建对象`o`, 通过`yield`返回创建的对象`o`, `with`语句将其赋值给`q`
        2. 执行`with`语句内部的代码块, 即执行`q.query()`方法, 打印`'Query info about example...'`
        3. 执行完成后, 继续执行`create_query()`中`yield`语句之后的代码, 打印`'End'`

    === "例子2"

        定义: 

        ```py
        from contextlib import contextmanager

        @contextmanager
        def tag(name):
            print("<%s>" % name)
            yield
            print("</%s>" % name)

        with tag("h1"):
            print("hello")
            print("world")
        ```

        执行: 

        ```
        $ python main.py
        <h1>
        hello
        world
        </h1>
        ```
        
## `@closing`

`@closing`装饰器的主要作用是将一个未实现上下文的对象作用于上下文管理器, 其中实现了`with`语句块执行完成后自动执行`[obj].close()`的功能.

???+ example "例子"

    ```py
    from contextlib import closing
    from urllib.request import urlopen

    with closing(urlopen('https://www.python.org')) as page:
        for line in page:
            print(line)
    ```

???+ tip "Tip"

    其实`@closing`是一个经过`@contextmanager`装饰的生成器, 具体实现如下: 

    ```py
    @contextmanager
    def closing(thing):
        try:
            yield thing
        finally:
            thing.close()
    ```

[^1]: Contextlib. (n.d.). Retrieved June 19, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1115615597164000