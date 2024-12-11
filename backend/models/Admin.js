import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },isAdmin: {
        type: Boolean,
        default: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    otp : {type:String}
});

// Pre-save middleware to update `updatedAt` on every save
adminSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

 const AdminModel = mongoose.model("Admin", adminSchema);
export default AdminModel