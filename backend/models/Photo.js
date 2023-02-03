import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.Schema.Types.ObjectId,
    userName: String
}, 
{
    timestamps: true
}
);

const Photo = mongoose.model('Photo', photoSchema);

export default Photo;