<!-- eslint-disable unicorn/no-nested-ternary -->
<script setup lang="ts">
import type { BusStepsProps } from './types';

import { watch } from 'vue';

import { Select } from '@element-plus/icons-vue';

defineOptions({
  name: 'BusSteps',
});

const { space = 16, ...props } = defineProps<BusStepsProps>();
const model = defineModel<number>();

watch(
  () => model.value,
  () => {
    setStep(model.value || 1);
  },
  { immediate: true },
);

/**
 * 设置步骤
 */
function setStep(step: number) {
  if (step < 0 || step > props.options.length + 1) return;
  model.value = step;
  props.options.forEach((option) => {
    option.status =
      option.value < step
        ? 'finish'
        : option.value === step
          ? 'process'
          : 'wait';
  });
}

defineExpose<{
  /** 设置步骤 */
  setStep(step: number): void;
}>({
  setStep,
});
</script>

<template>
  <div class="mx-auto my-0 flex w-fit items-center justify-between">
    <template v-for="(option, index) in options" :key="option.value">
      <div class="inline-flex items-center leading-6">
        <div
          class="bg-primary inline-flex h-6 w-6 select-none items-center justify-center divide-x-[1px] divide-y-[1px] rounded-[4px]"
          :class="{
            'bg-[var(--el-color-primary)] text-[var(--el-color-white)]':
              option.status === 'process',
            'bg-[var(--el-color-success)] text-[var(--el-color-white)]':
              option.status === 'finish',
            'bg-[var(--el-color-info)] text-[var(--el-color-white)]':
              option.status === 'wait',
          }"
        >
          <template v-if="option.status === 'finish'">
            <el-icon class="text-white">
              <Select />
            </el-icon>
          </template>
          <template v-else>{{ index + 1 }}</template>
        </div>
        <div
          class="ml-3 min-w-max text-[16px] font-bold text-[var(--el-text-color-primary)]"
        >
          {{ option.label }}
        </div>
      </div>
      <template v-if="index >= 0 && index < props.options.length - 1">
        <el-divider class="m-3 flex-1" :style="{ minWidth: `${space}px` }" />
      </template>
    </template>
  </div>
</template>
