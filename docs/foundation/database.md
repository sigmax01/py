---
title: 数据库
icon: material/database
comments: false
---

## SQLite

SQLite是一种嵌入式关系型数据库, 它的数据库就是一个文件. Python本身就内置了SQLite3, 所以在Python中使用SQLite不需要装任何东西, 直接导入它的驱动就可以了. SQLite的特点是轻量级, 但是不能承受高并发访问.

要操作SQLite, 要弄清楚几个概念: 首先, 需要连接到数据库, 称之为connection. 连接到数据库后, 需要打开游标, 称之为cursor. 通过cursor执行SQL语句. 然后提交事务, 保存更改. 最后关闭游标和连接.

???+ example "例子"

    === "例子1"

        定义: 

        ```py
        improt sqlite3

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute('create table user(id varchar(20), primary key, name varchar(20))')
        cursor.execute('insert into user(id, name) values (\'1\', \'wenzexu\'))
        print(cursor.rowcount)
        conn.commit()
        cursor.close()
        conn.close()
        ```

        执行: 

        ```
        $ python main.py
        1
        ```
    
    === "例子2"

        定义: 

        ```py
        import sqlite3

        conn = sqlite3.connect('test.db')
        cursor = conn.cursor()
        cursor.execute('select * from user where id=?', ('1',))
        values = cursor.fetchall()
        print(values)
        cursor.close()
        conn.close()
        ```

        执行: 

        ```
        $ python main.py
        [('1', 'wenzexu')]
        ```

## MySQL

MySQL是世界上最广泛使用的关系型数据库. 它能够承受高并发访问, 所占用的内存也很大.

要操作MySQL, 需要安装MySQL的驱动, `pip install mysql-connector-python --allow-external mysql-connector-python`. Python的数据库API定义都是通用的, 因此, 操作MySQL的代码和操作SQLite的类似.

???+ example "例子"

    定义: 

    ```py
    impoort mysql.connector

    conn = mysql.connector.connect(user='root', password='password', database='test')
    cursor = conn.cursor()
    cursor.execute('create table user (id varchar(20) primary key, name varchar(20))')
    cursor.execute('insert into user (id, name) values (%s, %s)', ['1', 'wenzexu'])
    print(cursor.rowcount)
    conn.commit()
    cursor.close()

    cursor = conn.cursor()
    cursor.execute('select * from user where id = %s', ('1',))
    values = cursor.fetchall()
    print(values)
    cursor.close()
    conn.close()
    ```

    执行:

    ```
    $ python main.py
    1
    [('1', 'wenzexu')]
    ```

[^1]: 使用SQLite—廖雪峰的官方网站. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017801751919456
[^2]: 使用MySQL. (n.d.). Retrieved June 17, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1017802264972000