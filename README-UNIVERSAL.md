# 通用卡密验证模块

一个通用的卡密验证模块，适用于任何需要卡密验证的脚本项目。

## 📚 文档导航

- **[快速开始](QUICK_START.md)** - 5分钟快速集成 ⭐
- **[完整文档](README-UNIVERSAL.md)** - 你正在阅读
- **[模块指南](CARDKEY_MODULE_GUIDE.md)** - 模块化使用指南
- **[安装指南](INSTALL_GUIDE.md)** - 安装和部署指南
- **[青龙面板](QINGLONG_GUIDE.md)** - 青龙面板专用指南
- **[文档索引](DOCUMENTATION_INDEX.md)** - 所有文档导航

## ✨ 特性

- 🔐 **通用性强** - 适用于任何脚本项目，不限于特定平台
- 🚀 **简单易用** - 几行代码即可集成
- 💾 **智能缓存** - 自动缓存验证结果，减少网络请求
- ⚙️ **高度可配置** - 支持自定义验证接口、参数、请求头等
- 🎯 **青龙面板友好** - 完美支持青龙面板环境
- 📝 **完善的错误处理** - 详细的错误信息和状态反馈
- 🔧 **灵活的环境变量** - 支持多种环境变量配置方式

## 📦 安装

### 方法1：从 GitHub 安装（推荐）

```bash
# 安装最新版本
npm install github:your-username/universal-cardkey-validator

# 或安装指定版本
npm install github:your-username/universal-cardkey-validator#v1.0.0
```

### 方法2：从 npm 安装（如果已发布）

```bash
npm install universal-cardkey-validator
```

### 方法3：在 package.json 中添加依赖

```json
{
  "dependencies": {
    "universal-cardkey-validator": "github:your-username/universal-cardkey-validator#v1.0.0"
  }
}
```

然后运行 `npm install`

## 🚀 快速开始

### 基本使用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 1. 初始化（需要设置环境变量 CARD_KEY 或 km）
initializeCardKeyValidator();

// 2. 获取验证器实例
const validator = getCardKeyValidator();

// 3. 验证卡密
const result = await validator.verify();
if (result.success) {
    console.log('✅ 验证成功');
} else {
    console.log('❌ 验证失败:', result.message);
}
```

### 在请求中使用

```javascript
const { initializeCardKeyValidator, verifyAndAddCardKey } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

// 在发送请求前验证并添加卡密
async function sendRequest(requestData) {
    // 自动验证卡密并添加到请求数据中
    const dataWithKey = await verifyAndAddCardKey(requestData);
    
    if (!dataWithKey) {
        console.log('卡密验证失败');
        return null;
    }
    
    // 发送请求
    // ... 你的请求代码
}
```

## 📖 API 文档

### initializeCardKeyValidator(options)

初始化全局卡密验证器。

**参数：**
- `options` (Object, 可选)
  - `required` (Boolean): 是否必须提供卡密，默认 `true`
  - `verifyUrl` (String): 验证接口地址
  - `cacheTimeout` (Number): 缓存超时时间（秒），默认 3600
  - `customParams` (Object): 自定义验证参数
  - `customHeaders` (Object): 自定义请求头
  - `timeout` (Number): 请求超时时间（毫秒），默认 10000
  - `silent` (Boolean): 静默模式，不输出日志
  - `envKeys` (Array): 环境变量键名列表，默认 `['CARD_KEY', 'km']`

**返回：**
- `CardKeyValidator` 实例或 `null`

**示例：**
```javascript
// 基本使用
initializeCardKeyValidator();

// 自定义配置
initializeCardKeyValidator({
    verifyUrl: 'https://your-api.com/verify',
    cacheTimeout: 1800, // 30分钟
    customParams: {
        app_id: 'your_app_id'
    },
    silent: false
});

