const express = require('express');
const cors = require('cors');
const config = require('config');   
const key = require('./key')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const gotoUsers = require("./routes/users")
const gotoCategory = require('./routes/category')
const gotoSubCategory = require('./routes/subcategory')
const gotoBlogs = require('./routes/blogs')
const gotoComments = require('./routes/comments')
const gotoUserActions = require('./routes/useractions')

const app = express();

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

app.use((request, response, next) => {
    const skipTokenUrls = [
      '/users/register',
      '/users/login',
      '/blogs/addblog',
      '/blogs/editblog',
      '/blogs/byuser',
      '/category/allcategory',
      '/subcategory/allsubcategory',
      '/subcategory/bycategory',
      '/comments/byblog',
      '/Images',
      '/useractions/bloglikedislikecount',
      '/users/checkusername'
    ]
  
    if (
      skipTokenUrls.findIndex((item) => {
        return request.url.startsWith(item)
      }) != -1
    ) { 
      next()
    } else {
      const token = request.headers['token']
      console.log(`token: ${token}`)
      if (!token) {
        response.send( { status:"tokenMissing",  message:'missing the token send the token in headers' } )
      } else {
        try {
          const payload = jwt.verify(token, key.secrete)
          console.log(payload)
          request.user = {
            id: payload.id,
            username: payload.username,
            firstname: payload.firstname,
          }
          next()
        } catch (ex) {
          console.log(ex)
          response.send( { message: 'invalid token' } )
        }
      }
    }
  })

app.use("/users",gotoUsers)
app.use('/blogs',gotoBlogs)
app.use('/comments',gotoComments)
app.use('/category',gotoCategory)
app.use('/subcategory',gotoSubCategory)
app.use('/useractions',gotoUserActions)


// app.use(express.static("images"))
app.get("/Images/usersImg/:filename",(request,response)=>{
    const filename = request.params.filename;
    response.contentType('png')
    response.sendFile(filename, { root: 'Images/usersImages' });
})
app.get("/Images/blogsImg/:filename",(request,response)=>{
    const filename = request.params.filename;
    response.contentType('png')
    response.sendFile(filename, { root: 'Images/blogsImages' });
})
app.listen(config.get("port"),()=>{
    console.log("Server Started Listning @"+config.get("port"))
})