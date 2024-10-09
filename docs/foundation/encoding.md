---
title: 编码
icon: material/file-arrow-up-down-outline
comments: false
---

计算机唯一能存储的东西是比特. 如果你需要存一点东西到电脑里面, 必须先编码, 将其转换为字节.

???+ example "例子"

    MP3, WAV, PNG, JPEG, ASCII和UTF-8就是编码的例子.

    - 如果想储存音乐, 需要用MP3, WAV等对其进行编码
    - 如果想储存图片, 需要用PNG, JPEG等对其进行编码
    - 如果想要储存文字, 需要用ASCII, UTF-8对其进行编码

???+ warning "注意"

    字符串和比特字符串: 

    - 比特字符串: 这是一串比特, 是不可读的, 所有的字符串都必须转换为比特字符串才能被存储在电脑里, 在Python中, 比特字符串由`b` + 比特字符串的ASCII形式表示. 比特字符串可以被解码回一个字符串, 如果你知道编码的时候用的是哪种编码, 比如[UTF-8](#UTF-8), [ASCII](#ASCII)等
    - 字符串: 这是一串字符, 是可读的, 字符串不能直接存储在电脑里, 必须先被编码, 转换为比特字符串, 转换的方式有很多种, 比如[UTF-8](#UTF-8), [ASCII](#ASCII)等.

## 常见编码手段

### UTF-8 {#UTF-8}

UTF-8是一种编码的手段, 目前大部分的文件的二进制数据都是由UTF-8编码得到的. 它是一种针对文本数据的一种字符编码方式, 用于将字符转为二进制数据以及将二进制数据转换为字符.

???+ example "例子"

    - 我用UTF-8编码编写了一个文件, 在打开编辑器的时候, 可以发现选择UTF-8, 这是选择用UTF-8解码, 文件的二进制数据经过UTF-8解码之后才能被操作系统正确显示.
    - 我用UTF-8编码生成二进制文件放在服务器上, 然后访问网页, 从服务器传过来的是二进制流, 这些二进制流经过浏览器的UTF-8解码器解码后才能正确呈现在网页上.

#### 编码和解码 {#UTF-8编码和解码}

???+ example "例子"

    === "utf-8编码"

        定义:

        ```py
        string_data = "hello 你好"

        utf8_encoded = string_data.encode('utf-8')
        print(utf8_encoded)
        ```

        输出: 

        ```
        $ python main.py
        b'hello \xe4\xbd\xa0\xe5\xa5\xbd'
        ```

    === "utf-8解码"

        定义:

        ```py
        utf8_encoded = b'hello \xe4\xbd\xa0\xe5\xa5\xbd'

        decoded_string = utf8_encoded.decode('utf-8')
        print(decoded_string)
        ```

        执行:

        ```
        $ python main.py
        hello 你好
        ```

???+ tip "Tip"

    `decode()`, `encode()`函数使用的默认就是utf-8, 不用特别标注.

### ASCII {#ASCII}

ASCII是一种编码的手段. 它是一种针对文本数据的一种字符编码方式, 用于将字符转为二进制数据以及将二进制数据转换为字符.

#### 编码和解码

???+ example "例子"

    === "ascii编码"

        定义:

        ```py
        string_data = "abc"

        byte_data = string_data.encode('ascii')
        print(f"Byte data: {byte_data}")
        ```

        输出: 

        ```
        $ python main.py
        Byte data: b'abc'
        ```

    === "ascii解码"

        定义:

        ```py
        byte_data =  b'abc'

        decoded_string = byte_data.decode('ascii')
        print(f"Decoded string: {decoded_string}") 
        ```

        执行:

        ```
        $ python main.py
        Decoded string: abc
        ```

### Base64

参见[base64编码](/basic-package/base64)

???+ warning "注意"

    [base64编码](/basic-package/base64)编码的是二进制数据, 而不是字符串. 它是一种针对二进制数据的一种字符编码方式, 用于将原始二进制数据转为base64编码的二进制数据以及将base64编码的二进制数据转换为原始二进制数据.

## 文本文件和二进制文件 {#文本文件和二进制文件}

计算机的存储在物理上是二进制的, 所以文本文件和二进制文件的区别并不是物理上的, 这两种文件都是以二进制形式存储的, 它们的区别在逻辑上, 在编码层次上有差异. 

???+ example "例子"

    文本工具打开一个文本文件, 首先读取文件物理上对应的二进制流, 如果编码的时候用的是ASCII编码, 那么接下来, 文本工具会8个bit8个bit地解码然后显示. 如果文本工具打开的是二进制文件, 就会出现乱码, 这是因为无法对齐进行解码. 

    文本文件是基于字符编码的, 二进制文件是基于值编码的. 文本文件, 比如ASCII编码后的文件是8个bit对应一个字符, UNICODE编码后的文件是16个bit对应一个字符. 二进制文件, 比如说BMP编码之后的文件, 其头部为固定长度的文件头信息, 前2字节用来记录文件为BMP格式, 接下来的8个字节用来记录文件长度, 再接下来的4个字节用来记录BMP文件头的长度, 可以看出来, 其编码是基于值的.

[^1]: Zenadix. (2015, July 9). Answer to “What is the difference between a string and a byte string?” Stack Overflow. https://stackoverflow.com/a/31322359/19538012
[^2]: 文本文件与二进制文件的编码差别-阿里云开发者社区. (n.d.). Retrieved June 20, 2024, from https://developer.aliyun.com/article/4031
[^3]: 小编. (2023, February 16). 文本文件和二进制文件的区别. Worktile社区. https://worktile.com/kb/p/38500