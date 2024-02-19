const express = require('express');

const gotoLogin = require("./users/Login")
const gotoRegister = require("./users/Register")
const gotoCheckUserName = require("./users/Checkusername")
const gotoChangePassword = require('./users/Changepassword')
const gotoEditUser = require('./users/Edituser')
const gotoBlockUser = require('./users/Blockuser')
const gotoDeactivateUser = require('./users/Deactivateuser')

const app = express.Router();

app.use("/login",gotoLogin)
app.use("/register",gotoRegister)
app.use("/checkusername",gotoCheckUserName)
app.use("/changepassword",gotoChangePassword)
app.use("/edituser",gotoEditUser)
app.use("/blockuser",gotoBlockUser)
app.use('/deactivateuser',gotoDeactivateUser)

module.exports=app;