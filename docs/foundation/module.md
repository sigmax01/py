---
name: 模块
icon: material/package-variant-closed
comments: false
---

## 模块、包和库

- 模块: 一堆函数、类、变量的集合
- 包: 一个包可能由多个模块组成
- 库: 一个库可能由多个包和模块组成

### 模块

以`.py`为后缀的文件, 称之为模块. 

???+ example "例子"

    假设现在有一个名为demo.py的文件: 

    ```py
    name = "wenzexu"
    print("导入成功")
    ```

    直接使用`import`语句就能导入, 导入之后, 可以使用`模块名.变量名`的方式访问这个变量:

    ```
    >>> import demo
    导入成功 # 由于未定义__name__, 导致顶层代码执行
    >>> demo.name
    'wenzexu'
    ```

???+ warning "注意"

    在导入模块之后, 模块之内所有未包裹在函数或者类里面的代码都会被执行. 如果你希望在导入包之后不执行顶层代码, 可以使用`__name__`参数. 这是一个特殊的内置变量, 一个文件被直接运行的时候, 其内部的`__name__`会被解释器设为`__main__`; 一个文件被作为模块导入的时候, `__name__`的值被设置为该模块的名字.

    ???+ example "例子"

        假设现在有一个名为demo.py的文件:

        ```py
        name = "wenzexu"

        def main():
            print("导入成功")
            print(__name__)

        if __name__ == "__main__":
            main()
        ```

        运行demo.py:

        ```sh
        $ python demo.py
        导入成功
        __main__
        ```

        在另一个文件run.py导入这个demo.py模块: 

        ```py
        import demo
        print(demo.name)
        ```

        运行run.py:

        ```sh
        $ python run.py
        wenzexu
        demo
        ```

    ???+ tip "Tip"

        可以使用`python`命令的`-m`选项用于直接运行模块, 该选项后接模块名. 当你使用这个选项之后, 解释器将制定的模块作为脚本执行, 而不仅仅是导入它. 这意味着模块中的所有代码都会被执行, 包括顶层代码, 即被`if __name__ == "__main__"`保护的代码块. 

???+ tip "Tip"

    当模块被导入之后, 会在当前目录下产生一个叫做`__pycache__`的缓存文件夹. 这里面的文件是模块被导入之后解释器根据模块代码编译生成的字节码. 这样如果以后再次运行的话. 如果调用的模块未发生改变, 那就直接跳过编译这一步, 直接去`__pycache__`文件夹里去运行相关的`*.pyc`文件, 大大缩短了项目运行前的准备时间.

    ???+ example "例子"

        ```sh
        $ tree .
        .
        ├── __pycache__
        │   └── demo.cpython-312.pyc
        ├── demo.py
        └── run.py
        ```

#### 作用域

在一个模块中, 我们可能定义很多的函数和变量, 有的函数和变量我们希望给别人使用, 有的函数和变量我们希望仅仅在模块内部使用, 这可以通过`_`前缀实现. 

???+ example "例子"

    ```py
    def _private_1(name):
    return 'Hello, %s' % name

    def _private_2(name):
        return 'Hi, %s' % name

    def greeting(name):
        if len(name) > 3:
            return _private_1(name)
        else:
            return _private_2(name)
    ```

