const mongoose = require('mongoose')
// 表模型
const OrderSchema = new mongoose.Schema({
    products: Array,
    orderId: String,
    status: String,
    orderPrice: Number,

});
module.exports = mongoose.model('Order', OrderSchema)