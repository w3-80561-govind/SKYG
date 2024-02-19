const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.put("/:id",(request,response)=>{
    const {blog_title,blog_description,blog_user_id_fk} = request.body;
    const blog_id = request.params.id;
    console.log(request.body)
    var statement = `update blogs set blog_title=? , blog_description = ? where blog_id = ? and blog_user_id_fk = ? and blog_blocked != 1`
    connection.execute(statement,[blog_title,blog_description,blog_id,blog_user_id_fk],(error,result)=>{
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

