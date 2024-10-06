const mongoose=require("mongoose");

const petSchema=new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
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
        // enum: ['Dog', 'Cat', 'Bird', 'Other'], 
        required: true
    },
    status: {
        type: String,
        enum: ['For Sale', 'For Adoption'],
        //required: true
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
    },
    ownerphn: {
    type: String,
    required: true,
    validate: {
        validator: function(v) {
            return /^\d{10}$/.test(v);  // Regular expression to ensure exactly 10 digits
        },
        message: props => `${props.value} is not a valid 10-digit phone number!`
    }
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Pet',petSchema);