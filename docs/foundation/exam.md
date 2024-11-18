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

## Decorator

注意有两种写法:

???+ example "例子"

    1. 不带有参数的装饰器

        ```py
        def log(func):
            def wrapper(t):
                print("currently printing the log...")
                result = func(t)
                print("finished...")
                return result
            return wrapper

        @log
        def now(text):
            print(text)
            return 0
        ```

    2. 带有参数的装饰器

        ```py
        def log(param):
            def decorator(func):
                def wrapper(t):
                    print("currently printing the log...")
                    print(param)
                    result = func(t)
                    return result
                return wrapper
            return decorator

        @log("Hello?")
        def now(text):
            print(text)
            return 0
        ```

???+ example "例子"

    ```py
    ###### TASK 3 ######
    import time

    # Define the decorator
    def measure_time(func):
        def wrapper(n):
            start = time.time()
            result = func(n)
            end = time.time()
            execution_time = end - start
            print(f"Time taken to execute: {execution_time} seconds")
            return result
        return wrapper

    # Apply the decorator to a function
    @measure_time
    def factorial_iterative(n):
        result = 1
        for i in range(2, n+1):
            result *= i
        return result

    # Call the function
    print(factorial_iterative(25))  # Output: 15511210043330985984000000
    #Expected output
    '''
    Time taken to execute: <time> seconds
    15511210043330985984000000
    '''
    ```

    ```py
    ###### TASK 1 ######

    # Define the decorator
    def log_execution(func):
        def wrapper():
            print("Executing function...")
            func()
            print("Function executed!")
        return wrapper

    # Apply the decorator to a function
    @log_execution
    def greet():
        print("Hello, welcome!")

    # Call the function
    greet()
    #Expected Output
    '''Executing function...
    Hello, welcome!
    Function executed!'''
    ```

    ```py
    ###### TASK 2 ######

    # Define the decorator
    def validate_args(func):
        def wrapper(x, y):
            try:
                result = func(x, y)
                return result
            except:
                print("Invalid argument!")
                return None
            
        return wrapper

    # Apply the decorator to a function
    @validate_args
    def add(x, y):
        return x + y

        
    # Call the function with valid arguments
    print(add(2, 3))  # Output: 5

    # Call the function with an invalid argument
    print(add(2, "three"))  # Output: Invalid argument!

    #Expected Output
    '''
    5
    Invalid argument!
    None
    '''
    ```

## Generator

如果列表元素可以在循环的过程中不断算出后面的元素, 那么就不必创造出完整的列表, 节省大量空间. 在Python中, 这种边循环边计算的机制, 叫做生成器.

有两种方式创建生成器: 第一种和list comprehension类似, 只不过用的是`()`; 第二种是生成器函数, 它在每次调用`next()`的时候执行, 在函数内遇到`yield`语句执行并中断, 再次执行的时候从上次返回的`yield`语句的下一句开始执行.

???+ example "例子"

    ```py
    g = (x * x for x in range(10))
    ```
 
    ```py
    def odd():
        print("step 1")
        yield 1
        print("step 2")
        yield 3
        print("step 3")
        yield 5

    o = odd()
    next(o) # 输出step 1, 1
    next(o) # 输出step 2, 3
    next(o) # 输出step 3, 5
    ```

    需要注意的是, 调用生成器函数会创建一个生成器对象, 如上面的`o = odd()`. 多次调用生成器函数会创建多个相互独立的生成器对象.

    ```py
    def odd():
        print("step 1")
        yield 1
        print("step 2")
        yield 3
        print("step 3")
        yield 5

    next(odd()) # 输出step1 1
    next(odd()) # 输出step1 1
    next(odd()) # 输出step1 1
    ```

???+ example "例子"

    ```py
    def square_numbers(n):
        """
        Generator function to yield square of numbers from 1 to n.
        
        :param n: The maximum number to generate squares for.
        """
        for i in range(1, n+1):
            yield i ** 2

    # Example usage
    for square in square_numbers(5):
        # Print each square as it is generated
        print(square)
    ```

    ```py
    # Task 3: Even Number Generator.
    even_gen = (x for x in range(1, 101) if x % 2 == 0)

    # Example usage: Iterating through the generator and printing each even number.
    for even in even_gen:
        print(even)
    ```

## If Statement

什么, If statement居然放在Advanced???? 课题组在想什么??? 幼儿园也会写这个啊?

## Lambda函数

???+ example "例子"

    ```py
    f = lambda x: x * x
    f(5) # 输出25
    ```