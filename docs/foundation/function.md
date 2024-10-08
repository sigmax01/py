---
title: 函数
icon: material/function-variant
comments: false
---

## 参数

### 默认参数

在函数声明的参数列表中的参数后面加入等于号设置默认值. 

???+ warning "注意"

    默认参数必须指向不可变对象, 如果指向可变对象, 在第一次调用时修改该参数, 由于默认参数赋值的时候只存储的是这个对象的地址, 所以下一次调用该函数的时候, 其地址虽然没变, 但是值已经改变了. 

    ??? example "例子"

        假设函数中有一个可变对象设置了默认参数:

        ```py
        def add_end(L=[]):
            L.append('END')
            return L
        ```

        执行指令:

        ```
        >>> add_end()
        ['END']
        >>> add_end()
        ['END', 'END']
        ```

### 可变参数 {可变参数}

在函数声明的参数列表中还可以定义可变参数, 可变参数的作用就是使传入参数的个数可变. 在有可变参数存在的情况下调用函数, 首先会匹配定义死的参数, 剩余的参数会以元组的形式存储在可变参数中. 使用`*`表示可变参数. 

??? example "例子"

    定义函数: 

    ```py
    def func(a, *args):
        print a
        print args
    ```

    调用函数: 

    ```
    >>> func(1, 2, 3, 4)
    1
    (2, 3, 4)
    ```

???+ tip "Tip"

    如果要传入一个列表里面的值作为可变参数怎么办? 可以在列表或者元组前面加一个`*`, 把列表或者元组的元素变成可变参数传进去:    

    ```
    >>> nums = [1, 2, 3]
    >>> func(1, *nums)
    1
    (1, 2, 3)
    ```

### 关键字参数 {#关键字参数}

在函数声明的参数列表中还可以定义关键字参数, 关键字参数的作用类似于可变参数, 但是, 传入的必须是键值对. 在有关键字参数存在的情况下调用函数, 首先会匹配定义死的参数, 剩余的参数会以字典的形式存储在关键字参数中. 使用`**`表示关键字参数. 

??? example "例子"

    定义函数: 

    ```py
    def func(**kwargs):
        print kwargs
    ```

    调用函数: 

    ```
    >>> func(x=1, y=2, z=3)
    {'y': 2, 'x': 1, 'z': 3}
    ```

???+ tip "Tip"

    如果要传入一个字典里面的值作为关键字参数怎么办? 可以在字典前面加一个`**`, 把字典的键值对变成关键字参数传进去:    

    ```
    >>> info = {'x': 3, 'y': 6}
    >>> func(**info)
    {'x': 3, 'y': 6}
    ```

### 命名关键字参数

对于关键字参数, 函数的调用者可以传入不受限制的关键字参数. 如果要限制关键字参数的名字, 就可以使用命名关键字参数. 命名关键字阐述需要一个分隔符`*`, `*`后面的参数被视为命名关键字参数. 

??? example "例子"

    定义函数: 

    ```py
    def func(name, age, *, city, job):
        print(name, age, city, job)
    ```

    调用函数: 

    ```
    >>> func('wenzexu', 18, city='sydney', job='student')
    wenzexu 18 sydney student
    ```

???+ tip "Tip"

    如果函数定义中已经有了一个可变参数, 后面跟着的命名关键字参数就不再需要一个分隔符`*`了

    ??? example "例子"

        ```py
        def func(name, age, *args, city, job):
            print(name, age, args, city, job)
        ```

???+ warning "注意"

    调用函数时必须传入所有的命名关键字参数, 不然会报错. 如果有默认值, 可以通过设置默认值的方式在调用时缺省.

    ??? example "例子"

        定义函数: 

        ```py
        def func(name, age, *args, city, job='student')
            print(name, age, city, job)
        ```

        调用函数: 

        ```
        >>> func('wenzexu', 18)
        Traceback (most recent call last):
            File "<stdin>", line 1, in <module>
        TypeError: person() missing 1 required keyword-only argument: 'city'
        >>> func('wenzexu', 18, city='sydney')
        wenzexu 18 sydney student
        ```

### 参数组合

在定义函数时, 可以选用必选参数, 默认参数, 可变参数, 关键字参数和命名关键字参数, 这5中参数都可以组合使用. 但是请注意, 参数定义的顺序一定是: 必选参数, 默认参数, 可变参数, 命名关键字参数和关键字参数.