???+ warning "注意"

    这种函数是"不应该"被直接引用, 而不是"不能"被直接引用, 这是一种约定俗称的方法, 告诉开发者这个函数不能引用. 在实例变量/函数的[访问限制](/foundation/object/#访问限制)也提到过这个概念. 

### 包

#### 常规包

在Python3.3之前, 一个包想要被导入使用, 包内必须要有`__init__.py`文件, 这个是Python识别一个文件夹是否为一个包的重要标志.

???+ example "例子"

    目录结构: 

    ```
    demo/
    ├── bar
    │   └── __init__.py
    ├── foo
    │   └── __init__.py
    └── __init__.py
    ```

    现在, 把`demo`下的`__init__.py`删除, 执行语句: 

    ```
    >>> import demo
    Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
    ImportError: No module named demo
    ```

#### 命名空间包

在Python3.3之后, 即使一个文件夹中没有定义`__init__.py`, 也可以被作为命名空间包的形式导入.

???+ example "例子"

    目录结构:

    ```
    demo/
    ├── bar
    │   └── __init__.py
    └── foo
        └── __init__.py
    ```

    尝试导入`demo`: 

    ```
    >>> import demo
    ```

    并没有报错

### 库

库是一定功能代码的集合, 通常认为他是一个完整的项目打包.

## 导入

### 搜索路径 {#搜索路径}

当我们导入包或者模块的时候, Python解释器会在这两个地方寻找包或者模块:

1. `sys.path`
2. 运行文件所在的目录

???+ tip "Tip"

    可以通过`sys`模块查看`sys.path`.

    ???+ example "例子"

        ```
        >>> import sys
        >>> sys.path
        ['', '/usr/lib64/python39.zip', '/usr/lib64/python3.9', '/usr/lib64/python3.9/lib-dynload', '/usr/lib64/python3.9/site-packages', '/usr/lib/python3.9/site-packages']
        ```

### `import`

`import`只能用于导入包或者模块, 不能导入模块内部的变量/函数/类. 使用内部变量/函数/类的时候要加包或者模块的前缀.

- `import [module]`
    - `import [module] as [alias]`
- `import [package].[module]`
    - `import [package].[module] as [alias]`
- `import [package]`: 详见[导入包](#init.py是一个module)
- `import [package].[subpackage]`: 详见[导入包](#init.py是一个module)

    ???+ warning "注意"

        这种情况下加载的其实是包下的`__init__.py`文件. 

        ??? example "例子"

            目录结构:

            ```sh
            .
            ├── pac
            │   ├── __init__.py
            │   └── demo.py
            └── run.py
            ```

            `__init__.py`文件:

            ```py
            print("hello")
            print(__name__)
            ```

            `run.py`文件:

            ```py
            import pac
            ```

            执行`run.py`

            ```sh
            $ python run.py
            hello
            demo
            ```

???+ example "例子"

    === "例子1"

        目录结构:

        ```sh
        .
        ├── demo.py
        └── run.py
        ```

        `demo.py`文件: 

        ```py
        name = "wenzexu"

        def main():
            print("导入成功")
            print(__name__)

        if __name__ == "__main__":
            main()
        ```

        `run.py`文件:

        ```py
        import demo

        print(demo.name)
        ```

        执行`run.py`: 

        ```sh
        $ python run.py
        wenzexu
        ```
    
    === "例子2"

        目录结构:

        ```sh
        .
        ├── pac
        │   ├── __init__.py
        │   └── demo.py
        └── run.py 
        ```

        `demo.py`文件:

        ```py
        name = "wenzexu"

        def main():
            print("导入成功")
            print(__name__)

        if __name__ == "__main__":
            main()
        ```

        `run.py`文件:

        ```py
        import pac.demo

        print(pac.demo.name) 
        ```

        运行`run.py`:

        ```sh
        $ python run.py
        wenzexu
        ```

### `from ... import ...`

`from ... import ...`可以用于导入模块, 以及模块中的变量/函数/类, 但是不能用于导入包. 如果导入的是模块, 使用内部变量/函数/类的时候要加上前缀.

- `from [package] import [module]`
- `from [module] import [var, function, class]`
- `from [package].[module] import [var, function, class]`
- `from [package].[module] import [var, function, class], [var, function, class]`
- `from [package].[module] import *` 
- `from [package].[subpackage] import [module]`
- `from [package] import *`
- `from [package] import [var, function, class]`

???+ example "例子"

    === "例子1"

        目录结构:

        ```sh
        .
        ├── pac
        │   ├── __init__.py
        │   └── demo.py
        └── run.py 
        ```

        `demo.py`文件: 

        ```py
        from pac.demo import name
        
        print(name)
        ```

        `run.py`文件:

        ```py
        name = "wenzexu"
        ```

        运行`run.py`文件:

        ```sh
        $ python run.py
        wenzexu
        ```
    
    === "例子2"

        目录结构:

        ```sh
        .
        ├── pac
        │   ├── __init__.py
        │   └── demo.py
        └── run.py 
        ```

        `demo.py`文件: 

        ```py
        from pac import demo
        
        print(demo.name)
        ```

        `run.py`文件:

        ```py
        name = "wenzexu"
        ```

        运行`run.py`文件:

        ```sh
        $ python run.py
        wenzexu
        ```

#### 绝对导入和相对导入

绝对导入指的是从根目录开始导入模块. 相对导入指的是从当前文件所在的目录开始导入模块. 

相对导入的写法为:

- `from . import [module]`
- `from .[package] import [module]`
- `from .. import [module]`
- `from ..[package] import [module]`
- `from . import [package]`
- `from . import [package].[module]`

???+ example "例子"

    === "例子1"

        目录结构:

        ```py
        .
        ├── a.py
        ├── b.py
        └── step
            ├── c.py
            └── d.py
        ```

        `c.py`文件内容: 

        ```py
        import d # 在Python3中导致报错

        def printSelf():
            print("In c")
        ```

        `a.py`文件内容:

        ```py
        from step import c

        c.printSelf()
        ```

        上述运行`a.py`之后会报错, 因为`a.py`导入`c.py`之后, 再要导入`d.py`, 由于`a.py`和`d.py`在不同的目录下, 所以`c.py`导入`d.py`的时候会报错. 上述的写法在Python2里面没问题, 但是在Python3里面会报错. 因为这种写法在Python2里面是相对导入, 在Python3里面是绝对导入. 

    === "例子2"

        目录结构:

        ```py
        .
        ├── a.py
        ├── b.py
        └── step
            ├── c.py
            └── d.py
        ```

        `c.py`文件内容: 

        ```py
        from . import d # 采用相对导入的写法

        def printSelf():
            print("In c")
        ```

        `a.py`文件内容:

        ```py
        from step import c

        c.printSelf()
        ```

        运行`a.py`:

        ```sh
        $ python a.py
        In c
        ```

        这样使用相对导入就没问题了.

## `__package__`属性 {#package属性}

`__package__`属性用于标识模块所属的包, 它在一个模块的值是这样确定的

- 当这个模块是被作为包的一部分导入的时候, 这个模块内的`__package__`是包的名称
- 当这个模块是没有被作为包的一部分导入的时候, 这个模块内的`__package__`是空字符串
- 当这个模块是被直接执行的时候, 这个模块内的`__package__`是`None`

???+ example "例子"

    === "`module.py`作为包的一部分被导入"

        目录结构:

        ```
        .
        ├── main
        │   ├── __init__.py
        │   └── module.py
        └── test.py
        ```

        `test.py`文件:

        ```py
        import main.module
        ```

        `module.py`文件:

        ```py
        print(__package__)
        ```

        执行: 

        ```
        $ python test.py
        main
        ```
    
    === "`module.py`不作为包的一部分导入被导入"

        目录结构:

        ```
        .
        └── main
            ├── __init__.py
            ├── module.py
            └── test.py
        ```

        `test.py`文件:

        ```py
        import module
        ```

        `module.py`文件:

        ```py
        print(__package__)
        ```

        执行: 

        ```
        $ python test.py
        ''
        ```

    === "`module.py`直接被执行"

        目录结构:

        ```
        .
        └── main
            ├── __init__.py
            └── module.py
        ```

        `module.py`文件:

        ```py
        print(__package__)
        ```

        执行: 

        ```
        $ python module.py
        None
        ```

### `__package__`属性和相对导入

当遇到相对导入的时候, 当前模块会将自己的`__package__`做为基础, 在这个之上对路径做拼接或者删除, 从而找到对应的模块.

???+ example "例子"

    === "例子1"

        目录结构:

        ```
        .
        ├── main
        │   ├── __init__.py
        │   ├── module.py
        │   └── test
        │       ├── __init__.py
        │       └── module1.py
        └── out.py
        ```

        `module.py`文件: 

        ```py
        from .test import module1

        print(__package__)
        module1.hello()
        ```

        `module1.py`文件:

        ```py
        def hello():
            print('Hello from module1.py')
        ```

        `out.py`文件:

        ```py
        import main.module
        ```

        执行: 

        ```
        $ python out.py
        main
        Hello from module1.py
        ```

        解释: `module.py`文件被作为`main`包的一部分导入, 所以`module.py`模块内的`__package__`是`main`. 里面的相对导入在这个基础上做拼接: `main/test`, 最终找到了`module1.py`.

    === "例子2"

        目录结构:

        ```
        .
        └── main
            ├── __init__.py
            ├── module.py
            └── test
                ├── __init__.py
                └── module1.py
        ```

        `module.py`文件: 

        ```py
        from .test import module1

        module1.hello()
        ```

        `module1.py`文件:

        ```py
        def hello():
            print('Hello from module1.py')
        ```

        执行: 

        ```
        $ python module.py
        Traceback (most recent call last):
            File "/home/wenzexu/test/main/module.py", line 1, in <module>
                from .test import module1
        ImportError: attempted relative import with no known parent package
        ```

        出错的原因是: `module.py`由于是直接执行的, 所以其`__package__`为`None`, 所以解释器无法在`None`上做拼接, 所以无法找到对应模块.

## `__init__.py`文件

`__init__.py`文件是一个特殊的文件, 主要用于标识某个目录是一个Python包, 它的主要作用不仅仅只是标识包, 还有很多功能, 下面会一一说明.

### `__init__.py`是一个模块 {#init.py是一个模块}

???+ danger "特别注意"

    - 包其实就是模块
    - 导入包, 就是导入它的`__init__.py`模块.
    - 第一次导入包的时候, 其`__init__.py`中的所有代码都会被执行.
    - `import`语句或者`from ... import ...`中出现的包的`__init__.py`模块在第一次导入的时候都会被执行
    - 所有被导入的模块都会被放在`sys.modules`中, 重复导入这些模块不会被执行, 包括`__init__.py`, 因为缓存机制

???+ warning "注意"

    包中的`__init__.py`本身就是一个模块, 在直接导入包的时候, 如`import [package]`的时候, 这个`__init__.py`的模块会被默认导入, 我们导入之后可以查看`sys.modules`, 发现其实`__init__.py`这个就是一个被导入的模块.


    ???+ example "例子"

        目录结构:

        ```
         .
        └── main
            ├── __init__.py
            ├── test1
            │   ├── __init__.py
            │   └── module1.py
            └── test2
                ├── __init__.py
                └── module2.py
        ```

        `main/__init__.py`文件:

        ```py
        import sys

        print('parent package was called')
        print(sys.modules)
        ```

        在`main`的上级文件夹执行: 

        ```
        >>> import main
        parent package was called
        {[省略]'main': <module 'main' from '/home/wenzexu/test/main/__init__.py'>}
        >>> import main
        >>>
        ```

### 初始化包

当包第一次被导入的时候, 相当于导入的是`__init__.py`模块, `__init__.py`文件中的代码会被立即执行, 可以在此文件中初始化包, 设置一些包级别的变量或者执行包级别的初始化操作.

???+ example "例子"

    目录结构:

    ```
    .
    └── main
        ├── __init__.py
        ├── test1
        │   ├── __init__.py
        │   └── module1.py
        └── test2
            ├── __init__.py
            └── module2.py
    ```

    `main/__init__.py`文件:

    ```py
    print('parent package was called')
    ```

    在`main`的上级文件夹执行: 

    ```
    >>> import main
    parent package was called
    >>> import main
    >>>
    ```

    ???+ tip "Tip"

        第一次导入后, 导入的`__init__.py`模块会被放在`sys.modules`中, 随后如果再导入, `__init__.py`文件将不会再执行. 

### 递归包结构

在包含子包的复杂包结构中, 每个子包目录中也需要包含一个`__init__.py`文件.

???+ example "例子"

    目录结构:

    ```
    .
    └── main
        ├── __init__.py
        ├── test1
        │   ├── __init__.py
        │   └── module1.py
        └── test2
            ├── __init__.py
            └── module2.py
    ```

    `main/__init__.py`文件:

    ```py
    print('parent package was called')
    ```

    `main/test1/__init__.py`文件:

    ```py
    print('test1 was called')
    ```

    在`main`的上级文件夹执行: 

    ```
    >>> import main.test1
    parent package was called
    test1 was called
    >>> import main.test1
    >>>
    ```

### 控制包的导入行为

通过在`__init__.py`中定义`__all__`变量, 可以控制`from [package] import *`语句的导入行为.

???+ example "例子"

    === "例子1"

        目录结构:

        ```
        .
        └── main
            ├── __init__.py
            ├── test1
            │   ├── __init__.py
            │   └── module1.py
            └── test2
                ├── __init__.py
                └── module2.py
        ```

        `main/__init__.py`文件:

        ```py
        print('parent package was called')
        __all__ = ['test1']
        ```

        `main/test1/__init__.py`文件:

        ```py
        print('test1 was called')
        ```

        `main/test1/module1.py`文件:

        ```py
        print('module1 was called')
        ```

        `main/test2/__init__.py`文件:

        ```py
        print('test2 was called')
        ```

        `main/test2/module2.py`文件:

        ```py
        print('module2 was called')
        ```

        在`main`的上级文件夹执行: 

        ```
        >>> from main import *
        parent package was called
        test1 was called
        >>> import main
        >>>
        ```
        
        解释: 

        1. 第一次从`main`包执行导入`from main import *`
        2. `main`包的`__init__.py`模块自动执行
        3. `__all__`定义为`test1`包
        4. 第一次从`test1`包执行导入`import test1`
        5. `test1`包的`__init__.py`模块自动执行
    
    === "例子2"

        目录结构:

        ```
        .
        └── main
            ├── __init__.py
            ├── test1
            │   ├── __init__.py
            │   └── module1.py
            └── test2
                ├── __init__.py
                └── module2.py
        ```

        `main/__init__.py`文件:

        ```py
        print('parent package was called')
        __all__ = ['test1']
        ```

        `main/test1/__init__.py`文件:

        ```py
        from . import module1
        print('test1 was called')
        ```

        `main/test1/module1.py`文件:

        ```py
        print('module1 was called')
        ```

        `main/test2/__init__.py`文件:

        ```py
        print('test2 was called')
        ```

        `main/test2/module2.py`文件:

        ```py
        print('module2 was called')
        ```

        在`main`的上级文件夹执行: 

        ```
        >>> from main import *
        parent package was called
        module1 was called
        test1 was called
        >>> import main
        >>>
        ```
        
        解释: 

        1. 第一次从`main`包执行导入`from main import *`
        2. `main`包的`__init__.py`模块自动执行
        3. `__all__`定义为`test1`包
        4. 第一次从`test1`包执行导入`import test1`
        5. `test1`包的`__init__.py`模块自动执行
        6. 执行`test1`包的`__init__.py`时发现要导入`module1`模块, 执行`module1`模块

## `__main__.py`文件

`__main__.py`文件的作用是作为一个包的入口点, 使得包可以像脚本一样直接运行. 当使用`python -m [package]`时, `[package]`内的`__main__.py`模块会自动执行.

### 执行包

当我们使用`python -m [包]`运行包的时候, 会先执行包内的`__init__.py`然后执行`__main__.py`. 

???+ example "例子"

    目录结构:  

    ```
    .
    └── pkg
        ├── __init__.py
        └── __main__.py
    ```

    `__init__.py`文件:

    ```py
    import sys
    print('__init__')
    print('__init__.__name__', __name__)
    print('__init__.__package__', __package__)
    print('sys.path', sys.path)
    def hello():
        print("Hello from pkg/__init__.py")
    ```

    `__main__.py`文件:

    ```py
    import sys
    print('__main__')
    print('__main__.__name__', __name__)
    print('__main__.__package__', __package__)
    print('sys.path', sys.path)
    import pkg
    pkg.hello()
    ```

    在`pkg`文件夹外执行: 

    ```
    $ python -m pkg 
    __init__
    __init__.__name__ pkg
    __init__.__package__ pkg
    sys.path ['/Users/wenzexu/test', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python312.zip', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/lib-dynload', '/Users/wenzexu/test/.venv/lib/python3.12/site-packages']
    __main__
    __main__.__name__ __main__
    __main__.__package__ pkg
    sys.path ['/Users/wenzexu/test', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python312.zip', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/lib-dynload', '/Users/wenzexu/test/.venv/lib/python3.12/site-packages']
    Hello from pkg/__init__.py
    ```

    ???+ question "疑问"

        `__main__.py`应该是直接被运行的, 所以`__name__`是`__main__`. 通常情况下, 脚本直接执行会导致其`__package__`为`None`, 详情见[这里](#package属性). 但是这里与直接执行脚本时稍有不同, 这里Python解释器已经知道`__main__.py`是包的一部分, 并不是一个孤立的脚本, 所以这里的`__package__`属性会设置为`pkg`.

### 执行文件夹

当我们使用`python [文件夹]`执行文件夹的时候, 只会执行文件夹内的`__main__.py`文件.

???+ example "例子"

    目录结构:  

    ```
    .
    └── pkg
        ├── __init__.py
        └── __main__.py
    ```

    `__init__.py`文件:

    ```py
    import sys
    print('__init__')
    print('__init__.__name__', __name__)
    print('__init__.__package__', __package__)
    print('sys.path', sys.path)
    def hello():
        print("Hello from pkg/__init__.py")
    ```

    `__main__.py`文件:

    ```py
    import sys
    print('__main__')
    print('__main__.__name__', __name__)
    print('__main__.__package__', __package__)
    print('sys.path', sys.path)
    import pkg
    pkg.hello()
    ```

    在`pkg`文件夹外执行: 

    ```
    $ python pkg 
    __main__
    __main__.__name__ __main__
    __main__.__package__ 
    sys.path ['/Users/wenzexu/test/pkg', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python312.zip', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/lib-dynload', '/Users/wenzexu/test/.venv/lib/python3.12/site-packages']
    Traceback (most recent call last):
    File "<frozen runpy>", line 198, in _run_module_as_main
    File "<frozen runpy>", line 88, in _run_code
    File "/Users/wenzexu/test/pkg/__main__.py", line 6, in <module>
        import pkg
    ModuleNotFoundError: No module named 'pkg'
    ```

    由于没有加载`pkg`包, 所以`sys.path`中没有这个包的路径, 所以`import pkg`导入失败, 所以, 只要在`__main__.py`文件中手动将这个包的路径加入到`sys.path`中就好了.

    修改后的`__main__.py`: 

    ```py
    import os, sys
    print('__main__')
    print('__main__.__name__', __name__)
    print('__main__.__package__', __package__)
    if not __package__:
        path = os.path.join(os.path.dirname(__file__), os.pardir)
        sys.path.insert(0, path)
    print('sys.path', sys.path)
    import pkg
    pkg.hello() 
    ```

    在`pkg`文件夹外执行: 

    ```
    $ python pkg
    __main__
    __main__.__name__ __main__
    __main__.__package__ 
    sys.path ['/Users/wenzexu/test/pkg/..', '/Users/wenzexu/test/pkg', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python312.zip', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/lib-dynload', '/Users/wenzexu/test/.venv/lib/python3.12/site-packages']
    __init__
    __init__.__name__ pkg
    __init__.__package__ pkg
    sys.path ['/Users/wenzexu/test/pkg/..', '/Users/wenzexu/test/pkg', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python312.zip', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12', '/Library/Frameworks/Python.framework/Versions/3.12/lib/python3.12/lib-dynload', '/Users/wenzexu/test/.venv/lib/python3.12/site-packages']
    Hello from pkg/__init__.py
    ```

    现在就正常了.

## 打包

打包指的是将一个项目打包成可分发的格式, 以便其他用户或者开发者能够轻松安装和使用. 打包主要可以分为以下几类: 

- 原分发包: sdist, 包含了项目的源代码, 通常以`.tar.gz`格式发布, 这种包在安装时需要根据源码进行构建和编译(如过有需要编译的部分, 如C扩展; 如果为纯Python代码, 不需要编译), 常用的工具是setuptools
- 二进制分发包: bdist, 包含了预编译的二进制文件, 通常以`.whl`格式发布, 这种包在安装需要根据远吗进行构建, 但是不需要编译(已经包含了预编译的文件, 无论是C扩展还是其他二进制依赖), 常用的工具是setuptools
- 独立可执行文件: 这种文件将Python代码和解释器以及搜索的依赖打包在一起, 生成一个可以在没有解释器的环境中运行的单独可执行文件, 常用的工具有pyinstaller, cx_Freeze和py2exe

此外, 我们可以通过twine将打包好的包上传到[PYPI](https://pypi.org).

### `setuptools`打包

???+ warning "注意"

    需要先安装`setuptools`: `pip install setuptools`.

??? example "例子"

    项目结构:

    ```
    .
    ├── LICENSE
    ├── MANIFEST.in
    ├── README.md
    ├── mypackage
    │   ├── __init__.py
    │   ├── __version__.py
    │   └── core.py
    └── setup.py
    ```

    `MANIFEST.in`文件: 

    ```
    include README.md LICENSE
    ```

    `__init__.py`文件:

    ```py
    from .core import *
    ```

    `__version__.py`文件:

    ```py
    # 8b    d8 Yb  dP 88""Yb    db     dP""b8 88  dP    db     dP""b8 888888
    # 88b  d88  YbdP  88__dP   dPYb   dP   `" 88odP    dPYb   dP   `" 88__
    # 88YbdP88   8P   88"""   dP__Yb  Yb      88"Yb   dP__Yb  Yb  "88 88""
    # 88 YY 88  dP    88     dP""""Yb  YboodP 88  Yb dP""""Yb  YboodP 888888

    VERSION = (5, 2, 0)

    __version__ = '.'.join(map(str, VERSION))
    ```

    `core.py`文件:

    ```py
    # Insert your code here.
    ```

    `setup.py`文件:

    ```py
    #!/usr/bin/env python
    # -*- coding: utf-8 -*-

    # Note: To use the 'upload' functionality of this file, you must:
    #   $ pipenv install twine --dev

    import io
    import os
    import sys
    from shutil import rmtree

    from setuptools import find_packages, setup

    # Package meta-data.
    NAME = '[name]'
    DESCRIPTION = '[desc]'
    URL = 'https://github.com/ricolxwz/[repo]'
    EMAIL = 'ricol.xwz@outlook.com'
    AUTHOR = 'ricolxwz'
    REQUIRES_PYTHON = '>=3.6.0'
    VERSION = '0.1.0'

    # What packages are required for this module to be executed?
    REQUIRED = [
        # 'requests', 'maya', 'records',
    ]

    # What packages are optional?
    EXTRAS = {
        # 'fancy feature': ['django'],
    }

    # The rest you shouldn't have to touch too much :)
    # ------------------------------------------------
    # Except, perhaps the License and Trove Classifiers!
    # If you do change the License, remember to change the Trove Classifier for that!

    here = os.path.abspath(os.path.dirname(__file__))

    # Import the README and use it as the long-description.
    # Note: this will only work if 'README.md' is present in your MANIFEST.in file!
    try:
        with io.open(os.path.join(here, 'README.md'), encoding='utf-8') as f:
            long_description = '\n' + f.read()
    except FileNotFoundError:
        long_description = DESCRIPTION

    # Load the package's __version__.py module as a dictionary.
    about = {}
    if not VERSION:
        project_slug = NAME.lower().replace("-", "_").replace(" ", "_")
        with open(os.path.join(here, project_slug, '__version__.py')) as f:
            exec(f.read(), about)
    else:
        about['__version__'] = VERSION

    # Where the magic happens:
    setup(
        name=NAME,
        version=about['__version__'],
        description=DESCRIPTION,
        long_description=long_description,
        long_description_content_type='text/markdown',
        author=AUTHOR,
        author_email=EMAIL,
        python_requires=REQUIRES_PYTHON,
        url=URL,
        packages=find_packages(exclude=["tests", "*.tests", "*.tests.*", "tests.*"]),
        # If your package is a single module, use this instead of 'packages':
        # py_modules=['mypackage'],

        # entry_points={
        #     'console_scripts': ['mycli=mymodule:cli'],
        # },
        install_requires=REQUIRED,
        extras_require=EXTRAS,
        include_package_data=True,
        license='MIT',
        classifiers=[
            # Trove classifiers
            # Full list: https://pypi.python.org/pypi?%3Aaction=list_classifiers
            'License :: OSI Approved :: MIT License',
            'Programming Language :: Python',
            'Programming Language :: Python :: 3',
            'Programming Language :: Python :: 3.6',
            'Programming Language :: Python :: Implementation :: CPython',
            'Programming Language :: Python :: Implementation :: PyPy'
        ],
    )
    ```

#### 包内容

默认情况下, `setuptools`在构建包的时候会包含以下内容: 

1. Python包: 通过`find_packages()`找到的所有包
2. 由`package_data`指定的文件
3. 由`MANIFEST.in`指定的文件

???+ warning "注意"

    使用后两种方法必须要设置`include_package_data = True`

???+ example "例子"

    === "`package_data`"

        ???+ warning "注意"

            由`package_data`参数指定的文件必须包含在包目录内, 不能指定包含包外面的文件, 如果文件位于包外, 则需要先将其移动到包外面, 然后使用`MAINIFEST.in`指定.
        
        项目结构: 

        ```
        myproject/
        ├── mypackage/
        │   ├── __init__.py
        │   ├── module.py
        │   └── data/
        │       ├── config.json
        │       └── sample_data.csv
        ├── README.md
        └── setup.py
        ```

        `setup.py`文件: 

        ```py
        from setuptools import setup, find_packages

        setup(
            name='mypackage',
            version='0.1.0',
            description='A simple example package',
            long_description=open('README.md').read(),
            long_description_content_type='text/markdown',
            author='Your Name',
            author_email='your.email@example.com',
            url='https://github.com/yourname/mypackage',
            packages=find_packages(),
            include_package_data=True,  # 必须启用这个选项
            package_data={
                # 包含在 mypackage 中的所有文件
                'mypackage': ['data/*.json', 'data/*.csv'],
            },
            python_requires='>=3.6',
        )
        ```

        这种情况下, 如果你运行`python setup.py sdist`, 默认情况下, 源分发包只会包含`mypackage`目录以及其中的模块以及包外的`README.md`和`LICENSE`等必要文件, 其他的文件, 如`data/config.json`和`data/sample_data.csv`不会包含在源分发包中. 为了包含着这两个文件, 使用了`package_data`指定这些文件需要包含到打包好的包里面. 

    === "`MANIFEST.in`"

        ???+ note "笔记"

            由`MANIFEST.in`指定的文件可以在包内也可以在包外.

        项目结构:

        ```
        myproject/
        ├── mypackage/
        │   ├── __init__.py
        │   └── module.py
        ├── README.md
        ├── setup.py
        └── data/
            └── dataset.csv
        ```

        `setup.py`文件:

        ```py
        from setuptools import setup, find_packages

        setup(
            name='mypackage',
            version='0.1.0',
            description='A simple example package',
            long_description=open('README.md').read(),
            long_description_content_type='text/markdown',
            author='Your Name',
            author_email='your.email@example.com',
            url='https://github.com/yourname/mypackage',
            packages=find_packages(),
            include_package_data=True,
            python_requires='>=3.6',
        )
        ```

        这种情况下, 如果你运行`python setup.py sdist`, 默认情况下, 源分发包只会包含`mypackage`目录以及其中的模块以及包外的`README.md`和`LICENSE`等必要文件, 其他的文件, 如`data/dataset.csv`不会包含在源分发包中.

        为了包含着两个文件, 可以创建一个`MANIFEST.in`, 并指定这些文件:

        ```
        recursive-include data *.csv
        ```

        再次运行时, 源分发包将包含: 

        - `mypackage/`目录以及其中的所有模块以及包外的`README.md`和`LICENSE`等必要文件
        - `data/`目录以及其中所有的`.csv`文件

#### 打包

可以通过`python setup.py sdist`生成原分法包, 或者使用`python setup.py bdist_wheel`生成二进制分发包, 打包后的文件放在dist文件夹中, 扩展名分别为`.tar.gz`和`.whl`. 

???+ warning "注意"

    在打包之前, 需要清理掉之前所有打包产生的文件: `rm -rf build dist *.egg-info`

#### 参数

##### 描述

我们可以在`setup.py`中将`long_description`设置为项目下的`README.md`文件:

???+ example "例子"

    ```py
    here = os.path.abspath(os.path.dirname(__file__))

    # Import the README and use it as the long-description.
    # Note: this will only work if 'README.md' is present in your MANIFEST.in file!
    try:
        with io.open(os.path.join(here, 'README.md'), encoding='utf-8') as f:
            long_description = '\n' + f.read()
    except FileNotFoundError:
            long_description = DESCRIPTION
    ```

    `__file__`在这里时`setup.py`的文件名, `here`保存的是`setup.py`的绝对路径. 我们将`README.md`文件读出, 然后赋值给`long_description`. 最后在`setup()`函数中设置.

##### 版本

我们可以将版本设置为包目录下`__version__.py`文件中设置的版本:

???+ example "例子"

    `setup.py`文件(部分):

    ```py
    # Load the package's __version__.py module as a dictionary.
    about = {}
    if not VERSION:
        project_slug = NAME.lower().replace("-", "_").replace(" ", "_")
        with open(os.path.join(here, project_slug, '__version__.py')) as f:
            exec(f.read(), about)
    else:
        about['__version__'] = VERSION
    ```

    `__version__.py`文件:

    ```py
    `__version__.py`文件:

    ```py
    # 8b    d8 Yb  dP 88""Yb    db     dP""b8 88  dP    db     dP""b8 888888
    # 88b  d88  YbdP  88__dP   dPYb   dP   `" 88odP    dPYb   dP   `" 88__
    # 88YbdP88   8P   88"""   dP__Yb  Yb      88"Yb   dP__Yb  Yb  "88 88""
    # 88 YY 88  dP    88     dP""""Yb  YboodP 88  Yb dP""""Yb  YboodP 888888

    VERSION = (5, 2, 0)

    __version__ = '.'.join(map(str, VERSION))
    ```

    找到`__version__.py`文件之后, 使用`exec()`执行里面的代码, 第二个参数指定了一个命名空间.

    ???+ example "例子"

        ```py
        code = 'a = 5\nb = 10\nprint(a + b)'
        namespace = {}
        exec(code, namespace)
        print(namespace)  # {'a': 5, 'b': 10}
        ```

    将其版本保存到`about`这个字典中, 在`setup()`函数中使用. 如果没找到这个文件的话, 使用的是`setup.py`中定义的`VERSION`变量的值. 

##### 依赖

`setup()`函数中的`install_requires`用于指定核心依赖, `extras_require`用于指定可选依赖. 

- `install_requires`指定的依赖无论用户以何种方式安装你的包, 这些都会被安装.

    ???+ example "例子"

        ```py
        from setuptools import setup

        REQUIRED = [
            'numpy>=1.18.0',
            'pandas>=1.0.0',
        ]

        setup(
            ...
            install_requires=REQUIRED,
            ...
        )
        ```

- `extras_require`指定的是可选依赖, 可以为你的包指定一些额外的依赖, 但不是必需品, 用户可以选择是否安装这些依赖.

    ???+ example "例子"

        ```py
        from setuptools import setup

        EXTRAS = {
            'dev': ['check-manifest'],
            'test': ['coverage'],
        }

        setup(
            ...
            extras_require=EXTRAS,
            ...
        )
        ```

        用户可以通过以下命令安装可选依赖: 

        ```sh
        pip install your_package_name[dev]
        pip install your_package_name[test]
        ```

##### 其他参数

简短解释一下`setup()`函数中的其他参数以及复习一下已经讲过的参数:

- `name`: 包的名称

    ???+ tip "Tip"

        包的名称中的连字符用`-`, 而实际包的名字中的连字符用`_`, 因为导入包的时候带有`-`的包需要用到`importlib`, 比较麻烦.

- `verision`: 包的版本号
- `description`: 包的简短描述
- `long_description`: 包的详细描述
- `long_description_content_type`: 包的详细描述的文件类型, 一般是`text/markdown`
- `author`: 包的作者
- `author_email`: 包的作者的邮箱
- `python_requires`: 指定Python的版本范围
- `url`: 包的主页地址
- `packages`: 指定要打的包, 可以使用`find_packages()`函数自动寻找要打的包
- `py_modules`: 如果是单个模块, 使用的不是`package`而是`py_modules`
- `entry_point`: 定义包的命令行脚本入口点
- `install_requires`: 指定核心依赖
- `extras_require`: 指定可选依赖
- `include_package_data`: 设置是否可以包含其他文件
- `license`: 包的许可证
- `classifiers`: 分类标签, 帮助用户找到你的包
- `cmdclass`: 支持在命令行运行自定义命令

## 上传

### `twine`上传

???+ warning "注意"

    需要先安装`twine`: `pip install twine`.

可以通过`twine upload dist/*`命令将`dist`文件夹下的所有包都上传到[PYPI](https://pypi.org).

???+ tip "Tip"

    - 可以先上传到[TestPYPI](https://test.pypi.org/)检测一下自己的包是否正常, 是否可以通过`pip`下载安装. 

        ```
        twine upload --repository testpypi dist/*
        ```

    - 可以在用户目录`~`下创建一个文件`.pypirc`保存自己的Token: 

        ```
        [pypi]
        username = __token__
        password = [token]

        [testpypi]
        username = __token__
        password = [token]
        ```

## 工具

### poetry

poetry是一个Python的依赖, 环境管理和打包工具.

#### 安装依赖[^11]

可以通过`poetry install`安装所有的依赖, 执行该命令后, 会有两种情况:

1. 当前目录下没有`poetry.lock`文件, 有`pyproject.toml`文件

    poetry会解析`pyproject.toml`文件中的依赖并下载条件范围内最新的依赖. 完成安装后, 将所有依赖的版本记录在`poetry.lock`文件中. 

2. 当前目录下有`poetry.lock`文件, 有`pyproject.toml`文件

    poetry会解析`pyproject.toml`文件中的依赖, 并查看`poetry.lock`文件

    1. 若`poetry.lock`中的相应依赖的版本号在`pyproject.toml`声明的范围内, 下载`poetry.lock`的版本
    2. 若`poetry.lock`中的相应依赖的版本号不在`pyproject.toml`声明的范围内, 报错

2a见下方例子1, 2, 3; 2b见下方例子4.

???+ warning "注意"

    在2a.情况下, 每次执行`poetry install`之前会检查`pyproject.toml`文件有无变化, 具体的原理是对去掉空格后的`pyproject.toml`文件求哈希值, 并记录在`poetry.lock`文件的`content-hash`字段中, 若修改`pyproject.toml`文件后没有更新`content-hash`, 那么执行`poetry install`会报错. 

    解决方法: 修改`pyproject.toml`文件后, 使用`poetry lock --no-update`更新这个哈希值, 需要注意的是这个命令和`poetry lock`的区别: 

    - `poetry lock`: 解析`pyproject.toml`文件中的依赖, 将条件范围内最新的依赖版本号更新到`poetry.lock`文件中
    - `poetry lock --no-update`: 解析`pyproject.toml`文件中的依赖
        - 若`poetry.lock`中的相应依赖的版本号在`pyproject.toml`声明的范围内, 保持`poetry.lock`的该版本号不变, 见下方例子1
        - 若`poetry.lock`中的相应依赖的版本号不在`pyproject.toml`声明的范围内, 更新`poetry.lock`中的相应依赖的版本号为`pyproject.toml`条件范围内最新的依赖版本号, 见下方例子3

    使用`poetry lock --no-update`更新这个哈希值的原因是因为我们不希望`poetry.lock`中在`pyproject.toml`条件范围内的版本号发生变化, 只希望更新`content-hash`字段的值(注意两个命令都会更新`content-hash`). 

???+ tip "Tip"

    - 若项目无需打包, 可以在`pyproject.toml`文件在`[tool.poetry]`中设置`package-mode = false `
    - 若需要在本地生成虚拟环境, 可以在`poetry.toml`文件中设置:

        ```
        [virtualenvs]
        in-project = true
        ```

???+ example "例子"

    === "例子1"

        结构:

        ```
        .
        ├── poetry.lock
        └── pyproject.toml
        ```

        `pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = "2.10.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api"
        ```

        `poetry.lock`文件:

        ``` hl_lines="5 21"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.10.0"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.10.0-py2.py3-none-any.whl", hash = "sha256:09bc1b5f3a56cd8c48d433213a8cba51a67d12936568f73b5f1793fcb0c0979e"},
            {file = "requests-2.10.0.tar.gz", hash = "sha256:63f1815788157130cee16a933b2ee184038e975f0017306d723ac326b5525b54"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL (>=0.13)", "pyasn1"]
        socks = ["PySocks (>=1.5.6)"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "25c064eaf29678762031b94d64762b5e9c717f8c86cb22a24b35a9e469c992a8"
        ```

        现在, 手动修改`pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = ">=2.10.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api" 
        ```

        执行`poetry install`: 

        ```
        $ poetry install
        Installing dependencies from lock file

        pyproject.toml changed significantly since poetry.lock was last generated. Run `poetry lock [--no-update]` to fix the lock file.
        ```

        这就是上面注意中提到的由于`content-hash`发生改变导致安装失败. 通过`poetry lock --no-update`更新哈希值:

        ```
        $ poetry lock --no-update
        Resolving dependencies... (0.1s)

        Writing lock file
        ```
        
        我们来看一下新的`content-hash`: 

        ``` hl_lines="5 21"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.10.0"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.10.0-py2.py3-none-any.whl", hash = "sha256:09bc1b5f3a56cd8c48d433213a8cba51a67d12936568f73b5f1793fcb0c0979e"},
            {file = "requests-2.10.0.tar.gz", hash = "sha256:63f1815788157130cee16a933b2ee184038e975f0017306d723ac326b5525b54"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL (>=0.13)", "pyasn1"]
        socks = ["PySocks (>=1.5.6)"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "6363722bb38e3bb0c73ccbb1763cce8684871565683659092475ba2763c452a3"
        ```

        可以看到哈希值改变了, 但是版本号没变. 再次执行`poetry install`, 下载`poetry.lock`对应的版本, 即`2.10.0`:

        ```
        $ poetry install
        Installing dependencies from lock file

        Package operations: 1 install, 0 updates, 0 removals

        - Installing requests (2.10.0)
        ```

        可以看到成功安装.

    === "例子2"

        在实际开发过程中, 若某模块推出新的版本的时候, 如`requests`模块我们在`pyproject.toml`中定义的条件范围是`>=2.32.2`, 若现在出现了一个新的版本`2.32.4`, 而`poetry.lock`中的版本是`2.32.3`, 这个时候我们不需要去执行`poetry lock --no-update`, 因为`pyproject.toml`文件没有发生改变, 当我们执行`poetry install`之后, 安装的还是`2.32.3`这个版本, 也就是情况`2a`

    === "例子3"

        结构:

        ```
        .
        ├── poetry.lock
        └── pyproject.toml
        ```

        `pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = "2.10.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api"
        ```

        `poetry.lock`文件:

        ``` hl_lines="5 21"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.10.0"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.10.0-py2.py3-none-any.whl", hash = "sha256:09bc1b5f3a56cd8c48d433213a8cba51a67d12936568f73b5f1793fcb0c0979e"},
            {file = "requests-2.10.0.tar.gz", hash = "sha256:63f1815788157130cee16a933b2ee184038e975f0017306d723ac326b5525b54"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL (>=0.13)", "pyasn1"]
        socks = ["PySocks (>=1.5.6)"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "25c064eaf29678762031b94d64762b5e9c717f8c86cb22a24b35a9e469c992a8"
        ```

        现在, 手动修改`pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = "<2.9.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api" 
        ```

        执行`poetry install`: 

        ```
        $ poetry install
        Installing dependencies from lock file

        pyproject.toml changed significantly since poetry.lock was last generated. Run `poetry lock [--no-update]` to fix the lock file.
        ```

        这就是上面注意中提到的由于`content-hash`发生改变导致安装失败. 通过`poetry lock --no-update`更新哈希值:

        ```
        $ poetry lock --no-update
        Resolving dependencies... (0.8s)

        Writing lock file
        ```

        我们来看一下新的`content-hash`: 

        ``` hl_lines="5 20"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.8.1"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.8.1-py2.py3-none-any.whl", hash = "sha256:89f1b1f25dcd7b68f514e8d341a5b2eb466f960ae756822eaab480a3c1a81c28"},
            {file = "requests-2.8.1.tar.gz", hash = "sha256:84fe8d5bf4dcdcc49002446c47a146d17ac10facf00d9086659064ac43b6c25b"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL", "pyasn1"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "863f6f137ec905c3cca085aef062a74a42f9b9186d74d8ca18a26d70ba58e86a"
        ```

        可以看到哈希值改变了, 版本号也改变了, 变成了`pyproject.toml`中条件范围内的最新版本, 即`2.8.1`版本, 再次执行`poetry.install`, 对应情况2a, 这个时候的`poetry.lock`中相应依赖的版本号在`pyproject.toml`声明的范围内, 所以下载的是`2.8.1`版本的依赖.

        ```
        $ poetry install
        Installing dependencies from lock file

        Package operations: 1 install, 0 updates, 0 removals

        - Installing requests (2.8.1)
        ```

    === "例子4"

        结构:

        ```
        .
        ├── poetry.lock
        └── pyproject.toml
        ```

        `pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = "2.10.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api"
        ```

        `poetry.lock`文件:

        ``` hl_lines="5 21"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.10.0"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.10.0-py2.py3-none-any.whl", hash = "sha256:09bc1b5f3a56cd8c48d433213a8cba51a67d12936568f73b5f1793fcb0c0979e"},
            {file = "requests-2.10.0.tar.gz", hash = "sha256:63f1815788157130cee16a933b2ee184038e975f0017306d723ac326b5525b54"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL (>=0.13)", "pyasn1"]
        socks = ["PySocks (>=1.5.6)"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "25c064eaf29678762031b94d64762b5e9c717f8c86cb22a24b35a9e469c992a8"
        ```

        现在, 手动修改`pyproject.toml`文件:

        ``` hl_lines="10"
        [tool.poetry]
        name = "test"
        version = "0.1.0"
        description = ""
        authors = ["wenzexu <ricol.xwz@outlook.com>"]
        package-mode = false

        [tool.poetry.dependencies]
        python = "^3.12"
        requests = "<2.9.0"

        [build-system]
        requires = ["poetry-core"]
        build-backend = "poetry.core.masonry.api" 
        ```

        这里, 不能使用`poetry lock --no-update`, 若执行, 会导致版本号变为`2.8.1`, 正常安装; 而我们模拟的是没有执行`poetry lock --no-update`的情况, 所以应该把修改后的`pyproject.toml`的哈希值粘贴到`poetry.lock`文件中(这个哈希值可以参考例子3):

        ``` hl_lines="5 21"
        # This file is automatically @generated by Poetry 1.8.3 and should not be changed by hand.

        [[package]]
        name = "requests"
        version = "2.10.0"
        description = "Python HTTP for Humans."
        optional = false
        python-versions = "*"
        files = [
            {file = "requests-2.10.0-py2.py3-none-any.whl", hash = "sha256:09bc1b5f3a56cd8c48d433213a8cba51a67d12936568f73b5f1793fcb0c0979e"},
            {file = "requests-2.10.0.tar.gz", hash = "sha256:63f1815788157130cee16a933b2ee184038e975f0017306d723ac326b5525b54"},
        ]

        [package.extras]
        security = ["ndg-httpsclient", "pyOpenSSL (>=0.13)", "pyasn1"]
        socks = ["PySocks (>=1.5.6)"]

        [metadata]
        lock-version = "2.0"
        python-versions = "^3.12"
        content-hash = "863f6f137ec905c3cca085aef062a74a42f9b9186d74d8ca18a26d70ba58e86a"
        ```

        执行`poetry install`:

        ```
        $ poetry install
        Installing dependencies from lock file

        Because test depends on requests (<2.9.0) which doesn't match any versions, version solving failed.
        ```

        可以看到, 报错了.

[^1]: 【基础】什么是包、模块和库？—Python&图像处理教程 文档. (n.d.). Retrieved June 15, 2024, from http://await.fun/PythonTutorial/p06/1.html
[^2]: python中import的用法—PythonJoy. (n.d.). Retrieved June 15, 2024, from https://joy9191.github.io/16196181446571.html
[^3]: 以python -m site命令为例解释-m选项-CSDN博客. (n.d.). Retrieved June 16, 2024, from https://blog.csdn.net/jiaxin576/article/details/138574683
[^4]: 使用模块. (n.d.). Retrieved June 16, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017455068170048
[^5]: ennethreitz/setup.py: 📦 A Human’s Ultimate Guide to setup.py. (n.d.). Retrieved June 16, 2024, from https://github.com/kennethreitz/setup.py
[^6]: Python中__init__.py文件的作用—小蓝博客. (n.d.). Retrieved June 18, 2024, from https://www.8kiz.cn/archives/20137.html
[^7]: Python入门之——Package内的__main__.py和__init__.py_51CTO博客___main__.py文件. (n.d.). Retrieved June 18, 2024, from https://blog.51cto.com/feishujun/5513660
[^8]: Henry. (2021, May 23). 一文理解Python导入机制. Henry’s Blog. https://hzhu212.github.io/posts/b9859a94/index.html
[^9]: The import system. (n.d.). Python Documentation. Retrieved June 18, 2024, from https://docs.python.org/3/reference/import.html
[^10]: Command line and environment. (n.d.). Python Documentation. Retrieved June 18, 2024, from https://docs.python.org/3/using/cmdline.html
[^11]: Basic usage | Documentation | Poetry—Python dependency management and packaging made easy. (n.d.). Retrieved July 6, 2024, from https://python-poetry.org/docs/basic-usage/#installing-without-poetrylock