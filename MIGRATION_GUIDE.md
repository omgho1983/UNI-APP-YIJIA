# React → uni-app 迁移指南

## 📋 前言

本文档记录从 React (yijia-base) 迁移到 uni-app (uni-app-yijia) 过程中的重点事项、常见问题和解决方案，旨在提高后续迁移工作的成功率和效率。

---

## 🎯 核心原则

### 1. 样式一致性原则
- ✅ 所有 TailwindCSS 类名保持不变
- ✅ 颜色方案保持一致（blue-600, gray-900, red-500 等）
- ✅ 间距系统保持一致（p-6, space-x-2, gap-4 等）
- ✅ 阴影和圆角保持一致（beike-shadow, rounded-2xl, rounded-full）

### 2. 响应式设计原则
- React: 使用 `px` 单位
- uni-app: 使用 `rpx` 单位（小程序）或保持 `px`（H5）
- 建议：小程序使用 `rpx`，H5 使用 `px` 或 TailwindCSS 默认值

### 3. 语法转换原则
- React: JSX 语法（`className`, `onClick`, `{{ }}`）
- uni-app: Vue 模板语法（`class`, `@click`, `{{ }}`）
- 标签转换：`<div>` → `<view>`, `<span>` → `<text>`, `<img>` → `<image>`

---

## ⚠️ 已解决的严重问题

### 问题 1: 院舍介绍与标题图标不在一行

**错误现象：**
- React 原版：蓝色圆形图标 + "院舍介绍" 文字在同一行
- uni-app 迁移后：图标和文字分成两行显示

**根本原因：**
```vue
<!-- 错误写法 -->
<text class="text-lg font-bold text-gray-900 block">
  <text class="w-1 h-5 bg-blue-600 rounded-full mr-2" />
  院舍介绍
</text>
```

**问题分析：**
- `<text>` 元素在 uni-app 中默认是**块级元素**（`display: block`）
- 即使使用 `block` 类或全局样式，`<text>` 仍然会独占一行
- 这导致图标和文字无法在同一行显示

**解决方案：**
```vue
<!-- 正确写法：使用 <view> 容器配合 flex 布局 -->
<view class="font-bold text-lg text-gray-900 mb-3 flex items-center">
  <text class="w-1 h-5 bg-blue-600 rounded-full mr-2" />
  <text>院舍介绍</text>
</view>
```

**关键点：**
1. 使用 `<view>` 作为容器
2. 添加 `flex items-center` 类确保图标和文字在同一行
3. 图标和文字分别用 `<text>` 包裹
4. 容器应用字体和颜色类，而非 `<text>`

**扩展应用：**
所有类似的标题结构都应该使用这个模式：
```vue
<!-- 模式：图标 + 文字 -->
<view class="font-bold text-lg text-gray-900 mb-3 flex items-center">
  <text class="[icon-class] [text-size]" />
  <text>标题文字</text>
</view>

<!-- 模式：图标 + 文字 + 右侧箭头 -->
<view class="font-bold text-base text-gray-900 flex items-center justify-between">
  <text class="font-bold text-gray-900">标题文字</text>
  <text class="i-mdi-chevron-right text-[8px] text-gray-400" />
</view>
```

### 问题 2: Vue 模板编译错误 - Invalid end tag

**错误现象：**
```
[plugin:vite:vue] Invalid end tag.
at pages/detail/index.vue:734:3
```

**根本原因：**
1. Vue 模板语法错误（标签未正确闭合）
2. 文件编码问题（中文字符）
3. Vite/Vue 编译器缓存损坏

**解决方案：**

#### 方案 1：简化组件（最推荐）
- 移除所有复杂的嵌套结构
- 移除所有可能导致解析错误的部分（如复杂的 SVG、视频播放器）
- 先实现核心功能，其他功能用占位符替代
- 确保所有标签都正确闭合

