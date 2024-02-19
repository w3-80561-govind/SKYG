const express = require('express')
const gotoAddBlog = require('./blogs/Addblog')
const gotoAllBlog = require('./blogs/Allblog')
const gotoEditBlog = require('./blogs/Editblog')
const gotoDeleteBlog = require('./blogs/Deleteblog')
const gotoByUser = require('./blogs/Byuser')
const gotoBlockBlog = require('./blogs/Blockblog')

const app = express.Router();

app.use('/addblog',gotoAddBlog);
app.use('/allblogs',gotoAllBlog);
app.use('/editblog',gotoEditBlog);
app.use('/deleteblog',gotoDeleteBlog);
app.use('/byuser',gotoByUser);
app.use('/blockblog',gotoBlockBlog);

module.exports = app;