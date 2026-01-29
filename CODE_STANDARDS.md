# uni-app 项目代码规范与样式使用规范

> 本文档详细说明了项目的代码编写规范、样式使用规范以及最佳实践，旨在保证代码质量、一致性和可维护性。

## 目录

- [一、代码规范](#一代码规范)
- [二、样式规范](#二样式规范)
- [三、组件开发规范](#三组件开发规范)
- [四、文件组织规范](#四文件组织规范)
- [五、TypeScript 规范](#五typescript-规范)
- [六、开发工具配置](#六开发工具配置)
- [七、最佳实践](#七最佳实践)

---

## 一、代码规范

### 1.1 ESLint 配置

项目使用 `@icebreakers/eslint-config` 作为基础配置，集成了 Vue、TailwindCSS 和小程序相关规则。

**主要配置：**

```javascript
// eslint.config.mjs
import { icebreaker } from '@icebreakers/eslint-config'

export default icebreaker(
  {
    vue: true,              // 启用 Vue 规则
    tailwindcss: {          // 启用 TailwindCSS 规则
      tailwindConfig: './tailwind.config.ts',
    },
    weapp: true,            // 启用小程序规则
  },
  {
    rules: {
      'better-tailwindcss/no-unregistered-classes': 'off', // 允许未注册的 TailwindCSS 类名
    },
  },
)
```

### 1.2 代码格式化

- **禁用 Prettier**：项目不使用 Prettier，统一使用 ESLint 进行格式化
- **保存时自动修复**：在 VSCode 中保存文件时会自动修复 ESLint 错误

### 1.3 代码风格规则

```json
// .vscode/settings.json
{
  "prettier.enable": false,              // 禁用 Prettier
  "editor.formatOnSave": false,          // 禁用默认格式化
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",  // 使用 ESLint 自动修复
    "source.organizeImports": "never"
  }
}
```

**静默规则：** 为了避免编辑器中显示过多样式警告，IDE 中静默了以下规则（但保存时仍会自动修复）：
- `style/*` - 样式相关规则
- `format/*` - 格式化相关规则
- `*-indent`, `*-spacing`, `*-spaces` - 缩进和空格规则
- `*-quotes`, `*-semi` - 引号和分号规则

### 1.4 语言支持

ESLint 配置支持以下文件类型的检查：
- JavaScript / JavaScriptReact
- TypeScript / TypeScriptReact
- Vue
- HTML / Markdown
- JSON / JSONC / YAML
- CSS / SCSS / PostCSS

---

## 二、样式规范

### 2.1 TailwindCSS 使用

#### 2.1.1 基础使用

**优先使用 TailwindCSS 类名**，而不是自定义 CSS：

```vue
<!-- ✅ 推荐：使用 TailwindCSS -->
<view class="flex items-center justify-center gap-2">
  <text class="text-sm font-semibold text-slate-800">
    Hello World
  </text>
</view>

<!-- ❌ 避免：自定义 CSS（除非必要） -->
<view class="container">
  <text class="title">
    Hello World
  </text>
</view>
```

#### 2.1.2 响应式设计

使用 TailwindCSS 的响应式前缀：

```vue
<view class="flex flex-col gap-4 md:grid md:grid-cols-3">
  <!-- 移动端：垂直布局，桌面端：3列网格 -->
</view>
```

**可用断点：**
- `sm:` ≥ 640px
- `md:` ≥ 768px
- `lg:` ≥ 1024px
- `xl:` ≥ 1280px

#### 2.1.3 单位规范

**小程序环境：**
- `rem` 自动转换为 `rpx`（已启用）
- 优先使用 `rpx` 单位
- 字体大小使用 `rpx`：`text-[26rpx]`
- 圆角使用 `rpx`：`rounded-[24rpx]`

```vue
<view class="p-5 text-[26rpx] rounded-[24rpx]">
  <!-- padding 使用 Tailwind 默认单位，字数大小使用 rpx -->
</view>
```

**H5 环境：**
- 使用 `rem` 或 `px`
- 系统会自动处理转换

#### 2.1.4 颜色规范

**推荐的颜色语义：**
- `slate-*` - 中性色（背景、边框）
- `sky-*` - 蓝色系（主色）
- `violet-*` - 紫色系
- `emerald-*` - 绿色系（成功、确认）
- `red-*` - 红色系（错误、警告）

```vue
<view class="border-slate-100/70 bg-white/80 shadow-[0_20px_40px_rgba(15,23,42,0.08)]">
  <!-- 边框：带透明度的 slate-100 -->
  <!-- 背景：带透明度的 white -->
  <!-- 阴影：自定义的阴影效果 -->
</view>
```

### 2.2 @layer 组件组织

使用 `@layer` 来组织组件样式，避免全局污染：

```scss
// src/App.vue
@layer components {
  .raw-btn {
    // 基础按钮样式
    @apply after:border-none inline-flex items-center gap-2 rounded text-sm font-semibold transition-all;
  }

  .btn {
    // 继承 raw-btn 并添加特定样式
    @apply raw-btn bg-gradient-to-r from-[#9e58e9] to-blue-500 px-2 py-1 text-white;
  }
}
```

**使用 @layer 的好处：**
- 避免全局样式污染
- 样式可以按需加载
- 更好的代码组织

### 2.3 条件编译样式

#### 2.3.1 传统条件编译

```vue
<style lang="scss">
/*  #ifdef  H5  */
svg {
  display: initial;
}
/*  #endif  */
</style>
```

#### 2.3.2 CSS Macro 条件编译

使用 TailwindCSS 的条件编译宏（推荐）：

```vue
<template>
  <!-- 仅在微信小程序显示 -->
  <view class="wx:hidden">
    这段内容在微信小程序隐藏
  </view>

  <!-- 在微信小程序显示 -->
  <view class="-wx:hidden">
    这段内容在微信小程序显示
  </view>
</template>
```

**自定义条件编译：**

```typescript
// tailwind.config.ts
export default {
  plugins: [
    cssMacro({
      variantsMap: {
        'wx': 'MP-WEIXIN',           // wx: 前缀：仅在微信小程序
        '-wx': {                     // -wx: 前缀：不在微信小程序
          value: 'MP-WEIXIN',
          negative: true,
        },
        // 可以定义多个条件
        // mv: {
        //   value: 'H5 || MP-WEIXIN'
        // },
      },
    }),
  ],
}
```

### 2.4 图标使用

使用 Iconify 图标库，通过 TailwindCSS 类名使用：

```vue
<template>
  <view class="flex items-center gap-2">
    <!-- 使用 Material Design Icons (mdi) -->
    <text class="i-mdi-speedometer text-[30px]" />

    <!-- 使用 SVG Spinners 动画图标 -->
    <text class="i-svg-spinners-ring-resize text-[30px]" />
  </view>
</template>
```

**支持的图标集合：**
- `mdi` - Material Design Icons
- `svg-spinners` - SVG 动画图标

**查找图标：** 访问 [icones.js.org](https://icones.js.org/) 查找需要的图标

**添加新图标集：**

```typescript
// tailwind.config.ts
import { getIconCollections } from '@egoist/tailwindcss-icons'

export default {
  plugins: [
    iconsPlugin({
      collections: getIconCollections(['mdi', 'svg-spinners', 'heroicons']),
    }),
  ],
}
```

### 2.5 Stylelint 配置

使用 `@icebreakers/stylelint-config` 进行样式检查：

```javascript
// stylelint.config.mjs
import { icebreaker } from '@icebreakers/stylelint-config'

export default icebreaker()
```

**检查的文件类型：**
- Vue
- CSS
- SCSS

---

## 三、组件开发规范

### 3.1 组件结构

使用 Vue 3 Composition API + `<script setup>` 语法：

```vue
<script setup lang="ts">
// 1. 导入依赖
import { ref, computed, onMounted } from 'vue'

// 2. 定义 Props（如果有）
interface Props {
  title: string
  count?: number
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
})

// 3. 定义 Emits（如果有）
interface Emits {
  (e: 'update', value: number): void
}

const emit = defineEmits<Emits>()

// 4. 响应式状态
const isActive = ref(false)

// 5. 计算属性
const displayTitle = computed(() => {
  return props.title.toUpperCase()
})

// 6. 方法
function handleClick() {
  isActive.value = !isActive.value
  emit('update', props.count + 1)
}

// 7. 生命周期
onMounted(() => {
  console.log('Component mounted')
})
</script>

<template>
  <view class="p-4">
    <!-- 模板内容 -->
  </view>
</template>

<style lang="scss" scoped>
/* 组件样式（如果有） */
</style>
```

### 3.2 组件命名

**文件命名：** 使用 PascalCase（大驼峰）
- `CapabilityShowcase.vue`
- `HeroSection.vue`

**组件引用：**

```vue
<script setup lang="ts">
// ✅ 推荐：使用 import 别名
import CapabilityShowcase from '@/components/sections/CapabilityShowcase.vue'
</script>
```

### 3.3 自动导入

项目配置了 API 自动导入，以下 API 可直接使用，无需手动导入：

**Vue API：**
- `ref`, `reactive`, `computed`, `watch`, `watchEffect`
- `onMounted`, `onUnmounted`, `onBeforeMount` 等生命周期
- `provide`, `inject`
- 其他 Vue Composition API

**uni-app API：**
- `onLoad`, `onShow`, `onHide`, `onReachBottom` 等生命周期
- `uni.navigateTo`, `uni.showToast` 等 API

**Pinia API：**
- `defineStore`, `storeToRefs`

```vue
<script setup lang="ts">
// ✅ 推荐：直接使用，无需导入
const count = ref(0)
onMounted(() => {
  console.log('mounted')
})

// ❌ 不需要：手动导入
// import { ref, onMounted } from 'vue'
</script>
```

### 3.4 数据规范

#### 3.4.1 响应式数据

```vue
<script setup lang="ts">
// ✅ 基础类型：使用 ref
const count = ref(0)
const message = ref('Hello')

// ✅ 对象：使用 ref（推荐，保持一致性）
const user = ref({
  name: 'John',
  age: 30,
})

// ✅ 复杂响应式对象：可使用 reactive
const state = reactive({
  loading: false,
  error: null as string | null,
  data: [] as any[],
})

// ✅ 计算属性
const doubleCount = computed(() => count.value * 2)

// ❌ 避免：直接使用普通对象（不会响应式）
const normalUser = {
  name: 'John',
  age: 30,
}
</script>
```

#### 3.4.2 数据定义示例（参考项目现有代码）

```vue
<script setup lang="ts">
// 示例：CapabilityShowcase.vue 的数据定义方式
const timelineShots = [
  {
    icon: 'i-mdi-speedometer',
    title: '极速原子',
    detail: 'tailwind 原子能力 1:1 传递到小程序。',
    tone: 'border-sky-200/70 bg-sky-50/80 text-sky-700',
  },
  {
    icon: 'i-mdi-earth',
    title: '多端统一',
    detail: 'wx / -wx / ifdef 自动拆分不同宿主。',
    tone: 'border-violet-200/70 bg-violet-50/80 text-violet-700',
  },
]
</script>

<template>
  <view class="flex flex-col gap-4">
    <view
      v-for="shot in timelineShots"
      :key="shot.title"
      class="rounded-[24rpx] border px-4 py-3"
      :class="shot.tone"
    >
      <!-- 使用动态类名 -->
      <text :class="[shot.icon]" />
    </view>
  </view>
</template>
```

---

## 四、文件组织规范

### 4.1 目录结构

```
src/
├── App.vue                 # 应用入口组件
├── main.ts                # 应用主文件
├── pages/                 # 页面目录
│   └── index/
│       └── index.vue     # 首页
├── components/            # 组件目录
│   └── sections/        # 区块组件
│       ├── CapabilityShowcase.vue
│       ├── ExperienceLab.vue
│       ├── GradientFeature.vue
│       ├── HeroShowcase.vue
│       ├── IconGallery.vue
│       └── MacroShowcase.vue
├── stores/                # Pinia 状态管理
│   └── counter.ts       # 计数器 store
├── static/               # 静态资源
│   └── .gitkeep
├── auto-imports.d.ts     # 自动导入类型定义
├── env.d.ts             # 环境变量类型定义
├── manifest.json         # uni-app 配置文件
├── pages.json           # 页面路由配置
├── theme.json           # 主题配置
└── uni.scss             # uni-app 样式变量
```

### 4.2 文件命名规范

**Vue 组件：**
- 使用 PascalCase（大驼峰）：`CapabilityShowcase.vue`
- 多单词使用连字符（部分情况）：`weapp-tailwindcss.vue`

**TypeScript 文件：**
- 使用 camelCase（小驼峰）：`counter.ts`, `platform.ts`
- 配置文件保持原名：`vite.config.ts`, `tailwind.config.ts`

**页面文件：**
- 统一使用 `index.vue` 作为页面入口
- 页面目录名称使用小写：`pages/index/`, `pages/user/`

### 4.3 路径别名

配置了 `@` 别名指向 `src` 目录：

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**使用示例：**

```vue
<script setup lang="ts">
// ✅ 推荐：使用别名
import CapabilityShowcase from '@/components/sections/CapabilityShowcase.vue'

// ❌ 不推荐：使用相对路径
import CapabilityShowcase from '../../components/sections/CapabilityShowcase.vue'
</script>
```

---

## 五、TypeScript 规范

### 5.1 配置

使用严格模式（Strict Mode）：

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,           // 启用严格模式
    "target": "esnext",       // 目标 ES 版本
    "module": "esnext",       // 模块系统
    "jsx": "preserve",        // JSX 保留
    "moduleResolution": "node",
    "baseUrl": ".",
    "useDefineForClassFields": true,
    "resolveJsonModule": true,
    "esModuleInterop": true,
    "allowJs": true,          // 允许导入 JS 文件
    "sourceMap": true,        // 生成 source map
    "types": ["@dcloudio/types"]
  }
}
```

### 5.2 类型定义规范

#### 5.2.1 组件 Props

```typescript
// ✅ 推荐：使用 interface 定义 Props
interface Props {
  title: string
  count?: number  // 可选属性
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,       // 默认值
})

// ✅ 泛型 Props
interface Props<T> {
  items: T[]
}

const props = defineProps<Props<Item>>()
```

#### 5.2.2 组件 Emits

```typescript
// ✅ 推荐：使用 interface 定义 Emits
interface Emits {
  (e: 'update', value: number): void
  (e: 'change', payload: { id: string; name: string }): void
}

const emit = defineEmits<Emits>()

// 使用
function handleClick() {
  emit('update', 10)
}
```

#### 5.2.3 数据类型定义

```typescript
// ✅ 基础类型
const count: number = ref(0)
const message: string = ref('Hello')
const isVisible: boolean = ref(false)

// ✅ 数组类型
const items = ref<Item[]>([])
const numbers = ref<number[]>([1, 2, 3])

// ✅ 联合类型
const status = ref<'loading' | 'success' | 'error'>('loading')

// ✅ 对象类型
interface User {
  id: number
  name: string
  age?: number
}
const user = ref<User>({ id: 1, name: 'John' })

// ✅ 复杂类型
type Result<T> = {
  data: T | null
  error: string | null
}
const result = ref<Result<User>>({ data: null, error: null })
```

### 5.3 类型断言

```typescript
// ✅ 使用 as 进行类型断言
const element = document.getElementById('app') as HTMLElement

// ✅ 非空断言
const value = someRef.value!  // 确定不为 null/undefined

// ❌ 避免：不必要的类型断言
const count = ref(0) as any  // 不要使用 any
```

---

## 六、开发工具配置

### 6.1 VSCode 插件

项目推荐以下 VSCode 插件（已在 `.vscode/extensions.json` 中配置）：

- **Tailwind CSS IntelliSense** - TailwindCSS 智能提示
- **ESLint** - JavaScript/TypeScript 代码检查
- **Stylelint** - CSS/SCSS 样式检查
- **TypeScript Vue Plugin (Volar)** - Vue TypeScript 支持

### 6.2 TailwindCSS 智能提示

配置了自定义正则以支持动态类名提示：

```json
// .vscode/settings.json
{
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### 6.3 CSS 验证配置

禁用了 CSS/Less/SCSS 的原生验证，使用 Stylelint：

```json
{
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["vue", "css", "scss"]
}
```

---

## 七、最佳实践

### 7.1 性能优化

#### 7.1.1 按需引入

- ✅ 使用 TailwindCSS 的 @layer 组织样式
- ✅ 使用 Tree Shaking 移除未使用的代码
- ✅ 图片使用 CDN 或压缩

#### 7.1.2 条件编译优化

```vue
<!-- ✅ 使用 CSS Macro 进行样式级条件编译 -->
<view class="wx:hidden">
  <!-- 微信小程序隐藏，其他平台显示 -->
</view>

<!-- ✅ 使用传统条件编译进行组件级判断 -->
<!-- #ifdef MP-WEIXIN -->
<view>仅在微信小程序显示</view>
<!-- #endif -->
```

### 7.2 代码可维护性

#### 7.2.1 组件职责单一

每个组件应该只做一件事：

```vue
<!-- ✅ HeroShowcase.vue - 只负责首屏展示 -->
<!-- ✅ CapabilityShowcase.vue - 只负责能力展示 -->
<!-- ✅ IconGallery.vue - 只负责图标展示 -->
```

#### 7.2.2 复用样式

使用 `@layer` 定义可复用的组件样式：

```scss
@layer components {
  .raw-btn {
    @apply inline-flex items-center gap-2 rounded text-sm font-semibold;
  }

  .btn {
    @apply raw-btn bg-blue-500 px-4 py-2 text-white;
  }
}
```

### 7.3 状态管理

使用 Pinia 进行状态管理：

```typescript
// stores/counter.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function increment() {
    count.value++
  }

  return { count, increment }
})
```

**在组件中使用：**

```vue
<script setup lang="ts">
// ✅ 直接使用，自动导入
const counterStore = useCounterStore()

// ✅ 解构 storeToRefs 保持响应式
const { count } = storeToRefs(counterStore)
</script>

<template>
  <view @click="counterStore.increment()">
    Count: {{ count }}
  </view>
</template>
```

### 7.4 错误处理

```typescript
// ✅ 使用 try-catch 处理异步错误
async function fetchData() {
  try {
    const response = await api.getData()
    // 处理数据
  } catch (error) {
    console.error('Fetch error:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'error',
    })
  }
}

// ✅ 使用 computed 处理可能为 null/undefined 的数据
const displayData = computed(() => {
  return data.value?.items ?? []
})
```

### 7.5 命名规范

#### 7.5.1 变量命名

```typescript
// ✅ camelCase（小驼峰）
const userName = 'John'
const isLoading = false
const getUserInfo = () => {}

// ❌ 避免：使用拼音或缩写不清晰
const yhm = 'John'  // 不推荐
const flag = false  // 太模糊
```

#### 7.5.2 常量命名

```typescript
// ✅ UPPER_SNAKE_CASE（大写蛇形）
const MAX_COUNT = 100
const API_BASE_URL = 'https://api.example.com'
```

#### 7.5.3 组件命名

```vue
<!-- ✅ PascalCase（大驼峰）组件文件名 -->
CapabilityShowcase.vue
HeroShowcase.vue

<!-- ✅ PascalCase 组件引用 -->
import CapabilityShowcase from '@/components/sections/CapabilityShowcase.vue'
```

### 7.6 注释规范

```typescript
// ✅ 单行注释：简洁明了
const maxCount = 100 // 最大数量限制

// ✅ 多行注释：解释复杂逻辑
/**
 * 计算折扣后的价格
 * @param originalPrice - 原价
 * @param discountRate - 折扣率（0-1）
 * @returns 折扣后的价格
 */
function calculatePrice(originalPrice: number, discountRate: number): number {
  return originalPrice * (1 - discountRate)
}

// ✅ TODO 注释：标记待办事项
// TODO: 添加国际化支持
// FIXME: 修复 iOS 端显示问题
```

---

## 附录：常用命令

```bash
# 开发命令
pnpm dev                    # 开发微信小程序
pnpm dev:h5                 # 开发 H5
pnpm build                  # 构建生产版本

# 代码检查
pnpm lint                   # 运行 ESLint 检查
pnpm lint:fix               # 自动修复 ESLint 错误

# 依赖升级
pnpm up:pkg                 # 升级非 uni-app 依赖
pnpm up:uniapp              # 升级 uni-app 相关依赖

# 微信开发者工具
pnpm open:dev               # 打开开发者工具（开发版）
pnpm open:build             # 打开开发者工具（生产版）

# 上传小程序
pnpm upload:dev             # 上传开发版本
pnpm upload:build           # 上传生产版本
```

---

## 参考资源

- [uni-app 官方文档](https://uniapp.dcloud.net.cn/)
- [TailwindCSS 文档](https://tailwindcss.com/)
- [Vue 3 文档](https://cn.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/zh/)
- [weapp-tailwindcss 文档](https://tw.icebreaker.top/)
- [Iconify 图标库](https://icones.js.org/)

---

**最后更新：** 2026-01-29
