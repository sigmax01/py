---
title: 对象
icon: material/code-braces
comments: false
---

## 访问限制 {#访问限制}

在外部, 如果未加限制, 我们可以自由地修改一个实例的属性. 如果要让内部属性不被外部直接访问, 我们可以在属性的名称前面加上两个下划线`__`. 这样属性就变成了一个"私有"属性, 外部"无法"访问. 

???+ example "例子"

    定义类: 

    ```py
    class Student(object):

        def __init__(self, name, score):
            self.__name = name
            self.__score = score
    ```

    使用类: 

    ```
    >>> wenzexu = Student('Wenze Xu', 18)
    >>> wenzexu.__name
    Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
    AttributeError: 'Student' object has no attribute '__name'
    ```

???+ tip "Tip"

    双下划线开头的变量不是真的无法从外面访问, 无法访问这样的变量是因为解释器将`__[var]`变成了`_[class]__[var]`, 我们仍然可以通过`_[class]__[var]`的形式访问`__[var]`变量. 

    ???+ example "例子"

        ```
        >>> wenzexu._Student__name
        Wenze Xu
        ```

???+ note "笔记"

    - 变量名类似`__[var]__`的是特殊变量, 是可以直接访问的, 不是私有变量
    - 变量名类似`_[var]`的, 是可以被外部访问的, 但是按照规定, 虽然可以被访问, 但是请将这种变量视为私有变量
    - 变量名类似`__[var]`的, 是"无法"被外部访问的

???+ warning "注意"

    请不要从外部直接设置私有变量, 否则设置的不是那个私有变量, 设置的是另一个变量.

    ???+ example "例子"

        ```
        >>> wenzexu = Student('Wenze Xu', 18)
        >>> wenzexu.get_name()
        Wenze Xu
        >>> wenzexu.__name = "Xingze Xu"
        >>> wenzexu.__name
        Xingze Xu
        >>> wenzexu.get_name()
        Wenze Xu
        ```

        表面上看, 外部代码修改了`__name`变量, 但是内部的`__name`已经被解释器自动改成了`_Student__name`, 而外部代码给`wenzexu`实例新增了一个`__name`变量.

### getter和setter

如果要访问或者修改这个"私有"属性, 可以使用getter和setter. 

???+ example "例子"

    ```py
    class Student(object):
        ...

        def get_name(self):
            return self.__name

        def get_score(self):
            return self.__score
    ```

???+ note "笔记"

    getter和setter的优势是你可以自定义在读取或者写入属性时发生的操作, 比如参数检查, 避免传入无效参数等等...

## 绑定限制 {#绑定限制}

### 动态绑定的灵活性

正常情况下, 我们创建了一个实例之后, 我们可以给该实例绑定任何属性和方法, 这就是动态语言的灵活性.

???+ example "例子"

    定义类:

    ```py
    class Student(object):
        pass
    ```

    尝试绑定属性: 

    ```
    >>> s = Student()
    >>> s.name = "wenzexu"
    >>> print(s.name)
    wenzexu
    ```

    尝试绑定方法: 

    ```
    >>> def set_age(self, age):
    ...     self.age = age
    ...
    >>> from types import MethodType
    >>> s.set_age = MethodType(set_age, s)
    >>> s.set_age(18)
    >>> s.age
    18
    ```

    ???+ warning "注意"

        给实例绑定一个方法, 对另一个实例是没有作用的

        ???+ example "例子"

            ```
            >>> s2 = Student()
            >>> s2.set_age(100)
            Traceback (most recent call last):
                File "<stdin>", line 1, in <module>
            AttributeError: 'Student' object has no attribute 'set_age'
            ```
        
        ???+ tip "Tip"

            为了给所有实例都绑定方法, 可以给类绑定方法

            ???+ example "例子"

                定义方法:  

                ```
                >>> def set_score(self, score):
                ...     self.score = score
                ... 
                >>> Student.set_score = set_score
                ```
            
                使用方法: 

                ```
                >>> s.set_score(100)
                >>> s.score
                100
                >>> s2.set_score(99)
                >>> s2.score
                99
                ```
            
            通常情况下, 我们不需要这么干, 我们可以直接在类里面定义类方法, 但是这样做是显示Python这门语言的灵活性. 
    
