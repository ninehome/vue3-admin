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
          label="出款状态"
      >
        <template #default="scope">
          <span style="color: red;" v-if="scope.row.withdraw.dealFlag === 0">未出款</span>
          <span style="color: green;" v-else="scope.row.withdraw.dealFlag === 1">已出款</span>
<!--          <span style="color: yellow;" v-else>异常订单</span>-->
        </template>
      </el-table-column>

      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.goodsId)">修改</a>
<!--          <a style="cursor: pointer; margin-right: 10px" v-if="scope.row.goodsSellStatus == 0" @click="handleStatus(scope.row.goodsId, 1)">下架</a>-->
<!--          <a style="cursor: pointer; margin-right: 10px" v-else @click="handleStatus(scope.row.goodsId, 0)">上架</a>-->
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
const handleEdit = (id) => {
  // router.push({ path: '/add', query: { id } })
}
const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}
const handleStatus = (id, status) => {
  // axios.put(`/goods/status/${status}`, {
  //   ids: id ? [id] : []
  // }).then(() => {
  //   ElMessage.success('修改成功')
  //   getGoodList()
  // })
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
