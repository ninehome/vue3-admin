<template>
  <el-card class="good-container">

    <el-table
        :load="state.loading"
        :data="state.tableData"
        tooltip-effect="dark"
        style="width: 100%"
    >
      <el-table-column
          prop="ChatId"
          label="编号"
      >
      </el-table-column>

      <el-table-column
          prop="ChatName"
          label="社交类型"
      >
      </el-table-column>
      <el-table-column
          prop="ChatValue"
          label="账号"
      >
      </el-table-column>


      <el-table-column
          label="是否显示"
          width="100"
      >
        <template #default="scope">

                    <a style="cursor: pointer; margin-right: 10px ;color: #de0b4a" v-if="scope.row.isDeleted !== 1" >已隐藏</a>
                    <a style="cursor: pointer; margin-right: 10px " v-else >已显示</a>
        </template>
      </el-table-column>


      <el-table-column
          label="操作"
          width="100"
      >
        <template #default="scope">
          <a style="cursor: pointer; margin-right: 10px" @click="handleEdit(scope.row.ChatId)">修改</a>
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
// 获取轮播图列表
const getGoodList = () => {
  state.loading = true
  axios.get('/user/chatList', {
    params: {
      pageNumber: state.currentPage,
      pageSize: state.pageSize
    }
  }).then(data => {
    state.tableData = data

    console.log(data)


    goTop && goTop()
  })
}
const handleAdd = () => {
  router.push({ path: '/add' })
}


const handleEdit = (id) => {
  console.log(id)

  router.push({ path: '/update_chat', query: { id } })
}




const changePage = (val) => {
  state.currentPage = val
  getGoodList()
}
const handleStatus = (id, status) => {
  axios.put(`/goods/status/${status}`, {
    ids: id ? [id] : []
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
