---
title: hashlib
icon: material/pound
comments: true
---

## 目的

`hashlib`模块提供了常见的摘要算法. 摘要算法就是通过摘要函数对任意长度的数据计算出固定长度的摘要, 目的是为了发现原始数据是否被人篡改过.

???+ example "例子"

    写了一篇文章, 内容是一个字符串`"how to use python hashlib - by wenzexu"`, 通过摘要函数计算出这篇文章的摘要是`'2d73d4f15c0db7f5ecb321b6a65e5d6d'`. 如果有人篡改了你的文章, 并发表为`"how to use python hashlib - by michael'`, 那么再次根据这个摘要函数计算摘要时, 结果会和原来的不一样, 那么就发现有人篡改了我的文章.

???+ note "笔记"

    摘要算法是一个单向函数, 计算`f(data)`很容易, 但是从摘要反推数据非常困难. 对原始数据做一个bit的修改, 都会导致计算出的摘要完全不同.

???+ warning "注意"

    - 两个不同的数据通过某个摘要算法得到相同的摘要是有可能的, 只不过这种情况非常非常少见.
    - 摘要函数只能处理二进制数据, 因此如果传入的是普通字符串必须将传入的字符串经过UTF-8编码之后转为二进制数据.

        ???+ example "例子"

            ```py
            # 字符串
            string_data = "hello 你好"

            # UTF-8编码
            utf8_encoded = string_data.encode('utf-8')
            print(utf8_encoded)  # 输出：b'hello \xe4\xbd\xa0\xe5\xa5\xbd'

            # UTF-8解码
            decoded_string = utf8_encoded.decode('utf-8')
            print(decoded_string)  # 输出：hello 你好
            ```

???+ danger "特别注意: UTF-8"

    - UTF-8是一种编码的手段, 目前大部分的文件的二进制数据都是由UTF-8编码得到的, 我们在打开编辑器的时候, 可以发现选择UTF-8, 这是选择用UTF-8解码, 文件的二进制数据经过UTF-8解码之后才能被操作系统正确显示.
    - `b'abc'`和`'abc'`是不一样的, 前面的那个是二进制数据经过ASCII解码之后得到的, 后面的那个是普通的字符串, 它是由UTF-8解码得到的(我们在IDE中配置的就是以UTF-8解码, 所以所有的能看到的文字都是由UTF-8解码得到的), `abc`必须经过UTF-8编码之后才能得到`b'abc'`.

    ???+ example "例子"

        定义:

        ```py
        string_data = b"hello 你好"
        ```

        直接报错, 因为二进制数据中含有中文是无法用ASCII解码的

        ```
        string_data = "hello 你好"
        print(string_data.encode("utf-8"))
        ```

        成功

## 摘要算法

常见的摘要算法有MD5, SHA1等: 

- MD5: 是最常见的摘要算法, 速度很快, 生成结果是固定的128bit/16个字节, 通常用一个32位的16进制字符串表示(每一个16进制的字符可以表示4bit数据)
- SHA1: 生成结果是160bit/20字节, 通常用一个40位的16进制字符串表示(每一个16进制的字符可以表示4bit数据)
- SHA256/SHA512: 比SHA1更加安全, 不过运行比较慢, 生成的结果更长

???+ example "例子"

    === "MD5"

        定义:

        ```py
        import hashlib

        md5 = hashlib.md5()
        md5.update('how to use md5 in python hashlib?'.encode('utf-8'))
        print(md5.hexdigest())
        ```

        执行: 

        ```
        $ python main.py
        d26a53750bc40b38b65a520292f69306
        ```

        ???+ tip "Tip"

            如果数据量很大, 可以分块多次调用`update()`.

            ???+ example "例子"

                定义:

                ```py
                import hashlib

                md5 = hashlib.md5()
                md5.update('how to use md5 in '.encode('utf-8'))
                md5.update('python hashlib?'.encode('utf-8'))
                print(md5.hexdigest())
                ```

                执行: 

                ```
                $ python main.py
                d26a53750bc40b38b65a520292f69306
                ```

                可以发现和上面的结果完全一样.

    === "SHA1"

        定义:

        ```py
        import hashlib

        sha1 = hashlib.sha1()
        sha1.update('how to use sha1 in '.encode('utf-8'))
        sha1.update('python hashlib?'.encode('utf-8'))
        print(sha1.hexdigest())
        ```

        执行: 

        ```
        $ python main.py
        2c76b57293ce30acef38d98f6046927161b46a44
        ```

## 应用

???+ example "例子"

    任何允许用户登录的网站都会存储登录的用户名和口令, 一般这些数据都会被存放到数据库中, 如果是以明文保存口令, 如果数据库泄露, 那么所有用户的口令都会落到黑客手里. 此外, 运维人员是可以访问数据库的, 也就是能获取到现有用户的口令.

    正确的保存口令的方式是不存储用户的明文口令, 而是存储口令的摘要, 比如保存用MD5摘要算法生成的摘要:

    |username|password|
    |-|-|
    |wenzexu|e10adc3949ba59abbe56e057f20f883e|
    |michael|878ef96e86145580c38c87f0410ad153|
    |alice|99b1c2188db85afee403b1536010c2c9|

    用户登录的时候, 首先计算用户登录明文口令的MD5, 然后和数据库存储的MD5对比, 如果一致, 说明口令输入正确. 如果不一致, 口令错误.

[^1]: Hashlib. (n.d.). Retrieved June 19, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017686752491744