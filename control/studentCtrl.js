
const StudentModel =  require('../model/student');
/**
 * 新增学生
 */
     const add = (req,res)=>{
          let name = req.body.name;
          let phone=req.body.phone;
          StudentModel.find({name:name}).then(
               data=>{
                    console.log();
                    //通过查询数据库中，名字和相应手机号，判断是否传入相同的学生信息
                    if(data.length===0){
                         let stu = new StudentModel(req.body);
                         stu.save().then(data=>{
                              console.log(data);
                              res.send({
                                   code:0,
                                   msg:'新增成功'
                              });
                         })
                         .catch(err=>{
                              console.log(err.message);
                              res.send({
                                   code:-1,
                                   msg:'新增失败'
                              });
                         })
                    }else 
                    {//查到相同名字，匹配手机号
                         StudentModel.find({phone:phone}).then(
                              num =>{
                                   if(num.length===0){
                                             let stu = new StudentModel(req.body);
                                             stu.save().then(data=>{
                                                  console.log(data);
                                                  res.send({
                                                       code:0,
                                                       msg:'新增成功'
                                                  });
                                             })
                                             .catch(err=>{
                                                  console.log(err.message);
                                                  res.send({
                                                       code:-1,
                                                       msg:'新增失败'
                                                  });
                                             })
                                   }else{
                                        res.send({
                                             code:-1,
                                             msg:'该学生已存在'
                                        });
                                   }
                              }
                         )
                    }
               }
          )
     }
/**
 * 查找学生, 学生分页查询
//  */
     const find = (req,res)=>{
          //进行姓名模糊查询
          let name = req.query.name||{};
          let pageNum = req.query.pageNum||1;
          let pageSize = req.query.pageSize||5;
          //获取查询到的总条数
          StudentModel.find({name:new RegExp(name)}).count().then(num=>{
               let totalPage = Math.ceil(num /pageSize);
               //查询数据，分页，倒序输出
               StudentModel.find({name:new RegExp(name)}).skip(pageSize*(pageNum-1)).limit(pageSize).sort({_id: -1}).then(data=>{
                    // console.log(data);
                    res.send({
                         code:0,
                         msg:'ok',
                         data:{
                              
                              list:data,
                              totalPage,
                              num:num
                         }
                    });
               })
               .catch(err=>{
                    console.log(err.message);
                    res.send({
                         code:-1,
                         msg:'error'
                    });
               })

          })
     }

/**
 * 删除学生
 */
     //TODO

module.exports = {
     add
     ,find
}