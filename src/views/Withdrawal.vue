<template>
  <el-card class="good-container">

    <template #header>
      <div class="header">
        <el-icon style="width: 40px;height: 40px"><Refresh/></el-icon>
        <el-button type="primary" :icon="Refresh" @click="handleAdd">点击刷新</el-button>
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
          prop="withdraw.withdrawId"
          label="提款编号"
      >
      </el-table-column>
      <el-table-column
          prop="withdraw.loginName"
          label="用户账号"
      >
      </el-table-column>
      <el-table-column
          prop="withdraw.agentId"
          label="代理线"
      >
      </el-table-column>
      <el-table-column
          prop="withdraw.userLevel"
          label="vip等级"
      >
      </el-table-column>

      <el-table-column
          prop="bank.bankName"
          label="提款银行"
      >
      </el-table-column>

      <el-table-column
          prop="bank.bankNumber"
          label="银行账户"
          style="width: 200px"
      >
      </el-table-column>
      <el-table-column
          prop="bank.userName"
          label="银行姓名"
      >
      </el-table-column>
      <el-table-column
          prop="withdraw.withdrawMoney"
          label="提款金额">
      </el-table-column>
      <el-table-column
          prop="withdraw.createTime"
          label="提款时间"
      >
      </el-table-column>
      <el-table-column
          label="复制信息"
      >
        <template #default="scope">
        <a style="cursor: pointer; margin-right: 10px" @click="copyBill(scope.row)">复制</a>
        </template>
      </el-table-column>

      <el-table-column
          label="出款状态"
      >
        <template #default="scope">
          <span style="color: rgb(12,236,117);" v-if="scope.row.withdraw.dealFlag === 0">待出款</span>
          <span style="color: rgb(12,236,117);" v-else-if="scope.row.withdraw.dealFlag === 1">已出款</span>
          <span style="color: red;" v-else-if="scope.row.withdraw.dealFlag === 2">已驳回</span>
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="100">
        <template #default="scope">

          <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.withdraw.dealFlag === 0"   @click="handleConfirm(scope.row.withdraw.withdrawId)">确认提款</a>
          <span style="color: rgba(153,153,153,0.37);" v-else >已经处理</span>
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px"  v-if="scope.row.withdraw.dealFlag === 0"  @click="handleRejected(scope.row.withdraw.withdrawId)">驳回提款</a>
          <span style="color: rgba(153,153,153,0.37);" v-else >已经处理</span>

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
import {onMounted, reactive, getCurrentInstance, onBeforeUnmount} from 'vue'
import axios from '@/utils/axios'
import { ElMessage ,ElLoading} from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'


const app = getCurrentInstance()
const { goTop } = app.appContext.config.globalProperties
const router = useRouter()
const state = reactive({
  loading: false,
  tableData: [], // 数据列表
  total: 0, // 总条数
  currentPage: 1, // 当前页
  pageSize: 30 ,// 分页大小
  actionFlag:false,
  key:0,
  timer: null

})
onMounted(() => {
  getGoodList()

  //每10s刷新数据
  state.timer = setInterval(() => {
    handleAdd();
  }, 20000);
})

onBeforeUnmount(() => {
  clearInterval(state.timer)
  state.timer = null;
})
// 获取列表
const getGoodList = () => {
  state.loading = true
   axios.post('/users/withdrawals',{
    pageNumber: state.currentPage,
    pageSize: state.pageSize
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


const searchUser = () => {
  state.currentPage = 1
  state.loading = true
  axios.post('/users/withdrawals/withName',{
    pageNumber: state.currentPage,
    pageSize: state.pageSize,
    loginName: state.user_name,
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







const handleAdd = () => {
  getGoodList()
}
// const handleEdit = (id) => {
//    router.push({ path: '/add', query: { id } })
// }
const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}


//点击某个摁扭执行事件
 const copyBill = (data) =>{

   let bankName = "银行名称："+data.bank.bankName+"   ";
   let bankAccount = "银行账户："+data.bank.bankNumber+"  ";
   let userName = "姓名："+data.bank.userName+"  ";
   let Money = "金额："+data.withdraw.withdrawMoney+"  ";

  //新建一个文本框
  let oInput = document.createElement('textarea');
  // oInput.value = this.doc
  //赋值给文本框
  oInput.value = bankName+'\r\n' +bankAccount+'\r\n' +userName +'\r\n'+Money;
  document.body.appendChild(oInput);
  // 选择对象;
  oInput.select();
  // 执行浏览器复制命令
  document.execCommand("Copy");
   document.body.removeChild(oInput)
  //复制完成删除掉输入框
  oInput.remove()
  ElMessage.success('复制成功')

}


//驳回
const handleRejected = (id) => {
  if (state.actionFlag === true){
    ElMessage.success('请不要重复点击')
  }else {
    state.actionFlag = true
    axios.post(`/update/withdrawal`, {
      "withdrawId": id,
      "dealFlag":2
    }).then(() => {
      ElMessage.success('修改成功')
      getGoodList()
    })
  }




}



//确认提款
const handleConfirm = (id) => {
  axios.post(`/update/withdrawal`, {
    "withdrawId": id,
    "dealFlag":1
  }).then(() => {
    ElMessage.success('修改成功')
    getGoodList()
  })
}
</script>

<style scoped>
.good-container {
  min-height: 100%;
}


.el-card.is-always-shadow {
  min-height: 100%!important;
}
</style>
