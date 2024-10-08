---
title: 基础知识
icon: material/atom-variant
comments: false
---

???+ info "信息"

    - 默认省略导入:

        - `import matplotlib.pyplot as plt`
        - `import numpy as np`
        - `import pandas as pd`

    - Cheat Sheet: 

        - [Datacamp版本](https://python-graph-gallery.com/static/27348055d276e6f73426b199e1c033dd/103f7/matplotlib_cheat_sheet.webp)
        - [官网版本-页面1](https://python-graph-gallery.com/static/c3ae28e67938b12bbcd4b6e871459248/95bd9/matplotlib-python-official-cheatsheet1.webp)
        - [官网版本-页面2](https://python-graph-gallery.com/static/305d2e2ff9a1ce8248ebef6ec1a9aedb/95bd9/matplotlib-python-official-cheatsheet2.webp)

`pyplot`是`matplotlib`的子模块, 提供了和MATLAB类似的绘图API. 

## 图的类型

- `plot()`: 用来绘制线图和散点图
- `scatter()`: 用来绘制散点图
- `bar()`: 用来绘制垂直条形图和水平条形图
- `hist()`: 用来绘制直方图
- `pie()`: 用来绘制饼图
- `imshow()`: 用来绘制图像
- `subplots()`: 用来创建子图

## 数据源

???+ example "例子"

    定义: 

    ```
    xpoints = np.array([0, 6])
    ypoints = np.array([0, 100])
    plt.plot(xpoints, ypoints)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/f67bb426834f040b2c1d9515ec132b6b.png){:style="width:400px"}

???+ tip "Tip"

    若只提供一个数组, Matplotlib会自动生成默认的`x`坐标值, 这种自动生成的`x`坐标值是从0开始的整数序列.

## 绘图样式

### `marker`参数 {#marker参数}

可以使用`marker`参数自定义坐标标记, 可以定义的符号如下:

| 标记                        | 描述                 |
|-----------------------------|----------------------|
| `.`                         | 点                   |
| `,`                         | 像素点               |
| `o`                         | 实心圆               |
| `v`                         | 下三角               |
| `^`                         | 上三角               |
| `<`                         | 左三角               |
| `>`                         | 右三角               |
| `1`                         | 下丁叉               |
| `2`                         | 上丁叉               |
| `3`                         | 左丁叉               |
| `4`                         | 右丁叉               |
| `8`                         | 八角形               |
| `s`                         | 正方形               |
| `p`                         | 五边形               |
| `P`                         | 加号 (填充)         |
| `*`                         | 星号                 |
| `h`                         | 六边形1              |
| `H`                         | 六边形2              |
| `+`                         | 加号                 |
| `x`                         | 乘号x                |
| `X`                         | 乘号x (填充)        |
| `D`                         | 菱形                 |
| `d`                         | 瘦菱形               |
| `|`                         | 竖线                 |
| `_`                         | 横线                 |
| `0` (TICKLEFT)              | 左横线               |
| `1` (TICKRIGHT)             | 右横线               |
| `2` (TICKUP)                | 上竖线               |
| `3` (TICKDOWN)              | 下竖线               |
| `4` (CARETLEFT)             | 左箭头               |
| `5` (CARETRIGHT)            | 右箭头               |
| `6` (CARETUP)               | 上箭头               |
| `7` (CARETDOWN)             | 下箭头               |
| `8` (CARETLEFTBASE)         | 左箭头 (中间点为基准) |
| `9` (CARETRIGHTBASE)        | 右箭头 (中间点为基准) |
| `10` (CARETUPBASE)          | 上箭头 (中间点为基准) |
| `11` (CARETDOWNBASE)        | 下箭头 (中间点为基准) |
| `None`, `' '`, or `' '`     | 没有任何标记         |
| `'$...$'`                   | 渲染指定的字符串，例如`'$f$'` 以字母f为标记 |

???+ example "例子"

    定义:

    ```
    ypoints = np.array([1, 2, 3, 4, 5, 6, 7, 4, 6, 3, 6, 3, 6, 2, 7, 2, 6])
    plt.plot(ypoints, marker="d")
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/11db262d654d6511228672773eb88c1a.png){:style="width:400px"}

### `linestyle`参数 {#linestyle参数}

可以使用`linestyle`参数自定义线的样式.

| 线类型标记  | 描述     |
|-------------|----------|
| `-`         | 实线     |
| `--`        | 虚线     |
| `-.`        | 破折线   |
| `:`         | 点划线   |
| ``         | 不画线   |

???+ example "例子"

    定义:

    ```
    ypoints = np.array([6, 2, 13, 4])
    plt.plot(ypoints, linestyle="-.")
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/d713be22652429a188247aed9f270633.png){:style="width:400px"}

### `color`参数 {#color参数}

可以使用`color`参数自定义线的颜色.

| 颜色标记    | 描述     |
|-------------|----------|
| `r`         | 红色     |
| `g`         | 绿色     |
| `b`         | 蓝色     |
| `c`         | 青色     |
| `m`         | 品红     |
| `y`         | 黄色     |
| `k`         | 黑色     |
| `w`         | 白色     |

???+ tip "Tip"

    可以是自定义颜色类型, 如用十六进制表示.

    ???+ example "例子"

        === "十六进制表示"

            定义:

            ```
            ypoints = np.array([6, 2, 13, 4])
            plt.plot(ypoints, color='#8FBC8F')
            plt.show()
            ```

            输出:

            ![](https://img.ricolxwz.io/efe22c1098063cc89495bb75fc467a4d.png){:style="width:400px"}

        === "名称表示"

            定义:

            ```
            ypoints = np.array([6, 2, 13, 4])
            plt.plot(ypoints, color='SeaGreen')
            plt.show()
            ```

            输出:

            ![](https://img.ricolxwz.io/ddd55f93699929baccb59a490609d15a.png){:style="width:400px"}

### `linewidth`参数 {#linewidth参数}

可以使用`linewidth`参数定义线的宽度.

???+ example "例子"

    定义:

    ```
    ypoints = np.array([6, 2, 13, 4])
    plt.plot(ypoints, linewidth="12.5")
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/e1a4c83b7917f23d11890cba3cdb34e9.png){:style="width:400px"}

### `fmt`参数

`fmt`参数定义了基本格式, 如标记, 线条样式和颜色, 其格式如下:

```
fmt = '<marker><linestyle><color>'
```

各个子参数详情见:

- `<marker>`子参数: 见[这里](#marker参数)
- `<linestyle>`子参数: 见[这里](#linestyle参数)
- `<color>`子参数: 见[这里](#color参数)

???+ example "例子"

    定义:

    ```
    ypoints = np.array([6, 2, 13, 10])
    plt.plot(ypoints, 'o:r')
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/9719ff42ceeabe6ac5fdf231c4a9afa1.png){:style="width:400px"}

### `ms`/`mfc`/`mec`参数

`ms`/`mfc`/`mec`用于自定义标记的大小和颜色.

- `ms`: markersize, 定义标记的大小
- `mfc`: markerfacecolor, 定义标记内部的颜色
- `mec`: markeredgecolor, 定义标记边框的颜色

???+ example "例子"

    === "设置标记大小" 

        定义:

        ```
        ypoints = np.array([6, 2, 9, 4])
        plt.plot(ypoints, marker='o', ms=20)
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/ffd861fb8ac9967cfa11376a679f0240.png){:style="width:400px"}

    === "设置标记内部颜色"

        定义:

        ```
        ypoints = np.array([6, 2, 13, 4])
        plt.plot(ypoints, marker='o', ms=20, mfc='r')
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/3e165ef0d8edff27cfb3fb8b86eb685a.png){:style="width:400px"}

    === "设置标记外边框颜色"

        定义:

        ```
        ypoints = np.array([6, 2, 13, 4])
        plt.plot(ypoints, marker='o', ms=20, mec='r')
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/65aeaa5dd25808601a8eec99158a8d1f.png){:style="width:400px"}       

## 绘制多条线

可以在多次调用绘图函数或者通过在单个绘图函数中传入多组数据来绘制多条线.

???+ example "例子"

    === "多次调用绘图函数"

        定义:

        ```
        y1 = np.array([3, 7, 5, 9])
        y2 = np.array([6, 2, 13, 10])

        plt.plot(y1)
        plt.plot(y2)

        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/d25107b5e9b966db223b2e225e23722a.png){:style="width:400px"}

    === "传入多组数据"
        
        定义:

        ```
        x1 = np.array([0, 1, 2, 3])
        y1 = np.array([3, 7, 5, 9])
        x2 = np.array([0, 1, 2, 3])
        y2 = np.array([6, 2, 13, 10])

        plt.plot(x1, y1, x2, y2)

        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/d25107b5e9b966db223b2e225e23722a.png){:style="width:400px"}

## 轴标签和标题

### 轴标签

可以使用`xlabel`和`ylabel`函数设置`x`轴和`y`轴的标签.

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4])
    y = np.array([1, 4, 9, 16])
    plt.plot(x, y)

    plt.xlabel("x - label")
    plt.ylabel("x - label")

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/ee38ebfaab09fb4a24e167eb3895d7ea.png){:style="width:400px"}

