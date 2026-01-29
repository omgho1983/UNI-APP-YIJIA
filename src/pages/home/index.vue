<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Institution, ViewType } from '@/types/yijia'
import { MOCK_INSTITUTIONS } from '@/constants/yijia'

// Props 接口
interface HomeProps {
  onNavigate?: (view: ViewType) => void
  onSelect?: (inst: Institution) => void
  onStartAiMatch?: (query: string) => void
}

// Props（在 uni-app 中通常通过页面参数传递，这里保留接口）
// const props = defineProps<HomeProps>()

// 响应式状态
const aiQuery = ref('')
const selectedFilters = ref<string[]>(['全部'])
const currentCity = ref('北京')
const isCitySelectorOpen = ref(false)
const openDropdown = ref<string | null>(null)

// 筛选器配置
const dropdownOptions: Record<string, string[]> = {
  '价格': ['5000以下', '5000-8000', '8000-12000', '12000-20000', '20000以上'],
  '房型': ['单人间', '双人间', '一室一厅', '两室一厅', '套房'],
  '医疗配套': ['三甲医院', '二甲医院', '社区医院', '医务室', '无医疗配套']
}

const filters = [
  { label: '全部', icon: null },
  { label: '价格', icon: 'i-mdi-chevron-down' },
  { label: '房型', icon: 'i-mdi-chevron-down' },
  { label: '全托', icon: null },
  { label: '半托', icon: null },
  { label: '社保', icon: null },
  { label: '长护险', icon: null },
  { label: '医疗配套', icon: 'i-mdi-chevron-down' },
]

// 快捷链接配置
const quickLinks = [
  { icon: 'i-mdi-bed', label: '特惠房源', color: 'text-blue-500', view: 'OFFER_LIST' as ViewType },
  { icon: 'i-mdi-map-marker-multiple', label: '地图找房', color: 'text-green-500', view: 'MAP_SEARCH' as ViewType },
  { icon: 'i-mdi-nurse', label: '专业护理', color: 'text-orange-500', view: 'CARE_SERVICES' as ViewType },
  { icon: 'i-mdi-calculator', label: '费用测算', color: 'text-red-500', view: 'PRICE_CALCULATOR' as ViewType },
  { icon: 'i-mdi-vrbox', label: 'VR看房', color: 'text-purple-500', view: 'VR_LIST' as ViewType },
  { icon: 'i-mdi-video', label: '直播看样', color: 'text-indigo-500', view: 'LIVE_LIST' as ViewType },
  { icon: 'i-mdi-file-signature', label: '在线预定', color: 'text-cyan-500', view: 'ONLINE_BOOKING' as ViewType },
  { icon: 'i-mdi-truck-fast', label: '搬家服务', color: 'text-emerald-500', view: 'RELOCATION' as ViewType },
]

// 生命周期 - 监听点击外部关闭下拉菜单
onMounted(() => {
  // 监听点击事件（简化处理，实际可能需要更复杂的逻辑）
})

// 事件处理函数
const handleAiAdvice = () => {
  if (!aiQuery.value.trim()) return
  // onStartAiMatch(aiQuery.value)
  uni.showToast({ title: '开始匹配...', icon: 'none' })
}

const handleQuickLinkClick = (view: ViewType) => {
  // onNavigate(view)
  uni.navigateTo({ url: `/pages/${view.toLowerCase()}/index` })
}

const handleDistanceClick = (inst: Institution) => {
  uni.showToast({ title: `打开地图：${inst.location}`, icon: 'none' })
}

const handleFilterClick = (filterLabel: string) => {
  if (dropdownOptions[filterLabel]) {
    openDropdown.value = openDropdown.value === filterLabel ? null : filterLabel
    return
  }

  if (filterLabel === '全部') {
    selectedFilters.value = ['全部']
  } else {
    const withoutAll = selectedFilters.value.filter(f => f !== '全部')
    if (withoutAll.includes(filterLabel)) {
      const newFilters = withoutAll.filter(f => f !== filterLabel)
      selectedFilters.value = newFilters.length > 0 ? newFilters : ['全部']
    } else {
      selectedFilters.value = [...withoutAll, filterLabel]
    }
  }
  openDropdown.value = null
}

