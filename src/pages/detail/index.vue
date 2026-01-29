<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Institution } from '@/types/yijia'

// 从页面参数获取机构ID
const institutionId = ref('')

// 机构数据（简化版，实际应该从 API 获取）
const institution = ref<Institution | null>(null)

// 选项卡
const activeTab = ref('概况')
const isFollowed = ref(false)

onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options as any

  institutionId.value = options.id || '1'

  // 模拟根据 ID 获取机构详情
  // 实际应该从 API 或 store 获取
  if (options.id) {
    console.log('加载机构详情：', options.id)
    // TODO: 实现从 API 获取数据
  }
})

// 事件处理
const handleBack = () => {
  uni.navigateBack()
}

const handleFollow = () => {
  isFollowed.value = !isFollowed.value
  uni.showToast({
    title: isFollowed.value ? '已收藏' : '已取消收藏',
    icon: 'success'
  })
}

const handleBook = () => {
  uni.showToast({
    title: '预约功能开发中',
    icon: 'none'
  })
}

const handleConsult = () => {
  uni.showToast({
    title: '咨询功能开发中',
    icon: 'none'
  })
}

const handleCall = () => {
  uni.showModal({
    title: '电话咨询',
    content: '是否拨打咨询电话：400-888-8888？',
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber: '400-888-8888'
        })
      }
    }
  })
}

const handleVr = () => {
  uni.showToast({
    title: 'VR 全景功能开发中',
    icon: 'none'
  })
}

const handleTabChange = (tab: string) => {
  activeTab.value = tab
}
</script>

<template>
  <view class="flex flex-col relative bg-white min-h-screen">
    <!-- 顶部视觉区（简化版） -->
    <view class="relative h-64 flex-shrink-0">
      <view class="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
      <view class="absolute top-4 left-4 flex space-x-2">
        <view
          @click="handleBack"
          class="w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center cursor-pointer active:scale-90"
        >
          <text class="i-mdi-chevron-left text-white text-xl" />
        </view>
      </view>
      <view
        v-if="institution?.isVR"
        @click="handleVr"
        class="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-2.5 rounded-full shadow-2xl flex items-center space-x-2 border border-white/20 active:scale-95 transition-transform cursor-pointer"
      >
        <text class="i-mdi-vrbox text-blue-600 text-lg" />
        <text class="text-xs font-bold text-gray-900">VR 全景看样</text>
      </view>
    </view>

    <!-- 内容主体 -->
    <view class="px-6 py-6 space-y-4 pb-32">
      <view class="flex justify-between items-start">
        <view class="flex-1">
          <text class="text-2xl font-bold text-gray-900 block">
            {{ institution?.name || '机构详情' }}
          </text>
          <view class="flex items-center text-xs text-blue-600 mt-2 font-bold">
            <text class="i-mdi-map-marker mr-1" />
            <text>{{ institution?.location }}</text>
            <text class="mx-2 text-gray-200">|</text>
            <text>{{ institution?.distance }}</text>
          </view>
        </view>
        <view class="text-right">
          <view class="text-orange-500 font-bold text-2xl leading-none">
            {{ institution?.rating }}
          </view>
          <view class="text-[10px] text-gray-400 font-bold mt-1">综合评分</view>
        </view>
      </view>

      <!-- 价格显示 -->
      <view class="flex items-baseline space-x-1 pb-4 border-b border-gray-50">
        <text v-if="institution" class="text-red-500 text-2xl font-bold">
          ¥{{ institution.priceRange[0] }} - {{ institution.priceRange[1] }}
        </text>
        <text class="text-xs text-gray-400 font-medium">/月</text>
      </view>

      <!-- 选项卡 -->
      <view class="sticky top-0 bg-white z-20 flex justify-between py-4 border-b border-gray-50">
        <view
          v-for="tab in ['概况', '环境', '服务', '评价']"
          :key="tab"
          class="text-sm font-bold pb-2 px-2 transition-all relative cursor-pointer"
          :class="activeTab === tab ? 'text-blue-600' : 'text-gray-400'"
          @click="() => handleTabChange(tab)"
        >
          {{ tab }}
          <view
            v-if="activeTab === tab"
            class="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
          />
        </view>
      </view>

      <!-- 内容区域 -->
      <view class="py-2">
        <view v-if="activeTab === '概况'" class="space-y-4 animate-fadeIn">
          <view class="flex flex-wrap gap-2">
            <text
              v-for="tag in institution?.tags"
              :key="tag"
              class="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded font-bold"
            >
              {{ tag }}
            </text>
          </view>

          <view class="bg-white rounded-2xl p-5 border border-gray-100 beike-shadow">
            <text class="font-bold text-sm text-gray-900 block mb-3 flex items-center">
              <text class="i-mdi-information-outline text-blue-500 mr-2" />
              院舍介绍
            </text>
            <text class="text-sm text-gray-600 leading-relaxed block">
              {{ institution?.description }}
            </text>
          </view>
        </view>

        <view v-else-if="activeTab === '环境'" class="animate-fadeIn">
          <view class="bg-gray-50/30 rounded-2xl p-5 border border-gray-100">
            <text class="font-bold text-gray-900 text-sm">实景展示</text>
          </view>
        </view>

        <view v-else-if="activeTab === '服务'" class="animate-fadeIn">
          <view class="bg-white rounded-2xl p-5 beike-shadow">
            <text class="font-bold text-gray-900 text-sm">服务内容</text>
          </view>
        </view>

        <view v-else-if="activeTab === '评价'" class="animate-fadeIn">
          <view class="bg-blue-600 rounded-2xl p-6 text-white shadow-lg">
            <view class="flex items-end space-x-4 mb-4">
              <view class="text-4xl font-bold">4.9</view>
              <view class="flex-1">
                <view class="flex space-x-1 mb-1">
                  <text v-for="i in 5" :key="i" class="i-mdi-star text-[10px]" />
                </view>
                <view class="text-[10px] opacity-70">基于 128 条真实家属评价</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 max-w-md w-full bg-white border-t border-gray-100 p-4 flex items-center space-x-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
      <view
        @click="handleFollow"
        class="flex flex-col items-center space-y-1 px-2 cursor-pointer"
        :class="isFollowed ? 'text-blue-600' : 'text-gray-400'"
      >
        <text :class="[isFollowed ? 'i-mdi-star' : 'i-mdi-star-outline']" class="text-xl" />
        <text class="text-[9px] font-bold">{{ isFollowed ? '已收藏' : '收藏' }}</text>
      </view>
      <view
        @click="handleConsult"
        class="flex flex-col items-center space-y-1 px-2 text-gray-400 cursor-pointer"
      >
        <text class="i-mdi-comment-text-multiple text-xl" />
        <text class="text-[9px] font-bold">咨询</text>
      </view>
      <view class="flex-1 flex space-x-2">
        <view
          @click="handleBook"
          class="flex-1 bg-blue-50 text-blue-600 font-bold py-3.5 rounded-xl text-xs active:scale-95 transition-all cursor-pointer"
        >
          预约体验
        </view>
        <view
          @click="handleCall"
          class="flex-1 bg-blue-600 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer"
        >
          <text class="i-mdi-phone mr-1" />电话咨询
        </view>
      </view>
    </view>
  </view>
</template>
