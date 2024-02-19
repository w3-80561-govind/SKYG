const express = require('express')
const connection = require('../getConnection')

const app = express.Router();
app.patch("/:id",(request,response)=>{
    user_id_fk = request.body.user_id_fk;
    user_blog_id_fk = request.params.id;
    var statement2 = `update user_actions set user_action_liked = 0 , user_action_disliked = 0 where user_id_fk = ? and user_blog_id_fk = ?`
    connection.execute(statement2, [ user_id_fk , user_blog_id_fk ] , (error, result)=>{
        if(error == null || error == undefined){
        data = { status:"success", result }
        response.send(data)
        }else{
        data = { status:"failure", error }
        response.send(data)
        }
    })
});

module.exports = app;