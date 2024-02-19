const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.get("/",(request,response)=>{
    var statement = `select category_id,category_title from category where category_blocked != 1`
    connection.execute(statement,(error,result)=>{
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