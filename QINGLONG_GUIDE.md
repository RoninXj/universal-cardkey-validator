# 青龙面板使用通用卡密模块指南

> **本指南适用于在青龙面板中使用通用卡密验证模块**

## 📚 文档导航

- **[快速开始](QUICK_START.md)** - 5分钟快速集成
- **[完整文档](README-UNIVERSAL.md)** - 完整 API 文档
- **[模块指南](CARDKEY_MODULE_GUIDE.md)** - 模块化使用指南
- **[安装指南](INSTALL_GUIDE.md)** - 安装和部署指南
- **[青龙面板](QINGLONG_GUIDE.md)** - 你正在阅读 ⭐
- **[文档索引](DOCUMENTATION_INDEX.md)** - 所有文档导航

## 📖 概述

本模块是一个通用的卡密验证解决方案，可以用于任何脚本项目：
- 快手脚本
- 抖音脚本
- 爬虫脚本
- 自动化脚本
- 其他任何需要卡密验证的脚本

## 🎯 方案对比

### 方案1：使用青龙面板依赖管理（推荐）⭐

**优点：**
- ✅ 标准的 npm 依赖管理方式
- ✅ 统一管理，便于更新和维护
- ✅ 所有脚本共享同一模块，节省空间
- ✅ 版本控制清晰，支持版本回滚
- ✅ 符合 Node.js 最佳实践

**缺点：**
- ❌ 需要在青龙面板配置依赖
- ❌ 首次安装需要一定时间
- ❌ 需要 GitHub 访问权限

**适用场景：** 
- 多个脚本使用同一模块
- 长期维护的项目
- 需要版本管理的场景

### 方案2：动态加载 GitHub 原始文件

**优点：**
- ✅ 无需预先安装依赖
- ✅ 支持自动更新（可配置缓存）
- ✅ 脚本相对独立
- ✅ 适合快速测试

**缺点：**
- ❌ 首次加载需要网络连接
- ❌ GitHub 访问可能较慢或不稳定
- ❌ 需要额外的加载器代码
- ❌ 每个脚本都要包含加载逻辑

**适用场景：** 
- 临时测试和开发
- 单个脚本项目
- 需要快速部署的场景

### 方案3：内嵌模块代码

**优点：**
- ✅ 无需网络请求，完全离线运行
- ✅ 完全独立，不依赖外部资源
- ✅ 加载速度最快
- ✅ 适合网络受限环境

**缺点：**
- ❌ 每个脚本都要复制完整代码
- ❌ 更新模块需要修改所有脚本
- ❌ 代码冗余，维护成本高
- ❌ 脚本文件体积大

**适用场景：** 
- 网络不稳定或无网络环境
- 单个独立脚本
- 对稳定性要求极高的场景

## 📝 方案1：使用依赖管理（推荐）⭐

### 步骤1：发布模块到 GitHub

#### 1.1 准备模块文件

确保你的项目包含以下文件：
- `cardkey-validator.js` - 核心模块代码
- `package.json` - 模块配置文件
- `README-UNIVERSAL.md` - 模块说明文档
- `.gitignore` - Git 忽略文件配置

#### 1.2 上传到 GitHub

在本地项目目录执行：

```bash
# 初始化 Git 仓库
git init

# 添加文件
git add cardkey-validator.js package.json README-UNIVERSAL.md .gitignore

# 提交
git commit -m "通用卡密验证模块 v1.0.0"

# 添加远程仓库（替换 your-username 为你的 GitHub 用户名）
git remote add origin https://github.com/your-username/universal-cardkey-validator.git

# 推送到 GitHub
git branch -M main
git push -u origin main

# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### 步骤2：在青龙面板中安装依赖

#### 方法A：通过 Web 界面安装（推荐）

1. 登录青龙面板
2. 进入 **依赖管理**
3. 选择 **NodeJs** 标签
4. 点击 **新建依赖**
5. 输入依赖名称：
   ```
   github:your-username/universal-cardkey-validator#v1.0.0
   ```
6. 点击 **确定**
7. 等待安装完成

#### 方法B：通过命令行安装

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 进入脚本目录
cd /ql/scripts

# 安装依赖
npm install github:your-username/universal-cardkey-validator#v1.0.0
```

### 步骤3：在脚本中使用模块

在你的脚本文件开头添加：

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化卡密验证器
initializeCardKeyValidator();

// 在需要验证的地方使用
async function yourFunction() {
    const validator = getCardKeyValidator();
    const result = await validator.verify();
    
    if (!result.success) {
        console.log('卡密验证失败:', result.message);
        return;
    }
    
    // 继续执行你的逻辑...
}
```

### 步骤4：配置环境变量

在青龙面板的 **环境变量** 中添加：

```bash
# 必需：卡密
CARD_KEY=your_card_key_here