const handleDropdownSelect = (filterLabel: string, option: string) => {
  openDropdown.value = null
  selectedFilters.value = selectedFilters.value.filter(f => f !== '全部')
  const optionKey = `${filterLabel}:${option}`

  if (selectedFilters.value.includes(optionKey)) {
    const newFilters = selectedFilters.value.filter(f => f !== optionKey)
    selectedFilters.value = newFilters.length > 0 ? newFilters : ['全部']
  } else {
    const otherOptions = selectedFilters.value.filter(f =>
      f !== filterLabel && !f.startsWith(`${filterLabel}:`)
    )
    selectedFilters.value = [...otherOptions, optionKey]
  }
}

const handleInstitutionClick = (inst: Institution) => {
  // onSelect(inst)
  uni.navigateTo({ url: `/pages/detail/index?id=${inst.id}` })
}

const handleSearchClick = () => {
  uni.navigateTo({ url: '/pages/search/index' })
}

const handleCityClick = () => {
  isCitySelectorOpen.value = true
}
</script>

<template>
  <view class="flex flex-col relative">
    <!-- Top Banner & Search -->
    <view class="bg-blue-600 p-6 text-white space-y-4 pt-12">
      <view
        @click="handleCityClick"
        class="flex items-center space-x-2 cursor-pointer active:opacity-70 transition-opacity"
      >
        <text class="font-bold text-xl">{{ currentCity }}</text>
        <text class="i-mdi-chevron-down text-sm" />
      </view>
      <view
        @click="handleSearchClick"
        class="bg-white rounded-lg p-3 flex items-center space-x-2 text-gray-400 cursor-pointer shadow-sm"
      >
        <text class="i-mdi-magnify" />
        <text>想住在哪儿？搜索房型、位置</text>
      </view>
    </view>

    <!-- Quick Links Grid -->
    <view class="grid grid-cols-4 gap-4 p-6 bg-white">
      <view
        v-for="(item, idx) in quickLinks"
        :key="idx"
        @click="() => handleQuickLinkClick(item.view)"
        class="flex flex-col items-center space-y-2 cursor-pointer active:opacity-60 transition-opacity"
      >
        <view class="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center" :class="[item.color]">
          <text :class="[item.icon]" class="text-xl" />
        </view>
        <text class="text-xs text-gray-700 font-medium">{{ item.label }}</text>
      </view>
    </view>

    <!-- AI Smart Advisor Section -->
    <view class="px-6 py-4 bg-blue-50">
      <view class="bg-white rounded-xl p-4 shadow-sm border border-blue-100/50">
        <view class="flex items-center space-x-2 mb-3">
          <view class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white">
            <text class="i-mdi-robot text-sm" />
          </view>
          <text class="font-bold text-gray-800 text-sm">AI 智能选房师</text>
        </view>
        <view class="relative">
          <textarea
            v-model="aiQuery"
            placeholder="例如：找一个有大阳台、且支持长护险的单人间..."
            class="w-full border-0 focus:ring-0 text-sm bg-gray-50 rounded-lg p-3 h-24 resize-none placeholder-gray-400"
          />
          <view
            @click="handleAiAdvice"
            class="absolute bottom-2 right-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold active:scale-95 transition-transform"
          >
            开始匹配
          </view>
        </view>
      </view>
    </view>

    <!-- Filter Bar -->
    <view class="bg-white py-3 px-6 border-b border-gray-50 sticky top-0 z-10">
      <view class="flex flex-wrap gap-2 relative">
        <view
          v-for="(f, idx) in filters"
          :key="idx"
          class="relative"
        >
          <view
            @click="() => handleFilterClick(f.label)"
            class="flex items-center space-x-1 whitespace-nowrap px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer"
            :class="selectedFilters.includes(f.label) || selectedFilters.some(sf => sf.startsWith(`${f.label}:`))
              ? 'bg-blue-600 text-white font-bold'
              : 'bg-gray-100 text-gray-600'"
          >
            <text v-if="!selectedFilters.some(sf => sf.startsWith(`${f.label}:`))">{{ f.label }}</text>
            <text v-else>{{ selectedFilters.find(sf => sf.startsWith(`${f.label}:`))?.split(':')[1] }}</text>
            <text
              v-if="f.icon"
              :class="[f.icon, 'text-[8px] opacity-70 ml-1 transition-transform', openDropdown === f.label ? 'rotate-180' : '']"
            />
          </view>

          <!-- 下拉菜单 -->
          <view
            v-if="openDropdown === f.label && dropdownOptions[f.label]"
            class="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[140px] z-[100]"
          >
            <view
              v-for="(option, optIdx) in dropdownOptions[f.label]"
              :key="optIdx"
              @click="() => handleDropdownSelect(f.label, option)"
              class="w-full px-4 py-2 text-xs transition-colors hover:bg-gray-50 active:bg-gray-100 cursor-pointer"
              :class="selectedFilters.includes(`${f.label}:${option}`)
                ? 'text-blue-600 font-bold bg-blue-50'
                : 'text-gray-700'"
            >
              <view class="flex items-center justify-between">
                <text>{{ option }}</text>
                <text v-if="selectedFilters.includes(`${f.label}:${option}`)" class="i-mdi-check text-blue-600 text-[10px]" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- Recommendations -->
    <view class="p-6">
      <view class="flex justify-between items-center mb-6">
        <text class="text-lg font-bold text-gray-900">推荐院舍</text>
        <text
          @click="handleSearchClick"
          class="text-xs text-blue-600 font-bold cursor-pointer"
        >
          查看全部 <text class="i-mdi-chevron-right text-[8px]" />
        </text>
      </view>
      <view class="space-y-6">
        <view
          v-for="inst in MOCK_INSTITUTIONS"
          :key="inst.id"
          @click="() => handleInstitutionClick(inst)"
          class="flex space-x-4 cursor-pointer group pb-4 border-b border-gray-100 last:border-0"
        >
          <view class="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden shadow-sm">
            <image
              :src="inst.image"
              mode="aspectFill"
              class="w-full h-full"
            />
            <view class="absolute top-1 left-1 flex flex-col space-y-1">
              <text v-if="inst.isVR" class="bg-black/60 text-white text-[8px] px-1 py-0.5 rounded-sm">VR</text>
              <text v-if="inst.isLive" class="bg-red-500 text-white text-[8px] px-1 py-0.5 rounded-sm">LIVE</text>
            </view>
          </view>
          <view class="flex-1 flex flex-col justify-between py-0.5">
            <view>
              <text class="font-bold text-[15px] text-gray-900 line-clamp-1 leading-tight block">{{ inst.name }}</text>
              <view class="flex items-center text-[11px] text-gray-500 mt-1 font-medium">
                <text class="truncate max-w-[80px]">{{ inst.location.split('·')[0] }}</text>
                <text class="mx-1 text-gray-300">|</text>
                <text
                  @click.stop="handleDistanceClick(inst)"
                  class="text-blue-600 font-bold"
                >
                  {{ inst.distance }}
                </text>
              </view>
              <view class="flex flex-wrap gap-1 mt-2">
                <text
                  v-for="tag in inst.tags.slice(0, 3)"
                  :key="tag"
                  class="text-[9px] px-1.5 py-0.5 rounded-sm bg-gray-50 text-gray-500 border border-gray-100"
                >
                  {{ tag }}
                </text>
              </view>
            </view>
            <view class="flex justify-between items-end">
              <text class="text-red-500 font-bold text-base leading-none">
                ¥{{ inst.priceRange[0] }}<text class="text-[10px] font-bold text-red-400">起</text>
              </text>
              <view class="bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded font-bold text-[10px]">
                {{ inst.rating }}分
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
