require("dotenv").config()

const express=require("express");
const path=require("path");

const cookieParser=require("cookie-parser");
const cors=require("cors");

//database
const mongoose=require("mongoose");
const connectDb = require('./config/dbConn');
connectDb();

//middleware
console.log(process.env.NODE_ENV);
const app=express();
app.use(express.json());
// const authenticateToken=require('./middleware/token')
// app.use(authenticateToken);


app.use('/',express.static(path.join(__dirname,'/public')))

//Routes
app.use('/',require('./routes/root'));
app.use('/users',require('./routes/userRoute'))
app.use('/pets',require('./routes/petRoute'))
app.use('/reviews',require('./routes/reviewRoute'))

app.use(cookieParser());
app.use(cors());

app.all('*',(req,res)=>{
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname,"views","404.html"))
    }
})


mongoose.connection.once('open',()=>{
    console.log("connected to database");
    
    app.listen(5000,()=>{
        console.log("on port 5000");
    })
});


