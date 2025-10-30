# 更新日志

所有重要的更改都会记录在这个文件中�?

## [1.0.0] - 2024-10-30

### 🎉 首次发布

#### 新增功能
- �?通用卡密验证模块，适用于任何脚本项�?
- �?智能缓存机制，减少网络请�?
- �?完善的错误处理和状态反�?
- �?支持自定义验证接口、参数、请求头
- �?支持多种环境变量配置方式
- �?完美支持青龙面板环境

#### 核心 API
- `CardKeyValidator` �?- 核心验证器类
- `initializeCardKeyValidator()` - 初始化全局验证�?
- `getCardKeyValidator()` - 获取全局验证器实�?
- `createCardKeyValidator()` - 创建独立验证器实�?
- `verifyAndAddCardKey()` - 验证并添加卡密到请求
- `addCardKeyToRequest()` - 直接添加卡密到请�?

#### 文档
- 📖 README-UNIVERSAL.md - 完整 API 文档
- 📖 QUICK_START.md - 快速开始指�?
- 📖 CARDKEY_MODULE_GUIDE.md - 模块化使用指�?
- 📖 INSTALL_GUIDE.md - 安装和部署指�?
- 📖 QINGLONG_GUIDE.md - 青龙面板专用指南
- 📖 PUBLIC_ACCESS_GUIDE.md - 公网访问配置指南
- 📖 DOCUMENTATION_INDEX.md - 文档索引
- 📖 CHANGELOG.md - 更新日志

#### 配置选项
- `required` - 是否必须提供卡密
- `verifyUrl` - 验证接口地址
- `cacheTimeout` - 缓存超时时间
- `customParams` - 自定义验证参�?
- `customHeaders` - 自定义请求头
- `timeout` - 请求超时时间
- `silent` - 静默模式
- `envKeys` - 环境变量键名列表

#### 环境变量支持
- `CARD_KEY` / `km` - 卡密（必需�?
- `VERIFY_URL` - 验证接口地址（可选）
- `VERIFY_CACHE_TIMEOUT` - 缓存超时时间（可选）
- `DEV_MODE` - 开发模式（可选）

#### 示例脚本
- 快手脚本集成示例
- 抖音脚本集成示例
- 通用爬虫脚本示例
- 多账号脚本示�?

#### 青龙面板支持
- 三种集成方案（依赖管理、动态加载、内嵌代码）
- 完整的安装和配置指南
- 故障排除和常见问题解�?

### 技术特�?
- 🔐 安全的卡密验证机�?
- 💾 智能缓存，避免频繁请�?
- ⚙️ 高度可配置，满足不同需�?
- 🎯 青龙面板友好，完美支�?
- 📝 完善的错误处理和日志
- 🔧 灵活的环境变量配�?

### 兼容�?
- Node.js >= 12.0.0
- 支持 CommonJS 模块系统
- 支持青龙面板环境
- 支持本地开发环�?

---

## 版本说明

### 版本号规�?

本项目遵�?[语义化版本](https://semver.org/lang/zh-CN/) 规范�?

- **主版本号（Major�?*：不兼容�?API 修改
- **次版本号（Minor�?*：向下兼容的功能性新�?
- **修订号（Patch�?*：向下兼容的问题修正

### 标签说明

- 🎉 **首次发布** - 项目首次发布
- �?**新增功能** - 新增的功能特�?
- 🐛 **Bug 修复** - 修复的问�?
- 📝 **文档更新** - 文档相关的更�?
- �?**性能优化** - 性能改进
- 🔧 **配置变更** - 配置相关的变�?
- 🔒 **安全更新** - 安全相关的更�?
- ⚠️ **废弃警告** - 即将废弃的功�?
- 💥 **破坏性变�?* - 不兼容的变更

---

## 未来计划

### v1.1.0（计划中�?
- [ ] 支持更多验证接口格式
- [ ] 添加验证结果回调函数
- [ ] 支持自定义缓存策�?
- [ ] 添加更多使用示例

### v1.2.0（计划中�?
- [ ] 支持 TypeScript 类型定义
- [ ] 添加单元测试
- [ ] 支持 ESM 模块系统
- [ ] 性能优化

### v2.0.0（计划中�?
- [ ] 重构核心架构
- [ ] 支持插件系统
- [ ] 支持多种验证方式
- [ ] 完善的监控和统计

---

## 贡献指南

欢迎提交 Issue �?Pull Request�?

### 如何贡献

1. Fork 本仓�?
2. 创建特性分�?(`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开�?Pull Request

### 提交规范

提交信息格式：`<type>: <subject>`

**Type 类型�?*
- `feat`: 新功�?
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `perf`: 性能优化
- `test`: 测试相关
- `chore`: 构建/工具相关

**示例�?*
```
feat: 添加自定义缓存策略支�?
fix: 修复验证失败时的错误处理
docs: 更新 API 文档
```

---

## 许可�?

MIT License

Copyright (c) 2024 [RoninXj]

---

## 联系方式

- GitHub: https://github.com/RoninXj/universal-cardkey-validator
- Issues: https://github.com/RoninXj/universal-cardkey-validator/issues

---

**最后更新：** 2024-10-30
