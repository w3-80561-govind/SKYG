const express = require('express')
const connection  =  require('../getConnection')

const app = express.Router();
app.post("/",(request,response)=>{
    const temp_username = request.body.username;
    var statement = "select count(*) as count from users where user_username = ?";
    connection.execute(statement,[temp_username],(error,result)=>{
        if(error === null || error === undefined){
            let data = "";
            if(result[0].count < 1) data = { status:"success" };
            else data = { status:"failed" };
            response.send(data);
        }else{
            response.send(error);
        }
    })  
});

module.exports = app;