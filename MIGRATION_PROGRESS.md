# yijia-base 项目迁移进度

## 📊 总体进度

- ✅ **Phase 1: 环境准备** - 100% 完成
- ✅ **Phase 2: 组件迁移（核心页面）** - 100% 完成
- ✅ **Phase 3: 页面配置** - 100% 完成
- ⏳ **Phase 4: 验证测试** - 待进行

## ✅ 已完成的工作

### Phase 1: 环境准备
- [x] 添加 yijia-base 自定义样式（beike-shadow、动画）
- [x] 创建 Iconify 图标映射文档
- [x] 配置 TailwindCSS 基础设置

### Phase 2: 组件迁移（核心页面）
- [x] **Home.tsx → Home.vue** - 首页
  - ✅ 顶部 Banner & 搜索栏
  - ✅ 快捷链接网格（8个功能入口）
  - ✅ AI 智能选房师
  - ✅ 筛选器（价格、房型、医疗配套）
  - ✅ 推荐院舍列表
  - ✅ 下拉菜单交互

- [x] **Login.tsx → Login.vue** - 登录页
  - ✅ 手机号输入
  - ✅ 验证码发送/倒计时
  - ✅ 登录按钮
  - ✅ 第三方登录（微信、支付宝）
  - ✅ 协议文本

- [x] **Profile.tsx → Profile.vue** - 个人中心
  - ✅ 用户头像和信息展示
  - ✅ 统计数据（收藏、浏览、评价、关注）
  - ✅ 预约管理（待确认、待参观、已完成、已取消）
  - ✅ 菜单列表（合同、缴费、档案、投诉）
  - ✅ 切换账号

- [x] **Detail.tsx → Detail.vue** - 机构详情
  - ✅ 顶部视觉区
  - ✅ VR 全景看样入口
  - ✅ 价格显示
  - ✅ 选项卡（概况、环境、服务、评价）
  - ✅ 底部操作栏（收藏、咨询、预约、电话）

- [x] **Tools.tsx → Tools.vue** - 工具页
  - ✅ 工具列表（价格计算器、机构对比、入驻清单、养老政策、搬家协助）

### Phase 3: 页面配置
- [x] **pages.json 路由配置**
  - ✅ 首页路由
  - ✅ 登录页路由
  - ✅ 个人中心路由
  - ✅ 工具页路由
  - ✅ 详情页路由
  - ✅ 底部 TabBar 配置（首页、工具、我的）

- [x] **类型定义**
  - ✅ Institution 接口
  - ✅ ViewType 类型
  - ✅ Booking 接口
  - ✅ Contract 接口

- [x] **常量定义**
  - ✅ MOCK_INSTITUTIONS 数据
  - ✅ PRIMARY_COLOR 配置

## 📋 迁移的技术细节

### 1. 语法转换
| React (yijia-base) | Vue 3 (uni-app-yijia) |
|-------------------|---------------------|
| `import React from 'react'` | `<script setup lang="ts">` |
| `const [count, setCount] = useState(0)` | `const count = ref(0)` |
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `className="..."` | `class="..."` |
| `<div>` | `<view>` |
| `<span>` | `<text>` |
| `<input />` | `<input />` |
| `<img />` | `<image mode="aspectFill" />` |
| `onClick={() => {}}` | `@click="() => {}"` |
| `v-if` / `v-for` | 相同（Vue 原生） |

### 2. 样式保持
- ✅ 所有 TailwindCSS 类名保持一致
- ✅ 颜色方案（blue-600, gray-900, red-500 等）
- ✅ 阴影效果（beike-shadow）
- ✅ 动画效果（fadeIn, drawPath, pointFadeIn）
- ✅ 圆角设计（rounded-2xl, rounded-full）
- ✅ 间距系统（space-x-2, p-6, gap-4 等）

### 3. 图标替换
- Font Awesome → Iconify (Material Design Icons)
- `fa-chevron-down` → `i-mdi-chevron-down`
- `fa-star` → `i-mdi-star`
- `fa-phone` → `i-mdi-phone`
- 等等...

详见：[ICON_MAPPING.md](./ICON_MAPPING.md)

### 4. API 调用适配
- React: `window.alert()`
- uni-app: `uni.showToast()`, `uni.showModal()`
- React: `onClick` 直接调用函数
- uni-app: `@click` 调用 uni API

## 📦 已迁移的文件

