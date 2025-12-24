<script lang="ts" setup>
import { ref } from 'vue';

import { BusPageHeader } from '@vben/business';

import { ElLoading } from 'element-plus';

const loadingInstance = ref();

async function openLoading() {
  loadingInstance.value = ElLoading.service({
    text: '选项卡切换中...',
  });
  // 模拟复杂逻辑，耗时 2 秒
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return true;
}
</script>
<template>
  <BusPageHeader
    :before-change="openLoading"
    :after-change="() => loadingInstance.close()"
  >
    <template #extra>
      <el-button type="default" size="small">保存</el-button>
      <el-button type="primary" size="small">提交</el-button>
    </template>
  </BusPageHeader>
</template>
