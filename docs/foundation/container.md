---
title: 容器
icon: material/inbox-outline
comments: false
---

## 命令一览

=== "列表"

    - `[list][[index]]`: 返回索引号为`[index]`的位置的元素
    - `[list][index1:index2]`: 返回一个切片
    - `[list].count([element])`: 统计某元素在列表中的数量
    - `len([list])`: 返回列表的长度
    - `[list].append([element])`: 追加元素到列表末尾
    - `[list].extend([element])`: 追加可迭代对象到列表末尾
    - `[list].insert([index], [element])`: 在索引号为`[index]`的位置插入元素
    - `[list].reverse()`: 反转列表元素的顺序
    - `[list].sort()`: 列表原地排序
    - `sort([list])`: 列表排序后返回新的列表
    - `[list].pop([index])`: 删除索引号为`[index]`的位置的元素
        - `[list].pop()`: 删除末尾元素
    - `del [list][[index]]`: 删除索引号为`[index]`的位置的元素
    - `[list].remove([element])`: 删除元素在列表中的第一个匹配项
    - `[list].clear()`: 清空列表内容

    ???+ warning "注意"

        `[list].append([collection])`和`[list].extend([collection])`的结果不同, `extend`会将`[collection]`中的内容迭代地添加到`[list]`中, 而`append`会将`[collection]`整一个作为整体放进`[list]`中.

        ??? example "例子"

            ```
            l1 = [1, 2, 3]
            l2 = [4, 5, 6]
            l1.append(l2)
            l1 # [1, 2, 3, [4, 5, 6]]
            l2.extend{l2}
            l1 # [1, 2, 3, [4, 5, 6], 4, 5, 6]
            ```


=== "字典"

    - `[dict][[key]]`: 设定一个键值对
    - `[dict].get([key], [default])`: 获取一个值, 如果没有获取到的话, 返回默认值
    - `[dict].pop([key])`: 删除一个键值对
    - `[dict].keys()`: 返回所有的键组成的列表
    - `list([dict])`: 返回所有的键组成的列表
    - `[dict].values()`: 返回所有的值组成的列表
    - `[dict].items()`: 返回所有的键值对组成的列表(键值对用元组包裹)

=== "集合"

    - `[set].add([key])`: 添加元素到集合中
    - `[set].remove([key])`: 删除元素

## 容器

### 列表

列表是一种有序的集合, 用`[]`表示.

### 元组

元素是一种有序的集合, 但是经过初始化之后无法修改, 用`()`表示. 

???+ warning "注意"

    1. 当要定义只有一个元素的元组的时候, 应该用`([element],)`, 即用逗号来消除歧义.
    2. "可变"的元组: 如果在元组的内部包含了可变对象, 如列表, 那么列表中的元素是可以被修改的. 而元组中的某个元素指向这个列表的事实不会改变. 

### 字典

字典是一种无序的键值对的集合, 用`{}`表示. 

???+ tip "Tip"

    - 可以通过`in`来判断键是否存在, 或者通过`get()`方法, 如果不存在会返回`None`; 如果存在, 直接返回值. `get()`方法的第二个位置参数是默认值, 即如果不存在, 返回的是默认值, 默认是`None`
    - 只有不可变的对象, immutable对象才可以做键, 如`"COMP9001", 2, ("INFO", 1110), True, 12.88`这些都是合法的键; 但是`[12, 2], {"orange": 2, "pineapple": 5}`这些都是非法的键

???+ warning "注意"

    字典的键必须是不可变对象, 不能是可变对象比如说列表. 如果对象是可变的, 那可能相同对象计算出来的值就不同, 会导致字典内部的结构混乱. 

### 集合

集合是一种无序的键的集合(即没有值), 且键不能重复, 用`set()`表示.

???+ warning "注意"

    集合的键必须是不可变对象, 不能是可变对象比如说列表. 如果对象是可变的, 那可能相同对象计算出来的值就不同, 会导致集合内部的结构混乱. 

## 迭代

如果给定一个可迭代对象, 我们可以通过for循环来遍历这个可迭代对象, 这种遍历称为迭代. 

在Python中, 迭代是通过`for ... in`来完成的. 

