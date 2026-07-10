# Cloudflare Pages + D1 部署指南

## 一、准备工作

### 1. 安装 Wrangler CLI（如未安装）
```bash
npm install -g wrangler
```

### 2. 登录 Cloudflare
```bash
wrangler login
```
浏览器会打开授权页面，登录您的 Cloudflare 账户并授权。

---

## 二、创建 D1 数据库

```bash
wrangler d1 create bag-factory-db
```

执行后会返回 `database_id`，类似：
```
✅ Successfully created DB 'bag-factory-db'
ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**复制这个 ID**，替换 `wrangler.toml` 中的 `your-database-id-here`：
```toml
[[d1_databases]]
binding = "DB"
database_name = "bag-factory-db"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # 替换为实际ID
```

### 初始化数据库表
```bash
wrangler d1 execute bag-factory-db --file=./schema.sql
```

---

## 三、部署到 Cloudflare Pages

### 方式一：命令行部署（推荐）

```bash
cd bag-factory-new
wrangler pages deploy . --project-name bag-factory-jinyi
```

首次部署会提示创建项目，选择 **Create a new project**。

### 方式二：Git 集成部署（自动更新）

1. 将代码推送到 GitHub/GitLab
2. 在 Cloudflare Dashboard 中：
   - 进入 **Workers & Pages**
   - 点击 **Create application** → **Pages** → **Connect to Git**
   - 选择仓库并配置：
     - **Build command**: 留空（纯静态站点）
     - **Build output directory**: `.`
3. 添加 D1 绑定：
   - 项目设置 → **Functions** → **D1 database bindings**
   - Variable name: `DB`
   - 选择 `bag-factory-db`

---

## 四、部署后配置

### 绑定 D1 数据库（命令行部署后）

在 Cloudflare Dashboard 中：
1. 进入 **Workers & Pages** → 选择 `bag-factory-jinyi`
2. 点击 **Settings** → **Functions**
3. 在 **D1 database bindings** 中添加：
   - Variable name: `DB`
   - D1 database: `bag-factory-db`

---

## 五、验证部署

### 测试 API
```bash
curl -X POST https://bag-factory-jinyi.pages.dev/api/inquiry \
  -H "Content-Type: application/json" \
  -d '{"name":"测试","country":"中国","phone":"13800138000"}'
```

### 查看数据
```bash
curl https://bag-factory-jinyi.pages.dev/api/inquiry
```

或在 D1 控制台执行：
```sql
SELECT * FROM inquiries ORDER BY created_at DESC;
```

---

## 六、文件结构说明

```
bag-factory-new/
├── index.html              # 首页
├── products.html           # 产品中心
├── process.html            # 定制流程
├── about.html              # 关于我们
├── contact.html            # 联系我们
├── assets/
│   ├── style.css           # 全局样式（含弹窗样式）
│   ├── main.js             # 全局脚本（含弹窗逻辑）
│   ├── banner.png          # 工厂横幅图
│   ├── logo.png            # 品牌Logo
│   ├── price.png           # 价格表
│   ├── specs.png           # 规格表
│   └── video_thumb_*.jpg   # 视频缩略图
├── functions/
│   └── api/
│       └── inquiry.js      # Pages Function API
├── _shared/
│   ├── fonts/              # 字体文件
│   └── js/                 # ECharts等库
├── wrangler.toml           # Cloudflare配置
├── schema.sql              # D1数据库表结构
└── DEPLOY_GUIDE.md         # 本指南
```

---

## 七、功能说明

### 弹窗咨询表单
- 点击导航栏 **立即咨询** 或 CTA区域按钮会弹出表单
- **称呼**：必填
- **国家、手机号、邮箱、WhatsApp**：选填
- **产品类型、预计数量、需求描述**：选填
- 提交后数据自动存入 D1 数据库

### API 端点
- `POST /api/inquiry` - 提交咨询
- `GET /api/inquiry` - 查询所有咨询记录

### 数据表结构
| 字段 | 说明 |
|------|------|
| id | 自增ID |
| name | 称呼（必填） |
| country | 国家 |
| phone | 手机号 |
| email | 邮箱 |
| whatsapp | WhatsApp |
| product | 产品类型 |
| quantity | 预计数量 |
| message | 需求描述 |
| ip_address | 提交者IP |
| user_agent | 浏览器信息 |
| created_at | 提交时间 |
