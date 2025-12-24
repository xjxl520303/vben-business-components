<script lang="ts" setup>
import { BusPageHeader } from '@vben/business';
</script>
<template>
  <BusPageHeader>
    <template #extra>
      <el-button type="default" size="small">保存</el-button>
      <el-button type="primary" size="small">提交</el-button>
    </template>
  </BusPageHeader>
  <hr />
  <BusPageHeader>
    <template #default="{ uid }">
      <portal :to="`${uid}-0-extra`">
        <el-button type="default" size="small">保存</el-button>
        <el-button type="primary" size="small">提交</el-button>
      </portal>
    </template>
  </BusPageHeader>
  <hr />
  <BusPageHeader>
    <template #default="{ uid }">
      <portal :to="`${uid}-0-extra`">
        <el-button type="primary" size="small">提交</el-button>
      </portal>
      <portal :to="`${uid}-1-extra`">
        <el-button type="primary" size="small">下载</el-button>
      </portal>
    </template>

    <template #extra>
      <el-button type="default" size="small">保存</el-button>
    </template>
  </BusPageHeader>
</template>
