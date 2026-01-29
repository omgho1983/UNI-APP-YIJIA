<script setup lang="ts">
import { ref } from 'vue'
import { ViewType } from '@/types/yijia'

// 用户数据
const userName = ref('张先生')
const userPhone = ref('138 **** 8888')
const userAvatar = ref('https://picsum.photos/seed/user/200')

// 统计数据
const stats = [
  { label: '我的收藏', value: '12', view: 'COLLECTION' as ViewType },
  { label: '浏览记录', value: '45', view: 'HISTORY' as ViewType },
  { label: '评价', value: '2', view: 'MY_REVIEWS' as ViewType },
  { label: '关注中', value: '5', view: 'FOLLOWING' as ViewType },
]

// 预约状态
const bookingStatuses = [
  { label: '待确认', icon: 'i-mdi-calendar-check' },
  { label: '待参观', icon: 'i-mdi-clock' },
  { label: '已完成', icon: 'i-mdi-check-all' },
  { label: '已取消', icon: 'i-mdi-close-circle' },
]

// 菜单项
const menuItems = [
  { label: '在线合同', icon: 'i-mdi-file-signature', color: 'text-blue-500', view: 'ONLINE_CONTRACT' as ViewType },
  { label: '缴费记录', icon: 'i-mdi-wallet', color: 'text-orange-500', view: 'PAYMENT_RECORDS' as ViewType },
  { label: '健康档案', icon: 'i-mdi-heart-pulse', color: 'text-red-500', view: 'HEALTH_ARCHIVE' as ViewType },
  { label: '我的投诉', icon: 'i-mdi-headset', color: 'text-gray-500', view: 'MY_COMPLAINTS' as ViewType },
]

// 事件处理
const handleBack = () => {
  uni.navigateBack()
}

const handleNavigate = (view: ViewType) => {
  uni.navigateTo({
    url: `/pages/${view.toLowerCase()}/index`
  })
}

const handleBookingClick = (status: string) => {
  uni.navigateTo({
    url: `/pages/booking-list/index?status=${status}`
  })
}

const handleSettings = () => {
  handleNavigate('SETTINGS')
}

const handleFollow = () => {
  uni.showToast({
    title: '已收藏',
    icon: 'success'
  })
}

const handleSwitchAccount = () => {
  uni.showModal({
    title: '提示',
    content: '确定要切换账号吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除用户信息，跳转到登录页
        uni.reLaunch({
          url: '/pages/login/index'
        })
      }
    }
  })
}
</script>

<template>
  <view class="flex flex-col min-h-screen bg-gray-50">
    <!-- 用户头部 -->
    <view class="bg-white px-6 pt-12 pb-6 flex items-center space-x-4">
      <view class="w-16 h-16 rounded-full overflow-hidden border-2 border-blue-50 shadow-sm">
        <image
          :src="userAvatar"
          mode="aspectFill"
          class="w-full h-full"
        />
      </view>
      <view class="flex-1">
        <text class="text-xl font-bold text-gray-900 block">{{ userName }}</text>
        <text class="text-xs text-gray-400 mt-1 block">{{ userPhone }}</text>
      </view>
      <view
        @click="handleSettings"
        class="p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-90 cursor-pointer"
      >
        <text class="i-mdi-cog text-gray-400 text-xl" />
      </view>
    </view>

    <!-- 主统计网格 -->
    <view class="grid grid-cols-4 bg-white py-6 border-t border-gray-50">
      <view
        v-for="(stat, idx) in stats"
        :key="idx"
        @click="() => handleNavigate(stat.view)"
        class="flex flex-col items-center cursor-pointer active:opacity-60 transition-opacity"
      >
        <text class="font-bold text-lg text-gray-900">{{ stat.value }}</text>
        <text class="text-[10px] text-gray-400 mt-1">{{ stat.label }}</text>
      </view>
    </view>

    <!-- 业务区域 -->
    <view class="mt-4 px-4 space-y-4 pb-10">
      <!-- 预约卡片 -->
      <view class="bg-white rounded-xl p-4 beike-shadow">
        <view class="flex justify-between items-center mb-4">
          <text class="font-bold text-gray-900 text-[15px]">我的预约</text>
          <text
            @click="() => handleBookingClick('全部')"
            class="text-[11px] text-gray-400 flex items-center cursor-pointer"
          >
            全部预约 <text class="i-mdi-chevron-right text-[8px] ml-1" />
          </text>
        </view>
        <view class="grid grid-cols-4 gap-2">
          <view
            v-for="(item, idx) in bookingStatuses"
            :key="idx"
            @click="() => handleBookingClick(item.label)"
            class="flex flex-col items-center space-y-2 py-2 cursor-pointer active:scale-95 transition-transform"
          >
            <text :class="[item.icon]" class="text-blue-500 text-lg" />
            <text class="text-[10px] text-gray-600 font-medium">{{ item.label }}</text>
          </view>
        </view>
      </view>

      <!-- 菜单项 -->
      <view class="bg-white rounded-xl overflow-hidden beike-shadow">
        <view
          v-for="(item, idx) in menuItems"
          :key="idx"
          @click="() => handleNavigate(item.view)"
          class="flex items-center p-4 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <view class="w-8 flex items-center justify-center" :class="[item.color]">
            <text :class="[item.icon]" class="text-sm" />
          </view>
          <text class="flex-1 text-sm text-gray-700 font-medium ml-2">{{ item.label }}</text>
          <text class="i-mdi-chevron-right text-gray-300 text-[10px]" />
        </view>
      </view>

      <!-- 切换账号按钮 -->
      <view
        @click="handleSwitchAccount"
        class="w-full py-4 text-gray-400 text-xs font-medium cursor-pointer"
      >
        切换账号
      </view>
    </view>
  </view>
</template>
