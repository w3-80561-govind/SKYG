const express = require('express')
const connection = require('../getConnection')

const app = express.Router();
app.patch("/:id",(request,response)=>{
    const blog_id = request.params.id;
    var statement = "update blogs set blog_deleted = 1 where blog_id = ? ";
    connection.execute(statement,[parseInt(blog_id)],(error,result)=>{
        if(error === null || error === undefined){
            response.send( {status:"success", result} );
        }else{
            response.send( {status:"failure", error} );
        }
    })
});

module.exports = app;