### 标题

可以使用`title`函数设置标题.

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4])
    y = np.array([1, 4, 9, 16])
    plt.plot(x, y)

    plt.title("Test")
    plt.xlabel("x - label")
    plt.ylabel("x - label")

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/bd81521408e628aa77142f716b6e6aae.png){:style="width:400px"}

## 网格线

通过`grid`函数可以设置图标中的网格线. 格式如下:

```
matplotlib.pyplot.grid(<b>, <which>, <axis>, <**kwargs>)
```

参数说明:

- `<b>`: 可选, 默认为`None`, 可以设置布尔值, `True`为显示网格线, `False`为不显示网格线
- `<which>`: 可选, 可选值有`major`, `minor`和`both`, 表示应用于主网格线还是副网格线

    ???+ warning "注意"

        若要看见副网格线, 需要开启副刻度: `plt.minorticks_on()`.

    ???+ example "例子"

        === "只开启主刻度"

            定义:

            ```
            plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
            plt.grid(which='major', linestyle='-', linewidth='0.75', color='black')
            plt.show()
            ```

            输出:

            ![](https://img.ricolxwz.io/2bf12a515837e780a9688f23e984c844.png){:style="width:400px"}

        === "只开启副刻度"

            定义:

            ```
            plt.minorticks_on()

            plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
            plt.grid(which='minor', linestyle='-', linewidth='0.75', color='black')
            plt.show()
            ```

            输出:

            ![](https://img.ricolxwz.io/4d2da490fb92e3c6d63e250b421d07c7.png){:style="width:400px"}

        === "开启所有刻度"

            定义:

            ```
            plt.minorticks_on()

            plt.plot([1, 2, 3, 4], [10, 20, 25, 30])
            plt.grid(which='both', linestyle='-', linewidth='0.75', color='black')
            plt.show()
            ```

            输出:

            ![](https://img.ricolxwz.io/9ccf579064b452539f92793e20df152a.png){:style="width:400px"}

- `<axis>`: 可选, 设置显示哪个方向的网格线, 可选值有`both`, `x`或`y`
- `<**kwargs>`: 可选, 设置网格样式

可选参数可以设置颜色, 粗细, 样式:

- `color`: 参考[这里](#color参数)
- `linestyle`: 参考[这里](#linestyle参数)
- `linewidth`: 参考[这里](#linewidth参数)

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4])
    y = np.array([1, 4, 9, 16])

    plt.title("grid() test")
    plt.xlabel("x - label")
    plt.ylabel("y - label")

    plt.plot(x, y)

    plt.grid(color="r", linestyle="--", linewidth=0.5)

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/fd0c1150609821a5984372d9f2e6aca3.png){:style="width:400px"}

## 绘制多图

可以使用`subplot`和`subplots`函数来绘制多个子图.

区别是: 

- `subplot()`: 用于逐个创建子图, 只存在一个图形对象
- `subplots()`: 用于一次性创建整个子图的网格, 并返回一个包含图形对象和子图数组的元组, 多次调用创建多个图形对象

### `subplot`函数 

该函数将区域分成`<nrows>`行和`<ncols>`列, 从左到右, 从上到下对每个子区域进行编号`1...N`, 编号可以通过`<index>`来设置.

???+ example "例子"

    === "例子1"

        定义:

        ```
        # plot 1:
        xpoints = np.array([0, 6])
        ypoints = np.array([0, 100])

        plt.subplot(1, 2, 1)
        plt.plot(xpoints,ypoints)
        plt.title("plot 1")

        # plot 2:
        x = np.array([1, 2, 3, 4])
        y = np.array([1, 4, 9, 16])

        plt.subplot(1, 2, 2)
        plt.plot(x,y)
        plt.title("plot 2")

        plt.suptitle("subplot test")
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/72d9c30756c00e1e8d94687b4148215f.png){:style="width:400px"}

    === "例子2"

        定义:

        ```
        # plot 1:
        x = np.array([0, 6])
        y = np.array([0, 100])

        plt.subplot(2, 2, 1)
        plt.plot(x,y)
        plt.title("plot 1")

        # plot 2:
        x = np.array([1, 2, 3, 4])
        y = np.array([1, 4, 9, 16])

        plt.subplot(2, 2, 2)
        plt.plot(x,y)
        plt.title("plot 2")

        # plot 3:
        x = np.array([1, 2, 3, 4])
        y = np.array([3, 5, 7, 9])

        plt.subplot(2, 2, 3)
        plt.plot(x,y)
        plt.title("plot 3")

        # plot 4:
        x = np.array([1, 2, 3, 4])
        y = np.array([4, 5, 6, 7])

        plt.subplot(2, 2, 4)
        plt.plot(x,y)
        plt.title("plot 4")

        plt.suptitle("subplot test")
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/6db8ef5393eafe38777627d50d58b2c9.png){:style="width:400px"}

### `subplots`函数

该函数会一次性生成多个子图并返回一个图形对象+由子图对象构成的元组. 

???+ example "例子"

    定义:

    ```
    # 创建一些测试数据
    x = np.linspace(0, 2*np.pi, 400)
    y = np.sin(x**2)

    # 创建一个图形对象和一个子图: 图1
    fig, ax = plt.subplots()
    ax.plot(x, y)
    ax.set_title('Simple plot')

    # 创建一个图形对象和两个子图: 图2
    f, (ax1, ax2) = plt.subplots(1, 2, sharey=True)
    ax1.plot(x, y)
    ax1.set_title('Sharing Y axis')
    ax2.scatter(x, y)

    # 创建一个图形对象和四个子图: 图3
    fig, axs = plt.subplots(2, 2, subplot_kw=dict(projection="polar"))
    axs[0, 0].plot(x, y)
    axs[1, 1].scatter(x, y)

    plt.show()
    ```

    输出:

    - 图1

        ![](https://img.ricolxwz.io/c78a5526ecbb97496c7d2c1c991ad42a.png){:style="width:400px"}

    - 图2

        ![](https://img.ricolxwz.io/544302a4aadff87376d1d47a13ff1e47.png){:style="width:400px"}

    - 图3

        ![](https://img.ricolxwz.io/4ba1d151e7fc6eab6de8e4c6a5ef694c.png){:style="width:400px"}

[^1]: Matplotlib Pyplot | 菜鸟教程. (n.d.). Retrieved June 30, 2024, from https://www.runoob.com/matplotlib/matplotlib-pyplot.html
[^2]: Matplotlib 绘图标记 | 菜鸟教程. (n.d.). Retrieved June 30, 2024, from https://www.runoob.com/matplotlib/matplotlib-marker.html
[^3]: Matplotlib 绘图线 | 菜鸟教程. (n.d.). Retrieved June 30, 2024, from https://www.runoob.com/matplotlib/matplotlib-line.html
[^4]: Matplotlib 网格线 | 菜鸟教程. (n.d.). Retrieved June 30, 2024, from https://www.runoob.com/matplotlib/matplotlib-grid.html
[^5]: Matplotlib 绘制多图 | 菜鸟教程. (n.d.). Retrieved June 30, 2024, from https://www.runoob.com/matplotlib/matplotlib-subplots.html