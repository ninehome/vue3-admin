<template>
  <div class="add">
    <el-card class="add-container">
      <el-form :model="state.goodForm" :rules="state.rules" ref="goodRef" label-width="100px" class="goodForm">

        <div>
          <el-header style="width: 200px; color: #1baeae ;margin-top: -10px" >商品回购订单编号: {{state.dataForm.orderNo}}</el-header>
        </div>

        <el-table
            :data="state.dataForm.orderList"
            tooltip-effect="dark"
            style="width: 100%"
        >
          <el-table-column
              prop="goodsId"
              label="商品编号"
          >
          </el-table-column>


          <el-table-column
              prop="goodsName"
              label="商品名"
          >
          </el-table-column>

          <el-table-column
              label="商品图片"
              width="150px"
          >
            <template #default="scope">
              <img style="width: 100px; height: 100px;" :key="scope.row.goodsId" :src="scope.row.goodsCoverImg" alt="商品主图">
            </template>
          </el-table-column>

          <el-table-column
              prop="sellingPrice"
              label="商品售价"
          >
          </el-table-column>


        </el-table>





        <el-form-item label="总价格" prop="totalPrice" style="margin-top: 30px;">
          <el-input type="number" min="0" style="width: 300px" v-model="state.dataForm.totalPrice" placeholder="请输入商品售价"  disabled ="false" ></el-input>
        </el-form-item>

        <el-form-item label="回购价格" prop="backPrice">
          <el-input type="number" min="0" style="width: 300px" v-model="state.dataForm.backPrice"  placeholder="请输入商品售价"  ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitAdd()">{{ '确认回购'}}</el-button>
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
  dataForm: {
    goodsName: '',
    goodsIntro: '',
    totalPrice: 0,
    backPrice: 0,
    stockNum: '',
    goodsSellStatus: '0',
    orderNo:'',
    goodsCoverImg: '',
    tag: '',
    orderList:[]
  },
  data:{},
  // data:{
  //   "orderId": 8,
  //   "orderNo": "",
  //   "totalPrice": 0,
  //   "payType": 1,
  //   "payTypeString": "",
  //   "orderStatus": 4,
  //   "orderStatusString": "",
  //   "createTime": "2022-12-13 12:26:23",
  //   "newBeeMallOrderItemVOS": [
  //     {
  //       "goodsId": 10233,
  //       "goodsName": "",
  //       "goodsCount": 1,
  //       "goodsCoverImg": "/goods-img/04949c0e-87df-445b-96dd-29e7fc69f734.jpg",
  //       "sellingPrice": 355
  //     }
  //   ]
  // },
  // urls: [
  //   'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  //   'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  //   'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
  // ],

  categoryId: '',

})
// let instance
onMounted(() => {

  if (id) {
    axios.get(`/orders/${id}`).then(res => {

      // state.data = res.data
      state.dataForm.totalPrice = res.totalPrice
      state.dataForm.orderList = res.newBeeMallOrderItemVOS
      state.dataForm.orderNo = res.orderNo
      // console.log( state.dataForm.orderList)
      // state.goodForm.goodsName  =goods.goodsName
      // state.goodForm.sellingPrice = goods.sellingPrice
      // state.goodForm.goodsCoverImg = goods.goodsCoverImg
    })
  }
})



const submitAdd = () => {

    // if (vaild) {
    //   // 默认新增用 post 方法
    //   let params = {
    //     goodsId:id,
    //     sellingPrice:   state.dataForm.backPrice
    //   }
    //
    //   axios.post('/goods/update', params).then((res) => {
    //     ElMessage.success('修改成功')
    //     router.push({ path: '/good' })
    //   })
    // }


    // console.log("ssssssssss")
    // console.log(raw.orderNo)
    // console.log("ssssssssss")
    //
    // //回购 --- >修改订单状态
    axios.post('/orders/back', {
        orderNo: state.dataForm.orderNo,
        orderMoney :Number.parseInt(state.dataForm.backPrice)
      }
    ).then(res => {


      ElMessage.success("回购成功")

      router.push('/mall_collect')
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


