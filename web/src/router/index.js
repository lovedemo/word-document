import Vue from 'vue'
import Router from 'vue-router'
const Index = resolve => require(['/page/index'], resolve)
const Login = resolve => require(['/page/Login/login'], resolve)
const Home = resolve => require(['/page/Home/home'], resolve)
const books = resolve => require(['/page/Books/books'], resolve)
const booksDetails = resolve => require(['/page/books/booksDetails'], resolve)
const Cart = resolve => require(['/page/Cart/cart'], resolve)
const order = resolve => require(['/page/Order/order'], resolve)
const user = resolve => require(['/page/User/user'], resolve)
const orderList = resolve => require(['/page/User/children/order'], resolve)
const information = resolve => require(['/page/User/children/information'], resolve)
const addressList = resolve => require(['/page/User/children/addressList'], resolve)
const myBooks = resolve => require(['/page/User/children/myBooks'], resolve)
const aihuishou = resolve => require(['/page/User/children/aihuishou'], resolve)
const support = resolve => require(['/page/User/children/support'], resolve)
const checkout = resolve => require(['/page/Checkout/checkout'], resolve)
const payment = resolve => require(['/page/Order/payment'], resolve)
const paysuccess = resolve => require(['/page/Order/paysuccess'], resolve)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: Index,
      name: 'index',
      redirect: '/home',
      children: [
        {path: 'home', component: Home},
        {path: 'books', component: books},
        {path: 'booksDetails', name: 'booksDetails', component: booksDetails}
      ]
    },
    {path: '/login', name: 'login', component: Login},
    {path: '/cart', name: 'cart', component: Cart},
    {
      path: '/order',
      name: 'order',
      component: order,
      children: [
        {path: 'paysuccess', name: 'paysuccess', component: paysuccess},
        {path: 'payment', name: 'payment', component: payment}
      ]
    },
    {
      path: '/user',
      name: 'user',
      component: user,
      redirect: '/user/orderList',
      children: [
        {path: 'orderList', name: '订单列表', component: orderList},
        {path: 'information', name: '账户资料', component: information},
        {path: 'addressList', name: '收货地址', component: addressList},
        {path: 'myBooks', name: '我的书籍', component: myBooks},
      ]
    },
    {path: '/checkout', name: 'checkout', component: checkout},
    {path: '*', redirect: '/home'}
  ]
})
