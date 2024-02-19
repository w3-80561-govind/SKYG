const express = require('express')
const connection = require('../getConnection')
const app = express.Router();

app.get("/:id",(request,response)=>{
    comment_blog_id_fk = request.params.id;
    var statement = "select comment_id,comment_text,comment_uploadtime,comment_user_id_fk from comments where comment_blog_id_fk = ? and comment_blocked != 1 and comment_deleted != 1";
    connection.execute(statement,[comment_blog_id_fk],(error,result)=>{
        if(error === null || error === undefined){
            let data = { status:"success", result }
            response.send(data);
        }else{
            response.send( { status:"failure" ,error } );
        }
    })
});

module.exports = app;