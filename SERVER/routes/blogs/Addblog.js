const express = require('express')
const multer = require('multer')
const path = require('path')
const connection = require('../getConnection')
const storage = multer.diskStorage({
    destination: 'Images/blogsImages',
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const filename = path.basename(file.originalname, ext);
      callback(null, `${filename}-${Date.now()}${ext}`);
    },
  });
const upload = multer({ storage: storage });
const app = express.Router();

app.post("/",upload.single('image'),(request,response)=>{
    const {blog_title,blog_description,blog_category_id_fk,blog_subcategory_id_fk,blog_user_id_fk} = request.body;
    console.log(request.body)
    var statement = `insert into blogs(blog_title,blog_description,blog_image,blog_uploadtime,blog_category_id_fk ,blog_subcategory_id_fk,blog_user_id_fk) values(?,?,?,now(),?,?,?)`
    connection.execute(statement,[blog_title,blog_description,request.file.filename,blog_category_id_fk ,blog_subcategory_id_fk,blog_user_id_fk],(error,result)=>{
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

