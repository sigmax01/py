---
title: struct
icon: material/numeric-10-box-multiple
comments: true
---

`struct`模块用于打包二进制数据

主要的功能有: 

- 打包: 由`pack([fmt], [v1], [v2], ...)`函数实现, 将Python数据打包换成二进制数据, 返回一个二进制字符串
- 解包: 由`unpack([fmt], [bit_string])`函数实现, 将二进制数据解包转换为Python数据, 返回一个元组
- 计算包大小: 由`calsize([fmt])`函数实现, 计算按照格式`[fmt]`打包之后的结果字节数量

## 打包定长结构

???+ example "例子"

    定义: 

    ```py
    import struct

    a = struct.pack("2I3sI", 12, 34, "abc".encode(), 56) # 或者 a = struct.pack("2I3sI", 12, 34, b"abc", 56)
    b = struct.unpack("2I3sI", a)

    print(b)
    ```

    执行: 

    ```
    $ python main.py

    ```

[^1]: Python 中 struct 模块的用法—Kaiyuan’s Blog | May the force be with me. (n.d.). Retrieved June 19, 2024, from http://kaiyuan.me/2015/12/25/python-struct/