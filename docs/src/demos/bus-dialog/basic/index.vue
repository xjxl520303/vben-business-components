<script lang="ts" setup>
import type { BusDialogResult } from '@vben/business';

import { useBusDialog } from '@vben/business';

import { ElMessage } from 'element-plus';

const { openDialog } = useBusDialog();

async function openWithAsyncAwait() {
  try {
    await openDialog({ content: '确认删除？' });
    ElMessage.success('删除成功！');
  } catch (error) {
    console.log(error, 'kkkk');
    // 明确 error 是 BusDialogResult 类型
    const result = error as unknown as BusDialogResult;
    console.error(result);
    if (result.reason === 'cancel') {
      ElMessage.info('取消删除');
    } else if (result.reason === 'close') {
      ElMessage.info('关闭对话框');
    } else {
      ElMessage.info('其他原因关闭对话框');
    }
  }
}

function openWithPromise() {
  openDialog({ content: '确认删除？' })
    .then(() => {
      ElMessage.success('删除成功！');
    })
    .catch((error) => {
      // 这里参考上面的 async/await 方式来处理错误，不再赘述
      console.error(error);
      ElMessage.info('取消删除');
    });
}
</script>
<template>
  <div>
    <el-button @click="openWithAsyncAwait"> async/await 打开 </el-button>
    <el-button @click="openWithPromise"> Promise 打开 </el-button>
  </div>
</template>
