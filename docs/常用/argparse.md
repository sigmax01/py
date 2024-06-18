---
title: argparse
icon: material/console
comments: true
---

在命令行程序中, 经常需要获取命令行参数. Python内置的`sys.argv`保存了完整的参数列表.

???+ example "例子"

    定义: 

    ```py
    import sys

    print(sys.argv)
    ```

    执行: 

    ```
    $ python main.py hello? who are you ?
    ['main.py', 'hello?', 'who', 'are', 'you', '?']
    ```

    这种方式能够应付简单的参数, 但稍微复杂一点, 比如说用`-d`复制目录, 使用`--filename *.py`过滤文件名等, 解析起来就非常麻烦. 

`argparse`模块可以用于简化参数解析, 定义好各个参数类型后, 执行命令行指令, 它能直接返回有效的参数.

???+ example "例子"

