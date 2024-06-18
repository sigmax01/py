---
title: datetime
icon: material/timelapse
comments: true
---

`datetime`是Python处理日期和时间的模块, 需要用到里面的`datetime`类.

## 获取当前日期和时间

`datetime.now()`会返回一个`datetime`类的实例. 这个对象中有一个`__repr__`方法, 详情参见[`__str__`方法](/基础/对象/#str), 可以用于打印这个对象, 内容是它所代表的时间.

???+ example "例子"

    定义: 

    ```py
    from datetime import datetime

    now = datetime.now()
    print(now)
    print(type(now))
    ```

    执行: 

    ```
    $ python main.py
    2024-06-18 11:18:01.074953
    <class 'datetime.datetime'>     
    ```

    ???+ warning "注意"

        上述得到的时区为操作系统设定的时区, 如果需要转化为UTC时间, 需要用到`datetime`模块的`UTC`变量, 需要导入.

        ???+ example "例子"

            定义: 

            ```py
            from datetime import datetime, UTC

                now = datetime.now(UTC)
                print(now)
                print(type(now))
            ```

            执行: 

            ```
            $ python main.py
            2024-06-18 01:50:26.278879+00:00
            <class 'datetime.datetime'>
            ```

## 获取指定日期和时间

要指定`datetime`类的实例为某一个日期和时间, 可以往构造函数`datetime()`里面传入参数.

???+ example "例子"

    定义: 

    ```py
    from datetime import datetime

    dt = datetime(2015, 4, 19, 12, 20)
    print(dt)
    ```

    执行: 

    ```
    $ python main.py
    2015-04-19 12:20:00
    ```

## 时间戳

???+ note "笔记"

    UNIX时间, 或者POSIX时间为UNIX或类UNIX系统使用的时间表示方式, 从UTC1970年1月1日0时0分0秒起至现在的总秒数. 全球各地的计算机在任意时刻的时间戳都是相同的.

### `datetime`对象转时间戳

时间戳可以通过在`datetime`类的实例上调用`timestamp()`方法得到.

???+ example "例子"

    定义:

    ```py
    from datetime import datetime

    dt = datetime.now()
    print(dt.timestamp())
    ```

    执行: 

    ```
    $ python main.py
    1718674824.780608
    ```

### 时间戳转`datetime`对象

要将时间戳转为`datetime`类的实例, 可以使用类方法`fromtimestamp([timestamp])`.

???+ example "例子"

    定义: 

    ```py
    from datetime import datetime

    t = 1429417200.0
    print(datetime.fromtimestamp(t))
    ```

    执行: 

    ```
    $ python main.py
    2015-04-19 14:20:00
    ```

    ???+ warning "注意"

        上述得到的时区为操作系统设定的时区, 如果需要转化为UTC时间, 需要用到`datetime`模块的`UTC`变量, 需要导入.

        ???+ example "例子"

            例子:

            ```py
            from datetime import datetime, UTC

            t = 1429417200.0
            print(datetime.fromtimestamp(t, UTC))
            ```

            执行: 

            ```
            $ python main.py
            2015-04-19 04:20:00+00:00
            ```

## 格式化字符串

### 格式化字符串转为`datetime`对象

将格式化字符串转换为`datetime`类的实例, 需要用到类方法`strptime()`, 该方法会根据字符串生成一个实例并返回.

???+ example "例子"

    定义:

    ```py
    from datetime import datetime

    cday = datetime.strptime('2015-6-1 18:19:59', '%Y-%m-%d %H:%M:%S')
    print(cday)
    ```

    执行: 

    ```
    $ python main.py
    2015-06-01 18:19:59
    ```

### `datetime`对象转为格式化字符串

将`datetime`类的实例转化为格式化字符串, 需要用到实例的方法`strftime()`, 该方法会把实例格式化为字符串显示给用户.

???+ example "例子"

    定义: 

    ```py
    from datetime import datetime

    now = datetime.now()
    print(now.strftime('%a, %b %d %H:%M'))
    ```

    执行: 

    ```
    $ python main.py
    Tue, Jun 18 12:06
    ```

## `datetime`对象加减时间

对日期和时间进行加减实际上就是把`datetime`类的实例往后或者往前计算, 得到新的`datetime`类对象. 加减可以直接用`+`, `-`运算符, 需要导入`timedelta`类.

???+ example "例子"

    定义:

    ```py
    from datetime import datetime, timedelta

    now = datetime.now()
    print(now)
    now_after = now + timedelta(hours=10)
    now_before = now - timedelta(days=1, hours=12)
    print(now_after)
    print(now_before)
    ```

    执行: 

    ```
    2024-06-18 12:10:29.281663
    2024-06-18 22:10:29.281663
    2024-06-17 00:10:29.281663
    ```

[^1]: Datetime. (n.d.). Retrieved June 18, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017648783851616