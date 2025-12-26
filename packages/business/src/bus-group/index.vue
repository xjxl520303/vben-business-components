<script setup lang="ts">
import type { BusGroupProps } from './types';

import { ref } from 'vue';

defineOptions({
  name: 'BusGroup',
});

const props = withDefaults(defineProps<BusGroupProps>(), {
  defaultFolded: false,
});

const isFold = ref(props.defaultFolded);
</script>

<template>
  <div class="bus-group" :class="{ 'mb-4': isFold }">
    <div class="header flex h-10 w-full items-center px-2">
      <div
        class="flex h-8 w-8 cursor-pointer items-center justify-center"
        @click="isFold = !isFold"
      >
        <div
          class="flex h-3 w-3 items-center justify-center text-[var(--el-text-color-regular)] hover:text-[var(--el-color-primary)]"
          :title="isFold ? '展开' : '折叠'"
        >
          <!-- 折叠状态：显示 + 号 -->
          <svg
            v-if="isFold"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />
            <line
              x1="5"
              y1="8"
              x2="11"
              y2="8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
            <line
              x1="8"
              y1="5"
              x2="8"
              y2="11"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
          <!-- 展开状态：显示 - 号 -->
          <svg
            v-else
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="1"
              width="14"
              height="14"
              rx="2"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
            />
            <line
              x1="5"
              y1="8"
              x2="11"
              y2="8"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>
      <div class="shrink-0 font-bold text-black">
        {{ title }}
      </div>
      <slot name="desc">
        <div class="ml-3 truncate text-xs text-gray-500" :title="description">
          {{ description }}
        </div>
      </slot>
      <div class="flex-1">
        <div class="flex items-center justify-end">
          <slot name="extra"></slot>
        </div>
      </div>
    </div>
    <div class="expand" v-if="!isFold">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bus-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  & > .header {
    background-image: linear-gradient(270deg, #f9fcff 0%, #f0f9ff 100%);
  }
}
.expand {
  flex: 1;
  overflow: hidden;
  width: 100%;
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease-in-out;
  padding: 12px 8px;
}
</style>
