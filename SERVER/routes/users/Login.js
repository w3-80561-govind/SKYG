const express = require('express')
const connection = require('../getConnection')
const jwt = require('jsonwebtoken')
const key = require('../../key')
const crypto = require('crypto-js')
const app = express.Router();

app.post("/",(request,response)=>{
    const {user_username,user_password} = request.body;
    const encryptedPassword = String(crypto.SHA256(user_password))
    var statement = "select user_id,user_username,user_firstname,user_lastname from users where user_username = ? and user_password = ? and user_blocked != 1";
    connection.execute(statement,[user_username,encryptedPassword],(error,result)=>{
        if(error === null || error === undefined){
            let data = "";
            console.log(result)
            if(result.length != 0){
                const payload = {
                    id: result[0].user_id,
                    username: result[0].user_username,
                    firstname: result[0].user_firstname,
                  }
                  const token = jwt.sign(payload, key.secrete)
                  data = { status:"success", token , result }
            }
            else data = { status:"failed"};
            response.send(data);
        }else{
            response.send(error);
        }
    })
});

module.exports = app;