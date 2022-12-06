<template>
  <el-card class="account-container">
    <h1>系统简介</h1>


    <h1>技术选型</h1>
    <ul style="font-weight: bold;">
      <li>Go</li>
      <li>Vue 3.x</li>
      <li>Vite 2.x</li>
      <li>Vue-Router 4.x</li>
      <li>Element-Plus（适配全新 Vue 3.x 的 PC 端组件库）</li>
      <li>Echarts 5.0</li>
      <li>axios</li>
      <li>wangEditor</li>
    </ul>
<!--    <h1>联系作者</h1>-->
<!--    <ul>-->
<!--      <li>Telegram : @nine183183</li>-->
<!--    </ul>-->
  </el-card>
</template>

<script setup>
const goJuejin = () => {
  console.log('goJuejin')
  window.open('https://juejin.cn/book/6933939264455442444', 'target')
}
</script>
<style scoped>
  .course {
    font-weight: bold;
    display: inline-block;
  }
  .course li {
    line-height: 36px;
    color: #409eff;
    cursor: pointer;
  }
</style>