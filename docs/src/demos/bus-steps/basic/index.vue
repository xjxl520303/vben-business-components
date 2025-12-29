<script lang="ts" setup>
import { ref } from 'vue';

import { BusSteps } from '@vben/business';

const step1 = ref(1);
const step2 = ref(4);
const step3 = ref(1);
const step4 = ref(2);

const step1Options = [
  {
    label: '选择产品',
    value: 1,
  },
  {
    label: '校验产品信息',
    value: 2,
  },
  {
    label: '选择机构',
    value: 3,
  },
  {
    label: '校验账户信息',
    value: 4,
  },
];

const step2Options = [
  {
    label: '选择机构',
    value: 1,
  },
  {
    label: '校验账户信息',
    value: 2,
  },
];
</script>

<template>
  <h5>第一步：</h5>
  <hr />
  <BusSteps v-model="step1" :options="step1Options" />
  <hr />
  <h5>第三步：</h5>
  <hr />
  <BusSteps v-model="step2" :options="step1Options" />
  <hr />
  <h5>二个步骤：</h5>
  <hr />
  <BusSteps v-model="step3" :options="step2Options" />
  <hr />
  <h5>二个步骤并设置最小间距：</h5>
  <hr />
  <BusSteps v-model="step4" :space="100" :options="step2Options" />
  <hr />
  <h5>设定百分百宽度：</h5>
  <hr />
  <BusSteps
    v-model="step4"
    style="width: 100%"
    :space="100"
    :options="step2Options"
  />
</template>
