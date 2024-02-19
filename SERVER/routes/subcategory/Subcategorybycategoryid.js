const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.get("/:id",(request,response)=>{
    subcategory_category_id_fk = request.params.id;
    var statement = `select s.subcategory_id,s.subcategory_title from category as c,subcategory as s where c.category_id = s.subcategory_category_id_fk and c.category_blocked !=1 and s.subcategory_blocked != 1 and c.category_id = ?`
    connection.execute(statement,[subcategory_category_id_fk],(error,result)=>{
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