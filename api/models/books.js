const mongoose = require('mongoose')
// 表模型
const bookSchema = new mongoose.Schema({
    'bookId': String,
    'bookISBN': String,
    'price': Number,
    'num': Number,
    'bookName': String,
    'imgList': String,
    'info': String,
    'userId': String
});
module.exports = mongoose.model('Book', bookSchema);