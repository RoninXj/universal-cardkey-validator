# 快速开始指南

> 5分钟快速集成通用卡密验证模块

## 🚀 三步快速开始

### 步骤1：发布模块到 GitHub（首次）

```bash
# 在项目目录执行
git init
git add cardkey-validator.js package.json README-UNIVERSAL.md .gitignore
git commit -m "通用卡密验证模块 v1.0.0"
git remote add origin https://github.com/your-username/universal-cardkey-validator.git
git push -u origin main
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

### 步骤2：安装模块

**本地项目：**
```bash
npm install github:your-username/universal-cardkey-validator#v1.0.0
```

**青龙面板：**
在依赖管理中添加：
```
github:your-username/universal-cardkey-validator#v1.0.0
```

### 步骤3：在脚本中使用

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

// 使用
async function main() {
    const validator = getCardKeyValidator();
    const result = await validator.verify();
    
    if (!result.success) {
        console.log('卡密验证失败:', result.message);
        return;
    }
    
    console.log('✅ 验证成功，开始执行任务');
    // 你的业务逻辑...
}

main();
```

### 步骤4：配置环境变量

```bash
# 必需
CARD_KEY=your_card_key_here

# 可选
VERIFY_URL=https://your-api.com/verify
VERIFY_CACHE_TIMEOUT=3600
```

## ✅ 完成！

现在你的脚本已经集成了卡密验证功能。

## 📚 更多文档

- [完整 API 文档](README-UNIVERSAL.md)
- [模块使用指南](CARDKEY_MODULE_GUIDE.md)
- [安装部署指南](INSTALL_GUIDE.md)
- [青龙面板指南](QINGLONG_GUIDE.md)

## 💡 常用示例

### 示例1：基础验证

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

initializeCardKeyValidator();

async function task() {
    const validator = getCardKeyValidator();
    const result = await validator.verify();
    
    if (result.success) {
        console.log('验证成功');
        // 执行任务...
    }
}
```

### 示例2：自动添加卡密到请求

```javascript
const { initializeCardKeyValidator, verifyAndAddCardKey } = require('universal-cardkey-validator');

initializeCardKeyValidator();

async function sendRequest(data) {
    // 自动验证并添加卡密
    const dataWithKey = await verifyAndAddCardKey(data);
    if (!dataWithKey) return;
    
    // 发送请求...
}
```

### 示例3：自定义配置

```javascript
const { initializeCardKeyValidator } = require('universal-cardkey-validator');

initializeCardKeyValidator({
    verifyUrl: 'https://your-api.com/verify',
    cacheTimeout: 1800,
    customParams: {
        app_id: 'your_app_id'
    },
    silent: false
});
```

## 🔧 快速故障排除

### 模块加载失败？

```bash
npm install github:your-username/universal-cardkey-validator#v1.0.0
```

### 卡密验证失败？

检查环境变量：
```bash
echo $CARD_KEY
```

### 需要调试？

启用调试模式：
```bash
export DEV_MODE=1
```

## 🎯 下一步

- 查看 [完整文档](README-UNIVERSAL.md) 了解所有功能
- 查看 [青龙面板指南](QINGLONG_GUIDE.md) 了解青龙面板部署
- 查看 [模块指南](CARDKEY_MODULE_GUIDE.md) 了解高级用法
