const mongoose = require('mongoose')
const db = "mongodb://localhost/smile-vue"
const glob = require('glob')
const {
    resolve
} = require('path')


//用glob.sync同步引入所有的schema文件
// forEach的方法require引入
exports.initSchemas = () => {
    glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require)
}


//数据库状态监控
exports.connect = () => {
    //连接数据库
    mongoose.connect(db, {
        useCreateIndex: true,
        useNewUrlParser: true
    })
    let maxConnectTimes = 0
    return new Promise((resolve, reject) => {
        //把所有连接放到这里
        //增加数据库监听事件
        mongoose.connection.on('disconnected', () => {
            // console.log('***********数据库断开***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db, {
                    useCreateIndex: true,
                    useNewUrlParser: true
                })
            } else {
                reject() //reject(reason)方法也会返回一个新的Pro实例，实例状态为rejected
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })
        mongoose.connection.on('error', err => {
            // console.log('***********数据库错误***********')
            if (maxConnectTimes < 3) {
                maxConnectTimes++
                mongoose.connect(db, {
                    useCreateIndex: true,
                    useNewUrlParser: true
                })
            } else {
                reject(err)
                throw new Error('数据库出现问题，程序无法搞定，请人为修理......')
            }
        })
        //链接打开的时
        mongoose.connection.once('open', () => {
            // console.log('MongoDB connected successfully')
            resolve()
        })
    })
}

//使用新的URL字符串解析器useNewUrlParser:true
// const mongoose = require('mongoose')

// mongoose.connect("mongodb://localhost:27017/study", {useNewUrlParser:true}, function(err){

//if(err){

// console.log('Connection Error:' + err)

// }else{

// console.log('Connection success!')

// }

// })