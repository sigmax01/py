---
title: 文件
icon: material/file-tree
comments: false
---

## 文件读写

### `open()`

要以读文件的模式打开一个文件对象, 使用内置的`open()`函数. 

???+ example "例子"

    ```
    >>> f = open('/Users/wenzexu/test.txt', 'r')
    ```

    标识符`r`表示读. 

    ???+ note "笔记"
        
        如果文件不存在, 函数会抛出一个IOError的错误.

#### 参数

##### 模式

默认模式为`r`.

1. 文本模式

    - `r`: 读取模式, 文件用于读取, 如果文件不存在, 会引发`FileNotFoundError`, 自动[解码](/foundation/encoding)
    - `w`: 写入模式, 如果文件存在会被清空, 如果文件不存在则创建新的文件, 自动[编码](/foundation/encoding)
    - `a`: 追加模式, 如果文件存在, 写入内容追加到文件末尾, 如果文件不存在则穿件新的文件, 自动[编码](/foundation/encoding)
    - `x`: 独占创建模式: 创建新文件用于写入, 如果文件已经存在则引发`FileExistsError`, 自动[编码](/foundation/encoding)

2. 二进制模式

    - `rb`: 读取二进制文件, 没有[解码](/foundation/encoding)的过程 
    - `wb`: 写入二进制文件, 没有[编码](/foundation/encoding)的过程 
    - `ab`: 追加二进制文件, 没有[编码](/foundation/encoding)的过程 
    - `xb`: 独占创建二进制文件, 没有[编码](/foundation/encoding)的过程 

3. 文本模式附加

    - `r+`: 读取和写入模式, 文件必须存在, 自动[解码](/foundation/encoding)
    - `w+`: 写入和读取模式, 会清空文件内容, 如果文件不存在则创建新文件, 自动[编码](/foundation/encoding)
    - `a+`: 追加和读取模式, 如果文件不存在则创建新文件, 自动[编码](/foundation/encoding)
    - `x+`: 独占创建和读取模式, 如果文件已存在则引发`FileExistError`, 自动[编码](/foundation/encoding)

4. 组合模式

    - `rb+`或`r+b`：读取和写入二进制文件, 没有[解码](/foundation/encoding)的过程
    - `wb+`或`w+b`：写入和读取二进制文件, 没有[编码](/foundation/encoding)的过程
    - `ab+`或`a+b`：追加和读取二进制文件, 没有[编码](/foundation/encoding)的过程
    - `xb+`或`x+b`：独占创建和读取二进制文件, 没有[编码](/foundation/encoding)的过程

##### 编码

默认编码为utf-8, 可以通过`enconding`参数设置编码.

???+ example "例子"

    ```
    >>> f = open('/Users/wenzexu/gbk.txt', 'r', encoding='gbk')
    ```

##### 错误

`errors`参数用于设置错误处理策略.

???+ example "例子"

    ```
    >>> f = open('/Users/wenzexu/gbk.txt', 'r', encoding='gbk', errors='ignore')
    ```

### `read()`/`readline()`/`readlines()`

如果文件打开成功, 并设置读权限, 可以用

- `read()`方法一次性读取文件的全部内容, 可以接受一个整数$n$表示读取$n$字节的内容
- `readline()`读取一行内容
- `readlines()`读取所有内容并返回列表

???+ example "例子"

    ```
    >>> f.read()
    Hello, world!
    ```

???+ warning "注意"

    `read()`和`readlines()`是一次性读取所有内容, 如果文件太大, 可能会导致内存爆炸. 可以反复调用`read([size])`, 每次最多读取`size`个字节的内容. 

### `print()`

如果文件打开成功, 并设置写权限, 可以用`print()`来写入数据.

???+ example "例子"

    ```
    with open('output.txt', 'w') as f:
        print('Hello, World!', file=f)
    ```

???+ tip "Tip"

    注意, 使用`print`在末尾会自动添加新行, 但是`write`不会在末尾自动添加新行.

### `write()`

如果文件打开成功, 并设置写权限, 可以用`write()`来写入数据.

???+ example "例子"

    ```
    >>> f.write('Hello, world!')
    ```

