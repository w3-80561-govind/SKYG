const express = require('express')
const gotoBlogLiked = require('./user_actions/Blogliked')
const gotoBlogDisliked = require('./user_actions/Blogdisliked')
const gotoBlogLikeDislikeCount = require('./user_actions/Bloglikedislikecount')
const gotoBlogLikeDislikeRemove = require('./user_actions/Bloglikedislikeremove')

const app = express.Router();

app.use('/blogliked',gotoBlogLiked)
app.use('/blogdisliked',gotoBlogDisliked)
app.use('/bloglikedislikecount',gotoBlogLikeDislikeCount)
app.use('/bloglikedislikeremove',gotoBlogLikeDislikeRemove)

module.exports = app;