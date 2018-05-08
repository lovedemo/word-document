<template>
  <div class="book-item">
    <div>
      <!--<div class="ishas" v-if="msg.num==0">-->

      <!--</div>-->
      <div class="book-img">
        <router-link :to="'booksDetails?bookId='+msg.bookId">
          <img v-lazy="msg.imgList" :alt="msg.bookName">
        </router-link>
      </div>
      <h6 class="book-title">{{msg.bookName}}</h6>
      <h3 class="sub-title ellipsis">{{msg.info}}</h3>
      <div class="book-price pr">
        <div class="ds pa" v-if="msg.num>0">
          <router-link :to="'booksDetails?bookId='+msg.bookId">
            <y-button text="查看详情" style="margin: 0 5px"/>
          </router-link>
          <y-button text="加入购物车"
                    style="margin: 0 5px"
                    @btnClick="addCart(msg.bookId,msg.price,msg.bookName,msg.imgList)"
                    classStyle="main-btn"
          ></y-button>
        </div>
        <div class="ds pa" v-else>
        <router-link :to="'booksDetails?bookId='+msg.bookId">
          <y-button disabled text="已售完" style="color: #f00;margin: 0 5px"/>
        </router-link>

      </div>
        <p v-if="msg.num>0"><span style="font-size: 16px">￥</span>
          {{msg.price}}</p>
        <p v-else> 已售完</p>
      </div>
    </div>
  </div>
</template>
<script>
  import YButton from '/components/YButton'
  import { addCart } from '/api/books'
  import { mapMutations, mapState } from 'vuex'
  export default {
    props: {
      msg: {type: [Object, Array]}
    },
    data () {
      return {}
    },
    methods: {
      ...mapMutations(['ADD_CART', 'ADD_ANIMATION', 'SHOW_CART']),
      booksDetails (id) {
        this.$router.push({path: 'booksDetails/bookId=' + id})
      },
      addCart (id, price, name, img) {
        if (!this.showMoveImg) {     // 动画是否在运动
          if (this.login) { // 登录了 直接存在用户名下
            addCart({bookId: id}).then(res => {
              // 并不重新请求数据
              this.ADD_CART({bookId: id, price: price, bookName: name, imgList: img})
            })
          } else { // 未登录 本地vuex
            this.ADD_CART({bookId: id, price: price, bookName: name, imgList: img})
          }
          // 加入购物车动画
          let dom = event.target
          // 获取点击的坐标
          let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
          let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
          // 需要触发
          this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
          if (!this.showCart) {
            this.SHOW_CART({showCart: true})
          }
        }
      }
    },
    computed: {
      ...mapState(['login', 'showMoveImg', 'showCart'])
    },
    mounted () {
    },
    components: {
      YButton
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../assets/style/mixin";
  @import "../assets/style/theme";


  .book-item {
    background: #fff;
    width: 25%;
    transition: all .5s;
    height: 430px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 20px #999;
      .book-price p {
        display: none;
      }
      .ds {
        display: flex;
      }
    }
    .ds {
      @extend %block-center;
      width: 100%;
      display: none;
    }

    .book-img {
      img {
        margin: 50px auto 10px;
        @include wh(206px);
        display: block;
      }
    }
    .book-price {
      margin: 15px 0;
      height: 30px;
      text-align: center;
      line-height: 30px;
      color: #e4393c;
      font-size: 20px;
    }
    .book-title {
      line-height: 1.2;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      text-align: center;
      overflow: hidden;
    }
    h3 {
      text-align: center;
      line-height: 1.2;
      font-size: 12px;
      color: #d0d0d0;
      padding: 10px;
    }

  }
</style>
