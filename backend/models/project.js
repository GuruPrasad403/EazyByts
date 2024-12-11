import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    technologies: {
        type: [String],
        required: true,
        validate: {
            validator: function(arr) {
                return arr.length > 0;
            },
            message: 'At least one technology must be listed.',
        },
    },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Link must be a valid URL.',
        },
    },
    imageUrl: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return /^(ftp|http|https):\/\/[^ "]+$/.test(value);
            },
            message: 'Image URL must be a valid URL.',
        },
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Middleware to update `updatedAt` before saving
projectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export const ProjectModel = mongoose.model('Project', projectSchema);
