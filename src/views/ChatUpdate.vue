<template>
  <el-card class="account-container">

    <el-form :model="state.nameForm"  ref="nameRef" label-width="180px" label-position="right" class="demo-ruleForm">
      <el-form-item label="类型：" prop="loginName">
        <el-input style="width: 100px" v-model="state.nameForm.loginName" disabled ="false"></el-input>
      </el-form-item>

<!--      <el-form-item label="VIP等级：" prop="loginName">-->
<!--        <el-input style="width: 200px" v-model="state.nameForm.userLevel" disabled ="false"></el-input>-->
<!--      </el-form-item>-->


      <el-form-item label="账号：" prop="nickName">
        <el-input style="width: 400px" v-model="state.nameForm.userMoney"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="subMit">确认修改</el-button>
      </el-form-item>


      <el-form-item>
        <el-button type="warning" @click="showChat" v-show="true">显示联系方式</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="warning" @click="hidChat"  v-show="true">隐藏联系方式</el-button>
      </el-form-item>


    </el-form>


  </el-card>

</template>

<script setup>

import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import {useRouter, useRoute} from 'vue-router'
import md5 from "js-md5";
import {localSet} from "@/utils";
import {ElMessage} from "element-plus"; //useRouter 全局  useRoute当前
const router = useRoute()
const routermian = useRouter()
// const nameRef = ref(null)
let chatID
//视图响应对象   reactive取值赋值不需要.value方式  。视图响应对象   reactive取值赋值不需要.value方式
//对基本 数据类型 无效
const state = reactive({
  user: null,
  nameForm: {
    // userLevel: '0',
    userMoney: '0',
    loginName:'0',
    userId:0
  },

})


onMounted(() => {
  chatID = router.query.id
  axios.post('/chat/profile',{
    "chatId":chatID
  }).then(res => {
    console.log(res)

    // state.nameForm.userLevel = res.userLevel
    state.nameForm.userMoney = res.ChatValue
    state.nameForm.loginName = res.ChatName
    state.nameForm.userId = res.ChatId
  })

})






const  subMit=()=>{
let  money  = state.nameForm.userMoney
  axios.post('/chat/update', {
    "ChatValue":money,
    "isDeleted":1,
    "ChatId":Number(chatID)
  }).then(res => {
    ElMessage({
      message: '操作成功!!!',
      grouping: true,
      type: 'success',
    })
      routermian.push('/mall_chat')
  })

}





// 1-显示  2-隐藏

const  showChat=()=>{
  let  money  = state.nameForm.userMoney
  axios.post('/chat/update', {
    "ChatValue":money,
    "isDeleted":1,
    "ChatId":Number(chatID)
  }).then(res => {
    ElMessage({
      message: '操作成功!!!',
      grouping: true,
      type: 'success',
    })
    routermian.push('/mall_chat')
  })

}

const  hidChat=()=>{
  let  money  = state.nameForm.userMoney
  axios.post('/chat/update', {
    "ChatValue":money,
    "isDeleted":2,
    "ChatId":Number(chatID)
  }).then(res => {
    ElMessage({
      message: '操作成功!!!',
      grouping: true,
      type: 'success',
    })
    routermian.push('/mall_chat')
  })

}



</script>

<style>
  .account-container {
    margin-bottom: 20px;
  }
</style>