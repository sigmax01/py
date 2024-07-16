---
title: 绪论
icon: material/airballoon
comments: false
---

## 安装

在Windows上导入, 可能会出现`ImportError: DLL load failed while importing _cext`错误, 以下是解决方案: 

1. `pip instal msvc-runtime`
2. 安装Microsoft Visual C++包, 记得选择x64版本[https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170](https://learn.microsoft.com/en-us/cpp/windows/latest-supported-vc-redist?view=msvc-170)