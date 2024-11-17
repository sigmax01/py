---
title: 考点
comments: false
---

## Arrays and NumPy

- 打印数组: `print(<np_array>)`
- 打印数组形状: `print(<np_array>.shape)`
- 打印第一行: `print(<np_array>[0])`
- 打印中间列: `print(<np_array>[:, 1])`
- 打印每一列的和: `print(np.sum(<np_array>, axis=0))`
- 打印所有元素乘以10: `print(<np_array> * 10)`
- 返回最大的行: `np.max(<np_array>)`
- 返回最大的行对应的行号: `np.argmax(<np_array>)`
- 取两列的差值: `<np_array>[:, 1] - <np_array>[:, 0]` 

## Class Special Method

- `__setitem__(self, <index>)`: 语法糖, 用于以索引的方式设定一个对象内存储的值
- `__getitem__(self, <index>)`: 语法糖, 用于以索引的方式获取一个对象内存储的值
- `__str__(self)`: 调用`print(<object>)`时自定义打印类的信息
- `__len__(self)`: 返回对象的长度, 由`len(<object>)`调用
- `__repr__(self)`: 调用`repr(<object>)`时自定义打印类的信息
- `vars(<object>)`: 检查对象的属性, 以列表的形式返回
- `__name__`: 类名
- `__doc__`: 类的文档字符串, 在类的开头以`'`的形式定义
- `__dict__`: 类的属性, 包含了一个字典, 由类的数据属性组成, 和`var(<object>)`类似, 但是有一些细微区别

???+ example "例子"

    ```py
    class Car:
        def __init__(self, brand, model, price):
            self.brand = brand
            self.model = model
            self.price = price

    class CarCollection:
        def __init__(self):
            self.cars = []
        
        def add_car(self, car):
            self.cars.append(car)
        
        def total_value(self):
            return sum(car.price for car in self.cars)
        
        # Special method to implement len function
        def __len__(self):
            return len(self.cars)
        
        # Special method to add the ability to index the collection object
        def __getitem__(self, index):
            return self.cars[index]
        
        # Special method to return a string representation of the CarCollection object
        def __str__(self):
            car_info = ", ".join(f"{car.brand} {car.model}" for car in self.cars)
            return f"CarCollection with {len(self)} cars: {car_info}"

    # Example usage
    car1 = Car("Toyota", "Camry", 24000)
    car2 = Car("Honda", "Civic", 22000)

    collection = CarCollection()
    collection.add_car(car1)
    collection.add_car(car2)

    # Using vars() to display details of each car
    for car in collection:
        print(vars(car))

    print(collection)               # Shows the car collection -> CarCollection with 2 cars: Toyota Camry, Honda Civic
    print("Total value:", collection.total_value())  # Outputs the total price of the cars
    print("Number of cars:", len(collection))        # -> 2 
    print("First car:", collection[0])               # -> First car: <__main__.Car object at *****>
    ```

## Class Inheritance

由于子类的构造函数会覆盖掉父类的构造函数, 可以通过`super().__init__(<attr>, ...)`来引入其父类的构造函数, 然后在这个基础上增加新的功能. 同样的, 也可以在子类的任意函数中通过`super()`调用父类的任意函数, 注意, 和其他方法不同的是, 不用传入`self`.

## Shell Script

- `echo`: 用来输出文字
- `#!/bin/bash`: 指定shell为bash shell
- `touch`: 用于创建文件
- `>`: 重定向符
- `cat`: 打印文件内容

## Dict&Set Comprehension

写法和list comprehension差不多. 

???+ example "例子"

    ```py
    nums = [1, 2, 3, 4, 5]
    squares = {num: num**2 for num in nums}
    ```

    ```py
    nums = [1, 2, 3, 4, 5]
    squares = {num: num**2 for num in nums if num % 2 == 0}
    ```

    ```py
    keys = ['a', 'b', 'c']
    values = [1, 2, 3]
    dict = {key: value for key, value in zip(keys, values)}
    ```

    ```py
    squares = {x**2 for x in range(1, 6)}
    ```

    ```py
    events = {x for x in range(1, 11) if x % 2 == 0}
    ```