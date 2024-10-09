---
title: hmac
icon: material/format-header-pound
comments: false
---

通过摘要算法, 可以验证一段数据是否有效. 为了防止黑客通过[彩虹表](https://zh.wikipedia.org/wiki/%E5%BD%A9%E8%99%B9%E8%A1%A8)根据摘要反推原始口令, 在计算摘要的时候, 不能仅仅针对原始输入计算, 需要增加一个[盐, salt](https://zh.wikipedia.org/wiki/%E7%9B%90_(%E5%AF%86%E7%A0%81%E5%AD%A6)), 这个盐会与原始口令结合(通常是将盐放到原始口令的前面或者后面), 然后通过摘要算法计算摘要. 如果这个盐的值是随机的, 那么每次原始口令相同, 但是得到的摘要都是不一样的.

上述的过程可以由HMAC算法, Keyed-Hashing for Message Authentication实现, Python自带的`hmac`模块实现了标准的HAMC算法. 

???+ warning "注意"

    `hmac`模块要求必须传入二进制数据, 因此如果传入的是普通字符串必须将传入的字符串经过[UTF-8编码](/foundation/encoding/#UTF-8编码和解码)或其他编码之后转为比特字符串.

???+ example "例子"

    定义:

    ```py
    import hmac

    string = "hello world"
    message = string.encode("utf-8")
    salt = b"what are you saying"
    h = hmac.new(salt, message, digestmod='MD5')
    print(h.hexdigest())
    ```

    执行:

    ```
    $ python main.py
    260d2130736ba6dfc6be57a5ed46a190
    $ python main.py
    260d2130736ba6dfc6be57a5ed46a190
    $ python main.py
    260d2130736ba6dfc6be57a5ed46a190
    ```

    可以看到, 盐, 原始口令和摘要算法固定的情况下, 得到的摘要其实是一样的. 但是我们要的效果是盐是随机的: 

    ```py
    import os
    import hmac

    string = "hello world"
    message = string.encode("utf-8")
    salt = os.urandom(16) # 生成一个16字节的随机盐
    h = hmac.new(salt, message, digestmod='MD5')
    print(h.hexdigest())
    ```

    执行:

    ```
    $ python main.py
    cec3b25f52b5fe926991cbd42fe8ce6f
    $ python main.py
    0a51d371e57556983d0e8f5a01ed45a8
    $ python main.py
    41057d1b56f0f591ed1a48e86c50c694
    ```

    所以, 服务端想要验证生成的摘要, 就要提前直到盐的值. 一般, 客户端和服务端在通信之前, 会预先共享一个盐, 这个盐在会话开始的时候生成, 并在会话期间用于所有的摘要计算. 盐会通过安全信道(TLS)传递, 保证它的安全. 

[^1]: Hmac. (n.d.). Retrieved June 19, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1183198304823296