???+ example "例子"

    === "字典"

        ```
        >>> d = {'a': 1, 'b': 2, 'c': 3}
        >>> for key in d:
        ...     print(key)
        ...
        a
        c
        b
        ```

        ???+ warning "注意"

            由于字典的存储方式不是按照列表那样顺序排列, 所以, 迭代出的结果的顺序可能很不一样. 

        ???+ tip "Tip"
            
            默认情况下, 字典迭代的是键, 如果要迭代值, 可以用`for value in [dict].values()`, 如果要同时迭代键和值, 可以用`for k, v in [dict].items()`.
    
    === "列表"

        ```
        >>> l = {1, 2, 4, 3}
        >>> for element in l:
        ...     print(element)
        ...
        1
        2
        4
        3
        ```

        ???+ tip "Tip"

            可以通过`enumerate`函数将列表转化为索引-元素对, 这样就可以在for循环中同时迭代索引和元素本身. 

            ???+ example "例子"

                ```
                >>> for i, value in enumerate(['A', 'B', 'C']):
                ...     print(i, value)
                ...
                0 A
                1 B
                2 C
                ```

我们在使用for循环的时候, 只要作用于一个可迭代对象, for循环就可以正常运行. 

???+ tip "Tip"

    可以通过`collections.abc`模块的`Iterable`类型判断对象是否可以迭代: 

    ???+ example "例子"

        ```
        >>> from collections.abc import Iterable
        >>> isinstance('abc', Iterable)
        True
        >>> isinstance([1, 2, 3], Iterable)
        True
        >>> isinstance(123, Iterable)
        False
        ```

## 列表生成式 {#列表生成式}

列表生成式, List Comprehensions, 是Python内置的创建列表的强大功能. 

???+ example "例子"

    === "例子1"

        ```
        >>> [x * x for x in range(1, 11)]
        [1, 4, 9, 16, 25, 36, 49, 81, 100]
        ```
    
    === "例子2"

        ```
        >>> [x for x in range(1, 11) if x % 2 == 0]
        [2, 4, 6, 8, 10]
        >>> [x if x % 2 == 0 else -x for x in range(1, 11)]
        [-1, 2, -3, 4, -5, 6, -7, 8, -9, 10]
        ```

        ???+ note "笔记"

            1. `for`前面的部分是一个表达式, 它必须根据`x`计算出一个结果, 必须加`else`, 否则某些情况下无法返回结果.
            2. `for`后面的部分是一个筛选条件, 不能带`else`, 否则不符合筛选的定义.
    
    === "例子3"

        ```
        >>> L = ['Hello', 'World', 'IBM', 'Apple']
        >>> [s.lower() for s in L]
        ['hello', 'world', 'ibm', 'apple']
        ```

    === "例子4"

        ```
        >>> [m + n for m in 'ABC' for n in 'XYZ']
        ['AX', 'AY', 'AZ', 'BX', 'BY', 'BZ', 'CX', 'CY', 'CZ']
        ```

    === "例子5"

        ```
        >>> import os
        >>> [d for d in os.listdir('.')]
        ['.emacs.d', '.ssh', '.Trash', 'Adlm', 'Applications', 'Desktop', 'Documents', 'Downloads', 'Library', 'Movies', 'Music', 'Pictures', 'Public', 'VirtualBox VMs', 'Workspace', 'XCode']
        ```

## 生成器 {#生成器}

### 为什么需要生成器

通过列表生成式, 我们可以简单地创建一个列表. 但是, 如果列表容量很大, 如100万个元素的列表, 会浪费很大的存储空间. 

所以, 如果列表元素可以在循环的过程中不断算出后面的元素, 那么就不必创造出完整的列表, 节省大量空间. 在Python中, 这种边循环边计算的机制, 就叫做生成器, 也叫做generator.

### 创建生成器

- 和创建列表生成式的方法类似, 不过用的是`()`.

    ???+ note "笔记"

        直接查看创建好的生成器, 会发现它是一个生成器对象, 而不是一个列表.

        ???+ example "例子"

            ```
            >>> g = (x * x for x in range(10))
            >>> g
            <generator object <genexpr> at 0x1022ef630>
            ```

