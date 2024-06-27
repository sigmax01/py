---
title: API
icon: material/power-socket
comments: true
---

???+ info "信息"

    默认省略导入[csv文件`learn_pandas.csv`](https://drive.google.com/file/d/1Gj3yREUWXVa_WziWbS5pkeyrHuhHHGPo/view?usp=sharing).

## 汇总函数

### `head`/`tail`函数

- `head`函数表示返回表的前`n`行, 其中`n`默认为5
- `tail`函数表示返回表的后`n`行, 其中`n`默认为5

???+ example "例子"

    ```
    [1]: df.head(2)
     	School 	Grade 	Name 	Gender 	Height 	Weight 	Transfer
    0 	Shanghai Jiao Tong University 	Freshman 	Gaopeng Yang 	Female 	158.9 	46.0 	N
    1 	Peking University 	Freshman 	Changqiang You 	Male 	166.5 	70.0 	N
    [2]: df.tail(2)
    	School	Grade	Name	Gender	Height	Weight	Transfer
    198	Shanghai Jiao Tong University	Senior	Chengmei Shen	Male	175.3	71.0	N
    199	Tsinghua University	Sophomore	Chunpeng Lv	Male	155.7	51.0	N
    ```

### `info`/`describe`函数

- `info`函数表示返回表的信息概况
- `describe`函数表示返回表的数值列对应的主要统计量

???+ example "例子"

    ```
    [1]: df.info()
    <class 'pandas.core.frame.DataFrame'>
    RangeIndex: 200 entries, 0 to 199
    Data columns (total 7 columns):
    #   Column    Non-Null Count  Dtype  
    ---  ------    --------------  -----  
    0   School    200 non-null    object 
    1   Grade     200 non-null    object 
    2   Name      200 non-null    object 
    3   Gender    200 non-null    object 
    4   Height    183 non-null    float64
    5   Weight    189 non-null    float64
    6   Transfer  188 non-null    object 
    dtypes: float64(2), object(5)
    memory usage: 11.1+ KB
    [2]: df.describe()
    	Height	Weight
    count	183.000000	189.000000
    mean	163.218033	55.015873
    std	8.608879	12.824294
    min	145.400000	34.000000
    25%	157.150000	46.000000
    50%	161.900000	51.000000
    75%	167.500000	65.000000
    max	193.900000	89.000000
    ```

## 特征统计函数

### 常见函数

最常见的特征函数有`sum, mean, median, var, std, max, min`.

???+ example "例子"

    ```
    [1]: df_demo = df[['Height', 'Weight']]
    [2]: df_demo.mean()
    Height    163.218033
    Weight     55.015873
    dtype: float64
    [3]: df_demo.max()
    Height    193.9
    Weight     89.0
    dtype: float64
    ```

### 特殊函数

此外, 还有特殊的函数:

- `quantile`: 返回分位数
- `count`: 返回缺失值个数
- `idxmax`: 返回最大值对应的索引
- `idxmin`: 返回最小值对应的索引

???+ example "例子"

    ```
    [1]: df_demo = df[['Height', 'Weight']] 
    [2]: df_demo.quantile(0.75)
    Height    167.5
    Weight     65.0
    Name: 0.75, dtype: float64
    [3]: df_demo.count()
    Height    183
    Weight    189
    dtype: int64
    [4]: df_demo.idxmax()
    Height    193
    Weight      2
    dtype: int64
    ```

???+ note "笔记"

    - 上述函数由于操作返回的是标量, 所以又被称为聚合函数
    - 上述函数有一个公共参数`axis`, 默认为0代表逐列聚合, 设置为1代表逐行聚合

    ???+ example "例子"

        ```
        [1]: df_demo = df[['Height', 'Weight']] # 在这个数据集上逐行聚合没有意义, 演示需要
        [2]: df_demo.mean(axis=1).head()
        0    102.45
        1    118.25
        2    138.95
        3     41.00
        4    124.00
        dtype: float64
        ```

## 唯一值函数

### `unique`/`nunique`函数

对序列使用`unique`和`nunique`函数可以得到其唯一值组成的列表和一个唯一值的个数.

???+ example "例子"

    ```
    [1]: df['School'].unique()
    array(['Shanghai Jiao Tong University', 'Peking University',
           'Fudan University', 'Tsinghua University'], dtype=object)
    [2]: df['School'].nunique()
    4
    ```

### `value_counts`函数

`value_counts`函数可以得到唯一值和其对应出现的频数.

???+ example "例子"

    ```
    [1]: df['School'].value_counts()
    School
    Tsinghua University              69
    Shanghai Jiao Tong University    57
    Fudan University                 40
    Peking University                34
    Name: count, dtype: int64
    ```

### `drop_duplicates`函数

若要观察多个列组合的唯一值, 可以使用`drop_duplicates`函数. 

???+ note "笔记"

    `keep`参数说明:

    - `first`: 每个组合保留第一次出现的所在行
    - `last`: 每个组合保留最后一次出现的所在行
    - `False`: 所有重复组合所在的行剔除

???+ example "例子"

    ```
    [1]: df_demo = df[['Gender','Transfer','Name']]
    [2]: df_demo.drop_duplicates(['Gender', 'Transfer'])
        Gender Transfer            Name
    0   Female        N    Gaopeng Yang
    1     Male        N  Changqiang You
    12  Female      NaN        Peng You
    21    Male      NaN   Xiaopeng Shen
    36    Male        Y    Xiaojuan Qin
    43  Female        Y      Gaoli Feng
    [3]: df_demo.drop_duplicates(['Gender', 'Transfer'], keep='last')
        Gender Transfer            Name
    147    Male      NaN        Juan You
    150    Male        Y   Chengpeng You
    169  Female        Y   Chengquan Qin
    194  Female      NaN     Yanmei Qian
    197  Female        N  Chengqiang Chu
    199    Male        N     Chunpeng Lv
    [4]: df_demo.drop_duplicates(['Name', 'Gender'], keep=False).head()
       Gender Transfer            Name
    0  Female        N    Gaopeng Yang
    1    Male        N  Changqiang You
    2    Male        N         Mei Sun
    4    Male        N     Gaojuan You
    5  Female        N     Xiaoli Qian
    ```

## 替换函数

一般而言, 替换操作都是针对某一列进行的, 所以说下面的例子都以Series为例.

### `replace`函数

此处介绍`replace`的用法.

- 字典/列表构造替换

    ???+ example "例子"

        ```
        [1]: df['Gender'].replace({'Female': 0, 'Male': 1}).head()
        0    0
        1    1
        2    1
        3    0
        4    1
        Name: Gender, dtype: int64
        [2]: df['Gender'].replace(['Female', 'Male'], [0, 1]).head()
        0    0
        1    1
        2    1
        3    0
        4    1
        Name: Gender, dtype: int64
        ```

- 方向替换

    - 若`method`参数为`ffill`则用前面一个最近的未被替换的值进行替换
    - 若`method`参数为`bfill`则用后面一个最近的未被替换的值进行替换 

    ???+ example "例子"

        ```
        [1]: s = pd.Series(['a', 1, 'b', 2, 1, 1, 'a'])
        [2]: s
        0    a
        1    1
        2    b
        3    2
        4    1
        5    1
        6    a
        dtype: object
        [3]: s.replace([1, 2], method='ffill')
        0    a
        1    a
        2    b
        3    b
        4    b
        5    b
        6    a
        dtype: object
        [4]: s.replace([1, 2], method='bfill')
        0    a
        1    b
        2    b
        3    a
        4    a
        5    a
        6    a
        dtype: object
        ```

### `where`/`mask`函数

`where`和`mask`函数是完全对称的, `where`函数在传入条件为`False`的对应行进行替换, 而`mask`在传入条件为`True`的对应行进行替换, 当不指定替换值时, 替换为缺失值. 

???+ example "例子"

    ```
    [1]: s = pd.Series([-1, 1.2345, 100, -50])
    [2]: s.where(s<0)
    0    -1.0
    1     NaN
    2     NaN
    3   -50.0
    dtype: float64
    [3]: s.where(s<0, 100)
    0     -1.0
    1    100.0
    2    100.0
    3    -50.0
    dtype: float64
    [4]: s.mask(s<0)
    0         NaN
    1      1.2345
    2    100.0000
    3         NaN
    dtype: float64
    [5]: s.mask(s<0, -50)
    0    -50.0000
    1      1.2345
    2    100.0000
    3    -50.0000
    dtype: float64
    ```

    ???+ tip "Tip"

        其实, `s<0`这个条件和与Series索引一致的布尔索引数组的效果是一样的.

        ???+ example "例子"

            ```
            [1]: s_condition = pd.Series([True, False, False, True], index=s.index)
            [2]: s.mask(s_condition, -50)
            0    -50.0000
            1      1.2345
            2    100.0000
            3    -50.0000
            dtype: float64
            ```



[^1]: 第二章 pandas基础—Joyful Pandas 1.0 documentation. (n.d.). Retrieved June 26, 2024, from https://inter.joyfulpandas.datawhale.club/Content/ch2.html