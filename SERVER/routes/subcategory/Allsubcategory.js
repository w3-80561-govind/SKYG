const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.get("/",(request,response)=>{
    var statement = `select s.subcategory_id,s.subcategory_title from category as c , subcategory as s where s.subcategory_category_id_fk = c.category_id and s.subcategory_blocked != 1 and c.category_blocked != 1`
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