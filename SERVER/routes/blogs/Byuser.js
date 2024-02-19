const express = require('express')
const connection = require('../getConnection')
const app = express.Router();

app.get("/:id",(request,response)=>{
    const {blog_id,blog_title,blog_description, blog_image,blog_uploadtime,blog_category_id_fk, blog_subcategory_id_fk,blog_user_id_fk } = request.body;
    var statement = "select blog_id,blog_title,blog_description, blog_image,blog_uploadtime,blog_category_id_fk, blog_subcategory_id_fk from blogs where blog_user_id_fk = ? and blog_deleted != 1 and blog_blocked != 1";
    connection.execute(statement,[request.params.id],(error,result)=>{
        if(error === null || error === undefined){
            let data = { status:"success", result }
            response.send(data);
        }else{
            response.send( { status:"failure" ,error} );
        }
    })
});

module.exports = app;