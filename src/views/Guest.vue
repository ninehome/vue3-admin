<template>
  <el-card class="guest-container">
    <template #header>
      <div class="header">
        <el-button type="primary" :icon="Plus" @click="handleSolve">解除禁用</el-button>
        <el-button type="danger" :icon="Delete" @click="handleForbid">禁用账户</el-button>

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
          prop="nickName"
          label="昵称"
        >
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
            label="操作"
        >

          <el-button type="primary" @click="updateUser">修改</el-button>
        </el-table-column>

      </template>
    </Table>
  </el-card>
</template>

<script setup >
import { ref } from 'vue'
import Table from '@/components/Table.vue'
import { ElMessage } from 'element-plus'
import { Plus, Delete } from '@element-plus/icons-vue'
import axios from '@/utils/axios'

const table = ref(null)
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

//修改用户余额 和 等级
const  updateUser=()=>{
  console.log(22222)

}
</script>

<style>

</style>