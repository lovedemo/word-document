const express     = require('express');
const router      = express.Router();
const Good        = require('../models/goods');
const Book        = require('../models/books');
const User        = require('../models/user');
const superagent  = require('superagent');

//添加书籍
router.post('/addBook',(req,res,next)=>{
    const {userId} = req.cookies;
    let bookData={...req.body,userId:userId};
    console.log(userId,req.body);
    let r1 = Math.floor(Math.random() * 10);
    let r2 = Math.floor(Math.random() * 10);
    bookData.bookId = `${r1}${(Date.parse(new Date())) / 1000}${r2}`;
    Book.insertMany(bookData,(err)=>{
        if(!err){
            res.json({
                status: '0',
                msg: 'successful',
                result: {}
            })
        }
    })

});
//获取自己的书籍

router.get('/getMybook',  (req, res, next) => {
    const {userId} = req.cookies;
    let myBooks=[];
    Book.find({userId:userId},(err,doc)=>{
        myBooks=doc;
        res.json(myBooks);
    });
    //
   // console.log(mybooks)
});

// 最新书籍
router.get('/getRecentBooks',  (req, res, next) => {
    let bookModel = Book.find().sort({_id: -1}).limit(8);


    bookModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: 'successful',
                result: {
                    count: doc.length,
                    data: doc
                }
            })
        }
    })
});
// 书籍列表
router.get('/getAllBooks', async  (req, res, next) => {


    let sort = req.query.sort || 1;
    let page = +req.query.page || 1;
    let pageSize = +req.query.pageSize || 8;
    let findKey= req.query.findKey ;
    // let findType =req.query.findType;
    // let priceGt = +req.query.priceGt || ''; // 大于
    // let priceLte = +req.query.priceLte || ''; // 小于
    let skip = (page - 1) * pageSize;//跳过多少条

    let reg=new RegExp(findKey,'i');
    let params = {$or:[{bookName:reg},{bookISBN:reg},{info:reg}]};
   /* if (priceGt || priceLte) {
        if (priceGt && priceLte) {
            if (priceGt > priceLte) {
                let l = priceLte, g = priceGt;
                priceGt = l;
                priceLte = g
            }
            params = {
                'price': {
                    $gt: priceGt,
                    $lte: priceLte
                }
            }
        } else {
            params = {
                'price': {
                    $gt: priceGt || 0,
                    $lte: priceLte || 99999
                }
            }
        }
    }*/

    let alldoc=await Book.find();

    let allcount=parseInt(alldoc.length/8);
    if(alldoc.length%8!=0)
        allcount++;

    let bookModel = Book.find(params).skip(skip).limit(pageSize);
    // 1 升序 -1 降序
    sort && bookModel.sort({price: sort});
    bookModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {

            res.json({
                status: '0',
                msg: 'successful',
                result: {
                    total_count:allcount,
                    count: doc.length,
                    data: doc
                }
            })
        }
    })
});

// 商品列表
/*
router.get('/computer',  (req, res, next) => {
    let sort = req.query.sort || '';
    let page = +req.query.page || 1;
    let pageSize = +req.query.pageSize || 20;
    let priceGt = +req.query.priceGt || ''; // 大于
    let priceLte = +req.query.priceLte || ''; // 小于
    let skip = (page - 1) * pageSize;//跳过多少条
    let params = {}
    if (priceGt || priceLte) {
        if (priceGt && priceLte) {
            if (priceGt > priceLte) {
                var l = priceLte, g = priceGt
                priceGt = l
                priceLte = g
            }
            params = {
                'salePrice': {
                    $gt: priceGt,
                    $lte: priceLte
                }
            }
        } else {
            params = {
                'salePrice': {
                    $gt: priceGt || 0,
                    $lte: priceLte || 99999
                }
            }
        }
    }

    let productModel = Good.find(params).skip(skip).limit(pageSize);
    // 1 升序 -1 降序
    sort && productModel.sort({'salePrice': sort});
    productModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: 'successful',
                result: {
                    count: doc.length,
                    data: doc
                }
            })
        }
    })
})
*/

// 加入购物车
router.post('/addCart',  async (req, res) => {

    let userId = req.cookies.userId;
    let {bookId, bookNum = 1 } = req.body;
    if (userId) {
        try {
            const userDoc = await User.findOne({userId});
            if (userDoc) {
                // 商品是否存在
                let have = false;

                //  购物车有内容
                if (userDoc.cartList.length) {
                    // 遍历用户名下的购物车列表
                    for (let value of userDoc.cartList) {
                        // 找到该商品
                        if (value.bookId === bookId) {
                            have = true;
                            value.bookNum += bookNum;
                            break;
                        }
                    }

                }

                // 购物车无内容 或者 未找到商品 则直接添加
                if (!userDoc.cartList.length || !have) {
                    const bookDoc = await Book.findOne({bookId});
                    let doc = {
                        "bookId": bookDoc.bookId,
                        "imgList": bookDoc.imgList,
                        "bookName": bookDoc.bookName,
                        "checked": "1",
                        "bookNum": bookNum,
                        "price": bookDoc.price
                    };
                    userDoc.cartList.push(doc)
                }

                userDoc.save( ()=> {
                    // 保存成功
                    res.json({
                        status: 0,
                        msg: '加入成功',
                        result: 'suc'
                    })
                })

            } else {
                res.json({
                    status: 1,
                    msg: '用户不存在',
                    result: ''
                })
            }

        } catch (err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            })
        }

    } else {
        res.json({
            status: 1,
            msg: '用户未登录',
            result: ''
        })
    }
})

