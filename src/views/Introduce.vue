<template>
  <el-card class="account-container">
    <h1>系统简介</h1>
    <div style="line-height: 30px">
      vue3-admin 是一套企业级后台管理系统，基于 Spring Boot 、Vue 3.0 相关技术栈开发，供各位开发者们体验和学习，一定给你最好的学习体验。
    </div>
    <img style="width: 70%;
      display: block;
      margin: 0 auto;" src="https://s.yezgea02.com/1616331765416/WechatIMG40038.png" alt="">
    <h1>开发及部署文档</h1>
    <img style="width: 70%;
      display: block;
      margin: 0 auto;" src="https://s.yezgea02.com/1616938239101/419241616938196_.pic.jpg" />

    <h1>技术选型</h1>
    <ul style="font-weight: bold;">
      <li>Vue 3.x</li>
      <li>Vite 2.x</li>
      <li>Vue-Router 4.x</li>
      <li>Element-Plus（适配全新 Vue 3.x 的 PC 端组件库）</li>
      <li>Echarts 5.0</li>
      <li>axios</li>
      <li>wangEditor</li>
    </ul>
    <h1>联系作者</h1>
    <ul>
      <li>我的邮箱：2449207463@qq.com</li>
      <li>QQ技术交流群：932227898、707779034</li>
    </ul>
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