???+ example "例子"

    === "例子1"

        定义函数: 

        ```py
        def f1(a, b, c=0, *args, **kw):
            print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)
        ```

        调用函数: 

        ```
        >>> f1(1, 2)
        a= 1 b = 2 c = 0 args = () kw = {}
        >>> f1(1, 2, c=3)
        a = 1 b = 2 c = 3 args = () kw = {}
        >>> f1(1, 2, 3, 'a', 'b')
        a = 1 b = 2 c = 3 args = ('a', 'b') kw = {}
        >>> f1(1, 2, 3, 'a', 'b', x=99)
        a = 1 b = 2 c = 3 args = ('a', 'b') kw = {'x': 99}
        >>> t = (1, 2, 3, 4)
        >>> d = {'d': 99, 'x': '#'}
        >>> func1(*t, **d)
        a=1 b=2 c=3 args=(4,) kw={'d': 99, 'x': '#'}
        ```

    === "例子2"

        定义函数: 

        ```py
        def f2(a, b, c=0, *, u, **kw):
            print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
        ```

        调用函数: 

        ```
        >>> f2(1, 2, u=99, ext=None)
        a = 1 b = 2 c = 0 u = 99 kw = {'ext': None}
        >>> t = (1, 2, 3)
        >>> d = {'d': 88, 'x': '$'}
        >>> f2(*t, **d)
        a = 1 b = 2 c = 3 u = 88 kw = {'x': '$'}
        ```

## 类型提示

Python3.6+ 版本加入了对"类型提示"的支持. 

通过声明变量的类型, 编辑器和一些工具能给你提供更好的支持, 而且不会改变函数的运行结果.

### 参数类型提示[^8]

#### 简单类型

所有的标准Python模型都可以被声明. 比如以下类型:

- `str`
- `int`
- `float`
- `bool`
- `bytes`

???+ example "例子"

    ```py
    def get_item(item_a: str, item_b: int, item_c: float, item_d: bool, item_e: bytes):
        return item_a, item_b, item_c, item_d, item_e
    ```

#### 嵌套类型

容器可以包含值, 容器本身拥有类型, 容器内部的这些值也拥有自己的类型. 可以使用`typing`模块来声明这些类型以及子类型.

##### 列表, 元组或集合

按照需求, 从`typing`模块导入`List`, `Tuple`或`Set`.

???+ example "例子"

    ```py
    from typing import List

    def process_items(items: List[str]):
        for item in items:
            print(item)
    ```

???+ tip "Tip"

    还可以为特定位置上的元素指定类型.

    ???+ example "例子"

        ```py
        from typing import Tuple

        def process_items(items_t: Tuple[int, int, str], items_s: Set[bytes]):
            return items_t, items_s
        ```

        - 变量`items_t`是一个元组, 其中的前两个元素是`int`, 最后一个元素是`str`
        - 变量`items_s`是一个集合, 其中的每个元素都是`bytes`

##### 字典

从`typing`模块导入`Dict`. 定义时需要传入两个子类型, 用逗号分隔, 第一个子类型声明字典的所有键的类型; 第二个子类型声明字典的所有值的类型.

???+ example "例子"

    ```py
    from typing import Dict

    def process_items(prices: Dict[str, float]):
        for item_name, item_price in prices.items():
            print(item_name)
            print(item_price)
    ```

#### 类作为类型

可以声明将类作为变量的类型.

???+ example "例子"

    ```py
    class Person:
        def __init__(self, name: str):
            self.name = name

    def get_person_name(one_person: Person):
        return one_person.name
    ```

### 返回值类型提示[^9]

返回值类型提示和参数类型提示的写法类似, 只不过放在`->`后面.

???+ example "例子"

    === "例子1"

        ```py
        def add(x: int, y: int) -> int:
            return x + y
        ```

    === "例子2"

        ```py
        def _field_is_complex(self, field: ModelField) -> tuple[bool, bool]:
            if type_is_complex(field.annotation):
                return True, False
            elif origin_is_union(get_origin(field.annotation)) and any(
                type_is_complex(arg) for arg in get_args(field.annotation)
            ):
                return True, True
            return False, False
        ```

    === "例子3"

        ```py
        def _read_env_file(self, file_path: Path) -> dict[str, Optional[str]]:
            file_vars = dotenv_values(file_path, encoding=self.env_file_encoding)
            return self._parse_env_vars(file_vars)
        ```

