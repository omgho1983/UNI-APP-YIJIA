# Font Awesome → Iconify 图标映射

本文档提供了 yijia-base 项目中使用的 Font Awesome 图标到 Iconify (Material Design Icons) 的映射关系。

## 常用图标映射

### 导航类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-chevron-down` | `i-mdi-chevron-down` | 下拉箭头 |
| `fa-chevron-left` | `i-mdi-chevron-left` | 返回箭头 |
| `fa-chevron-right` | `i-mdi-chevron-right` | 前进箭头 |
| `fa-map-marker` | `i-mdi-map-marker` | 地图标记 |
| `fa-location-dot` | `i-mdi-map-marker` | 位置点 |

### 功能类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-search` | `i-mdi-magnify` | 搜索 |
| `fa-bell` | `i-mdi-bell` | 通知 |
| `fa-comment-dots` | `i-mdi-comment-text-multiple` | 消息 |
| `fa-star` | `i-mdi-star` | 收藏/评分 |
| `fa-check-circle` | `i-mdi-check-circle` | 成功 |
| `fa-times-circle` | `i-mdi-close-circle` | 失败/取消 |
| `fa-times` | `i-mdi-close` | 关闭 |

### 用户类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-user` | `i-mdi-account` | 用户 |
| `fa-user-nurse` | `i-mdi-nurse` | 护理人员 |
| `fa-phone` | `i-mdi-phone` | 电话 |
| `fa-envelope` | `i-mdi-email` | 邮件 |

### 业务类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-bed` | `i-mdi-bed` | 床位/房型 |
| `fa-calculator` | `i-mdi-calculator` | 价格计算 |
| `fa-file-signature` | `i-mdi-file-signature` | 合同 |
| `fa-wallet` | `i-mdi-wallet` | 钱包/缴费 |
| `fa-heartbeat` | `i-mdi-heart-pulse` | 健康 |
| `fa-headset` | `i-mdi-headset` | 客服/投诉 |
| `fa-cog` | `i-mdi-cog` | 设置 |

### 时间相关
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-calendar-check` | `i-mdi-calendar-check` | 待确认 |
| `fa-clock` | `i-mdi-clock` | 待参观 |
| `fa-check-double` | `i-mdi-check-all` | 已完成 |

### 媒体类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-vr-cardboard` | `i-mdi-vrbox` | VR |
| `fa-video` | `i-mdi-video` | 视频 |
| `fa-play` | `i-mdi-play` | 播放 |
| `fa-pause` | `i-mdi-pause` | 暂停 |

### 地图/位置类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-map-marked-alt` | `i-mdi-map-marker-multiple` | 地图找房 |
| `fa-hospital` | `i-mdi-hospital` | 医院 |
| `fa-bus` | `i-mdi-bus` | 交通 |
| `fa-truck` | `i-mdi-truck` | 搬家 |
| `fa-truck-fast` | `i-mdi-truck-fast` | 快速搬运 |

### 生活类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-utensils` | `i-mdi-silverware-variant` | 餐饮 |
| `fa-shopping-cart` | `i-mdi-cart` | 购物 |
| `fa-tree` | `i-mdi-tree` | 公园 |

### 工具类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-columns` | `i-mdi-view-column` | 对比 |
| `fa-list-check` | `i-mdi-checkbox-marked` | 清单 |
| `fa-gavel` | `i-mdi-gavel` | 政策 |

### 社交类
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-weixin` | `i-mdi-wechat` | 微信 |
| `fa-alipay` | `i-mdi-alipay` | 支付宝 |

### 动画类 (svg-spinners)
| Font Awesome | Iconify | 用途 |
|-------------|----------|------|
| `fa-spinner` | `i-svg-spinners-ring-resize` | 加载中 |

## 使用示例

### Vue 3 Composition API
```vue
<template>
  <view class="flex items-center space-x-2">
    <!-- 使用 Iconify -->
    <text class="i-mdi-home text-[30px]" />
    <text class="i-mdi-magnify text-[30px]" />
    <text class="i-mdi-star text-[30px]" />
  </view>
</template>
```

### 动态图标
```vue
<script setup lang="ts">
const iconClass = computed(() => {
  return isStarred ? 'i-mdi-star' : 'i-mdi-star-outline';
});
</script>

<template>
  <text :class="[iconClass]" />
</template>
```

## 注意事项

1. **字体大小**：在小程序中建议使用 `text-[30px]` 等具体数值
2. **颜色**：可以使用 TailwindCSS 颜色类，如 `text-blue-500`
3. **动画**：svg-spinners 集合提供了丰富的动画图标
4. **查找图标**：访问 https://icones.js.org/ 查找更多图标

## 待映射的 Font Awesome 图标

如果遇到未在列表中的图标，请按照以下规则映射：
- 大部分 `fa-*` 对应 `i-mdi-*`
- 访问 https://icones.js.org/ 搜索 Material Design Icons
- 或搜索其他图标集（heroicons, lucide 等）
