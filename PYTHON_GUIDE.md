# Python 脚本使用卡密模块指南

> 通用卡密验证模块 - Python 版本使用指南

## 📖 概述

本模块提供了 Python 版本的卡密验证功能，适用于任何需要卡密验证的 Python 脚本项目。

## ✨ 特性

- 🐍 **纯 Python 实现** - 无需 Node.js 环境
- 🔐 **通用性强** - 适用于任何 Python 脚本
- 💾 **智能缓存** - 自动缓存验证结果
- ⚙️ **高度可配置** - 支持自定义配置
- 📝 **完善的错误处理** - 详细的错误信息
- 🎯 **青龙面板友好** - 完美支持青龙面板

## 📦 安装

### 方法1：从 GitHub 直接安装（推荐）⭐

```bash
# 安装最新版本（会自动安装依赖）
pip install git+https://github.com/RoninXj/universal-cardkey-validator.git

# 或安装指定版本
pip install git+https://github.com/RoninXj/universal-cardkey-validator.git@v1.0.0
```

### 方法2：从本地安装

```bash
# 克隆仓库
git clone https://github.com/RoninXj/universal-cardkey-validator.git
cd universal-cardkey-validator

# 安装
pip install .

# 或开发模式安装（可编辑）
pip install -e .
```

### 方法3：直接下载文件（不推荐）

```bash
# 下载 Python 模块文件
wget https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey_validator.py

# 手动安装依赖
pip install requests
```

### 青龙面板安装

在青龙面板的依赖管理中添加（Python3 标签）：

**完整 URL 格式（必须）：**
```
git+https://github.com/RoninXj/universal-cardkey-validator.git
```

**指定版本：**
```
git+https://github.com/RoninXj/universal-cardkey-validator.git@v1.1.0
```

**注意：** Python 依赖必须使用完整 URL 格式，不支持简短格式。

或使用命令行：

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 安装依赖
pip3 install git+https://github.com/RoninXj/universal-cardkey-validator.git
```

## 🚀 快速开始

### 基本使用

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 设置环境变量
os.environ['CARD_KEY'] = 'your_card_key_here'

# 初始化
initialize_card_key_validator()

# 获取验证器
validator = get_card_key_validator()

if validator:
    # 验证卡密
    result = validator.verify()
    
    if result['success']:
        print('✅ 验证成功')
        # 继续执行你的脚本...
    else:
        print(f'❌ 验证失败: {result["message"]}')
```

### 在请求中使用

```python
from cardkey_validator import initialize_card_key_validator, verify_and_add_card_key

# 初始化
initialize_card_key_validator()

# 准备请求数据
request_data = {
    'user_id': '123',
    'action': 'query'
}

# 自动验证并添加卡密
data_with_key = verify_and_add_card_key(request_data)

if data_with_key:
    # 发送请求
    # response = requests.post(url, json=data_with_key)
    print(f'请求数据: {data_with_key}')
else:
    print('卡密验证失败')
```

## 📖 API 文档

### initialize_card_key_validator(options=None)

初始化全局卡密验证器。

**参数：**
- `options` (dict, 可选)
  - `required` (bool): 是否必须提供卡密，默认 `True`
  - `verify_url` (str): 验证接口地址
  - `cache_timeout` (int): 缓存超时时间（秒），默认 3600
  - `custom_params` (dict): 自定义验证参数
  - `custom_headers` (dict): 自定义请求头
  - `timeout` (int): 请求超时时间（秒），默认 10
  - `silent` (bool): 静默模式，不输出日志
  - `env_keys` (list): 环境变量键名列表，默认 `['CARD_KEY', 'km']`

**返回：**
- `CardKeyValidator` 实例或 `None`

**示例：**
```python
# 基本使用
initialize_card_key_validator()

# 自定义配置
initialize_card_key_validator({
    'verify_url': 'https://your-api.com/verify',
    'cache_timeout': 1800,  # 30分钟
    'custom_params': {
        'app_id': 'your_app_id'
    },
    'silent': False
})

# 可选卡密（不强制要求）
initialize_card_key_validator({
    'required': False
})
```

### get_card_key_validator()

获取全局卡密验证器实例。

**返回：**
- `CardKeyValidator` 实例或 `None`

### create_card_key_validator(card_key, options=None)

创建新的卡密验证器实例（不使用全局实例）。

**参数：**
- `card_key` (str): 卡密
- `options` (dict): 配置选项（同 initialize_card_key_validator）

**返回：**
- `CardKeyValidator` 实例

**示例：**
```python
from cardkey_validator import create_card_key_validator

validator = create_card_key_validator('your_card_key', {
    'verify_url': 'https://your-api.com/verify'
})

result = validator.verify()
```