???+ tip "Tip"

    - `Optional[[type]]`表示某个变量可以是指定类型或者`None`
    - 若函数可能返回多个不同类型的值, 可以使用`typing`模块中的`Union`类来指定多个返回类型.

        ???+ example "例子"

            ```py
            from typing import Union

            def divide(x: int, y: int) -> Union[int, float]:
                if y == 0:
                    return float('inf')
                else:
                    return x / y
            ```

## 高阶函数 {#高阶函数}

函数可以作为参数传给另一个函数, 这种函数就称为高阶函数.

???+ example "例子"

    ```py
    def add(x, y, f):
        return f(x) + f(y)
    ```

    ```
    >>> add(-5, 6, abs)
    11
    ```

???+ note "笔记"

    - 变量也可以指向函数

        ??? example "例子"

            ```
            >>> abs
            <built-in function abs>
            >>> f = abs
            >>> f
            <built-in function abs>
            >>> f(-10)
            10
            ```

    - 函数名也是变量

        ??? example "例子"

            ```
            >>> abs = 10
            >>> abs(-10)
            Traceback (most recent call last):
            File "<stdin>", line 1, in <module>
            TypeError: 'int' object is not callable
            ```

### `map()` {#map函数}

`map()`函数接收两个参数, 一个是函数(接收一个参数, 返回一个值), 一个是[可迭代对象(Iterable)](/foundation/container/#迭代器和可迭代对象的区别), `map()`将传入的函数依次作用到序列的每一个元素, 并把结果作为新的[迭代器(Iterator)](/foundation/container/#迭代器和可迭代对象的区别)返回. 

???+ example "例子"

    ```
    >>> def f(x):
    ...     return x * x
    ...
    >>> r = map(f, [1, 2, 3, 4])
    >>> list(r)
    [1, 4, 9, 16]
    ```

    ???+ tip "Tip"

        可以通过`list()`函数把迭代器(惰性序列)都计算出来并返回一个列表. 

### `reduce()`

`reduce()`函数接收两个参数, 一个是函数(接收两个参数, 返回一个值), 一个是[可迭代对象(Iterable)](/foundation/container/#迭代器和可迭代对象的区别), `reduce()`首先会移除序列的前两个元素, 将传入的函数依次作用到这两个元素, 然后将返回值放回到序列中.(1) 最终返回一个单一的值 (特别适合做累计计算).
{ .annotate }

1. 便于方便理解, 原理是否是这样的有待考证.

???+ warning "注意"

    要使用`reduce()`, 必须先导包`from functools import reduce`.

???+ example "例子"

    ```
    >>> from functools import reduce
    >>> def add(x, y):
    ...     return x + y
    ...
    >>> reduce(add, [1, 3, 5, 7, 9])
    25
    ```

### `filter()`

`filter()`函数接收两个参数, 一个是函数(接收一个参数, 返回True/False), 一个是[可迭代对象(Iterable)](/foundation/container/#迭代器和可迭代对象的区别), `filter()`将传入的函数依次作用于序列的每一个元素, 选择保留或者丢弃该元素, 并把结果作为新的[迭代器(Iterator)](/foundation/container/#迭代器和可迭代对象的区别)返回. 

???+ example "例子"

    ```
    >>> def is_odd(x):
    ...     return n % 2 == 1
    ...
    >>> list(filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15]))
    [1, 5, 9, 15]
    ```

    ???+ tip "Tip"

        可以通过`list()`函数把迭代器(惰性序列)都计算出来并返回一个列表. 

### `sorted()`

`sorted()`函数接收两个参数, 一个是[可迭代对象(Iterable)](/foundation/container/#迭代器和可迭代对象的区别), 一个是函数(接收一个参数, 返回一个值). 这个函数要以关键字参数的形式传入. 并把结果作为新的[可迭代对象(Iterable)](/foundation/container/#迭代器和可迭代对象的区别)返回. 

???+ example "例子"

    ```
    >>> sorted([36, 5, -12, 9, -21], key=abs)
    [5, 9, -12, -21, 36]
    ```

???+ tip "Tip"

    还有一个函数, `sort()`也能实现类似的功能, 但是`sort()`是对本身进行排序, 如`lis.sort()`, 而`sorted()`会返回排序后的对象.

## 返回函数

函数可以作为结果值返回, 这就叫做返回函数. 

???+ example "例子"

    定义函数:

    ```py
    def lazy_sum(*args):
        def sum():
            ax = 0
            for n in args:
                ax = ax + n
            return ax
        return sum
    ```

    调用函数: 

    ```
    >>> f = lazy_sum(1, 3, 5, 7, 9)
    >>> f
    <function lazy_sum.<locals>.sum at 0x101c6ed90>
    >>> f()
    25
    ```

    ???+ warning "注意"

        若多次返回函数, 这些函数是互相独立的(不一样的).

        ??? example "例子"

            ```
            >>> f1 = lazy_sum(1, 3, 5, 7, 9)
            >>> f2 = lazy_sum(1, 3, 5, 7, 9)
            >>> f1 == f2
            False
            ```

### 闭包 {#闭包}

闭包, 指的就是内层函数使用了外层函数的局部变量, 虽然外层函数返回内层函数时它的生命周期已经完成, 外层函数的局部变量已经被销毁, 但是内层函数能够记住它被创建时的环境, 即使在它被调用时, 这些环境已经不再存在. 

???+ example "例子"

    定义函数: 

    ```py
    def count():
        def f(j):
            def g():
                return j*j
            return g
        fs = []
        for i in range(1, 4):
            fs.append(f(i))
        return fs
    ```

    调用函数: 

    ```
    >>> f1, f2, f3 = count()
    >>> f1()
    1
    >>> f2()
    4
    >>> f3()
    9
    ```

    `f(i)`会立即执行, 此时, `f(j)`函数内部的`j`不是一个循环变量, 而是一个确定量, 所以`g`里面引用的`j`也是确定的, 就是此时的`i`的值. 

???+ warning "注意"

    返回函数不要引用任何循环变量, 或者在外层函数在执行过程中会发生变化的量. 否则返回函数中的这个变量的值是外层函数对应变量的最后一个值. 

    ???+ example "例子"

        定义函数:

        ```py
        def count():
            fs = []
            for i in range(1, 4):
                def f():
                    return i*i
                fs.append(f)
            return fs
        ```

        调用函数:

        ```
        >>> f1()
        9
        >>> f2()
        9
        >>> f3()
        9
        ```

        原因就在于返回的函数引用了变量`i`, 这个变量随着外层函数的执行是会改变的, 等到3个函数返回的时候, 它们所引用的变量`i`全部都是3, 所以执行的时候全是9.

        如何解决这个问题? 请看上面的例子.

#### `nonlocal`

如果我们仅仅只是读取引用的外层变量的值, 一切正常. 但是, 如果我们想在内层函数中改变引用的外层变量, 我们需要用到`nonlocal`关键字. 如果不声明的话, 会把该变量当成内层函数的局部变量, 导致报错. 

???+ example "例子"

    定义函数: 

    ```py
    def inc():
        x = 0
        def fn():
            nonlocal x
            x = x + 1
            return x
        return fn
    ```

    调用函数: 

    ```
    >>> f = inc()
    >>> print(f())
    1
    >>> print(f())
    2
    ```

## Lambda函数 {#Lambda函数}

在传入函数的时候, 不需要显式定义函数, 直接传入匿名函数更加方面, 在Python中, Lambda函数表示的就是匿名函数. 其基本语法为: 

```py
lambda [args1, args2, ...]: [expression]
```

???+ example "例子"

    ```
    >>> list(map(lambda x: x * x, [1, 2, 3, 4]))
    [1, 4, 9, 16]
    ```

???+ note "笔记"

    - 匿名函数也是一个函数对象, 也可以把匿名函数赋值给一个变量, 再利用变量来调用该函数:

        ???+ example "例子"

            ```
            >>> f = lambda x: x * x
            >>> f
            <function <lambda> at 0x101c6ef28>
            >>> f(5)
            25
            ```
    
    - 可以把匿名函数作为返回值返回:

        ???+ example "例子"

            ```py
            def build(x, y):
                return lambda: x * x + y * y
            ```

## 装饰器 {#装饰器}

装饰器用于增强函数的功能. 有时我们不希望修改函数的定义, 但是希望在代码运行期间动态增加函数的功能, 实现这种效果的工具就叫做装饰器.

### 不带参数的装饰器

若装饰器没有参数, 那么其作用为使得我们在调用被装饰函数的时候, 执行的是装饰后的函数.

???+ example "例子"

    定义函数: 

    ```py
    def log(func):
        def wrapper(t): 
            print('%s():' % (func.__name__))
            print("i am", t)
            return func(t)
        return wrapper

    @log
    def now(text):
        print(text)
    ```

    调用函数:

    ```
    >>> now("wenzexu")
    now():
    i am wenzexu
    wenzexu
    >>> result = now("wenzexu")
    >>> result
    wenzexu
    ```

    解释: 

    1. 对`now(text)`函数做一点修饰, 新的`now`函数为`log(now(text))`
    2. `log(now(text))`会返回一个`wrapper(t)`函数, 即新的`now(text)`函数为`wrapper(t)`函数
    3. 当我们执行`now("wenzexu")`的时候, 实际执行的是`wrapper("wenzexu")`

### 带参数的装饰器

若装饰器带有参数, 这个时候情况有点复杂, 用例子解释: 

???+ example "例子"

    定义函数: 

    ```py
    def log(param):
        def decorator(func):
            def wrapper(*args, **kw):
                print('%s %s():' % (param, func.__name__))
                print("I am", args[0])
                return func(*args, **kw)
            return wrapper
        return decorator

    @log('execute')
    def now(text):
        print(text)
    ```

    调用函数:

    ```
    >>> now("wenzexu")
    execute now():
    I am wenzexu
    wenzexu
    ```

    解释:

    1. 对`now(text)`函数做一点修饰, 新的`now(text)`函数为`log(param)(now(text))`
    2. `log(param)`会返回一个`decorator(func)`函数, 而`decorator(now)`会返回一个`wrapper(*args, **kw)`函数, 即新的`now(text)`函数为`wrapper(*args, **kw)`函数
    3. 当我们执行`now("wenzexu")`的时候, 实际执行的是`wrapper("wenzexu")`

### 函数签名

???+ warning "注意"

    上述两种的装饰器定义没有问题, 但还差一步, 经过装饰之后的函数其签名即`__name__`属性会改变, 变为实际执行的装饰函数的`__name__`. 这有可能导致依赖函数签名的代码执行报错, 例子:

    ???+ example "例子"

        定义函数: 

        ```py
        def log(func):
            def wrapper(t): 
                print('%s():' % (func.__name__))
                print("i am", t)
                return func(t)
            return wrapper

        @log
        def now(text):
            print(text)
        ```

        测试函数:

        ```
        >>> now.__name__
        wrapper
        ```
    
    为了解决这个问题, 我们无需编写`wrapper.__name__ = func.__name__`这样的代码, 只需要用内置的`functools.wraps`: 

    ???+ warning "注意"

        使用`functools.warps`需要导入`functools`模块. 

    ???+ example "例子"

        === "例子1"

            定义函数: 

            ```py
            import functools

            def log(func):
                @functools.wraps(func)
                def wrapper(t): 
                    print('%s():' % (func.__name__))
                    print("i am", t)
                    return func(t)
                return wrapper

            @log
            def now(text):
                print(text)
            ```

            测试函数:

            ```
            >>> now.__name__
            now
            ```

        === "例子2"

            定义函数: 

            ```py
            import functools

            def log(param):
                def decorator(func):
                    @functools.wraps(func)
                    def wrapper(*args, **kw):
                        print('%s %s():' % (param, func.__name__))
                        print("I am", args[0])
                        return func(*args, **kw)
                    return wrapper
                return decorator

            @log('execute')
            def now(text):
                print(text)
            ```

            调用函数:

            ```
            >>> now.__name__
            now
            ```

## 偏函数

偏函数的作用是把一个函数的某些参数固定住, 返回一个新的函数, 调用这个新函数会更简单.

???+ warning "注意"

    偏函数依赖于`functools`模块, 需要导入该模块.

???+ example "例子"

    ```
    >>> import functools
    >>> int2 = functools.partial(int, base=2)
    >>> int2('1000000')
    64
    ```

[^1]: 函数的参数. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017261630425888
[^2]: n3xtchen. (2014, August 8). Python 优雅的使用参数—可变参数（*args & **kwargs). https://n3xtchen.github.io/n3xtchen/python/2014/08/08/python-args-and-kwargs/
[^3]: 高阶函数. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017328655674400
[^4]: 返回函数. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017434209254976
[^5]: 匿名函数. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017451447842528
[^6]: 装饰器. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017451662295584
[^7]: 偏函数. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017454145929440
[^8]: Python 类型提示简介—FastAPI. (n.d.). Retrieved June 22, 2024, from https://fastapi.tiangolo.com/zh/python-types/
[^9]: Python 如何使用类型提示指定多个返回类型|极客教程. (n.d.). Retrieved June 22, 2024, from https://geek-docs.com/python/python-ask-answer/472_python_how_to_specify_multiple_return_types_using_typehints.html