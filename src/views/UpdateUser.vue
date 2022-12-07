<template>
  <el-card class="account-container">

    <el-form :model="state.nameForm"  ref="nameRef" label-width="180px" label-position="right" class="demo-ruleForm">
      <el-form-item label="用户账号：" prop="loginName">
        <el-input style="width: 200px" v-model="state.nameForm.loginName" disabled ="false"></el-input>
      </el-form-item>

      <el-form-item label="VIP等级：" prop="loginName">
        <el-input style="width: 200px" v-model="state.nameForm.userLevel"></el-input>
      </el-form-item>


      <el-form-item label="账户余额：" prop="nickName">
        <el-input style="width: 200px" v-model="state.nameForm.userMoney"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="danger" @click="subMit">确认修改</el-button>
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
let uid
//视图响应对象   reactive取值赋值不需要.value方式  。视图响应对象   reactive取值赋值不需要.value方式
//对基本 数据类型 无效
const state = reactive({
  user: null,
  nameForm: {
    userLevel: '0',
    userMoney: '0',
    loginName:'0',
    userId:0
  },

})


onMounted(() => {
  uid =  router.query.type


  axios.post('/user/profile',{
    "UserId":uid
  }).then(res => {
    // console.log(res)
    // state.user = res
    state.nameForm.userLevel = res.userLevel
    state.nameForm.userMoney = res.userMoney
    state.nameForm.loginName = res.loginName
    state.nameForm.userId = res.userId
  })

})


const  subMit=()=>{
let  money  = state.nameForm.userMoney
let  level = state.nameForm.userLevel
  axios.post('/adminUser/moneyAndLevel', {
    "userMoney":Number(money),
    "userLevel":Number(level),
    "userId":Number(uid)
  }).then(res => {
      ElMessage.error('修改成功！')
      routermian.push('/guest')
  })



}

</script>

<style>
  .account-container {
    margin-bottom: 20px;
  }
</style>