### verify_and_add_card_key(request_data, validator=None)

验证卡密并添加到请求数据中。

**参数：**
- `request_data` (dict): 原始请求数据
- `validator` (CardKeyValidator, 可选): 验证器实例，默认使用全局实例

**返回：**
- `dict` 或 `None`: 添加了卡密的请求数据，验证失败返回 `None`

**示例：**
```python
data = verify_and_add_card_key({
    'user_id': '123',
    'action': 'query'
})

if data:
    # data = {'user_id': '123', 'action': 'query', 'card_key': 'xxx'}
    pass
```

### CardKeyValidator 类方法

#### verify()

验证卡密。

**返回：**
- `dict`: 验证结果
  - `success` (bool): 是否成功
  - `message` (str): 消息
  - `data` (dict): 验证数据（成功时）
  - `code` (str): 错误代码（失败时）

#### get_status()

获取验证器状态。

**返回：**
- `dict`: 状态信息
  - `is_verified` (bool): 是否已验证
  - `verify_time` (int): 验证时间戳
  - `cache_valid` (bool): 缓存是否有效
  - `card_key` (str): 卡密（脱敏显示）

#### clear_cache()

清除缓存，下次调用 `verify()` 时会重新验证。

## 🌍 环境变量

### 必需变量

```bash
# 卡密（二选一）
export CARD_KEY=your_card_key_here
# 或
export km=your_card_key_here
```

### 可选变量

```bash
# 验证接口地址
export VERIFY_URL=https://your-api.com/verify

# 缓存超时时间（秒）
export VERIFY_CACHE_TIMEOUT=3600
```

## 💡 使用示例

### 示例1：基础脚本

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 设置环境变量（实际使用时应该在系统环境变量中设置）
os.environ['CARD_KEY'] = 'your_card_key_here'

# 初始化
initialize_card_key_validator()

def main():
    validator = get_card_key_validator()
    
    if not validator:
        print('卡密验证器未初始化')
        return
    
    # 验证卡密
    result = validator.verify()
    
    if not result['success']:
        print(f'卡密验证失败: {result["message"]}')
        return
    
    print('卡密验证成功，开始执行任务')
    
    # 执行你的任务...
    print('任务执行中...')

if __name__ == '__main__':
    main()
```

### 示例2：爬虫脚本

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
from cardkey_validator import initialize_card_key_validator, verify_and_add_card_key

# 初始化
initialize_card_key_validator({
    'verify_url': 'https://your-api.com/verify',
    'custom_params': {
        'platform': 'crawler'
    }
})

def crawl_data(url):
    # 准备请求数据
    request_data = {
        'url': url,
        'method': 'GET'
    }
    
    # 验证并添加卡密
    data_with_key = verify_and_add_card_key(request_data)
    
    if not data_with_key:
        print('卡密验证失败')
        return None
    
    # 发送请求
    response = requests.post('https://api.example.com/crawl', json=data_with_key)
    return response.json()

if __name__ == '__main__':
    result = crawl_data('https://example.com')
    print(result)
```

### 示例3：多账号脚本

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from cardkey_validator import create_card_key_validator

accounts = [
    {'username': 'user1', 'card_key': 'key1'},
    {'username': 'user2', 'card_key': 'key2'}
]

for account in accounts:
    validator = create_card_key_validator(account['card_key'])
    result = validator.verify()
    
    if result['success']:
        print(f"{account['username']} 验证成功")
        # 执行任务...
    else:
        print(f"{account['username']} 验证失败: {result['message']}")
```

### 示例4：自定义配置

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 自定义配置
initialize_card_key_validator({
    'verify_url': 'https://your-api.com/verify',
    'cache_timeout': 1800,  # 30分钟
    'custom_params': {
        'app_id': 'your_app_id',
        'version': '1.0.0'
    },
    'custom_headers': {
        'X-API-Key': 'your_api_key',
        'X-Platform': 'python'
    },
    'timeout': 15,  # 15秒超时
    'silent': False  # 显示日志
})

validator = get_card_key_validator()
result = validator.verify()

if result['success']:
    print('验证成功')
    print(f'验证数据: {result["data"]}')
```

## 🎯 青龙面板使用

### 1. 安装模块

#### 方法A：通过 Web 界面（推荐）

1. 登录青龙面板
2. 进入 **依赖管理**
3. 选择 **Python3** 标签
4. 点击 **新建依赖**
5. 输入依赖名称：
   ```
   git+https://github.com/RoninXj/universal-cardkey-validator.git
   ```
