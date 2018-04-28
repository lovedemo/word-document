<template>
  <div >
    <y-shelf title="我的订单">
      <div slot="content" class="mydiv">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我是买家" name="first">

            <div v-if="orderList.length">
              <el-table
                :data="orderList"
                style="width: 100%">
                <el-table-column
                  label="封面">
                  <template slot-scope="scope" class="book">
                    <img class="bookImg" v-if="scope.row.books[0]" :src="scope.row.books[0].imgList">
                  </template>
                </el-table-column>
                <el-table-column
                  label="书籍名称">
                  <template slot-scope="scope" >
                    <div class="book-info">
                      <p>
                        {{scope.row.books[0].bookName}}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="价格">
                  <template slot-scope="scope" >
                    <div class="book-info">
                      <p>
                        {{scope.row.books[0].price}}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="数量">
                  <template slot-scope="scope" >
                    <div class="book-info">
                      <p>
                        {{scope.row.books[0].bookNum}}
                      </p>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="状态">
                  <template slot-scope="scope" >
                    <div >
                      {{status[scope.row.status]}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope" >
                    <div >
                      <el-button v-if="scope.row.status==1" @click=changeStatus(scope.row,0)>取消</el-button>
                      <el-button v-if="scope.row.status==2" @click=changeStatus(scope.row,3)>确认收货</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-else>
              <div style="padding: 100px 0;text-align: center">
                你还未创建过订单
              </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="我是卖家" name="second">
          <div v-if="nextList.length">
            <el-table
              :data="nextList"
              style="width: 100%">
              <el-table-column
                label="封面">
                <template slot-scope="scope" class="book">
                  <img class="bookImg" v-if="scope.row.books[0]" :src="scope.row.books[0].imgList">
                </template>
              </el-table-column>
              <el-table-column
                label="书籍信息">
                <template slot-scope="scope" >
                  <div class="book-info">
                    <p>
                     {{scope.row.books[0].bookName}}
                    </p>
                    <p>
                      价格： {{scope.row.books[0].price}}
                    </p>
                    <p>
                     数量： {{scope.row.books[0].bookNum}}
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="地址信息">
                <template slot-scope="scope" >
                  <div >
                    <p>
                       {{scope.row.address.userName}}
                    </p>
                    <p>
                      {{scope.row.address.tel}}
                    </p>
                    <p>
                      {{scope.row.address.streetName}}
                    </p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="状态">
                <template slot-scope="scope" >
                  <div >
                    {{status[scope.row.status]}}
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                label="操作">
                <template slot-scope="scope" >
                  <div >
                    <el-button v-if="scope.row.status==1" @click=changeStatus(scope.row,2)>发货</el-button>

                  </div>
                </template>
              </el-table-column>

            </el-table>
          </div>
          <div v-else>
            <div style="padding: 100px 0;text-align: center">
              你还没有出售的订单
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      </div>
    </y-shelf>

  </div>
</template>
<script>
  import { orderList ,changeStatus} from '/api/orders'
  import YShelf from '/components/shelf'
  export default {
    data () {
      return {
        orderList: [],
        activeName:'first',
        nextList:[],
        status:["已取消","待发货",'已发货','已完成'],
      }
    },
    methods: {
      _orderList () {
        orderList().then(res => {
          this.orderList = res.result
        })
      },
      handleClick(tab, event) {
        if(tab.name=='second'){
          this._nextList();
        }else {
          this._orderList()
        }
      },
      _nextList(){
        orderList({type:1}).then(res => {
          this.nextList = res.result
        })
      },
      changeStatus(row,newStatus){
        changeStatus({orderId:row.orderId,status:newStatus}).then(res =>{
          console.log(res)
          this._nextList();
          this._orderList();
        })
      },

    },
    created () {
      this._orderList()
    },
    components: {
      YShelf
    }
  }
</script>
<style lang="scss" >
  @import "../../../assets/style/mixin";
  .mydiv{
    margin: 20px;
  }
  img{
    width: 100px;
    height: 100px;
  }
  .book{
    float:left ;
  }
  .book-info{
    line-height: 35px;
   p{
     font-size: 20px !important;

   }
  }
  .gray-sub-title {
    height: 38px;
    padding: 0 24px;
    background: #EEE;
    border-top: 1px solid #DBDBDB;
    border-bottom: 1px solid #DBDBDB;
    line-height: 38px;
    font-size: 12px;
    color: #666;
    display: flex;
    span {
      display: inline-block;
      height: 100%;
    }
    .first {
      display: flex;
      justify-content: space-between;
      flex: 1;
      .f-bc {
        > span {
          width: 112px;
          text-align: center;
        }
      }
    }
    .last {
      width: 230px;
      text-align: center;
      display: flex;
      border-left: 1px solid #ccc;
      span {
        flex: 1;
      }
    }
  }

  .bt {
    border-top: 1px solid #EFEFEF;
  }

  .date {
    padding-left: 6px;
  }

  .order-id {
    margin-left: 20px;
  }

  .cart {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    &:hover {
      .del-order {
        display: block;
      }
    }
    .del-order {
      display: none;
    }
    .cart-l {
      display: flex;
      align-items: center;
      flex: 1;
      padding: 15px 0;
      justify-content: space-between;
      position: relative;
      &:before {
        position: absolute;
        content: ' ';
        right: -1px;
        top: 0;
        width: 1px;
        background-color: #EFEFEF;
        height: 100%;
      }
      .ellipsis {
        margin-left: 20px;
        width: 220px;
      }
      .img-box {
        border: 1px solid #EBEBEB;
      }
      img {
        display: block;
        @include wh(80px);
      }
      .cart-l-r {
        display: flex;
        > div {
          text-align: center;
          width: 112px;
        }
      }
      .car-l-l {
        display: flex;
        align-items: center;
      }
    }
    .cart-r {
      width: 230px;
      display: flex;
      span {
        text-align: center;
        flex: 1;
      }
    }
  }

  .prod-operation {
    height: 110px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 254px;
    div {
      width: 100%;
      text-align: center;
    }
    div:last-child {
      padding-right: 24px;
    }
  }
</style>
