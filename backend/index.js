const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const cors=require('cors')
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const postRoute=require('./routes/posts')
const commentRoute=require('./routes/comments')
// const path=require('path')

//database
const connectDB=require('./database/dbConnect')

//middlewares
dotenv.config()
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"https://blogging-site-frontend-6ua935fl1-namit1903s-projects.vercel.app/",credentials:true}))
// app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(cookieParser())//parse the client req obj cookies and populate req.cookies
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        // fn(null,"image1.jpg")
    }
})

const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    // console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})

app.get('/',(req,res)=>{
    app.use(express.static(path.resolve(__dirname,"frontend","dist")));  
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
});
app.listen(process.env.PORT,()=>{
    connectDB();// this is an async funtion so agla line execute kro bruh!!
    console.log("app is running on port "+process.env.PORT)
})