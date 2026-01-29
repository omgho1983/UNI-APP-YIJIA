<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Institution } from '@/types/yijia'
import { MOCK_INSTITUTIONS } from '@/constants/yijia'

// 从页面参数获取机构ID
const institutionId = ref('')

// 响应式状态
const institution = ref<Institution | null>(null)
const activeTab = ref('概况')
const isFollowed = ref(false)

// 事件处理函数
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
  const phoneNumber = '400-888-8888'
  uni.showModal({
    title: '电话咨询',
    content: `是否拨打咨询电话：${phoneNumber}？`,
    success: (res) => {
      if (res.confirm) {
        uni.makePhoneCall({
          phoneNumber
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

const handleNavigateBrand = () => {
  if (institution.value?.brandName) {
    uni.showToast({
      title: `进入品牌：${institution.value.brandName}`,
      icon: 'none'
    })
  }
}

// 计算属性
const recommendations = computed(() => {
  if (!institution.value) return []
  return MOCK_INSTITUTIONS.filter(inst => inst.id !== institution.value.id).slice(0, 2)
})

onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options as any

  institutionId.value = options.id || '1'

  // 根据ID获取机构详情
  const inst = MOCK_INSTITUTIONS.find(i => i.id === institutionId.value)
  if (inst) {
    institution.value = inst
  }
})
</script>

<template>
  <view class="flex flex-col relative bg-white min-h-screen">
    <!-- 顶部视觉区 -->
    <view class="relative h-64 flex-shrink-0">
      <image
        :src="institution?.image"
        mode="aspectFill"
        class="w-full h-full"
      />
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
      <!-- 机构基本信息 -->
      <view class="flex justify-between items-start mb-6">
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
      <view class="flex items-baseline space-x-1 pb-4 border-b border-gray-50 mb-6">
        <text v-if="institution" class="text-red-500 text-2xl font-bold">
          ¥{{ institution.priceRange[0] }} - {{ institution.priceRange[1] }}
        </text>
        <text class="text-xs text-gray-400 font-medium">/月</text>
      </view>

      <!-- 标签 -->
      <view class="flex flex-wrap gap-2 mb-6">
        <text
          v-for="tag in institution?.tags"
          :key="tag"
          class="text-[10px] bg-orange-50 text-orange-600 px-2 py-1 rounded font-bold"
        >
          {{ tag }}
        </text>
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
        <!-- 概况 -->
        <view v-if="activeTab === '概况'" class="space-y-6 animate-fadeIn">
          <!-- 院舍介绍 -->
          <view class="bg-white rounded-2xl p-5 border border-gray-100 beike-shadow">
            <view class="flex items-center space-x-2 mb-3">
              <view class="w-1 h-5 bg-blue-600 rounded-full"></view>
              <text class="text-sm font-bold text-gray-900">院舍介绍</text>
            </view>
            <text class="text-sm text-gray-600 leading-relaxed block">
              {{ institution?.description }} 该项目引入了国际领先的CCRC养老模式，提供从自理、介助到介护的一站式养老服务。
            </text>
          </view>

          <!-- 价格分解卡片 -->
          <view class="bg-white rounded-2xl p-5 border border-gray-100 beike-shadow">
            <view class="flex items-center space-x-2 mb-4">
              <view class="w-1 h-5 bg-blue-600 rounded-full"></view>
              <text class="text-sm font-bold text-gray-900">预计费用参考 (月度)</text>
            </view>
            <view class="space-y-3">
              <view class="flex justify-between items-center text-xs">
                <text class="text-gray-500">基础床位费</text>
                <text v-if="institution" class="text-gray-900 font-bold">¥{{ Math.round(institution.priceRange[0] * 0.6) }} 起</text>
              </view>
              <view class="flex justify-between items-center text-xs">
                <text class="text-gray-500">基础伙食费</text>
                <text class="text-gray-900 font-bold">¥1,500</text>
              </view>
              <view class="flex justify-between items-center text-xs pb-3 border-b border-gray-50">
                <text class="text-gray-500">基础护理费</text>
                <text v-if="institution" class="text-gray-900 font-bold">¥{{ Math.round(institution.priceRange[0] * 0.2) }} 起</text>
              </view>
              <view class="pt-2 flex justify-between items-center">
                <text class="text-sm font-bold text-gray-900">预估合计</text>
                <view class="text-right">
                  <text class="text-xl font-bold text-red-500">¥{{ institution?.priceRange[0] }}<text class="text-[10px]">起</text></text>
                  <text class="text-[9px] text-gray-400 block">具体费用以身体评估为准</text>
                </view>
              </view>
            </view>
          </view>

          <!-- 周边推荐 -->
          <view class="pt-6">
            <text class="font-bold text-lg text-gray-900 mb-4 block">周边推荐</text>
            <view class="space-y-4">
              <view
                v-for="rec in recommendations"
                :key="rec.id"
                class="flex space-x-3"
              >
                <image
                  :src="rec.image"
                  mode="aspectFill"
                  class="w-24 h-20 rounded-xl"
                />
                <view class="flex-1 flex flex-col justify-between py-1">
                  <view>
                    <text class="font-bold text-sm text-gray-900 block">{{ rec.name }}</text>
                    <text class="text-[10px] text-gray-400 mt-1 block">{{ rec.location.split('·')[0] }} · {{ rec.distance }}</text>
                  </view>
                  <text class="text-red-500 font-bold text-sm block">¥{{ rec.priceRange[0] }}<text class="text-[9px] font-normal">/月起</text></text>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- 环境 -->
        <view v-else-if="activeTab === '环境'" class="animate-fadeIn">
          <view class="bg-blue-50/30 rounded-2xl p-5 border border-blue-50">
            <text class="font-bold text-gray-900 text-sm block">实景展示（开发中）</text>
          </view>
        </view>

        <!-- 服务 -->
        <view v-else-if="activeTab === '服务'" class="animate-fadeIn space-y-4">
          <view class="bg-white rounded-2xl p-5 beike-shadow border border-gray-50">
            <view class="flex items-center space-x-2 mb-4">
              <view class="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-50 text-blue-600">
                <text class="i-mdi-nurse text-xl" />
              </view>
              <text class="font-bold text-gray-900">医疗照护（开发中）</text>
            </view>
            <view class="grid grid-cols-2 gap-3">
              <text class="text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded text-center">24小时值班</text>
              <text class="text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded text-center">三甲医生周巡</text>
            </view>
          </view>

          <view class="bg-white rounded-2xl p-5 beike-shadow border border-gray-50">
            <view class="flex items-center space-x-2 mb-4">
              <view class="w-10 h-10 rounded-xl flex items-center justify-center bg-green-50 text-green-600">
                <text class="i-mdi-home-outline text-xl" />
              </view>
              <text class="font-bold text-gray-900">生活照料（开发中）</text>
            </view>
            <view class="grid grid-cols-2 gap-3">
              <text class="text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded text-center">每日房间清洁</text>
              <text class="text-[11px] text-gray-500 bg-gray-50 px-2 py-1 rounded text-center">衣物收纳清洗</text>
            </view>
          </view>
        </view>

        <!-- 评价 -->
        <view v-else-if="activeTab === '评价'" class="animate-fadeIn space-y-4">
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
            <view class="grid grid-cols-4 gap-2 pt-4 border-t border-white/10">
              <text v-for="s in ['环境 4.9', '服务 5.0', '餐饮 4.8', '设施 4.9']" :key="s" class="text-[10px] text-center font-bold opacity-90">{{ s }}</text>
            </view>
          </view>

          <view class="bg-gray-50 rounded-xl p-4">
            <text class="text-sm text-gray-400 block">评价列表（开发中）</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="fixed bottom-0 w-full bg-white border-t border-gray-100 p-4 flex items-center space-x-4 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
      <view
        @click="handleFollow"
        class="flex flex-col items-center space-y-1 px-2 cursor-pointer active:scale-90"
        :class="isFollowed ? 'text-blue-600' : 'text-gray-400'"
      >
        <text :class="[isFollowed ? 'i-mdi-star' : 'i-mdi-star-outline']" class="text-xl" />
        <text class="text-[9px] font-bold">{{ isFollowed ? '已收藏' : '收藏' }}</text>
      </view>
      <view
        @click="handleConsult"
        class="flex flex-col items-center space-y-1 px-2 text-gray-400 cursor-pointer active:scale-90"
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

<style lang="scss" scoped>
image {
  width: 100%;
}
</style>
