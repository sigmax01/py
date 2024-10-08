---
title: 数组构建
icon: material/application-array-outline
comments: false
---

???+ info "信息"

    默认省略导入`import numpy as np`.

NumPy中最重要的概念就是nd数组. nd数组的构建有6种方式: 

1. 从Python数据类型转换而来, 如列表和元祖, 详情见[这里](#转换Pythondatatype)
2. 内建的nd数组创建函数, 如`arange()`, `ones()`, `zeros()`等, 详情见[这里](#内建创建function)
3. 复制, 扩展或者改变现有的nd数组, 详情见[这里](#复制,扩展或者改变现有的nd数组)
4. 从磁盘中读取nd数组, 无论是标准格式还是自定义格式, 详情见[这里](#从磁盘中读取)
5. 从字符串或者缓冲区中读取原始字节创建nd数组
6. 使用特殊函数, 如`random()`

## 创建方法

### 转换Python数据类型 {#转换Python数据类型}

可以通过`np.array()`方法转换Python列表或者元祖为nd数组, 嵌套结构决定了nd数组的维度.

???+ example "例子"

    ```
    >>> a1D = np.array([1, 2, 3, 4])
    >>> a2D = np.array([[1, 2], [3, 4]])
    >>> a3D = np.array([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])
    ```

### 内建创建函数 {#内建创建函数}

NumPy由大约40个内建函数用于创建nd数组, 这些函数大概可以被分为3类:

- 一维数组创建函数
- 二维数组创建函数
- nd数组创建函数

#### 一维数组创建函数

一维数组创建函数如`np.arange()`和`np.linspace()`需要大致上两个输入, `[start]`和`[stop]`.

- `np.arange()`: 创造值逐渐递增的nd数组, 可以自定义步长.
- `np.linspace()`: 创建含有特定个数元素的数组, 元素在`[start]`和`[stop]`之间均匀分布.

???+ warning "注意"

    - `np.arange()`产生的数组不会包含`[stop]`.
    - `np.linspace()`产生的数组会包含`[stop]`.

???+ example "例子"

    === "`np.arange()`"

        ```
        >>> np.arange(10)
        array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
        >>> np.arange(2, 10, dtype=float)
        array([2., 3., 4., 5., 6., 7., 8., 9.])
        >>> np.arange(2, 3, 0.1)
        array([2. , 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9])
        ```

    === "`np.linspace()`"

        ```
        >>> np.linspace(1., 4., 6)
        array([1. ,  1.6,  2.2,  2.8,  3.4,  4. ])
        ```

#### 二维数组创建函数

二维数组创建函数如`np.eye()`, `np.diag()`和`np.vander()`可以用于创建一些特殊结构的矩阵.

- `np.eye()`: 创建一个单位矩阵
- `np.diag()`: 创建一个对角线为给定值的矩阵, 或者返回给定矩阵的对角线
- `np.vander()`: 创建一个范特蒙德矩阵

???+ example "例子"

    === "`np.eye()`"

        ```
        >>> np.eye(3)
        array([[1., 0., 0.],
               [0., 1., 0.],
               [0., 0., 1.]])
        >>> np.eye(3, 5)
        array([[1., 0., 0., 0., 0.],
               [0., 1., 0., 0., 0.],
               [0., 0., 1., 0., 0.]])
        ```

    === "`np.diag()`"

        ```
        >>> np.diag([1, 2, 3])
        array([[1, 0, 0],
               [0, 2, 0],
               [0, 0, 3]])
        >>> np.diag([1, 2, 3], 1)
        array([[0, 1, 0, 0],
               [0, 0, 2, 0],
               [0, 0, 0, 3],
               [0, 0, 0, 0]])
        >>> a = np.array([[1, 2], [3, 4]])
        >>> np.diag(a)
        array([1, 4])
        ```

    === "`np.vander()`"

        ```
        >>> np.vander(np.linspace(0, 2, 5), 2)
        array([[0. , 1. ],
               [0.5, 1. ],
               [1. , 1. ],
               [1.5, 1. ],
               [2. , 1. ]])
        >>> np.vander([1, 2, 3, 4], 2)
        array([[1, 1],
               [2, 1],
               [3, 1],
               [4, 1]])
        >>> np.vander((1, 2, 3, 4), 4)
        array([[ 1,  1,  1,  1],
               [ 8,  4,  2,  1],
               [27,  9,  3,  1],
               [64, 16,  4,  1]])
        ```

#### nd数组创建函数

nd数组创建函数如`np.ones()`, `np.zeros()`和`random`可以用于创建一下特殊结构的矩阵.

- `np.zeros()`: 创建一个零矩阵 
- `np.ones()`: 创建一个一矩阵
- `random()`: 创建一个随机矩阵, 需要配合`default_rng`使用
- `np.indices()`: 创建一个索引矩阵

???+ example "例子"

    ```
    >>> np.indices((3,3))
    array([[[0, 0, 0],
            [1, 1, 1],
            [2, 2, 2]],
           [[0, 1, 2],
            [0, 1, 2],
            [0, 1, 2]]])
    ```

### 操作现有的nd数组 {#复制,扩展或者改变现有的nd数组}

当你已经有一个数组的时候, 你可以复制, 扩展或者改变现有的数组. 

???+ warning "注意"

    当需要将数组或者元素分配给新变量的时候, 必须显式地`np.copy()`数组, 否则该变量只是原始数组的视图. 

    ???+ example "例子"

        ```
        >>> a = np.array([1, 2, 3, 4, 5, 6])
        >>> b = a[:2]
        >>> b += 1
        >>> a
        array([2, 3, 3, 4, 5, 6])
        >>> b
        array([2, 3])
        ```

        可以看到`b`只是一个`a`中一部分的视图, 改变`b`也会改变`a`. 下面是解决方法: 

        ```
        >>> a = np.array([1, 2, 3, 4, 5, 6])
        >>> b = a[:2].copy()
        >>> b += 1
        >>> a
        array([1, 2, 3, 4, 5, 6])
        >>> b
        array([2, 3]) 
        ```

可以使用`np.vstack()`, `np.hstack()`和`np.block()`.

???+ example "例子"

    ```
    >>> A = np.ones((2, 2))
    >>> B = np.eye(2, 2)
    >>> C = np.zeros((2, 2))
    >>> D = np.diag((-3, -4))
    np.block([[A, B], [C, D]])
    array([[ 1.,  1.,  1.,  0.],
           [ 1.,  1.,  0.,  1.],
           [ 0.,  0., -3.,  0.],
           [ 0.,  0.,  0., -4.]])
    ```

### 从磁盘中读取 {#从磁盘中读取}

这是最常见的创建大型数组的情况, 主要分为读取二进制文件和读取文本文件. 文本文件和二进制文件的区别在[这里](/foundation/encoding/#文本文件和二进制io).

更多内容, 请参考[这里](/numpy/io).

#### 读取二进制文件 {#读取二进制文件}

一般常用于数据科学的编码方式有HDF5和FITS, 分别可以用`h5py`和`Astropy`模块将数据编码为二进制文件.

???+ example "例子"

    定义:

    ```py
    import h5py
    import numpy as np

    # 创建并写入HDF5文件
    data_to_write = np.array([1.1, 2.2, 3.3, 4.4])
    with h5py.File('data.h5', 'w') as f:
        f.create_dataset('dataset_name', data=data_to_write)

    # 读取HDF5文件
    with h5py.File('data.h5', 'r') as f:
        data_read = f['dataset_name'][:]

    print(data_read)
    ```

    执行:

    ```
    $ python main.py
    [1.1 2.2 3.3 4.4]
    ```

    ???+ tip "Tip"

        在使用`h5py`读取HDF5编码之后文件的时候, 读取的数据会被直接转换为NumPy数组, 这是因为`h5py`设计的时候就与NumPy深度集成, 自动处理了数据类型转换.

#### 读取文本文件 {#读取文本文件}

一般用的比较多的文本文件是CSV文件, 用的一般是UTF-8编码. 

???+ example "例子"

    `simple.csv`文件:

    ```
    x, y
    0, 0
    1, 1
    2, 4
    3, 9
    ```

    定义:

    ```
    >>> np.loadtxt('simple.csv', delimiter = ',', skiprows = 1)
    array([[0., 0.],
           [1., 1.],
           [2., 4.],
           [3., 9.]])
    ```

[^1]: Array creation—NumPy v2.0 Manual. (n.d.). Retrieved June 20, 2024, from https://numpy.org/doc/stable/user/basics.creation.html