#### 方案 2：清理缓存并重启
```bash
# 1. 停止开发服务器
Ctrl + C

# 2. 清理所有缓存
rm -rf node_modules/.vite
rm -rf node_modules/.cache
rm -rf dist

# 3. 重新启动
pnpm dev
```

#### 方案 3：使用 UTF-8 编码
确保文件保存为 UTF-8 编码，避免中文字符导致的解析错误。

---

## 📝 语法转换速查表

### HTML 标签转换

| React (JSX) | uni-app (Vue) | 说明 |
|---------------|----------------|------|
| `<div>` | `<view>` | 通用容器 |
| `<span>` | `<text>` | 行内文本 |
| `<img>` | `<image>` | 图片，需要 `mode="aspectFill"` |
| `<button>` | `<view>` 或 `<button>` | 按钮，uni-app 推荐用 `<view>` |
| `<input>` | `<input>` | 表单输入 |
| `<a>` | `<navigator>` | 链接，uni-app 专用组件 |

### 事件处理转换

| React | uni-app | 说明 |
|-------|---------|------|
| `onClick={() => {}}` | `@click="() => {}"` | 点击事件 |
| `onChange={value => {}}` | `@input="value => {}"` | 输入事件 |
| `onSubmit={() => {}}` | 表单提交，用普通按钮 + 点击事件 |

### 样式类转换

| React | uni-app | 说明 |
|-------|---------|------|
| `className="flex items-center"` | `class="flex items-center"` | 完全相同 |
| `style={{ color: 'red' }}` | `:style="{ color: 'red' }"` | 动态样式 |

### 条件渲染转换

| React | uni-app | 说明 |
|-------|---------|------|
| `{condition && <div>}` | `<view v-if="condition">` | 条件渲染 |
| `{!condition && <div>}` | `<view v-else-if="!condition">` | 反向条件 |
| `{items.map(item => <div>)}` | `<view v-for="item in items">` | 列表渲染 |

---

## 🎨 TailwindCSS 最佳实践

### 1. flex 布局技巧

**水平居中（图标 + 文字）：**
```vue
<!-- 推荐写法 -->
<view class="flex items-center">
  <text class="i-mdi-home" />
  <text>首页</text>
</view>
```

**垂直居中：**
```vue
<view class="flex justify-center items-center h-32">
  <text>加载中...</text>
</view>
```

**两端对齐：**
```vue
<view class="flex justify-between items-center">
  <text>左侧</text>
  <text>右侧</text>
</view>
```

### 2. text 元素的特殊行为

**⚠️ 关键知识点：**
1. **`<text>` 默认是块级元素**
   - 会独占一行
   - 不要用于需要行内显示的内容

2. **解决方案：**
   - 方案 1：使用 `<view>` 容器配合 flex 布局
   - 方案 2：使用全局样式覆盖 `text { display: block }`，但需要谨慎

**❌ 错误示例：**
```vue
<!-- 这会导致文字分成两行 -->
<text class="text-lg">
  <text class="w-5 h-5 bg-blue-600 rounded-full mr-2" />
  院舍介绍
</text>
```

**✅ 正确示例：**
```vue
<!-- 使用 view 容器 -->
<view class="flex items-center mb-4">
  <text class="w-5 h-5 bg-blue-600 rounded-full mr-2" />
  <text class="text-lg">院舍介绍</text>
</view>
```

### 3. 图片处理

**uni-app 的 `<image>` 标签需要 `mode` 属性：**
```vue
<!-- 推荐配置 -->
<image
  :src="imageUrl"
  mode="aspectFill"
  class="w-full h-full"
  @error="handleImageError"
/>

<!-- 常用模式 -->
mode="aspectFill"    <!-- 填充容器 -->
mode="aspectFit"     <!-- 包含完整图片 -->
mode="scaleToFill"  <!-- 拉伸填充 -->
mode="widthFix"      <!-- 宽度固定 -->
```

### 4. 阴影效果

