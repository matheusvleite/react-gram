import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String
}, 
{
    timestamps: true
}
);

const user = mongoose.model('user', userSchema);

export default user;