### `__slots__` {#slots}

如果我们要限制实例的属性该怎么办? 在定义类的时候, 可以用`__slot__`这个特殊类属性来限制实例能够添加的属性.

???+ example "例子"

    定义类: 

    ```py
    class Student(object):
        __slot__ = ('name', 'age')
    ```

    尝试绑定属性:

    ```
    >>> s = Student
    >>> s.name = "wenzexu"
    >>> s.age = 18
    >>> s.score = 99
    Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
    AttributeError: 'Student' object has no attribute 'score'
    ```

    由于`score`不在`__slot__`当中, 所以无法绑定`score`属性. 

???+ warning "注意"

    `__slot__`定义的属性仅对当前的实例起作用, 对继承的字类是不起作用的. 

    ???+ example "例子"

        ```
        >>> class GraduateStudent(Student):
        ...     pass
        ...
        >>> g = GraduateStudent()
        >>> g.score = 999
        ```

    除非在字类的定义中也定义`__slots__`, 这样, 字类实例允许定义的属性是自身的`__slots__`加上父类的`__slots__`.

## `@property`

前面讲到, 我们可以用getter, setter方法进行参数检查, 格式化输出... 这种方法略显复杂, 那么如何用类似属性这样的方式来访问/修改实例的属性呢? 我们可以用装饰器的方法, 这里用到的装饰器是内置的`@property`, 把一个getter方法变成以属性的方式输出, 只需要添加`@property`; 把一个setter方法变成以属性的方式赋值, 只需要添加`@[property].setter`.

???+ example "例子"

    定义类:

    ```py
    class Student(object):

        @property
        def score(self):
            return self._score

        @score.setter
        def score(self, value):
            if not isinstance(value, int):
                raise ValueError('score must be an integer!')
            if value < 0 or value > 100:
                raise ValueError('score must between 0 ~ 100!')
            self._score = value
    ```

    以属性的方式读取/修改实例属性: 

    ```
    >>> s = Student()
    >>> s.score = 60
    >>> s.score
    60
    >>> s.score = 9999
    Traceback (most recent call last):
        ...
    ValueError: score must between 0 ~ 100!
    ```

???+ tip "Tip"

    如果只定义getter方法, 不定义setter方法就是一个只读属性.

    ???+ example "例子"

        ```py
        class Student(object):

            @property
            def age(self):
                return 2015 - self._birth
        ```

???+ warning "注意"

    属性的方法名不要和实例的变量重名.

    ???+ example "例子"

        ```py
        class Student(object):

            @property
            def birth(self):
                return self.birth
        ```

        调用`s.birth`的时候, 首先转化为方法调用, 在执行`return self.birth`的时候, 又转化为方法调用, 造成死循环, 最终导致栈溢出.

## 多重继承

一个类继承自不止一个父类, 这叫做多重继承. 

???+ example "例子"

    ```py
    class Animal(object):
        pass

    class Mammal(Animal):
        pass

    class Runnable(object):
        def run(self):
            print("Running...")

    class Jumpable(object):
        def jump(self):
            print("Jumping...")

    class Dog(Mammal, Runnable, Jumpable):
        pass
    ```

    `Dog`类通过多重继承, 获得了`Mammal`和`Runnable`类的所有功能: 

    ```
    >>> d = Dog()
    >>> d.run()
    Running...
    >>> d.jump()
    Jumping...
    ```

## 定制类 {#定制类}

