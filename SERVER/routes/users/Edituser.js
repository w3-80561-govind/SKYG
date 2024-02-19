const express = require('express')
const connection = require('../getConnection')

const app = express.Router();

app.put("/:id",(request,response)=>{
    const {user_firstname,user_lastname,user_dob} = request.body;
    const user_id = request.params.id;
    var statement = "update users set user_firstname = ? , user_lastname = ? , user_dob = ?  where user_id = ? and user_blocked != 1"
    connection.execute(statement,[user_firstname,user_lastname,user_dob,user_id],(error,result)=>{
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