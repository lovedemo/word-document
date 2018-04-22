const mongoose = require('mongoose')
// 表模型
const OrderSchema = new mongoose.Schema({
    address: Object,
    userId:String,
    ownerId:String,
    books: Array,
    orderId: String,
    status: String,
    orderPrice: Number,
    time:Object

});
module.exports = mongoose.model('Order', OrderSchema)