在类的一些属性中有一些属性/方法是形如`__[property]__`的, 这种属性/方法可以帮助我们定制一个类, 如[`__slots__`](#slots)可以进行[绑定限制](#绑定限制). 

### `__str__()` {#str}

`__str__()`特殊方法用于打印实例. 

???+ example "例子"

    ```
    >>> class Student(object):
    ...     def __init__(self, name):
    ...         self.name = name
    ...     def __str__(self):
    ...         return 'Student object (name: %s)' % self.name
    >>> print(Student('wenzexu'))
    Student object (name: wenzexu)
    ```

???+ tip "Tip"

    单独定义一个`__str__()`方法后, 直接输出变量输出的还是一串不好看的字符串, 因为直接显示变量调用的是`__repr__()`方法. 两者的区别是`__str__()`方法返回的是用户看到的字符串, 而`__repr__()`方法返回的是开发者看到的字符串. 
    
    ???+ example "例子"

        ```
        >>> s = Student('wenzexu')
        >>> s
        <__main__.Student object at 0x109afb310>
        ```

     这可以通过定义`__repr__`方法解决. 

     ???+ example "例子"

        定义类:

        ```py
        class Student(object):
            def __init__(self, name):
                self.name = name
            def __str__(self):
                return 'Student object (name=%s)' % self.name
            __repr__ = __str__
        ```

        打印类:

        ```
        >>> print(Student('wenzexu'))
        Student object (name: wenzexu) 
        >>> s = Student('wenzexu')
        >>> s
        Student object (name: wenzexu) 
        ```

### `__iter__()` {#iter}

`__iter__()`特殊方法可以把一个实例变为[迭代器](/foundation/container/#迭代器). 该方法返回一个[迭代器](/foundation/container/#迭代器), 然后for循环就会不断调用该迭代对象的`__next__()`方法拿到下一个值, 知道遇到`StopIteration`错误退出循环.

???+ example "例子"

    定义类: 

    ```py
    class Fib(object):
        def __init__(self):
            self.a, self.b = 0, 1

        def __iter__(self):
            return self

        def __next__(self):
            self.a, self.b = self.b, self.a + self.b
            if self.a > 100000:
                raise StopIteration()
            return self.a
    ```

    把一个实例作用于for循环:

    ```
    >>> for n in Fib():
    ...     print(n)
    ...
    1
    1
    2
    3
    5
    ...
    46368
    75025
    ```

### `__getitem__()`

`__getitem__()`特殊方法可以把一个实例变为类似于列表一样的可迭代对象, 可以通过下标的方式取值. 

???+ example "例子"

    定义类:

    ```py
    class Fib(object):
        def __getitem__(self, n):
            a, b = 1, 1
            for x in range(n):
                a, b = b, a + b
            return a
    ```

    用下标访问:

    ```
    >>> f = Fib()
    >>> f[0]
    1
    >>> f[1]
    1
    >>> f[2]
    2
    >>> f[3]
    3
    >>> f[10]
    89
    >>> f[100]
    573147844013817084101
    ```

???+ warning "注意"

    上述的例子无法处理切片的问题, 因为`__getitem__()`方法默认为传入的参数是一个int, 所以要做一些改进: 

    ???+ example "例子"

        定义类:

        ```py
        class Fib(object):
            def __getitem__(self, n):
                if isinstance(n, int):
                    a, b = 1, 1
                    for x in range(n):
                        a, b = b, a + b
                    return a
                if isinstance(n, slice):
                    start = n.start
                    stop = n.stop
                    if start is None:
                        start = 0
                    a, b = 1, 1
                    L = []
                    for x in range(stop):
                        if x >= start:
                            L.append(a)
                        a, b = b, a + b
                    return L
        ```

        测试切片:

        ```
        >>> f = Fib()
        >>> f[0:5]
        [1, 1, 2, 3, 5]
        >>> f[:10]
        [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
        ```

        这个例子没有对负数/步长做处理, 所以正确实现一个`__getitem__()`方法还是有很多工作要做的. 

???+ tip "Tip"

    如果把对象看成是字典, 我们可以定义`__getitem__()`方法接受键值. 

???+ note "笔记"

    除了`__getitem__()`方法, 还有`__setitem__()`和`__delitem__()`方法, 分别对对象元素进行赋值和删除操作. 总之, 通过上述方法, 我们可以自己定义和Python自带的列表, 元组, 字典类似的类. 

### `__getattr__()`

`__getattr__()`特殊方法可以解决访问不存在的属性或者不存在的方法的时候报错的问题. 

???+ example "例子"

    定义类: 

    ```py
    class Student(object):
    
        def __init__(self):
            self.name = 'Michael'
    ```

    调用不存在的属性: 

    ```
    >>> s = Student()
    >>> print(s.name)
    Michael
    >>> print(s.score)
    Traceback (most recent call last):
    ...
    AttributeError: 'Student' object has no attribute 'score'
    ```

    添加`__getattr__()`方法: 

    ```py
    class Student(object):

        def __init__(self):
            self.name = 'Michael'

        def __getattr__(self, attr):
            if attr=='score':
                return 99
    ```

    调用不存在的属性: 

    ```
    >>> s = Student()
    >>> s.name
    'Michael'
    >>> s.score
    99
    ```

    ???+ note "笔记"

        - 只有在没有找到属性的情况下, 才会调用`__getattr__()`
        - 在定义了`__getattr__()`之后, 默认返回的是`None`

            ???+ example "例子"

                ```
                >>> s = Student()
                >>> s.name
                'Michael'
                >>> s.abc
                None
                ```

            如果要让实例只响应特定的属性, 可以按照规定, 抛出`AttributeError`的错误:

            ???+ example "例子"

                定义类: 

                ```py
                class Student(object):

                    def __getattr__(self, attr):
                        if attr=='age':
                            return lambda: 25
                        raise AttributeError('\'Student\' object has no attribute \'%s\'' % attr)
                ```

                调用不存在的属性: 

                ```
                >>> s = Student()
                >>> s.name
                'Michael'
                >>> s.abc
                Traceback (most recent call last):
                    ...
                AttributeError: 'Student' object has no attribute 'abc'
                ```

### `__call__()`

`__call__()`特殊方法可以在调用实例本身的时候, 执行`__call__()`方法. 

???+ example "例子"

    定义类: 

    ```py
    class Student(object):
        def __init__(self, name):
            self.name = name

        def __call__(self):
            print('My name is %s.' % self.name)
    ```

    调用自己:

    ```
    >>> s = Student('wenzexu')
    >>> s()
    My name is wenzexu.
    ```

???+ tip "Tip"

    `__call__()`方法中还可以定义参数, 所以对实例的调用和对普通函数的调用差不多了. 可以完全把对象看为函数, 把函数看为对象. 函数的实例在运行期间动态的创建出来, 所以函数和对象之间的界限会变得很模糊. 

???+ tip "Tip"

    可以通过`callable`方法判断一个对象是否是"可调用"对象. 

    ???+ example "例子"

        ```
        >>> callable(Student())
        True
        >>> callable(max)
        True
        >>> callable([1, 2, 3])
        False
        >>> callable(None)
        False
        >>> callable('str')
        False
        ```

### 上下文管理器 {#上下文管理器}

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

## 枚举类

使用枚举类(`Enum`)可以定义常量. 

???+ example "例子"

    输入:

    ```py
    from enum import Enum

    class HttpStatus(Enum):
        OK = (200, "OK")
        NOT_FOUND = (404, "Not Found")
        INTERNAL_SERVER_ERROR = (500, "Internal Server Error")

        def __init__(self, code, message):
            self.code = code
            self.message = message

    print(HttpStatus.OK)
    print(HttpStatus.NOT_FOUND)
    print(HttpStatus.INTERNAL_SERVER_ERROR)

    print(HttpStatus.OK.code)
    print(HttpStatus.OK.message)
    ```

    输出:

    ```
    HttpStatus.OK
    HttpStatus.NOT_FOUND
    HttpStatus.INTERNAL_SERVER_ERROR
    200
    OK
    ```

    ???+ note "笔记"

        `Enum`类在背后做了特殊处理, 使得这些类属性最后是一个该类的对象. 具体过程为根据该类属性的初始值调用`__init__`方法创建对象, 并赋值给该类属性.

## 类的创建

### `type()` {#type}

在Python中, 类是在运行时创建的, 不管是已经写死的类也好还是用`type()`动态创建的类也罢. 这里, 我们着重看动态创建的类, 因为它比较灵活, 可以在运行的时候根据用户的输入, 程序的状态确定一个类的结构. `type()`函数和[反射](https://www.tutorialspoint.com/python/python_reflection.htm)密切相关. 

???+ example "例子"

    ```
    >>> name = input("请输入你的名字: ")
    >>> 请输入你的名字: wenzexu
    >>> def fn(self):
    ...     print('hello, %s.' % name) # 根据用户的输入, 确定这个类的方法
    ...
    >>> Hello = type('Hello', (object,), dict(hello=fn))
    >>> h = Hello()
    >>> h.hello()
    Hello, wenzexu.
    >>> print(type(Hello))
    print(type(Hello))
    >>> print(type(h))
    <class '__main__.Hello'>
    ```

    ???+ note "笔记"

        要创建一个类, `type()`函数需要3个参数: 

        1. 类的名称
        2. 继承的父类的集合, 注意如果只有一个父类, 需要加逗号
        3. 类的方法名称和函数的绑定

???+ tip "Tip"

    - 正常情况下, 写死的类如`class [class] ...`其实也是通过`type()`创建的, 区别就是一开始结构已经写死了, 但是后续其结构是否发生变化取决于是否使用反射修改了结构. 
    - 类在Python中可以被赋值给其他变量名, 变量名只是对类的引用. 

        ???+ example "例子"

            ```py
            class Point:
                def __init__(self, x, y):
                    self.x = x
                    self.y = y

                def __repr__(self):
                    return f"Point({self.x}, {self.y})"

            # 将类 Point 赋值给变量 a
            a = Point

            # 使用变量 a 创建 Point 类的实例
            p = a(3, 4)
            print(p)  # 输出: Point(3, 4)
            ```

### 元类

元类, metaclass, 可以用于创建类. 流程为: 先定义元类, 再创建类, 最后创建实例.

???+ example "例子"

    === "例子1"

        定义元类: 

        ```py
        class ListMetaclass(type):
            def __new__(cls, name, bases, attrs):
                attrs['add'] = lambda self, value: self.append(value)
                return type.__new__(cls, name, bases, attrs)
        ```

        ???+ warning "注意"

            元类是类的模版, 所以必须继承`type`类型.

        使用元类创建类:

        ```py
        class MyList(list, metaclass=ListMetaclass):
            pass
        ```

        在传入关键字参数`metaclass`的时候, 它指示解释器在创建`MyList`的时候, 要通过`ListMetaclass.__new__()`来创建. 

        ???+ note "笔记"

            `__new__()`方法接收到的参数依次是: 

            1. 当前准备创建的类的对象
            2. 类的名字
            3. 类继承的父类集合
            4. 类的方法集合

        测试`MyList`是否可以调用`add()`方法: 

        ```
        >>> L = MyList()
        >>> L.add(1)
        >>> L
        [1]
        ```

        使用元类修改类定义比较变态, 在大多数情况下, 直接在`MyList`的类定义上加入`add()`方法比这简单多了, 但是也有少数情况下, 需要用到元类, 比如ORM, 见例子2.

    === "例子2"

        施工中...

        

[^1]: 访问限制. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017496679217440
[^2]: 使用__slots__. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017501655757856
[^3]: 多重继承. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017502939956896
[^4]: 使用@property. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017502538658208
[^5]: 定制类. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017590712115904
[^6]: 使用枚举类. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017595944503424
[^7]: 使用元类. (n.d.). Retrieved June 14, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017592449371072