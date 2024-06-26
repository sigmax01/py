---
title: IO
icon: material/file-table-box
comments: true
---

???+ info "信息"

    默认省略导入`import pandas as pd`

## 文本文件

Pandask可以读取的文件格式有很多, 这里主要介绍读写csv, excel, txt文件.

### 文件读取

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

#### 常用参数

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
    
### 数据写入

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

[^1]: 第二章 pandas基础—Joyful Pandas 1.0 documentation. (n.d.). Retrieved June 26, 2024, from https://inter.joyfulpandas.datawhale.club/Content/ch2.html