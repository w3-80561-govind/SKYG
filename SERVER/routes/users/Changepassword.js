const express = require('express')
const connection = require('../getConnection')

const app = express.Router();
app.patch("/:id",(request,response)=>{
    const user_password = request.body.user_password;
    const user_id = request.params.id;
    if(request.user.id != user_id) response.send( { status:"failure" } )
    const encryptedPassword = String(crypto.SHA256(user_password))
    var statement = "update users set user_password = ? where user_id = ? and user_blocked != 1";
    connection.execute(statement,[encryptedPassword,parseInt(user_id)],(error,result)=>{
        if(error === null || error === undefined){
            response.send( {status:"success", result} );
        }else{
            response.send( {status:"failure", error} );
        }
    })
});

module.exports = app;