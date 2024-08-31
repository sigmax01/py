---
title: 散点图
icon: material/scatter-plot-outline
comments: false
---

???+ info "信息"

    默认省略导入:

    - `import numpy as np`
    - `import matplotlib.pyplot as plt`

可以使用`pyplot`中的`scatter`函数来绘制散点图.

`scatter`函数语法格式如下:

```
matplotlib.pyplot.scatter(x, y, s, c, marker, cmap, norm, vmin, vmax, alpha, linewidths, *, edgecolors, plotnonfinite, data, **kwargs)
```

参数说明:

- `x, y`: 长度相同的数组, 也就是我们即将绘制散点图的数据点, 输入数据
- `s`: 点的大小, 默认`20`, 也可以是一个数组, 数组每个参数为对应点的大小
- `c`: 点的颜色, 默认颜色`b`, 也可以是个RGB或RGBA二维行数组
- `marker`: 点的样式, 默认小圆圈`o`
- `cmap`: colormap, 默认`viridis`, 标量或者是一个colormap的名字
- `norm`: normalize, 默认`None`, 数据亮度在0-1之间 
- `vmin/vmax`: 亮度设置
- `alpha`: 透明度设置, 0-1之间, 默认为`None`
- `linewidths`: 标记点的长度
- `edgecolors`: 颜色或颜色的序列, 默认为`face`
- `plotnonfinite`: 布尔值, 设置是否使用非限定的`c`绘制点
- `**kwargs`: 其他参数

## 例子

### 普通例子

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
    y = np.array([1, 4, 9, 16, 7, 11, 23, 18])

    plt.scatter(x, y)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/a6f61285ed40093190febc0cd19d7d7b.png){:style="width:400px"}

### 自定义图标大小

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
    y = np.array([1, 4, 9, 16, 7, 11, 23, 18])
    sizes = np.array([20, 50, 100, 200, 500, 1000, 60, 90])

    plt.scatter(x, y, s=sizes)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/b5cace04387167c8f9c61a426b6d3ad5.png){:style="width:400px"}

### 自定义点的颜色

???+ example "例子"

    定义:

    ```
    x = np.array([1, 2, 3, 4, 5, 6, 7, 8])
    y = np.array([1, 4, 9, 16, 7, 11, 23, 18])
    colors = np.array(["red","green","black","orange","purple","beige","cyan","magenta"])

    plt.scatter(x, y, c=colors)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/707cac73771cb1710bf9d350a0edc7d7.png){:style="width:400px"}

### 多批散点

???+ example "例子"

    定义:

    ```
    x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
    y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
    plt.scatter(x, y, color = 'hotpink')

    x = np.array([2,2,8,1,15,8,12,9,7,3,11,4,7,14,12])
    y = np.array([100,105,84,105,90,99,90,95,94,100,79,112,91,80,85])
    plt.scatter(x, y, color = '#88c999')

    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/b2fc157e8e8fefc16ddfc9e318280292.png){:style="width:400px"}

### 使用随机数来设置散点图

???+ example "例子"

    定义:

    ```
    np.random.seed(20240701)

    N = 50
    x = np.random.rand(N)
    y = np.random.rand(N)
    colors = np.random.rand(N)
    area = (30 * np.random.rand(N))**2

    plt.scatter(x, y, s=area, c=colors, alpha=0.5) # 设置颜色及透明度
    plt.title("Scatter Test") # 设置标题
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/3028dacb8e1d392ec05649d809e34021.png){:style="width:400px"}

### 使用颜色条

`pyplot`模块提供了很多可用的颜色条. 设置颜色调需要用到`cmap`参数, 默认值为`viridis`, 其中的每一个颜色都有一个范围从0-100的值.

???+ warning "注意"

    如果要显示颜色条, 需要用到`plt.colorbar`函数; 如果没有调用, 是无法显示的.

???+ example "例子"

    === "例子1"

        定义:

        ```
        x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
        y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
        colors = np.array([0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100])

        plt.scatter(x, y, c=colors, cmap='viridis')
        plt.colorbar()
        plt.show()
        ```

        输出:

        ![](https://img.ricolxwz.io/2928952519aebd835e7723954ec4d543.png){:style="width:400px"}

    === "例子2"

        定义:

        ```
        x = np.array([5,7,8,7,2,17,2,9,4,11,12,9,6])
        y = np.array([99,86,87,88,111,86,103,87,94,78,77,85,86])
        colors = np.array([0, 10, 20, 30, 40, 45, 50, 55, 60, 70, 80, 90, 100])

        plt.scatter(x, y, c=colors, cmap='afmhot_r')
        plt.colorbar()
        plt.show() 
        ```

        输出:

        ![](https://img.ricolxwz.io/115247970ff2fff7c8c4b4af964702c4.png){:style="width:400px"}

[^1]: Matplotlib 散点图 | 菜鸟教程. (n.d.). Retrieved July 1, 2024, from https://www.runoob.com/matplotlib/matplotlib-scatter.html