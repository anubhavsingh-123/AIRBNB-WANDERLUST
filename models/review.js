const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    comment: {
        type: String,
        required: true, // Ensures comment is always provided
        trim: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // ✅ Corrected this line
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User" // Assuming you have a User model
    }
});

module.exports = mongoose.model("Review", reviewSchema);