???+ warning "注意"

    - 务必使用[`close()`](#close)关闭文件. 因为当我们写文件的时候, 操作系统往往不会把数据立刻写入磁盘, 而是先在内存中缓存, 然后空闲的时候写入. 只有调用了`close()`, 操作系统才能保证把没有写入的数据全部写入磁盘. 为了避免没有调用`close()`, 推荐使用`with`语句. 
    - `write()`函数不会自动在字符串的最后添加一个换行符
    - `write()`最后返回的是写入的字符的数量

### `writelines()`

如果文件打开成功, 并设置写权限, 可以用`writelines()`来写入列表中的所有句子.

???+ example "例子"

    ```
    >>> f.writelines(["Coffee\n", 5])
    ```

???+ warning "注意"

    `writelines()`函数不会自动在字符串的最后添加一个换行符


### `close()` {#close}

文件使用完成后必须关闭, 否则会占用资源, 使用`close()`释放资源.

???+ example "例子"

    ```py
    try:
        f = open('/path/to/file', 'r')
        print(f.read())
    finally:
        if f:
            f.close()
    ```

    这可以保证无论出错与否都能正确地关闭文件.

???+ tip "Tip"

    - 如果有多个`close()`, 只有第一个会生效
    - `with`语句可以自动帮助我们调用`close()`方法. 

        ???+ example "例子"

            ```py
            with open('[path]', 'r') as f:
                print(f.read())
            ```

## `os`模块

如果我们要操作文件、目录, 可以在bash下使用`dir, cp`等命令, 这些命令实际上是调用了操作系统提供的接口. Python内置的`os`模也可以直接调用操作系统的接口实现相同的功能. 

### 获取操作系统信息

要获取操作系统信息, 可以查看`os.name`属性获取操作系统类型或者调用`os.uname()`函数获取详细信息.

???+ example "例子"

    ```
    >>> import os
    >>> os.name
    'posix'
    >>> os.uname()
    posix.uname_result(sysname='Darwin', nodename='wenzexus-Mac-mini.local', release='23.5.0', version='Darwin Kernel Version 23.5.0: Wed May  1 20:19:05 PDT 2024; root:xnu-10063.121.3~5/RELEASE_ARM64_T8112', machine='arm64')
    ```

    ???+ tip "Tip"

        - `uname()`函数在Windows上不提供
        - `name`属性的结果如果是`posix`, 说明系统是Linux, Unix或MacOS; 如果是`nt`, 就是Windows

### 环境变量

#### 读取环境变量

读取环境变量, 可以用到`os.environ`对象的`get()`方法: 

???+ example "例子"

    ```
    >>> import os
    >>> os.environ.get('PATH')
    '/home/wenzexu/.local/bin:/home/wenzexu/bin:/opt/orbstack-guest/bin-hiprio:/opt/orbstack-guest/data/bin/cmdlinks:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/opt/orbstack-guest/bin' 
    ```

???+ tip "Tip"

    可以通过对象名打印对象:

    ???+ example "例子"

        ```
        >>> os.environ
        environ({'VERSIONER_PYTHON_PREFER_32_BIT': 'no', 'TERM_PROGRAM_VERSION': '326', 'LOGNAME': 'michael', 'USER': 'michael', 'PATH': '/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin:/opt/X11/bin:/usr/local/mysql/bin', ...})
        ```

#### 写入环境变量

`os.environ`是一个字典样式的对象, 允许通过键值对的方式操作环境变量. 

???+ example "例子"

    ```
    >>> import os
    >>> os.environ['[ENV]'] = '[ENV_VALUE]'
    ```

### 操作文件和目录

#### 查看当前目录绝对路径

使用`os.path.abspath('[path]')`函数.

???+ example "例子"

    ```
    >>> os.path.abspath('.')
    '/Users/wenzexu'
    ```

#### 拼接路径

使用`os.path.join('[path1]', '[path2]')`函数.

???+ example "例子"

    ```
    >>> os.path.join('/Users/wenzexu', 'testdir')
    '/Users/wenzexu/testdir'
    ```

    ???+ tip "Tip"

        将两个路径合成一个时, 不要直接拼接字符串, 而要通过`os.path.join()`函数, 这样可以正确处理不同操作系统的路径分隔符.

#### 拆分路径

使用`os.path.split('[path]')`函数.

???+ example "例子"

    ```
    >>> os.path.split('/Users/wenzexu/testdir/file.txt')
    ('/Users/wenzexu/testdir', 'file.txt')
    ```

    ???+ tip "Tip"

        将一个路径拆分时, 不要直接拆字符串, 而要通过`os.path.split()`函数, 这样可以正确处理不同操作系统的路径分隔符.

#### 获取文件扩展名

使用`os.path.splittext('[path]')`函数.

???+ example "例子"

    === "例子1"

        ```
        >>> os.path.splittext('/path/to/file.txt')
        ('/path/to/file', '.txt')
        ```
    
    === "例子2"

        ```
        >>> [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']
        ['apis.py', 'config.py', 'models.py', 'pymonitor.py', 'test_db.py', 'urls.py', 'wsgiapp.py']
        ```

#### 查看目录下的所有文件

使用`os.listdir('[path]')`函数.

???+ example "例子"

    ```
    >>> os.listdir('.')
    ['.bash_logout', '.bash_profile', '.bashrc', '.ssh', '.config', '.gitconfig', 'rhce', '.python_history', '.cache', '.bash_history']
    ```

#### 判断传入文件是否为目录

使用`os.path.isdir('[文件]')`函数.

???+ example "例子"

    ```
    >>> [x for x in os.listdir('.') if os.path.isdir(x)]
    ['.lein', '.local', '.m2', '.npm', '.ssh', '.Trash', '.vim', 'Applications', 'Desktop', ...]
    ```

#### 创建/删除目录

使用`os.mkdir('[path]')`创建目录, 使用`os.rmdir([path])`删除目录.

???+ example "例子"

    ```
    >>> os.mkdir('/Users/wenzexu/testdir')
    >>> os.rmdir('/Users/wenzexu/testdir')
    ```

#### 重命名文件

使用`os.rename('[原名]', '[新名]')`.

???+ example "例子"

    ```
    >>> os.rename('test.txt', 'text.py')
    ```

#### 删除文件

使用`os.remove('[文件]')`.

???+ example "例子"

    ```
    >>> os.remove('test.py')
    ```

## `shutil`模块

`shutil`模块提供了许多`os`模块没有提供的函数, 比如说复制文件, 可以看作是对`os`模块的补充.

### 操作文件和目录

#### 复制文件

##### `copyfile()`

`shutil.copyfile('[src]', '[dst]')`函数仅复制文件的内容, 不复制文件元数据.

???+ example "例子"

    ```py
    import shutil
    src = 'source.txt'
    dst = 'destination.txt'
    shutil.copyfile(src, dst)
    ```

##### `copy()`

`shutil.copy('[src]', '[dst]')`函数不仅复制文件内容, 还复制权限, 但不包括其他文件元数据.

???+ example "例子"

    ```py
    import shutil
    src = 'source.txt'
    dst = 'destination.txt'
    shutil.copy(src, dst)
    ``` 

##### `copy2()`

`shutil.copy2('[src]', '[dst]')`函数不仅复制文件内容和权限, 还复制其他所有的文件元数据.

???+ example "例子"

    ```py
    import shutil
    src = 'source.txt'
    dst = 'destination.txt'
    shutil.copy2(src, dst)
    ``` 

## 序列化

程序运行的过程中, 所有的变量都存储在内存中, 一旦程序结束, 所占用的内存就会被操作系统回收. 为了能够持久化数据, 应该把数据放到磁盘中. 这种把变量从内存中变成可存储或者传输的过程称为序列化, 序列化后的内容可以写入磁盘, 也可以通过网络传输到别的机器上. 反过来, 从序列化之后的内容读取放到内存的过程称为反序列化.  

???+ note "笔记"

    按照这个定义, 我们使用`write()`函数把内容放到磁盘文件中的过程称为序列化; 使用`read()`函数把内容从磁盘读取到内存中的过程称为反序列化. 但是, 对于那些复杂的数据类型, 比如说[对象](#序列化object), 我们需要定义它们以怎样的形式写到磁盘中, 或者从磁盘中读取, 以及如何相互转换的问题, 这就非常困难. 这个时候就要用到[`pickle`模块](#序列化对象为二进制io)或者更好的[`json`模块](#序列化对象为JSONio).

### 序列化对象 {#序列化对象}

#### 序列化对象为二进制文件 {#序列化对象为二进制文件}

首先来看怎么把字典序列化为二进制文件, 我们可以通过`pickle.dumps([dict], [file])`序列化字典为二进制文件, 并且通过`pickle.loads([file])`反序列化文件为字典.

???+ example "例子"

    === "序列化"

        ```
        >>> import pickle
        >>> d = dict(name="wenzexu", age=18, score=88)
        >>> f = open('dump.txt', 'wb')
        >>> pickle.dump(d, f)
        >>> f.close()
        ```

        这个时候`dump.txt`文件里面就是一堆乱七八糟的内容. 这就是序列化后的对象的信息
    
    === "反序列化"

        ```
        >>> f = open('dump.txt', 'rb')
        >>> d = pickle.load(f)
        >>> f.close()
        >>> d
        {'age': 18, 'score': 88, 'name': 'wenzexu'}
        ```

        ???+ warning "注意"

            - 这个变量和原来的变量完全没有关系, 只是内容相同而已.
            - 不同版本的`pickle`可能不兼容, 所以只用`pickle`模块保存那些不重要的数据, 更好的方式是序列化为[JSON](#序列化对象为JSONio), XML等格式化文件, 而不是二进制内容.  

关于`pickle`模块序列化普通对象为二进制文件, 可以参考下面的[小节](#序列化对象为JSONio), 需要定义转化方法来完成普通对象和字典的相互转化.

#### 序列化对象为JSON文件 {#序列化对象为JSON文件}

要在不同的编程语言之间传递对象, 就必须把对象序列化为格式化文件, 如XML. 但更好的方法是序列化为JSON文件, 因为各个语言对JSON文件的支持度都很好, 能够很好的反序列化JSON文件. JSON还比XML更快, 可以直接在Web页面读取, 非常方便.

首先来看怎么把字典序列化为二进制文件, 我们可以通过`json.dumps([dict], [file])`序列化字典为JSON文件, 并且通过`json.loads([file])`反序列化JSON文件为字典.

???+ tip "Tip"

    JSON和Python内置的数据类型如下: 

    |JSON类型|Python类型|
    |-|-|
    |{}|dict|
    |[]|list|
    |"string"|str|
    |1234.56|int或float|
    |true/false|True/False|
    |null|None|

???+ example "例子"

    === "序列化"

        ```
        >>> import json
        >>> d = dict(name='wenzexu', age=20, score=88)
        >>> json.dumps(d)
        '{"age": 20, "score": 88, "name": "wenzexu"}'
        ```

    === "反序列化"

        ```
        >>> json_str = '{"age": 20, "score": 88, "name": "wenzexu"}'
        >>> json.loads(json_str)
        {'age': 20, 'score': 88, 'name': 'wenzexu'}
        ```

所以, 如果我们要序列化一个普通的对象, 而不是字典呢. 我们需要把普通的对象转化为字典, 然后把字典序列化. 同样的, 在反序列化的时候, 应该先反序列化为字典, 然后把字典转化为普通对象, 我们需要定义转化方法. 原因是`json`模块只支持将字典转化为JSON对象, 而不是随便一个普通对象都可以转化为JSON对象(参间上一张表格).

???+ example "例子"

    === "序列化"

        定义类+定义转化函数:

        ```py
        import json

        class Student(object):
            def __init__(self, name, age, score):
                self.name = name
                self.age = age
                self.score = score

        s = Student('wenzexu', 20, 88)

        # 将普通对象转化为字典
        def student2dict(std):
            return {
                'name': std.name,
                'age': std.age,
                'score': std.score
            }
        ```

        测试序列化: 

        ```
        >>> print(json.jumps(s, default=student2dict))
        {"age": 20, "name": "wenzexu", "score": 88}
        ```

        ???+ tip "Tip"

            有一种更加简便的方法定义转化函数, 那就是用实例的`__dict__`属性, 它就是一个字典, 用来存储实例变量, 所以我们只需要将`default`参数设置为一个返回对象`__dict__`属性的[Lambda函数](/foundation/function/#Lambdafunction)就可以了.

            ???+ example "例子"

                ```
                >>> print(json.dumps(s, default=lambda obj: obj.__dict__))
                ```

            使用这种方法, 我们可以将任意的对象转化为字典然后序列化, 而不需要用到写死的转化函数.

    === "反序列化"

        定义反转化函数: 

        ```py
        def dict2student(d):
            return Student(d['name'], d['age'], d['score'])
        ```

        测试反序列化:

        ```
        >>> json_str = '{"age": 20, "score": 88, "name": "wenzexu"}'
        >>> print(json.loads(json_str, object_hook=dict2student))
        <__main__.Student object at 0x10cd3c190>
        ```

## StringIO和BytesIO {#StringIO和BytesIO}

`StringIO`和`BytesIO`分别用于在内存中读写字符串和二进制数据, 它们提供了与文件对象类似的接口, 但是其数据是放在内存中的, 并不是放在磁盘文件中的. 这使其在特定情况下比较有用, 比如需要类似文件操作的方法, 但是不希望创建磁盘文件. 

???+ example "例子"

    === "`StringIO`例子"

        ```
        >>> from io import StringIO
        >>> f = StringIO()
        >>> f.write('hello')
        5
        >>> f.write(' ')
        1
        >>> f.write('world!')
        6
        >>> print(f.getvalue())
        hello world!
        >>> s = StringIO('Hello!\nHi!\nGoodbye!')
        >>> while True:
        ...     l = s.readline()
        ...     if l == '':
        ...         break
        ...     print(s.strip())
        ...
        Hello!
        Hi!
        Goodbye!
        ```

    === "`ByteIO`例子"

        ```
        >>> from io import BytesIO
        >>> f = BytesIO()
        >>> f.write('中文'.encode('utf-8'))
        6
        >>> print(f.getvalue())
        b'\xe4\xb8\xad\xe6\x96\x87'
        >>> s = ByteIO(b'\xe4\xb8\xad\xe6\x96\x87')
        >>> s.read()
        b'\xe4\xb8\xad\xe6\x96\x87'
        ```
    
[^1]: 文件读写. (n.d.). Retrieved June 15, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017607179232640
[^2]: 操作文件和目录—廖雪峰的官方网站. (n.d.). Retrieved June 15, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017623135437088
[^3]: 序列化. (n.d.). Retrieved June 15, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017624706151424
[^4]: StringIO和BytesIO - 廖雪峰的官方网站. (n.d.). Retrieved June 15, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017609424203904