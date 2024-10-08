---
title: 其他
icon: material/baseball-outline
comments: false
---

## 端序

### 大端模式

大端模式, 38b14a7655726af5c50df0f845021c13. 由于在网络传输中一般使用的是大端模式, 所以也叫做网络字节序.

在大端模式中, 将高位字节放在地位地址, 低位字节放在高位地址.

???+ example "例子"

    数值`0x12345678`, 其中`0x12`这一端是高位字节, `0x78`这一端是低位字节. 在内存中的存储顺序是:
    
    ![](https://img.ricolxwz.io/38b14a7655726af5c50df0f845021c13.webp)
    
### 小端模式

小端模式, Little-Endian. 由于大多数计算机内部处理使用的是小端模式, 所以也叫做主机序.

在小端模式中, 将高位字节放在高位地址, 低位字节放在低位地址.

???+ example "例子"

    数值`0x12345678`, 其中`0x12`这一端是高位字节, `0x78`这一端是低位字节. 在内存中的存储顺序是:
    
    ![](https://img.ricolxwz.io/0814295ce29b920f73e0d1fdbd3327b1.webp)

### 为何有大小端

对于早期的计算机, 先处理低位字节的效率比较高, 因为计算机都是从低位开始的, 所以大多数计算机内部处理使用的是小端模式. 但是计算机发展到现在, 计算机的处理器相较于以前已经进步很多了, 先处理高位字节还是低位字节的影响已经可以忽略, 但是为了向后兼容, 保留了大小端模式.

## 执行原理

JIT编译的工作原理:

1. 初始解释: 当程序启动的时候, JIT编译器通常会首先解释执行代码, 这使得程序能够快速启动而无需等待整个程序被编译
2. 热点检测: JIT编译器会监控哪些部分的代码被频繁执行, 即"热点代码", 对于这些热点代码, JIT编译器会认为通过编译优化可以提高整体性能
3. 即时编译: 一旦检测到热点代码, JIT编译器会将这些代码编译成本地机器码, 这样它们可以直接在硬件上执行, 而不需要再经过解释. 这种解释通常发生在代码第一次被执行或者多次被调用后
4. 优化: JIT编译器可以在编译过程中应用多种优化技术, 因为它能够基于运行时的实际数据和行为进行优化. 这种动态优化可能包括内联, 循环展开, 常量传播等
5. 缓存和重用: 编译后的机器码通常会被缓存, 以便后续调用中直接使用, 提高执行效率

常见的JIT型语言有Java, JavaScript, .NET.

与之相对的是AOT编译, 在程序运行前, 所有代码都被编译成机器码. 这种方法可以提高启动速度和整体性能, 但是缺乏JIT运行时优化的能力, 常见的AOT型语言有Go, C, C++, C++, Rust

Python即不属于AOT也不属于JIT. 它的执行方式可以概括为"字节码解释型". 它与Java类似, 也会生成一个后缀为`.pyc`的字节码文件, 生成的字节码通常会保存在`__pycache__`目录中, 以便下次在执行的时候直接使用, 避免重复编译. 编译生成的字节码由Python虚拟机, PVM解释执行, PVM是Python解释器的一部分, 它逐行读取字节码, 并转换为底层的机器指令立即执行, 但是它不会像JIT那样检测热点代码, 然后将其直接编译成本地机器码, 也不会有多种优化技术. Java的字节码在起始阶段被JVM加载的时候, 也是逐行解释执行的, 但是JVM实现了JIT, 即它内置了一个热点代码检测机制, 它会监视字节码的执行情况, 识别哪些代码片段, 即热点代码被频繁执行. 一旦JVM识别出热点代码, 就会将这些字节码编译为本地机器码, 编译后的机器码被缓存起来, 供后续调用时直接使用, 而不需要通过解释器逐行解释执行. 这会大大提高执行效率.

有一些Python的解释器带有JIT特性, 如PyPy. 它与标准的CPython不同, 它内置了一个强大的JIT编译器, 能够检测热点代码, 将其编译为机器码, 这种即时编译显著提高了代码的执行效率.  PyPy尽可能保持和CPython的兼容性, 支持大多数Python标准库和第三方库. 因此, 许多使用CPython的程序可以直接在PyPy上运行, 而无须修改代码. 然而, 由于实现细节上的差异, 某些与CPython紧密集成的扩展模块, 特别是那些依赖于CPython的C API的模块在PyPy上可能需要重新调整或者重新编译.

## 杂项

### `print`函数

#### 参数说明

- `end`: 表示打印的内容以什么结尾, 默认参数为`\n`, 可以设置为其他值

### 操作符的应用

- 数字 + 数字 = 数字
- 数字 + 文字 = 报错, `TypeError`
- 文字 + 文字 = 文字

### 类型转换

-  `int()`
    - 无法转换非数字类型的字符串, 报`ValueError`错误
    - 无法转换浮点数类型的字符串, 报`ValueError`错误

### 浮点数精度问题

???+ example "例子"

    定义:

    ```py
    a = 0.1
    b = 0.2
    c = a + b
    print(c)
    print(c == 0.3)
    ```

    执行:

    ```
    $ python test.py
    0.30000000000000004
    False
    ```

### 多行字符串

可以使用一对`'''`或者`"""`表示多行字符串.

???+ example "例子"

    === "例子1"

        定义:

        ```py
        description = '''
        This is a
        multiline string
        '''

        print(description)
        ```

        输出:

        ```
        $ python test.py

        This is a
        multiline string

        ```

    === "例子2"

        定义:

        ```py
        description = '''This is a
        multiline string'''

        print(description)
        ```

        输出:

        ```
        $ python test.py
        This is a
        multiline string
        ```

???+ tip "Tip"

    ```py
    """
    test
    """
    ```

    这个多行字符串会被转换为`\ntest\n`.
    

### `input`函数

`input`函数返回的是字符串, 而不是数字. 可以提供一个字符串作为提示. 

### 格式化输出

#### `format`函数

可以使用`format`函数进行格式化输出.

???+ example "例子"

    ```py
    name = "wenzexu"
    age = 23
    message = "Hi {}, you are {} years old.".format(name, age)
    print(message)
    ```

???+ note "笔记"

    注意, 下列操作也可以用`f`字符串完成.

    ???+ example "例子"

        ```py
        percent = 12.3456789
        megabytes = 4100

        message = f"Progress: {percent:.2f}%, {megabytes:06d} MB"
        print(message) # Output: Progress: 12.35%, 004100 MB
        ```

    - 精确小数点位数

        ???+ example "例子"

            ```py
            pi = 3.141592653589793
            formatted_pi = '{:.2f}'.format(pi)
            print(formatted_pi)  # Output: '3.14'
            ```

    - 使用空格填充数字

        ???+ example "例子"

            ```py
            number = 42
            formatted_number = '{:4d}'.format(number)
            print(formatted_number)  # Output: '  42'
            ```

    - 使用0填充数字

        ???+ example "例子"

            ```py
            number = 42
            formatted_number = '{:04d}'.format(number)
            print(formatted_number)  # Output: '0042'
            ```

#### `f`字符串

`f`字符串, formatted literual strings. 是一种吸纳该队来说更加快捷, 更加清晰的字符串格式化输出方法. 花括号里面可以包含Python的表达式, `f`用于表示当前的字符串是`f`字符串.

???+ example "例子"

    === "例子1"

        ```py
        name = "wenzexu"
        age = 23
        text_1 = f"Hi {name}, you are {age}."
        text_2 = f"In 10 years, you will be {age+10}!"
        print(text_1)
        print(text_2)
        ```

    === "例子2"

        ```py
        people = 'Students'
        units = 'INFO1110/INFO1910/COMP9001'
        activity = 'Lab'

        string = f'''Hello, {people}!
        How is {units} going? :)
        We hope you are enjoying the {activity} so far!'''

        print(string)
        print('Here for visualisation purposes.')
        ```

    === "例子3"

        ```py
        people = 'Students'
        units = 'INFO1110/INFO1910/COMP9001'
        activity = 'Lab'

        string = f'''
        Hello, {people}!
        How is {units} going? :)
        We hope you are enjoying the {activity} so far!
        '''

        print(string)
        print('Here for visualisation purposes.')
        ```

### 输入验证

#### `isnumeric`函数

`isnumeric`函数能够验证一个字符串仅包含数字字符. 

???+ example "例子"

    ```py
    num_str = "12345"
    print(num_str.isnumeric()) # Output: true

    num_str = "12345abc"
    print(num_str.isnumeric()) # Output: False

    num_str = "12345.2"
    print(num_str.isnumeric()) # Output: False
    ```

### 布尔类型

- 字符串
    - 空字符串转化为布尔类型为`False`
    - 非空字符串转化为布尔类型为`True`
- 数字
    - 0转化为布尔类型为`False`
    - 非0转化为布尔类型为`True`
- 容器
    - 空容器转化为布尔类型为`False`
    - 非空容器转化为布尔类型为`True`

### 可变类型和不可变类型

- 不可变类型, immutable data types, 在创建之后是不能修改的, 如字符串, 元组, 数字
- 可变类型, mutable data types, 在创建之后是可以修改的, 如列表, 字典

### `split`和`strip`函数

`split`函数用于将字符串按照一定的规则分离, 如果没有声明separator, 则默认为空格. `strip`函数用于将字符串头部和尾部的字符移除, 可以声明要移除的字符, 如果没有声明的话, 默认是空格.

???+ example "例子"

    输入:

    ```py
    original_str = "....,....,/Hello, Hello, Hello!  Welcome to INFO1110!@@,.@..,"
    strip_str = original_str.strip(",.")
    print(strip_str)
    ```

    输出:

    ```
    /Hello, Hello, Hello!  Welcome to INFO1110!@@,.@
    ```