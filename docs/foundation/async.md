---
title: 异步
icon: material/sync
comments: false
---

## 协程 {#协程}

在传统线程的执行过程中, 函数都是顺序执行的. 而协程, Coroutine, 则不同, 在执行过程中, 其函数内部可以产生中断, 转而执行别的函数, 在适当的时候再返回来接着执行. 所以说, 这是一种并发执行, 和多线程差不多, 多线程也是并发执行, 而不是并行执行(由于[GIL锁](/foundation/threading/#CPython中线程无法并行)的存在).

### 协程的优势

协程和多线程比的优势就是: 

- 极高的执行效率: 在线程内部不涉及切换, 没有开销
- 不需要多线程锁: 只有一个线程, 不存在像多线程那样子线程同时读写共享资源的冲突, 但是存在对其他进程之间的共享资源的读写冲突

### 协程实现并行

在单个线程内的协程是并发的, 可以用[多进程](/foundation/threading/#多threading)+协程实现利用多核心CPU. 

### 协程的实现方式

可以由多种方式实现协程, 其中主要包括[生成器](/foundation/container/#生成器)和`asyncio`模块提供的`async/await`关键字.

## 生成器实现协程

[生成器](/foundation/container/#生成器)是一种强大的工具, 允许你通过惰性方式生成序列. 通常, 我们用生成器对象的`next()`方法获取下一个值. 然而, 生成器对象还有`send()`方法, 不仅可以恢复生成器的执行, 还可以向生成器对象发送一个值, 该值会被`yield`表示式接受并作为返回值.

???+ example "例子"

    定义: 

    ```py
    def echo_generator():
    while True:
        received = yield
        print(f'Received: {received}')

    gen = echo_generator()
    next(gen)
    gen.send('Hello')
    gen.send('World')
    ```

    执行: 

    ```
    $ python main.py
    Received: Hello
    Received: World
    ```

    1. 得到了一个生成器对象`gen`
    2. `next(gen)`用于启动生成器, 直到执行到`yield`中断
    3. `gen.send('Hello')`, 执行赋值操作`received = 'Hello'`, 打印, 直到执行到`yield`中断
    4. `gen.send('World')`, 执行赋值操作`received = 'World'`, 打印, 直到执行到`yield`中断

现在来看由生成器实现的一个协程: 

???+ example "例子"

    定义: 

    ```py
    def consumer():
        v = ''
        while True:
            u = yield v
            if not u:
                return
            print('[CONSUMER] Consuming %s...' % u)
            v = '200 OK'

    def produce(c):
        c.send(None)
        n = 0
        while n < 5:
            n = n + 1
            print('[PRODUCER] Producing %s...' % n)
            r = c.send(n)
            print('[PRODUCER] Consumer return: %s' % r)
        c.close()

    c = consumer()
    produce(c)
    ```

    执行: 

    ```
    $ python main.py
    [PRODUCER] Producing 1...
    [CONSUMER] Consuming 1...
    [PRODUCER] Consumer return: 200 OK
    [PRODUCER] Producing 2...
    [CONSUMER] Consuming 2...
    [PRODUCER] Consumer return: 200 OK
    [PRODUCER] Producing 3...
    [CONSUMER] Consuming 3...
    [PRODUCER] Consumer return: 200 OK
    [PRODUCER] Producing 4...
    [CONSUMER] Consuming 4...
    [PRODUCER] Consumer return: 200 OK
    [PRODUCER] Producing 5...
    [CONSUMER] Consuming 5...
    [PRODUCER] Consumer return: 200 OK
    ```

    1. 得到了一个生成器对象`c`, 将其传入`produce()`函数中
    2. `c.send(None)`用于启动生成器, 无法执行赋值操作`u = None`, 直到执行到`yield ''`中断, 返回给生产者`''`
    3. `c.send(1)`, 执行赋值操作`u = 1`, 消费者消费, 直到执行`yield '200 OK'`中断, 返回给生产者`'200 OK'`
    4. `c.send(2)`, 执行赋值操作`u = 2`, 消费者消费, 直到执行`yield '200 OK'`中断, 返回给生产者`'200 OK'`
    5. 继续下一轮循环

    ???+ tip "Tip"

        每次执行`r = c.send([value])`时, `u = yield v`语句的执行过程如下: 

        1. 上次操作只执行了`yield v`但是没有执行赋值
        2. 从中断点继续执行另一半赋值`u = [value]`
        3. 执行逻辑
        4. 执行`u = yield v`中的`yield v`部分并中断, 不执行赋值
        5. `r = v`

    ???+ note "笔记"

        传统的生产者-消费者模型是一个线程生产, 一个线程消费, 通过锁控制, 一不小心可能导致死锁. 如果改用协程, 生产者生产之后, 直接通过生成器对象的`send()`函数将物品转移给消费者消费, 待消费者消费完毕后, 切换到生产者继续生产, 效率极高.

## `asyncio`模块实现协程

`asyncio`是Python 3.4版本引入的, 内置了对异步IO的支持. 它的编程模型就是一个[事件循环](#事件循环), 我们从`asyncio`模块中直接获取一个`EventLoop`的引用, 然后把需要执行的协程放到`EventLoop`中执行, 就实现了异步IO.

### 事件循环 {#事件循环}

在系统中, 可以产生事件的实体叫做事件源, 能处理事件的实体叫做事件处理者. 此外, 还有一些第三方实体叫做事件循环. 它的作用是管理所有的事件, 在整个程序运行的过程中不断循环执行, 追踪事件发生的顺序将它们放到队列中, 当主线程空闲的时候, 调用相应的事件处理者来处理事件.

???+ tip "Tip"

    可以通过下列伪代码理解事件循环: 

    ```
    while (1) {
        events = getEvents();
        for (e in events)
            processEvent(e);
    }
    ```

### 老写法

???+ warning "注意"

    `@asyncio.coroutine`在Python 3.11中已经被移除, 所以下列代码在Python 3.11+运行会报错.

用`@asyncio.coroutine`将一个生成器标为`coroutine`类型, 然后就把这个生成器放到[事件循环](#事件循环)中执行.

???+ example "例子"

    定义:  

    ```py
    import threading
    import asyncio

    @asyncio.coroutine
    def hello():
        print('Hello world! (%s)' % threading.currentThread())
        yield from asyncio.sleep(1)

    @asyncio.coroutine
    def welcome():
        yield from asyncio.sleep(1)
        print('Welcome world! (%s)' % threading.currentThread())

    loop = asyncio.get_event_loop()
    tasks = [hello(), welcome()]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
    ```

    执行: 

    ```
    $ python main.py
    Hello world! (<_MainThread(MainThread, started 140706241734464)>)
    # 暂停了1秒
    Welcome world! (<_MainThread(MainThread, started 140706241734464)>)
    ```

    这里, [`yield from`](#yield-from)语法可以让我们很方便地调用另一个生成器, 当然你如果想自己写`yield`, 不想调用别人的生成器也可以, 你自己把这个IO操作写出来执行完了`yield`一下就可以了. 上面的案例本质上就是要执行`asyncio.sleep(1)`, 执行到它里面的`yield`为止, 这个操作耗时1秒, 可以看成是一个1秒的IO操作, 在此期间, 主线程并未等待, 而是去事件循环中执行其他可执行的`coroutine`了, 如在`welcome()`这个`coroutine`等待结果的时候, `hello()`这个`coroutine`运行. 

#### `yield from` {#yield-from}

`yield from`可以用来调用其他的生成器.

???+ example "例子"

    === "例子1"

        定义: 

        ```py
        def sub_generator():
            yield "Sub generator: step 1"
            yield "Sub generator: step 2"
            yield "Sub generator: step 3"

        def main_generator():
            print("Main generator: start")
            yield "Main generator: before sub generator"
            yield from sub_generator()
            yield "Main generator: after sub generator"
            print("Main generator: end")

        gen = main_generator()
        for value in gen:
            print(value)
        ```

        执行: 

        ```
        $ python main.py
        Main generator: start
        Main generator: before sub generator
        Sub generator: step 1
        Sub generator: step 2
        Sub generator: step 3
        Main generator: after sub generator
        Main generator: end
        ```

    === "例子2"

        定义: 

        ```py
        def sub_generator():
            yield "Sub generator: step 1"
            yield "Sub generator: step 2"
            return "Sub generator: done"

        def main_generator():
            print("Main generator: start")
            result = yield from sub_generator()
            print(f"Main generator: received '{result}' from sub generator")
            yield "Main generator: end"

        gen = main_generator()
        for value in gen:
            print(value)
        ```

        执行: 

        ```
        $ python main.py
        Main generator: start
        Sub generator: step 1
        Sub generator: step 2
        Main generator: received 'Sub generator: done' from sub generator
        Main generator: end
        ```

### 新写法

为了简化并更好的标识异步IO, 从Python3.5开始引入了新的语法`async`和`await`. 要使用新的语法, 只需要做两步的简单替换: 

1. 把`@asyncio.coroutine`替换为`async`
2. 把`yield from`替换为`await`

???+ example "例子"

    ```py
    async def hello():
    print("Hello world!")
    r = await asyncio.sleep(1)
    print("Hello again!")
    ```

[^1]: 协程. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017968846697824
[^2]: Asyncio. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017970488768640
[^3]: Async/await. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1048430311230688