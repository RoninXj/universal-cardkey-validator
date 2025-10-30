# 通用卡密模块安装和使用指南

> **本指南适用于任何需要卡密验证的脚本项目**

## 📚 文档导航

- **[快速开始](QUICK_START.md)** - 5分钟快速集成
- **[完整文档](README-UNIVERSAL.md)** - 完整 API 文档
- **[模块指南](CARDKEY_MODULE_GUIDE.md)** - 模块化使用指南
- **[安装指南](INSTALL_GUIDE.md)** - 你正在阅读 ⭐
- **[青龙面板](QINGLONG_GUIDE.md)** - 青龙面板专用指南
- **[文档索引](DOCUMENTATION_INDEX.md)** - 所有文档导航

## 📖 简介

本模块是一个通用的卡密验证解决方案，可以集成到任何 Node.js 脚本项目中，包括但不限于：
- 快手脚本
- 抖音脚本
- 爬虫脚本
- 自动化脚本
- 青龙面板脚本

## 📦 步骤1：发布模块到 GitHub

### 1.1 准备模块文件

确保你的项目包含以下核心文件：
- `cardkey-validator.js` - 核心模块代码
- `package.json` - 模块配置文件
- `README-UNIVERSAL.md` - 模块说明文档
- `.gitignore` - Git 忽略文件配置

### 1.2 创建 GitHub 仓库

