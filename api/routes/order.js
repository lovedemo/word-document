const express     = require('express');
const router      = express.Router();
const Book        = require('../models/books');
const User        = require('../models/user');
const Order        = require('../models/order');
const myorder        = require('../models/myorder');

//生成订单
router.post('/addOrder',async (req,res,next)=>{
    // console.log(req.body)
    const {userId} = req.cookies;
    if(!userId){
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
    let myorder=req.body;
    if(myorder.books.length==0)
    {
        res.json({
            status: '1',
            msg: '无商品',
            result: ''
        });
    }else{

        myorder.books.map(async x=>{
            let bookDoc = await Book.findOne({bookId:x.bookId});

            if(bookDoc.num<x.bookNum){
                res.json({
                    status: '1',
                    msg: '商品库存不足',
                    result: ''
                });
            }else
            {
                x.ownerId=bookDoc.userId;
            }
        });

        let userDoc = await User.findOne({userId});
        let userAddress = {};
        const {addressList} = userDoc
        // 地址信息
        addressList.forEach(item => {
                if (item.addressId == myorder.addressId) {
                    userAddress = item
                }
            })

        //生成订单
        let head = '111';
        let r1 = Math.floor(Math.random() * 10);
        let r2 = Math.floor(Math.random() * 10);
        let sysDate = new Date().Format('yyyyMMddhhmmss');
        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let orderId = head + r1 + sysDate + r2;

        myorder.books.map(async x=>{
            let temp={
                address: userAddress,
                userId:userId,
                ownerId:x.ownerId,
                books: x,
                orderId: orderId,
                status: '1',
                orderPrice: myorder.orderPrice,
                time:{createDate: createDate}

            }
            Order.insertMany(temp)


        })



       res.json({
                status: '0',
                msg: '提交成功',
                result: myorder.books
       });

    }



});
module.exports = router;