### 新增文件
```
ICON_MAPPING.md                          # 图标映射文档
src/constants/yijia.ts                  # 常量定义
src/types/yijia.ts                     # 类型定义
src/pages/home/index.vue                # 首页
src/pages/login/index.vue                # 登录页
src/pages/profile/index.vue              # 个人中心
src/pages/detail/index.vue               # 机构详情
src/pages/tools/index.vue               # 工具页
```

### 修改文件
```
src/App.vue                            # 添加自定义样式
src/pages.json                         # 路由和 TabBar 配置
```

## ⏳ 待完成的工作

### Phase 4: 验证测试
- [ ] **样式一致性验证**
  - [ ] 验证首页样式与原项目一致
  - [ ] 验证登录页样式与原项目一致
  - [ ] 验证个人中心样式与原项目一致
  - [ ] 验证详情页样式与原项目一致
  - [ ] 验证工具页样式与原项目一致

- [ ] **功能完整性验证**
  - [ ] 测试所有页面跳转
  - [ ] 测试 TabBar 切换
  - [ ] 测试交互功能（筛选、下拉菜单等）
  - [ ] 测试表单输入（手机号、验证码）
  - [ ] 测试数据展示（列表、卡片）

- [ ] **多端兼容性测试**
  - [ ] 微信小程序测试
  - [ ] H5 测试
  - [ ] 响应式布局测试

### 其他待迁移组件
以下组件暂时未迁移，可以根据需要后续添加：
- [ ] Search.tsx - 搜索页
- [ ] BookingForm.tsx - 预约表单
- [ ] BookingList.tsx - 预约列表
- [ ] BrandDetail.tsx - 品牌详情
- [ ] CareServices.tsx - 护理服务
- [ ] ChatSession.tsx - 聊天会话
- [ ] Checklist.tsx - 入驻清单
- [ ] CitySelector.tsx - 城市选择
- [ ] Comparison.tsx - 机构对比
- [ ] ContractDetail.tsx - 合同详情
- [ ] ContractList.tsx - 合同列表
- [ ] HealthArchive.tsx - 健康档案
- [ ] LiveList.tsx - 直播列表
- [ ] LivePlayer.tsx - 直播播放器
- [ ] Messages.tsx - 消息中心
- [ ] OfferList.tsx - 特惠房源
- [ ] OnlineBooking.tsx - 在线预约
- [ ] PaymentRecords.tsx - 缴费记录
- [ ] Policy.tsx - 养老政策
- [ ] PriceCalculator.tsx - 价格计算器
- [ ] Register.tsx - 注册页
- [ ] Relocation.tsx - 搬家服务
- [ ] Settings.tsx - 设置页
- [ ] SigningCenter.tsx - 签约中心
- [ ] SurroundingsMap.tsx - 周边地图
- [ ] UserActivity.tsx - 用户动态
- [ ] VrList.tsx - VR列表
- [ ] VrPlayer.tsx - VR播放器
- [ ] AiMatchResults.tsx - AI匹配结果

## 🎯 下一步计划

1. **立即任务**
   - 启动开发服务器，检查编译错误
   - 在微信开发者工具中预览效果
   - 修复可能的样式或逻辑问题

2. **短期任务**
   - 验证核心页面样式一致性
   - 完善路由配置
   - 添加 TabBar 图标资源

3. **中期任务**
   - 迁移剩余的次要页面组件
   - 集成真实 API 接口
   - 完善错误处理和加载状态

4. **长期任务**
   - 性能优化
   - 多端兼容性完善
   - 单元测试和 E2E 测试

## 📝 注意事项

1. **单位转换**
   - 原项目使用 px
   - 新项目建议使用 rpx（小程序）或保持 px（H5）
   - TailwindCSS 的 p-6 等工具类会自动转换

2. **事件处理**
   - React 的 onClick → Vue 的 @click
   - uni-app 特有 API：uni.showToast(), uni.showModal() 等

3. **标签转换**
   - React: `<div>`, `<span>`, `<img>`
   - uni-app: `<view>`, `<text>`, `<image mode="aspectFill">`

4. **样式隔离**
   - 使用 scoped 样式避免污染
   - 自定义动画需要在全局 App.vue 中定义

5. **条件编译**
   - 使用 `<!-- #ifdef H5 -->` 等 uni-app 条件编译
   - 处理不同平台的兼容性

## 🔗 相关文档

- [CODE_STANDARDS.md](./CODE_STANDARDS.md) - 项目代码规范
- [ICON_MAPPING.md](./ICON_MAPPING.md) - 图标映射表
- [README.md](./README.md) - 项目说明

---

**最后更新：** 2026-01-29
**当前版本：** v0.0.1-migration
