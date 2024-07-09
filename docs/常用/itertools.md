---
title: itertools
icon: material/reiterate
comments: false
---

`itertools`模块提供了非常有用的用于操作[迭代器](/基础/容器/#迭代器)的函数.

## "无限"迭代器

### `count()`

`count([step])`会创建一个"无限"迭代器.

???+ example "例子"

    ```
    >>> import itertools
    >>> natuals = itertools.count(1)
    >>> for n in natuals: 
    ...     print(n)
    ...
    1
    2
    3
    ...
    ```

???+ tip "Tip"

    可以通过`takewhile()`函数根据条件判断来截取到一个有限的序列: 

    ???+ example "例子"

        ```
        >>> import itertools
        >>> natuals = itertools.count(1)
        >>> ns = itertools.takewhile(lambda x: x <= 10, natuals)
        >>> list(ns)
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        ```


### `cycle()`

`cycle([iterable])`会把传入的[可迭代对象](/基础/容器/#迭代器和可迭代对象的区别)转为一个迭代器, 并"无限"重复.

???+ example "例子"

    ```
    >>> import itertools
    >>> cs = itertools.cycle('ABC')
    >>> for c in cs:
    ...     print(c)
    ...
    'A'
    'B'
    'C'
    'A'
    'B'
    'C'
    ```

### `repeat()`

`repeat([var], [num])`会把传入的第一个元素无限重复下去, 第二个参数可以限定重复的次数, 默认为"无限".

???+ example "例子"

    ```
    >>> import itertools
    >>> ns = itertools.repeat('A', 3)
    >>> for n in ns:
    ...     print(n)
    ...
    A
    A
    A
    ```

## 串联可迭代对象

`chain([iterable1], [iterable2])`可以把一组[可迭代对象](/基础/容器/#迭代器和可迭代对象的区别)串联起来, 形成一个更大的迭代器:

???+ example "例子"

    ```
    >>> import itertools
    >>> for c in itertools.chain('ABC', 'XYZ'):
    ...     print(c)
    ...
    A
    B
    C
    X
    Y
    Z
    ```

## 返回相邻重复元素

`groupby([iterable])`把[可迭代对象](/基础/容器/#迭代器和可迭代对象的区别)中相邻的重复元素挑出来放在一起.

???+ example "例子"

    ```
    >>> for key, group in itertools.groupby('AAABBBCCAAA'):
    ...     print(key, list(group))
    ...
    A ['A', 'A', 'A']
    B ['B', 'B', 'B']
    C ['C', 'C']
    A ['A', 'A', 'A']
    ```

    ???+ tip "Tip"

        可以自定义重复元素的判断标准.

        ???+ example "例子"

            ```
            >>> for key, group in itertools.groupby('AaaBBbcCAAa', lambda c: c.upper()):
            ...     print(key, list(group))
            ...
            A ['A', 'a', 'a']
            B ['B', 'B', 'b']
            C ['c', 'C']
            A ['A', 'A', 'a']
            ```

            只要是大写相同, 两个元素就被认为是重复元素.

[^1]: Itertools. (n.d.). Retrieved June 19, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017783145987360