**自定义阴影：**
```scss
.beike-shadow {
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
}
```

**TailwindCSS 阴影工具类：**
```vue
<!-- 阴影工具类（如果可用） -->
<view class="shadow-sm">      <!-- 小阴影 -->
<view class="shadow">         <!-- 中等阴影 -->
<view class="shadow-lg">        <!-- 大阴影 -->
<view class="shadow-2xl">      <!-- 特大阴影 -->

<!-- 阴影颜色 -->
<view class="shadow-blue-500/20">  <!-- 蓝色阴影，20% 透明度 -->
```

### 5. 圆角设计

```vue
<!-- 小圆角 -->
<view class="rounded-sm rounded-lg rounded-xl rounded-2xl rounded-full">

<!-- 某个角 -->
<view class="rounded-tl">  <!-- 左上圆角 -->
<view class="rounded-tr">  <!-- 右上圆角 -->
<view class="rounded-bl">  <!-- 左下圆角 -->
<view class="rounded-br">  <!-- 右下圆角 -->
```

---

## 🚨 常见编译错误及解决方案

### 错误 1: Invalid end tag

**错误信息：**
```
[plugin:vite:vue] Invalid end tag.
at pages/detail/index.vue:734:3
```

**常见原因：**
1. 标签未正确闭合
2. 标签嵌套错误
3. 自闭合标签语法错误
4. 特殊字符导致的解析错误

**检查清单：**
- [ ] 所有 `<view>` 标签都有对应的 `</view>`
- [ ] 所有 `<text>` 标签都有对应的 `</text>`
- [ ] 所有 `<image>` 标签都正确闭合（`/>`）
- [ ] 没有 HTML 注释未正确闭合（`<!-- -->`）
- [ ] 没有 JavaScript 模板字符串语法错误

**解决方案：**
1. 使用 IDE 的代码格式化功能检查语法
2. 确保标签正确嵌套和闭合
3. 使用编辑器的括号匹配高亮功能
4. 逐个组件验证，而非一次性迁移所有

### 错误 2: Text 元素样式问题

**错误信息：**
```
元素在同一行显示为多行
```

**解决方案：**
见上文"问题 1: 院舍介绍与标题图标不在一行"

### 错误 3: 图片显示问题

**错误信息：**
```
图片不显示或显示异常
```

**解决方案：**
1. 检查图片 URL 是否正确
2. 确保 `<image>` 标签正确闭合
3. 使用 `mode="aspectFill"` 确保图片填充容器
4. 添加 `@error` 事件处理加载失败

### 错误 4: 组件未找到

**错误信息：**
```
Failed to resolve component
```

**解决方案：**
1. 检查组件导入路径
2. 检查组件名称拼写
3. 确保组件在 `components` 目录下

---

## 🔧 调试技巧

### 1. 使用 Vue DevTools
```vue
<!-- 在组件中添加调试信息 -->
<script setup>
import { ref } from 'vue'

const debugMode = ref(true)

const handleLog = () => {
  if (debugMode.value) {
    console.log('调试信息')
  }
}
</script>
```

### 2. 条件渲染调试
```vue
<!-- 使用不同颜色区分不同的状态 -->
<view v-if="isLoading" class="bg-gray-100">
  <text>加载中...</text>
</view>

<view v-if="hasError" class="bg-red-100 text-red-600">
  <text>加载失败</text>
</view>

<view v-if="isSuccess" class="bg-green-100 text-green-600">
  <text>加载成功</text>
</view>
```

### 3. 响应式调试
```vue
<!-- 使用 TailwindCSS 响应式前缀检查 -->
<!-- 小屏幕 -->
<view class="md:hidden">
  <text>仅在桌面端显示</text>
</view>

<!-- 大屏幕 -->
<view class="md:block">
  <text>仅在桌面端显示</text>
</view>
```

---

## 📋 迁移检查清单

