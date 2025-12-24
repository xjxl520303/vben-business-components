<script lang="ts" setup>
import { BusPageHeader } from '@vben/business';
</script>
<template>
  <BusPageHeader title="供应商入库申请" />
  <hr />
  <BusPageHeader @tab-change="(val) => console.log(val)" />
  <hr />
  <BusPageHeader title="供应商入库申请">
    <template #extra>
      <el-button type="default" size="small">保存</el-button>
      <el-button type="primary" size="small">提交</el-button>
    </template>
  </BusPageHeader>
  <hr />
  <BusPageHeader>
    <template #extra>
      <el-button type="default" size="small">保存</el-button>
      <el-button type="primary" size="small">提交</el-button>
    </template>
  </BusPageHeader>
</template>
