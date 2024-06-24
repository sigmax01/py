---
title: IO
icon: material/table-network
comments: true
---

???+ info "信息"

    默认省略导入`import numpy as np`.

根据文件的不同, 可以将用于IO的文件分为二进制文件和文本文件, 关于它们的区别, 见[这里](/基础/编码#文本文件和二进制文件).

## 二进制文件

在[数组构建](/NumPy/数组构建)章节中, 我们介绍了简单的读写HDF5二进制文件的[方式](/NumPy/数组构建/#读取二进制文件). 

其实, NumPy还有一个原生的二进制文件格式: npy格式. 常用于npy文件的IO函数有:

- `np.load()`函数和`np.save()`函数: 读写文件数组数据
- `np.savez()`函数: 将多个数组写入文件

### `np.save()`函数

`np.save()`函数将数组保存到以`.npy`为扩展名的文件中.

```
np.save([file], [arr], allow_pickle=[True/False], fix_imports=[True/False])
```

???+ example "例子"

    定义:

    ```py
    a = np.array([1, 2, 3, 4, 5])
    np.save('outfile.npy', a)
    ```

    执行之后产生了一个二进制文件`outfile.npy`.

#### 参数说明

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

### `np.savez()`函数

`np.savez()`函数将多个数组保存到以`.npz`为扩展名的文件中.

```
np.savez([file], [*args], [**kwds])
```

???+ example "例子"

    定义:

    ```
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

#### 参数说明

- `[file]`: 要保存的文件, 扩展名为`.npz`

    ???+ tip "Tip"

        若文件路径末尾没有加扩展名`.npz`, 解释器会自动帮我们加上.

- `[*args]`: 要保存的数组, 使用[可变参数](/基础/函数/#可变参数)传入, 数组会自动起名为`arr_0, arr_1, ...`

- `[**kwds]`: 要保存的数组, 使用[关键字参数](/基础/函数/#关键字参数)传入

## 文本文件

[^1]: 使用 genfromtxt 导入数据—NumPy v1.26 手册—NumPy 中文. (n.d.). Retrieved June 24, 2024, from https://numpy.com.cn/doc/stable/user/basics.io.genfromtxt.html
[^2]: NumPy IO | 菜鸟教程. (n.d.). Retrieved June 24, 2024, from https://www.runoob.com/numpy/numpy-io.html