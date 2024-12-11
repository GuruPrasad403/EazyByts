import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^\+91\s\d{10}$/
    },
    experience: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
        min: 18,
        max: 100
    },
    address: {
        type: String,
        required: true
    },
    freelance: {
        type: Boolean,
        required: true
    },
    profilePicture: {
        type: String,
        required: true,
        match: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))$/ // A valid URL
    },
    aboutSection: {
        type: String,
        required: true,
        match: /^(https?:\/\/.*)$/
    },
    mainStack: {
        type: String,
        required: true
    }
});

export const UserModel = mongoose.model('User', userSchema);
