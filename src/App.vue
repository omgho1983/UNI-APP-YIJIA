<script setup lang="ts">
onLaunch(() => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
@use 'tailwindcss/base';
@use 'tailwindcss/components';
@use 'tailwindcss/utilities';

/*  #ifdef  H5  */
svg {
  display: initial;
}

/*  #endif  */

@layer components {
  .raw-btn {
    // 注意 after: 后面不能加任何空格，有些格式化工具可能会在这里自动加一个空格
    @apply after:border-none inline-flex items-center gap-2 rounded text-sm font-semibold transition-all;
  }

  .btn {
    // 使用上面定义的 raw-btn
    @apply raw-btn bg-gradient-to-r from-[#9e58e9] to-blue-500 px-2 py-1 text-white;
  }

  // yijia-base 贝壳阴影
  .beike-shadow {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.06);
  }
}

// yijia-base 自定义动画
@keyframes fadeInFast {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fadeInFast {
  animation: fadeInFast 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes drawPath {
  from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
  to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
}
.animate-drawPath {
  animation: drawPath 1.5s ease-out forwards;
}

@keyframes pointFadeIn {
  from { opacity: 0; transform: scale(0); }
  to { opacity: 1; transform: scale(1); }
}
.animate-pointFadeIn {
  animation: pointFadeIn 0.5s ease-out 1s forwards;
  opacity: 0;
  transform-origin: center;
}
</style>
