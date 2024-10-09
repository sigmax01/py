---
title: 基础知识
icon: material/anvil
comments: false
---

???+ info "信息"

    - 默认省略导入
    
        - `import pandas as pd`
        - `import numpy as np`

    - 默认省略导入csv文件[learn_pandas.csv](https://share.ricolxwz.io/machine-learning/dataset/learn_pandas.csv)

## 数据结构

Pandas中具有两种基本的数据结构, 存储一维数据的Series和二维数据的DataFrame.

???+ tip "Tip"

    Series和DataFrame和NumPy中的[结构化数组](/numpy/structured-array)类似, 功能上, 前者远胜后者.

### Series

Series一般由四部分组成, 分别是序列的值, 索引, 存储类型, 序列的名字. 其中索引也可以指定它的名字, 默认为空.

???+ example "例子"

    ```
    [1]: s = pd.Series(data=[100, 'a', {'dic1': 5}],
                       index=pd.Index(['id1', 20, 'third'], name='my_index'),
                       dtype='object',
                       name="my_name")
    [2]: s
    my_index
    id1              100
    20                 a
    third    {'dic1': 5}
    Name: my_name, dtype: object
    ```
    
对于这些属性, 可以通过`.`的方式获取.

???+ example "例子"

    ```
    [1]: s = pd.Series(data=[100, 'a', {'dic1': 5}],
                       index=pd.Index(['id1', 20, 'third'], name='my_index'),
                       dtype='object',
                       name="my_name")
    [2]: s.values
    array([100, 'a', {'dic1': 5}], dtype=object)
    [3]: s.index
    Index(['id1', 20, 'third'], dtype='object', name='my_index')
    [4]: s.dtype
    dtype('O')
    [5]: s.name
    'my_name'
    [6]: s.shape
    (3,)
    [7]: s['third']
    {'dic1': 5}
    ```
    
### DataFrame

DataFrame在Series的基础上增加了一个列索引, DataFrame可以由二维数组和行列索引来构造.

- `index`: 行索引
- `columns`: 列索引

???+ example "例子"

    ```
    [1]: data = [[1, 'a', 1.2], [2, 'b', 2.2], [3, 'c', 3.2]]
    [2]: df = pd.DataFrame(data=data,
                          index=['row_%d'%i for i in range(3)],
                          columns=['col_0', 'col_1', 'col_2'])
    [3]: df
           col_0 col_1  col_2
    row_0      1     a    1.2
    row_1      2     b    2.2
    row_2      3     c    3.2
    ```

更多的时候会采取列索引名到数据的映射同时再加上行索引来构造DataFrame.

???+ example "例子"

    ```
    [1]: df = pd.DataFrame(data = {'col_0': [1,2,3], 'col_1':list('abc'),
                                   'col_2': [1.2, 2.2, 3.2]},
                           index = ['row_%d'%i for i in range(3)])
    [2]: df
           col_0 col_1  col_2
    row_0      1     a    1.2
    row_1      2     b    2.2
    row_2      3     c    3.2
    ```
    
由于这种映射关系, 可以通过`<col_name>`或`<col_list>`取出对应的列或多个列组成的表, 结果分别为Series和DataFrame.

???+ example "例子"

    ```
    [1]: df = pd.DataFrame(data = {'col_0': [1,2,3], 'col_1':list('abc'),
                                   'col_2': [1.2, 2.2, 3.2]},
                           index = ['row_%d'%i for i in range(3)])
    [2]: df['col_0']
    row_0    1
    row_1    2
    row_2    3
    Name: col_0, dtype: int64
    [3]: df[['col_0', 'col_1']]
           col_0 col_1
    row_0      1     a
    row_1      2     b
    row_2      3     c
    ```
    
与Series类似, 同样可以访问属性.

???+ example "例子"

    ```
    [1]: df = pd.DataFrame(data = {'col_0': [1,2,3], 'col_1':list('abc'),
                                   'col_2': [1.2, 2.2, 3.2]},
                           index = ['row_%d'%i for i in range(3)])
    [2]: df.values
    array([[1, 'a', 1.2],
           [2, 'b', 2.2],
           [3, 'c', 3.2]], dtype=object)
    [3]: df.index
    Index(['row_0', 'row_1', 'row_2'], dtype='object')
    [4]: df.colums
    Index(['col_0', 'col_1', 'col_2'], dtype='object')
    [5]: df.dtypes # 返回的是值于相应列数据类型的Series
    col_0      int64
    col_1     object
    col_2    float64
    dtype: object
    [6]: df.shape
    (3, 3)
    ```

## IO

### 文本文件

Pandask可以读取的文件格式有很多, 这里主要介绍读写csv, excel, txt文件.

#### 文件读取

csv, excel, txt文件的读取函数分别是:

- `pd.read_csv()`
- `pd.read_table()`
- `pd.read_excel()`

???+ example "例子"

    ```
    [1]: df_csv = pd.read_csv('data/my_csv.csv')
    [2]: df_csv
       col1 col2  col3    col4      col5
    0     2    a   1.4   apple  2020/1/1
    1     3    b   3.4  banana  2020/1/2
    2     6    c   2.5  orange  2020/1/5
    3     5    d   3.2   lemon  2020/1/7
    [3]: df_txt = pd.read_table('data/my_table.txt')
    [4]: df_txt
       col1 col2  col3             col4
    0     2    a   1.4   apple 2020/1/1
    1     3    b   3.4  banana 2020/1/2
    2     6    c   2.5  orange 2020/1/5
    3     5    d   3.2   lemon 2020/1/7
    [5]: df_excel = pd.read_excel('data/my_excel.txt')
    [6]: df_excel
       col1 col2  col3    col4      col5
    0     2    a   1.4   apple  2020/1/1
    1     3    b   3.4  banana  2020/1/2
    2     6    c   2.5  orange  2020/1/5
    3     5    d   3.2   lemon  2020/1/7
    ```

##### 常用参数

txt文件:

- `sep`: 用于自定义分割符号

???+ example "例子"

	```
	[1]: pd.read_table('data/my_table_special_sep.txt')
					col1 |||| col2
	0  TS |||| This is an apple.
	1    GQ |||| My name is Bob.
	2         WT |||| Well done!
	3    PT |||| May I help you?
	[2]: pd.read_table('data/my_table_special_sep.txt', sep=' \|\|\|\| ', engine='python')
		col1               col2
	0   TS  This is an apple.
	1   GQ    My name is Bob.
	2   WT         Well done!
	3   PT    May I help you?
	```

	???+ warning "注意"

		在使用`sep`的同时, 需要指定引擎为python.

公用参数:

- `header=None`: 表示第一行不作为列名
- `index_col`: 表示把某一列或者某几列作为索引
- `usecols`: 表示读取列的集合, 默认读取所有列
- `parse_dates`: 表示需要转化为时间的列
- `nrows`: 表示读取的数据行数

???+ example "例子"

    ```
    [1]: pd.read_table('data/my_table.txt', header=None)
          0     1     2                3
    0  col1  col2  col3             col4
    1     2     a   1.4   apple 2020/1/1
    2     3     b   3.4  banana 2020/1/2
    3     6     c   2.5  orange 2020/1/5
    4     5     d   3.2   lemon 2020/1/7
    [2]: pd.read_csv('data/my_csv.csv', index_col=['col1', 'col2'])
               col3    col4      col5
    col1 col2                        
    2    a      1.4   apple  2020/1/1
    3    b      3.4  banana  2020/1/2
    6    c      2.5  orange  2020/1/5
    5    d      3.2   lemon  2020/1/7
    [3]: pd.read_table('data/my_table.txt', usecols=['col1', 'col2'])
       col1 col2
    0     2    a
    1     3    b
    2     6    c
    3     5    d
    [4]: pd.read_csv('data/my_csv.csv', parse_dates=['col5'])
       col1 col2  col3    col4       col5
    0     2    a   1.4   apple 2020-01-01
    1     3    b   3.4  banana 2020-01-02
    2     6    c   2.5  orange 2020-01-05
    3     5    d   3.2   lemon 2020-01-07
    [5]: pd.read_excel('data/my_excel.xlsx', nrows=2)
       col1 col2  col3    col4      col5
    0     2    a   1.4   apple  2020/1/1
    1     3    b   3.4  banana  2020/1/2
    ```
    
#### 数据写入

csv, excel, txt文件的写入方法分别是:

- `<df_obj>.to_csv()`
- Pandas没有定义`to_table()`方法, 但是可以用`to_csv()`方法保存为txt文件
- `<df_obj>.to_excel()`

???+ tip "Tip"

	最常见的操作是将`index`设置为`False`, 这样能把索引在保存的时候去除.

???+ example "例子"

	```
	[1]: df_csv.to_csv('data/my_csv_saved.csv', index=False)
	[2]: df_excel.to_excel('data/my_excel_saved.xlsx', index=False)
	[3]: df_txt.to_csv('data/my_txt_saved.txt', sep='\t', index=False)
	```

## 常用函数

### 汇总函数

#### `head`/`tail`函数

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

#### `info`/`describe`函数

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

### 特征统计函数

#### 常见函数

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

#### 特殊函数

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

### 唯一值函数

#### `unique`/`nunique`函数

对序列使用`unique`和`nunique`函数可以得到其唯一值组成的列表和一个唯一值的个数.

???+ example "例子"

    ```
    [1]: df['School'].unique()
    array(['Shanghai Jiao Tong University', 'Peking University',
           'Fudan University', 'Tsinghua University'], dtype=object)
    [2]: df['School'].nunique()
    4
    ```

#### `value_counts`函数

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

#### `drop_duplicates`函数

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

### 替换函数

一般而言, 替换操作都是针对某一列进行的, 所以说下面的例子都以Series为例.

#### `replace`函数

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

#### `where`/`mask`函数

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

#### `round`/`abs`/`clip`函数 

`round`, `abs`, `clip`函数分别表示按照给定精度四舍五入, 取绝对值和截断.

???+ example "例子"

    ```
    [1]: s = pd.Series([-1, 1.2345, 100, -50])
    [2]: s.round(2)
    0     -1.00
    1      1.23
    2    100.00
    3    -50.00
    dtype: float64
    [3]: s.abs()
    0      1.0000
    1      1.2345
    2    100.0000
    3     50.0000
    dtype: float64
    [4]: s.clip(0, 2) # 这两个数表示上下截断边界
    0    0.0000
    1    1.2345
    2    2.0000
    3    0.0000
    dtype: float64
    ```

### 排序函数

#### `sort_values`函数

`sort_values1函数按照值排序.

???+ example "例子"

    ```
    [1]: df_demo = df[['Height', 'Weight']]
    [2]: df_demo.sort_values('Height').head()
     	Height 	Weight
    143 145.4 	34.0
    49 	147.3 	34.0
    120 147.8 	34.0
    30 	148.7 	41.0
    80 	150.5 	40.0
    ```

???+ note "笔记"

    - 参数`ascending`可以调整升序/降序, 默认为升序

        ???+ example "例子"

            ```
            [1]: df_demo = df[['Height', 'Weight']]
            [2]: df_demo.sort_values('Height', ascending=False).head() # 降序
                Height 	Weight
            193 193.9 	79.0
            2 	188.9 	89.0
            134 186.5 	83.0
            38 	185.3 	87.0
            23 	183.9 	87.0
            ```

        - 多列排序的升序/降序需要向`ascending`传入相应的布尔索引数组

            ???+ example "例子"

                ```
                [1]: df_demo = df[['Height', 'Weight']]
                [2]: df_demo.sort_values(['Weight', 'Height'], ascending=[True, False]).head()
                 	Height 	Weight
                120 147.8 	34.0
                49 	147.3 	34.0
                143 145.4 	34.0
                139 150.5 	36.0
                108 152.4 	38.0
                ```

                上述例子中, 在体重相同的情况下, 对身高进行排序, 保持身高降序排列, 体重升序排列.

#### `sort_index`函数

`sort_index`函数按照索引排序.

索引排序的用法和值排序完全一致, 只不过元素的值在索引中, 此时需要指定索引层的名字或者层号, 用参数`level`表示. 

???+ example "例子"

    为了演示按照索引排序, 利用`set_index`函数将年级和姓名两列作为索引.

    ```
    [1]: df_demo = df[['Height', 'Weight']].set_index(['Grade', 'Name'])
    [2]: df_demo.sort_index(level=['Grade', 'Name'], ascending=[True, False]).head()
                            Height  Weight
    Grade    Name                         
    Freshman Yanquan Wang    163.5    55.0
             Yanqiang Xu     152.4    38.0
             Yanqiang Feng   162.3    51.0
             Yanpeng Lv        NaN    65.0
             Yanli Zhang     165.1    52.0
    ```

### `apply`函数

`apply`函数常用于DataFrame的行迭代或者列迭代. 该函数接受一个高阶函数. 比较重要的参数是`axis`: 

- `axis=1`: 每次传入的函数就是行元素组成的Series
- `axis=0`: 每次传入的函数就是列元素组成的Series

???+ example "例子"

    ```
    [1]: df_demo = df[['Height', 'Weight']]
    [2]: df_demo.apply(lambda x:x.mean())
    Height    163.218033
    Weight     55.015873
    dtype: float64
    [3]: df_demo.apply(lambda x:x.mean(), axis=1).head()
    0    102.45
    1    118.25
    2    138.95
    3     41.00
    4    124.00
    dtype: float64
    ```

???+ tip "Tip"

    得益于传入自定义函数, `apply`的自由度很高, 但是这是以性能作为代价的. 一般而言, 使用内置函数处理和`apply`来处理同一个任务, 其速度会相差很多, 因此之后再确定存在自定义需求的情境下才考虑使用`apply`.

[^1]: 第二章 pandas基础—Joyful Pandas 1.0 documentation. (n.d.). Retrieved June 26, 2024, from https://inter.joyfulpandas.datawhale.club/Content/ch2.html