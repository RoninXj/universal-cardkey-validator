# 青龙面板安装故障排除

## 🚨 常见问题：GitHub 访问失败

### 问题症状

**Python 依赖安装失败：**
```
fatal: unable to access 'https://github.com/...': GnuTLS recv error (-110)
The TLS connection was non-properly terminated
```

**Node.js 依赖安装失败：**
```
Error: getaddrinfo ENOTFOUND github.com
```

### 原因分析

- 青龙面板服务器无法访问 GitHub
- 网络不稳定或超时
- 防火墙限制
- DNS 解析问题

---

## ✅ 解决方案

### 方案1：使用 GitHub 镜像（推荐）⭐

#### Python 依赖

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 使用 ghproxy 镜像安装
pip3 install git+https://ghproxy.com/https://github.com/RoninXj/universal-cardkey-validator.git
```

#### Node.js 依赖

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 进入脚本目录
cd /ql/scripts

# 配置 npm 镜像
npm config set registry https://registry.npmmirror.com

# 安装依赖
npm install github:RoninXj/universal-cardkey-validator#v1.1.0
```

---

### 方案2：手动下载文件（最稳定）⭐⭐

#### Python 脚本

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 进入脚本目录
cd /ql/scripts

# 下载 Python 模块文件
wget https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey_validator.py

# 或使用 curl
curl -o cardkey_validator.py https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey_validator.py
```

然后在脚本中直接导入：
```python
from cardkey_validator import initialize_card_key_validator, get_card_key_validator
```

#### Node.js 脚本

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 进入脚本目录
cd /ql/scripts

# 下载 Node.js 模块文件
wget https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey-validator.js

# 或使用 curl
curl -o cardkey-validator.js https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey-validator.js
```

然后在脚本中直接引用：
```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('./cardkey-validator.js');
```

---

### 方案3：配置代理

如果你有代理服务器：

#### Git 代理

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 配置 Git 代理
git config --global http.proxy http://proxy_server:port
git config --global https.proxy https://proxy_server:port

# 重新安装
pip3 install git+https://github.com/RoninXj/universal-cardkey-validator.git
```

#### npm 代理

```bash
# 配置 npm 代理
npm config set proxy http://proxy_server:port
npm config set https-proxy http://proxy_server:port

# 重新安装
npm install github:RoninXj/universal-cardkey-validator#v1.1.0
```

---

### 方案4：增加超时时间

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 设置 Git 超时
export GIT_HTTP_LOW_SPEED_LIMIT=1000
export GIT_HTTP_LOW_SPEED_TIME=600

# 重新安装
pip3 install git+https://github.com/RoninXj/universal-cardkey-validator.git
```

---

## 📝 推荐方案总结

### 最简单：方案2（手动下载）

**优点：**
- ✅ 最稳定，不依赖 GitHub 访问
- ✅ 使用镜像加速，速度快
- ✅ 一次下载，永久使用

**步骤：**
1. 下载文件到脚本目录
2. 在脚本中直接导入
3. 无需安装依赖

### 最标准：方案1（镜像安装）

**优点：**
- ✅ 标准的包管理方式
- ✅ 使用镜像加速
- ✅ 便于更新

**步骤：**
1. 使用 ghproxy 镜像
2. 通过 pip/npm 安装
3. 正常使用

---

## 🔗 镜像地址

### GitHub 文件镜像

```
https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey_validator.py
https://ghproxy.com/https://raw.githubusercontent.com/RoninXj/universal-cardkey-validator/master/cardkey-validator.js
```

### GitHub 仓库镜像

```
https://ghproxy.com/https://github.com/RoninXj/universal-cardkey-validator.git
```

### npm 镜像

```
https://registry.npmmirror.com
```

---

## ✅ 验证安装

### Python

```bash
# 进入 Python 环境
python3

# 尝试导入
>>> from cardkey_validator import initialize_card_key_validator
>>> print("安装成功")
```

### Node.js

```bash
# 进入 Node.js 环境
node

# 尝试导入
> const { initializeCardKeyValidator } = require('universal-cardkey-validator');
> console.log("安装成功");
```

---

## 📞 需要帮助？

如果以上方案都无法解决问题：

1. 检查青龙面板网络连接
2. 检查防火墙设置
3. 尝试重启青龙容器
4. 查看完整错误日志

---

**最后更新：** 2024-10-31
