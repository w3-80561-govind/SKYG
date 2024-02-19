const express = require('express')
const connection = require('../getConnection')

const app = express.Router();
app.patch("/:id",(request,response)=>{
    var statement = "update users set user_deactivated = 1 where user_id = ?";
    connection.execute(statement,[parseInt(request.params.id)],(error,result)=>{
        if(error === null || error === undefined){
            response.send( {status:"success", result} );
        }else{
            response.send( {status:"failure", error} );
        }
    })
});

module.exports = app;