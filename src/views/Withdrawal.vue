<template>
  <el-card class="good-container">

    <el-table
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
        <a style="cursor: pointer; margin-right: 10px" @click="copyBill(scope.row)">复制</a>
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
import { onMounted, reactive, getCurrentInstance } from 'vue'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
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
  pageSize: 10 // 分页大小
})
onMounted(() => {
  getGoodList()
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
    goTop && goTop()
  })
}
const handleAdd = () => {
  // router.push({ path: '/add' })
}
// const handleEdit = (id) => {
//    router.push({ path: '/add', query: { id } })
// }
const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}



//点击某个摁扭执行事件
 const copyBill = (bankName,bankAccount,name,money) =>{
   //
   // {
   //   "withdraw": {
   //   "withdrawId": 13,
   //       "userId": 7,
   //       "bankId": 1,
   //       "loginName": "noe",
   //       "userMoney": 16402,
   //       "userLevel": 0,
   //       "withdrawMoney": 55,
   //       "dealFlag": 2,
   //       "createTime": "2022-12-12 10:38:30",
   //       "userIpAddr": "",
   //       "agentId": "6001"
   // },
   //   "bank": {
   //   "bankId": 1,
   //       "userId": 7,
   //       "bankName": "russbank",
   //       "userName": "noe",
   //       "bankNumber": "11111111111111111",
   //       "default": 1,
   //       "isDeleted": 0
   // }
   // }


  let url = 要复制的值;
  //新建一个文本框
  let oInput = document.createElement('input');
  //赋值给文本框
  oInput.value = url;
  document.body.appendChild(oInput);
  // 选择对象;
  oInput.select();
  // 执行浏览器复制命令
  document.execCommand("Copy");
  //复制完成删除掉输入框
  oInput.remove()
  console.log('复制成功')
}


//驳回
const handleRejected = (id) => {
  console.log(33333333333)
  console.log(id)
  console.log(33333333333)
  axios.post(`/update/withdrawal`, {
    "withdrawId": id,
    "dealFlag":2
  }).then(() => {
    ElMessage.success('修改成功')
    getGoodList()
  })
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
