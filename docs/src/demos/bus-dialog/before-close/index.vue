<script lang="tsx" setup>
import type { BusDialogResult } from '@vben/business';

import { ref } from 'vue';

import { useBusDialog } from '@vben/business';

import { ElMessage } from 'element-plus';

const { openDialog } = useBusDialog();
const { openDialog: openDialog2 } = useBusDialog();

const count = ref(0);

async function open() {
  try {
    await openDialog({
      title: 'beforeClose 示例1',
      content: '确认关闭？',
      render: () => (
        <div>
          <div class="mb-1">数量超过 3 会阻止关闭：{count.value}</div>
          <el-button onClick={() => count.value++}>增加</el-button>
          <el-button onClick={() => count.value--}>减少</el-button>
        </div>
      ),
      beforeClose: async (resolve) => {
        if (count.value >= 3) {
          ElMessage.warning('阻止关闭，最多只能增加3次');
          return false;
        } else {
          resolve({ reason: 'ok' });
        }
      },
    });
  } catch {
    // 忽略错误
  }
}

async function open2() {
  try {
    await openDialog({
      title: 'beforeClose 示例2',
      content: '确认删除？',
      beforeClose: async (resolve, reject) => {
        try {
          await openDialog2({
            title: '友情提醒',
            width: 200,
            content: '真的不考虑一下吗？',
          });
        } catch (error) {
          const result = error as unknown as BusDialogResult;
          if (result.reason === 'ok') {
            resolve({ reason: 'ok' });
          } else {
            reject({ reason: 'cancel' });
          }
        }
      },
    });
    ElMessage.success('删除成功！');
  } catch {
    // 忽略错误
  }
}
</script>
<template>
  <div>
    <el-button @click="open">打开（支持动态判断）</el-button>
    <el-button @click="open2">打开（支持嵌套 beforeClose 拦截）</el-button>
  </div>
</template>
