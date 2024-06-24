---
title: IO
icon: material/table-network
comments: true
---

???+ info "信息"

    - 默认省略导入`import numpy as np`.
    - 默认省略导入`from io import StringIO`: [`np.genfromtxt()`函数](#genfromtxt函数)

根据文件的不同, 可以将用于IO的文件分为二进制文件和文本文件, 关于它们的区别, 见[这里](/基础/编码#文本文件和二进制文件).

## 二进制文件

在[数组构建](/NumPy/数组构建)章节中, 我们介绍了简单的读写HDF5二进制文件的[方式](/NumPy/数组构建/#读取二进制文件). 

其实, NumPy还有一个原生的二进制文件格式: npy格式. 常用于npy文件的IO函数有:

- `np.load()`函数和`np.save()`函数: 读写文件数组数据
- `np.savez()`函数: 将多个数组写入文件

### `np.save()`函数

`np.save()`函数将数组保存到以`.npy`为扩展名的文件中.

```
np.save("[file]", [arr], allow_pickle=[True/False], fix_imports=[True/False])
```

???+ example "例子"

    定义:

    ```py
    a = np.array([1, 2, 3, 4, 5])
    np.save('outfile.npy', a)
    ```

    执行之后产生了一个二进制文件`outfile.npy`.

参数说明:

- `[file]`: 要保存的文件, 扩展名为`.npy`

    ???+ tip "Tip"

        若文件路径末尾没有加扩展名`.npy`, 解释器会自动帮我们加上.

- `[arr]`: 要保存的数组
- `allowpickle=[True/False]`: `pickle`模块的作用见[这里](/基础/文件/#序列化对象为二进制文件). 若为`True`, 则允许保存含有对象的数组, `pickle`模块会在保存和读取之前, 对数组里面的对象进行序列化和反序列化

    ???+ example "例子"

        定义:

        ```py
        arr = np.array([{'a': 1, 'b': 2}, {'c': 3, 'd': 4}], dtype=object)
        np.save('data_with_objects.npy', arr, allow_pickle=True)
        load_arr = np.load('data_with_objects.npy', allow_pickle=True)
        print(load_arr)
        ```

        执行:

        ```
        $ python main.py
        [{'a': 1, 'b': 2} {'c': 3, 'd': 4}]
        ```

- `fix_imports`: 可选, 为了方便Python2中读取Python3保存的数据

### `np.load()`函数

`np.load()`函数用于从以`.npy`或`.npz`为扩展名的文件中读取数组.

```
np.load("[file]")
```

???+ example "例子"

    定义: 

    ```
    x = np.load('outfile.npy')
    print(x)
    ```

    执行:

    ```
    $ python main.py
    [1 2 3 4 5]
    ```

参数说明:

- `[file]`: 要读取的文件, 可以是`.npy`或者`.npz`

### `np.savez()`函数

`np.savez()`函数将多个数组保存到以`.npz`为扩展名的文件中.

```
np.savez("[file]", [*args], [**kwds])
```

???+ example "例子"

    定义:

    ```py
    a = np.array([[1, 2, 3], [4, 5, 6]])
    b = np.arange(0, 1.0, 0.1)
    c = np.sin(b)

    np.savez("arrays.npz", a, b, sin_array=c)
    r = np.load("arrays.npz")

    print(r.files) # 查看各个数组名称
    print(r["arr_0"])
    print(r["arr_1"])
    print(r["sin_array"])
    ```

    执行:

    ```
    $ python main.py
    ['sin_array', 'arr_0', 'arr_1']
    [[1 2 3]
     [4 5 6]]
    [0. 0.1 0.2 0.3 0.4 0.5 0.6 0.7 0.8 0.9]
    [0. 0.09983342 0.19866933 0.29552021 0.38941834 0.47942554 0.56464247 0.64421769 0.71735609 0.78332691]
    ```

参数说明:

- `[file]`: 要保存的文件, 扩展名为`.npz`

    ???+ tip "Tip"

        若文件路径末尾没有加扩展名`.npz`, 解释器会自动帮我们加上.

- `[*args]`: 要保存的数组, 使用[可变参数](/基础/函数/#可变参数)传入, 数组会自动起名为`arr_0, arr_1, ...`

- `[**kwds]`: 要保存的数组, 使用[关键字参数](/基础/函数/#关键字参数)传入

## 文本文件

在[数组构建](/NumPy/数组构建)章节中, 我们介绍了简单的读写csv文本文件的[方式](/NumPy/数组构建/#读取文本文件). 

我们也可以自定义文本文件的结构, 如分隔符等.

### `np.savetxt()`函数

`np.savetxt()`函数以简单的文本文件形式存储数据. 

```
np.savetxt("[file]", [arr], fmt="[format]", delimiter="[delimiter]")
```

???+ example "例子"

    定义:

    ```py
    a = np.array([[1, 2, 3], [4, 5, 6]])
    np.savetxt("output.txt", a, fmt="%d", delimiter=",")
    ```

    `output.txt`文件内容:

    ```
    1,2,3
    4,5,6
    ```

参数说明:

- `[file]`: 要保存的文件
- `[arr]`: 要保存的数组
- `fmt="[format]"`: 数组的每个元素的存储格式
- `delimiter="[delimiter]"`: 指定数组中每个元素之间的分隔符

### `np.loadtxt()`函数 {#loadtxt函数}

`np.loadtxt()`函数用于读取文本文件中的数组数据.

```
np.loadtxt("[file]", delimiter="[delimiter]")
```

???+ example "例子"

    定义:

    ```py
    x = np.loadtxt("output.txt", delimiter=",")
    print(x)
    ```

    执行:

    ```
    $ python main.py
    [[1. 2. 3.]
     [4. 5. 6.]]
    ```

参数说明:

- `[file]`: 要读取的文件
- `delimiter="[delimiter]"`: 指定数组中每个元素之间的分隔符

### `np.genfromtxt()`函数 {#genfromtxt函数}

`np.genfromtxt()`函数用于从表格数据创建数组. 简而言之, `genfromtxt`运行两个主循环. 第一个循环将文件的每一行转换为字符串序列, 第二个循环将每个字符串转换为适当的熟悉类型. 这种机制虽然比单循环慢, 但灵活性更高. 特别是`np.genfromtxt()`能够考虑缺失数据, 而其他更快, 更简单的函数如`np.loadtxt()`不能.

#### 定义输入

`np.genfromtxt()`唯一的强制参数是数据源. 它可以是字符串, 字符串列表, 返回字符串的生成器或具有`read`方法的打开的文件类对象, 例如文件或`io.StringIO`对象. 

- 单个字符串: 假定它为本地文件的文件名
- 字符串列表或返回字符串的生成器: 每个字符串都将视为文件中的一行
- 远程文件URL: 文件将自动下载到当前目录并打开

#### 参数信息

##### 将行拆分为列

- `delimiter`参数

    一旦定义了文件并将其打开进行读取, `np.genfromtxt()`就会将每行拆分为一系列字符串, 空行或者注释行将被跳过. `delimiter`关键字参数定义如何进行拆分. 
    
    ???+ tip "Tip"
    
        默认情况下, `delimiter`默认值为`None`. 这意味着每一行按照空白进行拆分, 连续的空白将被视为单个空白.

        ???+ example "例子"

            ```
            [1]: data = u"1 2 3\n4 5       6"
            [2]: np.genfromtxt(StringIO(data), delimiter="")
            array([[1., 2., 3.],
                   [4., 5., 6.]])
            ```

            可以看到, 连续的空白按照单个空白处理, 所以没有报错. 

            但是, 如果`delimiter`设置为单个空白, 会报错.

            ```
            [1]: data = u"1 2 3\n4 5       6"
            [2]: np.genfromtxt(StringIO(data), delimiter=" ")
            ---------------------------------------------------------------------------
            ValueError                                Traceback (most recent call last)

            Cell In[33], line 1
            ----> 1 np.genfromtxt(StringIO(data), delimiter=" ")

            File ~/miniconda3/envs/test/lib/python3.12/site-packages/numpy/lib/npyio.py:2312, in genfromtxt(fname, dtype, comments, delimiter, skip_header, skip_footer, converters, missing_values, filling_values, usecols, names, excludelist, deletechars, replace_space, autostrip, case_sensitive, defaultfmt, unpack, usemask, loose, invalid_raise, max_rows, encoding, ndmin, like)
            2310 # Raise an exception ?
            2311 if invalid_raise:
            -> 2312     raise ValueError(errmsg)
            2313 # Issue a warning ?
            2314 else:
            2315     warnings.warn(errmsg, ConversionWarning, stacklevel=2)

            ValueError: Some errors were detected !
                Line #2 (got 9 columns instead of 3)
            ```

[^1]: 使用 genfromtxt 导入数据—NumPy v1.26 手册—NumPy 中文. (n.d.). Retrieved June 24, 2024, from https://numpy.com.cn/doc/stable/user/basics.io.genfromtxt.html
[^2]: NumPy IO | 菜鸟教程. (n.d.). Retrieved June 24, 2024, from https://www.runoob.com/numpy/numpy-io.html