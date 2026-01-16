<script lang="ts" setup>
import type { BusDialogResult } from '@vben/business';

import { useBusDialog } from '@vben/business';

import { ElButton, ElMessage } from 'element-plus';

import Count from './count.vue';

// 不保持实例（默认）：每次关闭对话框时，ElDialog 组件会被销毁
const { openDialog: openWithDestroy, contentPortalName: contentPortalName1 } =
  useBusDialog(false);

// 保持实例：ElDialog 组件不会被销毁，只是隐藏，再次打开时复用同一个实例
const { openDialog: openWithKeep, contentPortalName: contentPortalName2 } =
  useBusDialog(true, 'bus-dialog-keep');

// 打开会销毁实例的对话框
async function handleOpenWithDestroy() {
  try {
    const result = await openWithDestroy({
      title: '编辑用户（销毁实例）',
      width: 500,
    });
    if (result?.reason === 'ok') {
      ElMessage.success('保存成功！');
    }
  } catch (error) {
    const result = error as unknown as BusDialogResult;
    if (result?.reason === 'cancel') {
      ElMessage.info('已取消');
    }
  }
}

// 打开保持实例的对话框
async function handleOpenWithKeep() {
  try {
    const result = await openWithKeep({
      title: '编辑用户（保持实例）',
      width: 500,
    });
    if (result?.reason === 'ok') {
      ElMessage.success('保存成功！');
    }
  } catch (error) {
    const result = error as unknown as BusDialogResult;
    if (result?.reason === 'cancel') {
      ElMessage.info('已取消');
    }
  }
}
</script>
<template>
  <div style="display: flex; gap: 12px">
    <ElButton @click="handleOpenWithDestroy"> 打开对话框（销毁实例） </ElButton>
    <ElButton @click="handleOpenWithKeep"> 打开对话框（保持实例） </ElButton>
  </div>

  <portal-target name="bus-dialog-keep" multiple />

  <!-- 销毁实例的对话框内容 -->
  <portal :to="contentPortalName1" name="content">
    <Count />
  </portal>

  <!-- 保持实例的对话框内容 -->
  <portal :to="contentPortalName2" name="content">
    <Count />
  </portal>
</template>
