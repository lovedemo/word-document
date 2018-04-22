const mongoose = require('mongoose')
// 表模型
const myorderSchema = new mongoose.Schema({
   ownerId:String,
    userId:String,
    bookId:String,
    num:Number,
    price:Number,
    address:Object,
    time:Object

});
module.exports = mongoose.model('myorder', myorderSchema)