const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.post("/",(request,response)=>{
    const {category_title} = request.body;
    var statement = `insert into category(category_title) values(?)`
    connection.execute(statement,[category_title],(error,result)=>{
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