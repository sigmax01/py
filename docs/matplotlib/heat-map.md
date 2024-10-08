---
title: 热力图
icon: material/heat-wave
comments: false
---

???+ info "信息"

    默认省略导入:

    - `import numpy as np`
    - `import matplotlib.pyplot as plt`

可以使用`pyplot`中的`imshow`函数来绘制矩阵, 热力图, 地图等.

`imshow`函数语法格式如下:

```
imshow(X, cmap, norm, aspect, interpolation, alpha, vmin, vmax, origin, extent, shape, filternorm, filterrad, imlim, resample, url, *, data, **kwargs)
```

参数说明:

- `x`: 输入数据, 可以是二维数组, 三维数组, PIL图像对象, matplotlib路径对象等
- `cmap`: 颜色映射, 用于控制图像中不同数值对应的颜色. 可以选择内置的颜色, 也可以自定义
- `norm`: 控制数值的归一化方式
- `interpolation`: 插值方法, 用于控制图像的平滑程度和细节程度
- `alpha`: 图像透明度, 取值范围为`0`-`1`
- `origin`: 坐标轴原点的位置, 可以设置为`upper`或`lower`
- `vmin`/`vmax`: 控制颜色映射的值域范围
- `filternorm`/`filterrad`: 用于图像滤波的对象
- `imlim`: 指定图像显示范围
- `resample`: 指定图像重采样方式
- `url`: 用于指定图像链接

## 例子

### 显示灰度图像

???+ example "例子"

    定义:

    ```
    img = np.random.rand(10, 10)
    plt.imshow(img, cmap='gray')
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/d2b79fcbc9582093ec2cf314e076d0ff.png){:style="width:400px"}
    
### 显示彩色图像

???+ example "例子"

    定义:

    ```
    img = np.random.rand(10, 10, 3)
    plt.imshow(img)
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/40f626ccaa12d9326a2886d1283e95b8.png){:style="width:400px"}

### 显示热力图

???+ example "例子"

    定义:

    ```
    img = np.random.rand(10, 10)
    plt.imshow(img, cmap='hot')
    plt.colorbar()
    plt.show()
    ```

    输出:

    ![](https://img.ricolxwz.io/2d679f19bfbf426005d0bd4768da85cc.png){:style="width:400px"}

[^1]: Matplotlib imshow() 方法 | 菜鸟教程. (n.d.). Retrieved July 2, 2024, from https://www.runoob.com/matplotlib/matplotlib-imshow.html