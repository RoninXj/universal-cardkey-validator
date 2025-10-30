# 公网访问配置指南

## 问题说明

当你通过公网 IP 或域名访问系统时，test.html 页面会自动使用当前访问的地址。

## 配置步骤

### 1. 修改后端监听地址

默认情况下，后端只监听 `127.0.0.1`，需要改为监听所有网卡：

**方法1：修改 server.js**

编辑 `backend/server.js`，找到：

```javascript
app.listen(PORT, () => {
```

改为：

```javascript
app.listen(PORT, '0.0.0.0', () => {
```

**方法2：使用环境变量**

```cmd
set HOST=0.0.0.0
set PORT=3000
cd backend
npm start
```

### 2. 配置防火墙

确保防火墙允许端口 3000：

**Windows 防火墙**：

```cmd
netsh advfirewall firewall add rule name="Card Key System" dir=in action=allow protocol=TCP localport=3000
```

**Linux 防火墙（ufw）**：

```bash
sudo ufw allow 3000/tcp
```

### 3. 使用内网穿透工具

如果你使用内网穿透工具（如 frp、ngrok），配置示例：

#### 使用 frp

**frpc.ini**：
```ini
[common]
server_addr = your_server_ip
server_port = 7000

[card-key-system]
type = tcp
local_ip = 127.0.0.1
local_port = 3000
remote_port = 6000
```

#### 使用 ngrok

```bash
ngrok http 3000
```

### 4. 访问系统

配置完成后，可以通过以下方式访问：

**本地访问**：
```
http://127.0.0.1:3000
http://127.0.0.1:3000/test.html
```

**局域网访问**：
```
http://192.168.x.x:3000
http://192.168.x.x:3000/test.html
```

**公网访问**（通过内网穿透）：
```
http://your-domain.com:6000
http://your-domain.com:6000/test.html
```

## 测试页面自动适配

test.html 页面已经修改为自动使用当前访问的地址：

```javascript
// 自动使用当前域名
const API_BASE = window.location.origin + '/api';
```

这意味着：
- 访问 `http://127.0.0.1:3000/test.html` → API 请求到 `http://127.0.0.1:3000/api`
- 访问 `http://192.168.1.100:3000/test.html` → API 请求到 `http://192.168.1.100:3000/api`
- 访问 `http://your-domain.com/test.html` → API 请求到 `http://your-domain.com/api`

## 脚本配置

如果脚本也需要通过公网访问，修改环境变量：

```cmd
REM 使用公网地址
set API_BASE_URL=http://your-domain.com:6000
set CARD_KEY=your_card_key
node ksjm-with-cardkey.js
```

或者使用局域网 IP：

```cmd
set API_BASE_URL=http://192.168.1.100:3000
set CARD_KEY=your_card_key
node ksjm-with-cardkey.js
```

## 安全建议

### 1. 使用 HTTPS

生产环境建议使用 HTTPS：

**使用 Nginx 反向代理**：

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 2. 限制访问 IP

如果只允许特定 IP 访问：

**Nginx 配置**：

```nginx
location /api/admin {
    allow 192.168.1.0/24;  # 允许局域网
    allow 1.2.3.4;         # 允许特定 IP
    deny all;              # 拒绝其他
    
    proxy_pass http://127.0.0.1:3000;
}
```

### 3. 修改默认密码

```cmd
set ADMIN_PASSWORD=your_secure_password
npm start
```

### 4. 使用防火墙

只开放必要的端口，限制访问来源。

## 常见问题

### Q1: 通过 IP 访问正常，但通过域名访问失败？

**原因**：DNS 解析问题或域名未正确指向服务器。

**解决**：
1. 检查 DNS 解析：`nslookup your-domain.com`
2. 检查域名是否指向正确的 IP
3. 等待 DNS 生效（可能需要几分钟到几小时）

### Q2: test.html 可以访问，但 API 请求失败？

**原因**：CORS 跨域问题或后端未监听公网地址。

**解决**：

1. 检查后端是否监听 `0.0.0.0`：
   ```javascript
   app.listen(PORT, '0.0.0.0', () => {
   ```

2. 检查 CORS 配置（backend/server.js）：
   ```javascript
   app.use(cors({
       origin: '*',  // 或指定允许的域名
       credentials: true
   }));
   ```

### Q3: 局域网内其他设备无法访问？

**原因**：防火墙阻止或后端只监听 127.0.0.1。

**解决**：
1. 修改监听地址为 `0.0.0.0`
2. 开放防火墙端口 3000
3. 确认局域网 IP：`ipconfig`（Windows）或 `ifconfig`（Linux）

### Q4: 内网穿透后速度很慢？

**原因**：内网穿透服务器带宽限制。

**解决**：
1. 使用更好的内网穿透服务
2. 或者使用云服务器部署
3. 或者配置 VPN

## 部署架构示例

### 架构1：本地开发

```
开发机 (127.0.0.1:3000)
└── 只能本地访问
```

### 架构2：局域网共享

```
服务器 (192.168.1.100:3000)
├── 监听 0.0.0.0
└── 局域网内所有设备可访问
```

### 架构3：公网访问（内网穿透）

```
公网 (your-domain.com:80)
└── 内网穿透工具 (frp/ngrok)
    └── 本地服务器 (127.0.0.1:3000)
```

### 架构4：云服务器部署

```
云服务器 (your-domain.com:443)
└── Nginx (HTTPS)
    └── 后端服务 (127.0.0.1:3000)
```

## 快速配置命令

### 允许公网访问

```cmd
REM 1. 修改监听地址
REM 编辑 backend/server.js，添加 '0.0.0.0'

REM 2. 开放防火墙
netsh advfirewall firewall add rule name="Card Key System" dir=in action=allow protocol=TCP localport=3000

REM 3. 启动服务
set HOST=0.0.0.0
start.bat

REM 4. 获取本机 IP
ipconfig

REM 5. 访问测试
REM http://你的IP:3000/test.html
```

### 使用 Nginx 反向代理

```bash
# 安装 Nginx
sudo apt install nginx  # Ubuntu/Debian
# 或
sudo yum install nginx  # CentOS/RHEL

# 配置 Nginx
sudo nano /etc/nginx/sites-available/cardkey

# 添加配置（见上面的 Nginx 配置示例）

# 启用配置
sudo ln -s /etc/nginx/sites-available/cardkey /etc/nginx/sites-enabled/

# 重启 Nginx
sudo systemctl restart nginx
```

## 总结

- ✅ test.html 已自动适配，无需修改
- ✅ 后端需要监听 `0.0.0.0` 才能公网访问
- ✅ 需要开放防火墙端口 3000
- ✅ 生产环境建议使用 Nginx + HTTPS
- ✅ 脚本需要修改 `API_BASE_URL` 环境变量

---

**现在 test.html 可以通过任何地址访问了！** 🎉
