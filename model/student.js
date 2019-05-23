//引入数据库的链接操作
const db = require('../config/db');

const schema = new db.Schema({
     name:{
          type:String,
          required:true
     },
     sex:{
          type:Number,
          required:true
     },
     age:{
          type:Number,
          required:true
     },
     merry:{
          type:Number,
          default:0
     },
     //手机号为同名学生的判断条件
     phone:{
          type:Number,
          required:true
     }
});
//定义数据库的格式，并将该数据类型暴露给外部
module.exports = db.model('student',schema);