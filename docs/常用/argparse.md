---
title: argparse
icon: material/console
comments: false
---

在命令行程序中, 经常需要获取命令行参数. Python内置的`sys.argv`保存了完整的参数列表.

???+ example "例子"

    定义: 

    ```py
    import sys

    print(sys.argv)
    ```

    执行: 

    ```
    $ python main.py hello? who are you ?
    ['main.py', 'hello?', 'who', 'are', 'you', '?']
    ```

    这种方式能够应付简单的参数, 但稍微复杂一点, 比如说用`-d`复制目录, 使用`--filename *.py`过滤文件名等, 解析起来就非常麻烦. 

`argparse`模块可以用于简化参数解析, 定义好各个参数类型后, 执行命令行指令, 它能直接返回有效的参数.

???+ example "例子"

    假设我们想边写一个备份MySQL数据库的命令行程序, 需要输入的参数如下: 

    - `host`参数: 表示MySQL主机名或者IP, 默认为`localhost`
    - `port`参数: 表示MySQL的端口号, 类型为`int`, 默认为`3306`
    - `user`参数: 表示MySQL的用户名, 必须输入
    - `password`参数: 表示MySQL的口令, 必须输入
    - `gz`参数: 表示是否压缩备份文件, 默认为`False`
    - `outfile`参数: 表示备份文件保存在哪, 必须输入

    设计:

    ```py
    import argparse

    def main():
        # 定义一个ArgumentParser实例:
        parser = argparse.ArgumentParser(
            prog='backup', # 程序名
            description='Backup MySQL database.', # 描述
            epilog='Copyright(r), 2023' # 说明信息
        )
        # 定义位置参数:
        parser.add_argument('outfile')
        # 定义关键字参数:
        parser.add_argument('--host', default='localhost')
        # 此参数必须为int类型:
        parser.add_argument('--port', default='3306', type=int)
        # 允许用户输入简写的-u:
        parser.add_argument('-u', '--user', required=True)
        parser.add_argument('-p', '--password', required=True)
        parser.add_argument('--database', required=True)
        # gz参数不跟参数值，因此指定action='store_true'，意思是出现-gz表示True:
        parser.add_argument('-gz', '--gzcompress', action='store_true', required=False, help='Compress backup files by gz.')

        # 解析参数:
        args = parser.parse_args()

        # 打印参数:
        print('parsed args:')
        print(f'outfile = {args.outfile}')
        print(f'host = {args.host}')
        print(f'port = {args.port}')
        print(f'user = {args.user}')
        print(f'password = {args.password}')
        print(f'database = {args.database}')
        print(f'gzcompress = {args.gzcompress}')

    if __name__ == '__main__':
        main()
    ```

    执行: 

    ```
    $ python main.py -u root -p hello --database testdb backup.sql
    parsed args:
    outfile = backup.sql
    host = localhost
    port = 3306
    user = root
    password = hello
    database = testdb
    gzcompress = False
    ```

    `action='store_true`的意思是说, 如果有`-gz`或者`-gzcompress`这个参数, 将其设置为True, 否则, 将其设置为`False`.

    如果缺少必要的参数, 或者参数不对, 它会自动报告详细的错误信息. 如果输入`-h`还能打印帮助信息.

???+ note "笔记"

    `[parser_instance].parse_args()`用于分析接收到的参数, 如果参数有问题, 会打印错误信息, 结束进程; 如果参数是`-r`, 会打印帮助信息, 结束进程. 只有当参数全部有效时, 才会返回一个`NameSpace`对象, 所有的参数都以属性的方式存储在这个对象中.

[^1]: Argparse. (n.d.). Retrieved June 18, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1529653965619235