- 在函数内使用`yield`关键字, 把普通函数变为生成器函数

    ???+ example "例子"

        ```
        def odd():
            print('step 1')
            yield 1
            print('step 2')
            yield 3
            print('step 3')
            yield 5
        ```

    ???+ note "笔记"

        生成器函数的执行流程和普通函数的执行流程不一样. 普通函数是顺序执行, 遇到`return`或者最后一行就返回. 但是生成器函数, 在每次调用`next()`的时候执行, 遇到`yield`语句执行并中断, 再次执行时从上次返回的`yield`语句的下一句开始执行. 

        ???+ example "例子"

            ```
            >>> o = odd()
            >>> next(o)
            step 1
            1
            >>> next(o)
            step 2
            3
            >>> next(o)
            step 3
            5
            >>> next(o)
            Traceback (most recent call last):
            File "<stdin>", line 1, in <module>
            StopIteration
            ```

            可以看到, 在每一次调用`next()`的过程中, 遇到`yield`执行并中断, 再次执行时从上次返回的`yield`语句的下一句开始执行. 
        
    ???+ warning "注意"

        调用生成器函数会创建一个生成器对象, 多次调用生成器函数会创建多个相互独立的生成器对象. 

        ???+ example "例子"

            ```
            >>> next(odd())
            step 1
            1
            >>> next(odd())
            step 1
            1
            >>> next(odd())
            step 1
            1
            ```

### 如何使用生成器

- 通过`next()`函数使用

    ???+ example "例子"

        ```
        >>> g = (x * x for x in range(10)) 
        >>> next(g)
        0
        >>> next(g)
        1
        >>> next(g)
        4
        >>> next(g)
        9
        >>> next(g)
        16
        >>> next(g)
        25
        >>> next(g)
        36
        >>> next(g)
        49
        >>> next(g)
        64
        >>> next(g)
        81
        >>> next(g)
        Traceback (most recent call last):
        File "<stdin>", line 1, in <module>
        StopIteration
        ```

- 通过for循环: 原理和一直调用`next()`差不多, 不过不用担心溢出.

## 迭代器 {#迭代器}

实现了[`__iter__`](/foundation/object/#iter)和`__next__`方法的对象称为迭代器.

### 迭代器和可迭代对象的区别 {#迭代器和可迭代对象的区别}

可以直接作用于for循环的数据类型有: 

- 集合数据类型: 如列表, 元组, 字典, 集合, 字符串等
- 生成器产生的对象

这些可以直接作用于for循环的对象称为可迭代对象, Iterable.

而生成器产生的对象不但可以作用于for循环, 还可以被`next()`函数不断调用并返回下一个值, 知道最后抛出`StopIteration`错误表示溢出. 

???+ tip "Tip"

    可以通过`collections.abc`模块的`Iterator`类型判断对象是否为迭代器:

    ???+ example "例子"

        ```
        >>> from collections.abc import Iterator
        >>> isinstance((x for x in range(10)), Iterator)
        True
        >>> isinstance([], Iterator)
        False
        >>> isinstance({}, Iterator)
        False
        >>> isinstance('abc', Iterator)
        False
        ```

也就是说, 生成器对象都是迭代器, 但不是所有的迭代器都是生成器对象(可以通过[定制类](/foundation/object/#定制类)实现相同的效果). 列表, 字典, 字符串虽然是可迭代对象, 但不是迭代器. 

???+ tip "Tip"

    可迭代对象可以通过`iter()`函数转化为迭代器

    ???+ example "例子"

        ```
        >>> isinstance(iter([]), Iterator)
        True
        >>> isinstance(iter('abc'), Iterator)
        True
        ```

???+ note "笔记"

    为什么列表, 字典, 字符串等数据类型不是迭代器?

    因为迭代器表示的是一个数据流, 我们无法提前知道序列的长度, 只能不断通过`next()`函数实现按需计算下一个数据, 即迭代器的计算是"惰性"的, 只有在需要返回下一个数据的时候才会计算.

    迭代器甚至可以表示一个无限大的数据流, 例如全体自然数. 使用列表是无法存储全体自然数的.

[^1]: 使用list和tuple. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017092876846880
[^2]: 使用dict和set. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017104324028448
[^3]: Python中列表的常用操作. (n.d.). 知乎专栏. Retrieved June 13, 2024, from https://zhuanlan.zhihu.com/p/639394226
[^4]: 切片. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017269965565856
[^5]: 迭代. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017316949097888
[^6]: 列表生成式. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017317609699776
[^7]: 生成器. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017318207388128
[^8]: 迭代器. (n.d.). Retrieved June 13, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017323698112640