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
  <BusGroup title="基本信息">
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

  <BusGroup title="附加信息" description="这里的信息根据业务需求选择性填写">
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

  <BusGroup title="插槽示例">
    <template #desc>
      <div class="ml-4 text-xs text-blue-800">
        这里的信息根据业务需求选择性填写
      </div>
    </template>
    <template #extra>
      <el-button type="primary" size="small" text>编辑</el-button>
    </template>
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