6. 点击 **确定**
7. 等待安装完成

#### 方法B：通过命令行

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 安装模块
pip3 install git+https://github.com/RoninXj/universal-cardkey-validator.git
```

### 2. 配置环境变量

在青龙面板的环境变量中添加：

```bash
CARD_KEY=your_card_key_here
```

### 3. 在脚本中使用

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 初始化
initialize_card_key_validator()

def main():
    validator = get_card_key_validator()
    
    if not validator:
        print('卡密验证器未初始化，退出脚本')
        return
    
    result = validator.verify()
    
    if not result['success']:
        print(f'卡密验证失败: {result["message"]}，退出脚本')
        return
    
    print('卡密验证成功，开始执行任务')
    # 执行你的任务...

if __name__ == '__main__':
    main()
```

### 4. 创建定时任务

在青龙面板的定时任务中创建：
- **名称**：你的脚本名称
- **命令**：`task your_script.py`
- **定时规则**：根据需求设置

## 🔧 高级配置

### 错误处理

```python
from cardkey_validator import get_card_key_validator

validator = get_card_key_validator()
result = validator.verify()

if not result['success']:
    code = result.get('code')
    
    if code == 'NETWORK_ERROR':
        print('网络连接失败，请检查网络')
    elif code == 'EXPIRED':
        print('卡密已过期，请续费')
    elif code == 'INVALID':
        print('卡密无效')
    elif code == 'TIMEOUT':
        print('验证请求超时')
    else:
        print(f'验证失败: {result["message"]}')
```

### 缓存管理

```python
from cardkey_validator import get_card_key_validator

validator = get_card_key_validator()

# 获取状态
status = validator.get_status()
print(f'缓存有效: {status["cache_valid"]}')

# 清除缓存
validator.clear_cache()

# 重新验证
result = validator.verify()
```

## 🐛 故障排除

### 问题1：模块导入失败

**错误信息：**
```
ModuleNotFoundError: No module named 'cardkey_validator'
```

**解决方案：**
1. 确认模块已安装：
   ```bash
   pip list | grep universal-cardkey-validator
   ```
2. 重新安装模块：
   ```bash
   pip install git+https://github.com/RoninXj/universal-cardkey-validator.git
   ```
3. 如果使用虚拟环境，确认已激活：
   ```bash
   source venv/bin/activate  # Linux/Mac
   venv\Scripts\activate     # Windows
   ```

### 问题2：requests 模块未安装

**错误信息：**
```
ModuleNotFoundError: No module named 'requests'
```

**解决方案：**
```bash
pip install requests
```

### 问题3：卡密验证失败

**检查清单：**
1. 确认环境变量 `CARD_KEY` 或 `km` 已设置
2. 确认验证接口地址正确
3. 检查网络连接
4. 查看详细错误信息

## 📋 完整示例脚本

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
示例脚本：使用卡密验证模块
"""

import os
import time
from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 设置环境变量（实际使用时应该在系统环境变量中设置）
os.environ['CARD_KEY'] = 'your_card_key_here'

def main():
    """主函数"""
    print('=' * 50)
    print('脚本开始执行')
    print('=' * 50)
    
    # 初始化卡密验证器
    print('\n1. 初始化卡密验证器...')
    initialize_card_key_validator({
        'verify_url': 'https://card.xjyyds.cf/api/verify',
        'cache_timeout': 3600,
        'silent': False
    })
    
    # 获取验证器
    validator = get_card_key_validator()
    
    if not validator:
        print('❌ 卡密验证器初始化失败')
        return
    
    # 验证卡密
    print('\n2. 验证卡密...')
    result = validator.verify()
    
    if not result['success']:
        print(f'❌ 卡密验证失败: {result["message"]}')
        print('脚本退出')
        return
    
    print('✅ 卡密验证成功')
    
    # 获取状态
    print('\n3. 获取验证器状态...')
    status = validator.get_status()
    print(f'验证状态: {status}')
    
    # 执行任务
    print('\n4. 执行任务...')
    for i in range(3):
        print(f'任务 {i+1} 执行中...')
        time.sleep(1)
    
    print('\n✅ 所有任务执行完成')
    print('=' * 50)

if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('\n\n⚠️ 用户中断执行')
    except Exception as e:
        print(f'\n\n❌ 脚本执行出错: {str(e)}')
```

## 📞 需要帮助？

1. 查看 [完整文档](README-UNIVERSAL.md)
2. 查看 [Node.js 版本](cardkey-validator.js)
3. 启用调试模式查看详细日志

## 📄 许可证

MIT License

---

**Python 版本：** 3.6+
**依赖：** requests
**作者：** Roninxj