1. 登录 GitHub (https://github.com)
2. 点击右上角 "+" -> "New repository"
3. 填写仓库信息：
   - **Repository name**: `universal-cardkey-validator`（推荐）
   - **Description**: `通用卡密验证模块 - 适用于任何脚本项目`
   - **Visibility**: 选择 Public（推荐）或 Private
4. 点击 "Create repository"

### 1.3 上传模块文件

在本地项目目录执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加模块文件
git add cardkey-validator.js package.json README-UNIVERSAL.md .gitignore

# 提交更改
git commit -m "Initial commit: 通用卡密验证模块 v1.0.0"

# 添加远程仓库（替换 RoninXj 为你的 GitHub 用户名）
git remote add origin https://github.com/RoninXj/universal-cardkey-validator.git

# 推送到 GitHub
git branch -M master
git push -u origin master
```

### 1.4 创建版本标签（推荐）

使用版本标签便于版本管理和回滚：

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release version 1.0.0 - 通用卡密验证模块"

# 推送标签到 GitHub
git push origin v1.0.0
```

### 1.5 验证发布成功

访问你的 GitHub 仓库页面，确认：
- ✅ 所有文件已成功上传
- ✅ 版本标签已创建（在 Releases 或 Tags 页面查看）
- ✅ README 文档正常显示
- ✅ 仓库可以被访问（如果是 Public）

## 🚀 步骤2：安装模块

### 方法A：本地项目安装

在你的脚本项目目录执行：

```bash
# 安装最新版本
npm install github:RoninXj/universal-cardkey-validator

# 或安装指定版本
npm install github:RoninXj/universal-cardkey-validator#v1.0.0
```

### 方法B：青龙面板 Web 界面安装

1. 登录青龙面板
2. 进入 **依赖管理**
3. 选择 **NodeJs** 标签
4. 点击 **新建依赖**
5. 输入依赖名称：
   ```
   github:RoninXj/universal-cardkey-validator#v1.0.0
   ```
6. 点击 **确定**
7. 等待安装完成

### 方法C：青龙面板命令行安装

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 进入脚本目录
cd /ql/scripts

# 安装依赖
npm install github:RoninXj/universal-cardkey-validator#v1.0.0
```

### 方法D：使用 package.json（推荐）

创建或编辑 `package.json`：

```json
{
  "name": "my-scripts",
  "version": "1.0.0",
  "dependencies": {
    "universal-cardkey-validator": "github:RoninXj/universal-cardkey-validator#v1.0.0",
    "request": "^2.88.2"
  }
}
```

然后运行：
```bash
npm install
```

## 📝 步骤3：在脚本中集成模块

### 3.1 基本集成步骤

在你的脚本文件开头添加：

```javascript
const { initializeCardKeyValidator, getCardKeyValidator } = require('universal-cardkey-validator');

// 初始化卡密验证器
initializeCardKeyValidator();
```

### 3.2 使用验证器

**方式1：手动验证**

```javascript
async function yourFunction() {
    const validator = getCardKeyValidator();
    if (!validator) {
        console.log('卡密验证器未初始化');
        return;
    }

    const result = await validator.verify();
    if (!result.success) {
        console.log('卡密验证失败:', result.message);
        return;
    }

    // 继续执行你的逻辑...
}
```

**方式2：使用辅助函数（推荐）**

```javascript
const { verifyAndAddCardKey } = require('universal-cardkey-validator');

async function yourFunction(requestData) {
    const dataWithKey = await verifyAndAddCardKey(requestData);
    if (!dataWithKey) {
        console.log('卡密验证失败');
        return;
    }

    // 发送请求...
}
```

### 3.3 上传脚本

**青龙面板 Web 界面：**
1. 进入青龙面板
2. 点击 **脚本管理**
3. 点击 **新建脚本** 或 **编辑**
4. 复制粘贴脚本内容
5. 保存

**命令行上传：**
```bash
# 复制脚本到青龙容器
docker cp your-script.js qinglong:/ql/scripts/
```

## ⚙️ 步骤4：配置环境变量

### 4.1 必需变量

```bash
# 卡密（必需，二选一）
CARD_KEY=your_card_key_here
# 或
km=your_card_key_here
```

### 4.2 可选变量（通用）

```bash
# 验证接口地址（可选，默认：http://3.xjyyds.cf:21442/api/verify）
VERIFY_URL=https://your-api.com/verify

# 缓存超时时间（可选，默认：3600秒）
VERIFY_CACHE_TIMEOUT=3600

# 开发模式（可选，启用调试日志）
DEV_MODE=1
```

### 4.3 脚本特定变量（根据你的脚本需求）

```bash
# 示例：快手脚本变量
ksck=cookie#salt#proxy
Task=food,box,look
COIN_LIMIT=500000
ROUNDS=40

# 示例：抖音脚本变量
dy_cookie=your_douyin_cookie
dy_task=like,follow

# 示例：通用爬虫变量
TARGET_URL=https://example.com
CRAWL_DEPTH=3
```

### 4.4 在青龙面板中配置

1. 登录青龙面板
2. 进入 **环境变量**
3. 点击 **新建变量**
4. 输入变量名和值
5. 保存

## 🎯 步骤5：创建定时任务（青龙面板）

在青龙面板中创建定时任务：

1. 进入 **定时任务**
2. 点击 **新建任务**
3. 填写信息：
   - **名称**：你的脚本名称（如：快手金币脚本）
   - **命令**：`task your-script.js`
   - **定时规则**：根据需求设置（如：`0 */2 * * *` 每2小时执行一次）
4. 保存并启用

### 常用定时规则示例

```bash
# 每2小时执行一次
0 */2 * * *

# 每天早上8点执行
0 8 * * *

# 每4小时执行一次
0 */4 * * *

# 每天早上8点和晚上8点执行
0 8,20 * * *

# 每30分钟执行一次
*/30 * * * *
```

## ✅ 步骤6：测试运行

### 手动运行测试

1. 在青龙面板的 **定时任务** 中
2. 找到刚创建的任务
3. 点击 **运行** 按钮
4. 查看 **日志** 确认运行状态

### 检查日志

查看日志中是否有：
```
🔑 卡密验证器已初始化
✅ 卡密验证成功
```

## 🔄 步骤6：更新模块

当卡密模块有更新时：

### 方法1：通过青龙面板

1. 进入 **依赖管理**
2. 找到 `universal-cardkey-validator`
3. 点击 **删除**
4. 重新添加依赖（使用新版本号）：
   ```
   github:RoninXj/universal-cardkey-validator#v1.1.0
   ```

### 方法2：通过命令行

```bash
# 进入青龙容器
docker exec -it qinglong bash

# 更新依赖
cd /ql/scripts
npm update universal-cardkey-validator

# 或安装指定新版本
npm install github:RoninXj/universal-cardkey-validator#v1.1.0
```

### 方法3：本地项目更新

```bash
# 在项目目录执行
npm update universal-cardkey-validator

# 或安装指定版本
npm install github:RoninXj/universal-cardkey-validator#v1.1.0
```

## 🐛 故障排除

### 问题1：模块加载失败

**错误信息：**
```
Error: Cannot find module 'universal-cardkey-validator'
```

**解决方案：**
1. 确认依赖已安装：
   ```bash
   npm list universal-cardkey-validator
   ```
2. 重新安装依赖：
   ```bash
   npm install github:RoninXj/universal-cardkey-validator#v1.0.0
   ```
3. 检查 GitHub 仓库是否可访问
4. 如果是私有仓库，确认已配置 GitHub 访问令牌

### 问题2：卡密验证失败

**错误信息：**
```
❌ 卡密验证失败: 网络连接失败
```

**解决方案：**
1. 检查青龙容器网络连接
2. 确认验证接口地址正确
3. 检查防火墙设置

### 问题3：GitHub 访问慢

**解决方案：**
1. 使用 GitHub 镜像：
   ```bash
   npm install https://ghproxy.com/https://github.com/RoninXj/universal-cardkey-validator
   ```
2. 或下载模块到本地，手动安装

### 问题4：权限问题

**错误信息：**
```
EACCES: permission denied
```

**解决方案：**
```bash
# 修复权限
docker exec -it qinglong bash
chown -R root:root /ql/scripts
chmod -R 755 /ql/scripts
```

## 📋 完整示例

### 环境变量配置示例

#### 快手脚本示例

```bash
# 卡密
CARD_KEY=ABC123XYZ456

# 快手账号配置
ksck1=cookie1#salt1#socks5://user:pass@ip:port
ksck2=cookie2#salt2

# 快手任务配置
Task=food,box,look
COIN_LIMIT=500000
ROUNDS=40

# 调试模式
DEV_MODE=1
```

#### 抖音脚本示例

```bash
# 卡密
CARD_KEY=ABC123XYZ456

# 抖音账号配置
dy_cookie=your_douyin_cookie

# 抖音任务配置
dy_task=like,follow,comment

# 调试模式
DEV_MODE=1
```

#### 通用爬虫示例

```bash
# 卡密
CARD_KEY=ABC123XYZ456

# 爬虫配置
TARGET_URL=https://example.com
CRAWL_DEPTH=3
MAX_PAGES=100

# 调试模式
DEV_MODE=1
```

### 定时任务配置示例

```bash
# 快手脚本 - 每2小时执行一次
0 */2 * * * task ksjsb-with-cardkey.js

# 抖音脚本 - 每天早上8点执行
0 8 * * * task douyin-script.js

# 爬虫脚本 - 每4小时执行一次
0 */4 * * * task crawler-script.js

# 通用脚本 - 每30分钟执行一次
*/30 * * * * task universal-script.js
```

## 📞 需要帮助？

如果遇到问题：
1. 检查青龙面板日志
2. 启用 `DEV_MODE=1` 查看详细日志
3. 确认所有环境变量配置正确
4. 检查模块是否正确安装

## 🎉 完成！

现在你的脚本已经成功集成了通用卡密验证模块！

### 模块化的优势

✅ **代码复用** - 多个脚本共享同一个模块
✅ **统一更新** - 更新模块后，所有脚本只需更新依赖即可
✅ **版本管理** - 通过 Git 标签管理版本，支持回滚
✅ **易于维护** - 模块代码独立，便于测试和维护
✅ **减少冗余** - 脚本文件更简洁，只关注业务逻辑
✅ **通用性强** - 适用于任何需要卡密验证的脚本项目

### 下一步

- 查看 [CARDKEY_MODULE_GUIDE.md](CARDKEY_MODULE_GUIDE.md) 了解更多使用方法
- 查看 [QINGLONG_GUIDE.md](QINGLONG_GUIDE.md) 了解青龙面板专用指南
- 查看 [README-UNIVERSAL.md](README-UNIVERSAL.md) 了解完整的 API 文档
