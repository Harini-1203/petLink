const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
        process.exit(1); // Exit the process with a failure
    }
}

// Corrected export statement
module.exports = connectDb;
