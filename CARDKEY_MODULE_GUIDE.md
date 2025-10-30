# 通用卡密模块使用指南

> **重要说明**：本模块已升级为通用卡密验证模块，适用于任何需要卡密验证的脚本项目，不仅限于快手脚本。

## 📚 文档导航

- **[快速开始](QUICK_START.md)** - 5分钟快速集成
- **[完整文档](README-UNIVERSAL.md)** - 完整 API 文档
- **[模块指南](CARDKEY_MODULE_GUIDE.md)** - 你正在阅读 ⭐
- **[安装指南](INSTALL_GUIDE.md)** - 安装和部署指南
- **[青龙面板](QINGLONG_GUIDE.md)** - 青龙面板专用指南
- **[文档索引](DOCUMENTATION_INDEX.md)** - 所有文档导航

## 📖 概述

本模块提供了一个完整的卡密验证解决方案，可以轻松集成到任何 Node.js 脚本项目中。无论你是开发快手脚本、抖音脚本、爬虫脚本还是其他自动化脚本，都可以使用这个模块来实现卡密验证功能。

## 🌟 模块特点

- ✅ **通用性强** - 不限于特定平台或脚本类型
- ✅ **简单易用** - 几行代码即可集成
- ✅ **高度可配置** - 支持自定义验证接口、参数、请求头
- ✅ **智能缓存** - 自动缓存验证结果，减少网络请求
- ✅ **完善的错误处理** - 详细的错误信息和状态反馈
- ✅ **青龙面板友好** - 完美支持青龙面板环境

## 📦 步骤1：发布模块到 GitHub

### 1.1 准备模块文件

确保你的项目包含以下文件：
- `cardkey-validator.js` - 核心模块代码
- `package.json` - 模块配置文件
- `README-UNIVERSAL.md` - 模块说明文档
- `.gitignore` - Git 忽略文件配置

### 1.2 创建 GitHub 仓库

1. 登录 GitHub
2. 点击右上角 "+" -> "New repository"
3. 填写仓库信息：
   - Repository name: `universal-cardkey-validator`（推荐）
   - Description: `通用卡密验证模块 - 适用于任何脚本项目`
   - 选择 Public（推荐）或 Private
4. 点击 "Create repository"

### 1.3 上传文件到 GitHub

在本地项目目录执行：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加模块文件
git add cardkey-validator.js package.json README-UNIVERSAL.md .gitignore

# 提交
git commit -m "Initial commit: 通用卡密验证模块 v1.0.0"

# 添加远程仓库（替换 your-username 为你的 GitHub 用户名）
git remote add origin https://github.com/your-username/universal-cardkey-validator.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

### 1.4 创建版本标签（推荐）

使用版本标签便于版本管理和回滚：

```bash
# 创建标签
git tag -a v1.0.0 -m "Release version 1.0.0 - 通用卡密验证模块"

# 推送标签到 GitHub
git push origin v1.0.0
```

### 1.5 验证发布

访问你的 GitHub 仓库页面，确认：
- ✅ 所有文件已上传
- ✅ 标签已创建（在 Releases 或 Tags 页面查看）
- ✅ README 文档正常显示

## 🚀 步骤2：在项目中使用

### 方法1：从 GitHub 安装（推荐）

在你的脚本项目目录执行：

```bash
# 安装最新版本
npm install github:your-username/universal-cardkey-validator

# 或安装指定版本
npm install github:your-username/universal-cardkey-validator#v1.0.0
```

### 方法2：在 package.json 中添加依赖

编辑 `package.json`：

```json
{
  "dependencies": {
    "universal-cardkey-validator": "github:your-username/universal-cardkey-validator#v1.0.0"
  }
}
```

然后运行：
```bash
npm install
```

### 方法3：青龙面板安装

在青龙面板的依赖管理中添加：
```
github:your-username/universal-cardkey-validator#v1.0.0
```

## 📝 步骤3：在脚本中集成模块

### 通用集成方式（适用于任何脚本）

#### 1. 删除原有的卡密验证代码

如果你的脚本中已经有卡密验证代码，删除以下部分：

```javascript
// 删除这些代码
class CardKeyValidator { ... }
let globalCardKeyValidator = null;
function initializeCardKeyValidator() { ... }
```

#### 2. 引入模块

在脚本开头添加：

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');
```

#### 3. 初始化验证器

在脚本初始化部分调用：

```javascript
// 基本初始化
initializeCardKeyValidator();

// 或自定义配置
initializeCardKeyValidator({
    verifyUrl: 'https://your-api.com/verify',
    cacheTimeout: 1800,
    customParams: {
        app_id: 'your_app_id'
    }
});
```

#### 4. 使用验证器

**方式A：手动验证并添加卡密**

```javascript
async function yourFunction(requestData) {
    const validator = getCardKeyValidator();
    if (!validator) {
        console.log('卡密验证器未初始化');
        return null;
    }

    // 验证卡密
    const verifyResult = await validator.verify();
    if (!verifyResult.success) {
        console.log('卡密验证失败:', verifyResult.message);
        return null;
    }

    // 添加卡密到请求
    const dataWithKey = {
        ...requestData,
        card_key: validator.cardKey
    };

    // 发送请求...
}
```

**方式B：使用辅助函数（推荐）**

```javascript
const { verifyAndAddCardKey } = require('universal-cardkey-validator');

