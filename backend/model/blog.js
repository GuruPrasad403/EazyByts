import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    content: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String, 
        required: true, 
        trim: true 
    },
    tags: { 
        type: [String], 
        default: [] 
    },
    featuredImage: { 
        type: String 
    }, // URL of the featured image
    isPublished: { 
        type: Boolean, 
        default: false 
    },
    publishDate: { 
        type: Date, default:Date.now() 
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    updatedAt: { 
        type: Date 
    },
}, { 
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Middleware to update the `updatedAt` field on save
blogSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

export const BlogModel = mongoose.model("Blog", blogSchema);
