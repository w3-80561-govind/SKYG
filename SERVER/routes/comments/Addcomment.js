const express = require('express')

const connection = require('../getConnection')

const app = express.Router();

app.post("/",(request,response)=>{
    const {comment_text,comment_user_id_fk,comment_blog_id_fk} = request.body;
    var statement = `insert into comments(comment_text ,comment_user_id_fk,comment_blog_id_fk,comment_uploadtime) values(?,?,?,now())`
    connection.execute(statement,[comment_text ,comment_user_id_fk,comment_blog_id_fk],(error,result)=>{
        let data = ""
        if(error == null || error == undefined){
          data = { status:"success", result }
        }else{
          data = { status:"failure", error }
        }
        response.send(data)
    })
});

module.exports = app;

