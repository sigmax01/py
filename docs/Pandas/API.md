---
title: API
icon: material/power-socket
comments: true
---

???+ info "信息"

    默认省略导入[csv文件`learn_pandas.csv`](https://drive.google.com/file/d/1Gj3yREUWXVa_WziWbS5pkeyrHuhHHGPo/view?usp=sharing).

## 汇总函数

- `<df_obj>.head()`方法表示返回表的前`n`行, 其中`n`默认为5
- `<df_obj>.tail()`方法表示返回表的后`n`行, 其中`n`默认为5

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

- `<df_obj>.info()`方法表示返回表的信息概况
- `<df_obj>.describe()`方法表示返回表的数值列对应的主要统计量

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

