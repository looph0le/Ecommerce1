const port=4000;
const express =require("express");
const app= express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path");
const cors = require("cors")

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Ecommerce'  )
 
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

//api creation
app.get("/",(req,res)=>{
    res.send("express app is running")
})

//image storage engine
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        return cb('${file.fieldname}_${Date.now()}_${Date.now()}_${path.extname(file.originalname)}')
    }
})
const upload=multer({storage:storage})

//upload endpoint to upload img
app.use('/images',express.static("upload/images"))
app.post("/upload",upload.single('product'),(req,res)=>{
  res.json({
    success:1,
    image_url:'http://localhost:${port}/images/$(req.file.filename)'
  })
})
// Start the server

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




