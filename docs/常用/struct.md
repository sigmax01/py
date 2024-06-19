---
title: struct
icon: material/numeric-10-box-multiple
comments: true
---

`struct`模块用于打包二进制数据, 能够控制包的长度.

主要的功能有: 

- 打包: 由`pack([fmt], [v1], [v2], ...)`函数实现, 将二进制数据打包, 返回一个二进制数据
- 解包: 由`unpack([fmt], [bit_string])`函数实现, 将二进制数据解包, 返回一个元组
- 计算包大小: 由`calsize([fmt])`函数实现, 计算按照格式`[fmt]`打包之后的结果字节数量

## 打包定长结构

???+ example "例子"

    定义: 

    ```py
    import struct

    a = struct.pack("2I3sI", 12, 34, "abc".encode("utf-8"), 56)
    b = struct.unpack("2I3sI", a)

    print(a)
    print(b)
    ```

    执行: 

    ```
    $ python main.py
    b'\x0c\x00\x00\x00"\x00\x00\x00abc\x008\x00\x00\x00'
    (12, 34, b'abc', 56)
    ```

    上面的代码将两个整数12和3, 一个字符串"abc"和一个整数56一起打包成为一个字节字符流, 然后再解包. 其中打包格式中明确指出了打包的长度: "2I"表明起始是两个unsigned int, "3s"表明长度为4的字符串, 最后一个"I"表示最后紧跟一个unsigned int.

    我们可以调用`calcsize()`来计算`2I3sI`这个模式的字节数:

    ```
    print(struct.calcsize("2I3sI")) # 输出 16
    ```

    为什么是16个字节而不是15个字节: 在struct的打包过程中, 解释器为了优化执行的速度, 进行了字节对齐. 由于默认unsigned int型占用四个字节, 因此要在字符串的位置进行4字节对齐, 因此即使是3个字符的字符串也要占用4个字节.

## 打包不定长结构

???+ example "例子"

    ```
    s = bytes(s, 'utf-8')    # Or other appropriate encoding
    struct.pack("I%ds" % (len(s),), len(s), s)
    int_size = struct.calcsize("I")
    (i,), data = struct.unpack("I", data[:int_size]), data[int_size:]
    data_content = data[i:]
    ```

[^1]: Python 中 struct 模块的用法—Kaiyuan’s Blog | May the force be with me. (n.d.). Retrieved June 19, 2024, from http://kaiyuan.me/2015/12/25/python-struct/