---
title: 简要介绍
icon: material/cake
comments: false
---

???+ info "信息"

    - 默认省略导入:

        - `import numpy as np`
        - `import pandas as pd`
        - `import matplotlib.pyplot as plt`
        - `import seaborn as sns`

    - 前置知识:

        - [概率论](https://ml.ricolxwz.de/概率/绪论)

Seaborn是一个绘制统计图形的Python库. 它建立在Matplotlib至上并且和Pandas有很强的联动. Seaborn的绘图函数会操作DF和数组并进行必须的语义映射和统计聚合, 以生成信息丰富的图标. 其面向数据集的声明式API让您专注于图标中不同元素的含义, 而不是绘制它们的细节.

下面是一个简单的例子.

???+ example "例子"

    定义:

    ```py
    sns.set_theme()

    tips = sns.load_dataset('tips')
    sns.relplot(
        data=tips,
        x="total_bill",
        y="tip",
        col="time",
        hue="smoker",
        style="smoker",
        size="size"
    )

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/cca4c3866d6d22eff8d3d53c640ae8d3.png){:style="width:680px"}

    解释:

    1. 在幕后, Seaborn用Matplotlib作图
    2. `set_theme`函数调用了Matplotlib的`rcParam`系统并且会影响所有的图(包括使用Matplotlib做的图)
    3. 教程中大部分的代码都使用了`load_dateset`函数接受数据集, 也可以手动使用`read_csv`函数或其他函数导入, Seaborn能够接受的数据类型非常多
    4. 在此代码中, 只提供了变量的名称和其在图中的作用. 不像直接使用Matplotlib时那样, 需要用颜色值或标记代码来指定图标元素的属性. 实际上, Seaborn在幕后处理了从传入的参数到Matplotlib能理解的参数的转换. 这种声明式的写法能够使我们专注于想要回答的问题, 而不是控制Matplotlib的细节
        1. `data=tips`: 指定数据集的来源, `tips`数据集是Seaborn自带的一个示例数据集, 包含餐厅小费的数据
        2. `x="total_bill"`: 指定`total_bill`列作为x轴的数据
        3. `y="tip"`: 指定`tip`作为y轴的数据
        4. `col="time"`: 按照`time`列的值分列(子图). 这个参数会创建两个子图, 一个午餐, 一个晚餐
        5. `hue="smoker"`: 按照`smoker`列的值来着色点
        6. `style="smoker"`: 按照`smoker`列的值来设置点的样式
        7. `size="size"`: 按照`size`列的值来调整点的大小

## 统计图的高阶API

没有最好的数据可视化方法. 不同的问题最好通过不同的图标来回答. Seaborn使用的是一致的面向数据集的API, 使在不同的视觉表示之间切换变得很容易. `relplot`函数用于可视化许多不同的统计关系. 例如, 在上面我们用散点图通常是有效的, 但当一个变量表示的时间时, 用折线图表示更好. `relplot`函数提供了`kind`函数, 方便地在不同的视觉表示之间切换.

???+ example "例子"

    定义:

    ```py
    sns.set_theme()

    dots = sns.load_dataset('dots')
    sns.relplot(
        data=dots,
        kind="line",
        x="time",
        y="firing_rate",
        col="align",
        hue="choice",

        size="coherence",
        style="choice",
        facet_kws=dict(sharex=False)
    )

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/9b8acb9e250b3d738200f06e8fe36255.png){:style="width:680px"}

    可以注意到`size`和`style`属性在散点图和折线图中的表现形式是不一样的. 在散点图中, 表现为点的大小和点的样式; 在这线图中, 表现为线宽和线的样式. 我们无需关注这些细节, 只需要关注整体的结构和信息.

### 统计估计

通常, 我们对一个变量的平均值如何随其他变量变化感兴趣. 许多Seaborn函数会自动执行必要的统计估计, 以回答上述问题. 