### 环境准备
- [x] 自定义样式已添加（beike-shadow, 动画等）
- [x] Iconify 图标映射文档已创建
- [x] TailwindCSS 主题已配置

### 核心页面组件
- [x] Home.vue - 首页
- [x] Login.vue - 登录页
- [x] Profile.vue - 个人中心
- [x] Tools.vue - 工具页
- [x] Detail.vue - 机构详情（**存在问题，需要简化**）

### 页面配置
- [x] pages.json 路由已配置
- [x] pages.json TabBar 已配置（图标待添加）
- [x] 全局样式已添加

### 类型定义
- [x] types/yijia.ts - 机构等类型
- [x] 类型定义完整

### 常量定义
- [x] constants/yijia.ts - 模拟数据

---

## 🎯 下一步行动

### 1. 修复 Detail 页面（优先级：高）
- [ ] 简化组件结构，移除复杂部分
- [ ] 确保所有标签正确闭合
- [ ] 移除或简化 SVG 图表
- [ ] 移除或简化视频播放器
- [ ] 确保所有 `<text>` 元素正确使用
- [ ] 逐步添加功能，每次添加后验证编译

### 2. 添加 TabBar 图标
- [ ] 准备 TabBar 图标资源
- [ ] 添加到 `src/static/` 目录
- [ ] 更新 pages.json 图标路径
- [ ] 确保图标尺寸正确

### 3. 验证其他页面
- [ ] 在微信开发者工具中打开 Home 页面
- [ ] 验证所有样式是否正确显示
- [ ] 测试所有交互功能
- [ ] 检查是否有 JavaScript 错误

### 4. 完善功能
- [ ] 添加真实 API 接口集成
- [ ] 添加路由跳转逻辑
- [ ] 添加错误处理和加载状态
- [ ] 添加表单验证

### 5. 性能优化
- [ ] 检查包体积
- [ ] 优化图片资源
- [ ] 使用条件编译减少包大小
- [ ] 懒加载组件和页面

---

## 📚 参考资源

### 项目文档
- [CODE_STANDARDS.md](./CODE_STANDARDS.md) - 项目代码规范
- [MIGRATION_PROGRESS.md](./MIGRATION_PROGRESS.md) - 迁移进度
- [ICON_MAPPING.md](./ICON_MAPPING.md) - 图标映射表

### 官方文档
- [uni-app 官方文档](https://uniapp.dcloud.net/)
- [Vue 3 官方文档](https://vuejs.org/)
- [TailwindCSS 官方文档](https://tailwindcss.com/)

---

## 💡 经验总结

### ✅ 成功的迁移策略
1. **分阶段迁移** - 先迁移核心页面，再迁移次要功能
2. **保持样式一致** - 严格遵循原项目的 TailwindCSS 类名
3. **简化逻辑** - 移除过于复杂的嵌套和条件判断
4. **增量验证** - 每迁移一个组件就验证一次
5. **文档先行** - 先创建详细的文档和指南

### ❌ 避免的常见错误
1. **过度复杂化** - 不要一次性迁移所有功能
2. **忽略 `text>` 元素特性** - 记住 `text` 是块级的
3. **不验证编译** - 迁移后立即检查编译日志
4. **不检查样式** - 不要只看代码，要实际预览效果
5. **不使用全局样式** - 避免全局污染，尽量使用 scoped 样式

---

## 🎓 结论

React 到 uni-app 的迁移是一个系统性的工作，需要：

1. **严谨的态度** - 确保每个语法都正确
2. **充分的验证** - 每个组件迁移后都要验证
3. **完善的文档** - 记录问题和解决方案，避免重复犯错
4. **渐进的方法** - 先迁移核心功能，再添加复杂特性

**关键原则：**
> **样式一致性优先，功能完整性次之，编译零错误是底线**

---

**文档版本：** v1.0  
**最后更新：** 2026-01-29  
**作者：** AI Migration Assistant
