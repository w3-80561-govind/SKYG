const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.post("/",(request,response)=>{
    const {subcategory_title,subcategory_category_id_fk} = request.body;
    var statement = `insert into subcategory(subcategory_title,subcategory_category_id_fk) values(?,?)`
    connection.execute(statement,[subcategory_title,parseInt(subcategory_category_id_fk)],(error,result)=>{
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