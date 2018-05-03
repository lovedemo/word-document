<template>
  <div class="goods">
    <div class="nav">

      <div class="w ">
        <div class="find">
          <el-input placeholder="书名\ISBN\描述" v-model="findKey" class="input-with-select">

            <el-button slot="append" icon="el-icon-search" @click="_getBooks">搜索</el-button>
          </el-input>
        </div>


      </div>
     <!-- <div class="w">
        <a href="javascript:;" :class="{active:sortType===1}" @click="reset()">综合排序</a>
        <a href="javascript:;" @click="sort(1)" :class="{active:sortType===2}">价格从低到高</a>
        <a href="javascript:;" @click="sort(-1)" :class="{active:sortType===3}">价格从高到低</a>
        <div class="price-interval">
          <input type="number" class="input" placeholder="价格" v-model="params.min">
          <span style="margin: 0 5px"> - </span>
          <input type="number" placeholder="价格" v-model="params.max">
          <y-button text="确定" classStyle="main-btn" @btnClick="reset" style="margin-left: 10px;"></y-button>
        </div>
      </div>-->
    </div>

    <!--商品-->
    <div class="nobook"  v-if="!books.length">
      <img src="../../../static/images/nobook.jpg">
    </div>
    <div class="goods-box w">
      <mall-goods v-for="(item,i) in books" :key="i" :msg="item"></mall-goods>
    </div>

    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page.sync="currentPage"
        :page-count="pageCount"
        @current-change="change()"
      >
      </el-pagination>
    </div>

   <!-- <div v-show="!busy"
         class="w load-more"
         v-infinite-scroll="loadMore"
         infinite-scroll-disabled="busy"
         infinite-scroll-distance="100">
      正在加载中...
    </div>-->
  </div>
</template>
<script>
  import {getAllBooks} from '/api/books'
  import mallGoods from '/components/mallGoods'
  import YButton from '/components/YButton'
  export default {
    data () {
      return {
        findKey:'',
        findType:'书名',
        books: [],
        // busy: false,
        // timer: null,
        sortType: 1,
        windowHeight: null,
        windowWidth: null,
        pageCount:1,
        currentPage:1,
      /*  params: {
          page: 1,  // 页码
          sort: '', // 排序
          min: '',  // 最小价格
          max: ''
        }*/
      }
    },
    methods: {

      change(){
        this.$nextTick(()=>{
          console.log(this.currentPage)
          // this.currentPage++;
          this._getBooks();
        })

      },
      find(){
        console.log(this.findKey,this.findType)
      },
      _getBooks (flag) {
       // const {page, sort, min, max} = this.params
        let params = {
          page:this.currentPage,
          findKey:this.findKey,
        }
        getAllBooks(params).then(res => {
          let data = res.result.data;
          this.books = data
          this.pageCount=res.result.total_count;
         /* if (res.result.count) {

            if (flag) {
              this.books = this.books.concat(data)
            } else {
              this.books = data
            }
          } else {
            clearTimeout(this.timer)
            this.busy = true
          }*/
        })
      },
      // 默认排序
      reset () {
        this.sortType = 1
        this.params.sort = ''
        this.params.page = 1
        this.busy = false
        this._getBooks()
      },
      // 价格排序
      sort (v) {
        v === 1 ? this.sortType = 2 : this.sortType = 3
        this.params.sort = v
        this.params.page = 1
        this.busy = false
        this._getBooks()
      },
      // 加载更多
      loadMore () {
       /* this.busy = true
        this.timer = setTimeout(() => {
          this.params.page++
          this._getBooks(true)
          this.busy = false
        }, 500)*/
      }
    },
    created () {
      this._getBooks()
    },
    mounted () {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    },
    components: {
      mallGoods,
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/style/mixin";
  @import "../../assets/style/theme";

  .find{

    margin: 0 auto;
      width: 500px;
    .el-select{
      width: 80px;
    }

  }
  .page{
    margin: 20px;
  }
  .nobook{
    img{
      height: 300px;
      width: 700px;
    }
    text-align: center;
    padding: 20px;
    color: #8d8d8d;
    height: 500px;
    background-color: #e6e6e6;
  }
  .nav {
    height: 60px;
    line-height: 60px;
    > div {
      display: flex;
      align-items: center;
      a {
        padding: 0 15px;
        height: 100%;
        @extend %block-center;
        font-size: 12px;
        color: #999;
        &.active {
          color: #5683EA;
        }
        &:hover {
          color: #5683EA;
        }
      }
      input {
        @include wh(80px, 30px);
        border: 1px solid #ccc;
      }
      input + input {
        margin-left: 10px;
      }
    }
    .price-interval {
      padding: 0 15px;
      @extend %block-center;
      input[type=number] {
        border: 1px solid #ccc;
        text-align: center;
        background: none;
        border-radius: 5px;
      }
    }
  }
  .load-more {
    text-align: center;background: #fff
  }
  .goods-box {
    &:after{
      content:"";clear: both;display: block;
    }
    > div {
      float: left;
      border: 1px solid #efefef;
    }
  }


</style>
