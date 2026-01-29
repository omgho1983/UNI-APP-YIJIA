<script setup lang="ts">
import { ref } from 'vue'

// 响应式状态
const phone = ref('')
const code = ref('')
const isSending = ref(false)
const countdown = ref(0)

// 事件处理函数
const handleSendCode = () => {
  if (phone.value.length !== 11) {
    uni.showToast({
      title: '请输入正确的手机号',
      icon: 'none'
    })
    return
  }

  isSending.value = true
  countdown.value = 60

  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
      isSending.value = false
      countdown.value = 0
    }
  }, 1000)

  uni.showToast({
    title: '验证码已发送',
    icon: 'success'
  })
}

const handleLogin = () => {
  if (!phone.value || !code.value) {
    uni.showToast({
      title: '请输入手机号和验证码',
      icon: 'none'
    })
    return
  }

  // 模拟登录成功
  uni.showToast({
    title: '登录成功',
    icon: 'success'
  })

  // 跳转到首页
  setTimeout(() => {
    uni.switchTab({
      url: '/pages/home/index'
    })
  }, 1500)
}

const handleRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  })
}

const handleBack = () => {
  uni.navigateBack()
}

const handleWechatLogin = () => {
  uni.showToast({
    title: '微信登录开发中',
    icon: 'none'
  })
}

const handleAlipayLogin = () => {
  uni.showToast({
    title: '支付宝登录开发中',
    icon: 'none'
  })
}

const handlePasswordLogin = () => {
  uni.showToast({
    title: '账号密码登录开发中',
    icon: 'none'
  })
}
</script>

<template>
  <view class="flex flex-col min-h-screen bg-white px-8 pt-24 relative">
    <!-- 返回按钮 -->
    <view
      v-if="getCurrentPages().length > 1"
      @click="handleBack"
      class="absolute top-12 left-6 w-10 h-10 flex items-center justify-center text-gray-400 active:scale-90 transition-transform"
    >
      <text class="i-mdi-chevron-left text-xl" />
    </view>

    <!-- 标题区域 -->
    <view class="mb-12">
      <text class="text-3xl font-bold text-gray-900 block">欢迎登录</text>
      <text class="text-sm text-gray-400 mt-2 block">专业养老，从"颐家"开始</text>
    </view>

    <!-- 输入表单 -->
    <view class="space-y-6">
      <view class="relative border-b border-gray-100 py-4 active:border-blue-600 transition-colors">
        <input
          type="number"
          v-model="phone"
          placeholder="请输入手机号"
          :maxlength="11"
          class="w-full text-lg font-bold bg-transparent border-none focus:outline-none placeholder-gray-200"
        />
      </view>

      <view class="relative border-b border-gray-100 py-4 active:border-blue-600 transition-colors flex items-center">
        <input
          type="number"
          v-model="code"
          placeholder="输入验证码"
          :maxlength="6"
          class="flex-1 text-lg font-bold bg-transparent border-none focus:outline-none placeholder-gray-200"
        />
        <view
          @click="handleSendCode"
          class="text-xs font-bold transition-colors cursor-pointer"
          :class="phone.length === 11 && !isSending ? 'text-blue-600' : 'text-gray-300'"
        >
          {{ isSending ? `${countdown}s 后重新发送` : '获取验证码' }}
        </view>
      </view>
    </view>

    <!-- 登录按钮 -->
    <view
      @click="handleLogin"
      class="w-full py-4 mt-12 rounded-2xl text-sm font-bold shadow-xl transition-all active:scale-95 cursor-pointer"
      :class="phone && code ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-gray-100 text-gray-300'"
    >
      进入颐家
    </view>

    <!-- 底部链接 -->
    <view class="mt-8 flex justify-between text-xs font-bold">
      <view @click="handleRegister" class="text-blue-600 cursor-pointer">新用户注册</view>
      <view @click="handlePasswordLogin" class="text-gray-400 cursor-pointer">账号密码登录</view>
    </view>

    <!-- 第三方登录 -->
    <view class="mt-auto pb-12">
      <view class="flex items-center space-x-4 mb-6">
        <view class="flex-1 h-[1px] bg-gray-50" />
        <text class="text-[10px] text-gray-300 uppercase tracking-widest font-bold">Other Login Methods</text>
        <view class="flex-1 h-[1px] bg-gray-50" />
      </view>
      <view class="flex justify-center space-x-12">
        <view
          @click="handleWechatLogin"
          class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-green-500 text-xl active:scale-90 transition-transform cursor-pointer"
        >
          <text class="i-mdi-wechat" />
        </view>
        <view
          @click="handleAlipayLogin"
          class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-blue-400 text-xl active:scale-90 transition-transform cursor-pointer"
        >
          <text class="i-mdi-alipay" />
        </view>
      </view>
    </view>

    <!-- 协议文本 -->
    <view class="pb-6 text-center">
      <text class="text-[10px] text-gray-300 leading-relaxed">
        登录即代表同意 <text class="text-blue-600">《用户服务协议》</text> 与 <text class="text-blue-600">《隐私政策》</text>
      </text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
input {
  caret-color: #2563EB;
}
</style>
