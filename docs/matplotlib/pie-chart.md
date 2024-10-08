---
title: 饼图
icon: material/chart-pie
comments: false
---

???+ info "信息"

    默认省略导入:

    - `import numpy as np`
    - `import matplotlib.pyplot as plt`

可以使用`pyplot`中的`pie`函数来绘制柱形图.

`pie`函数语法格式如下:

```
matplotlib.pyplot.pie(x, explode, labels, colors, autopct, pctdistance, shadow, labeldistance, startangle, radius, counterclock, wedgeprops, textprops, center, 0, frame, rotatelabels, *, normalize, data)[source]
```

参数说明:

- `x`: 浮点型数组或列表, 用于绘制饼图的数据, 表示每个扇形的面积
- `explode`: 数组, 表示各个扇形之间的间隔, 常用于突出显示扇区, 默认为0
- `labels`: 列表, 各个扇形的标签, 默认为`None`
- `colors`: 数组, 表示各个扇形的颜色, 默认为`None`
- `autopct`: 设置饼图内各个扇形的百分比显示格式, `%d%%`为整数百分比, `%0.1f`为一位小数, `%0.1f%%`一位小数百分比, `%0.2f%%`两位小数百分比
- `labeldistance`: 标签标记的绘制位置, 相对于半径的比例, 默认为`1.1`
- `pctdistance`: 类似于`labeldistance`, 指定`autopct`的位置刻度, 默认为`0.6`
- `shadow`: 布尔值, 设置饼图的阴影, 默认为`False`
- `radius`: 设置饼图的半径, 默认为`1`
- `startangle`: 设置饼图的起始角度, 默认为x轴正方向画起
- `counterclock`: 布尔值, 指定是否逆时针绘制扇形, 默认为`True`, 即逆时针绘制
- `wedgeprops`: 字典, 用于指定扇形的属性, 比如边框颜色, 宽度等
- `textprops`: 字典, 用于指定文本标签的属性, 比如字体大小, 颜色等
- `center`: 浮点类型的列表, 用于指定饼图的中心位置
- `frame`: 布尔值, 用于指定是否绘制饼图的边框, 默认为`False`
- `rotatelabels`: 布尔值, 用于指定是否旋转文本标签, 默认为`False`
- `data`: 用于指定数据. 如果设置了`data`参数, 则可以直接用数据框中的列作为`x`, `labels`等参数的值, 无须再次传递

## 例子

### 普通例子

???+ example "例子"

    定义:

    ```
    y = np.array([35, 25, 25, 15])

    plt.pie(y)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/86ac6f273c7503e3853732d4b7a117dd.png){:style="width:400px"}

### 自定义扇区标签和颜色

???+ example "例子"

    定义:

    ```
    y = np.array([35, 25, 25, 15])

    plt.pie(y, labels=['A','B','C','D'], colors=["#d5695d", "#5d8ca8", "#65a479", "#a564c9"])
    plt.title("Pie Test")
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/0b70dcaa921c6154a12298857d67ad45.png){:style="width:400px"}

### 突出显示扇区/格式化输出

???+ example "例子"

    定义:

    ```
    sizes = [15, 30, 45, 10]
    labels = ['A', 'B', 'C', 'D']
    colors = ['yellowgreen', 'gold', 'lightskyblue', 'lightcoral']
    explode = (0, 0.1, 0, 0)

    plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=90)
    plt.title("Pie Test")
    plt.show()
    ```

    输出:
    
    ![](https://img.ricolxwz.io/acbc2b926e3c7e0b889a399f6b4ae285.png){:style="width:400px"}

[^1]: Matplotlib 饼图 | 菜鸟教程. (n.d.). Retrieved July 2, 2024, from https://www.runoob.com/matplotlib/matplotlib-pie.html