// 可选卡密（不强制要求）
initializeCardKeyValidator({
    required: false
});
```

### getCardKeyValidator()

获取全局卡密验证器实例。

**返回：**
- `CardKeyValidator` 实例或 `null`

### createCardKeyValidator(cardKey, options)

创建新的卡密验证器实例（不使用全局实例）。

**参数：**
- `cardKey` (String): 卡密
- `options` (Object): 配置选项（同 initializeCardKeyValidator）

**返回：**
- `CardKeyValidator` 实例

**示例：**
```javascript
const { createCardKeyValidator } = require('universal-cardkey-validator');

const validator = createCardKeyValidator('your_card_key', {
    verifyUrl: 'https://your-api.com/verify'
});

const result = await validator.verify();
```

### verifyAndAddCardKey(requestData, validator)

验证卡密并添加到请求数据中。

**参数：**
- `requestData` (Object): 原始请求数据
- `validator` (CardKeyValidator, 可选): 验证器实例，默认使用全局实例

**返回：**
- `Promise<Object|null>`: 添加了卡密的请求数据，验证失败返回 `null`

**示例：**
```javascript
const data = await verifyAndAddCardKey({
    user_id: '123',
    action: 'query'
});

if (data) {
    // data = { user_id: '123', action: 'query', card_key: 'xxx' }
}
```

### addCardKeyToRequest(requestData, validator)

直接添加卡密到请求数据（不验证）。

**参数：**
- `requestData` (Object): 原始请求数据
- `validator` (CardKeyValidator, 可选): 验证器实例，默认使用全局实例

**返回：**
- `Object`: 添加了卡密的请求数据

### CardKeyValidator 类方法

#### verify()

验证卡密（异步方法）。

**返回：**
- `Promise<Object>`: 验证结果
  - `success` (Boolean): 是否成功
  - `message` (String): 消息
  - `data` (Object): 验证数据（成功时）
  - `code` (String): 错误代码（失败时）

#### getStatus()

获取验证器状态。

**返回：**
- `Object`: 状态信息
  - `isVerified` (Boolean): 是否已验证
  - `verifyTime` (Number): 验证时间戳
  - `cacheValid` (Boolean): 缓存是否有效
  - `cardKey` (String): 卡密（脱敏显示）

#### clearCache()

清除缓存，下次调用 `verify()` 时会重新验证。

## 🌍 环境变量

### 必需变量

```bash
# 卡密（二选一）
CARD_KEY=your_card_key_here
# 或
km=your_card_key_here
```

### 可选变量

```bash
# 验证接口地址
VERIFY_URL=https://your-api.com/verify

# 缓存超时时间（秒）
VERIFY_CACHE_TIMEOUT=3600

# 开发模式（启用调试日志）
DEV_MODE=1
```

## 💡 使用示例

### 示例1：快手脚本

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

class KuaishouTask {
    async requestSignService(requestData) {
        const validator = getCardKeyValidator();
        
        // 验证卡密
        const verifyResult = await validator.verify();
        if (!verifyResult.success) {
            console.log('卡密验证失败');
            return null;
        }
        
        // 添加卡密到请求
        const dataWithKey = {
            ...requestData,
            card_key: validator.cardKey
        };
        
        // 发送请求...
    }
}
```

### 示例2：抖音脚本

```javascript
const { initializeCardKeyValidator, verifyAndAddCardKey } = require('universal-cardkey-validator');

initializeCardKeyValidator({
    verifyUrl: 'https://douyin-api.com/verify',
    customParams: {
        platform: 'douyin'
    }
});

async function douyinTask() {
    const requestData = {
        user_id: '123',
        task_type: 'like'
    };
    
    // 自动验证并添加卡密
    const data = await verifyAndAddCardKey(requestData);
    if (!data) return;
    
    // 发送请求...
}
```

### 示例3：通用爬虫脚本

