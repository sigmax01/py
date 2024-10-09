---
title: requests
icon: material/microsoft-internet-explorer
comments: false
---

## 请求

### `GET`

???+ example "例子"

    === "不带参数"

        ```py
        import requests

        r = requests.get('https://www.douba.com/')
        ```

    === "带`param`参数"

        ```py
        import requests

        r = requests.get('https://www.douban.com/search', params={'q': 'python', 'cat': '1001'})
        ```

    === "带`headers`参数"

        ```py
        import requests

        r = requests.get('https://www.douban.com/', headers={'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit'})
        ```

### `POST`

???+ example "例子"

    === "带`data`参数"

        ```py
        import requests

        r = requests.post('https://accounts.douban.com/login', data={'form_email': 'abc@example.com', 'form_password': '123456'})
        ```

    === "带`json`参数"

        ```py
        import requests

        params = {'key': 'value'}
        r = requests.post(url, json=params) 
        ```

## 返回对象的属性/方法 

- `[res].status_code`: HTTP响应的状态码
- `[res].headers`: HTTP响应头, 以字典形式存储
- `[res].text`: HTTP响应内容的字符串形式(已解码)
- `[res].content`: HTTP响应内容的二进制形式(未解码)
- `[res].json()`: 将HTTP响应内容解析为字典
- `[res].url`: 最终访问的URL
- `[res].encoding`: 编码方式
- `[res].cookies`: 一个`ReguestsCookieJar`对象, 包含服务器返回的所有Cookie
- `[res].elapsed`: 一个`timedelta`对象, 表示请求从发起到完成花费的时间
- `[res].history`: 一个包含请求历史记录的列表
- `[res].raise_for_status()`: 如果发生HTTP错误, 调用这个方法会抛出异常

[^1]: Requests. (n.d.). Retrieved June 19, 2024, from https://www.liaoxuefeng.com/wiki/1016959663602400/1183249464292448