???+ example "例子"

    定义:

    ```py
    fmri = sns.load_dataset("fmri")
    sns.relplot(
        data=fmri, kind="line",
        x="timepoint", y="signal", col="region",
        hue="event", style="event",
    )
    ```

    输出:

    ![](https://img.ricolxwz.io/8c3652651af2bfaaa744595a9dcc9cac.png){:style="width:680px"}

当估计统计值的时候, Seaborn将使用自举法计算置信区间, 并绘制表示估计不确定性的误差条. 

Seaborn中的统计估计并不仅限于描述性统计. 例如, 可以通过使用`lmplot`函数包括线性回归模型来增强散点图.

???+ example "例子"

    定义:

    ```py
    tips = sns.load_dataset("tips")
    sns.lmplot(data=tips, x="total_bill", y="tip", col="time", hue="smoker")
    ```

    输出:

    ![](https://img.ricolxwz.io/b047e90a9ddb125c57ae1a77afec08ac.png){:style="width:680px"}

### 分布一览

统计分析需要知道数据集中变量的分布信息, Seaborn的`displot`函数支持多种途径可视化分布. 包括经典的直方图, 或者计算密集型任务像核密度估计.

???+ example "例子"

    === "直方图"

        定义:

        ```py
        tips = sns.load_dataset("tips")
        sns.displot(data=tips, x="total_bill", col="time", kde=True)
        ```

        输出:

        ![](https://img.ricolxwz.io/2de4aebb24a049959d67456a46dcde37.png){:style="width:680px"}

    === "核密度估计"

        定义:

        ```py
        tips = sns.load_dataset("tips")
        sns.displot(data=tips, kind="ecdf", x="total_bill", col="time", hue="smoker", rug=True)
        ```

        输出:

        ![](https://img.ricolxwz.io/5dfe53af5b6b0b90dc7a43da7bffb07c.png){:style="width:680px"}

### 绘制分类数据

在Seaborn中, 有几类特殊的绘图类型是面向可视化分类数据的, 可以设置`catplot`函数中的`kind`属性来实现这一目标. 

???+ example "例子"

    === "蠕虫图"

        定义:

        ```py
        tips = sns.load_dataset("tips")
        sns.catplot(data=tips, kind="swarm", x="day", y="total_bill", hue="smoker")
        ```

        输出:

        ![](https://img.ricolxwz.io/aa9d69269b0f6a08d200c3d4ec049d60.png){style="width:400px"}

    === "小提琴图"

        小提琴图由数据进行核密度分析得到.

        定义: 

        ```py
        tips = sns.load_dataset("tips")
        sns.catplot(data=tips, kind="violin", x="day", y="total_bill", hue="smoker", split=True)
        ```

        输出:

        ![](https://img.ricolxwz.io/691ee143fe024eecdb5d9bfa814bfd9d.png){:style="width:400px"}

    === "条形图"

        定义:

        ```py
        tips = sns.load_dataset("tips")
        sns.catplot(data=tips, kind="bar", x="day", y="total_bill", hue="smoker")
        ```

        输出:

        ![](https://img.ricolxwz.io/10212999a727395aaf2e77a473adfd9a.png){:style="width:400px"}

## 多变量视图在复杂数据集上的应用

一些Seaborn函数结合了多种类型的图标, 可以快速提供数据集的有用摘要, 其中一个, `joinplot`函数, 专注于单一关系, 它绘制了两个变量之间的[联合分布率](https://ml.ricolxwz.de/%E6%A6%82%E7%8E%87/%E5%A4%9A%E7%BB%B4%E9%9A%8F%E6%9C%BA%E5%8F%98%E9%87%8F%E5%8F%8A%E5%85%B6%E5%88%86%E5%B8%83/#%E8%81%94%E5%90%88%E5%88%86%E5%B8%83%E5%BE%8B)以及每个变量的[边缘分布函数](https://ml.ricolxwz.de/%E6%A6%82%E7%8E%87/%E5%A4%9A%E7%BB%B4%E9%9A%8F%E6%9C%BA%E5%8F%98%E9%87%8F%E5%8F%8A%E5%85%B6%E5%88%86%E5%B8%83/#%E8%BE%B9%E7%BC%98%E5%88%86%E5%B8%83%E5%87%BD%E6%95%B0).

???+ example "例子"

    定义:

    ```py
    penguins = sns.load_dataset("penguins")
    sns.jointplot(data=penguins, x="flipper_length_mm", y="bill_length_mm", hue="species")
    ```

    输出:
    
    ![](https://img.ricolxwz.io/5bf67848c9937c5b833d58da465f22f8.png){:style="width:400px"}

另一个函数`pairplot`, 采取更加广泛的视角, 它分别显示了所有成对关系和每个变量的联合分布率和边缘分布函数.

???+ example "例子"

    定义:

    ```py
    penguins = sns.load_dataset("penguins")
    sns.pairplot(data=penguins, hue="species")
    ```

    输出:

    ![](https://img.ricolxwz.io/2330f9ee031951a4e682ab317c3f7fbb.png){:style="width:680px"}

### 构建图形的低级工具

这些工具通过将轴级绘图函数与管理图形布局的对象相结合来工作, 将数据集的结构链接到轴网络. 

???+ example "例子"

    定义:

    ```py
    penguins = sns.load_dataset("penguins")
    g = sns.PairGrid(penguins, hue="species", corner=True)
    g.map_lower(sns.kdeplot, hue=None, levels=5, color=".2")
    g.map_lower(sns.scatterplot, marker="+")
    g.map_diag(sns.histplot, element="step", linewidth=0, kde=True)
    g.add_legend(frameon=True)
    g.legend.set_bbox_to_anchor((.61, .6))
    ```

    输出:

    ![](https://img.ricolxwz.io/6bac39d5783de6544096522f89b3f872.png){:style="width:680px"}

    解释:

    - `g = sns.PairGrid(penguins, hue="species", corner=True)`:
        - 创建一个`PairGrid`对象`g`, 这是一个多变量图表, 可以绘制数据集中变量之间的成对关系
        - `hue="species"`: 根据`species`列中的类别来着色图表
        - `corner=True`: 只绘制矩阵的下三角部分
    - `g.map_lower(sns.kdeplot, hue=None, levels=5, color=".2")`:
        - `hue=None`: 不根据`species`进行着色
        - `levels=5`: 等高线的数量设置为`5`
        - `color=".2"`: 颜色设置为灰色(值越低, 颜色越深)
    - `g.map_lower(sns.kdeplot, hue=None, levels=5, color=".2")`:
        - 在矩阵的下三角部分映射KDE(核密度估计)图
        - `hue=None`: 不根据`species`进行着色
        - `levels=5`: 等高线的数量设置为`5`
        - `color=".2"`: 颜色设置为灰色(值越低, 颜色越深)
    - `g.map_lower(sns.scatterplot, marker="+")`:
        - 在矩阵的下三角部分映射散点图
        - `marker="+"`: 使用`+`符号作为散点的标记
    - `g.map_diag(sns.histplot, element="step", linewidth=0, kde=True)`:
        - 在对角线上映射直方图
        - `element="step"`: 使用阶梯线绘制直方图
        - `linewidth=0`: 设置线宽为`0`
        - `kde=True`: 在直方图上叠加核密度估计曲线
    - `g.add_legend(frameon=True)`:
        - 添加一个图例
        - `frameon=True`: 在图例周围绘制一个边框
    - `g.legend.set_bbox_to_anchor((.61, .6))`:
        - 设置图例的位置
        - `(0.61, 0.6)`: 图例的锚点位置

## 灵活的自定义设置

Seaborn通过一次函数调用就能创建完整的图形. 在可能的情况下, 函数能够自动添加轴标签和图例.

在许多情况下, Seaborn还会根据数据的特征为其参数选择默认的值. 例如, 颜色映射会使用各不同的色调去表示分配给`hue`的分类变量的不同级别.

???+ example "例子"

    定义:

    ```py
    penguins = sns.load_dataset("penguins")
    sns.relplot(
        data=penguins,
        x="bill_length_mm", y="bill_depth_mm", hue="body_mass_g"
    )
    ```

    输出:

    ![](https://img.ricolxwz.io/aa8a80a940f730450d879b91f026c83f.png){:style="width:400px"}

当你准备发布你的作品的时候, 你可能希望对图形进行更加精细的打磨. Seaborn允许多层次的自定义. 它定义了多个适用于所有图形的内置主题. 当你创建了一个图之后, 其属性可以通过Seaborn API进行修改, 也可以通过降到matplotlib层进行更加精细的修改.

???+ example "例子"

    定义:

    ```py
    penguins = sns.load_dataset("penguins")
    sns.set_theme(style="ticks", font_scale=1.25)
    g = sns.relplot(
        data=penguins,
        x="bill_length_mm", y="bill_depth_mm", hue="body_mass_g",
        palette="crest", marker="x", s=100,
    )
    g.set_axis_labels("Bill length (mm)", "Bill depth (mm)", labelpad=10)
    g.legend.set_title("Body mass (g)")
    g.figure.set_size_inches(6.5, 4.5)
    g.ax.margins(.15)
    g.despine(trim=True)
    ```

    输出:

    ![](https://img.ricolxwz.io/674ba39973e4cbe3c4bef7f0b8861d0f.png){:style="width:400px"}