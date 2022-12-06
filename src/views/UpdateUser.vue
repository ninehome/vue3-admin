<template>
  <el-card class="account-container">


    <el-form :model="state.nameForm"  ref="nameRef" label-width="80px" label-position="right" class="demo-ruleForm">
      <el-form-item label="用户等级：" prop="loginName">
        <el-input style="width: 200px" v-model="state.nameForm.loginName"></el-input>
      </el-form-item>


      <el-form-item label="账户余额：" prop="nickName">
        <el-input style="width: 200px" v-model="state.nameForm.nickName"></el-input>
      </el-form-item>


      <el-form-item>
        <el-button type="danger" @click="submitName">确认修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import axios from '@/utils/axios'
// import { ElMessage } from 'element-plus'
// import md5 from 'js-md5'
import { useRouter } from 'vue-router'


const router = useRouter()

const nameRef = ref(null)
const passRef = ref(null)

let uid
const state = reactive({
  user: null,
  nameForm: {
    loginName: '',
    nickName: ''
  },
  passForm: {
    oldpass: '',
    newpass: ''
  },
})
onMounted(() => {
  axios.post('/user/profile').then(res => {
    state.user = res
    state.nameForm.loginName = res.loginUserName
    state.nameForm.nickName = res.nickName
  })

  uid = router.params.id
})


console.log(uid)

const  updateUser=(id)=>{
  console.log(22222)
  localGet('token')
  axios.post('/adminUser/moneyAndLevel', {
    userMoney: 3333,
    userLevel: 2,
    userId:7,
  }).then(res => {

  })

}

</script>

<style>
  .account-container {
    margin-bottom: 20px;
  }
</style>