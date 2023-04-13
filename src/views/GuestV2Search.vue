<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleSolve">解除禁用</el-button>
        <el-button type="danger" :icon="Delete" @click="handleForbid">禁用账户</el-button>
        <div class="header">
          <el-button type="primary" :icon="Refresh" @click="clearInput">点击刷新</el-button>
          <el-icon style="width: 40px;height: 40px ;padding-top: 10px ">
            <Refresh/>
          </el-icon>
        </div>
      </div>

      <div>
        <el-input style="width: 300px ;margin-top: 20px"
                  v-model="state.user_name"
                  placeholder="请输入用户名"
                  class="input-search-user"
                  @clear = "clearInput"
                  clearable></el-input>

        <el-button type="primary" @click="searchUser()" style="width: 80px ;margin-top: 20px ; margin-left: 20px">
          {{ '搜索' }}
        </el-button>
      </div>



    </template>


    <el-table
        :key="state.key"
        :load="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
    >

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
            label="提现状态"
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

      <el-table-column
          label="提现"
      >
        <template #default="scope">

          <span :style="scope.row.lockedFlag == 0 ? 'color: green;' : 'color: red;'">
                <el-button type="primary" @click="updateLockedFlag(scope.row)">  {{ scope.row.lockedFlag == 0 ? '禁用' : '解除' }} </el-button>
         </span>

        </template>
      </el-table-column>

    </el-table>
    <!--总数超过一页，再展示分页器-->
    <el-pagination
        background
        layout="prev, pager, next"
        :total="state.total"
        :page-size="state.pageSize"
        :current-page="state.currentPage"
        @current-change="changePage"
    />


  </el-card>
</template>

<script setup>
import {ref, reactive, getCurrentInstance, onMounted} from 'vue'
import {ElMessage} from 'element-plus'
import {Plus, Delete} from '@element-plus/icons-vue'
import axios from '@/utils/axios'

import {useRouter} from 'vue-router'

const router = useRouter()
const table = ref(null)

const props = defineProps({
  action: String
})

const app = getCurrentInstance()
const {goTop} = app.appContext.config.globalProperties
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 20, // 分页大小
  multipleSelection: [],
  user_name: '',
  acitonFlag: false,
  key: 0,

})
onMounted(() => {
  getList()
})

const getList = () => {
  state.loading = true
  axios.get('/users', {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize
    }
  }).then(res => {
    state.tableData = res.list
    state.total = res.totalCount
    state.currentPage = res.currPage
    state.loading = false
    state.key = Math.random()
    goTop && goTop()
    state.actionFlag = false

  })
}

const handleSelectionChange = (val) => {
  state.multipleSelection = val
}

const changePage = (val) => {
  state.currentPage = val

  getList()
}


// 刷新
const clearInput = ()=>{
  getList()
}

const searchUser = () => {

  if (state.acitonFlag === true) {
    ElMessage.success('已经处理中，不要连续点击')
    return
  }
//回购 --- >修改订单状态
  if (state.user_name === '') {
    ElMessage.success('请输入用户名')
    return
  }
  state.acitonFlag = true
  console.log(state.user_name)
  axios.post('/user/user/info', {
    "loginName": state.user_name
  }).then(res => {
    state.acitonFlag = false
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
  // if (!table.value.multipleSelection.length) {
  //   ElMessage.error('请选择项')
  //   return
  // }
  // axios.put(`/users/0`, {
  //   ids: table.value.multipleSelection.map(item => item.userId)
  // }).then(() => {
  //   ElMessage.success('解除成功')
  //   getList()
  // })
}
const handleForbid = () => {
  // if (!table.value.multipleSelection.length) {
  //   ElMessage.error('请选择项')
  //   getList()
  // }
  //
  // axios.put(`/users/1`, {
  //   ids: table.value.multipleSelection.map(item => item.userId)
  // }).then(() => {
  //   ElMessage.success('禁用成功')
  //   getList()
  // })
}


//修改用户余额 和 等级

const updateUser = (id) => {
  router.push({path: '/update_user', query: {type: id}})
}

const updateLockedFlag = (user) =>{
  let url = ''
  if(user.lockedFlag ==1 ){
    url = `/users/0`
  }else {
    url = `/users/1`
  }

  axios.put(url, {
    ids: user.userId
  }).then(() => {
    ElMessage.success('禁用成功')
    getList()
  })

}


</script>

<style scoped>
.guest-container.input-search-user {
  width: 100px;
  height: 50px;
}

</style>
