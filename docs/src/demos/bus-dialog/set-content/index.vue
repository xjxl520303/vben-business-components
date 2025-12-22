<script lang="tsx" setup>
import { useBusDialog } from '@vben/business';

const { openDialog, headerPortalName } = useBusDialog();
const { openDialog: openDialog2, contentPortalName } = useBusDialog();
const { openDialog: openDialog3 } = useBusDialog();
const { openDialog: openDialog4, footerPortalName } = useBusDialog();
const { openDialog: openDialog5 } = useBusDialog();

function openWithTitle() {
  openDialog({ title: '提示', content: '确认删除？' });
}

function openWithPortalHeader() {
  openDialog();
}

function openWithRenderHeader() {
  openDialog({
    renderHeader: () => <div>通过 renderHeader() 函数</div>,
  });
}

function openWithContent() {
  openDialog2({ content: '确认删除？' });
}

function openWithPortalContent() {
  openDialog2();
}

function openWithRenderContent() {
  openDialog2({
    render: () => <div>通过 render() 函数</div>,
  });
}

function openWithActions() {
  openDialog3({
    title: 'Delete',
    content: 'Are you sure you want to delete?',
    okText: 'Ok',
    actions: ['ok'],
    okHandler: (resolve) => {
      resolve({ reason: 'ok', data: '这里是关闭传递的参数' });
    },
  });
}

function openWithPortalFooter() {
  openDialog4({
    title: '选择托管机构',
  });
}

function openWithRenderFooter() {
  openDialog5({
    content: '自定义底部按钮',
    renderFooter: (resolve, reject) => (
      <>
        <el-button onClick={() => reject({ reason: 'cancel' })}>退出</el-button>
        <el-button onClick={() => resolve({ reason: 'ok' })} type="primary">
          下一步
        </el-button>
      </>
    ),
  });
}
</script>
<template>
  <p>设置对话框头部内容</p>
  <hr />
  <div>
    <el-button @click="openWithTitle">通过 title 属性</el-button>
    <el-button @click="openWithPortalHeader">
      通过 portal-vue 指定头部内容
    </el-button>
    <el-button @click="openWithRenderHeader">
      通过 renderHeader() 函数
    </el-button>
  </div>
  <hr />

  <p>设置对话框主体内容</p>
  <hr />
  <div>
    <el-button @click="openWithContent">通过 content 属性</el-button>
    <el-button @click="openWithPortalContent">
      通过 portal-vue 指定主体内容
    </el-button>
    <el-button @click="openWithRenderContent"> 通过 render() 函数 </el-button>
  </div>
  <hr />

  <p>设置对话框底部内容</p>
  <hr />
  <div>
    <el-button @click="openWithActions">通过 actions 属性</el-button>
    <el-button @click="openWithPortalFooter">
      通过 portal-vue 指定底部内容
    </el-button>
    <el-button @click="openWithRenderFooter">
      通过 renderFooter() 函数
    </el-button>
  </div>

  <portal :to="headerPortalName" name="header">
    <div>通过 portal-vue 指定头部内容</div>
  </portal>

  <portal :to="contentPortalName" name="content" :order="1">
    <div>通过 portal-vue 指定主体内容</div>
  </portal>

  <portal :to="contentPortalName" name="content2" :order="2">
    <div>这里的内容来自另一个 portal</div>
  </portal>

  <portal :to="footerPortalName" name="footer" v-slot="{ resolve }">
    <el-button>上一步</el-button>
    <el-button>下一步</el-button>
    <el-button
      type="primary"
      @click="() => resolve({ reason: 'ok', data: '额外内容' })"
    >
      提交
    </el-button>
  </portal>
</template>
