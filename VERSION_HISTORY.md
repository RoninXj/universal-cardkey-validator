# 版本历史

## 📦 当前版本：v1.0.2

### 版本列表

| 版本 | 发布日期 | 说明 | 标签 |
|------|---------|------|------|
| v1.0.2 | 2024-10-30 | 更新作者信息 | ✅ 已发布 |
| v1.0.1 | 2024-10-30 | 修正文档地址和分支名称 | ✅ 已发布 |
| v1.0.0 | 2024-10-30 | 首次发布 | ✅ 已发布 |

---

## 📝 详细变更

### v1.0.2 (2024-10-30)

**修复：**
- 更新 `cardkey-validator.js` 中的作者信息为 `Roninxj`

**提交：**
```bash
git commit -m "更新作者信息"
git tag -a v1.0.2 -m "v1.0.2 - 更新作者信息"
```

---

### v1.0.1 (2024-10-30)

**修复：**
- 修正所有文档中的 GitHub 仓库地址
  - 从 `RoninXj` 改为 `RoninXj`
  - 从 `universal-cardkey-validator` 改为 `universal-cardkey-validator`
- 修正分支名称从 `main` 改为 `master`
- 更新 `package.json` 中的仓库信息和作者信息
- 修正所有 GitHub Raw URL 中的分支引用

**影响文件：**
- 所有 `.md` 文档文件
- `package.json`

**提交：**
```bash
git commit -m "更新文档：修正 GitHub 仓库地址和分支名称"
git tag -a v1.0.1 -m "v1.0.1 - 修正文档中的仓库地址和分支名称"
```

---

### v1.0.0 (2024-10-30)

**首次发布：**

**核心功能：**
- ✨ 通用卡密验证模块
- ✨ 智能缓存机制
- ✨ 完善的错误处理
- ✨ 支持自定义配置
- ✨ 青龙面板友好

**核心 API：**
- `CardKeyValidator` 类
- `initializeCardKeyValidator()`
- `getCardKeyValidator()`
- `createCardKeyValidator()`
- `verifyAndAddCardKey()`
- `addCardKeyToRequest()`

**文档：**
- README.md
- README-UNIVERSAL.md
- QUICK_START.md
- CARDKEY_MODULE_GUIDE.md
- INSTALL_GUIDE.md
- QINGLONG_GUIDE.md
- DOCUMENTATION_INDEX.md
- CHANGELOG.md
- FILES_OVERVIEW.md

**提交：**
```bash
git commit -m "Initial commit: 通用卡密验证模块 v1.0.0"
git tag -a v1.0.0 -m "Release version 1.0.0 - 通用卡密验证模块"
```

---

## 🚀 使用指定版本

### 安装最新版本

```bash
npm install github:RoninXj/universal-cardkey-validator
```

### 安装指定版本

```bash
# 安装 v1.0.2
npm install github:RoninXj/universal-cardkey-validator#v1.0.2

# 安装 v1.0.1
npm install github:RoninXj/universal-cardkey-validator#v1.0.1

# 安装 v1.0.0
npm install github:RoninXj/universal-cardkey-validator#v1.0.0
```

### 青龙面板安装

在依赖管理中添加：

```
# 最新版本
github:RoninXj/universal-cardkey-validator

# 指定版本
github:RoninXj/universal-cardkey-validator#v1.0.2
```

---

## 📊 版本统计

- **总版本数：** 3
- **首次发布：** 2024-10-30
- **最新更新：** 2024-10-30
- **主要版本：** 1
- **次要版本：** 0
- **补丁版本：** 2

---

## 🔄 版本规范

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/) 规范：

- **主版本号（Major）**：不兼容的 API 修改
- **次版本号（Minor）**：向下兼容的功能性新增
- **修订号（Patch）**：向下兼容的问题修正

**格式：** `主版本号.次版本号.修订号`

**示例：** `1.0.2`
- 主版本：1
- 次版本：0
- 修订号：2

---

## 📞 相关链接

- **GitHub 仓库：** https://github.com/RoninXj/universal-cardkey-validator
- **Issues：** https://github.com/RoninXj/universal-cardkey-validator/issues
- **Tags：** https://github.com/RoninXj/universal-cardkey-validator/tags
- **Releases：** https://github.com/RoninXj/universal-cardkey-validator/releases

---

**最后更新：** 2024-10-30
