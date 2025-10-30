# 快手脚本卡密验证模块

快手脚本的卡密验证模块，提供卡密验证功能，支持缓存机制�?

## 安装

### �?GitHub 安装

```bash
npm install github:RoninXj/universal-cardkey-validator
```

### �?npm 安装（如果已发布�?

```bash
npm install universal-cardkey-validator
```

## 使用方法

### 1. 基本使用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化卡密验证器（需要设置环境变�?CARD_KEY �?km�?
initializeCardKeyValidator();

// 获取验证器实�?
const validator = getCardKeyValidator();

// 验证卡密
const result = await validator.verify();
if (result.success) {
    console.log('卡密验证成功');
} else {
    console.log('卡密验证失败:', result.message);
}
```

### 2. 在签名服务中使用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始�?
initializeCardKeyValidator();

// 在请求签名服务时
async function requestSignService(requestData, description) {
    const validator = getCardKeyValidator();
    
    if (!validator) {
        console.log('卡密验证器未初始�?);
        return null;
    }

    // 验证卡密
    const verifyResult = await validator.verify();
    if (!verifyResult.success) {
        console.log('卡密验证失败:', verifyResult.message);
        return null;
    }

    // 添加卡密到请求体
    const requestDataWithKey = {
        ...requestData,
        card_key: validator.cardKey
    };

    // 发送请�?..
}
```

## 环境变量

- `CARD_KEY` �?`km`: 卡密（必需�?
- `VERIFY_URL`: 验证接口地址（可选，默认: http://3.xjyyds.cf:21442/api/verify�?
- `VERIFY_CACHE_TIMEOUT`: 缓存超时时间，单位秒（可选，默认: 3600�?
- `DEV_MODE`: 开发模式，设置�?"1" �?"true" 启用调试日志（可选）

## 配置选项

```javascript
initializeCardKeyValidator({
    required: true,              // 是否必须提供卡密，默�?true
    verifyUrl: 'http://...',     // 自定义验证接�?
    cacheTimeout: 3600           // 缓存超时时间（秒�?
});
```

## API

### initializeCardKeyValidator(options)

初始化卡密验证器�?

**参数�?*
- `options` (Object, 可�?
  - `required` (Boolean): 是否必须提供卡密，默�?true
  - `verifyUrl` (String): 验证接口地址
  - `cacheTimeout` (Number): 缓存超时时间（秒�?

**返回�?*
- `CardKeyValidator` 实例�?`null`

### getCardKeyValidator()

获取全局卡密验证器实例�?

**返回�?*
- `CardKeyValidator` 实例�?`null`

### CardKeyValidator.verify()

验证卡密（异步方法）�?

**返回�?*
- `Promise<Object>`: 验证结果
  - `success` (Boolean): 是否成功
  - `message` (String): 消息
  - `data` (Object): 验证数据（成功时�?

### CardKeyValidator.getStatus()

获取验证器状态�?

**返回�?*
- `Object`: 状态信�?
  - `isVerified` (Boolean): 是否已验�?
  - `verifyTime` (Number): 验证时间�?
  - `cacheValid` (Boolean): 缓存是否有效

## 示例

### 完整示例

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 设置环境变量
process.env.CARD_KEY = 'your_card_key_here';
process.env.DEV_MODE = '1'; // 启用调试模式

// 初始�?
initializeCardKeyValidator({
    cacheTimeout: 1800 // 30分钟缓存
});

// 使用
async function main() {
    const validator = getCardKeyValidator();
    
    // 第一次验证（会请求服务器�?
    const result1 = await validator.verify();
    console.log('第一次验�?', result1);
    
    // 第二次验证（使用缓存�?
    const result2 = await validator.verify();
    console.log('第二次验�?', result2);
    
    // 查看状�?
    console.log('验证器状�?', validator.getStatus());
}

main();
```

## 许可�?

MIT

## 贡献

欢迎提交 Issue �?Pull Request�?
