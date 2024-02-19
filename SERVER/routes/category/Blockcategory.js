const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.patch("/:id",(request,response)=>{
    category_id = request.params.id;
    var statement = "update category set category_blocked = 1 where category_id = ?"
    connection.execute(statement,[category_id],(error,result)=>{
        let data = ""
        if(error == null || error == undefined){
            if(result.affectedRows > 0){
                data = { status:"success" }
            }else{
                data = { status:"failure" }
            }
        }else{
          data = { status:"failure", error }
        }
        response.send(data)
    })
});

module.exports = app;