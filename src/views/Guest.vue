<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleSolve">解除禁用</el-button>
        <el-button type="danger" :icon="Delete" @click="handleForbid">禁用账户</el-button>
        <div class="header">

          <el-button type="primary" :icon="Refresh" @click="handleAdd">点击刷新</el-button>
          <el-icon style="width: 40px;height: 40px ;padding-top: 10px "><Refresh/></el-icon>
        </div>
      </div>


      <div>
        <el-input  style="width: 300px ;margin-top: 20px" v-model="state.user_name"  placeholder="请输入用户名" class="input-search-user"      clearable></el-input>
        <el-button type="primary" @click="searchUser()"  style="width: 80px ;margin-top: 20px ; margin-left: 20px">{{ '搜索'}}</el-button>

      </div>

    </template>

    <Table
      action='/users'
      ref="table"
    >
      <template #column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="loginName"
          label="登录名"
        >
        </el-table-column>
        <el-table-column
          label="身份状态"
        >
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.lockedFlag == 0 ? '正常' : '禁用' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          label="是否注销"
        >
          <template #default="scope">
            <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
              {{ scope.row.isDeleted == 0 ? '正常' : '注销' }}
            </span>
          </template>
        </el-table-column>

        <el-table-column
            prop="userLevel"
            label="用户等级"
        >
        </el-table-column>
        <el-table-column
            prop="userMoney"
            label="用户余额"
        >
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="注册时间"
        >
        </el-table-column>

        <el-table-column
            prop="agentId"
            label="代理线"
        >
        </el-table-column>

        <el-table-column
            label="操作"
        >
          <template #default="scope">
            <el-button type="primary" @click="updateUser(scope.row.userId)">修改</el-button>
          </template>
        </el-table-column>

      </template>
    </Table>
  </el-card>
</template>

<script setup >
import { ref,reactive} from 'vue'
import Table from '@/components/Table.vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'
import md5 from "js-md5";
import {localGet, localSet, uploadImgServer} from "@/utils";

import { useRouter } from 'vue-router'
const router = useRouter()
const table = ref(null)




const state = reactive({
  user_name: '',
  acitonFlag:false,
  tableData: [], // 数据列表
})



const searchUser = () => {

  if (state.acitonFlag ===true){
    ElMessage.success('已经处理中，不要连续点击')
    return
  }
//回购 --- >修改订单状态
  if (state.user_name ===''){
    ElMessage.success('请输入用户名')
    return
  }
  state.acitonFlag = true
  console.log(state.user_name)
  axios.post('/user/user/info',{
    "loginName":state.user_name
  }).then(res => {
    state.acitonFlag = false
    console.log(123121212)
    console.log(res)

    state.tableData = res.list
    // goTop && goTop() // 回到顶部
    // // state.user = res
    // state.nameForm.userLevel = res.userLevel
    // state.nameForm.userMoney = res.userMoney
    // state.nameForm.loginName = res.loginName
    // state.nameForm.userId = res.userId
  })


}




const handleSolve = () => {
    if (!table.value.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }
    axios.put(`/users/0`, {
      ids: table.value.multipleSelection.map(item => item.userId)
    }).then(() => {
      ElMessage.success('解除成功')
      table.value.getList()
    })
}
const handleForbid = () => {
    if (!table.value.multipleSelection.length) {
      ElMessage.error('请选择项')
      return
    }

    axios.put(`/users/1`, {
      ids: table.value.multipleSelection.map(item => item.userId)
    }).then(() => {
      ElMessage.success('禁用成功')
      table.value.getList()
    })
}




// "/manage-api/v1/users?pageNumber=1&pageSize=10"

//修改用户余额 和 等级

const  updateUser=(id)=>{
  router.push({ path: '/update_user', query: { type: id }})

}
</script>

<style scoped>
 .guest-container.input-search-user{
   width: 100px;
   height: 50px;
 }

</style>
