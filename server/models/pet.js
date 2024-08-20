const mongoose=require("mongoose");

const petSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Dog', 'Cat', 'Bird', 'Other'], 
        required: true
    },
    status: {
        type: String,
        enum: ['For Sale', 'For Adoption'],
        required: true
    },
    price: {
        type: Number,
        default: null,
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Pet',petSchema);