// 批量加入购物车 todo
router.post('/addCartBatch',  async (req, res) => {
    let userId = req.cookies.userId,
        productMsg = req.body.productMsg;
    if (userId) {
        try {
            User.findOne({userId}, (err, userDoc) => {
                if (userDoc) {
                    // 未添加的商品
                    let sx = [];
                    let newSx = [];
                    //  购物车有内容
                    if (userDoc.cartList.length) {
                        // 遍历用户名下的购物车列表
                        userDoc.cartList.forEach((item, i) => {
                            // 找到该商品
                            productMsg.forEach((pro, j) => {
                                if (item.bookId === pro.bookId) {
                                    sx.push(j)
                                    item.bookNum += pro.bookNum
                                }
                            })
                        })
                        // 有不是重复的商品
                        if (sx.length !== productMsg.length) {
                            productMsg.forEach((item, i) => {
                                if (sx[i] !== i) {//  找到未添加的
                                    newSx.push(item)
                                }
                            })
                            let goodList1 = [], goodNum1 = []
                            newSx.forEach(item => {
                                goodList1.push(item.bookId)
                                goodNum1.push(item.bookNum)
                            })
                            Book.find({bookId: {$in: goodList1}}, function (err3, goodDoc) {

                                var userCart = []
                                // 返回一个数组
                                goodDoc.forEach((item, i) => {
                                    // userCart.push()
                                    userDoc.cartList.push({
                                        "bookId": item.bookId,
                                        "imgList": item.imgList,
                                        "bookName": item.bookName,
                                        "checked": "1",
                                        "bookNum": goodNum1[i],
                                        "price": item.price
                                    })
                                })
                                // if (userCart.length) {
                                userDoc.save(function (err2, doc2) {

                                    // 保存成功
                                    res.json({
                                        status: '0',
                                        msg: '加入成功',
                                        result: 'suc'
                                    })

                                })


                                // }
                            })
                        } else {
                            userDoc.save(function (err2, doc2) {

                                // 保存成功
                                res.json({
                                    status: '0',
                                    msg: '加入成功',
                                    result: 'suc'
                                })

                            })
                        }

                    } else {
                        var goodList = [], goodNum = []
                        productMsg.forEach(item => {
                            goodList.push(item.bookId)
                            goodNum.push(item.bookNum)
                        })
                        Book.find({bookId: {$in: goodList}}, function (err3, doc) {

                            // 返回一个数组
                            doc.forEach((item, i) => {
                                userDoc.cartList.push({
                                    "bookId": item.bookId,
                                    "imgList": item.imgList,
                                    "bookName": item.bookName,
                                    "checked": "1",
                                    "bookNum": goodNum[i],
                                    "price": item.price
                                })
                            })

                            userDoc.save(function (err2, doc2) {
                                // 保存成功
                                res.json({
                                    status: '0',
                                    msg: '加入成功',
                                    result: 'suc'
                                })
                            })

                        })
                    }
                }

            })
        } catch (err) {
            res.json({
                status: 1,
                msg: err.message,
                result: ''
            })
        }

    } else {
        res.json({
            status: 1,
            msg: '未登录',
            result: ''
        })
    }

})



// 转发锤子接口 todo
/*
let czUrl = 'http://www.smartisan.com/product/home'
router.get('/productHome', function (req, res) {
    superagent.get(czUrl).end(function (err, res1) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            let result = JSON.parse(res1.text)
            let home_hot = result.data.home_hot || ['100031816', '100032201', '100025104', '100023501'];
            let home_floors = result.data.home_floors
            let pId = [], // 保存总商品id
                hotId = [], // 热门id
                floorsId = [],// 官方精选 品牌精选
                floorsList = [];
            home_hot.forEach(item => {
                hotId.push(item.spu_id + '01')
                pId.push(item.spu_id + '01')
            })
            home_floors.forEach((item, i) => {
                let tab_items = item.tabs[0].tab_items // 
                floorsId[i] = []
                floorsList[i] = {};
                floorsList[i].tabs = [];
                floorsList[i].image = home_floors[i].tabs[0].tab_items[0]
                floorsList[i].title = home_floors[i].title
                tab_items.forEach(tab => {
                    let id = tab.spu_id
                    if (id) {
                        floorsId[i].push(id + '01') // 存储id
                        pId.push(id + '01')
                    }
                })
            })
            Good.find({productId: {$in: pId}}, (goodsErr, goodsDoc) => {
                if (goodsErr) {
                    res.json({
                        status: '1',
                        msg: goodsErr.message,
                        result: ''
                    })
                } else {
                    let hotList = [];
                    goodsDoc.forEach(item => {
                        let itemId = item.productId;
                        hotId.forEach(id => {
                            if (itemId === id) {
                                hotList.push(item)
                            }
                        })
                        floorsId.forEach((fitem, i) => {
                            fitem.forEach(fid => {
                                if (itemId === fid) {
                                    floorsList[i].tabs.push(item)
                                }
                            })
                        })
                    })


                    res.json({
                        status: '0',
                        msg: 'suc',
                        result: {
                            "home_hot": hotList,
                            'home_floors': floorsList
                        }
                    })
                }
            })


        }
    })
})*/

// 商品信息
router.get('/bookDet', function (req, res) {
    let bookId = req.query.bookId
    Book.findOne({bookId}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            })
        } else {
            res.json({
                status: '1',
                msg: 'suc',
                result: doc
            })
        }
    })
})

module.exports = router



