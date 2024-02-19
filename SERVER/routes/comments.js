const express = require('express')
const gotoAddComment = require('./comments/Addcomment')
const gotoAllComments = require('./comments/Byblog')
const gotoBlockComment = require('./comments/Blockcomment')

const app = express.Router();

app.use('/addcomment',gotoAddComment)
app.use('/byblog',gotoAllComments)
app.use('/blockcomment',gotoBlockComment)

module.exports = app;