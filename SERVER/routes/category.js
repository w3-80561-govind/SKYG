const express = require('express')
const gotoAddCategory = require('./category/Addcategory')
const gotoAllCategory = require('./category/Allcategory')
const gotoBlockCategory = require('./category/Blockcategory')
const app = express.Router();

app.use("/addcategory",gotoAddCategory);
app.use('/allcategory',gotoAllCategory);
app.use('/blockcategory',gotoBlockCategory);

module.exports = app;