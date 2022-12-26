<template>
  <div class="add">
    <el-card class="add-container">
      <el-form :model="state.goodForm" :rules="state.rules" ref="goodRef" label-width="100px" class="goodForm">


        <div>
          <el-header style="width: 300px" >商品图片</el-header>
          <img :src="state.goodForm.goodsCoverImg" style="width: 200px ;height: 200px">
        </div>

        <el-form-item label="商品名称" prop="goodsName" >
          <el-header style="width: 300px"  >{{ state.goodForm.goodsName}}</el-header>
        </el-form-item>

        <el-form-item label="商品售卖价" prop="sellingPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="state.goodForm.sellingPrice" placeholder="请输入商品售价"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{ '立即修改'}}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import WangEditor from 'wangeditor'
import axios from '@/utils/axios'
import { ElMessage } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

//图片上传
import { localGet, uploadImgServer, uploadImgsServer } from '@/utils'

const { proxy } = getCurrentInstance()
const editor = ref(null)
const goodRef = ref(null)
const route = useRoute()
const router = useRouter()
const { id } = route.query



const state = reactive({
  uploadImgServer,
  token: localGet('token') || '',
  id: id,
  defaultCate: '',
  goodForm: {
    goodsName: '',
    goodsIntro: '',
    originalPrice: '',
    sellingPrice: '',
    stockNum: '',
    goodsSellStatus: '0',
    goodsCoverImg: '',
    tag: ''
  },

  categoryId: '',

})
// let instance
onMounted(() => {

  console.log(111111111111)
  console.log(id)
  console.log(22222222222222)
  if (id) {
    axios.get(`/goods/${id}`).then(res => {

      console.log(res)
      const { goods, firstCategory, secondCategory, thirdCategory } = res

      console.log(goods)
      // sellingPrice: goods.sellingPrice,
      //
      state.goodForm.goodsName  =goods.goodsName
      state.goodForm.sellingPrice = goods.sellingPrice
      state.goodForm.goodsCoverImg = goods.goodsCoverImg
    })
  }
})



const submitAdd = () => {
  goodRef.value.validate((vaild) => {
    if (vaild) {
      // 默认新增用 post 方法
      let params = {
        goodsId:id,
        sellingPrice:   state.goodForm.sellingPrice
      }

      axios.post('/goods/update', params).then((res) => {
        ElMessage.success('修改成功')
        router.push({ path: '/good' })
      })
    }
  })
}

</script>


<style scoped>
  .add {
    display: flex;
  }
  .add-container {
    flex: 1;
    height: 100%;
  }
  .avatar-uploader {
    width: 100px;
    height: 100px;
    color: #ddd;
    font-size: 30px;
  }
  .avatar-uploader-icon {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid #e9e9e9;
    padding: 32px 17px;
  }
</style>