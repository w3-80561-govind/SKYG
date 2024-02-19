const express = require('express')
const connection = require('../getConnection')

const app = express.Router();
app.get("/:id",(request,response)=>{
    var statement = "select count(*) as count from user_actions where user_action_liked = 1 and user_blog_id_fk = ?";
    connection.execute(statement,[parseInt(request.params.id)],(error,result)=>{
        var statement = "select count(*) as count from user_actions where user_action_disliked = 1 and user_blog_id_fk = ?";
        connection.execute(statement,[parseInt(request.params.id)],(error1,result1)=>{
            if(error1 === null || error1 === undefined){
                response.send( {status:"success", likecount:result[0].count , dislikecount: result1[0].count} );
            }else{
                response.send( {status:"failure", error} );
            }
        })
    
    })
});

module.exports = app;