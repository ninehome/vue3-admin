<template>
  <el-card class="account-container">

    <el-form :model="state.nameForm"  ref="nameRef" label-width="180px" label-position="right" class="demo-ruleForm">

<!--      <el-form-item label="用户账号：" prop="loginName">-->
<!--        <el-input style="width: 200px" v-model="state.nameForm.loginName" disabled ="false"></el-input>-->
<!--      </el-form-item>-->


      <el-form-item label="私信：" prop="loginName">
        <el-input style="width: 800px" v-model="state.nameForm.msg"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="danger" @click="createMsg">创建私信</el-button>
      </el-form-item>


      <el-form-item>
        <el-button type="danger" @click="subMit">隐藏私信</el-button>
      </el-form-item>

    </el-form>


<!--    <el-table-->
<!--        :key="state.key"-->
<!--        :load="state.loading"-->
<!--        :data="state.tableData"-->
<!--        tooltip-effect="dark"-->
<!--        style="width: 100%"-->
<!--    >-->

<!--      <el-table-column-->
<!--          type="selection"-->
<!--          width="55">-->
<!--      </el-table-column>-->

<!--      <el-table-column-->
<!--          prop="bankName"-->
<!--          label="银行名称"-->
<!--      >-->
<!--      </el-table-column>-->


<!--      <el-table-column-->
<!--          prop="bankNumber"-->
<!--          label="账户号码"-->
<!--      >-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--          prop="userName"-->
<!--          label="用户名"-->
<!--      >-->
<!--      </el-table-column>-->


<!--      <el-table-column-->
<!--          label="操作"-->
<!--      >-->
<!--        <template #default="scope">-->
<!--          <el-button type="primary" @click="handleEdit(scope.row.bankId)">修改</el-button>-->
<!--        </template>-->

<!--      </el-table-column>-->


<!--    </el-table>-->



  </el-card>


<!--  <el-dialog-->
<!--      title="编辑"-->
<!--      v-model="state.visible"-->
<!--      width="400px"-->
<!--  >-->
<!--    <el-form :model="state.ruleForm"  ref="formRef" label-width="100px" class="good-form">-->
<!--      <el-form-item label="卡号修改" prop="name">-->
<!--        <el-input type="text" v-model="state.bankNumber"></el-input>-->
<!--      </el-form-item>-->

<!--    </el-form>-->
<!--    <template #footer>-->
<!--      <span class="dialog-footer">-->
<!--        <el-button @click="state.visible = false">取 消</el-button>-->
<!--        <el-button type="primary" @click="updateUser()">确 定</el-button>-->
<!--      </span>-->
<!--    </template>-->
<!--  </el-dialog>-->
</template>

<script setup>

import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
import md5 from "js-md5";
import {localSet} from "@/utils";
import {ElMessage} from "element-plus"; //useRouter 全局  useRoute当前
const router = useRoute()
import {useRouter, useRoute} from 'vue-router'
const routermian = useRouter()
let uid
//视图响应对象   reactive取值赋值不需要.value方式  。视图响应对象   reactive取值赋值不需要.value方式
//对基本 数据类型 无效
const state = reactive({
  user: null,
  type: 'add', // 操作类型
  dialogFormVisible: false,
  bankid:0,
  bankNumber:'',
  nameForm: {
    msg: '',
    userMoney: '0',
    loginName:'0',
    userId:0,
    userpsw:'',
    addMoney:'',
    rechargeMoney:'',
    dropMoney:''
  },
  tableData:[],
  key: 0,
  visible: false,
  categoryLevel: 1,
  parentId: 0,
  ruleForm: {
    name: '',
    rank: ''
  },

  id: ''
})


onMounted(() => {
  uid =  router.query.type
  axios.post('/user/profile',{
    "userId":Number(uid),
    "MsgTxt":state.nameForm.msg
  }).then(res => {

    ElMessage({
      message: '操作成功!!!',
      grouping: true,
      type: 'success',
    })


  })

})



//显示弹窗
const handleEdit = (id) => {
  state.visible = true
  state.bankid = id

  for (const v of state.tableData) {
    if(v.bankId ===   state.bankid ){
      state.bankNumber =v.bankNumber
    }
  }


}

// 修改卡号
const  createMsg=()=>{

  axios.post('/user/msg/creat', {
    "userId":Number(uid),
    "MsgTxt":state.nameForm.msg

  }).then(res => {
    ElMessage({
      message: '操作成功!!!',
      grouping: true,
      type: 'success',
    })
    state.visible = false
    getBankList()

  })
}



const  getBankList=()=>{
  axios.post('/userBank/list', {
    "userId":Number(uid)
  }).then(res => {
    state.tableData = res
  })
}

</script>

<style>
  .account-container {
    margin-bottom: 20px;
  }
</style>
