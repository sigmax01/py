---
title: nd数组构建
icon: material/application-array-outline
comments: true
---

NumPy中最重要的概念就是nd数组. nd数组的构建有6种方式: 

1. 从Python数据类型转换而来, 如列表和元祖, 详情见[这里](#转换Python数据类型)
2. 内建的nd数组创建函数, 如`arange()`, `ones()`, `zeros()`等
3. 复制, 扩展或者改变现有的nd数组
4. 从磁盘中读取nd数组, 无论是标准格式还是自定义格式
5. 从字符串或者缓冲区中读取原始字节创建nd数组
6. 使用特殊函数, 如`random()`

## 创建方法

### 转换Python数据类型 {#转换Python数据类型}


[^1]: Array creation—NumPy v2.0 Manual. (n.d.). Retrieved June 20, 2024, from https://numpy.org/doc/stable/user/basics.creation.html
