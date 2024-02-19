const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.patch("/:id",(request,response)=>{
    subcategory_id = request.params.id;
    var statement = "update subcategory set subcategory_blocked = 1 where subcategory_id = ?"
    connection.execute(statement,[subcategory_id],(error,result)=>{
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