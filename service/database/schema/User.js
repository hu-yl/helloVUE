const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型
//加密插件
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10  //加密等级
//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    userName:{unique:true,type:String},// unique:true不重复
    password:String,
    createAt:{type:Date,default:Date.now()},//创建日期，现在的时间
    lastLoginAt:{type:Date,default:Date.now()}//最后登陆时间
},{
    collection:'user'  //数据库表/集合的命名
})


//每次存储数据时都要执行
userSchema.pre('save', function(next){
    //let user = this
    console.log(this)
    bcrypt.genSalt( SALT_WORK_FACTOR,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt, (err,hash)=>{
            if(err) return next(err)
            this.password = hash
            next()
        }) 
    })
})

//校验密码-实例方法
// 方法comparePassword，传递两个参数，
// 一个是客户端密码，一个是数据库取出来的密码。
// 用bcrypt提供的compare方法就可以比对，最后包装成Promise返回就可以了
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}

//发布模型
mongoose.model('User',userSchema)