async function yourFunction(requestData) {
    // 自动验证并添加卡密
    const dataWithKey = await verifyAndAddCardKey(requestData);
    if (!dataWithKey) {
        console.log('卡密验证失败');
        return null;
    }

    // 发送请求...
}
```

### 具体示例

#### 示例1：快手脚本

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

class KuaishouAdTask {
    async requestSignService(requestData, description) {
        const validator = getCardKeyValidator();
        if (!validator) return null;

        const verifyResult = await validator.verify();
        if (!verifyResult.success) return null;

        const requestDataWithKey = {
            ...requestData,
            card_key: validator.cardKey
        };

        // 发送请求...
    }
}
```

#### 示例2：抖音脚本

```javascript
const { initializeCardKeyValidator, verifyAndAddCardKey } = require('universal-cardkey-validator');

initializeCardKeyValidator({
    customParams: { platform: 'douyin' }
});

async function douyinTask() {
    const data = await verifyAndAddCardKey({ task: 'like' });
    if (!data) return;
    // 执行任务...
}
```

#### 示例3：通用爬虫

```javascript
const { createCardKeyValidator } = require('universal-cardkey-validator');

async function crawl(cardKey) {
    const validator = createCardKeyValidator(cardKey);
    const result = await validator.verify();
    if (!result.success) return;
    // 执行爬虫...
}
```

## 🔄 步骤4：更新模块

当模块有更新时：

### 本地项目更新

```bash
# 更新到最新版本
npm update universal-cardkey-validator

# 或安装指定新版本
npm install github:your-username/universal-cardkey-validator#v1.1.0
```

### 青龙面板更新

1. 进入依赖管理
2. 删除旧的 `universal-cardkey-validator` 依赖
3. 重新添加新版本：`github:your-username/universal-cardkey-validator#v1.1.0`

## 📋 完整示例

### 示例1：基础脚本结构

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化
initializeCardKeyValidator();

// 主函数
async function main() {
    const validator = getCardKeyValidator();
    
    // 验证卡密
    const result = await validator.verify();
    if (!result.success) {
        console.log('卡密验证失败，退出脚本');
        return;
    }
    
    console.log('卡密验证成功，开始执行任务');
    
    // 执行你的任务...
}

main();
```

### 示例2：快手脚本（完整）

```javascript
const request = require("request");
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化卡密验证器
initializeCardKeyValidator();

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

        // 发送请求...
        return requestDataWithKey;
    }
}
```

### 示例3：多平台通用脚本

```javascript
const { initializeCardKeyValidator, verifyAndAddCardKey } = require('universal-cardkey-validator');

// 根据平台配置不同的验证接口
const platform = process.env.PLATFORM || 'kuaishou';
const verifyUrls = {
    kuaishou: 'https://ks-api.com/verify',
    douyin: 'https://dy-api.com/verify',
    default: 'https://default-api.com/verify'
};

initializeCardKeyValidator({
    verifyUrl: verifyUrls[platform] || verifyUrls.default,
    customParams: {
        platform: platform
    }
});

async function universalTask(taskData) {
    const data = await verifyAndAddCardKey(taskData);
    if (!data) {
        console.log('卡密验证失败');
        return;
    }
    
    // 执行任务...
    console.log('任务执行中...');
}
```

## ⚠️ 注意事项

1. **环境变量**：必须设置 `CARD_KEY` 或 `km` 环境变量
2. **版本管理**：建议使用标签管理版本（如 v1.0.0），便于回滚
3. **依赖安装**：确保运行脚本前执行 `npm install`
4. **私有仓库**：如果使用私有仓库，需要配置 GitHub 访问令牌
5. **通用性**：模块设计为通用模块，可用于任何脚本项目
6. **自定义配置**：根据你的验证接口调整 `verifyUrl` 和其他参数

## 🎯 模块优势

✅ **通用性强**：适用于任何脚本项目，不限于特定平台
✅ **代码复用**：多个脚本共享同一个模块
✅ **统一更新**：修改模块后，所有脚本只需更新依赖
✅ **版本控制**：通过 Git 标签管理版本
✅ **易于维护**：模块代码独立，便于测试和维护
✅ **减少冗余**：脚本文件更简洁
✅ **高度可配置**：支持自定义验证接口、参数、请求头
✅ **智能缓存**：自动缓存验证结果，减少网络请求
✅ **完善的 API**：提供多种使用方式，满足不同需求

## 🔧 故障排除

### 常见问题

#### 问题1：模块加载失败

```
Error: Cannot find module 'universal-cardkey-validator'
```

**解决方案：**
1. 确认依赖已安装：`npm list universal-cardkey-validator`
2. 重新安装：`npm install github:your-username/universal-cardkey-validator#v1.0.0`
3. 检查 GitHub 仓库是否可访问

#### 问题2：卡密验证失败

**检查清单：**
- ✅ 确认环境变量 `CARD_KEY` 或 `km` 已设置
- ✅ 确认验证接口地址正确
- ✅ 检查网络连接
- ✅ 启用调试模式：`export DEV_MODE=1`

#### 问题3：GitHub 访问慢

**解决方案：**
- 使用 GitHub 镜像加速
- 或使用内嵌代码方式（不依赖 GitHub）

#### 问题4：版本更新问题

**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 重新安装指定版本
npm install github:your-username/universal-cardkey-validator#v1.1.0
```

## 📞 需要帮助？

如果在使用过程中遇到问题：
1. 检查环境变量是否正确设置
2. 确认模块已正确安装（`npm list universal-cardkey-validator`）
3. 查看调试日志（设置 `DEV_MODE=1`）
4. 查看 [完整文档](README-UNIVERSAL.md)
5. 查看 [青龙面板指南](QINGLONG_GUIDE.md)
