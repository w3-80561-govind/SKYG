const express = require('express')

const connection = require('../getConnection')

const app = express.Router();

app.put("/:id",(request,response)=>{
  user_id_fk = request.body.user_id_fk;
  user_blog_id_fk = request.params.id;
    var statement = `select * from user_actions where user_id_fk = ? and user_blog_id_fk = ? `
    connection.execute(statement,[ user_id_fk , user_blog_id_fk ],(error,result)=>{
        let data = ""
        if(error == null || error == undefined){
          if(result.length != 0){
            var statement2 = `update user_actions set user_action_liked = 0 , user_action_disliked = 1 where user_id_fk = ? and user_blog_id_fk = ?`
            connection.execute(statement2, [ user_id_fk , user_blog_id_fk ] , (error1, result1)=>{
              if(error1 == null || error1 == undefined){
                data = { status:"success", result1 }
                response.send(data)
              }else{
                data = { status:"failure", error1 }
                response.send(data)
              }
            })
          }else{
            var statement2 = `insert into user_actions(user_action_disliked,user_id_fk,user_blog_id_fk) values (1,?,?)`
            connection.execute(statement2, [ user_id_fk , user_blog_id_fk ] , (error2, result2)=>{
              if(error1 == null || error1 == undefined){
                data = { status:"success", result2 }
                response.send(data)
              }else{
                data = { status:"failure", error2 }
                response.send(data)
              }
            })
          }
        }else{
          data = { status:"failure", error }
          response.send(data)
        }
        
    })
});

module.exports = app;

