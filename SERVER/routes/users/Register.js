const express = require('express')
const multer = require('multer')
const path = require('path')
const crypto = require('crypto-js')
const connection = require('../getConnection')
const storage = multer.diskStorage({
    destination: 'Images/usersImages',
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);
      callback(null, `${filename}-${Date.now()}${ext}`);
    },
  });
const upload = multer({ storage: storage });
const app = express.Router();

app.post("/",upload.single('image'),(request,response)=>{
    const {user_username,user_firstname,user_lastname,user_email,user_password,user_dob,user_mobile} = request.body;
    const encryptedPassword = String(crypto.SHA256(user_password))
    var statement = "insert into users(user_username,user_firstname,user_lastname,user_email,user_password,user_dob,user_mobile,user_created,user_image) values(?,?,?,?,?,?,?,now(),?)"
    connection.execute(statement,[user_username,user_firstname,user_lastname,user_email,encryptedPassword,user_dob,user_mobile,request.file.filename],(error,result)=>{
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