```javascript
const { createCardKeyValidator } = require('universal-cardkey-validator');

// 为每个任务创建独立的验证器
async function crawlTask(cardKey, url) {
    const validator = createCardKeyValidator(cardKey, {
        verifyUrl: 'https://crawler-api.com/verify',
        silent: true // 静默模式
    });
    
    const result = await validator.verify();
    if (!result.success) {
        console.log('卡密无效，跳过任务');
        return;
    }
    
    // 执行爬虫任务...
}
```

### 示例4：多账号脚本

```javascript
const { createCardKeyValidator } = require('universal-cardkey-validator');

const accounts = [
    { username: 'user1', cardKey: 'key1' },
    { username: 'user2', cardKey: 'key2' }
];

for (const account of accounts) {
    const validator = createCardKeyValidator(account.cardKey);
    const result = await validator.verify();
    
    if (result.success) {
        console.log(`${account.username} 验证成功`);
        // 执行任务...
    } else {
        console.log(`${account.username} 验证失败: ${result.message}`);
    }
}
```

## 🎯 青龙面板使用

### 1. 安装依赖

在青龙面板的依赖管理中添加：

```
github:your-username/universal-cardkey-validator
```

### 2. 配置环境变量

在青龙面板的环境变量中添加：

```bash
CARD_KEY=your_card_key_here
```

### 3. 在脚本中使用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

// 使用
async function main() {
    const validator = getCardKeyValidator();
    const result = await validator.verify();
    
    if (!result.success) {
        console.log('卡密验证失败，退出脚本');
        return;
    }
    
    // 继续执行脚本...
}

main();
```

## 🔧 高级配置

### 自定义验证接口

```javascript
initializeCardKeyValidator({
    verifyUrl: 'https://your-api.com/verify',
    customParams: {
        app_id: 'your_app_id',
        version: '1.0.0'
    },
    customHeaders: {
        'X-API-Key': 'your_api_key',
        'X-Platform': 'qinglong'
    }
});
```

### 自定义环境变量

```javascript
// 使用自定义的环境变量名
initializeCardKeyValidator({
    envKeys: ['MY_CARD_KEY', 'CUSTOM_KEY', 'CARD_KEY']
});
```

### 错误处理

```javascript
const validator = getCardKeyValidator();
const result = await validator.verify();

if (!result.success) {
    switch (result.code) {
        case 'NETWORK_ERROR':
            console.log('网络连接失败，请检查网络');
            break;
        case 'EXPIRED':
            console.log('卡密已过期，请续费');
            break;
        case 'INVALID':
            console.log('卡密无效');
            break;
        default:
            console.log('验证失败:', result.message);
    }
}
```

## 📋 验证接口规范

模块期望验证接口返回以下格式的 JSON：

### 请求格式

```json
{
  "card_key": "your_card_key",
  "custom_param1": "value1"
}
```

### 响应格式（成功）

```json
{
  "success": true,
  "code": 200,
  "message": "验证成功",
  "data": {
    "status": "active",
    "expire_time": "2024-12-31",
    "remaining_calls": 1000
  }
}
```

### 响应格式（失败）

```json
{
  "success": false,
  "code": "EXPIRED",
  "message": "卡密已过期"
}
```

## 🐛 故障排除

### 问题1：模块加载失败

```
Error: Cannot find module 'universal-cardkey-validator'
```

**解决方案：**
```bash
npm install github:your-username/universal-cardkey-validator
```

### 问题2：卡密验证失败

**检查清单：**
1. 确认环境变量 `CARD_KEY` 或 `km` 已设置
2. 确认验证接口地址正确
3. 检查网络连接
4. 启用调试模式查看详细日志：`export DEV_MODE=1`

### 问题3：缓存问题

如果需要强制重新验证：

```javascript
const validator = getCardKeyValidator();
validator.clearCache(); // 清除缓存
const result = await validator.verify(); // 重新验证
```

## 📄 许可证

MIT

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📞 支持

如有问题，请提交 Issue 或联系作者。
