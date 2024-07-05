---
title: 数据分组
icon: material/select-group
comments: true
---

???+ info "信息"

    - 默认省略导入

        - `import numpy as np`
        - `import pandas as pd`

    - 缩写

        - DataFrame缩写为"DF"
        - Series缩写为"SE"

    - 默认使用数据集: [learn_pandas.csv](https://share.ricolxwz.io/machine-learning/dataset/learn_pandas.csv)

        已经导入:  `df = pd.read_csv('data/learn_pandas.csv', usecols=['School', 'Grade', 'Name', 'Gender', 'Weight', 'Transfer'])`

## 分组模式及其对象

要实现分组操作, 必须明确三个要素: 分组依据, 数据来源, 操作及其返回结果, 得出分组模式即:

```
df.groupby(分组依据)[数据来源].使用操作
```

???+ example "例子"

    ```
    [1]: df.groupby('Gender')['Height'].median()
    Gender
    Female    159.6
    Male      173.4
    Name: Height, dtype: float64
    ```

## 分组依据的本质

### 传入列名

可以传入相应的一个列名或多个列名, Pandas会自动从对应的列中获取分组依据.

???+ example "例子"

    === "一个列名"

        ```
        [1]: df.groupby('Gender')['Height'].median()
        Gender
        Female    159.6
        Male      173.4
        Name: Height, dtype: float64
        ```

    === "多个列名"

        ```
        [1]: df.groupby(['School', 'Gender'])['Height'].mean()
        School                         Gender
        Fudan University               Female    158.776923
                                       Male      174.212500
        Peking University              Female    158.666667
                                       Male      172.030000
        Shanghai Jiao Tong University  Female    159.122500
                                       Male      176.760000
        Tsinghua University            Female    159.753333
                                       male      171.638889
        name: height, dtype: float64
        ```

### 传入数组/列

可以传入一个数组/列, 以这个数组中的元素作为分组依据.

???+ example "例子"

    === "例子1"

        ```
        [1]: condition = df.Weight > df.Weight.mean()
        [2]: df.groupby(condition)['Height'].mean()
        Weight
        False    159.034646
        True     172.705357
        Name: Height, dtype: float64
        ```

    === "例子2"

        ```
        [1]: item = np.random.choice(list('abc'), df.shape[0])
        [2]: df.groupby(item)['Height'].mean()
        a    163.924242
        b    162.928814
        c    162.708621
        Name: Height, dtype: float64
        ```

    === "例子3"

        ```
        [1]: condition = df.Weight > df.Weight.mean() 
        [2]: item = np.random.choice(list('abc'), df.shape[0]) 
        [3]: df.groupby([condition, item])['Height'].mean()
        Weight   
        False   a    160.193617
                b    158.921951
                c    157.756410
        True    a    173.152632
                b    172.055556
                c    172.873684
        Name: Height, dtype: float64
        ```

### 本质

从传入数组的情况可以看出, 之前传入列名只是一种简便的记号, 事实上等价于传入的是一个列或者多个列, 最后的分组依据来自于数组来源组合的unique值, 通过`drop_duplicates`就能直到具体的组类别.

???+ example "例子"

    ```
    [1]: df[['School', 'Gender']].drop_duplicates()
    [2]: df.groupby([df['School'], df['Gender']])['Height'].mean() 这里直接传入了一个列, 相当于df.groupby(['School', 'Gender'])['Height'].mean()
    School                         Gender
    Fudan University               Female    158.776923
                                   Male      174.212500
    Peking University              Female    158.666667
                                   Male      172.030000
    Shanghai Jiao Tong University  Female    159.122500
                                   Male      176.760000
    Tsinghua University            Female    159.753333
                                   Male      171.638889
    Name: Height, dtype: float64
    ```