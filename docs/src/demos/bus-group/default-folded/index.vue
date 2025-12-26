<script lang="ts" setup>
import { reactive } from 'vue';

import { BusGroup } from '@vben/business';

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: '',
  remark: '',
});
</script>

<template>
  <BusGroup title="基本信息" :default-folded="true">
    <el-form :model="form" label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="请输入电话" />
      </el-form-item>
    </el-form>
  </BusGroup>

  <BusGroup title="详细信息">
    <el-form :model="form" label-width="100px">
      <el-form-item label="地址">
        <el-input v-model="form.address" placeholder="请输入地址" />
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="form.remark"
          type="textarea"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
  </BusGroup>
</template>

