# Universal CardKey Validator - Python

通用卡密验证模块 - Python 版本

## 安装

### 从 GitHub 安装

```bash
pip install git+https://github.com/RoninXj/universal-cardkey-validator.git
```

### 从本地安装

```bash
git clone https://github.com/RoninXj/universal-cardkey-validator.git
cd universal-cardkey-validator
pip install .
```

## 快速使用

```python
import os
from cardkey_validator import initialize_card_key_validator, get_card_key_validator

# 设置环境变量
os.environ['CARD_KEY'] = 'your_card_key_here'

# 初始化
initialize_card_key_validator()

# 验证
validator = get_card_key_validator()
result = validator.verify()

if result['success']:
    print('✅ 验证成功')
else:
    print(f'❌ 验证失败: {result["message"]}')
```

## 文档

查看 [PYTHON_GUIDE.md](PYTHON_GUIDE.md) 了解详细使用方法。

## 许可证

MIT License
