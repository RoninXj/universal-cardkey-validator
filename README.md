# 通用卡密验证模块

> 一个通用的卡密验证模块，适用于任何需要卡密验证的脚本项目

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D12.0.0-brightgreen)](https://nodejs.org/)

## 📚 快速导�?

### 🚀 快速开�?
- **[5分钟快速开始](QUICK_START.md)** - 最快上手方�?�?

### 📖 完整文档
- **[完整 API 文档](README-UNIVERSAL.md)** - 详细�?API 说明和使用示�?
- **[模块使用指南](CARDKEY_MODULE_GUIDE.md)** - 模块化集成指�?
- **[安装部署指南](INSTALL_GUIDE.md)** - 完整的安装和部署流程
- **[青龙面板指南](QINGLONG_GUIDE.md)** - 青龙面板专用指南
- **[文档索引](DOCUMENTATION_INDEX.md)** - 所有文档导�?

### 📝 其他文档
- **[更新日志](CHANGELOG.md)** - 版本更新记录
- **[公网访问配置](PUBLIC_ACCESS_GUIDE.md)** - 公网访问配置指南

## �?特�?

- 🔐 **通用性强** - 适用于任何脚本项目，不限于特定平�?
- 🚀 **简单易�?* - 几行代码即可集成
- 💾 **智能缓存** - 自动缓存验证结果，减少网络请�?
- ⚙️ **高度可配�?* - 支持自定义验证接口、参数、请求头�?
- 🎯 **青龙面板友好** - 完美支持青龙面板环境
- 📝 **完善的错误处�?* - 详细的错误信息和状态反�?

## 📦 安装

```bash
# �?GitHub 安装
npm install github:RoninXj/universal-cardkey-validator#v1.0.0
```

## 🚀 快速使�?

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始�?
initializeCardKeyValidator();

// 使用
async function main() {
    const validator = getCardKeyValidator();
    const result = await validator.verify();
    
    if (!result.success) {
        console.log('卡密验证失败:', result.message);
        return;
    }
    
    console.log('�?验证成功');
    // 你的业务逻辑...
}

main();
```

## 🌍 环境变量

```bash
# 必需
CARD_KEY=your_card_key_here

# 可�?
VERIFY_URL=https://your-api.com/verify
VERIFY_CACHE_TIMEOUT=3600
DEV_MODE=1
```

## 📖 文档结构

```
cardkey-module/
├── README.md                    # 本文�?- 项目概览
├── QUICK_START.md              # 快速开始指�?
├── README-UNIVERSAL.md         # 完整 API 文档
├── CARDKEY_MODULE_GUIDE.md     # 模块使用指南
├── INSTALL_GUIDE.md            # 安装部署指南
├── QINGLONG_GUIDE.md           # 青龙面板指南
├── DOCUMENTATION_INDEX.md      # 文档索引
├── CHANGELOG.md                # 更新日志
├── PUBLIC_ACCESS_GUIDE.md      # 公网访问配置
├── cardkey-validator.js        # 核心模块代码
├── cardkey-loader-simple.js    # 简单加载器
└── package.json                # 模块配置
```

## 💡 使用场景

- �?快手脚本
- �?抖音脚本
- �?爬虫脚本
- �?自动化脚�?
- �?青龙面板脚本
- �?任何需要卡密验证的 Node.js 项目

## 🎯 适用人群

- 脚本开发�?
- 青龙面板用户
- 自动化工具开发�?
- 需要卡密验证的项目

## 📞 需要帮助？

1. 查看 [快速开始指南](QUICK_START.md)
2. 查看 [完整文档](README-UNIVERSAL.md)
3. 查看 [文档索引](DOCUMENTATION_INDEX.md)
4. 启用调试模式：`export DEV_MODE=1`

## 📄 许可�?

MIT License

## 🤝 贡献

欢迎提交 Issue �?Pull Request�?

---

**开始使用：** [快速开始指南](QUICK_START.md) | [完整文档](README-UNIVERSAL.md)
