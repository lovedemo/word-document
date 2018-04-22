const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    "userId": String,
    "avatar": String,
    "userName": String,
    "userPwd": String,
    "orderList": Array,
    "cartList": [
        {
            "bookId": String,
            "imgList": String,
            "bookName": String,
            "checked": String,
            "bookNum": Number,
            "price": Number
        }
    ],
    'addressList': [
        {
            "addressId": Number,
            "userName": String,
            "streetName": String,
            "tel": Number,
            "isDefault": Boolean
        }
    ]
})
module.exports = mongoose.model('User', userSchema)