# 可选：验证接口地址
VERIFY_URL=https://your-api.com/verify

# 可选：缓存超时时间（秒）
VERIFY_CACHE_TIMEOUT=3600
```

### 步骤5：创建定时任务

在青龙面板的 **定时任务** 中创建任务：
- **名称**：你的脚本名称
- **命令**：`task your-script.js`
- **定时规则**：根据需求设置（如：`0 */2 * * *`）

---

## 📝 方案2：动态加载 GitHub 文件

如果不想使用依赖管理，可以动态加载模块。

### 创建加载器

创建一个加载器文件 `cardkey-loader.js`（可选）：

```javascript
/**
 * 卡密模块加载器 - 适用于青龙面板
 * 支持从 GitHub 动态加载或使用本地缓存
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// 配置
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/your-username/kuaishou-cardkey-validator/main/cardkey-validator.js';
const CACHE_DIR = path.join(__dirname, '.cardkey-cache');
const CACHE_FILE = path.join(CACHE_DIR, 'cardkey-validator.js');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时

/**
 * 下载文件
 */
function downloadFile(url) {
    return new Promise((resolve, reject) => {
        const client = url.startsWith('https') ? https : http;
        
        client.get(url, (res) => {
            if (res.statusCode === 302 || res.statusCode === 301) {
                // 处理重定向
                return downloadFile(res.headers.location).then(resolve).catch(reject);
            }
            
            if (res.statusCode !== 200) {
                reject(new Error(`下载失败，状态码: ${res.statusCode}`));
                return;
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

/**
 * 检查缓存是否有效
 */
function isCacheValid() {
    try {
        if (!fs.existsSync(CACHE_FILE)) {
            return false;
        }
        
        const stats = fs.statSync(CACHE_FILE);
        const age = Date.now() - stats.mtimeMs;
        return age < CACHE_DURATION;
    } catch (error) {
        return false;
    }
}

/**
 * 保存缓存
 */
function saveCache(content) {
    try {
        if (!fs.existsSync(CACHE_DIR)) {
            fs.mkdirSync(CACHE_DIR, { recursive: true });
        }
        fs.writeFileSync(CACHE_FILE, content, 'utf8');
    } catch (error) {
        console.log('⚠️ 保存缓存失败:', error.message);
    }
}

/**
 * 读取缓存
 */
function readCache() {
    try {
        return fs.readFileSync(CACHE_FILE, 'utf8');
    } catch (error) {
        return null;
    }
}

/**
 * 加载卡密模块
 */
async function loadCardKeyModule() {
    console.log('🔄 加载卡密验证模块...');
    
    // 1. 检查缓存
    if (isCacheValid()) {
        console.log('✅ 使用缓存的卡密模块');
        const cachedCode = readCache();
        if (cachedCode) {
            try {
                const module = { exports: {} };
                eval(cachedCode);
                return module.exports;
            } catch (error) {
                console.log('⚠️ 缓存模块加载失败，尝试重新下载');
            }
        }
    }
    
    // 2. 从 GitHub 下载
    try {
        console.log('📥 从 GitHub 下载卡密模块...');
        const code = await downloadFile(GITHUB_RAW_URL);
        
        // 保存缓存
        saveCache(code);
        
        // 执行代码
        const module = { exports: {} };
        eval(code);
        
        console.log('✅ 卡密模块加载成功');
        return module.exports;
    } catch (error) {
        console.log('❌ 从 GitHub 下载失败:', error.message);
        
        // 3. 尝试使用过期的缓存
        const cachedCode = readCache();
        if (cachedCode) {
            console.log('⚠️ 使用过期的缓存模块');
            try {
                const module = { exports: {} };
                eval(cachedCode);
                return module.exports;
            } catch (error) {
                console.log('❌ 缓存模块也无法加载');
            }
        }
        
        throw new Error('无法加载卡密模块');
    }
}

module.exports = { loadCardKeyModule };
```

### 步骤3：在脚本中使用

修改你的脚本文件（例如 `ksjsb-with-cardkey.js`）：

```javascript
const request = require("request");
const querystring = require("querystring");
const { SocksProxyAgent } = require("socks-proxy-agent");

process.noDeprecation = true;

// ========== 动态加载卡密模块 ==========
let CardKeyValidator, initializeCardKeyValidator, getCardKeyValidator;

async function loadCardKeyModuleFromGitHub() {
    const https = require('https');
    const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/your-username/kuaishou-cardkey-validator/main/cardkey-validator.js';
    
    return new Promise((resolve, reject) => {
        https.get(GITHUB_RAW_URL, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`下载失败，状态码: ${res.statusCode}`));
                return;
            }

            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    const module = { exports: {} };
                    eval(data);
                    resolve(module.exports);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// 在脚本开始时加载模块
(async () => {
    try {
        console.log('🔄 加载卡密验证模块...');
        const cardkeyModule = await loadCardKeyModuleFromGitHub();
        CardKeyValidator = cardkeyModule.CardKeyValidator;
        initializeCardKeyValidator = cardkeyModule.initializeCardKeyValidator;
        getCardKeyValidator = cardkeyModule.getCardKeyValidator;
        console.log('✅ 卡密模块加载成功');
        
        // 继续执行主程序
        await main();
    } catch (error) {
        console.log('❌ 卡密模块加载失败:', error.message);
        process.exit(1);
    }
})();

async function main() {
    // ========== 原有代码开始 ==========
    
    // ... 其他代码 ...
    
    // 初始化卡密验证器
    initializeCardKeyValidator();
    
    // ... 其他代码 ...
}
```

## 📝 方案2：内嵌模块代码（最简单）

直接将 `cardkey-validator.js` 的代码复制到脚本开头：

```javascript
const request = require("request");
const querystring = require("querystring");
const { SocksProxyAgent } = require("socks-proxy-agent");

process.noDeprecation = true;

// ========== 卡密验证模块（内嵌） ==========
class CardKeyValidator {
    constructor(cardKey, options = {}) {
        this.cardKey = cardKey;
        this.verifyUrl = options.verifyUrl || process.env.VERIFY_URL || "http://3.xjyyds.cf:21442/api/verify";
        this.cacheTimeout = parseInt(options.cacheTimeout || process.env.VERIFY_CACHE_TIMEOUT || "3600", 10) * 1000;
        this.isVerified = false;
        this.verifyTime = null;
        this.verifyResult = null;
    }
    
    // ... 完整的类代码 ...
}

let globalCardKeyValidator = null;

function initializeCardKeyValidator(options = {}) {
    // ... 完整的函数代码 ...
}

function getCardKeyValidator() {
    return globalCardKeyValidator;
}
// ========== 卡密验证模块结束 ==========

// ... 原有脚本代码 ...
```

## 📝 方案3：使用青龙面板依赖管理

### 步骤1：在青龙面板中添加依赖

1. 登录青龙面板
2. 进入"依赖管理"
3. 添加 NodeJs 依赖：
   ```
   github:your-username/kuaishou-cardkey-validator
   ```

### 步骤2：在脚本中引用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('kuaishou-cardkey-validator');
```

### 步骤3：重启青龙面板容器

```bash
docker restart qinglong
```

## 🎯 推荐方案选择

### 根据你的场景选择合适的方案：

| 场景 | 推荐方案 | 理由 |
|------|---------|------|
| **多个脚本使用** | 方案1（依赖管理）⭐ | 统一管理，便于维护和更新 |
| **长期维护项目** | 方案1（依赖管理）⭐ | 版本控制清晰，符合最佳实践 |
| **网络稳定环境** | 方案1（依赖管理）⭐ | 标准的 npm 依赖管理方式 |
| **快速测试开发** | 方案2（动态加载） | 无需预先安装，快速部署 |
| **单个脚本项目** | 方案2（动态加载） | 脚本相对独立，便于分发 |
| **网络不稳定** | 方案3（内嵌代码） | 完全离线运行，最稳定 |
| **网络受限环境** | 方案3（内嵌代码） | 无需外部资源，完全独立 |

### 我的推荐

**首选：方案1（依赖管理）**
- 这是最标准、最专业的方式
- 适合大多数场景
- 便于长期维护

**备选：方案2（动态加载）**
- 适合快速测试
- 适合单个脚本项目

**最后：方案3（内嵌代码）**
- 仅在网络受限时使用
- 维护成本最高

## 📋 完整示例

### 方案1完整示例（推荐）

```javascript
const request = require("request");
const querystring = require("querystring");
const { SocksProxyAgent } = require("socks-proxy-agent");

process.noDeprecation = true;

// ========== 卡密模块加载器 ==========
let initializeCardKeyValidator, getCardKeyValidator;

async function loadCardKeyModule() {
    const https = require('https');
    const fs = require('fs');
    const path = require('path');
    
    const GITHUB_URL = 'https://raw.githubusercontent.com/your-username/kuaishou-cardkey-validator/main/cardkey-validator.js';
    const CACHE_FILE = path.join(__dirname, '.cardkey-validator-cache.js');
    const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24小时
    
    // 检查缓存
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const stats = fs.statSync(CACHE_FILE);
            if (Date.now() - stats.mtimeMs < CACHE_DURATION) {
                console.log('✅ 使用缓存的卡密模块');
                const code = fs.readFileSync(CACHE_FILE, 'utf8');
                const module = { exports: {} };
                eval(code);
                return module.exports;
            }
        }
    } catch (error) {
        console.log('⚠️ 读取缓存失败');
    }
    
    // 从 GitHub 下载
    return new Promise((resolve, reject) => {
        console.log('📥 从 GitHub 下载卡密模块...');
        https.get(GITHUB_URL, (res) => {
            if (res.statusCode !== 200) {
                reject(new Error(`下载失败: ${res.statusCode}`));
                return;
            }
            
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    // 保存缓存
                    fs.writeFileSync(CACHE_FILE, data, 'utf8');
                    
                    // 加载模块
                    const module = { exports: {} };
                    eval(data);
                    console.log('✅ 卡密模块加载成功');
                    resolve(module.exports);
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// ========== 主程序 ==========
(async () => {
    try {
        // 加载卡密模块
        const cardkeyModule = await loadCardKeyModule();
        initializeCardKeyValidator = cardkeyModule.initializeCardKeyValidator;
        getCardKeyValidator = cardkeyModule.getCardKeyValidator;
        
        // 初始化卡密验证器
        initializeCardKeyValidator();
        
        // 继续执行原有代码
        await runMainScript();
    } catch (error) {
        console.log('❌ 程序启动失败:', error.message);
        process.exit(1);
    }
})();

async function runMainScript() {
    // ========== 原有脚本代码 ==========
    
    // ... 你的原有代码 ...
    
    class KuaishouAdTask {
        async requestSignService(requestData, description) {
            const validator = getCardKeyValidator();
            if (!validator) {
                console.log('卡密验证器未初始化');
                return null;
            }
            
            const verifyResult = await validator.verify();
            if (!verifyResult.success) {
                console.log('卡密验证失败:', verifyResult.message);
                return null;
            }
            
            const requestDataWithKey = {
                ...requestData,
                card_key: validator.cardKey
            };
            
            // ... 发送请求 ...
        }
    }
    
    // ... 其他代码 ...
}
```

## ⚠️ 注意事项

### 通用注意事项

1. **环境变量必需**：无论使用哪种方案，都必须设置 `CARD_KEY` 或 `km` 环境变量
2. **GitHub 访问**：方案1和方案2需要确保青龙面板能访问 GitHub
3. **版本管理**：建议使用版本标签（如 `#v1.0.0`），便于版本控制和回滚
4. **网络稳定性**：方案1和方案2首次使用需要网络连接

### 方案1（依赖管理）注意事项

- 安装依赖后需要重启相关任务
- 更新依赖时建议先删除旧版本
- 私有仓库需要配置 GitHub 访问令牌

### 方案2（动态加载）注意事项

- 使用缓存机制避免频繁下载
- 首次运行需要网络连接
- GitHub 访问慢时可使用镜像

### 方案3（内嵌代码）注意事项

- 更新模块需要手动修改所有脚本
- 代码冗余，维护成本高
- 适合网络受限环境

## 🔧 故障排除

### 问题1：无法访问 GitHub

**症状：**
```
Error: getaddrinfo ENOTFOUND raw.githubusercontent.com
```

**解决方案：**
1. 使用 GitHub 镜像加速：
   ```
   https://ghproxy.com/https://raw.githubusercontent.com/...
   ```
2. 或使用方案3（内嵌代码），完全离线运行
3. 或配置 GitHub 代理

### 问题2：依赖安装失败

**症状：**
```
npm ERR! 404 Not Found
```

**解决方案：**
1. 检查 GitHub 仓库地址是否正确
2. 确认仓库是 Public 或已配置访问令牌
3. 尝试使用完整的 GitHub URL：
   ```bash
   npm install https://github.com/your-username/universal-cardkey-validator
   ```

### 问题3：缓存失效（方案2）

**症状：**
模块频繁重新下载

**解决方案：**
1. 手动删除缓存文件：`.cardkey-validator-cache.js`
2. 调整缓存时间（在加载器代码中修改 `CACHE_DURATION`）
3. 检查文件系统权限

### 问题4：eval 安全警告（方案2）

**症状：**
```
Warning: eval can be harmful
```

**解决方案：**
- 这是动态加载的必要方式，属于正常现象
- 确保只从可信的 GitHub 仓库加载代码
- 或使用方案1（依赖管理）或方案3（内嵌代码）

### 问题5：模块版本冲突

**症状：**
```
Error: Cannot find module 'universal-cardkey-validator'
```

**解决方案：**
```bash
# 清除 npm 缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules

# 重新安装
npm install
```

### 问题6：青龙面板权限问题

**症状：**
```
EACCES: permission denied
```

**解决方案：**
```bash
# 进入青龙容器
docker exec -it qinglong bash

# 修复权限
chown -R root:root /ql/scripts
chmod -R 755 /ql/scripts

# 重新安装依赖
cd /ql/scripts
npm install
```
