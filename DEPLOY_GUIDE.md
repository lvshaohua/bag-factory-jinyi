# Cloudflare Pages 部署指南

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

## 二、部署到 Cloudflare Pages

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

---

## 三、验证部署

部署成功后，访问项目 URL 确认页面正常显示即可。

---

## 四、文件结构说明

```
bag-factory-new/
├── index.html              # 首页
├── products.html           # 产品中心
├── process.html            # 定制流程
├── about.html              # 关于我们
├── contact.html            # 联系我们
├── canvas-bags.html        # 帆布袋详情
├── nonwoven-bags.html      # 无纺布袋详情
├── drawstring-bags.html    # 束口袋详情
├── felt-bags.html          # 毛毡袋详情
├── assets/
│   ├── style.css           # 全局样式
│   ├── main.js             # 全局脚本
│   ├── banner.png          # 工厂横幅图
│   ├── logo.png            # 品牌Logo
│   ├── price.png           # 价格表
│   ├── specs.png           # 规格表
│   └── video_thumb_*.jpg   # 视频缩略图
├── wrangler.toml           # Cloudflare配置
└── DEPLOY_GUIDE.md         # 本指南
```

---

## 五、联系方式配置

联系页面（contact.html）中的邮箱、WhatsApp、电话等信息直接在 HTML 中修改即可：

```html
<a href="mailto:sales@example.com">sales@example.com</a>
<a href="https://wa.me/8618668121065">WhatsApp</a>
```
