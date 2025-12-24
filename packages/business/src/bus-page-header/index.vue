<script setup lang="ts">
import type { VNodeChild } from 'vue';

import type { BusPageHeaderProps } from './types';

import { computed, ref, useSlots } from 'vue';

import { ArrowLeft } from '@element-plus/icons-vue';
import { Portal, PortalTarget } from 'portal-vue';
import { ulid } from 'ulid';

defineOptions({
  name: 'BusPageHeader',
});

const props = defineProps<BusPageHeaderProps>();
const emit = defineEmits<{
  /** 标签页改变 */
  (e: 'tabChange', value: string): void;
  /** 返回按钮点击 */
  (e: 'back'): void;
}>();
const slots = useSlots();
const uid = ulid();
const activeTab = ref(props.defaultTab || props.tabConfig?.[0]?.value || '0');

const tabConfig = computed(() => {
  return (
    props.tabConfig || [
      { label: props.firstTabLabel || '申请信息', value: '0' },
      { label: '流程图', value: '1' },
    ]
  );
});

/**
 * 页面【返回】
 */
function handleBack() {
  emit('back');
}

/**
 * 选项卡切换
 */
async function handleTabClick(value: string) {
  try {
    let canChange = true;
    if (props.beforeChange) {
      canChange = await props.beforeChange(value);
    }

    if (canChange) {
      activeTab.value = value;
      emit('tabChange', value);

      if (props.afterChange) {
        const result = props.afterChange(value);
        // 判断是否为 Promise（异步函数）
        if (result && typeof result.then === 'function') {
          await result;
        }
      }
    }
  } catch {}
}

function VNode(props: { content: string | VNodeChild }): VNodeChild {
  return props.content;
}
</script>

<template>
  <div class="flex h-10 w-full items-center justify-between">
    <div class="flex">
      <div
        class="flex cursor-pointer items-center text-[var(--el-color-primary)]"
        @click="handleBack"
      >
        <el-icon class="h-4 w-4">
          <ArrowLeft />
        </el-icon>
        <span class="ml-[6px] font-bold">返回</span>
      </div>

      <template v-if="props.title">
        <div class="flex items-center">
          <span
            class="mx-[6px] inline-block h-[14px] w-[1px] bg-[var(--el-border-color)]"
          ></span>
          <span class="font-bold">{{ props.title }}</span>
        </div>
      </template>

      <template v-else>
        <div
          class="text-3 ext-[var(--el-text-color-regular)] flex h-10 items-center px-[6px] leading-10"
          t
        >
          <template v-for="tab in tabConfig" :key="tab.value">
            <div
              class="relative h-full cursor-pointer px-[6px]"
              :class="{ 'active-tab': activeTab === tab.value }"
              @click="() => handleTabClick(tab.value)"
            >
              {{ tab.label }}
            </div>
          </template>
        </div>
      </template>
    </div>

    <div class="flex flex-1 justify-end overflow-hidden">
      <template v-if="!slots.title">
        <PortalTarget :name="`${uid}-${activeTab}-extra`" multiple />
      </template>

      <template v-else>
        <slot name="extra"></slot>
      </template>
    </div>
  </div>

  <div v-if="slots.extra">
    <Portal :to="`${uid}-${activeTab}-extra`" :order="5">
      <VNode :content="slots.extra()" />
    </Portal>
  </div>

  <slot :uid="uid"></slot>
</template>

<style lang="scss" scoped>
.active-tab {
  color: var(--el-color-primary);
  font-weight: bold;
  &:hover {
    color: var(--el-color-primary-light-3);
    &::after {
      background-color: var(--el-color-primary-light-3);
    }
  }
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 23%;
    width: 54%;
    height: 2px;
    border-radius: 3px;
    background-color: var(--el-color-primary);
  }
}
</style>
