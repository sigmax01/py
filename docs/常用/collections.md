---
title: collections
icon: material/set-left-center
comments: false
---

## 命名元组

元组可以表示不变的集合, 为了表示的清晰, 我们可以基于元组类`tuple`创建自己的类, `collections`模块中的`namedtumple`函数内部通过调用[`type()`函数](/基础/对象/#type)可以创造一个`tuple`的子类, 允许我们自定义这个类的名称, 所以被称为命名元组.

???+ example "例子"

    定义: 

    ```py
    from collections import namedtuple

    a = namedtuple('Point', ['x', 'y'])
    p = a(1, 2)
    print(p.x)
    print(p.y)
    print(a)
    print(p)
    ```

    执行: 

    ```
    $ python main.py
    1
    2
    <class '__main__.Point'>
    Point(x=1, y=2)
    ```

## 双向链表

`deque`是`collections`模块中一个子类, 提供了在两端快速插入和删除元素的功能. 其内部实现为一个双向链表, 使得在两端的操作都能在O(1)的时间内完成. 特别适合用于实现队列和栈. 它提供的操作有: 

- `[dequeue_instance].append([value])`: 在右端添加元素
- `[dequeue_instance].appendleft([value])`: 在左端添加元素
- `[var] = [dequeue_instance].pop()`: 移除右端元素, 返回值
- `[var] = [dequeue_instance].popleft()`: 移除左端元素, 返回值
- `[dequue_instance].extend([iterable])`: 在右端扩展[可迭代对象](/基础/容器/#迭代器和可迭代对象的区别)中的所有元素
- `[dequue_instance].extendleft([iterable])`: 在左端扩展[可迭代对象](/基础/容器/#迭代器和可迭代对象的区别)中的所有元素
- `[dequeue_instance].rotate([num])`: 将对象中的元素循环右移`[num]`位

???+ example "例子"

    定义: 

    ```py
    from collections import deque

    q = deque(['a', 'b', 'c'])
    q.append('x')
    q.appendleft('y')
    print(q)
    ```

    执行: 

    ```
    $ python main.py
    deque(['y', 'a', 'b', 'c', 'x'])
    ```

## 字典默认值

使用原生字典的时候, 如果键不存在, 就会抛出`KeyError`. 如果希望键不存在时, 返回一个默认值, 可以使用`collections`模块提供的`defaultdict`类.

???+ example "例子"

    定义:

    ```py
    from collections import defaultdict

    dd = defaultdict(lambda: 'N/A')
    dd['key1'] = 'abc'
    print(dd['key1'])
    print(dd['key2'])
    ```

    执行: 

    ```
    $ python main.py
    abc
    N/A
    ```

???+ warning "注意"

    默认值时调用函数返回的, 函数在创建`defaultdict`对象时作为[高阶函数](/基础/函数/#高阶函数)传入.

## 顺序字典

使用原生字典的时候, 键值对时无序的, 如果要保持键值对插入时候的顺序, 可以使用`collections`模块提供的`OrderedDict`类.

???+ example "例子"

    定义: 

    ```py
    from collections import OrderedDict

    od = OrderedDict([('a', 1), ('b', 2), ('c', 3)])
    print(od)
    ```

    执行: 

    ```
    $ python main.py
    OrderedDict({'a': 1, 'b': 2, 'c': 3})
    ```

## 链式字典

链式字典, ChainMap可以把一组字典串起来组成一个逻辑上的字典. 它本身也是一个字典, 查找的时候, 会按照顺序在内部的字典依次查找. 

???+ example "例子"

    什么时候用链式字典最合适? 应用程序往往需要传入参数, 参数可以通过[命令行传入](/常用/argparse), 可以通过环境变量传入, 还可以有默认参数, 我们可以用ChainMap实现参数的优先级查找, 即先查命令行参数, 如果没有传入, 再查环境变量, 如果没有, 就是用默认参数.

    ```py
    from collections import ChainMap
    import os, argparse

    # 构造缺省参数:
    defaults = {
        'color': 'red',
        'user': 'guest'
    }

    # 构造命令行参数:
    parser = argparse.ArgumentParser()
    parser.add_argument('-u', '--user')
    parser.add_argument('-c', '--color')
    namespace = parser.parse_args()
    command_line_args = { k: v for k, v in vars(namespace).items() if v }

    # 组合成ChainMap:
    combined = ChainMap(command_line_args, os.environ, defaults)

    # 打印参数:
    print('color=%s' % combined['color'])
    print('user=%s' % combined['user'])
    ```

    没有任何参数的时候, 打印出默认参数:

    ```
    $ python main.py
    color=red
    user=guest
    ```

    传入命令行参数时, 优先使用命令行参数, 其次是默认参数: 

    ```
    $ python main.py -u bob
    color=red
    user=bob
    ```

    同时传入命令行参数和环境变量, 优先使用命令行参数, 其次时环境变量, 最后是默认参数: 

    ```
    $ user=admin color=green python main.py -u bob
    color=green
    user=bob
    ```

## 计数器

`collections`模块中的`Counter`类提供了一个简单的计数器. 

???+ example "例子"

    定义: 

    ```py
    from collections import Counter

    c = Counter()
    for ch in 'programming': 
        c[ch] = c[ch] + 1
    print(c)
    c.update('hello')
    print(c)
    ```

    执行: 

    ```
    $ python main.py
    Counter({'r': 2, 'g': 2, 'm': 2, 'p': 1, 'o': 1, 'a': 1, 'i': 1, 'n': 1})
    Counter({'r': 2, 'o': 2, 'g': 2, 'm': 2, 'l': 2, 'p': 1, 'a': 1, 'i': 1, 'n': 1, 'h': 1, 'e': 1})
    ```

   [^1]: Collections. (n.d.). Retrieved June 18, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017681679479008