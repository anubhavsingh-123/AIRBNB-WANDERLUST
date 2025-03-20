const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        type: String,
        default: "nt.jpg",
        set: (v) => (v === "" ? "nt.jpg" : v),
    },
    price: Number,
    location: String,
    country: String,
    owner: {  
        type: Schema.Types.ObjectId, 
        ref: "User", // Reference to User model
        required: true // Ensures each listing has an owner
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
