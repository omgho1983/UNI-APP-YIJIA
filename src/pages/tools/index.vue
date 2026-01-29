<script setup lang="ts">
import { ViewType } from '@/types/yijia'

// 工具列表
const toolsList = [
  { title: '价格计算器', desc: '输入身体状况与房型，获取精准报价', icon: 'i-mdi-calculator', bg: 'bg-blue-50', color: 'text-blue-600', view: 'PRICE_CALCULATOR' as ViewType },
  { title: '机构对比', desc: '支持多家机构横向对比，优缺点一目了然', icon: 'i-mdi-view-column', bg: 'bg-green-50', color: 'text-green-600', view: 'COMPARISON' as ViewType },
  { title: '入驻清单', desc: '入驻所需证件、物品及流程全面指引', icon: 'i-mdi-checkbox-marked', bg: 'bg-orange-50', color: 'text-orange-600', view: 'CHECKLIST' as ViewType },
  { title: '养老政策', desc: '解读当地养老补贴、长护险等最新政策', icon: 'i-mdi-gavel', bg: 'bg-purple-50', color: 'text-purple-600', view: 'POLICY' as ViewType },
  { title: '搬家协助', desc: '专业养老搬家服务，让长辈住得安心', icon: 'i-mdi-truck-fast', bg: 'bg-red-50', color: 'text-red-600', view: 'RELOCATION' as ViewType },
]

// 事件处理
const handleBack = () => {
  uni.navigateBack()
}

const handleToolClick = (view: ViewType) => {
  uni.navigateTo({
    url: `/pages/${view.toLowerCase()}/index`
  })
}
</script>

<template>
  <view class="p-6 space-y-6">
    <!-- 标题 -->
    <text class="text-2xl font-bold text-gray-900 block">助手工具</text>

    <!-- 工具列表 -->
    <view class="grid grid-cols-1 gap-4">
      <view
        v-for="(tool, idx) in toolsList"
        :key="idx"
        @click="() => handleToolClick(tool.view)"
        class="rounded-2xl p-4 flex items-center space-x-4 cursor-pointer hover:opacity-80 active:scale-[0.98] transition-all"
        :class="[tool.bg]"
      >
        <view class="w-12 h-12 flex items-center justify-center text-2xl" :class="[tool.color]">
          <text :class="[tool.icon]" />
        </view>
        <view class="flex-1">
          <text class="font-bold text-gray-900 text-base block">{{ tool.title }}</text>
          <text class="text-xs text-gray-500 mt-1 block">{{ tool.desc }}</text>
        </view>
        <text class="i-mdi-chevron-right text-gray-300" />
      </view>
    </view>
  </view>
</template>
