require("dotenv").config()

const express=require("express");
const path=require("path");
const app=express();
const cookieParser=require("cookie-parser");
const cors = require('cors');
app.use(cors({
  origin: 'https://petlink-i64i.onrender.com' // Replace with your frontend URL
}));
//database
const mongoose=require("mongoose");
const connectDb = require('./config/dbConn');
connectDb();

//middleware
console.log(process.env.NODE_ENV);



//cloudinary
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = require('./config/MulterConfig');
const petModel = require('./models/pet');
const asyncHandler = require('express-async-handler'); // Assuming asyncHandler is used for error handling middleware
const validateToken = require("./middleware/validateToken");


app.use(express.json());
app.use(cookieParser());

// Middleware for handling token authentication
// const authenticateToken = require('./middleware/token');
// app.use(authenticateToken);

app.post('/pets', upload.array('images'),validateToken, asyncHandler(async (req, res) => {
  try {
    const { name, age, breed, type, status, price, description, location, ownerphn } = req.body;
    const images = req.files;

    // Ensure the user is authenticated and user_id is available
    if (!req.user || !req.user.user || !req.user.user.id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Check if the price is provided only when status is 'For Sale'
    if (status === 'For Sale' && !price) {
      return res.status(400).json({ message: 'Price is required when the pet is for sale.' });
    }

    // Handle image uploads to Cloudinary
    const imageUrls = await Promise.all(
      images.map(async (image) => {
        const result = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream({ folder: 'pets' }, (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result);
          }).end(image.buffer);
        });
        return result.secure_url;
      })
    );

    // Create the pet object with user_id from req.user
    const petData = {
      user_id: req.user.user.id,
      name,
      age,
      breed,
      type,
      status,
      price: status === 'For Sale' ? price : null,  // Price is only applicable for 'For Sale'
      description,
      location,
      ownerphn,
      images: imageUrls,  // Store the uploaded image URLs
    };

    // Create new pet in the database
    const pet = await petModel.create(petData);

    if (!pet) {
      return res.status(409).json({ message: 'Unable to create pet' });
    }

    // Success response
    res.status(201).json({ message: 'Pet created successfully', pet });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}));






app.use('/',express.static(path.join(__dirname,'/public')))

//Routes
app.use('/',require('./routes/root'));
app.use('/users',require('./routes/userRoute'))
app.use('/pets', require('./routes/petRoute'));
app.use('/reviews',require('./routes/reviewRoute'))




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


