import mongoose from 'mongoose';
const { Schema } = mongoose;

const TourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    price: {
        type: Number,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Tour", TourSchema);